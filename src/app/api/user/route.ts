import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const { user } = await getSession();
    const username = user?.name || user?.id || "";

    return NextResponse.json({ username });
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json({ username: "" }, { status: 200 });
  }
}

