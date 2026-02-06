import { NextRequest, NextResponse } from "next/server";
import { getPatternComments } from "@/lib/ravelry-client";
import { logger } from "@/lib/logger";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid pattern ID" },
        { status: 400 },
      );
    }

    const data = await getPatternComments(id);
    return NextResponse.json(data);
  } catch (error) {
    logger.error("Error fetching pattern comments", error, {
      endpoint: "/api/ravelry/patterns/[id]/comments",
      patternId: params.id,
    });
    return NextResponse.json(
      { error: "Failed to fetch pattern comments" },
      { status: 500 },
    );
  }
}
