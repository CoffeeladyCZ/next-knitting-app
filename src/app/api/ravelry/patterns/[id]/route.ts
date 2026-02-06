import { NextRequest, NextResponse } from "next/server";
import { getPatternDetail } from "@/lib/ravelry-client";
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

    const data = await getPatternDetail(id);
    return NextResponse.json(data);
  } catch (error) {
    logger.error("Error fetching pattern detail", error, {
      endpoint: "/api/ravelry/patterns/[id]",
      patternId: params.id,
    });
    return NextResponse.json(
      { error: "Failed to fetch pattern detail" },
      { status: 500 },
    );
  }
}
