"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Project, Milestone, MilestoneStatus } from "@/types/project";
import { MilestoneItem } from "./MilestoneItem";
import { MemberItem } from "./Member";
import { AlertItem } from "./Alert";

// Animation Variants
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
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const pendingVariant: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Map MilestoneStatus to AlertItem type
function statusToAlertType(
  status?: MilestoneStatus
): "overdue" | "success" | "upcoming" | "payment" {
  if (status === "completed") return "success";
  if (
    status === "pending" ||
    status === "in_progress" ||
    status === "funded" ||
    status === "released"
  )
    return "upcoming";
  if (status === "cancelled" || status === "disputed") return "overdue";
  return "upcoming";
}

export default function Teams() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/teams/t1/projects");
        const { data } = await res.json();
        setProjects(data as Project[]);
        if (data.length > 0) setActiveProject(data[0]);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <div className="p-6 text-gray-400">Loading projects...</div>;
  if (!activeProject)
    return (
      <div className="p-6 text-gray-400">
        No projects available for your team.
      </div>
    );

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-6 w-full"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* LEFT SIDEBAR */}
      <motion.aside
        variants={item}
        className="w-full md:w-64 bg-gradient-to-b from-gray-900 to-gray-800 
                   border border-gray-700 rounded-xl p-6 flex flex-col justify-between 
                   shadow-lg ring-1 ring-gray-700"
      >
        <div>
          <h2 className="text-xl font-bold text-white mb-4 tracking-wide">
            Team Projects
          </h2>
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            type="text"
            placeholder="🔍 Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 rounded-md border border-gray-600 bg-gray-800 
                       text-white px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
          <ul className="space-y-2 overflow-y-auto max-h-[60vh]">
            {filteredProjects.map((proj) => (
              <li
                key={proj._id || proj.id}
                onClick={() => setActiveProject(proj)}
                aria-current={
                  activeProject?._id === proj._id ? "true" : undefined
                }
                className={`px-3 py-2 rounded-md cursor-pointer transition ${
                  activeProject?._id === proj._id
                    ? "bg-red-600 text-white shadow-md ring-2 ring-red-400"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                📁 {proj.title}
              </li>
            ))}
            {filteredProjects.length === 0 && (
              <li className="text-sm text-gray-400">No projects found</li>
            )}
          </ul>
        </div>
        <button
          className="mt-6 px-4 py-2 rounded-md bg-red-600 text-white 
                           hover:bg-red-700 shadow-md transition transform hover:scale-105"
        >
          ✨ Invite Members & Templates
        </button>
      </motion.aside>

      {/* MIDDLE PANEL */}
      <motion.main
        variants={item}
        className="flex-1 bg-gradient-to-b from-gray-900 to-gray-800 
                   border border-gray-700 rounded-xl p-8 space-y-8 shadow-lg ring-1 ring-gray-700"
      >
        <header className="flex items-center gap-4">
          {activeProject.image && (
            <img
              src={activeProject.image}
              alt={`${activeProject.title} logo`}
              className="w-16 h-16 rounded-lg object-cover border-2 border-red-500 shadow-md"
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

        {/* Project Meta */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="text-gray-400">Category:</span>{" "}
            {activeProject.category}
          </div>
          {activeProject.tech && (
            <div>
              <span className="text-gray-400">Tech:</span> {activeProject.tech}
            </div>
          )}
          {activeProject.location && (
            <div>
              <span className="text-gray-400">Location:</span>{" "}
              {activeProject.location}
            </div>
          )}
          {activeProject.budget && (
            <div>
              <span className="text-gray-400">Budget:</span>{" "}
              {activeProject.budget}
            </div>
          )}
          {activeProject.hourlyRate && (
            <div>
              <span className="text-gray-400">Hourly Rate:</span>{" "}
              {activeProject.hourlyRate}
            </div>
          )}
          {activeProject.rating && (
            <div>
              <span className="text-gray-400">Rating:</span> ⭐{" "}
              {activeProject.rating}
            </div>
          )}
          {activeProject.priority && (
            <div>
              <span className="text-gray-400">Priority:</span>{" "}
              {activeProject.priority}
            </div>
          )}
          {activeProject.deadline && (
            <div>
              <span className="text-gray-400">Deadline:</span>{" "}
              {activeProject.deadline}
            </div>
          )}
          {activeProject.status && (
            <div>
              <span className="text-gray-400">Status:</span>{" "}
              {activeProject.status}
            </div>
          )}
          {activeProject.milestoneProgress !== undefined && (
            <div>
              <span className="text-gray-400">Progress:</span>{" "}
              {activeProject.milestoneProgress}%
            </div>
          )}
        </div>

        {/* Milestones */}
        {activeProject.milestones && (
          <section>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Milestones
            </h3>
            <motion.ul
              variants={container}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {activeProject.milestones.map((ms: Milestone, idx) => (
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
                    progress={ms.progress || 0} // backend value
                  />
                </motion.li>
              ))}
            </motion.ul>
          </section>
        )}

        {/* Members */}
        {activeProject.consultants && (
          <section>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Team Members
            </h3>
            <ul className="space-y-2">
              {Array.isArray(activeProject.consultants) &&
                activeProject.consultants.map((c, idx) =>
                  typeof c === "string" ? (
                    <MemberItem key={idx} name={c} role="Consultant" />
                  ) : (
                    <MemberItem key={c.id} name={c.name} role="Consultant" />
                  )
                )}
            </ul>
          </section>
        )}
      </motion.main>

      {/* RIGHT PANEL (Alerts & Docs) */}
      <motion.aside
        variants={item}
        className="w-full md:w-72 bg-gradient-to-b from-gray-900 to-gray-800 
                   border border-gray-700 rounded-xl p-6 space-y-6 shadow-lg ring-1 ring-gray-700"
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
        <div className="space-y-3 text-sm text-gray-300">
          <p>Contracts, proposals, and shared files will appear here.</p>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-red-600 to-red-500 
                       hover:from-red-700 hover:to-red-600 text-white text-xs shadow-md 
                       transition transform hover:scale-105"
          >
            📂 Upload Document
          </button>
        </div>
      </motion.aside>
    </motion.div>
  );
}
