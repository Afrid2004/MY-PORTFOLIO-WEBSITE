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
    const { type, ids } = await request.json();

    const allowedCollections = {
      skills: collections.skills,
      services: collections.services,
    };

    if (!allowedCollections[type]) {
      return Response.json(
        {
          message: "Invalid reorder type!",
        },
        {
          status: 400,
        },
      );
    }

    if (!Array.isArray(ids)) {
      return Response.json(
        {
          message: "Invalid order data!",
        },
        {
          status: 400,
        },
      );
    }

    const collection = await dbConnect(
      allowedCollections[type],
    );

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
      await collection.bulkWrite(operations);
    }

    return Response.json({
      message: "Order updated successfully!",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update order!",
      },
      {
        status: 500,
      },
    );
  }
}