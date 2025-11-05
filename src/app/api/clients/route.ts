import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Client from "@/app/models/Client";

export async function GET() {
  try {
    await dbConnect();

    const clients = await Client.find()
      .populate("projects")
      .populate("consultants")
      .populate("escrowTransactions")
      .populate("invitations");

    const formatted = clients.map((client: any) => ({
      ...client.toObject(),
      id: client._id.toString(),
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const newClient = await Client.create(body);

    return NextResponse.json({
      success: true,
      data: {
        ...newClient.toObject(),
        id: newClient._id.toString(),
      },
    });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create client" },
      { status: 500 }
    );
  }
}
