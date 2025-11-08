// seedClient.js
import mongoose from "mongoose";
import Client from "@/app/models/Client";
import Project from "@/app/models/Project";
import Consultant from "@/app/models/Consultants";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  await mongoose.connect(uri);

  // Create projects
  const projectA = await Project.create({
    name: "Website Redesign",
    status: "ongoing",
    category: "Design",
  });

  const projectB = await Project.create({
    name: "Mobile App Development",
    status: "new",
    category: "Development",
  });

  const projectC = await Project.create({
    name: "Marketing Campaign",
    status: "completed",
    category: "Marketing",
  });

  // Create consultants
  const consultant1 = await Consultant.create({
    name: "Jane Doe",
    industry: "Design",
    delivery: "remote",
    rate: "50/hr",
    rating: 4.8,
    role: "UI/UX Designer",
  });

  const consultant2 = await Consultant.create({
    name: "John Smith",
    industry: "Development",
    delivery: "onsite",
    rate: "70/hr",
    rating: 4.5,
    role: "Fullstack Developer",
  });

  // Create client with multiple projects and team members
  const client = await Client.create({
    name: "Acme Corporation",
    email: "contact@acme.com",
    business: {
      companyName: "Acme Corp",
      industry: "Technology",
      location: "Global",
      size: "200+",
      website: "https://acme.com",
    },
    projects: [projectA._id, projectB._id, projectC._id],
    consultants: [consultant1._id, consultant2._id],
    teamMembers: [
      {
        name: "Alice Johnson",
        role: "Project Manager",
        email: "alice@acme.com",
        addedAt: new Date().toISOString(),
      },
      {
        name: "Bob Williams",
        role: "QA Engineer",
        email: "bob@acme.com",
        addedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  console.log("Seeded client:", client);
  await mongoose.disconnect();
}

seed().catch((err) => console.error(err));
