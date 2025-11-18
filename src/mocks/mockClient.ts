import {
  ClientProfile,
  Consultant,
  TeamMember,
  EscrowTransaction,
  Invitation,
  AiActionLog,
} from "@/types/client";
import { Project, Milestone } from "@/types/project";

/* -------------------- MILESTONES -------------------- */
export const exampleMilestones: Milestone[] = [
  {
    id: "m1",
    title: "Design Phase",
    description: "UI/UX design and prototype creation",
    progress: 100,
    status: "completed",
  },
  {
    id: "m2",
    title: "Development Phase",
    description: "Frontend and backend development",
    progress: 50,
    status: "in_progress",
  },
  {
    id: "m3",
    title: "Testing & QA",
    description: "Final testing and client feedback integration",
    progress: 0,
    status: "pending",
  },
];

/* -------------------- PROJECTS -------------------- */
export const teamProjects: Project[] = [
  {
    _id: "tp1",
    id: "tp1",
    title: "Team Project Alpha",
    category: "Web",
    tech: "React.js",
    location: "Remote",
    budget: "$5000",
    hourlyRate: "$50/hr",
    rating: 4.5,
    organization: "Fallback Corp",
    status: "ongoing",
    priority: "High",
    deadline: "2025-12-31",
    teamId: "team1",
    ownerId: "client1",
    milestones: exampleMilestones,
    consultants: ["c1"],
    milestoneProgress: 60,
    image: "https://placehold.co/600x400?text=Team+Alpha",
  },
  {
    _id: "tp2",
    id: "tp2",
    title: "Team Project Beta",
    category: "Mobile",
    tech: "Flutter",
    location: "Onsite",
    budget: "$8000",
    hourlyRate: "$70/hr",
    rating: 4.8,
    organization: "Fallback Corp",
    status: "completed",
    priority: "Medium",
    deadline: "2025-10-15",
    teamId: "team1",
    ownerId: "client1",
    milestones: exampleMilestones.slice(0, 2),
    consultants: ["c2"],
    milestoneProgress: 100,
    image: "https://placehold.co/600x400?text=Team+Beta",
  },
];

export const individualProjects: Project[] = [
  {
    _id: "ip1",
    id: "ip1",
    title: "Individual Project Gamma",
    category: "AI",
    tech: "Python",
    location: "Remote",
    budget: "$2000",
    hourlyRate: "$40/hr",
    rating: 4.2,
    organization: "Independent",
    status: "ongoing",
    priority: "High",
    deadline: "2025-11-30",
    ownerId: "client2",
    milestones: exampleMilestones,
    consultants: ["c1"],
    milestoneProgress: 30,
    image: "https://placehold.co/600x400?text=Gamma",
  },
  {
    _id: "ip2",
    id: "ip2",
    title: "Individual Project Delta",
    category: "Design",
    tech: "Figma",
    location: "Hybrid",
    budget: "$1000",
    hourlyRate: "$25/hr",
    rating: 4.0,
    organization: "Independent",
    status: "completed",
    priority: "Low",
    deadline: "2025-09-01",
    ownerId: "client2",
    milestones: exampleMilestones.slice(0, 1),
    consultants: ["c2"],
    milestoneProgress: 100,
    image: "https://placehold.co/600x400?text=Delta",
  },
];

/* -------------------- CONSULTANTS -------------------- */
export const mockConsultants: Consultant[] = [
  {
    id: "c1",
    name: "Jane Smith",
    industry: "Technology",
    delivery: "Remote",
    rate: "$50/hr",
    rating: 4.7,
    role: "Lead Developer",
    email: "jane@example.com",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    projects: [individualProjects[0]],
    // skills: ["React.js", "Python", "UI/UX"],
    skills: "react",
  },
  {
    id: "c2",
    name: "Bob Brown",
    industry: "Finance",
    delivery: "Onsite",
    rate: "$60/hr",
    rating: 4.5,
    role: "Financial Consultant",
    email: "bob@example.com",
    image: "https://randomuser.me/api/portraits/men/70.jpg",
    projects: [individualProjects[1]],
    // skills: ["Flutter", "Figma", "Financial Analysis"],
    skills: "flutter",
  },
];

/* -------------------- TEAM MEMBERS -------------------- */
export const mockTeamMembers: TeamMember[] = [
  {
    id: "t1",
    name: "Alice Cooper",
    role: "Project Manager",
    email: "alice@example.com",
    addedAt: new Date().toISOString(),
    projects: [teamProjects[0]],
  },
  {
    id: "t2",
    name: "David Kim",
    role: "UI Designer",
    email: "david@example.com",
    addedAt: new Date().toISOString(),
    projects: [teamProjects[1]],
  },
];

/* -------------------- ESCROW TRANSACTIONS -------------------- */
export const mockEscrowTransactions: EscrowTransaction[] = [
  {
    id: "e1",
    projectId: "tp1",
    amount: 500,
    currency: "USD",
    status: "released",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    milestoneId: "m1",
  },
];

/* -------------------- INVITATIONS -------------------- */
export const mockInvitations: Invitation[] = [
  {
    id: "i1",
    invitedBy: "client1",
    consultantId: "c1",
    method: "consultant",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

/* -------------------- AI LOGS -------------------- */
export const mockAiLogs: AiActionLog[] = [
  {
    id: "log1",
    actionType: "matching",
    message: "AI matched consultant Jane Smith to Project Gamma.",
    createdAt: new Date().toISOString(),
    relatedProjectId: "ip1",
    relatedConsultantId: "c1",
  },
];

/* -------------------- CLIENTS -------------------- */
export const mockClients: ClientProfile[] = [
  {
    id: "client1",
    username: "CatalForc",
    name: "Caleb",
    email: "techbuddie@example.com",
    companyname: "Fallback Corp",
    avatar: "https://randomuser.me/api/portraits/black/72.jpg",
    bio: "Tech enthusiast building solutions with AI and web automation.",
    isPremium: true,
    projects: [...teamProjects, ...individualProjects],
    consultants: mockConsultants,
    teamMembers: mockTeamMembers,
    escrowTransactions: mockEscrowTransactions,
    invitations: mockInvitations,
    aiLogs: mockAiLogs,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "client2",
    username: "alicej",
    name: "Alice Johnson",
    email: "alice@example.com",
    companyname: "Example LLC",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    isPremium: false,
    projects: [...teamProjects, ...individualProjects],
    consultants: mockConsultants,
    teamMembers: mockTeamMembers,
    escrowTransactions: [],
    invitations: [],
    aiLogs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/* -------------------- ACTIVE CLIENT -------------------- */
export const activeClient = mockClients[0];
