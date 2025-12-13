import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/app/models/Transactions";
import { mockTransactions } from "@/mocks/mockEscrow";

export async function GET() {
  try {
    await dbConnect();
    const transactions = await Transaction.find();
    return NextResponse.json(
      { success: true, data: transactions },
      { status: 200 }
    );
  } catch (error) {
    console.error("DB GET failed, using mock transactions:", error);
    return NextResponse.json(
      { success: true, data: mockTransactions },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const newTransaction = await Transaction.create(body);
    return NextResponse.json(
      { success: true, data: newTransaction },
      { status: 201 }
    );
  } catch (error) {
    console.error("DB POST failed, using mock fallback:", error);
    const body = await req.json();
    const newTransaction = {
      ...body,
      id: `mock-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTransactions.push(newTransaction);
    return NextResponse.json(
      { success: true, data: newTransaction },
      { status: 201 }
    );
  }
}
