import { NextRequest, NextResponse } from "next/server";
import { vessels } from "@/data/mockVessels";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

  if (!query) {
    return NextResponse.json({
      vessels: [],
    });
  }

  const results = vessels.filter((vessel) => {
    return (
      vessel.name.toLowerCase().includes(query) ||
      vessel.imo.toLowerCase().includes(query) ||
      vessel.mmsi.toLowerCase().includes(query)
    );
  });

  return NextResponse.json({
    vessels: results,
  });
}