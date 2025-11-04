import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/app/models/Transactions";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  const transaction = await Transaction.findById(id);
  return NextResponse.json({ success: true, data: transaction });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  const body = await req.json();
  const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json(
    { success: true, message: "Deleted" },
    { status: 204 }
  );
}
