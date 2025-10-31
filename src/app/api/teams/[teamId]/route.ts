import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/app/models/Teams";
import Project from "@/app/models/Project";
import mongoose from "mongoose";

interface Params {
  params: { teamId: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();

    const { teamId } = params;

    // ✅ Validate Mongo ID format
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return NextResponse.json(
        { success: false, message: "Invalid Team ID" },
        { status: 400 }
      );
    }

    // ✅ Get the team
    const team = await Team.findById(teamId).lean();
    if (!team) {
      return NextResponse.json(
        { success: false, message: "Team not found" },
        { status: 404 }
      );
    }

    // ✅ Also fetch projects belonging to this team
    const projects = await Project.find({ team: teamId }).lean();

    return NextResponse.json({
      success: true,
      data: { team, projects },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
