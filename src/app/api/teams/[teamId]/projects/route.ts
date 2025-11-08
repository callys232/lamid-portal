import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/app/models/Project";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await context.params;

  try {
    await dbConnect();

    const projects = await ProjectModel.find({ team: teamId })
      .populate("client")
      .populate("consultants")
      .populate("milestones")
      .exec();

    if (!projects.length)
      return NextResponse.json(
        { success: false, message: "No projects found for this team" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      data: projects.map((p) => ({
        ...p.toObject(),
        id: p._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching team projects:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
