// app/api/projects/[id]/outreach/export/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/app/models/Project";

// interface RouteParams {
//   id: string;
// }

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await context.params;

  try {
    await dbConnect();
    const project = await ProjectModel.findById(id).exec();

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    const outreach = project.outreach || { campaigns: [], keywords: [] };
    return NextResponse.json({ success: true, data: outreach });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await context.params;

  try {
    await dbConnect();
    const project = await ProjectModel.findById(id).exec();

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    const outreach = project.outreach || { campaigns: [], keywords: [] };
    return NextResponse.json({ success: true, report: outreach });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
