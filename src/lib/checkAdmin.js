import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized!",
    };
  }

  if (session.user.role !== "admin") {
    return {
      success: false,
      status: 403,
      message: "Forbidden!",
    };
  }
  return {
    success: true,
    session,
  };
}
