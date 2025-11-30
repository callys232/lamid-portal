"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

import { ClientProfile, TeamMember } from "@/types/client";
import { Project, Milestone, MilestoneStatus } from "@/types/project";

import { MilestoneItem } from "./MilestoneItem";
import { MemberItem } from "./Member";
import { AlertItem } from "./Alert";

import { mockClient } from "@/mocks/mockClient";

/* --------------------------------------------------
   Framer Motion Variants
-------------------------------------------------- */
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const completedVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const pendingVariant: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

/* --------------------------------------------------
   Map Milestone Status → Alert Type
-------------------------------------------------- */
function statusToAlertType(
  status?: MilestoneStatus
): "overdue" | "success" | "upcoming" | "payment" {
  if (status === "completed") return "success";
  if (["pending", "in_progress", "funded", "released"].includes(status || ""))
    return "upcoming";
  if (["cancelled", "disputed"].includes(status || "")) return "overdue";
  return "upcoming";
}

/* --------------------------------------------------
   Main Component
-------------------------------------------------- */
export default function Teams() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /* --------------------------------------------------
     Load Real API → Fallback to mockClient
  -------------------------------------------------- */
  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch("/api/teams/t1"); // teamId hardcoded (replace)
        const json = await res.json();

        if (!json.success || !json.data) {
          console.warn("⚠ API failed — using fallback mock");
          throw new Error("API error");
        }

        normalizeData(json.data as ClientProfile);
      } catch (error) {
        console.error("Failed to load team, using fallback:", error);
        normalizeData(mockClient); // safe fallback
      } finally {
        setLoading(false);
      }
    }

    loadTeam();
  }, []);

  /* --------------------------------------------------
     Normalize ClientProfile → States
     Ensures NOTHING is ever undefined
  -------------------------------------------------- */
  function normalizeData(client: ClientProfile) {
    const normalizedProjects = client.projects ?? [];
    const normalizedMembers = client.teamMembers ?? [];

    setProjects(normalizedProjects);
    setTeamMembers(normalizedMembers);

    // Pick first project automatically
    setActiveProject(normalizedProjects[0] ?? null);
  }

  /* --------------------------------------------------
     Search Filtering
  -------------------------------------------------- */
  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  /* --------------------------------------------------
     Loading / Empty UI
  -------------------------------------------------- */
  if (loading)
    return <div className="p-6 text-gray-400">Loading team data...</div>;

  if (!activeProject)
    return (
      <div className="p-6 text-gray-400">
        Your team does not have any active projects.
      </div>
    );

  /* --------------------------------------------------
     Main UI
  -------------------------------------------------- */
  return (
    <motion.div
      className="flex flex-col md:flex-row gap-6 w-full"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* =============== LEFT SIDEBAR =============== */}
      <motion.aside
        variants={item}
        className="w-full md:w-64 bg-gray-900/90 border border-gray-700 rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-4">Team Projects</h2>

        <input
          type="text"
          placeholder="🔍 Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 rounded-md border border-gray-600 bg-gray-800 
            text-white px-3 py-2"
        />

        <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
          {filteredProjects.map((proj) => (
            <li
              key={proj._id || proj.id}
              onClick={() => setActiveProject(proj)}
              className={`px-3 py-2 rounded-md cursor-pointer ${
                activeProject?._id === proj._id
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              📁 {proj.title}
            </li>
          ))}

          {filteredProjects.length === 0 && (
            <li className="text-sm text-gray-500">No projects found.</li>
          )}
        </ul>

        <button className="mt-6 px-4 py-2 rounded-md bg-red-600 text-white w-full">
          ✨ Invite Members
        </button>
      </motion.aside>

      {/* =============== MIDDLE PANEL =============== */}
      <motion.main
        variants={item}
        className="flex-1 bg-gray-900/90 border border-gray-700 rounded-xl p-8 space-y-8"
      >
        <header className="flex items-center gap-4">
          {activeProject.image && (
            <img
              src={activeProject.image}
              className="w-16 h-16 object-cover rounded-lg border-2 border-red-500"
            />
          )}
          <div>
            <h2 className="text-3xl font-bold text-white">
              {activeProject.title}
            </h2>
            <p className="text-sm text-gray-400">
              {activeProject.organization}
            </p>
          </div>
        </header>

        {/* === META GRID === */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-300">
          {[
            ["Category", activeProject.category],
            ["Tech", activeProject.tech],
            ["Location", activeProject.location],
            ["Budget", activeProject.budget],
            ["Hourly Rate", activeProject.hourlyRate],
            [
              "Rating",
              activeProject.rating ? `⭐ ${activeProject.rating}` : "",
            ],
            ["Priority", activeProject.priority],
            ["Deadline", activeProject.deadline],
            ["Status", activeProject.status],
            [
              "Progress",
              activeProject.milestoneProgress
                ? `${activeProject.milestoneProgress}%`
                : "",
            ],
          ]
            .filter((v) => Boolean(v[1]))
            .map(([label, value], i) => (
              <div key={i}>
                <span className="text-gray-400">{label}:</span> {value}
              </div>
            ))}
        </div>

        {/* === MILESTONES === */}
        {activeProject.milestones?.length ? (
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">
              Milestones
            </h3>

            <motion.ul variants={container} className="space-y-3">
              {activeProject.milestones.map((ms, idx) => (
                <motion.li
                  key={ms.id || idx}
                  variants={
                    ms.status === "completed"
                      ? completedVariant
                      : pendingVariant
                  }
                >
                  <MilestoneItem
                    title={ms.title}
                    accomplished={ms.status === "completed"}
                    description={ms.description}
                    amount={ms.amount}
                    dueDate={ms.dueDate}
                    status={ms.status}
                    progress={ms.progress ?? 0}
                  />
                </motion.li>
              ))}
            </motion.ul>
          </section>
        ) : null}

        {/* === TEAM MEMBERS === */}
        {teamMembers.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-white mb-3">
              Team Members
            </h3>
            <ul className="space-y-2">
              {teamMembers.map((m) => (
                <MemberItem key={m.id} name={m.name} role={m.role} />
              ))}
            </ul>
          </section>
        )}
      </motion.main>

      {/* =============== RIGHT PANEL =============== */}
      <motion.aside
        variants={item}
        className="w-full md:w-72 bg-gray-900/90 border border-gray-700 rounded-xl p-6 space-y-6"
      >
        <h3 className="text-lg font-semibold text-white">Alerts</h3>

        <ul className="space-y-3">
          {activeProject.milestones?.map((ms, idx) => (
            <AlertItem
              key={ms.id || idx}
              message={`${ms.title} is ${ms.status}`}
              type={statusToAlertType(ms.status)}
            />
          ))}
        </ul>

        <h3 className="text-lg font-semibold text-white">Project Docs</h3>
        <p className="text-sm text-gray-300">
          Contracts and shared documents will appear here.
        </p>

        <button className="px-4 py-2 rounded-md bg-red-600 text-white text-xs">
          📂 Upload Document
        </button>
      </motion.aside>
    </motion.div>
  );
}
