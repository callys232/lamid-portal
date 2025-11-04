import { ClientProfile } from "@/types/client";

export const mockClient: ClientProfile = {
  id: "client-001",
  name: "Jane Doe",
  email: "jane.doe@techcorp.com",
  companyName: "TechCorp Solutions",
  industry: "Software Development",
  location: "Remote",

  projects: [
    {
      _id: "proj-db-001",
      id: "proj-001",
      title: "AI-Powered Analytics Dashboard",
      category: "Data Science",
      tech: "React, Node.js, Python",
      location: "Remote",
      budget: "$25,000",
      hourlyRate: "$80",
      rating: 4.7,
      organization: "TechCorp",
      image: "/images/projects/dashboard.png",
      consultants: [
        {
          id: "cons-001",
          name: "Michael Smith",
          industry: "Data Science",
          delivery: "Agile Sprints",
          rate: "$75",
          rating: 5,
          image: "/images/consultants/michael.png",
          experience: 6,
        },
      ],
    },
    {
      _id: "proj-db-002",
      id: "proj-002",
      title: "Mobile Banking App",
      category: "FinTech",
      tech: "Flutter, Firebase",
      location: "Lagos, Nigeria",
      budget: "$40,000",
      hourlyRate: "$90",
      rating: 4.5,
      organization: "FinServe Ltd",
      image: "/images/projects/mobilebank.png",
      consultants: [
        {
          id: "cons-002",
          name: "Sarah Johnson",
          industry: "Mobile Development",
          delivery: "Milestone-Based",
          rate: "$85",
          rating: 4,
          image: "/images/consultants/sarah.png",
          experience: 4,
        },
      ],
    },
  ],

  consultants: [
    {
      id: "cons-003",
      name: "David Lee",
      industry: "Cloud Infrastructure",
      delivery: "Continuous Delivery",
      rate: "$95",
      rating: 5,
      image: "/images/consultants/david.png",
      experience: 8,
    },
  ],

  escrowTransactions: [
    {
      id: "escrow-001",
      amount: 5000,
      currency: "USD",
      status: "funded",
      createdAt: "2025-10-01T10:00:00Z",
      updatedAt: "2025-10-02T12:00:00Z",
    },
    {
      id: "escrow-002",
      amount: 12000,
      currency: "USD",
      status: "pending",
      createdAt: "2025-10-15T09:30:00Z",
      updatedAt: "2025-10-15T09:30:00Z",
    },
  ],

  invitations: [
    {
      id: "invite-001",
      projectId: "proj-001",
      invitedBy: "admin@techcorp.com",
      status: "accepted",
      createdAt: "2025-09-20T08:00:00Z",
    },
    {
      id: "invite-002",
      projectId: "proj-002",
      invitedBy: "hr@finserve.com",
      status: "pending",
      createdAt: "2025-10-05T14:00:00Z",
    },
  ],

  createdAt: "2025-09-01T12:00:00Z",
  updatedAt: "2025-10-20T15:00:00Z",
};
