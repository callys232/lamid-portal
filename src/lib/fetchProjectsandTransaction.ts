// lib/fetchProjectsAndTransactions.ts
import axios from "axios";
import { Project, EscrowTransaction } from "@/types/project";

export async function fetchProjectsAndTransactions(): Promise<{
  projects: Project[];
  transactions: EscrowTransaction[];
}> {
  const [projectsRes, transactionsRes] = await Promise.all([
    axios.get("/api/projects"),
    axios.get("/api/transactions"),
  ]);

  const projectsData = projectsRes.data;
  const transactionsData = transactionsRes.data;

  return {
    projects: Array.isArray(projectsData)
      ? projectsData
      : projectsData?.data || [],
    transactions: Array.isArray(transactionsData)
      ? transactionsData
      : transactionsData?.data || [],
  };
}
