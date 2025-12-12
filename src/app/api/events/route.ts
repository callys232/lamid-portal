import { NextResponse } from "next/server";
import { mockEvents } from "@/mocks/mockEvents";

// Example: Replace with your DB client (Prisma, Mongo, etc.)
export async function GET() {
  try {
    // Example DB fetch (replace with your ORM/driver)
    // const events = await prisma.event.findMany();

    // For now, return mockEvents as fallback
    const events = mockEvents;

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(mockEvents, { status: 200 });
  }
}
