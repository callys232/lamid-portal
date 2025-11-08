import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Client from "@/app/models/Client";
import Project from "@/app/models/Project";
import Consultant from "@/app/models/Consultants";
import Escrow from "@/app/models/Escrow";
import Invitation from "@/app/models/Invitation";

async function seed() {
  await dbConnect();

  console.log("🌱 Starting seeding...");

  // Clear old data (optional)
  await Client.deleteMany({});
  await Project.deleteMany({});
  await Consultant.deleteMany({});
  await Escrow.deleteMany({});
  await Invitation.deleteMany({});

  // Create consultants
  const consultants = await Consultant.insertMany([
    {
      name: "Jane Doe",
      industry: "Fintech",
      delivery: "Remote",
      rate: "$50/hr",
      rating: 4.8,
      role: "consultant",
    },
    {
      name: "John Smith",
      industry: "Healthcare",
      delivery: "Onsite",
      rate: "$70/hr",
      rating: 4.6,
      role: "consultant",
    },
  ]);

  // Create projects
  const projects = await Project.insertMany([
    {
      name: "Payment Gateway Integration",
      category: "Fintech",
      status: "completed",
    },
    {
      name: "Hospital Management System",
      category: "Healthcare",
      status: "ongoing",
    },
  ]);

  // Create escrow transactions
  const escrows = await Escrow.insertMany([
    {
      projectId: projects[0]._id,
      amount: 5000,
      currency: "USD",
      status: "completed",
    },
    {
      projectId: projects[1]._id,
      amount: 2000,
      currency: "USD",
      status: "funded",
    },
  ]);

  // Create invitations
  const invitations = await Invitation.insertMany([
    {
      invitedBy: "system",
      projectId: projects[0]._id,
      email: "invitee@example.com",
      method: "email",
      status: "pending",
    },
  ]);

  // Create client
  const client = await Client.create({
    name: "Caleb Johnson",
    email: "caleb@example.com",
    companyName: "LamidTech",
    industry: "Software",
    location: "Lagos, Nigeria",
    projects: projects.map((p) => p._id),
    consultants: consultants.map((c) => c._id),
    escrowTransactions: escrows.map((e) => e._id),
    invitations: invitations.map((i) => i._id),
  });

  console.log("✅ Seeding complete. Client ID:", client._id);

  mongoose.connection.close();
}

seed().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
