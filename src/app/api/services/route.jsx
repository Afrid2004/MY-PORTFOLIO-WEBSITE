import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateService } from "@/lib/validations/serviceValidation";

export async function GET() {
  try {
    const serviceCollection = await dbConnect(collections.services);
    const result = await serviceCollection
      .find()
      .sort({
        order: 1,
        createdAt: 1,
      })
      .toArray();
    return Response.json(result);
  } catch (error) {
    Response.json(
      {
        message: "Failed to fetch services",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

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
    const serviceCollection = await dbConnect(collections.services);
    const data = await request.json();
    const error = validateService(data);
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
    const query = {
      title: data.title.trim(),
    };
    const isExist = await serviceCollection.findOne(query);

    if (isExist) {
      return Response.json(
        {
          message: "This service already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Get last order
    const lastService = await serviceCollection
      .find()
      .sort({ order: -1 })
      .limit(1)
      .next();

    const nextOrder =
      typeof lastService?.order === "number" ? lastService.order + 1 : 0;

    const newService = {
      title: data.title.trim(),
      description: data.description.trim(),
      icon: data.icon.trim(),
      status: data.status ?? true,
      order: nextOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await serviceCollection.insertOne(newService);
    return Response.json(
      {
        message: "Service created successfully",
        insertedId: result.insertedId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "Failed to create service",
      },
      {
        status: 500,
      },
    );
  }
}
