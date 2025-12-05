import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/app/models/Project";

// Mock fallback
const mockOutreach = {
  campaigns: [
    {
      subject: "November Promo",
      content: "Save 20% on premium plans this month!",
      recipients: ["marketing@company.com", "sales@company.com"],
    },
  ],
  keywords: ["AI Copilot", "Project Analytics", "Lamid Premium"],
};

// GET outreach data
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

    // If outreach field exists in project, return it
    if (project.outreach) {
      return NextResponse.json({ success: true, data: project.outreach });
    }

    // Otherwise return mock fallback
    return NextResponse.json({ success: true, data: mockOutreach });
  } catch (error) {
    console.error("Error fetching outreach:", error);
    return NextResponse.json({ success: true, data: mockOutreach });
  }
}

// PATCH outreach settings (keywords, campaigns)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await context.params;
  try {
    await dbConnect();
    const body = await request.json();

    const updated = await ProjectModel.findByIdAndUpdate(
      id,
      { outreach: body },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated.outreach });
  } catch (error) {
    console.error("Error updating outreach:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// POST new campaign
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await context.params;
  try {
    await dbConnect();
    const body = await request.json();

    const project = await ProjectModel.findById(id);
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    project.outreach = project.outreach || { campaigns: [], keywords: [] };
    project.outreach.campaigns.push(body);
    await project.save();

    return NextResponse.json({ success: true, data: project.outreach });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
