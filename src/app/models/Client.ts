import mongoose, { Schema, Document, Model } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  companyName?: string;
  industry?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema: Schema<IClient> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    companyName: { type: String },
    industry: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev/hot-reload
const Client: Model<IClient> =
  mongoose.models.Client || mongoose.model<IClient>("Client", ClientSchema);

export default Client;
