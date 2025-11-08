import mongoose, { Schema, Document, Types } from "mongoose";
import { ClientProfile } from "@/types/client";

// Omit both `id` and `_id` from ClientProfile to avoid conflict
export interface IClient extends Omit<ClientProfile, "id" | "_id">, Document {
  _id: Types.ObjectId; // explicitly define _id
}

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    companyname: String,
    business: {
      industry: String,
      location: String,
      companyName: String,
      size: String,
      website: String,
    },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    consultants: [{ type: Schema.Types.ObjectId, ref: "Consultant" }],
    escrowTransactions: [{ type: Schema.Types.ObjectId, ref: "Escrow" }],
    invitations: [{ type: Schema.Types.ObjectId, ref: "Invitation" }],
  },
  { timestamps: true }
);

export default mongoose.models.Client ||
  mongoose.model<IClient>("Client", ClientSchema);
