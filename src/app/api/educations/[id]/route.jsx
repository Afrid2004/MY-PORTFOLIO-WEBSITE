import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateEducation } from "@/lib/validations/educationValidation";
import { ObjectId } from "mongodb";

// Get single education
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          message: "Invalid education ID!",
        },
        {
          status: 400,
        },
      );
    }

    const query = {
      _id: new ObjectId(id),
    };

    const educationCollection = await dbConnect(collections.educations);

    const result = await educationCollection.findOne(query);

    if (!result) {
      return Response.json(
        {
          message: "Education not found!",
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
        message: "Failed to get education",
      },
      {
        status: 500,
      },
    );
  }
}

// Update education
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
          message: "Invalid education ID!",
        },
        {
          status: 400,
        },
      );
    }

    const data = await request.json();

    const error = validateEducation(data);

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

    const educationCollection = await dbConnect(collections.educations);

    // Check duplicate education
    const existingEducation = await educationCollection.findOne({
      degree: data.degree.trim(),
      institution: data.institution.trim(),
      _id: {
        // Not equal
        $ne: new ObjectId(id),
      },
    });

    if (existingEducation) {
      return Response.json(
        {
          message: "This education already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Update education
    const updatedEducation = {
      degree: data.degree.trim(),
      institution: data.institution.trim(),

      startDate: data.startDate,

      endDate: data.current ? null : data.endDate || null,

      current: data.current ?? true,

      // Result can be null
      result: data.result?.trim() || null,

      academicHighlights: data.academicHighlights
        .map((item) => item.trim())
        .filter(Boolean),

      coursework: data.coursework.map((item) => item.trim()).filter(Boolean),

      skillsDeveloped: data.skillsDeveloped
        .map((item) => item.trim())
        .filter(Boolean),

      status: data.status ?? true,

      updatedAt: new Date(),
    };

    const result = await educationCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedEducation,
      },
    );

    // Education not found
    if (result.matchedCount === 0) {
      return Response.json(
        {
          message: "Education not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Education updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update education",
      },
      {
        status: 500,
      },
    );
  }
}

// Delete education
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
          message: "Invalid education ID!",
        },
        {
          status: 400,
        },
      );
    }

    const educationCollection = await dbConnect(collections.educations);

    const result = await educationCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // Education not found
    if (result.deletedCount === 0) {
      return Response.json(
        {
          message: "Education not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Education deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to delete education",
      },
      {
        status: 500,
      },
    );
  }
}
