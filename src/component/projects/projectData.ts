export interface Project {
  _id?: string; // ✅ DB id support
  id?: string; // ✅ local id support
  title: string;
  category: string;
  tech?: string;
  location?: string;
  budget?: string;
  hourlyRate?: string;
  rating?: number;
  organization?: string;
  image?: string;
}

export const projectsData: Project[] = [
  {
    _id: "p2", // ✅ add mock `_id`
    id: "p2",
    title: "Game development",
    category: "Tecnology",
    tech: "IoT",
    location: "Hybrid",
    budget: "$1200",
    hourlyRate: "$50/hr",
    rating: 4,
    organization: "Gametech",
    image: "/projects/logistics.png",
  },
  {
    _id: "p2", // ✅ add mock `_id`
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
];
