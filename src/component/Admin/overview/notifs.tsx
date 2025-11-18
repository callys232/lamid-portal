"use client";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Notification {
  id: string;
  message: string;
  createdAt?: string; // ISO date string
}

interface Props {
  notifications?: Notification[];
}

const mockNotifications: Notification[] = [
  { id: "1", message: "New consultant joined", createdAt: "2025-11-12" },
  { id: "2", message: "Policy update applied", createdAt: "2025-11-12" },
  { id: "3", message: "Finance report exported", createdAt: "2025-11-11" },
  { id: "4", message: "Escrow funded", createdAt: "2025-11-11" },
  { id: "5", message: "Milestone released", createdAt: "2025-11-10" },
];

// Prepare chart data: count notifications per day
const aggregateByDay = (notifications: Notification[]) => {
  const counts: Record<string, number> = {};
  notifications.forEach((n) => {
    const day = n.createdAt ?? "Unknown";
    counts[day] = (counts[day] || 0) + 1;
  });
  return Object.entries(counts).map(([day, count]) => ({ day, count }));
};

export default function NotificationsPanel({
  notifications = mockNotifications,
}: Props) {
  const chartData = aggregateByDay(notifications);

  return (
    <div
      className="bg-[#0f0f0f]/70 backdrop-blur-md border border-[#1f1f1f] rounded-lg p-6 
                 shadow-lg transition-transform duration-300 
                 hover:scale-105 hover:shadow-[0_0_25px_#c21229]"
    >
      <h3 className="text-lg font-semibold text-white mb-3">
        🔔 Notifications
      </h3>

      {/* Summary Chart */}
      <div className="h-40 mb-4">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Bar dataKey="count" fill="#c21229" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Notifications List */}
      <ul className="space-y-2 text-sm text-gray-300">
        {notifications.map((n) => (
          <li
            key={n.id}
            className="flex justify-between items-center p-2 rounded-md hover:bg-[#c21229]/40 transition-colors"
          >
            <span>• {n.message}</span>
            {n.createdAt && (
              <span className="text-xs text-gray-400">{n.createdAt}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
