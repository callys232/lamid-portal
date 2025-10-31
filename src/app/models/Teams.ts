import mongoose, { Schema, models } from "mongoose";

const TeamSchema = new Schema(
  {
    name: { type: String, required: true }, // Team name (ex: "LamidaConsult Core Team")
    location: { type: String }, // ex: "Remote", "Lagos, Nigeria"
    members: [
      {
        fullName: { type: String, required: true },
        role: { type: String }, // ex: "Product Manager", "Developer"
        email: { type: String },
        avatar: { type: String }, // optional profile image
      },
    ],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }], // link to your project model
  },
  { timestamps: true }
);

const Team = models.Team || mongoose.model("Team", TeamSchema);
export default Team;
