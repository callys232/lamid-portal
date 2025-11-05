// src/component/profile/Teams/MilestoneItem.tsx
import React from "react";

interface MilestoneItemProps {
  title: string;
  accomplished: boolean;
}

export function MilestoneItem({ title, accomplished }: MilestoneItemProps) {
  return (
    <li className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-md hover:ring-2 hover:ring-red-500 transition">
      <span>{title}</span>
      <span
        className={`text-xs px-2 py-1 rounded ${
          accomplished ? "bg-green-600" : "bg-yellow-600"
        } text-white`}
      >
        {accomplished ? "Done" : "Pending"}
      </span>
    </li>
  );
}
