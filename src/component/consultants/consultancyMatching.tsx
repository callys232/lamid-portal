"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import ConsultantCard from "./consultantCard";
import ProjectCard from "../projects/projectCard";
import { consultantsData, Consultant } from "./consultantData";
import { projectsData, Project } from "../projects/projectData";

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

interface FilterSidebarProps {
  activeTab: "consultants" | "projects";
  consultantFilters: typeof defaultConsultantFilters;
  projectFilters: typeof defaultProjectFilters;
  setConsultantFilters: React.Dispatch<
    React.SetStateAction<typeof defaultConsultantFilters>
  >;
  setProjectFilters: React.Dispatch<
    React.SetStateAction<typeof defaultProjectFilters>
  >;
  industries: string[];
  categories: string[];
  techs: string[];
  locations: string[];
  showClearButton: boolean;
  handleClearFilters: () => void;
}

const FilterSidebar = ({
  activeTab,
  consultantFilters,
  projectFilters,
  setConsultantFilters,
  setProjectFilters,
  industries,
  categories,
  techs,
  locations,
  showClearButton,
  handleClearFilters,
}: FilterSidebarProps) => (
  <div className="bg-[#010101] border border-[#a71414] rounded-2xl p-5 shadow-lg space-y-6 relative overflow-hidden sticky top-6">
    <h3 className="text-lg font-bold text-white mb-3">
      {activeTab === "consultants" ? "Consultant Filters" : "Project Filters"}
    </h3>

    {/* Shared Search Input */}
    <div>
      <label htmlFor="search" className="text-sm text-gray-400">
        Search
      </label>
      <div className="relative mt-1">
        <input
          id="search"
          type="text"
          value={
            activeTab === "consultants"
              ? consultantFilters.search
              : projectFilters.search
          }
          onChange={(e) =>
            activeTab === "consultants"
              ? setConsultantFilters({
                  ...consultantFilters,
                  search: e.target.value,
                })
              : setProjectFilters({ ...projectFilters, search: e.target.value })
          }
          placeholder={`Search ${
            activeTab === "consultants" ? "consultants" : "projects"
          }...`}
          className="w-full bg-transparent border border-[#a71414] text-gray-100 placeholder-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d31c1c]"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>
    </div>

    {/* Filters */}
    {activeTab === "consultants" ? (
      <>
        {/* Industry */}
        <div>
          <label htmlFor="industry" className="text-sm text-gray-400">
            Industry
          </label>
          <select
            id="industry"
            value={consultantFilters.industry}
            onChange={(e) =>
              setConsultantFilters({
                ...consultantFilters,
                industry: e.target.value,
              })
            }
            className="w-full bg-[#010101] border border-[#a71414] text-gray-100 px-3 py-2 rounded-md focus:outline-none"
          >
            {industries.map((ind) => (
              <option key={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* Rate */}
        <div>
          <label htmlFor="rate" className="text-sm text-gray-400">
            Rate
          </label>
          <select
            id="rate"
            value={consultantFilters.rate}
            onChange={(e) =>
              setConsultantFilters({
                ...consultantFilters,
                rate: e.target.value,
              })
            }
            className="w-full bg-[#010101] border border-[#a71414] text-gray-100 px-3 py-2 rounded-md focus:outline-none"
          >
            {["All", "Under $700", "$700-$1800", "Over $2000"].map((rate) => (
              <option key={rate}>{rate}</option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating" className="text-sm text-gray-400">
            Rating
          </label>
          <select
            id="rating"
            value={consultantFilters.rating}
            onChange={(e) =>
              setConsultantFilters({
                ...consultantFilters,
                rating: e.target.value,
              })
            }
            className="w-full bg-[#010101] border border-[#a71414] text-gray-100 px-3 py-2 rounded-md focus:outline-none"
          >
            {["All", "5", "4", "3"].map((rating) => (
              <option key={rating} value={rating}>
                {rating === "All"
                  ? "All"
                  : "★".repeat(Number(rating)) + "☆".repeat(5 - Number(rating))}
              </option>
            ))}
          </select>
        </div>
      </>
    ) : (
      <>
        {/* Category */}
        <div>
          <label htmlFor="category" className="text-sm text-gray-400">
            Category
          </label>
          <select
            id="category"
            value={projectFilters.category}
            onChange={(e) =>
              setProjectFilters({ ...projectFilters, category: e.target.value })
            }
            className="w-full bg-[#010101] border border-[#a71414] text-gray-100 px-3 py-2 rounded-md focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Tech */}
        <div>
          <label htmlFor="tech" className="text-sm text-gray-400">
            Technology
          </label>
          <select
            id="tech"
            value={projectFilters.tech}
            onChange={(e) =>
              setProjectFilters({ ...projectFilters, tech: e.target.value })
            }
            className="w-full bg-[#010101] border border-[#a71414] text-gray-100 px-3 py-2 rounded-md focus:outline-none"
          >
            {techs.map((tech) => (
              <option key={tech}>{tech}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="text-sm text-gray-400">
            Location
          </label>
          <select
            id="location"
            value={projectFilters.location}
            onChange={(e) =>
              setProjectFilters({ ...projectFilters, location: e.target.value })
            }
            className="w-full bg-[#010101] border border-[#a71414] text-gray-100 px-3 py-2 rounded-md focus:outline-none"
          >
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </>
    )}

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

export default function ConsultancyMatchingSection() {
  const [activeTab, setActiveTab] = useState<"consultants" | "projects">(
    "consultants"
  );
  const [consultantFilters, setConsultantFilters] = useState(
    defaultConsultantFilters
  );
  const [projectFilters, setProjectFilters] = useState(defaultProjectFilters);

  const industries = useMemo(
    () => ["All", ...new Set(consultantsData.map((c) => c.industry))],
    []
  );
  const categories = useMemo(
    () => ["All", ...new Set(projectsData.map((p) => p.category))],
    []
  );
  const techs = useMemo(
    () => ["All", ...new Set(projectsData.map((p) => p.tech))],
    []
  );
  const locations = useMemo(
    () => ["All", ...new Set(projectsData.map((p) => p.location))],
    []
  );

  const parseRate = (rate: string) =>
    parseInt(rate.replace(/\D/g, ""), 10) || 0;

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

  const filteredProjects = useMemo(() => {
    const term = projectFilters.search.toLowerCase();
    return projectsData.filter((p: Project) => {
      const matchesSearch =
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.tech.toLowerCase().includes(term) ||
        p.organization.toLowerCase().includes(term);

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
          <FilterSidebar
            activeTab={activeTab}
            consultantFilters={consultantFilters}
            projectFilters={projectFilters}
            setConsultantFilters={setConsultantFilters}
            setProjectFilters={setProjectFilters}
            industries={industries}
            categories={categories}
            techs={techs}
            locations={locations}
            showClearButton={showClearButton}
            handleClearFilters={handleClearFilters}
          />
        </div>

        {/* Results Section */}
        <div className="lg:col-span-3 flex flex-col overflow-y-auto">
          <h3 className="text-2xl font-bold mb-4">
            {activeTab === "consultants" ? "Consultants" : "Projects"}
          </h3>

          {activeTab === "consultants" ? (
            filteredConsultants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
                {filteredConsultants.map((consultant) => (
                  <ConsultantCard key={consultant.id} consultant={consultant} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 mt-10">
                No consultants found matching your filters.
              </p>
            )
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
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
