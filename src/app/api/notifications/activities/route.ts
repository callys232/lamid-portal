import { NextResponse } from "next/server";

export async function GET() {
  // Replace with DB query
  const activities = [
    { id: "a1", type: "deposit", label: "Deposits", value: "+ $500" },
    { id: "a2", type: "milestone", label: "Milestones", value: "2 Pending" },
    { id: "a3", type: "project", label: "Project Name", value: "AI Dashboard" },
    {
      id: "a4",
      type: "consultant",
      label: "Consultant Name",
      value: "Jane Doe",
    },
  ];
  return NextResponse.json({ success: true, data: activities });
}
