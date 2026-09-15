import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateCertification } from "@/lib/validations/certificationValidation";
import { ObjectId } from "mongodb";

// Get single certification
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          message: "Invalid certification ID!",
        },
        {
          status: 400,
        },
      );
    }

    const query = {
      _id: new ObjectId(id),
    };

    const certificationCollection = await dbConnect(
      collections.certifications,
    );

    const result = await certificationCollection.findOne(query);

    if (!result) {
      return Response.json(
        {
          message: "Certification not found!",
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
        message: "Failed to get certification",
      },
      {
        status: 500,
      },
    );
  }
}

// Update certification
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
          message: "Invalid certification ID!",
        },
        {
          status: 400,
        },
      );
    }

    const data = await request.json();

    // Validate certification data
    const error = validateCertification(data);

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

    const certificationCollection = await dbConnect(
      collections.certifications,
    );

    // Check duplicate certification
    const existingCertification = await certificationCollection.findOne({
      title: data.title.trim(),
      issuer: data.issuer.trim(),
      _id: {
        // Not equal
        $ne: new ObjectId(id),
      },
    });

    if (existingCertification) {
      return Response.json(
        {
          message: "This certification already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Update certification
    const updatedCertification = {
      title: data.title.trim(),
      issuer: data.issuer.trim(),
      duration: data.duration.trim(),

      // Can be null
      credential: data.credential?.trim() || null,

      // Certificate image URL
      image: data.image?.trim() || null,

      // Description can be null
      description: data.description?.trim() || null,

      highlights: data.highlights
        .map((item) => item.trim())
        .filter(Boolean),

      technologies: data.technologies
        .map((item) => item.trim())
        .filter(Boolean),

      status: data.status ?? true,

      updatedAt: new Date(),
    };

    const result = await certificationCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedCertification,
      },
    );

    // Certification not found
    if (result.matchedCount === 0) {
      return Response.json(
        {
          message: "Certification not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Certification updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update certification",
      },
      {
        status: 500,
      },
    );
  }
}

// Delete certification
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
          message: "Invalid certification ID!",
        },
        {
          status: 400,
        },
      );
    }

    const certificationCollection = await dbConnect(
      collections.certifications,
    );

    const result = await certificationCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // Certification not found
    if (result.deletedCount === 0) {
      return Response.json(
        {
          message: "Certification not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Certification deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to delete certification",
      },
      {
        status: 500,
      },
    );
  }
}
;
