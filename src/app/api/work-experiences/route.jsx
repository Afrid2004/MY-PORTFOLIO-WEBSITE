import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateWorkExperience } from "@/lib/validations/workExperienceValidation";

// GET - Get all work experiences
export async function GET() {
  try {
    const workExperienceCollection = await dbConnect(
      collections.workExperiences,
    );

    const result = await workExperienceCollection
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
        message: "Failed to fetch work experiences",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// POST - Create work experience
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
    const workExperienceCollection = await dbConnect(
      collections.workExperiences,
    );

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

    // Check duplicate experience
    const query = {
      role: data.role.trim(),
      company: data.company.trim(),
    };

    const isExist = await workExperienceCollection.findOne(query);

    if (isExist) {
      return Response.json(
        {
          message: "This work experience already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Get last order
    const lastWorkExperience = await workExperienceCollection
      .find()
      .sort({ order: -1 })
      .limit(1)
      .next();

    const nextOrder =
      typeof lastWorkExperience?.order === "number"
        ? lastWorkExperience.order + 1
        : 0;

    const newWorkExperience = {
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

      order: nextOrder,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await workExperienceCollection.insertOne(newWorkExperience);

    return Response.json(
      {
        message: "Work experience created successfully",
        insertedId: result.insertedId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "Failed to create work experience",
      },
      {
        status: 500,
      },
    );
  }
}
