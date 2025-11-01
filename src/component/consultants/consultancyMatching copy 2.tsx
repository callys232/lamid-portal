"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import ConsultantCard from "./consultantCard";
import ProjectCard from "../projects/projectCard";
import { consultantsData, Consultant } from "./consultantData";
import { projectsData, Project } from "../projects/projectData";

// Filters
const defaultConsultantFilters = {
  search: "",
  industry: "All",
  rate: "All",
  rating: "All",
};

const defaultProjectFilters = {
  search: "",
  category: "All",
  tech: "All",
  location: "All",
};

type ConsultantFilters = typeof defaultConsultantFilters;
type ProjectFilters = typeof defaultProjectFilters;

// Filter option type
export interface FilterOption<T extends { search: string }> {
  label: string;
  key: keyof T;
  options: string[];
  isRating?: boolean;
}

// Generic Filter Sidebar
interface FilterSidebarProps<T extends { search: string }> {
  activeTab: "consultants" | "projects";
  filters: T;
  setFilters: React.Dispatch<React.SetStateAction<T>>;
  filterConfigs: FilterOption<T>[];
  showClearButton: boolean;
  handleClearFilters: () => void;
}

function FilterSidebar<T extends { search: string }>({
  activeTab,
  filters,
  setFilters,
  filterConfigs,
  showClearButton,
  handleClearFilters,
}: FilterSidebarProps<T>) {
  return (
    <div className="bg-[#010101] border border-[#a71414] rounded-2xl p-5 shadow-lg space-y-6 relative overflow-hidden sticky top-6">
      <h3 className="text-lg font-bold text-white mb-3">
        {activeTab === "consultants" ? "Consultant Filters" : "Project Filters"}
      </h3>

      {/* Search */}
      <div>
        <label htmlFor="search" className="text-sm text-gray-400">
          Search
        </label>
        <div className="relative mt-1">
          <input
            id="search"
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder={`Search ${activeTab}...`}
            className="w-full bg-transparent border border-[#a71414] text-gray-100 placeholder-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d31c1c]"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Filters */}
      {filterConfigs.map(({ label, key, options, isRating }) => (
        <div key={String(key)}>
          <label className="text-sm text-gray-400">{label}</label>
          <select
            aria-label="filter"
            value={filters[key] as string}
            onChange={(e) =>
              setFilters({ ...filters, [key]: e.target.value } as T)
            }
            className="w-full bg-[#010101] border border-[#a71414] text-gray-100 px-3 py-2 rounded-md focus:outline-none"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {isRating && opt !== "All"
                  ? "★".repeat(Number(opt)) + "☆".repeat(5 - Number(opt))
                  : opt}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Clear Button */}
      <AnimatePresence>
        {showClearButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={handleClearFilters}
            className="w-full mt-5 font-semibold py-2 rounded-md bg-[#a71414]/80 hover:bg-[#d31c1c] text-white hover:scale-[1.02] focus:ring-2 focus:ring-[#d31c1c] transition-all"
          >
            Clear Filters ✨
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConsultancyMatchingSection() {
  const [activeTab, setActiveTab] = useState<"consultants" | "projects">(
    "consultants"
  );
  const [consultantFilters, setConsultantFilters] = useState<ConsultantFilters>(
    defaultConsultantFilters
  );
  const [projectFilters, setProjectFilters] = useState<ProjectFilters>(
    defaultProjectFilters
  );

  // Derived options
  const industries = useMemo(
    () => ["All", ...new Set(consultantsData.map((c) => c.industry))],
    []
  );
  const categories = useMemo(
    () => ["All", ...new Set(projectsData.map((p) => p.category))],
    []
  );
  const techs = useMemo(
    () =>
      ["All", ...new Set(projectsData.map((p) => p.tech ?? ""))].filter(
        Boolean
      ),
    []
  );
  const locations = useMemo(
    () =>
      ["All", ...new Set(projectsData.map((p) => p.location ?? ""))].filter(
        Boolean
      ),
    []
  );

  const parseRate = (rate: string) =>
    parseInt(rate.replace(/\D/g, ""), 10) || 0;

  // Filtered Consultants
  const filteredConsultants = useMemo(() => {
    const term = consultantFilters.search.toLowerCase();
    return consultantsData.filter((c: Consultant) => {
      const matchesSearch =
        c.name.toLowerCase().includes(term) ||
        c.industry.toLowerCase().includes(term) ||
        c.delivery.toLowerCase().includes(term);

      const matchesIndustry =
        consultantFilters.industry === "All" ||
        c.industry === consultantFilters.industry;

      const rateValue = parseRate(c.rate);
      const matchesRate =
        consultantFilters.rate === "All" ||
        (consultantFilters.rate === "Under $700" && rateValue < 700) ||
        (consultantFilters.rate === "$700-$1800" &&
          rateValue >= 700 &&
          rateValue <= 1800) ||
        (consultantFilters.rate === "Over $2000" && rateValue > 2000);

      const matchesRating =
        consultantFilters.rating === "All" ||
        c.rating === Number(consultantFilters.rating);

      return matchesSearch && matchesIndustry && matchesRate && matchesRating;
    });
  }, [consultantFilters]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    const term = projectFilters.search.toLowerCase();
    return projectsData.filter((p: Project) => {
      const matchesSearch =
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        (p.tech?.toLowerCase().includes(term) ?? false) ||
        (p.organization?.toLowerCase().includes(term) ?? false);

      const matchesCategory =
        projectFilters.category === "All" ||
        p.category === projectFilters.category;
      const matchesTech =
        projectFilters.tech === "All" || p.tech === projectFilters.tech;
      const matchesLocation =
        projectFilters.location === "All" ||
        p.location === projectFilters.location;

      return matchesSearch && matchesCategory && matchesTech && matchesLocation;
    });
  }, [projectFilters]);

  const handleClearFilters = () => {
    if (activeTab === "consultants")
      setConsultantFilters(defaultConsultantFilters);
    else setProjectFilters(defaultProjectFilters);
  };

  const showClearButton =
    activeTab === "consultants"
      ? JSON.stringify(consultantFilters) !==
        JSON.stringify(defaultConsultantFilters)
      : JSON.stringify(projectFilters) !==
        JSON.stringify(defaultProjectFilters);

  // Filter configs
  const consultantFilterConfig: FilterOption<ConsultantFilters>[] = [
    { label: "Industry", key: "industry", options: industries },
    {
      label: "Rate",
      key: "rate",
      options: ["All", "Under $700", "$700-$1800", "Over $2000"],
    },
    {
      label: "Rating",
      key: "rating",
      options: ["All", "5", "4", "3"],
      isRating: true,
    },
  ];

  const projectFilterConfig: FilterOption<ProjectFilters>[] = [
    { label: "Category", key: "category", options: categories },
    { label: "Technology", key: "tech", options: techs },
    { label: "Location", key: "location", options: locations },
  ];

  return (
    <section className="w-screen min-h-screen bg-[#0c0000] text-white font-sans flex flex-col overflow-hidden">
      {/* Header + Tabs */}
      <div className="px-6 py-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Consultancy & Project Matching
        </h2>
        <div className="flex justify-center gap-4">
          {["consultants", "projects"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "consultants" | "projects")}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                activeTab === tab
                  ? "bg-red-600 text-white"
                  : "bg-[#1a0d0d] border border-[#a71414] text-gray-200 hover:bg-[#010101]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 lg:px-8 pb-6 overflow-hidden">
        {/* Sidebar */}
        <div className="lg:col-span-1 overflow-y-auto pr-2">
          {activeTab === "consultants" && (
            <FilterSidebar<ConsultantFilters>
              activeTab={activeTab}
              filters={consultantFilters}
              setFilters={setConsultantFilters}
              filterConfigs={consultantFilterConfig}
              showClearButton={showClearButton}
              handleClearFilters={handleClearFilters}
            />
          )}
          {activeTab === "projects" && (
            <FilterSidebar<ProjectFilters>
              activeTab={activeTab}
              filters={projectFilters}
              setFilters={setProjectFilters}
              filterConfigs={projectFilterConfig}
              showClearButton={showClearButton}
              handleClearFilters={handleClearFilters}
            />
          )}
        </div>

        {/* Results Section */}
        <div className="lg:col-span-3 flex flex-col overflow-y-auto">
          <h3 className="text-2xl font-bold mb-4">
            {activeTab === "consultants" ? "Consultants" : "Projects"}
          </h3>

          {activeTab === "consultants" ? (
            filteredConsultants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
                {filteredConsultants.map((c) => (
                  <ConsultantCard key={c.id} consultant={c} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 mt-10">
                No consultants found matching your filters.
              </p>
            )
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
              {filteredProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-10">
              No projects found matching your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
