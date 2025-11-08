import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ClientModel from "@/app/models/Client";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await dbConnect();
    const client = await ClientModel.findById(id)
      .populate("projects")
      .populate("consultants")
      .populate("escrowTransactions")
      .populate("invitations")
      .exec();

    if (!client)
      return NextResponse.json(
        { success: false, message: "Client not found" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      data: { ...client.toObject(), id: client._id.toString() },
    });
  } catch (error) {
    console.error("Error fetching client:", error);
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
    const updated = await ClientModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updated)
      return NextResponse.json(
        { success: false, message: "Client not found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating client:", error);
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
    const deleted = await ClientModel.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json(
        { success: false, message: "Client not found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, message: "Client deleted" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
