// types/project.ts

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
  title: string;
  description?: string;
  amount?: number;
  dueDate?: string;
  progress?: number;
  status?: MilestoneStatus;
}

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

  // ✅ Allow both ID array and populated consultant info
  consultants?: string[] | { id: string; name: string }[];

  priority?: string;
  deadline?: string;
  status?: string;

  // ✅ UI field
  milestoneProgress?: number;
}
