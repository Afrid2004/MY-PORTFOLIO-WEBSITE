import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactEmailTemplate } from "./emailTemplate";

export async function POST(request) {
  try {
    // Get form data
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Get all attachments
    const attachments = formData.getAll("attachments");

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 },
      );
    }

    // Validate attachment size
    for (const attachment of attachments) {
      if (attachment && attachment.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            message: `"${attachment.name}" must be less than 5 MB.`,
          },
          { status: 400 },
        );
      }
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Prepare email attachments
    const emailAttachments = [];

    for (const attachment of attachments) {
      if (attachment && attachment.size > 0) {
        const buffer = Buffer.from(await attachment.arrayBuffer());

        emailAttachments.push({
          filename: attachment.name,
          content: buffer,
          contentType: attachment.type || "application/octet-stream",
        });
      }
    }

    // Get attachment names for email template
    const attachmentNames = emailAttachments.map(
      (attachment) => attachment.filename,
    );

    // Email HTML
    const html = contactEmailTemplate({
      name,
      email,
      subject,
      message,
      attachmentNames,
    });

    // Plain text attachment list
    const attachmentText =
      attachmentNames.length > 0
        ? `Attachments:\n${attachmentNames
            .map((fileName) => `- ${fileName}`)
            .join("\n")}`
        : "";

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,

      // Reply directly to visitor
      replyTo: email,

      subject: `New Contact: ${subject}`,

      // Plain text version
      text: `
        New Contact Message

        Name: ${name}
        Email: ${email}
        Subject: ${subject}

        Message:
        ${message}

        ${attachmentText}
      `,
      html,
      attachments: emailAttachments,
    });

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 },
    );
  }
}
