import { checkAdmin } from "@/lib/checkAdmin";

import { collections, dbConnect } from "@/lib/dbConnect";

import { validateBlog } from "@/lib/validations/blogValidation";

// GET - Get all blogs

export async function GET() {
  try {
    const blogCollection = await dbConnect(collections.blogs);

    const result = await blogCollection
      .find()
      .sort({
        order: 1,
        createdAt: 1,
      })
      .toArray();

    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        message: "Failed to fetch blogs",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// POST - Create blog

export async function POST(request) {
  const auth = await checkAdmin();

  if (!auth.success) {
    return Response.json(
      {
        message: auth.message,
      },
      {
        status: auth.status,
      },
    );
  }

  try {
    const blogCollection = await dbConnect(collections.blogs);

    const data = await request.json();

    // Validate blog data

    const error = validateBlog(data);

    if (error) {
      return Response.json(
        {
          message: error,
        },
        {
          status: 400,
        },
      );
    }

    // Check duplicate blog

    const query = {
      category: data.category.trim(),
      slug: data.slug.trim().toLowerCase(),
    };

    const isExist = await blogCollection.findOne(query);

    if (isExist) {
      return Response.json(
        {
          message: "A blog with the same category and slug already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Get last order

    const lastBlog = await blogCollection
      .find()
      .sort({ order: -1 })
      .limit(1)
      .next();

    const nextOrder =
      typeof lastBlog?.order === "number" ? lastBlog.order + 1 : 0;

    // Create new blog

    const newBlog = {
      title: data.title.trim(),
      slug: data.slug.trim().toLowerCase(),
      category: data.category.trim(),
      excerpt: data.excerpt.trim(),
      content: data.content.trim(),
      image: data.image?.trim() || null,
      tags: data.tags.map((item) => item.trim()).filter(Boolean),
      readTime: data.readTime.trim(),
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      keywords: data.keywords.map((item) => item.trim()).filter(Boolean),
      status: data.status ?? true,
      order: nextOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await blogCollection.insertOne(newBlog);

    return Response.json(
      {
        message: "Blog created successfully",
        insertedId: result.insertedId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "Failed to create blog",
      },
      {
        status: 500,
      },
    );
  }
}
