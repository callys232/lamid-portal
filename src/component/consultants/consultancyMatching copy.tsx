"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterSidebar, { FilterOption } from "./FilterSidebar";
import ConsultantCard from "./consultantCard";
import ProjectCard from "../projects/projectCard";
import {
  mockConsultants,
  teamProjects,
  individualProjects,
} from "@/mocks/mockClient";
import type { Consultant } from "@/types/client";
import type { Project } from "@/types/project";

const consultantsData: Consultant[] = mockConsultants;
const projectsData: Project[] = [...teamProjects, ...individualProjects];

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

  const parseRate = (rate: string | number): number => {
    if (typeof rate === "number") return rate;
    return parseInt(rate.replace(/\D/g, ""), 10) || 0;
  };

  const filteredConsultants = useMemo(() => {
    const term = consultantFilters.search.toLowerCase();
    return consultantsData.filter((c) => {
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
        c.rating >= Number(consultantFilters.rating);

      return matchesSearch && matchesIndustry && matchesRate && matchesRating;
    });
  }, [consultantFilters]);

  const filteredProjects = useMemo(() => {
    const term = projectFilters.search.toLowerCase();
    return projectsData.filter((p) => {
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

  const handleTabSwitch = (tab: "consultants" | "projects") => {
    setActiveTab(tab);
    if (tab === "consultants") setProjectFilters(defaultProjectFilters);
    else setConsultantFilters(defaultConsultantFilters);
  };

  return (
    <section className="w-full min-h-screen bg-[#0c0000] text-white font-sans flex flex-col">
      {/* Header + Tabs */}
      <div className="px-6 py-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Consultancy & Project Matching
        </h2>
        <div className="flex justify-center gap-4">
          {["consultants", "projects"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabSwitch(tab as "consultants" | "projects")}
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
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 lg:px-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 overflow-y-auto pr-2">
          {activeTab === "consultants" ? (
            <FilterSidebar<ConsultantFilters>
              activeTab={activeTab}
              filters={consultantFilters}
              setFilters={setConsultantFilters}
              filterConfigs={consultantFilterConfig}
              showClearButton={showClearButton}
              handleClearFilters={handleClearFilters}
            />
          ) : (
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
        <div className="lg:col-span-3 flex flex-col overflow-auto max-h-[calc(100vh-200px)]">
          <h3 className="text-2xl font-bold mb-4">
            {activeTab === "consultants" ? "Consultants" : "Projects"}
          </h3>

          <AnimatePresence mode="wait">
            {activeTab === "consultants" ? (
              <motion.div
                key="consultants"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                {filteredConsultants.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredConsultants.map((c) => (
                      <motion.div
                        key={c.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <ConsultantCard consultant={c} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 mt-10">
                    No consultants found matching your filters.
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProjects.map((p) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <ProjectCard project={p} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 mt-10">
                    No projects found matching your search.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
