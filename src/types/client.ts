// types/client.ts
import { Project } from "./project";
import { Milestone } from "./project";

/* -------------------- CONSULTANTS -------------------- */
export interface Consultant {
  id: string;
  _id?: string;
  name: string;
  industry: string;
  delivery: string;
  rate: string | number;
  rating: number;
  image?: string;
  experience?: number;
  role: string;
  email?: string;
  skills?: string;

  // ✅ Consultants can have their own projects
  projects?: Project[];
}

/* -------------------- ESCROW TRANSACTIONS -------------------- */
export interface EscrowTransaction {
  id: string;
  _id?: string;
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

  releaseDate?: string;
  notes?: string;
  milestoneId?: string;
  milestones?: Milestone[];
}

/* -------------------- INVITATIONS -------------------- */
export interface Invitation {
  id: string;
  _id?: string;
  invitedBy?: string;
  projectId?: string;
  email?: string;
  consultantId?: string;

  method: "email" | "consultant" | "ai";
  status: "pending" | "accepted" | "declined";

  createdAt: string;
}

/* -------------------- TEAM MEMBERS -------------------- */
export interface TeamMember {
  id: string;
  _id?: string;
  name: string;
  role: string;
  email: string;
  addedAt: string;

  // ✅ Team members can have their own projects
  projects?: Project[];
}

/* -------------------- AI AGENT LOGS -------------------- */
export interface AiActionLog {
  id: string;
  _id?: string;
  actionType:
    | "onboarding"
    | "project-scoping"
    | "matching"
    | "notification"
    | "marketing"
    | "support";
  message: string;
  createdAt: string;

  // optional reference
  relatedProjectId?: string;
  relatedConsultantId?: string;
}

/* -------------------- AI PREFERENCES -------------------- */
export interface AiPreferences {
  tone?: "formal" | "neutral" | "friendly" | "technical";
  automationLevel?: "manual" | "assist" | "auto";
  onboardingCompleted?: boolean;
  industryKeywords?: string[];
  aiAssistantEnabled?: boolean;
}

/* -------------------- BUSINESS PROFILE -------------------- */
export interface BusinessProfile {
  companyName?: string;
  _id?: string;
  industry?: string;
  location?: string;
  size?: "1-10" | "11-50" | "51-200" | "200+";
  website?: string;
}

/* -------------------- CLIENT PROFILE (MASTER) -------------------- */
export interface ClientProfile {
  id: string;
  _id?: string;
  name: string;
  email: string;
  username: string | number;

  business?: BusinessProfile;
  ai?: AiPreferences;

  projects: Project[];
  consultants: Consultant[];
  escrowTransactions: EscrowTransaction[];
  invitations: Invitation[];
  teamMembers?: TeamMember[];
  aiLogs?: AiActionLog[];

  createdAt: string;
  updatedAt: string;
  companyname?: string;
  bio?: string;
  isPremium?: boolean;
  avatar?: string;
  location?: string;
  industry?: string;
  balance?: number;
  alerts?: Alert[];
  notifications?: Notification[];
}

export interface Alert {
  id: string;
  type:
    | "Broadcast"
    | "escrow"
    | "payment"
    | "milestone"
    | "message"
    | "Email"
    | "Slack"
    | "Sms"
    | "Risk"
    | "document"
    | "complaint";
  message: string;

  channel?: string;
  severity?: "Low" | "Medium" | "High";
  createdAt?: string;
}

export interface Notification {
  id: string;
  message: string;
  createdAt?: string;
  type:
    | "Broadcast"
    | "escrow"
    | "payment"
    | "milestone"
    | "message"
    | "Email"
    | "Slack"
    | "Sms"
    | "Risk"
    | "document"
    | "complaint";
  severity?: "Low" | "Medium" | "High";
}
