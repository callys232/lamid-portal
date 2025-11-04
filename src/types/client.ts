// types/client.ts

import { Project, Milestone } from "./project";

export interface Consultant {
  id: string;
  name: string;
  industry: string;
  delivery: string;
  rate: string;
  rating: number;
  image?: string;
  experience?: number;
  role: string;
}

export interface EscrowTransaction {
  id: string;
  projectId: string;
  amount: number;
  currency: string;
  status:
    | "pending"
    | "funded"
    | "released"
    | "cancelled"
    | "disputed"
    | "completed";
  createdAt: string;
  updatedAt: string;

  // Optional UI fields
  releaseDate?: string;
  notes?: string;

  // Single milestone trigger (for release actions)
  milestoneId?: string;

  // Multiple milestone objects for UI / table / project page
  milestones?: Milestone[];
}

export interface Invitation {
  id: string;

  // Who sent the invitation (client ID, system, or AI)
  invitedBy?: string;

  // Project-specific if applicable
  projectId?: string;

  // Email or consultant-based invitation
  email?: string;
  consultantId?: string;

  // How the invite was sent
  method: "email" | "consultant" | "ai";

  // Status
  status: "pending" | "accepted" | "declined";

  createdAt: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  industry?: string;
  location?: string;

  projects: Project[];
  consultants: Consultant[];
  escrowTransactions: EscrowTransaction[];
  invitations: Invitation[];

  createdAt: string;
  updatedAt: string;
}
