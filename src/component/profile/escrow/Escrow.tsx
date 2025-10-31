"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../../projects/projectCard";
import EscrowTable from "./escrowTable";
import { Project } from "../../projects/projectData";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("/api/projects").then((res) => setProjects(res.data));
    axios.get("/api/transactions").then((res) => setTransactions(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-white mb-4">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mt-10 mb-4">
        Escrow Transactions
      </h2>
      <EscrowTable transactions={transactions} />
    </div>
  );
}
