import { NextResponse } from "next/server";
import { vessels } from "@/data/mockVessels";

export async function GET() {
  return NextResponse.json({
    vessels,
  });
}