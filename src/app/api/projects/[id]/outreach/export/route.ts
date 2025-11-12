// app/api/projects/[id]/outreach/export/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/app/models/Project";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await dbConnect();
    const project = await ProjectModel.findById(id).exec();
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    // Gather outreach data
    const outreach = project.outreach || { campaigns: [], keywords: [] };

    // Here you could transform outreach into a CSV/PDF/etc.
    // For now, just return it as JSON
    return NextResponse.json({ success: true, report: outreach });
  } catch (error) {
    console.error("Error exporting outreach:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
