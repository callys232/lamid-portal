import mongoose, { Schema, Document, Model } from "mongoose";

export interface IConsultant extends Document {
  name: string;
  industry: string;
  delivery: string;
  rate: string;
  rating: number;
  image?: string;
  experience?: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const ConsultantSchema: Schema<IConsultant> = new Schema(
  {
    name: { type: String, required: true },
    industry: { type: String, required: true },
    delivery: { type: String, required: true }, // e.g. "remote" or "onsite"
    rate: { type: String, required: true }, // e.g. "50/hr"
    rating: { type: Number, required: true, min: 0, max: 5 },
    image: { type: String },
    experience: { type: Number }, // years of experience
    role: { type: String, required: true },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Prevent model overwrite in dev/hot‑reload
const Consultant: Model<IConsultant> =
  mongoose.models.Consultant ||
  mongoose.model<IConsultant>("Consultant", ConsultantSchema);

export default Consultant;
