import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ClientModel from "@/app/models/Client";
import type { Document, Types } from "mongoose";
import { ClientProfile } from "@/types/client";

/**
 * Safely map a Mongoose document to include `id`
 */
function mapClientDoc(doc: Document & Partial<ClientProfile>) {
  return {
    ...doc.toObject(),
    id: doc._id?.toString() || "",
  } as ClientProfile;
}

export async function GET() {
  try {
    await dbConnect();

    const clients = await ClientModel.find()
      .populate("projects")
      .populate("consultants")
      .populate("escrowTransactions")
      .populate("invitations")
      .exec();

    const formatted: ClientProfile[] = clients.map((client) =>
      mapClientDoc(client)
    );

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

    const newClient = await ClientModel.create(body);

    return NextResponse.json({
      success: true,
      data: mapClientDoc(newClient),
    });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create client" },
      { status: 500 }
    );
  }
}
