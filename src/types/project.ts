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

  milestones?: Milestone[];

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
}

/* -------------------- PROJECT -------------------- */
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

  // ✅ unified milestone type
  milestones?: Milestone[];

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
}
