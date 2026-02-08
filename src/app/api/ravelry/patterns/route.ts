import { NextRequest, NextResponse } from "next/server";
import { getPatterns } from "@/lib/ravelry-client";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || undefined;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("page_size") || "9", 10);

  try {
    const data = await getPatterns({ query, page, pageSize });
    return NextResponse.json(data);
  } catch (error) {
    logger.error("Error fetching patterns", error, {
      endpoint: "/api/ravelry/patterns",
      query,
      page,
      pageSize,
    });
    return NextResponse.json(
      { error: "Failed to fetch patterns" },
      { status: 500 }
    );
  }
}
