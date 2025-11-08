import mongoose, { Schema, Document, models } from "mongoose";

export interface IInvitation extends Document {
  invitedBy?: string;
  projectId?: string;
  email?: string;
  consultantId?: string;
  method: "email" | "consultant" | "ai";
  status: "pending" | "accepted" | "declined";
  createdAt: Date;
}

const InvitationSchema = new Schema<IInvitation>(
  {
    invitedBy: { type: String },
    projectId: { type: String },
    email: { type: String },
    consultantId: { type: String },
    method: {
      type: String,
      enum: ["email", "consultant", "ai"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default models.Invitation ||
  mongoose.model<IInvitation>("Invitation", InvitationSchema);
