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
import { FaBars } from "react-icons/fa";

/* -------------------- Skeleton Loader -------------------- */
function SkeletonLoader() {
  return (
    <div className="animate-pulse p-6 space-y-4">
      <div className="h-6 bg-gray-700 rounded w-1/3"></div>
      <div className="h-4 bg-gray-700 rounded w-2/3"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
  );
}

export default function ClientProfileDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [client, setClient] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false); // ✅ strictly boolean

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const clientId = "654321abcdef1234567890"; // replace with dynamic param
        const res = await axios.get(`/api/clients/${clientId}`);

        console.log("Raw API response:", res.data);

        if (res.data.success && res.data.data) {
          const data = res.data.data;
          const normalizedClient: ClientProfile = {
            ...data,
            id: data.id || data._id || "",
            projects: data.projects || [],
            consultants: data.consultants || [],
            escrowTransactions: data.escrowTransactions || [],
            invitations: data.invitations || [],
          };
          setClient(normalizedClient);
        } else {
          setError(res.data.message || "Client data not found.");
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error:", err.response?.data || err.message);
          setError(
            err.response?.data?.message || "Failed to fetch client data."
          );
        } else {
          console.error("Unexpected error:", err);
          setError("Unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, []);

  const handleProjectSave = (updatedProject: Project) => {
    setClient((prev) => {
      if (!prev) return prev;
      const updatedProjects = prev.projects.map((p) =>
        (p.id && updatedProject.id && p.id === updatedProject.id) ||
        (p._id && updatedProject._id && p._id === updatedProject._id)
          ? { ...p, ...updatedProject }
          : p
      );
      return { ...prev, projects: updatedProjects };
    });
  };

  const renderTab = () => {
    if (loading) return <SkeletonLoader />;
    if (error) return <p className="p-6 text-red-500">{error}</p>;
    if (!client)
      return <p className="p-6 text-gray-400">No client data found.</p>;

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
      {/* Header */}
      {loading ? (
        <SkeletonLoader />
      ) : error ? (
        <p className="p-6 text-red-500">{error}</p>
      ) : client ? (
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
          categories={[
            ...new Set(client.projects.map((p) => p.category).filter(Boolean)),
          ]}
        />
      ) : null}

      {/* Mobile toggle button */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <button
          type="button" // ✅ correct type
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 text-gray-300 hover:text-white"
          aria-expanded={Boolean(sidebarOpen)} // ✅ strictly boolean
          aria-controls="mobile-sidebar"
        >
          <FaBars />
          <span className="text-sm">Menu</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <div
          id="mobile-sidebar"
          className={`md:w-64 md:border-r border-gray-800 bg-gray-900 md:block ${
            sidebarOpen ? "block" : "hidden"
          } md:relative absolute inset-y-0 left-0 z-40 w-64`}
        >
          <ProfileSidebar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSidebarOpen(false); // close on selection (mobile)
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">{renderTab()}</div>
      </div>
    </div>
  );
}
