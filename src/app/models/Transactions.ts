import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  id: string;
  projectId: string;
  projectTitle: string;
  date: string;
  type: "Deposit" | "Release";
  amount: number;
  status: "Held" | "Completed";
  action: "View" | "Receipt";
}

const TransactionSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  projectId: { type: String, required: true },
  projectTitle: { type: String, required: true },
  date: { type: String, required: true },
  type: { type: String, enum: ["Deposit", "Release"], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Held", "Completed"], required: true },
  action: { type: String, enum: ["View", "Receipt"], required: true },
});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
