"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProjectModal from "./projectModal";
import { Project } from "./projectData";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Load saved projects once after mount (no sync setState in render)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Defer setState to next tick to avoid synchronous React warning
    const timeout = setTimeout(() => {
      const saved = JSON.parse(localStorage.getItem("savedProjects") || "[]");
      setIsSaved(saved.includes(project.id));
    }, 0);

    return () => clearTimeout(timeout);
  }, [project.id]);

  // Sync localStorage whenever `isSaved` changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = JSON.parse(localStorage.getItem("savedProjects") || "[]");
    const updated = isSaved
      ? Array.from(new Set([...saved, project.id]))
      : saved.filter((id: string) => id !== project.id);

    localStorage.setItem("savedProjects", JSON.stringify(updated));
  }, [isSaved, project.id]);

  const toggleSave = () => setIsSaved((prev) => !prev);

  return (
    <>
      <div className="bg-[#1a0d0d] border border-[#3a1919] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition flex flex-col">
        {/* Project Image */}
        <div
          className="w-full h-40 sm:h-48 md:h-56 overflow-hidden cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={200}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>

        {/* Project Info */}
        <div className="p-4 flex flex-col justify-between flex-grow text-gray-200">
          <div className="mb-3">
            <h3
              onClick={() => setShowModal(true)}
              className="font-bold text-lg text-white leading-snug cursor-pointer hover:text-red-400 transition"
            >
              {project.title}
            </h3>
            <div className="flex text-red-500 text-sm mt-1">
              {"★".repeat(project.rating)}
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Category: {project.category}
            </p>
            <p className="text-sm text-gray-400">
              Organization: {project.organization}
            </p>
            <p className="text-sm text-gray-300 mt-1">
              Budget: {project.budget}
            </p>
            <p className="text-sm text-gray-300">Rate: {project.hourlyRate}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 mt-auto">
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md font-semibold w-full sm:w-auto"
            >
              View Details
            </button>

            <button
              onClick={toggleSave}
              className={`${
                isSaved
                  ? "bg-green-700 border-green-500"
                  : "bg-black border-gray-500 hover:border-red-600"
              } text-white text-sm px-4 py-2 rounded-md font-semibold w-full sm:w-auto`}
            >
              {isSaved ? "Saved ✓" : "Save Project"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ProjectModal
          projectId={project.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
