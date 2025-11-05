"use client";

import { useEffect, useState } from "react";
import { MilestoneItem } from "./MilestoneItem";
import { PaymentItem } from "./PaymentItem";
import { MemberItem } from "./Member";
import { AlertItem } from "./Alert";

interface TeamMember {
  id: number;
  name: string;
  role: string;
}
interface Milestone {
  id: number;
  title: string;
  accomplished: boolean;
}
interface Payment {
  id: number;
  label: string;
  status: "paid" | "pending";
  amount?: number;
}
interface Alert {
  id: number;
  message: string;
  type: "overdue" | "upcoming" | "payment" | "success";
}
interface Project {
  id: string;
  name: string;
  teamNumber: string;
  clientName: string;
  members: TeamMember[];
  milestones: Milestone[];
  payments: Payment[];
  alerts: Alert[];
}

export default function Teams() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/teams/t1/projects");
        const { data } = await res.json();
        setProjects(data);
        if (data.length > 0) setActiveProject(data[0]);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const alertStyle = (type: Alert["type"]) => {
    switch (type) {
      case "overdue":
        return "bg-red-600 text-white";
      case "upcoming":
        return "bg-yellow-600 text-white";
      case "payment":
        return "bg-blue-600 text-white";
      case "success":
        return "bg-green-600 text-white";
      default:
        return "bg-gray-800 text-gray-200";
    }
  };

  if (loading)
    return <div className="p-6 text-gray-400">Loading projects...</div>;
  if (!activeProject)
    return (
      <div className="p-6 text-gray-400">
        No projects available for your team.
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* LEFT SIDEBAR */}
      <aside className="w-full md:w-64 bg-gray-900 border border-gray-800 rounded-md p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-4">Team Projects</h2>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 rounded-md border border-gray-700 bg-gray-800 text-white px-3 py-2"
          />
          <ul className="space-y-2">
            {filteredProjects.map((proj) => (
              <li
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`px-3 py-2 rounded-md cursor-pointer ${
                  activeProject.id === proj.id
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {proj.name}
              </li>
            ))}
            {filteredProjects.length === 0 && (
              <li className="text-sm text-gray-400">No projects found</li>
            )}
          </ul>
        </div>
        <button className="mt-6 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
          Invite & Templates
        </button>
      </aside>

      {/* MIDDLE PANEL */}
      <main className="flex-1 bg-gray-900 border border-gray-800 rounded-md p-6">
        <h2 className="text-2xl font-semibold mb-6">{activeProject.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Team Number</p>
              <p className="font-medium">{activeProject.teamNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Milestones</p>
              <ul className="space-y-2">
                {activeProject.milestones.map((ms) => (
                  <li
                    key={ms.id}
                    className="flex justify-between bg-gray-800 px-3 py-2 rounded-md"
                  >
                    <span>{ms.title}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        ms.accomplished ? "bg-green-600" : "bg-yellow-600"
                      } text-white`}
                    >
                      {ms.accomplished ? "Done" : "Pending"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-400">Payments</p>
              <ul className="space-y-2">
                {activeProject.payments.map((p) => (
                  <li
                    key={p.id}
                    className="flex justify-between bg-gray-800 px-3 py-2 rounded-md"
                  >
                    <span>{p.label}</span>
                    {p.status === "paid" ? (
                      <span className="text-green-400">${p.amount}</span>
                    ) : (
                      <span className="text-yellow-400">Pending</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Project Client Name</p>
              <p className="font-medium">{activeProject.clientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Project Team Members</p>
              <ul className="space-y-2">
                {activeProject.members.map((member) => (
                  <li
                    key={member.id}
                    className="flex justify-between bg-gray-800 px-3 py-2 rounded-md"
                  >
                    <span>{member.name}</span>
                    <span className="text-sm text-gray-400">{member.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT PANEL (ALERTS) */}
      <aside className="w-full md:w-64 bg-gray-900 border border-gray-800 rounded-md p-4">
        <h3 className="text-lg font-medium mb-4">Alerts</h3>
        <ul className="space-y-2">
          {activeProject.milestones.map((ms) => (
            <MilestoneItem
              key={ms.id}
              title={ms.title}
              accomplished={ms.accomplished}
            />
          ))}
        </ul>

        <ul className="space-y-2">
          {activeProject.payments.map((p) => (
            <PaymentItem
              key={p.id}
              label={p.label}
              status={p.status}
              amount={p.amount}
            />
          ))}
        </ul>

        <ul className="space-y-2">
          {activeProject.members.map((m) => (
            <MemberItem key={m.id} name={m.name} role={m.role} />
          ))}
        </ul>

        <ul className="space-y-2">
          {activeProject.alerts.map((a) => (
            <AlertItem key={a.id} message={a.message} type={a.type} />
          ))}
        </ul>
      </aside>
    </div>
  );
}
