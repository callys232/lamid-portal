import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/app/models/Project";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const project = await Project.findById(params.id);
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
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const body = await req.json();
  const updated = await Project.findByIdAndUpdate(params.id, body, {
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
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const deleted = await Project.findByIdAndDelete(params.id);
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
