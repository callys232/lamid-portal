// src/component/projects/projectData.ts

export interface Project {
  id: string;
  title: string;
  category: string;
  tech: string;
  location: "Remote" | "On-site" | "Hybrid";
  budget: string;
  hourlyRate: string;
  rating: number;
  organization: string;
  image: string;
}

export const projectsData: Project[] = [
  {
    id: "p1",
    title: "AI Fitness Tracker",
    category: "Health",
    tech: "AI",
    location: "Hybrid",
    budget: "$2800",
    hourlyRate: "$85/hr",
    rating: 5,
    organization: "LamidaConsult",
    image: "/projects/fitness.png",
  },
  {
    id: "p2",
    title: "Smart Logistics Platform",
    category: "Tech",
    tech: "IoT",
    location: "Remote",
    budget: "$3200",
    hourlyRate: "$90/hr",
    rating: 4,
    organization: "LamidaConsult",
    image: "/projects/logistics.png",
  },
  // Add more projects...
];
