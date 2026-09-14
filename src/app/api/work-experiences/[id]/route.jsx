import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateWorkExperience } from "@/lib/validations/workExperienceValidation";
import { ObjectId } from "mongodb";

// Get single work experience
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          message: "Invalid work experience ID!",
        },
        {
          status: 400,
        },
      );
    }

    const query = {
      _id: new ObjectId(id),
    };

    const workExperienceCollection = await dbConnect(
      collections.workExperiences,
    );

    const result = await workExperienceCollection.findOne(query);

    if (!result) {
      return Response.json(
        {
          message: "Work experience not found!",
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
        message: "Failed to get work experience",
      },
      {
        status: 500,
      },
    );
  }
}

// Update work experience
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
          message: "Invalid work experience ID!",
        },
        {
          status: 400,
        },
      );
    }

    const data = await request.json();

    const error = validateWorkExperience(data);

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

    const workExperienceCollection = await dbConnect(
      collections.workExperiences,
    );

    // Check duplicate work experience
    const existingWorkExperience =
      await workExperienceCollection.findOne({
        role: data.role.trim(),
        company: data.company.trim(),
        _id: {
          // Not equal
          $ne: new ObjectId(id),
        },
      });

    if (existingWorkExperience) {
      return Response.json(
        {
          message: "This work experience already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Update work experience
    const updatedWorkExperience = {
      role: data.role.trim(),
      company: data.company.trim(),
      startDate: data.startDate,
      endDate: data.current ? null : data.endDate || null,
      current: data.current ?? true,
      address: data.address.trim(),
      addressUrl: data.addressUrl.trim(),
      responsibilities: data.responsibilities
        .map((item) => item.trim())
        .filter(Boolean),
      technologies: data.technologies
        .map((item) => item.trim())
        .filter(Boolean),
      status: data.status ?? true,
      updatedAt: new Date(),
    };

    const result = await workExperienceCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedWorkExperience,
      },
    );

    // Work experience not found
    if (result.matchedCount === 0) {
      return Response.json(
        {
          message: "Work experience not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Work experience updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update work experience",
      },
      {
        status: 500,
      },
    );
  }
}

// Delete work experience
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
          message: "Invalid work experience ID!",
        },
        {
          status: 400,
        },
      );
    }

    const workExperienceCollection = await dbConnect(
      collections.workExperiences,
    );

    const result = await workExperienceCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // Work experience not found
    if (result.deletedCount === 0) {
      return Response.json(
        {
          message: "Work experience not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Work experience deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to delete work experience",
      },
      {
        status: 500,
      },
    );
  }
}