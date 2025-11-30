import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProfileModel from "@/app/models/Profile"; // 👈 make sure you have this Mongoose model

// GET all profiles
export async function GET() {
  try {
    await dbConnect();
    const profiles = await ProfileModel.find()
      .populate("projects") // example: populate related projects
      .populate("teams") // example: populate teams
      .exec();

    return NextResponse.json({ success: true, data: profiles });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// POST create a new profile
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const profile = await ProfileModel.create(body);

    return NextResponse.json({ success: true, data: profile }, { status: 201 });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
