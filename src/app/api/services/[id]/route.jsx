import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateService } from "@/lib/validations/serviceValidation";
import { ObjectId } from "mongodb";

// Get single service
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          message: "Invalid service ID!",
        },
        {
          status: 400,
        },
      );
    }

    const query = {
      _id: new ObjectId(id),
    };

    const servicesCollection = await dbConnect(collections.services);

    const result = await servicesCollection.findOne(query);

    if (!result) {
      return Response.json(
        {
          message: "Service not found!",
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
        message: "Failed to get service",
      },
      {
        status: 500,
      },
    );
  }
}

// Update service
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
          message: "Invalid service ID!",
        },
        {
          status: 400,
        },
      );
    }

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

    const servicesCollection = await dbConnect(collections.services);

    // Check duplicate service title
    const existingService = await servicesCollection.findOne({
      title: data.title.trim(),
      _id: {
        // Not equal
        $ne: new ObjectId(id),
      },
    });

    if (existingService) {
      return Response.json(
        {
          message: "This service already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Update service
    const updatedService = {
      title: data.title.trim(),
      description: data.description.trim(),
      icon: data.icon.trim(),
      status: data.status ?? true,
      updatedAt: new Date(),
    };

    const result = await servicesCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedService,
      },
    );

    // Service not found
    if (result.matchedCount === 0) {
      return Response.json(
        {
          message: "Service not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Service updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update service",
      },
      {
        status: 500,
      },
    );
  }
}

// Delete service
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
          message: "Invalid service ID!",
        },
        {
          status: 400,
        },
      );
    }

    const servicesCollection = await dbConnect(collections.services);

    const result = await servicesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // Service not found
    if (result.deletedCount === 0) {
      return Response.json(
        {
          message: "Service not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to delete service",
      },
      {
        status: 500,
      },
    );
  }
}
