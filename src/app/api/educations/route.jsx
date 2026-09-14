import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateEducation } from "@/lib/validations/educationValidation";

// GET - Get all educations
export async function GET() {
  try {
    const educationCollection = await dbConnect(collections.educations);

    const result = await educationCollection
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
        message: "Failed to fetch educations",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// POST - Create education
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
    const educationCollection = await dbConnect(collections.educations);

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

    // Check duplicate education
    const query = {
      degree: data.degree.trim(),
      institution: data.institution.trim(),
    };

    const isExist = await educationCollection.findOne(query);

    if (isExist) {
      return Response.json(
        {
          message: "This education already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Get last order
    const lastEducation = await educationCollection
      .find()
      .sort({ order: -1 })
      .limit(1)
      .next();

    const nextOrder =
      typeof lastEducation?.order === "number" ? lastEducation.order + 1 : 0;

    const newEducation = {
      degree: data.degree.trim(),
      institution: data.institution.trim(),
      startDate: data.startDate,
      endDate: data.current ? null : data.endDate || null,
      current: data.current ?? true,
      result: data.result?.trim() || null,
      academicHighlights: data.academicHighlights
        .map((item) => item.trim())
        .filter(Boolean),
      coursework: data.coursework.map((item) => item.trim()).filter(Boolean),
      skillsDeveloped: data.skillsDeveloped
        .map((item) => item.trim())
        .filter(Boolean),
      status: data.status ?? true,
      order: nextOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await educationCollection.insertOne(newEducation);

    return Response.json(
      {
        message: "Education created successfully",
        insertedId: result.insertedId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "Failed to create education",
      },
      {
        status: 500,
      },
    );
  }
}
