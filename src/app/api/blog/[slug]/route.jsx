import { collections, dbConnect } from "@/lib/dbConnect";

// Get single blog by slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const blogCollection = await dbConnect(collections.blogs);

    const result = await blogCollection.findOne({
      slug: slug.toLowerCase(),
      status: true,
    });

    if (!result) {
      return Response.json(
        {
          message: "Blog not found!",
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
        message: "Failed to get blog",
      },
      {
        status: 500,
      },
    );
  }
}
