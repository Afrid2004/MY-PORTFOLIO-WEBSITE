"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export async function LoginAdmin(credentials) {
  try {
    if (!credentials?.email || !credentials?.password) {
      return {
        success: false,
        message: "Email and password are required.",
      };
    }
    const userColletctions = await dbConnect(collections.users);
    const query = { email: credentials.email.trim() };
    const user = await userColletctions.findOne(query);
    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const passwordMatched = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!passwordMatched) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Something went wrong. Please try again.",
    };
  }
}
