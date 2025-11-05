import mongoose, { Schema, Document } from "mongoose";
import { ClientProfile } from "@/types/client";

export interface IClient extends Omit<ClientProfile, "id">, Document {}

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    companyName: String,
    industry: String,
    location: String,

    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    consultants: [{ type: Schema.Types.ObjectId, ref: "Consultant" }],
    escrowTransactions: [{ type: Schema.Types.ObjectId, ref: "Escrow" }],
    invitations: [{ type: Schema.Types.ObjectId, ref: "Invitation" }],
  },
  { timestamps: true }
);

export default mongoose.models.Client ||
  mongoose.model<IClient>("Client", ClientSchema);
