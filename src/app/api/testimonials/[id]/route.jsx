import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateTestimonial } from "@/lib/validations/testimonialValidation";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          message: "Invalid testimonial ID!",
        },
        {
          status: 400,
        },
      );
    }

    const query = {
      _id: new ObjectId(id),
    };

    const testimonialCollection = await dbConnect(collections.testimonials);
    const result = await testimonialCollection.findOne(query);

    if (!result) {
      return Response.json(
        {
          message: "Testimonial not found!",
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
        message: "Failed to get testimonial",
      },
      {
        status: 500,
      },
    );
  }
}

// Update testimonial
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
          message: "Invalid testimonial ID!",
        },
        {
          status: 400,
        },
      );
    }

    const data = await request.json();

    // Validate testimonial data
    const error = validateTestimonial(data);

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

    const testimonialCollection = await dbConnect(
      collections.testimonials,
    );

    // Check duplicate testimonial
    const existingTestimonial =
      await testimonialCollection.findOne({
        name: data.name.trim(),
        desc: data.desc.trim(),
        _id: {
          // Not equal
          $ne: new ObjectId(id),
        },
      });

    if (existingTestimonial) {
      return Response.json(
        {
          message: "This testimonial already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Update testimonial
    const updatedTestimonial = {
      image: data.image?.trim() || null,
      name: data.name.trim(),
      desc: data.desc.trim(),
      designation: data.designation?.trim() || null,
      company: data.company?.trim() || null,
      rating: Number(data.rating),
      isVerified: data.isVerified ?? false,
      status: data.status ?? true,
      updatedAt: new Date(),
    };

    const result = await testimonialCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedTestimonial,
      },
    );

    // Testimonial not found
    if (result.matchedCount === 0) {
      return Response.json(
        {
          message: "Testimonial not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Testimonial updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update testimonial",
      },
      {
        status: 500,
      },
    );
  }
}

// Delete testimonial
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
          message: "Invalid testimonial ID!",
        },
        {
          status: 400,
        },
      );
    }

    const testimonialCollection = await dbConnect(
      collections.testimonials,
    );

    const result = await testimonialCollection.deleteOne({
      _id: new ObjectId(id),
    });

    // Testimonial not found
    if (result.deletedCount === 0) {
      return Response.json(
        {
          message: "Testimonial not found!",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json({
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to delete testimonial",
      },
      {
        status: 500,
      },
    );
  }
}