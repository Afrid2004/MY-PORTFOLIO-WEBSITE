import { checkAdmin } from "@/lib/checkAdmin";

import { collections, dbConnect } from "@/lib/dbConnect";

import { validateBlog } from "@/lib/validations/blogValidation";

import { ObjectId } from "mongodb";

// Get single blog
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          message: "Invalid blog ID!",
        },
        {
          status: 400,
        },
      );
    }

    const query = {
      _id: new ObjectId(id),
    };

    const blogCollection = await dbConnect(collections.blogs);

    const result = await blogCollection.findOne(query);

    if (!result) {
      return Response.json(
        {
          message: "Blog not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        message: "Failed to get blog",
      },
      {
        status: 500,
      },
    );
  }
}

// Update blog

export async function PATCH(request, { params }) {
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
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          message: "Invalid blog ID!",
        },
        {
          status: 400,
        },
      );
    }

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

    const blogCollection = await dbConnect(collections.blogs);

    // Check duplicate blog

    const existingBlog = await blogCollection.findOne({
      category: data.category.trim(),
      slug: data.slug.trim().toLowerCase(),
      _id: {
        // Not equal
        $ne: new ObjectId(id),
      },
    });

    if (existingBlog) {
      return Response.json(
        {
          message: "A blog with the same category and slug already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Update blog

    const updatedBlog = {
      title: data.title.trim(),

      slug: data.slug.trim().toLowerCase(),

      category: data.category.trim(),

      excerpt: data.excerpt.trim(),

      content: data.content.trim(),

      // Can be null
      image: data.image?.trim() || null,

      tags: data.tags.map((item) => item.trim()).filter(Boolean),

      readTime: data.readTime.trim(),

      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,

      keywords: data.keywords.map((item) => item.trim()).filter(Boolean),

      status: data.status ?? true,

      updatedAt: new Date(),
    };

    const result = await blogCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedBlog,
      },
    );

    // Blog not found

    if (result.matchedCount === 0) {
      return Response.json(
        {
          message: "Blog not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Blog updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update blog",
      },
      {
        status: 500,
      },
    );
  }
}

// Delete blog

export async function DELETE(request, { params }) {
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
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          message: "Invalid blog ID!",
        },
        {
          status: 400,
        },
      );
    }

    const blogCollection = await dbConnect(collections.blogs);

    const result = await blogCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // Blog not found

    if (result.deletedCount === 0) {
      return Response.json(
        {
          message: "Blog not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to delete blog",
      },
      {
        status: 500,
      },
    );
  }
}
