import { NextResponse } from "next/server";
import { vessels } from "@/data/mockVessels";
import { calculateDistanceToPortburyNm } from "@/lib/distance";

export async function GET() {
  const vesselsWithDistance = vessels
    .map((vessel) => ({
      ...vessel,
      distanceToPortburyNm: calculateDistanceToPortburyNm(
        vessel.lat,
        vessel.lon
      ),
    }))
    .sort((a, b) => a.distanceToPortburyNm - b.distanceToPortburyNm);

  return NextResponse.json({
    vessels: vesselsWithDistance,
  });
}