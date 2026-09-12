import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateSkill } from "@/lib/validations/skillValidation";

// GET all skills
export async function GET() {
  try {
    const skillsCollection = await dbConnect(collections.skills);
    const result = await skillsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        message: "Failed to fetch skills",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// post skills data
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
    // get data from user
    const data = await request.json();
    const error = validateSkill(data);
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
    const skillsCollection = await dbConnect(collections.skills);
    const query = {
      name: data.name.trim(),
    };
    const existSkill = await skillsCollection.findOne(query);
    if (existSkill) {
      return Response.json(
        {
          message: "This skill already exists!",
        },
        {
          status: 409,
        },
      );
    }

    const newSkill = {
      name: data.name.trim(),
      icon: data.icon.trim(),
      category: data.category,
      level: Number(data.level),
      color: data.color.trim(),
      status: data.status ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await skillsCollection.insertOne(newSkill);
    return Response.json(
      {
        message: "Skill created successfully",
        insertedId: result.insertedId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "Failed to create skill",
      },
      {
        status: 500,
      },
    );
  }
}
