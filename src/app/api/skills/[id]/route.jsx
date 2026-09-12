import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateSkill } from "@/lib/validations/skillValidation";
import { ObjectId } from "mongodb";
// get single data
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          message: "Invalid skill ID!",
        },
        {
          status: 400,
        },
      );
    }

    const query = {
      _id: new ObjectId(id),
    };
    const skillsCollection = await dbConnect(collections.skills);
    const result = await skillsCollection.findOne(query);
    if (!result) {
      return Response.json(
        {
          message: "Skill not found!",
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
        message: "Failed to get skill",
      },
      {
        status: 500,
      },
    );
  }
}

// update skill
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
          message: "Invalid skill ID!",
        },
        {
          status: 400,
        },
      );
    }

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
    const existingSkill = await skillsCollection.findOne({
      name: data.name.trim(),
      _id: {
        // not equal
        $ne: new ObjectId(id),
      },
    });

    if (existingSkill) {
      return Response.json(
        {
          message: "This skill already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // update skill
    const updatedSkill = {
      name: data.name.trim(),
      icon: data.icon.trim(),
      category: data.category,
      level: Number(data.level),
      color: data.color.trim(),
      status: data.status ?? true,
      updatedAt: new Date(),
    };

    // update data
    const result = await skillsCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedSkill,
      },
    );

    // skill not found
    if (result.matchedCount === 0) {
      return Response.json(
        {
          message: "Skill not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Skill updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update skill",
      },
      {
        status: 500,
      },
    );
  }
}

// delete skill
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
          message: "Invalid skill ID!",
        },
        {
          status: 400,
        },
      );
    }

    const skillsCollection = await dbConnect(collections.skills);
    const result = await skillsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // skill not found
    if (result.deletedCount === 0) {
      return Response.json(
        {
          message: "Skill not found!",
        },
        {
          status: 404,
        },
      );
    }
    return Response.json({
      message: "Skill deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to delete skill",
      },
      {
        status: 500,
      },
    );
  }
}
