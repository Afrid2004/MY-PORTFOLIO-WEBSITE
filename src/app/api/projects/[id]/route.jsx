import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateProject } from "@/lib/validations/projectValidation";
import { ObjectId } from "mongodb";

// Get single project
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          message: "Invalid project ID!",
        },
        {
          status: 400,
        },
      );
    }

    const query = {
      _id: new ObjectId(id),
    };

    const projectCollection = await dbConnect(collections.projects);

    const result = await projectCollection.findOne(query);

    if (!result) {
      return Response.json(
        {
          message: "Project not found!",
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
        message: "Failed to get project",
      },
      {
        status: 500,
      },
    );
  }
}

// Update project
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
          message: "Invalid project ID!",
        },
        {
          status: 400,
        },
      );
    }

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

    const projectCollection = await dbConnect(collections.projects);

    // Check duplicate project
    const existingProject = await projectCollection.findOne({
      title: data.title.trim(),
      _id: {
        // Not equal
        $ne: new ObjectId(id),
      },
    });

    if (existingProject) {
      return Response.json(
        {
          message: "This project already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Update project
    const updatedProject = {
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

      updatedAt: new Date(),
    };

    const result = await projectCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedProject,
      },
    );

    // Project not found
    if (result.matchedCount === 0) {
      return Response.json(
        {
          message: "Project not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Project updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update project",
      },
      {
        status: 500,
      },
    );
  }
}

// Delete project
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
          message: "Invalid project ID!",
        },
        {
          status: 400,
        },
      );
    }

    const projectCollection = await dbConnect(collections.projects);

    const result = await projectCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // Project not found
    if (result.deletedCount === 0) {
      return Response.json(
        {
          message: "Project not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to delete project",
      },
      {
        status: 500,
      },
    );
  }
}
