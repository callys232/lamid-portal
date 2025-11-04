"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProfileHeader from "./CprofileHeader";
import ProfileSidebar from "./CprofileSidebar";
import Overview from "./tabs/Overview";
import Settings from "./settings/Settings";
import Teams from "./tabs/Teams";
import Notifications from "./tabs/Notifications";
import ClientEscrow from "./escrow/CEscrow";
import Invitations from "./tabs/Invitation";
import ClientProjectSettings from "./settings/projectSettings";
import { ClientProfile } from "@/types/client";
import { Project } from "@/types/project";

export default function ClientProfileDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [client, setClient] = useState<ClientProfile | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get<{ success: boolean; data: ClientProfile }>(
          "/api/clients/c1"
        );
        if (res.data.success) setClient(res.data.data);
      } catch (err) {
        console.error("Error fetching client data:", err);
      }
    };

    fetchClient();
  }, []);

  const handleProjectSave = (updatedProject: Project) => {
    setClient((prev) => {
      if (!prev) return prev;

      const updatedProjects: Project[] = prev.projects.map((p) =>
        (p.id && updatedProject.id && p.id === updatedProject.id) ||
        (p._id && updatedProject._id && p._id === updatedProject._id)
          ? { ...p, ...updatedProject }
          : p
      );

      return { ...prev, projects: updatedProjects };
    });

    console.log("Project saved:", updatedProject);
  };

  const renderTab = () => {
    if (!client) return <p>Loading client profile...</p>;

    switch (activeTab) {
      case "overview":
        return <Overview client={client} />;
      case "settings":
        return <Settings client={client} />;
      case "teams":
        return <Teams client={client} />;
      case "notifications":
        return <Notifications clientId={client.id} />;
      case "project-settings":
        return (
          <ClientProjectSettings
            projects={client.projects}
            onSave={handleProjectSave}
          />
        );
      case "escrow":
        return (
          <ClientEscrow
            client={client}
            projects={client.projects}
            initialEscrows={client.escrowTransactions}
          />
        );
      case "invitations":
        return <Invitations client={client} consultants={client.consultants} />;
      default:
        return <Overview client={client} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white font-sans">
      <ProfileHeader
        client={client}
        projectStats={{
          total: client?.projects.length || 0,
          completed:
            client?.projects.filter((p) => p.status === "completed").length ||
            0,
          new: client?.projects.filter((p) => p.status === "new").length || 0,
          suspended:
            client?.projects.filter((p) => p.status === "suspended").length ||
            0,
          ongoing:
            client?.projects.filter((p) => p.status === "ongoing").length || 0,
        }}
        categories={client?.projects.map((p) => p.category) || []}
      />
      <div className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-800">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">{renderTab()}</div>
      </div>
    </div>
  );
}
