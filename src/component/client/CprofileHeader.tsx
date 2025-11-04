"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AccountDetails from "./AccountInformation/accountDetails";
import { ClientProfile } from "@/types/client";

interface ProjectStats {
  total: number;
  completed: number;
  new: number;
  suspended: number;
  ongoing: number;
}

interface ClientProfileHeaderProps {
  projectStats: ProjectStats;
  categories: string[];
  client: ClientProfile | null;
}

// ✅ Utility to compute profile progress dynamically
function computeProfileProgress(client: ClientProfile | null): number {
  if (!client) return 0;

  // 1. Profile fields
  const fieldsToCheck: (keyof ClientProfile)[] = [
    "name",
    "email",
    "companyName",
    "industry",
    "location",
  ];
  const filled = fieldsToCheck.filter((f) => !!client[f]).length;
  const profileScore = filled / fieldsToCheck.length;

  // 2. Projects completion
  const totalProjects = client.projects.length;
  const completedProjects = client.projects.filter(
    (p) => p.status === "completed"
  ).length;
  const projectScore =
    totalProjects > 0 ? completedProjects / totalProjects : 0;

  // 3. Escrow activity
  const totalEscrow = client.escrowTransactions.length;
  const releasedEscrow = client.escrowTransactions.filter(
    (t) => t.status === "released"
  ).length;
  const escrowScore = totalEscrow > 0 ? releasedEscrow / totalEscrow : 0;

  // 4. Consultants & Invitations (bonus completeness)
  const consultantScore = client.consultants.length > 0 ? 1 : 0;
  const invitationScore = client.invitations.length > 0 ? 1 : 0;

  // Weighted average
  const progress =
    profileScore * 0.35 +
    projectScore * 0.35 +
    escrowScore * 0.15 +
    consultantScore * 0.1 +
    invitationScore * 0.05;

  return Math.round(progress * 100);
}

export default function ClientProfileHeader({
  projectStats,
  categories,
  client,
}: ClientProfileHeaderProps) {
  const [showProjects, setShowProjects] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const profileProgress = computeProfileProgress(client);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const renderDropdown = (
    title: string,
    isVisible: boolean,
    content: React.ReactNode,
    alignRight = false
  ) => {
    const dropdownId = `${title.toLowerCase().replace(/\s/g, "-")}-dropdown`;

    return (
      <div
        className="relative"
        onMouseEnter={() =>
          title === "Projects" ? setShowProjects(true) : setShowServices(true)
        }
        onMouseLeave={() =>
          title === "Projects" ? setShowProjects(false) : setShowServices(false)
        }
      >
        <button
          type="button"
          className="px-4 py-2 bg-gray-800 rounded-md"
          aria-haspopup="true"
          aria-controls={dropdownId}
        >
          {title}
        </button>

        <AnimatePresence>
          {isVisible && (
            <motion.div
              id={dropdownId}
              key={title}
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className={`absolute mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 z-10 ${
                alignRight ? "right-0" : "left-0"
              }`}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between bg-black text-white p-4 rounded-lg gap-4">
        {/* Projects Dropdown */}
        {renderDropdown(
          "Projects",
          showProjects,
          <div>
            <h4 className="font-semibold mb-2">Project Stats</h4>
            <ul className="space-y-1 text-sm">
              <li>Total: {projectStats.total}</li>
              <li>Completed: {projectStats.completed}</li>
              <li>New: {projectStats.new}</li>
              <li>Suspended: {projectStats.suspended}</li>
              <li>Ongoing: {projectStats.ongoing}</li>
            </ul>
          </div>
        )}

        {/* Profile Progress */}
        <div
          className="flex flex-col items-center flex-1 cursor-pointer"
          onClick={() => setShowAccountModal(true)}
        >
          <span className="text-sm mb-1">Profile Progress:</span>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-red-600 h-3 transition-all"
              style={{ width: `${profileProgress}%` }}
            />
          </div>
          <span className="text-sm mt-1">{profileProgress}%</span>
        </div>

        {/* Services Rendered Dropdown */}
        {renderDropdown(
          "Services Rendered",
          showServices,
          <div>
            <h4 className="font-semibold mb-2">Categories</h4>
            <ul className="space-y-1 text-sm">
              {categories.map((cat, i) => (
                <li key={i}>{cat}</li>
              ))}
            </ul>
          </div>,
          true
        )}
      </div>

      {/* Account Details Modal */}
      <AnimatePresence>
        {showAccountModal && client && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <AccountDetails
              client={client}
              onSave={(updated: ClientProfile) => {
                console.log("Save client profile", updated);
                setShowAccountModal(false);
              }}
              onDelete={(id: string) => {
                console.log("Delete client profile", id);
                setShowAccountModal(false);
              }}
              onClose={() => setShowAccountModal(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
