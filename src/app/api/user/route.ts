import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const { user } = await getSession();
    const username = user?.name || user?.id || "";

    return NextResponse.json({ username });
  } catch (error) {
    logger.error("Error getting user", error, { endpoint: "/api/user" });
    return NextResponse.json({ username: "" }, { status: 200 });
  }
}
