import React, { useState } from "react";

interface StatCardProps {
  value: string | number;
  label: string;
  details: string[]; // list of items to show in dropdown
}

export default function StatCard({ value, label, details }: StatCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative bg-gray-800 rounded-lg p-4 text-center shadow-md 
                 hover:ring-2 hover:ring-red-500 hover:shadow-lg 
                 transition transform hover:scale-105 cursor-pointer"
      onClick={() => setOpen(!open)}
      onMouseLeave={() => setOpen(false)}
    >
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 text-left">
          <ul className="divide-y divide-gray-700">
            {details.map((item, idx) => (
              <li
                key={idx}
                className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
