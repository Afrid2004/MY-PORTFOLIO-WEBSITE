import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateCertification } from "@/lib/validations/certificationValidation";

// GET - Get all certifications
export async function GET() {
  try {
    const certificationCollection = await dbConnect(
      collections.certifications,
    );

    const result = await certificationCollection
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
        message: "Failed to fetch certifications",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// POST - Create certification
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
    const certificationCollection = await dbConnect(
      collections.certifications,
    );

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

    // Check duplicate certification
    const query = {
      title: data.title.trim(),
      issuer: data.issuer.trim(),
    };

    const isExist = await certificationCollection.findOne(query);

    if (isExist) {
      return Response.json(
        {
          message: "This certification already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Get last order
    const lastCertification = await certificationCollection
      .find()
      .sort({ order: -1 })
      .limit(1)
      .next();

    const nextOrder =
      typeof lastCertification?.order === "number"
        ? lastCertification.order + 1
        : 0;

    // Create new certification
    const newCertification = {
      title: data.title.trim(),
      issuer: data.issuer.trim(),
      duration: data.duration.trim(),
      credential: data.credential?.trim() || null,
      image: data.image?.trim() || null,
      description: data.description?.trim() || null,

      highlights: data.highlights
        .map((item) => item.trim())
        .filter(Boolean),

      technologies: data.technologies
        .map((item) => item.trim())
        .filter(Boolean),

      status: data.status ?? true,

      order: nextOrder,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await certificationCollection.insertOne(
      newCertification,
    );

    return Response.json(
      {
        message: "Certification created successfully",
        insertedId: result.insertedId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "Failed to create certification",
      },
      {
        status: 500,
      },
    );
  }
}
;
