"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProfileHeader from "./ProfileHeader";
import ProfileSidebar from "./ProfileSideBar";
import Overview from "./tabs/Overview";
import Settings from "./settings/Settings";
import Teams from "./tabs/Teams";
import Notifications from "./tabs/Notifications";
import Escrow from "./escrow/Escrow";
import { ProjectOverviewProps } from "./tabs/Overview"; // adjust path if needed

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [project, setProject] = useState<ProjectOverviewProps | null>(null);

  useEffect(() => {
    axios.get("/api/projects/p1").then((res) => {
      if (res.data.success) {
        setProject({
          ...res.data.data,
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
        });
      }
    });
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return project ? <Overview {...project} /> : <p>Loading overview...</p>;
      case "settings":
        return <Settings />;
      case "teams":
        return <Teams />;
      case "notifications":
        return <Notifications />;
      case "escrow":
        return <Escrow />;
      default:
        return <Overview {...(project as ProjectOverviewProps)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white font-sans">
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
