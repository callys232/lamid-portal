import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/app/models/Teams";

export async function GET() {
  await dbConnect();
  const teams = await Team.find();
  return NextResponse.json({ success: true, data: teams });
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const team = await Team.create(body);
    return NextResponse.json({ success: true, data: team });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: errMsg },
      { status: 400 }
    );
  }
}
