import mongoose, { Schema, Document, models } from "mongoose";

export interface IEscrow extends Document {
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
  createdAt: Date;
  updatedAt: Date;
  releaseDate?: Date;
  notes?: string;
  milestoneId?: string;
}

const EscrowSchema = new Schema<IEscrow>(
  {
    projectId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "funded",
        "released",
        "cancelled",
        "disputed",
        "completed",
      ],
      default: "pending",
    },
    releaseDate: { type: Date },
    notes: { type: String },
    milestoneId: { type: String },
  },
  { timestamps: true }
);

export default models.Escrow || mongoose.model<IEscrow>("Escrow", EscrowSchema);
