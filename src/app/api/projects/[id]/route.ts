import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/app/models/Project";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params; // 👈 await here
  const project = await Project.findById(id);

  if (!project) {
    return NextResponse.json(
      { success: false, message: "Project not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: project });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  const body = await req.json();

  const updated = await Project.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!updated) {
    return NextResponse.json(
      { success: false, message: "Project not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;

  const deleted = await Project.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json(
      { success: false, message: "Project not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({
    success: true,
    message: "Project deleted successfully",
  });
}
