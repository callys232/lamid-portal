import { NextResponse } from "next/server";

interface TeamMember {
  id: number;
  name: string;
  role: string;
}
interface Milestone {
  id: number;
  title: string;
  accomplished: boolean;
}
interface Payment {
  id: number;
  label: string;
  status: "paid" | "pending";
  amount?: number;
}
interface Alert {
  id: number;
  message: string;
  type: "overdue" | "upcoming" | "payment" | "success";
}
interface Project {
  id: string;
  name: string;
  teamNumber: string;
  clientName: string;
  members: TeamMember[];
  milestones: Milestone[];
  payments: Payment[];
  alerts: Alert[];
}

// Fake DB
const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Project 1",
    teamNumber: "#11111",
    clientName: "Acme Corp",
    members: [
      { id: 1, name: "Alice", role: "Frontend Developer" },
      { id: 2, name: "Bob", role: "Backend Developer" },
    ],
    milestones: [
      { id: 1, title: "Design Wireframes", accomplished: true },
      { id: 2, title: "API Integration", accomplished: false },
    ],
    payments: [
      { id: 1, label: "Initial Deposit", status: "paid", amount: 300 },
      { id: 2, label: "Milestone 1", status: "pending" },
    ],
    alerts: [
      { id: 1, message: "Overdue: API Integration", type: "overdue" },
      { id: 2, message: "Pending Payment: Milestone 1", type: "payment" },
    ],
  },
  {
    id: "p2",
    name: "Project 2",
    teamNumber: "#22222",
    clientName: "Globex Inc",
    members: [
      { id: 1, name: "Charlie", role: "UI Designer" },
      { id: 2, name: "Dana", role: "QA Engineer" },
    ],
    milestones: [
      { id: 1, title: "Setup Repo", accomplished: true },
      { id: 2, title: "Implement Auth", accomplished: false },
    ],
    payments: [
      { id: 1, label: "Initial Deposit", status: "paid", amount: 500 },
      { id: 2, label: "Milestone 1", status: "pending" },
    ],
    alerts: [
      { id: 1, message: "Upcoming: Implement Auth", type: "upcoming" },
      { id: 2, message: "Payment received: Initial Deposit", type: "success" },
    ],
  },
];

export async function GET(
  req: Request,
  { params }: { params: { teamId: string } }
) {
  // In a real DB, filter by teamId
  return NextResponse.json({ success: true, data: PROJECTS });
}
