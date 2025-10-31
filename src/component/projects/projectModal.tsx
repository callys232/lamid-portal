"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProjectModalProps {
  projectId: string | null;
  onClose: () => void;
}

interface ProjectData {
  _id?: string; // ✅ DB id support
  id?: string; // ✅ local id support
  title: string;
  organization: string;
  budget: string;
  hourlyRate: string;
  category: string;
  tech: string;
  location: string;
  description: string;
  image: string;
  skills: string[];
  timeline: string;
  milestones: string[];
}

export default function ProjectModal({
  projectId,
  onClose,
}: ProjectModalProps) {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/projects/${projectId}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch project");
        }

        // ✅ Normalize budget and hourlyRate as strings
        const normalizedProject: ProjectData = {
          ...data.data,
          _id: data.data._id || data.data.id,
          id: data.data.id || data.data._id,
          budget: String(data.data.budget),
          hourlyRate: String(data.data.hourlyRate),
        };

        setProject(normalizedProject);
      } catch (err: unknown) {
        console.error("Error loading project:", err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unable to load project details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!projectId) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[#1a0d0d] border border-[#a71414] rounded-2xl shadow-lg p-6 max-w-2xl w-full text-gray-100 relative overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            aria-label="Close"
          >
            ×
          </button>

          {/* Content */}
          {loading ? (
            <p className="text-center text-gray-300 py-10">
              Loading project details...
            </p>
          ) : error ? (
            <p className="text-center text-red-400 py-10">{error}</p>
          ) : project ? (
            <>
              <div className="w-full h-56 overflow-hidden rounded-lg mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold mb-2 text-white">
                {project.title}
              </h2>
              <p className="text-sm text-gray-400 mb-1">
                {project.organization} — {project.location}
              </p>
              <p className="text-sm text-gray-400 mb-3">
                {project.category} | {project.tech}
              </p>

              <p className="text-gray-300 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Skills */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-red-900/40 border border-red-700 rounded-full text-sm text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Milestones
                </h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  {project.milestones.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-6">
                <div>
                  <p className="font-semibold text-red-500">{project.budget}</p>
                  <p className="text-sm text-gray-400">{project.hourlyRate}</p>
                  <p className="text-sm text-gray-400">{project.timeline}</p>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-semibold">
                  Apply Now
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-400 py-10">
              Project not found.
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
