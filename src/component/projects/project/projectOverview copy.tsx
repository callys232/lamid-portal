"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import type { Project } from "@/types/project";
import { getImageOrFallback } from "@/utils/imageFallback";
import HeaderCard from "./headercard";
import HeroImageCard from "./heroCard";
import OverviewCard from "./overviewcard";
import ConsultantsCard from "./consultantCard";
import MilestonesCard from "./milestoneCard";
import FinanceCard from "./financeCard";
import TeamCard from "./teamCard";
import BidCard from "./bidCard";
import ProgressCard from "./progresscard";
import ActivityLog, { ActivityItem } from "./activityLog";
import {
  teamProjects,
  individualProjects,
  mockEscrowTransactions,
  mockTeamMembers,
  mockInvitations,
  mockConsultants,
} from "@/mocks/mockClient";

interface ProjectOverviewProps {
  project: Project; // ✅ required
  variant?: "thumbnail" | "modal";
}

export default function ProjectOverview({
  project,
  variant = "modal",
}: ProjectOverviewProps) {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const mockActivity: ActivityItem[] = [
    {
      id: "1",
      action: "Bid Placed",
      user: "Consultant A",
      timestamp: new Date().toISOString(),
      details: "Proposed $2500 with 3-week delivery",
    },
    {
      id: "2",
      action: "Milestone Updated",
      user: "Project Owner",
      timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
      details: "Design phase marked complete",
    },
    {
      id: "3",
      action: "Escrow Released",
      user: "System",
      timestamp: new Date(Date.now() - 7200 * 1000).toISOString(),
      details: "Payment of $500 released for milestone m1",
    },
  ];

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        setProject(data.project);
      } catch (err) {
        console.error("Failed to fetch project", err);
        const fallback = [...teamProjects, ...individualProjects].find(
          (p) => p.id === id || p._id === id
        );
        setProject(fallback || null);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-400 py-20">Loading project...</p>
    );
  if (!project)
    return (
      <p className="text-center text-gray-400 py-20">Project not found.</p>
    );

  const image = getImageOrFallback(project.image, "/placeholder-project.jpg");

  /* -------------------- Premium Theme Classes -------------------- */
  const sectionClass =
    variant === "thumbnail"
      ? "bg-black/80 border border-[#c21219] rounded-lg p-4 text-white space-y-4"
      : "max-w-6xl mx-auto p-8 text-white space-y-8";

  return (
    <section className={sectionClass}>
      <HeaderCard project={project} />
      <HeroImageCard image={image} title={project.title} />

      {variant === "modal" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <OverviewCard project={project} />
            <ConsultantsCard consultants={project.consultants || []} />
          </div>

          <MilestonesCard milestones={project.milestones || []} />

          <ProgressCard progress={project.milestoneProgress || 0} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FinanceCard
              transactions={mockEscrowTransactions}
              budget={project.budget}
            />
            <TeamCard
              members={mockTeamMembers}
              invitations={mockInvitations}
              consultants={mockConsultants}
            />
          </div>

          <BidCard />
          <ActivityLog items={mockActivity} />
        </>
      )}
    </section>
  );
}
