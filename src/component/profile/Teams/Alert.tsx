// src/component/profile/Teams/Alert.tsx
import React from "react";

interface AlertItemProps {
  message: string;
  type: "overdue" | "upcoming" | "payment" | "success";
}

export function AlertItem({ message, type }: AlertItemProps) {
  const style =
    {
      overdue: "bg-red-600",
      upcoming: "bg-yellow-600",
      payment: "bg-blue-600",
      success: "bg-green-600",
    }[type] || "bg-gray-800";

  return (
    <li className={`px-3 py-2 rounded-md text-white ${style}`}>{message}</li>
  );
}
