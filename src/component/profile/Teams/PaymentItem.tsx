// src/component/profile/Teams/PaymentItem.tsx
import React from "react";

interface PaymentItemProps {
  label: string;
  status: "paid" | "pending";
  amount?: number;
}

export function PaymentItem({ label, status, amount }: PaymentItemProps) {
  return (
    <li className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-md hover:ring-2 hover:ring-red-500 transition">
      <span>{label}</span>
      {status === "paid" ? (
        <span className="text-green-400 font-medium">${amount}</span>
      ) : (
        <span className="text-yellow-400">Pending</span>
      )}
    </li>
  );
}
