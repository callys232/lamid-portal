"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProfileHeader from "./ProfileHeader";
import ProfileSidebar from "./ProfileSideBar";
import Overview from "./tabs/Overview";
import Settings from "./settings/Settings";
import Teams from "./Teams/Teams";
import Notifications from "./tabs/Notifications";
import Escrow from "./escrow/Escrow";
import { ProjectOverviewProps } from "./tabs/Overview";

// ✅ Seed Data
const seedProject: ProjectOverviewProps = {
  id: "seed-p1",
  title: "AI Business Consultant System",
  organization: "Lamid Corp",
  location: "Remote",
  category: "AI & Consulting",
  rating: 4.8,
  image: "/images/project-sample.jpg",
  budget: 12000,
  hourlyRate: "$80/hr",
  tech: "React, Node.js, Tailwind, Python, AI",
  timeline: "6 Months",
  milestones: ["Planning", "MVP Build", "AI Integration", "Launch"],
  skills: ["AI", "React", "Node.js", "UI/UX", "Prompt Engineering"],
  escrow: [
    {
      date: "2025-10-20",
      type: "Deposit",
      amount: 6000,
      status: "Held",
      action: "View",
    },
    {
      date: "2025-10-28",
      type: "Release",
      amount: 6000,
      status: "Completed",
      action: "Receipt",
    },
  ],
};

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [project, setProject] = useState<ProjectOverviewProps | null>(null);

  // ✅ Missing state — added!
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const PROJECT_ID = "65b02f8e93fc9b24f4b89c20"; // replace with real ObjectId
        const res = await axios.get(`/api/projects/${PROJECT_ID}`);

        if (res.data.success && res.data.data) {
          setProject(res.data.data);
        }
      } catch (err) {
        console.error("API failed. Using seed data.");
        setProject(seedProject); // ✅ use declared seed
      } finally {
        setLoading(false); // ✅ now exists
      }
    };

    fetchData();
  }, []);

  const renderTab = () => {
    if (loading) return <p>Loading...</p>;
    if (!project) return <p>No project data available.</p>;

    switch (activeTab) {
      case "overview":
        return <Overview {...project} />;
      case "settings":
        return <Settings />;
      case "teams":
        return <Teams />;
      case "notifications":
        return <Notifications />;
      case "escrow":
        return <Escrow />;
      default:
        return <Overview {...project} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19] text-white font-sans">
      <ProfileHeader />

      <div className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-800">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">{renderTab()}</div>
      </div>
    </div>
  );
}
