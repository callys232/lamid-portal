import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    tech: { type: [String], default: [] }, // <-- changed to array for multiple tech stacks
    location: { type: String, trim: true },

    // Finance fields
    budget: { type: String },
    hourlyRate: { type: String },

    // Rating
    rating: { type: Number, default: 0, min: 0, max: 5 },

    organization: { type: String, trim: true },
    image: { type: String },

    description: { type: String },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    deadline: { type: Date },

    owner: { type: String, trim: true },

    // Team can store user IDs or names
    team: [{ type: String }],
  },
  { timestamps: true }
);

// Prevents model overwrite on hot reload (Next.js)
const Project = models.Project || mongoose.model("Project", ProjectSchema);
export default Project;
