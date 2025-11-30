"use client";
import Image from "next/image";
import { Project } from "@/types/project";

export default function ProjectHeader({ project }: { project: Project }) {
  return (
    <div className="bg-black border border-[#c12129] rounded-xl p-6 flex items-center gap-4 shadow-lg">
      <Image
        src={project.image || "/images/default-project.jpg"}
        alt={project.title}
        width={80}
        height={80}
        className="rounded-lg border-2 border-[#c12129] object-cover"
      />
      <div>
        <h2 className="text-2xl font-bold text-white">{project.title}</h2>
        <p className="text-sm text-gray-300">{project.organization}</p>
        <p className="text-sm text-gray-400">
          {project.location} • {project.category}
        </p>
        <div className="text-[#c12129] text-sm mt-1">
          {project.rating && project.rating > 0
            ? "★".repeat(project.rating)
            : "No rating"}
        </div>
      </div>
    </div>
  );
}
