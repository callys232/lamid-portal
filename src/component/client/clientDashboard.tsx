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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        // Replace with a real MongoDB ObjectId from your database
        const clientId = "654321abcdef1234567890";
        const res = await axios.get<{ success: boolean; data: ClientProfile }>(
          `/api/clients/${clientId}`
        );

        console.log("API response:", res.data);

        if (res.data.success) {
          setClient(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching client data:", err);
      } finally {
        setLoading(false);
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
    if (loading) return <p>Loading client profile...</p>;
    if (!client) return <p>No client data found.</p>;

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
      {client && (
        <ProfileHeader
          client={client}
          projectStats={{
            total: client.projects.length,
            completed: client.projects.filter((p) => p.status === "completed")
              .length,
            new: client.projects.filter((p) => p.status === "new").length,
            suspended: client.projects.filter((p) => p.status === "suspended")
              .length,
            ongoing: client.projects.filter((p) => p.status === "ongoing")
              .length,
          }}
          categories={client.projects.map((p) => p.category)}
        />
      )}

      <div className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-800">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">{renderTab()}</div>
      </div>
    </div>
  );
}
