import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Client from "@/app/models/Client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const client = await Client.findById(params.id)
      .populate("projects")
      .populate("consultants")
      .populate("escrowTransactions")
      .populate("invitations");

    if (!client) {
      return NextResponse.json(
        { success: false, message: "Client not found" },
        { status: 404 }
      );
    }

    // Map MongoDB _id to your TS `id`
    const formatted = {
      ...client.toObject(),
      id: client._id.toString(),
    };

    return NextResponse.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
