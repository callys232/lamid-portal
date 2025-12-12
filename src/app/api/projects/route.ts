import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/app/models/Project";
import { mockJobs } from "@/mocks/mockJobs"; // <-- your mock dataset

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";

    console.error("GET /projects error:", message);

    // Fallback to mock data
    return NextResponse.json(
      { success: true, data: mockJobs, message: "Using mock data" },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    // Simple validation
    if (!body?.title || !body?.category) {
      return NextResponse.json(
        {
          success: false,
          message: "title and category are required",
        },
        { status: 400 }
      );
    }

    const project = await Project.create(body);

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";

    console.error("POST /projects error:", message);

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
