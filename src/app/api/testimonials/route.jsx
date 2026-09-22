import { checkAdmin } from "@/lib/checkAdmin";
import { collections, dbConnect } from "@/lib/dbConnect";
import { validateTestimonial } from "@/lib/validations/testimonialValidation";

// GET - Get all testimonials
export async function GET() {
  try {
    const testimonialCollection = await dbConnect(collections.testimonials);
    const result = await testimonialCollection
      .find({
        status: true,
      })
      .sort({
        order: 1,
        createdAt: 1,
      })
      .toArray();

    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        message: "Failed to fetch testimonials",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// POST - Create testimonial
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
    const testimonialCollection = await dbConnect(collections.testimonials);

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

    // Check duplicate testimonial
    const query = {
      name: data.name.trim(),
      desc: data.desc.trim(),
    };

    const isExist = await testimonialCollection.findOne(query);

    if (isExist) {
      return Response.json(
        {
          message: "This testimonial already exists!",
        },
        {
          status: 409,
        },
      );
    }

    // Get last order
    const lastTestimonial = await testimonialCollection
      .find()
      .sort({ order: -1 })
      .limit(1)
      .next();

    const nextOrder =
      typeof lastTestimonial?.order === "number"
        ? lastTestimonial.order + 1
        : 0;

    // Create new testimonial
    const newTestimonial = {
      image: data.image?.trim() || null,
      name: data.name.trim(),
      desc: data.desc.trim(),
      designation: data.designation?.trim() || null,
      company: data.company?.trim() || null,
      rating: Number(data.rating),
      isVerified: data.isVerified ?? false,
      status: data.status ?? true,
      order: nextOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await testimonialCollection.insertOne(newTestimonial);

    return Response.json(
      {
        message: "Testimonial created successfully",
        insertedId: result.insertedId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message: "Failed to create testimonial",
      },
      {
        status: 500,
      },
    );
  }
}
