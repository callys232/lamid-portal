import { NextResponse } from "next/server";

export async function GET() {
  const messages = [
    { id: "m1", type: "escrow", label: "Messages in Escrow", count: 3 },
    {
      id: "m2",
      type: "consultant",
      label: "Messages from Consultant",
      count: 5,
    },
    { id: "m3", type: "active", label: "Active Projects", count: 2 },
    { id: "m4", type: "completed", label: "Completed", count: 4 },
  ];
  return NextResponse.json({ success: true, data: messages });
}
