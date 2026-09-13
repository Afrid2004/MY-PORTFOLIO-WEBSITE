import { ObjectId } from "mongodb";

import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";

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
    const { ids } = await request.json();

    if (!Array.isArray(ids)) {
      return Response.json(
        {
          message: "Invalid skill order!",
        },
        {
          status: 400,
        },
      );
    }

    const skillsCollection = await dbConnect(collections.skills);

    const operations = ids.map((id, index) => ({
      updateOne: {
        filter: {
          _id: new ObjectId(id),
        },
        update: {
          $set: {
            order: index,
            updatedAt: new Date(),
          },
        },
      },
    }));

    if (operations.length > 0) {
      await skillsCollection.bulkWrite(operations);
    }

    return Response.json({
      message: "Skill order updated successfully!",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update skill order!",
      },
      {
        status: 500,
      },
    );
  }
}
