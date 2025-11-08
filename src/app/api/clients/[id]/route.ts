// api/client/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ClientModel from "@/app/models/Client";
import { ClientProfile } from "@/types/client";
import { Project } from "@/types/project";
import type { Document, Types } from "mongoose";

/**
 * Generic helper to map Mongoose Document or plain object to include `id`
 */
function mapWithId<T extends { _id?: Types.ObjectId | string }>(
  doc: T | Document
): T & { id: string } {
  const obj = (doc as Document).toObject?.() || doc;
  return { ...obj, id: obj._id?.toString() || "" };
}

/**
 * Type-safe GET handler for fetching a client by ID
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const clientDoc = await ClientModel.findById(params.id)
      .populate<Project>("projects")
      .populate("consultants")
      .populate("escrowTransactions")
      .populate("invitations")
      .exec();

    if (!clientDoc) {
      return NextResponse.json(
        { success: false, message: "Client not found" },
        { status: 404 }
      );
    }

    // Safely map populated arrays with explicit types
    const formatted: ClientProfile = {
      ...clientDoc.toObject(),
      id: clientDoc._id.toString(),

      projects: Array.isArray(clientDoc.projects)
        ? clientDoc.projects.map((p: Document & Project) =>
            mapWithId<Project>(p)
          )
        : [],

      consultants: Array.isArray(clientDoc.consultants)
        ? clientDoc.consultants.map((c: Document) => mapWithId(c))
        : [],

      escrowTransactions: Array.isArray(clientDoc.escrowTransactions)
        ? clientDoc.escrowTransactions.map((e: Document) => mapWithId(e))
        : [],

      invitations: Array.isArray(clientDoc.invitations)
        ? clientDoc.invitations.map((i: Document) => mapWithId(i))
        : [],
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
