"use client";

import { useEffect, useState, useMemo } from "react";
import ProjectCard from "./projectCard";
import { teamProjects, individualProjects } from "@/mocks/mockClient";
import type { Project } from "@/types/project";

export default function ProjectDiscoverySection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [techFilter, setTechFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [budgetFilter, setBudgetFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Fetch projects from backend, fallback to mock data
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();

        if (!data.success) throw new Error(data.message);

        const normalizedProjects: Project[] = (data.data as Project[]).map(
          (p) => ({
            ...p,
            _id: p._id || p.id,
            id: p.id || p._id,
            budget: p.budget !== undefined ? String(p.budget) : undefined,
          })
        );

        setProjects(normalizedProjects);
      } catch (err) {
        console.warn("⚠️ Backend fetch failed, using mock data instead.");
        setError(
          err instanceof Error ? err.message : "Failed to load projects"
        );

        // Fallback: use mock projects
        const mockProjects: Project[] = [
          ...teamProjects,
          ...individualProjects,
        ].map((p) => ({
          ...p,
          _id: p._id || p.id,
          id: p.id || p._id,
        }));
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // ✅ Load saved IDs safely
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedProjects") || "[]");
    setSavedIds(saved);
  }, []);

  // ✅ Filter options with type guards
  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        projects.map((p) => p.category).filter((c): c is string => !!c)
      ),
    ],
    [projects]
  );

  const techs = useMemo(
    () => [
      "All",
      ...new Set(projects.map((p) => p.tech).filter((t): t is string => !!t)),
    ],
    [projects]
  );

  const locations = useMemo(
    () => [
      "All",
      ...new Set(
        projects.map((p) => p.location).filter((l): l is string => !!l)
      ),
    ],
    [projects]
  );

  // ✅ Filtering logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter;
      const matchesTech = techFilter === "All" || p.tech === techFilter;
      const matchesLocation =
        locationFilter === "All" || p.location === locationFilter;
      const matchesBudget =
        budgetFilter === "All" || Number(p.budget) <= Number(budgetFilter);

      return matchesCategory && matchesTech && matchesLocation && matchesBudget;
    });
  }, [projects, categoryFilter, techFilter, locationFilter, budgetFilter]);

  const savedProjects = useMemo(
    () => projects.filter((p) => savedIds.includes(p._id || "")),
    [projects, savedIds]
  );

  const clearFilters = () => {
    setCategoryFilter("All");
    setTechFilter("All");
    setLocationFilter("All");
    setBudgetFilter("All");
  };

  if (loading)
    return (
      <p className="text-center text-gray-400 py-20 text-lg">
        Loading projects...
      </p>
    );

  return (
    <section className="bg-[#0c0000] text-white py-16 px-4 sm:px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 rounded-md font-semibold transition ${
              activeTab === "all"
                ? "bg-red-600"
                : "bg-[#1a0d0d] border border-[#a71414]"
            }`}
          >
            All Projects
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-2 rounded-md font-semibold transition ${
              activeTab === "saved"
                ? "bg-red-600"
                : "bg-[#1a0d0d] border border-[#a71414]"
            }`}
          >
            Saved
            {savedProjects.length > 0 && (
              <span className="ml-2 bg-red-600 px-2 py-[1px] rounded-full text-xs">
                {savedProjects.length}
              </span>
            )}
          </button>

          {activeTab === "all" && (
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden ml-auto bg-red-600 text-sm px-4 py-2 rounded-md"
            >
              Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar Filters */}
          {activeTab === "all" && (
            <>
              <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-[#120202] p-5 rounded-2xl border">
                <FilterControls
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  techFilter={techFilter}
                  setTechFilter={setTechFilter}
                  locationFilter={locationFilter}
                  setLocationFilter={setLocationFilter}
                  budgetFilter={budgetFilter}
                  setBudgetFilter={setBudgetFilter}
                  clearFilters={clearFilters}
                  categories={categories}
                  techs={techs}
                  locations={locations}
                />
              </aside>

              {/* Mobile Filter Drawer */}
              {showFilters && (
                <div className="fixed inset-0 bg-black/70 z-40 flex">
                  <div className="bg-[#120202] w-80 p-6 overflow-y-auto">
                    <div className="flex justify-between mb-6">
                      <h3 className="text-xl font-bold">Filters</h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="text-gray-400"
                      >
                        ✕
                      </button>
                    </div>

                    <FilterControls
                      categoryFilter={categoryFilter}
                      setCategoryFilter={setCategoryFilter}
                      techFilter={techFilter}
                      setTechFilter={setTechFilter}
                      locationFilter={locationFilter}
                      setLocationFilter={setLocationFilter}
                      budgetFilter={budgetFilter}
                      setBudgetFilter={setBudgetFilter}
                      clearFilters={clearFilters}
                      categories={categories}
                      techs={techs}
                      locations={locations}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Main */}
          <main
            className={`${
              activeTab === "all" ? "lg:col-span-3" : "lg:col-span-4"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">
              {activeTab === "all" ? "Project Discovery" : "Saved Projects"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === "all" ? filteredProjects : savedProjects).map(
                (project) => (
                  <ProjectCard
                    key={project._id || project.id}
                    project={project}
                  />
                )
              )}
            </div>

            {(activeTab === "all"
              ? filteredProjects.length === 0
              : savedProjects.length === 0) && (
              <p className="text-center text-gray-400 mt-10">
                No projects found.
              </p>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

/* Filters Component */
interface FilterProps {
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  techFilter: string;
  setTechFilter: (v: string) => void;
  locationFilter: string;
  setLocationFilter: (v: string) => void;
  budgetFilter: string;
  setBudgetFilter: (v: string) => void;
  clearFilters: () => void;
  categories: string[];
  techs: string[];
  locations: string[];
}

function FilterControls({
  categoryFilter,
  setCategoryFilter,
  techFilter,
  setTechFilter,
  locationFilter,
  setLocationFilter,
  budgetFilter,
  setBudgetFilter,
  clearFilters,
  categories,
  techs,
  locations,
}: FilterProps) {
  return (
    <div className="space-y-5">
      {/* Category Filter */}
      <select
        aria-label="Filter by category"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="w-full bg-[#1a0d0d] border px-3 py-2 rounded-md"
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {/* Technology Filter */}
      <select
        aria-label="Filter by technology"
        value={techFilter}
        onChange={(e) => setTechFilter(e.target.value)}
        className="w-full bg-[#1a0d0d] border px-3 py-2 rounded-md"
      >
        {techs.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

      {/* Location Filter */}
      <select
        aria-label="Filter by location"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        className="w-full bg-[#1a0d0d] border px-3 py-2 rounded-md"
      >
        {locations.map((l) => (
          <option key={l}>{l}</option>
        ))}
      </select>

      {/* Budget Filter */}
      <select
        aria-label="Filter by budget"
        value={budgetFilter}
        onChange={(e) => setBudgetFilter(e.target.value)}
        className="w-full bg-[#1a0d0d] border px-3 py-2 rounded-md"
      >
        <option value="All">All Budgets</option>
        <option value="2000">Under $2000</option>
        <option value="3000">Under $3000</option>
        <option value="5000">Under $5000</option>
      </select>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full bg-red-600 py-2 rounded-md font-semibold"
      >
        Clear Filters
      </button>
    </div>
  );
}
