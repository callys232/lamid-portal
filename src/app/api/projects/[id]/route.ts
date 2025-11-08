import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/app/models/Project";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await dbConnect();
    const project = await ProjectModel.findById(id)
      .populate("client")
      .populate("consultants")
      .populate("milestones")
      .exec();

    if (!project)
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      data: { ...project.toObject(), id: project._id.toString() },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await dbConnect();
    const body = await request.json();
    const updated = await ProjectModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updated)
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await dbConnect();
    const deleted = await ProjectModel.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
