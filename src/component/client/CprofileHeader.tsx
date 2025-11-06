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

// Compute profile progress safely
function computeProfileProgress(client: ClientProfile | null): number {
  if (!client) return 0;

  const fields = [
    client.name,
    client.email,
    client.business?.companyName,
    client.business?.industry,
    client.business?.location,
  ];
  const filled = fields.filter(Boolean).length;
  const profileScore = filled / fields.length;

  const totalProjects = client.projects.length;
  const completedProjects = client.projects.filter(
    (p) => p.status === "completed"
  ).length;
  const projectScore =
    totalProjects > 0 ? completedProjects / totalProjects : 0;

  const totalEscrow = client.escrowTransactions.length;
  const releasedEscrow = client.escrowTransactions.filter(
    (t) => t.status === "released"
  ).length;
  const escrowScore = totalEscrow > 0 ? releasedEscrow / totalEscrow : 0;

  const consultantScore = client.consultants.length > 0 ? 1 : 0;
  const invitationScore = client.invitations.length > 0 ? 1 : 0;

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

  const progressColor =
    profileProgress >= 80
      ? "bg-green-600"
      : profileProgress >= 40
      ? "bg-yellow-500"
      : "bg-red-600";

  const renderDropdown = (
    title: string,
    isVisible: boolean,
    toggle: () => void,
    content: React.ReactNode,
    alignRight = false
  ) => {
    const dropdownId = `${title.toLowerCase().replace(/\s/g, "-")}-dropdown`;

    return (
      <div className="relative w-full md:w-auto">
        <button
          type="button"
          className="px-4 py-2 bg-gray-800 rounded-md shadow hover:bg-gray-700 transition w-full md:w-auto"
          aria-haspopup="true"
          aria-expanded={isVisible} // ✅ boolean
          aria-controls={dropdownId} // ✅ string
          onClick={toggle}
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
              className={`absolute mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 z-10 ${
                alignRight ? "right-0" : "left-0"
              }`}
              role="menu"
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
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-950 via-gray-900 to-black text-white p-4 rounded-lg gap-4 shadow-lg">
        {/* Projects Dropdown */}
        {renderDropdown(
          "Projects",
          showProjects,
          () => setShowProjects(!showProjects),
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
        <button
          type="button"
          className="flex flex-col items-center flex-1 cursor-pointer w-full md:w-auto"
          onClick={() => setShowAccountModal(true)}
          aria-haspopup="dialog"
          aria-controls="account-details-modal"
        >
          <span className="text-sm mb-1">Profile Progress:</span>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div
              className={`${progressColor} h-3 transition-all`}
              role="progressbar"
              aria-label="Profile completion"
              aria-valuenow={profileProgress} // ✅ number
              aria-valuemin={0} // ✅ number
              aria-valuemax={100} // ✅ number
              style={{ width: `${profileProgress}%` }}
            />
          </div>
          <span className="text-sm mt-1 font-semibold">{profileProgress}%</span>
        </button>

        {/* Services Dropdown */}
        {renderDropdown(
          "Services Rendered",
          showServices,
          () => setShowServices(!showServices),
          <div>
            <h4 className="font-semibold mb-2">Categories</h4>
            <ul className="space-y-1 text-sm">
              {categories.length > 0 ? (
                categories.map((cat, i) => <li key={i}>{cat}</li>)
              ) : (
                <li className="text-gray-400">No categories available</li>
              )}
            </ul>
          </div>,
          true
        )}
      </div>

      {/* Account Details Modal */}
      <AnimatePresence>
        {showAccountModal && client && (
          <motion.div
            id="account-details-modal"
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
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
