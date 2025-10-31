import { NextResponse } from "next/server";

interface Project {
  id: string;
  title: string;
  organization: string;
  budget: string;
  hourlyRate: string;
  category: string;
  tech: string;
  location: string;
  image: string;
  rating: number;
  description: string;
  skills: string[];
  timeline: string;
  milestones: string[];
}

// Fake DB (replace with your MongoDB or Prisma fetch)
const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "AI-Powered Strategy Dashboard",
    organization: "Lamid Consulting",
    budget: "$10,000 - $15,000",
    hourlyRate: "$120/hr",
    category: "Tech & Software",
    tech: "React, Node.js, AI",
    location: "Remote",
    image: "/images/ai-dashboard.jpg",
    rating: 5,
    description:
      "Build a robust AI-driven business analytics dashboard for internal decision-making. The platform should support real-time financial data ingestion, AI-based predictions, and dynamic visualization tools.",
    skills: ["React", "Node.js", "Tailwind", "AI/ML", "Data Visualization"],
    timeline: "8 weeks",
    milestones: [
      "Week 1-2: UI/UX Design",
      "Week 3-4: Backend Development",
      "Week 5-6: AI Integration",
      "Week 7-8: Testing & Launch",
    ],
  },
];

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const project = PROJECTS.find((p: Project) => p.id === id);

  if (!project) {
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: project });
}
