import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateProject } from "@/lib/validations/projectValidation";

// GET - Get all active projects
export async function GET() {
  try {
    const projectCollection = await dbConnect(collections.projects);

    const result = await projectCollection
      .find({
        status: true,
      })
      .sort({
        order: 1,
        createdAt: 1,
      })
      .toArray();

    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        message: "Failed to fetch projects",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// POST - Create project
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
    const projectCollection = await dbConnect(collections.projects);

    const data = await request.json();

    // Validate project data
    const error = validateProject(data);

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

    // Check duplicate project
    const query = {
      title: data.title.trim(),
    };

    const isExist = await projectCollection.findOne(query);

    if (isExist) {
      return Response.json(
        {
          message: "This project already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Get last order
    const lastProject = await projectCollection
      .find()
      .sort({ order: -1 })
      .limit(1)
      .next();

    const nextOrder =
      typeof lastProject?.order === "number" ? lastProject.order + 1 : 0;

    // Create new project
    const newProject = {
      title: data.title.trim(),
      slug: data.slug?.trim() || null,
      description: data.description.trim(),
      image: data.image?.trim() || null,

      category: data.category.trim(),

      technologies: data.technologies
        .map((technology) => ({
          name: technology.name.trim(),
          icon: technology.icon?.trim() || null,
          color: technology.color?.trim() || null,
        }))
        .filter((technology) => technology.name),

      liveUrl: data.liveUrl?.trim() || null,
      githubUrl: data.githubUrl?.trim() || null,

      projectStatus: data.projectStatus,

      publishedDate: data.publishedDate
        ? new Date(data.publishedDate)
        : new Date(),

      featured: data.featured ?? false,
      status: data.status ?? true,

      order: nextOrder,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await projectCollection.insertOne(newProject);

    return Response.json(
      {
        message: "Project created successfully",
        insertedId: result.insertedId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "Failed to create project",
      },
      {
        status: 500,
      },
    );
  }
}
