import { NextResponse } from "next/server";

export async function GET() {
  const alerts = [
    { id: "al1", type: "todo", label: "To Do", status: "1 Task" },
    { id: "al2", type: "payment", label: "Payments", status: "1 Cleared" },
    { id: "al3", type: "review", label: "Review", status: "Pending" },
    { id: "al4", type: "progress", label: "In-progress", status: "2" },
    {
      id: "al5",
      type: "profile",
      label: "Profile Completion",
      status: "Incomplete",
    },
  ];
  return NextResponse.json({ success: true, data: alerts });
}
