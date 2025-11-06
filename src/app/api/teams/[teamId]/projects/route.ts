import { NextResponse } from "next/server";

// Mock data for now — replace with DB call
const projects = [
  {
    _id: "p1",
    title: "AI Dashboard",
    category: "Software",
    tech: "React, Node.js",
    location: "Remote",
    budget: "$10,000",
    hourlyRate: "$50/hr",
    rating: 4.8,
    organization: "TechCorp",
    image: "/project-logo.png",
    milestones: [
      {
        id: "m1",
        title: "Design Phase",
        description: "UI/UX design completed",
        amount: 2000,
        dueDate: "2025-12-01",
        progress: 100,
        status: "completed",
      },
      {
        id: "m2",
        title: "Development Phase",
        description: "Backend and frontend integration",
        amount: 5000,
        dueDate: "2026-01-15",
        progress: 40,
        status: "in_progress",
      },
    ],
    consultants: [
      { id: "c1", name: "Jane Doe" },
      { id: "c2", name: "John Smith" },
    ],
    priority: "High",
    deadline: "2026-02-01",
    status: "Active",
  },
];

export async function GET(
  req: Request,
  { params }: { params: { teamId: string } }
) {
  const { teamId } = params;

  // In real app, fetch from DB using teamId
  // e.g. const projects = await db.collection("projects").find({ teamId }).toArray();

  return NextResponse.json({ data: projects });
}
