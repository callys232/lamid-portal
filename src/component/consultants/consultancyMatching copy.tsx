"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import ConsultantCard from "./consultantCard";
import { consultantsData, Consultant } from "./consultantData";
import Image from "next/image";

export default function ConsultancyMatchingSection() {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [rateFilter, setRateFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const industries = useMemo(
    () => ["All", ...new Set(consultantsData.map((c) => c.industry))],
    []
  );

  const parseRate = (rate: string) =>
    parseInt(rate.replace(/\D/g, ""), 10) || 0;

  const filteredConsultants = useMemo(() => {
    const term = search.toLowerCase();
    return consultantsData.filter((c: Consultant) => {
      const matchesSearch =
        c.name.toLowerCase().includes(term) ||
        c.industry.toLowerCase().includes(term) ||
        c.delivery.toLowerCase().includes(term);

      const matchesIndustry =
        industryFilter === "All" || c.industry === industryFilter;

      const rateValue = parseRate(c.rate);
      const matchesRate =
        rateFilter === "All" ||
        (rateFilter === "Under $700" && rateValue < 700) ||
        (rateFilter === "$700-$1800" &&
          rateValue >= 700 &&
          rateValue <= 1800) ||
        (rateFilter === "Over $2000" && rateValue > 2000);

      const matchesRating =
        ratingFilter === "All" || c.rating === Number(ratingFilter);

      return matchesSearch && matchesIndustry && matchesRate && matchesRating;
    });
  }, [search, industryFilter, rateFilter, ratingFilter]);

  const toggleDropdown = (type: string) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  return (
    <section className="bg-[#0c0000] text-white py-16 px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
          Consultancy Matching
        </h2>

        {/* Search & AI Advert Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by industry, qualification..."
              className="w-full bg-transparent border border-[#a71414] text-gray-100 placeholder-gray-500 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d31c1c] transition-all"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* AI Advert */}
          <div className="bg-[#1a0000] border border-[#a71414] rounded-xl px-6 py-4 flex flex-col lg:flex-row items-center gap-4 shadow-[0_0_20px_rgba(255,0,0,0.1)]">
            <Image
              src="/aibot.png"
              alt="AI assistant"
              width={50}
              height={50}
              className="animate-bounce"
            />
            <div>
              <p className="font-bold text-sm uppercase text-[#ff2d2d] tracking-wide mb-1">
                Get tailored offers for your needs
              </p>
              <p className="text-gray-300 text-xs">
                Users who used this reported{" "}
                <span className="font-semibold text-[#ff5252]">
                  95% more win rate
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          {/* Industry Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("industry")}
              className="flex items-center gap-2 bg-[#2a0d0d] border border-[#a71414] px-4 py-2 rounded-md text-gray-100 font-semibold"
            >
              Industry: {industryFilter} <ChevronDown className="w-4 h-4" />
            </button>
            {openDropdown === "industry" && (
              <div className="absolute mt-2 bg-[#1a0d0d] border border-[#a71414] rounded-md shadow-lg z-10">
                {industries.map((ind) => (
                  <div
                    key={ind}
                    onClick={() => {
                      setIndustryFilter(ind);
                      setOpenDropdown(null);
                    }}
                    className="px-4 py-2 hover:bg-[#2a0d0d] cursor-pointer"
                  >
                    {ind}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rate Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("rate")}
              className="flex items-center gap-2 bg-[#2a0d0d] border border-[#a71414] px-4 py-2 rounded-md text-gray-100 font-semibold"
            >
              Rate: {rateFilter} <ChevronDown className="w-4 h-4" />
            </button>
            {openDropdown === "rate" && (
              <div className="absolute mt-2 bg-[#1a0d0d] border border-[#a71414] rounded-md shadow-lg z-10">
                {["All", "Under $700", "$700-$1800", "Over $2000"].map(
                  (rate) => (
                    <div
                      key={rate}
                      onClick={() => {
                        setRateFilter(rate);
                        setOpenDropdown(null);
                      }}
                      className="px-4 py-2 hover:bg-[#2a0d0d] cursor-pointer"
                    >
                      {rate}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("rating")}
              className="flex items-center gap-2 bg-[#2a0d0d] border border-[#a71414] px-4 py-2 rounded-md text-gray-100 font-semibold"
            >
              Rating: {ratingFilter} <ChevronDown className="w-4 h-4" />
            </button>
            {openDropdown === "rating" && (
              <div className="absolute mt-2 bg-[#1a0d0d] border border-[#a71414] rounded-md shadow-lg z-10">
                {["All", "5", "4", "3"].map((rating) => (
                  <div
                    key={rating}
                    onClick={() => {
                      setRatingFilter(rating);
                      setOpenDropdown(null);
                    }}
                    className="px-4 py-2 hover:bg-[#2a0d0d] cursor-pointer"
                  >
                    {rating === "All"
                      ? "All"
                      : "★".repeat(Number(rating)) +
                        "☆".repeat(5 - Number(rating))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Heading */}
        <h3 className="text-2xl font-bold mb-6">Consultant List</h3>

        {/* Results */}
        {filteredConsultants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredConsultants.map((consultant) => (
              <ConsultantCard key={consultant.id} consultant={consultant} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-10">
            No consultants found matching your filters.
          </p>
        )}
      </div>
    </section>
  );
}
