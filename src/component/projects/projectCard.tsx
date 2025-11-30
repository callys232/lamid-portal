"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProjectModal from "./projectModal";
import ProjectThumbnailPreview from "./project/thumbnail";
import { Project } from "@/types/project";
import { mockActivity } from "@/mocks/mockClient";

interface ProjectCardProps {
  project: Project;
  isRegisteredUser?: boolean;
}

export default function ProjectCard({
  project,
  isRegisteredUser = false,
}: ProjectCardProps) {
  const projectId: string | null = project._id ?? project.id ?? null;

  const [isSaved, setIsSaved] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const saved = JSON.parse(localStorage.getItem("savedProjects") || "[]");
    return saved.includes(projectId);
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = JSON.parse(localStorage.getItem("savedProjects") || "[]");
    const updated = isSaved
      ? Array.from(new Set([...saved, projectId]))
      : saved.filter((id: string) => id !== projectId);
    localStorage.setItem("savedProjects", JSON.stringify(updated));
  }, [isSaved, projectId]);

  const toggleSave = () => setIsSaved((prev) => !prev);

  const rating = project.rating ?? 0;
  const hourlyRate = project.hourlyRate ?? "N/A";
  const image = project.image ?? "/placeholder-project.jpg";

  return (
    <>
      <div className="relative group">
        {/* Card */}
        <div
          className="
            relative bg-black border border-[#c21219] rounded-xl overflow-hidden 
            shadow-md transition-all duration-300 flex flex-col
            hover:shadow-xl hover:scale-[1.02]
          "
        >
          {/* Glare effect */}
          <div
            className="
              absolute inset-0 pointer-events-none
              bg-gradient-to-r from-transparent via-white/10 to-transparent
              opacity-0 group-hover:opacity-100
              translate-x-[-100%] group-hover:translate-x-[100%]
              transition-transform duration-700 ease-out
            "
          />

          {/* Image (reduced height) */}
          <div
            className="relative w-full h-28 sm:h-32 md:h-36 overflow-hidden cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <Image
              src={image}
              alt={project.title}
              width={400}
              height={150}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </div>

          {/* Info */}
          <div className="p-4 flex flex-col flex-grow text-gray-200">
            <div className="mb-3">
              <h3
                onClick={() => setShowModal(true)}
                className="font-bold text-base text-white leading-snug cursor-pointer hover:text-[#c21219] transition"
              >
                {project.title}
              </h3>

              <div className="flex text-[#c21219] text-sm mt-1">
                {"★".repeat(rating)}
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Category: {project.category}
              </p>

              {project.organization && (
                <p className="text-xs text-gray-400">
                  Organization: {project.organization}
                </p>
              )}

              <p className="text-xs text-gray-300 mt-1">
                Budget: {project.budget}
              </p>

              <p className="text-xs text-gray-300">Rate: {hourlyRate}</p>
            </div>

            {/* Buttons on same line */}
            <div className="flex justify-between items-center mt-auto gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 bg-[#c21219] hover:bg-red-700 text-white text-xs px-3 py-2 rounded-md font-semibold transition-colors"
              >
                View Details
              </button>

              <button
                onClick={toggleSave}
                className={`flex-1 ${
                  isSaved
                    ? "bg-green-700 border-green-500"
                    : "bg-black border border-gray-500 hover:border-[#c21219]"
                } text-white text-xs px-3 py-2 rounded-md font-semibold transition-colors`}
              >
                {isSaved ? "Saved ✓" : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* Floating Thumbnail Preview */}
        <ProjectThumbnailPreview project={project} />
      </div>

      {/* Modal */}
      {showModal && (
        <ProjectModal
          project={project}
          onClose={() => setShowModal(false)}
          isRegisteredUser={isRegisteredUser}
          activity={isRegisteredUser ? mockActivity : undefined}
        />
      )}
    </>
  );
}
