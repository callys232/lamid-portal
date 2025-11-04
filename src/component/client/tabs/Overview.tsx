"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Project, Milestone } from "@/types/project";
import {
  ClientProfile,
  EscrowTransaction,
  Invitation,
  Consultant,
} from "@/types/client";

interface ClientOverviewProps {
  client: ClientProfile;
  isPremium?: boolean;
}

export default function ClientOverview({
  client,
  isPremium = false,
}: ClientOverviewProps) {
  const projects = client.projects;
  const consultants = client.consultants;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [escrows, setEscrows] = useState<EscrowTransaction[]>(
    client.escrowTransactions || []
  );
  const [invitations, setInvitations] = useState<Invitation[]>(
    client.invitations || []
  );
  const [filterInvitations, setFilterInvitations] = useState("");

  // ---- Derived ----
  const milestonesOfSelected = useMemo<Milestone[]>(
    () => selectedProject?.milestones || [],
    [selectedProject]
  );

  const projectProgress = useMemo(() => {
    if (!milestonesOfSelected.length) return 0;
    const completed = milestonesOfSelected.filter(
      (m) => m.status === "completed"
    ).length;
    return Math.round((completed / milestonesOfSelected.length) * 100);
  }, [milestonesOfSelected]);

  // ---- Handlers ----
  const handleAddEscrow = (
    amount: number,
    milestoneId?: string,
    releaseDate?: string
  ) => {
    if (!selectedProject) return;

    const newEscrow: EscrowTransaction = {
      id: crypto.randomUUID(),
      projectId: selectedProject.id!,
      amount,
      currency: "USD",
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      milestoneId,
      releaseDate,
      notes: "",
      milestones: selectedProject.milestones,
    };

    setEscrows((prev) => [...prev, newEscrow]);
  };

  const handleInviteConsultant = (consultantId: string) => {
    if (!selectedProject) return;

    const newInvitation: Invitation = {
      id: crypto.randomUUID(),
      projectId: selectedProject.id,
      invitedBy: client.id,
      consultantId,
      method: "consultant", // <-- required by type
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setInvitations((prev) => [...prev, newInvitation]);
  };

  const filteredInvitations = useMemo(() => {
    return invitations.filter((inv) => {
      const consultantName = inv.consultantId
        ? consultants.find((c) => c.id === inv.consultantId)?.name || ""
        : "";
      const senderName =
        consultants.find((c) => c.id === inv.invitedBy)?.name || "You";
      const target =
        `${inv.status} ${consultantName} ${senderName} ${inv.method}`.toLowerCase();
      return target.includes(filterInvitations.toLowerCase());
    });
  }, [invitations, filterInvitations, consultants]);

  // ---- Animations ----
  const fadeSlide = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="w-full p-6 space-y-6 text-white bg-[#0c0000] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {client.companyName || client.name}
        </h1>
        <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
          Edit Profile
        </button>
      </div>

      {/* Client Details */}
      <section className="bg-gray-900 border border-gray-800 rounded-md p-4 space-y-4">
        <h2 className="text-xl font-semibold">Client Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            defaultValue={client.name}
            placeholder="Contact Name"
            className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full"
          />
          <input
            type="email"
            defaultValue={client.email}
            placeholder="Email"
            className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full"
          />
        </div>
      </section>

      {/* Project Section */}
      <section className="bg-gray-900 border border-gray-800 rounded-md p-4 space-y-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <select
          aria-label="activeselection"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
          value={selectedProject?.id || ""}
          onChange={(e) =>
            setSelectedProject(
              projects.find((p) => p.id === e.target.value) || null
            )
          }
        >
          <option value="">-- Select Project --</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        {selectedProject && (
          <motion.div
            variants={fadeSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-4"
          >
            <h3 className="font-semibold text-lg">{selectedProject.title}</h3>
            <p>Category: {selectedProject.category}</p>
            <p>Tech: {selectedProject.tech}</p>
            <p>
              Project Progress:{" "}
              <span className="font-semibold">{projectProgress}%</span>
            </p>

            {/* Milestones */}
            <ul className="space-y-2 mt-2">
              {milestonesOfSelected.map((m) => {
                const prog = m.progress ?? (m.status === "completed" ? 100 : 0);
                return (
                  <li
                    key={m.id}
                    className="bg-gray-800 rounded p-2 flex flex-col md:flex-row md:justify-between gap-2"
                  >
                    <div>
                      <p>{m.title}</p>
                      <p className="text-xs text-gray-400">
                        Due:{" "}
                        {m.dueDate
                          ? new Date(m.dueDate).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 flex-1">
                      <div className="w-full bg-gray-700 rounded h-2 overflow-hidden">
                        <div
                          className="h-2 bg-red-600 transition-all"
                          style={{ width: `${prog}%` }}
                        />
                      </div>
                      <span className="text-xs">{m.status}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </section>

      {/* Escrow */}
      <section className="bg-gray-900 border border-gray-800 rounded-md p-4 space-y-4">
        <h2 className="text-xl font-semibold">Escrow</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            id="escrowAmount"
            placeholder="Amount"
            className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full"
          />
          <input
            aria-label="date"
            id="escrowDate"
            type="date"
            className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full"
          />
          <select
            aria-label="escrowmilestone"
            id="escrowMilestone"
            className="px-3 py-2 rounded bg-gray-800 border border-gray-700 w-full"
          >
            <option value="">Select Milestone</option>
            {milestonesOfSelected.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            const amount = Number(
              (document.getElementById("escrowAmount") as HTMLInputElement)
                .value
            );
            const date = (
              document.getElementById("escrowDate") as HTMLInputElement
            ).value;
            const milestoneId = (
              document.getElementById("escrowMilestone") as HTMLSelectElement
            ).value;
            handleAddEscrow(amount, milestoneId, date);
          }}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Add Escrow
        </button>

        {/* Escrow List */}
        <ul className="space-y-2 mt-2">
          {escrows
            .filter((e) => e.projectId === selectedProject?.id)
            .map((e) => (
              <li
                key={e.id}
                className="flex justify-between bg-gray-800 rounded p-2"
              >
                <span>
                  ${e.amount} — {e.status}
                  {e.milestoneId &&
                    ` for ${
                      milestonesOfSelected.find((m) => m.id === e.milestoneId)
                        ?.title
                    }`}
                </span>
              </li>
            ))}
        </ul>
      </section>

      {/* Invitations */}
      <section className="bg-gray-900 border border-gray-800 rounded-md p-4 space-y-4">
        <h2 className="text-xl font-semibold">Invitations</h2>

        <div className="flex gap-2">
          <select
            aria-label="invite"
            className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700"
            onChange={(e) => {
              if (e.target.value) handleInviteConsultant(e.target.value);
            }}
          >
            <option value="">-- Select Consultant --</option>
            {consultants.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.industry})
              </option>
            ))}
          </select>
          <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
            Invite
          </button>
        </div>

        <input
          type="text"
          placeholder="Filter invitations..."
          className="px-3 py-1 rounded bg-gray-800 border border-gray-700 w-full text-sm"
          value={filterInvitations}
          onChange={(e) => setFilterInvitations(e.target.value)}
        />

        <ul className="space-y-2 mt-2">
          {filteredInvitations.map((inv) => {
            const consultantName = inv.consultantId
              ? consultants.find((c) => c.id === inv.consultantId)?.name ||
                "Unknown"
              : "";
            const senderName =
              consultants.find((c) => c.id === inv.invitedBy)?.name || "You";
            return (
              <li
                key={inv.id}
                className="flex justify-between bg-gray-800 rounded p-2"
              >
                <span>
                  {consultantName || "—"} — {inv.status} (sent by {senderName},
                  via {inv.method})
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
