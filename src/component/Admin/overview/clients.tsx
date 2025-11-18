"use client";
import React from "react";
import { ClientProfile } from "@/types/client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Props {
  client?: ClientProfile;
}

const mockClient: ClientProfile = {
  id: "cl1",
  name: "Lamid Corp",
  email: "admin@lamid.com",
  username: "lamid",
  projects: [{ id: "p1", title: "Alpha", category: "Tech" }],
  consultants: [
    {
      id: "c1",
      name: "Jane Doe",
      industry: "Tech",
      delivery: "Remote",
      rate: "50/hr",
      rating: 4.5,
      role: "Developer",
    },
    {
      id: "c2",
      name: "John Smith",
      industry: "Finance",
      delivery: "Onsite",
      rate: "70/hr",
      rating: 3.8,
      role: "Analyst",
    },
  ],
  escrowTransactions: [],
  invitations: [],
  createdAt: "",
  updatedAt: "",
  balance: 12000,
  isPremium: true,
};

export default function ClientStats({ client = mockClient }: Props) {
  const totalConsultants = client.consultants?.length ?? 0;
  const totalProjects = client.projects?.length ?? 0;
  const totalEscrows = client.escrowTransactions?.length ?? 0;
  const totalInvitations = client.invitations?.length ?? 0;

  // Pie chart data for distribution
  const pieData = [
    { name: "Projects", value: totalProjects },
    { name: "Consultants", value: totalConsultants },
    { name: "Escrows", value: totalEscrows },
    { name: "Invitations", value: totalInvitations },
  ];
  const COLORS = ["#c21229", "#ff6666", "#444", "#888"];

  // Trend line mock data (growth over months)
  const trendData = [
    { month: "Jan", projects: 1, consultants: 1 },
    { month: "Feb", projects: 2, consultants: 1 },
    { month: "Mar", projects: 3, consultants: 2 },
    { month: "Apr", projects: 4, consultants: 2 },
    { month: "May", projects: 5, consultants: 3 },
  ];

  return (
    <div
      className="bg-[#0f0f0f]/70 backdrop-blur-md border border-[#1f1f1f] rounded-lg p-6 
                 shadow-lg transition-transform duration-300 
                 hover:scale-105 hover:shadow-[0_0_25px_#c21229]"
    >
      <h3 className="text-lg font-semibold text-white mb-4">
        📊 Client Metrics
      </h3>
      <p className="text-sm text-gray-300">
        Projects: <span className="font-bold">{totalProjects}</span>
      </p>
      <p className="text-sm text-gray-300">
        Consultants: <span className="font-bold">{totalConsultants}</span>
      </p>
      <p className="text-sm text-gray-300">
        Escrows: <span className="font-bold">{totalEscrows}</span>
      </p>
      <p className="text-sm text-gray-300">
        Invitations: <span className="font-bold">{totalInvitations}</span>
      </p>

      {/* Pie Chart */}
      <div className="h-40 mt-4">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={60}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Line Chart */}
      <div className="h-40 mt-6">
        <ResponsiveContainer>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="projects"
              stroke="#c21229"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="consultants"
              stroke="#ff6666"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
