import { Consultant } from "./client";

export interface Project {
  _id?: string; // DB id
  id?: string; // Client id

  title: string;
  category: string;
  tech?: string;
  location?: string;
  budget?: string;
  hourlyRate?: string;
  rating?: number;
  organization?: string;
  image?: string;
  images?: string;

  milestones?: Milestone[];
  suggestedBidRange?: {
    min: number;
    max: number;
  };

  // ✅ Strongly typed consultants
  consultants?: string[] | Consultant[];

  priority?: string;
  deadline?: string;
  status?: string;

  // ✅ Optional ownership fields
  teamId?: string;
  ownerId?: string;

  // ✅ UI field
  milestoneProgress?: number;
  timeline?: string;
  skills?: string[];
  escrow?: EscrowTransaction[];
}

/* -------------------- MILESTONES -------------------- */
export type MilestoneStatus =
  | "pending"
  | "in_progress"
  | "funded"
  | "released"
  | "completed"
  | "cancelled"
  | "disputed";

export interface Milestone {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  amount?: number;
  dueDate?: string;
  progress?: number;
  status?: MilestoneStatus;
  deadline?: string;
}

export interface ActivityItem {
  id: string; // unique identifier
  action: string; // e.g. "Bid Placed", "Milestone Updated"
  user: string; // who performed the action
  timestamp: string; // ISO date string
  details?: string; // optional extra info
}
/* -------------------- ESCROW -------------------- */
export interface EscrowTransaction {
  id: string;
  projectId: string;
  milestoneId?: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  date?: string;
  type?: string;
  action?: string;
}
