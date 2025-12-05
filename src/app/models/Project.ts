import mongoose, { Schema, Document, models } from "mongoose";

export interface Outreach {
  campaigns: string[];
  keywords: string[];
}

export interface ProjectDocument extends Document {
  title: string;
  category?: string;
  tech: string[];
  location?: string;
  budget?: string;
  hourlyRate?: string;
  rating: number;
  organization?: string;
  image?: string;
  description?: string;
  status: string;
  deadline?: Date;
  owner?: string;
  team: string[];
  outreach: Outreach;
}

const OutreachSchema = new Schema<Outreach>(
  {
    campaigns: { type: [String], default: [] },
    keywords: { type: [String], default: [] },
  },
  { _id: false }
);

const ProjectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true },
    category: String,
    tech: { type: [String], default: [] },
    location: String,
    budget: String,
    hourlyRate: String,
    rating: { type: Number, default: 0 },
    organization: String,
    image: String,
    description: String,
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    deadline: Date,
    owner: String,
    team: [{ type: String }],

    // ⭐ required to prevent "any"
    outreach: {
      type: OutreachSchema,
      default: () => ({ campaigns: [], keywords: [] }),
    },
  },
  { timestamps: true }
);

const Project =
  models.Project || mongoose.model<ProjectDocument>("Project", ProjectSchema);

export default Project;
