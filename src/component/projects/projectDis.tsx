"use client";

import { useState, useEffect, useMemo } from "react";
import { projectsData, Project } from "./projectData";
import ProjectCard from "./projectCard";

export default function ProjectDiscoverySection() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [techFilter, setTechFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [budgetFilter, setBudgetFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Safely load saved project IDs
  useEffect(() => {
    setTimeout(() => {
      const saved = JSON.parse(localStorage.getItem("savedProjects") || "[]");
      setSavedIds(saved);
    }, 0);
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(projectsData.map((p) => p.category))],
    []
  );
  const techs = useMemo(
    () => ["All", ...new Set(projectsData.map((p) => p.tech))],
    []
  );

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p: Project) => {
      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter;
      const matchesTech = techFilter === "All" || p.tech === techFilter;
      const matchesLocation =
        locationFilter === "All" || p.location === locationFilter;
      const matchesBudget =
        budgetFilter === "All" ||
        parseInt(p.budget.replace(/\D/g, "")) <= parseInt(budgetFilter);
      return matchesCategory && matchesTech && matchesLocation && matchesBudget;
    });
  }, [categoryFilter, techFilter, locationFilter, budgetFilter]);

  const savedProjects = useMemo(() => {
    return projectsData.filter((p) => savedIds.includes(p.id));
  }, [savedIds]);

  const clearFilters = () => {
    setCategoryFilter("All");
    setTechFilter("All");
    setLocationFilter("All");
    setBudgetFilter("All");
  };

  return (
    <section className="bg-[#0c0000] text-white py-16 px-4 sm:px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* 🔖 Tab Switcher */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 rounded-md font-semibold relative transition ${
              activeTab === "all"
                ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                : "bg-[#1a0d0d] border border-[#a71414] text-gray-200 hover:bg-red-800/30"
            }`}
          >
            All Projects
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-2 rounded-md font-semibold relative transition ${
              activeTab === "saved"
                ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                : "bg-[#1a0d0d] border border-[#a71414] text-gray-200 hover:bg-red-800/30"
            }`}
          >
            Saved Projects
            {savedProjects.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-[1px] rounded-full">
                {savedProjects.length}
              </span>
            )}
          </button>

          {/* 🧭 Filter Button (Mobile Only) */}
          {activeTab === "all" && (
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden ml-auto bg-red-600 hover:bg-red-700 text-sm px-4 py-2 rounded-md font-semibold"
            >
              Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 relative">
          {/* Sidebar Filters */}
          {activeTab === "all" && (
            <>
              {/* 🧱 Desktop Sidebar */}
              <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-[#120202] p-5 rounded-2xl border border-[#a71414]/40">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-[#a71414]/50 pb-2">
                  Filter Projects
                </h3>

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
                />
              </aside>

              {/* 📱 Mobile Sidebar Overlay */}
              {showFilters && (
                <div className="fixed inset-0 bg-black/70 z-40 flex">
                  <div className="bg-[#120202] w-80 max-w-[90%] h-full p-6 overflow-y-auto shadow-xl border-r border-[#a71414]/50 animate-slideIn">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Filters</h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="text-gray-400 hover:text-red-500"
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
                    />

                    <button
                      onClick={() => setShowFilters(false)}
                      className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Main Grid */}
          <main
            className={`${
              activeTab === "all" ? "lg:col-span-3" : "col-span-1 lg:col-span-4"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">
              {activeTab === "all" ? "Project Discovery" : "Saved Projects"}
            </h2>

            {activeTab === "all" ? (
              filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 mt-10">
                  No projects match your filters.
                </p>
              )
            ) : savedProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 mt-10">
                You haven’t saved any projects yet.
              </p>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------
 * 🧩 Reusable FilterControls Component
 * ------------------------------------------ */
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
}: FilterProps) {
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="category" className="block text-sm text-gray-400 mb-1">
          Category
        </label>
        <select
          id="category"
          title="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full bg-[#1a0d0d] border border-[#a71414] text-gray-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tech" className="block text-sm text-gray-400 mb-1">
          Tech
        </label>
        <select
          id="tech"
          title="Filter by technology"
          value={techFilter}
          onChange={(e) => setTechFilter(e.target.value)}
          className="w-full bg-[#1a0d0d] border border-[#a71414] text-gray-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
        >
          {techs.map((tech) => (
            <option key={tech}>{tech}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm text-gray-400 mb-1">
          Location
        </label>
        <select
          id="location"
          title="Filter by location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="w-full bg-[#1a0d0d] border border-[#a71414] text-gray-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
        >
          <option>All</option>
          <option>Remote</option>
          <option>On-site</option>
          <option>Hybrid</option>
        </select>
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm text-gray-400 mb-1">
          Budget
        </label>
        <select
          id="budget"
          title="Filter by budget"
          value={budgetFilter}
          onChange={(e) => setBudgetFilter(e.target.value)}
          className="w-full bg-[#1a0d0d] border border-[#a71414] text-gray-100 px-3 py-2 rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
        >
          <option value="All">All</option>
          <option value="2000">Under $2000</option>
          <option value="3000">Under $3000</option>
          <option value="5000">Under $5000</option>
        </select>
      </div>

      <button
        onClick={clearFilters}
        className="w-full bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md font-semibold transition"
      >
        Clear Filters
      </button>
    </div>
  );
}
