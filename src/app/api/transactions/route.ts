import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/app/models/Transactions";

// GET all transactions
export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find();
  return NextResponse.json({ success: true, data: transactions });
}

// POST new transaction
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const newTransaction = await Transaction.create(body);
    return NextResponse.json(
      { success: true, data: newTransaction },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
