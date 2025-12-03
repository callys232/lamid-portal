import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProfile extends Document {
  name: string;
  email: string;
  bio?: string;
}

const ProfileSchema: Schema<IProfile> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
  },
  { timestamps: true }
);

const ProfileModel: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

export default ProfileModel;
