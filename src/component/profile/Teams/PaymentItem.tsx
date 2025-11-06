"use client";
import React from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";

interface PaymentItemProps {
  label: string;
  status: "paid" | "pending";
  amount?: number;
  dueDate?: string; // ✅ new field
}

export function PaymentItem({
  label,
  status,
  amount,
  dueDate,
}: PaymentItemProps) {
  const isPaid = status === "paid";

  // Format amount consistently
  const formattedAmount =
    amount !== undefined
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
      : null;

  return (
    <li
      role="listitem"
      className="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-lg 
                 ring-1 ring-gray-700 hover:ring-2 hover:ring-red-500 
                 transition transform hover:scale-[1.02] shadow-sm"
    >
      {/* Left side: icon + label */}
      <div className="flex items-center gap-3">
        {isPaid ? (
          <FaCheckCircle
            className="text-green-400 hover:scale-110 transition"
            aria-label="Payment complete"
          />
        ) : (
          <FaClock
            className="text-yellow-400 hover:scale-110 transition"
            aria-label="Payment pending"
          />
        )}
        <span className="font-medium text-white">
          {label || "Unnamed Payment"}
        </span>
      </div>

      {/* Right side: status + amount/due date */}
      {isPaid ? (
        <span className="flex items-center gap-2">
          {formattedAmount && (
            <span className="text-green-400 font-semibold">
              {formattedAmount}
            </span>
          )}
          <span className="px-2 py-1 rounded-full bg-green-600 text-white text-xs font-bold">
            Paid
          </span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {dueDate && (
            <span className="text-gray-300 text-xs">📅 {dueDate}</span>
          )}
          <span className="px-2 py-1 rounded-full bg-yellow-600 text-white text-xs font-bold">
            Pending
          </span>
        </span>
      )}
    </li>
  );
}
