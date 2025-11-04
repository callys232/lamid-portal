import "dotenv/config";
import dbConnect from "../lib/dbConnect";
import Client from "@/app/models/Client";
import Project from "@/app/models/Project";
import Transaction from "@/app/models/Transactions";
import Team from "@/app/models/Teams";

import { mockClient } from "@/mocks/mockClient";

// Optional: add more mock data arrays if you have them
// import { mockProjects } from "@/mocks/mockProjects";
// import { mockTransactions } from "@/mocks/mockTransactions";

async function seed() {
  try {
    await dbConnect();

    console.log("🌱 Starting database seeding...");

    // Clear existing collections (optional)
    await Promise.all([
      Client.deleteMany({}),
      Project.deleteMany({}),
      Transaction.deleteMany({}),
      Team.deleteMany({}),
    ]);

    // Insert mock client
    await Client.create(mockClient);

    // If you have separate mock arrays, you can insert them like this:
    // await Project.insertMany(mockProjects);
    // await Transaction.insertMany(mockTransactions);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();
