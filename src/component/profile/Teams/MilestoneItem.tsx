"use client";
import { motion } from "framer-motion";
import { MilestoneStatus } from "@/types/project";
import { FaCheckCircle, FaClock, FaTimesCircle, FaFlag } from "react-icons/fa";

interface MilestoneItemProps {
  title: string;
  description?: string;
  amount?: number;
  dueDate?: string;
  status?: MilestoneStatus;
  progress?: number;
  accomplished?: boolean;
}

export function MilestoneItem({
  title,
  description,
  amount,
  dueDate,
  status,
  progress = 0,
  accomplished,
}: MilestoneItemProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  // Gradient for the bar
  const barGradient =
    safeProgress >= 80
      ? "from-green-500 via-green-400 to-emerald-500"
      : safeProgress >= 40
      ? "from-yellow-500 via-amber-400 to-orange-500"
      : "from-red-500 via-rose-500 to-pink-500";

  // Text color for % label
  const percentColor =
    safeProgress >= 80
      ? "text-green-200"
      : safeProgress >= 40
      ? "text-yellow-200"
      : "text-red-200";

  // Status icon mapping
  const statusIcon =
    status === "completed" ? (
      <FaCheckCircle className="text-green-400" aria-hidden="true" />
    ) : status === "in_progress" || status === "pending" ? (
      <FaClock className="text-yellow-400" aria-hidden="true" />
    ) : status === "cancelled" || status === "disputed" ? (
      <FaTimesCircle className="text-red-400" aria-hidden="true" />
    ) : (
      <FaFlag className="text-gray-400" aria-hidden="true" />
    );

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-gray-800 rounded-md p-4 shadow-md ring-1 ring-gray-700 
                 hover:ring-2 hover:ring-red-500 transition transform hover:scale-[1.01]"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <span
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
            accomplished
              ? "bg-green-600 text-white"
              : "bg-yellow-600 text-white"
          }`}
        >
          {statusIcon}
          {status ?? "unknown"}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-gray-400 mb-2">{description}</p>
      )}

      {/* Meta info */}
      <div className="flex gap-3 text-xs text-gray-300">
        {amount !== undefined && (
          <span>
            💰{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)}
          </span>
        )}
        {dueDate && <span>📅 {dueDate}</span>}
      </div>

      {/* Progress Bar with % label */}
      <div className="relative w-full bg-gray-700 rounded-full h-4 mt-3 overflow-hidden">
        <motion.div
          className={`h-4 rounded-full bg-gradient-to-r ${barGradient}`}
          initial={{ width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          role="progressbar"
          aria-label="Milestone progress"
          aria-valuenow={safeProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
        <span
          className={`absolute inset-0 flex items-center justify-center text-[10px] font-semibold ${percentColor}`}
        >
          {safeProgress}%
        </span>
      </div>
    </motion.article>
  );
}
