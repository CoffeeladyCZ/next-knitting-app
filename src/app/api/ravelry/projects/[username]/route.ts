import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/ravelry-client";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ username: string }> },
) {
  const params = await props.params;
  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 },
      );
    }

    const data = await getProjects(username);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching projects:", error);

    if (error && typeof error === "object" && "statusCode" in error) {
      const apiError = error as { statusCode: number; status?: string };
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: apiError.statusCode || 401 },
      );
    }

    if (error instanceof Error && error.message.includes("401")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
