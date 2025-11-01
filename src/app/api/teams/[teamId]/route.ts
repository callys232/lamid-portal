import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/app/models/Teams";
import Project from "@/app/models/Project";
import mongoose from "mongoose";

// Route params interface
interface RouteParams {
  teamId: string;
}

// GET: fetch a single team and its projects
export async function GET(
  req: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    await dbConnect();

    const { teamId } = params;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return NextResponse.json(
        { success: false, message: "Invalid Team ID" },
        { status: 400 }
      );
    }

    const team = await Team.findById(teamId).lean();
    if (!team)
      return NextResponse.json(
        { success: false, message: "Team not found" },
        { status: 404 }
      );

    const projects = await Project.find({ team: teamId }).lean();

    return NextResponse.json({ success: true, data: { team, projects } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// PUT: update a team by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    await dbConnect();
    const { teamId } = params;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return NextResponse.json(
        { success: false, message: "Invalid Team ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedTeam = await Team.findByIdAndUpdate(teamId, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedTeam)
      return NextResponse.json(
        { success: false, message: "Team not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: updatedTeam });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// DELETE: remove a team by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    await dbConnect();
    const { teamId } = params;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      return NextResponse.json(
        { success: false, message: "Invalid Team ID" },
        { status: 400 }
      );
    }

    const deletedTeam = await Team.findByIdAndDelete(teamId).lean();
    if (!deletedTeam)
      return NextResponse.json(
        { success: false, message: "Team not found" },
        { status: 404 }
      );

    // Optional: also delete projects of this team
    await Project.deleteMany({ team: teamId });

    return NextResponse.json({
      success: true,
      message: "Team and associated projects deleted",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
