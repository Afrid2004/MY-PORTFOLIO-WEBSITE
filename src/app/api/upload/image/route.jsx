import r2 from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(request) {
  try {
    const { fileName, fileType } = await request.json();

    // Check file information
    if (!fileName || !fileType) {
      return Response.json(
        { message: "File information is required!" },
        { status: 400 },
      );
    }

    // Only allow image files
    if (!fileType.startsWith("image/")) {
      return Response.json(
        { message: "Only image files are allowed!" },
        { status: 400 },
      );
    }

    // Allowed image types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(fileType)) {
      return Response.json(
        { message: "Only JPG, PNG and WebP images are allowed!" },
        { status: 400 },
      );
    }

    // Get file extension
    const extension = fileName.split(".").pop();

    // Create unique file name
    const uniqueFileName = `certifications/${Date.now()}-${crypto.randomUUID()}.${extension}`;

    // Create R2 upload command
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: uniqueFileName,
      ContentType: fileType,
    });

    // Create temporary upload URL
    const uploadUrl = await getSignedUrl(r2, command, {
      expiresIn: 60 * 5,
    });

    return Response.json({
      uploadUrl,
      key: uniqueFileName,
    });
  } catch (error) {
    console.error("R2 upload URL error:", error);

    return Response.json(
      { message: "Failed to create upload URL!" },
      { status: 500 },
    );
  }
}
