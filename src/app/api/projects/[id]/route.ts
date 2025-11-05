import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/app/models/Project";

// ✅ GET — Retrieve project by ID
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const { id } = context.params;

  const project = await Project.findById(id);

  if (!project) {
    return NextResponse.json(
      { success: false, message: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: project });
}

// ✅ PUT — Update project by ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const { id } = context.params;
  const body = await req.json();

  const updatedProject = await Project.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!updatedProject) {
    return NextResponse.json(
      { success: false, message: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: updatedProject });
}

// ✅ DELETE — Remove project by ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const { id } = context.params;

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
