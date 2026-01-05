import { NextRequest, NextResponse } from "next/server";
import { getPatterns } from "@/lib/ravelry-client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("page_size") || "9", 10);

    const data = await getPatterns({ query, page, pageSize });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching patterns:", error);
    return NextResponse.json(
      { error: "Failed to fetch patterns" },
      { status: 500 },
    );
  }
}
