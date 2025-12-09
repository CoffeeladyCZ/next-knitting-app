import { NextRequest, NextResponse } from "next/server";
import { getPatternDetail } from "../../../../../lib/ravelry-client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid pattern ID" },
        { status: 400 }
      );
    }

    const data = await getPatternDetail(id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching pattern detail:", error);
    return NextResponse.json(
      { error: "Failed to fetch pattern detail" },
      { status: 500 }
    );
  }
}
