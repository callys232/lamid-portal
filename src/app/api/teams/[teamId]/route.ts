import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Team from "@/app/models/Teams";
import Project from "@/app/models/Project";
import mongoose from "mongoose";

/** Utility: validate a Mongo ObjectId */
function validateObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

/** Utility: standard error response */
function errorResponse(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

// GET: fetch a single team and its projects
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    await dbConnect();
    const { teamId } = await context.params;

    if (!validateObjectId(teamId)) {
      return errorResponse("Invalid Team ID", 400);
    }

    const team = await Team.findById(teamId).lean();
    if (!team) return errorResponse("Team not found", 404);

    const projects = await Project.find({ team: teamId }).lean();
    return NextResponse.json({ success: true, data: { team, projects } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return errorResponse(message, 500);
  }
}

// PUT: update a team by ID
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    await dbConnect();
    const { teamId } = await context.params;

    if (!validateObjectId(teamId)) {
      return errorResponse("Invalid Team ID", 400);
    }

    const body = await req.json();
    const updatedTeam = await Team.findByIdAndUpdate(teamId, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedTeam) return errorResponse("Team not found", 404);

    return NextResponse.json({ success: true, data: updatedTeam });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return errorResponse(message, 500);
  }
}

// DELETE: remove a team by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    await dbConnect();
    const { teamId } = await context.params;

    if (!validateObjectId(teamId)) {
      return errorResponse("Invalid Team ID", 400);
    }

    const deletedTeam = await Team.findByIdAndDelete(teamId).lean();
    if (!deletedTeam) return errorResponse("Team not found", 404);

    // Optional: also delete projects of this team
    await Project.deleteMany({ team: teamId });

    return NextResponse.json({
      success: true,
      message: "Team and associated projects deleted",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return errorResponse(message, 500);
  }
}
