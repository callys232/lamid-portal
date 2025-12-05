import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/app/models/Project";
import { teamProjects, individualProjects } from "@/mocks/mockClient";

function handleError(error: unknown) {
  if (error instanceof Error) {
    return { message: error.message, stack: error.stack };
  }
  return { message: String(error) };
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await context.params;

  try {
    // ✅ First check mock IDs before ObjectId validation
    const fallback =
      teamProjects.find((p) => p.id === id) ||
      individualProjects.find((p) => p.id === id);

    if (fallback) {
      return NextResponse.json({
        success: true,
        data: { ...fallback, id: fallback.id },
        source: "mock",
      });
    }

    // ✅ Then validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid project ID" },
        { status: 400 }
      );
    }

    // ✅ Connect to DB
    await dbConnect();

    // ✅ Query DB
    const project = await ProjectModel.findById(id)
      .populate("client")
      .populate("consultants")
      .populate("milestones")
      .exec();

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { ...project.toObject(), id: project._id.toString() },
      source: "db",
    });
  } catch (error: unknown) {
    const errInfo = handleError(error);
    console.error("Error fetching project:", errInfo);

    return NextResponse.json(
      { success: false, message: "Server error", error: errInfo.message },
      { status: 500 }
    );
  }
}
