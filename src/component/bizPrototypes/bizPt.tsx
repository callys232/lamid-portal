"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface BusinessPrototype {
  id: number;
  name: string;
  category: string;
  image: string;
  featured?: boolean;
}

const BizPT: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const businessPrototypes: BusinessPrototype[] = [
    {
      id: 1,
      name: "Fish Farming",
      category: "AGRIC",
      image: "/SD-people-working.png",
    },
    {
      id: 2,
      name: "Adire (Batik)",
      category: "TEXTILE",
      image: "/SD-people-working.png",
    },
    {
      id: 3,
      name: "Tie & Dye",
      category: "",
      image: "/SD-classroom.png",
      featured: true,
    },
    { id: 4, name: "Barber", category: "SERVICE", image: "/SD-classroom.png" },
    {
      id: 5,
      name: "Distribution",
      category: "LOGISTICS",
      image: "/SD-classroom.png",
    },
  ];

  const filteredPrototypes = businessPrototypes.filter(
    (prototype) =>
      prototype.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prototype.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#C12129] rounded-md px-6 py-2 text-white text-center font-semibold animate-bounce">
            READY TO ADOPT BIZ PROTO-TYPES
          </div>
        </div>

        {/* Main content card */}
        <div className="bg-[#111] rounded-xl p-4 md:p-6 border border-gray-800">
          {/* Search bar */}
          <div className="flex mb-6 max-w-lg mx-auto">
            <button
              type="button"
              className="bg-[#C12129] text-white px-4 py-2 rounded-l-md flex items-center hover:scale-105 transition-transform"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search filter"
            >
              <span className="mr-2">×</span>
              <span>Filter</span>
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-4 py-2 bg-gray-200 text-black rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#C12129]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Business prototypes grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6 relative">
            {filteredPrototypes.length > 0 ? (
              filteredPrototypes.map((prototype, idx) => (
                <div
                  key={prototype.id}
                  className={`${
                    prototype.featured
                      ? "sm:col-span-1 md:row-span-2 lg:col-start-3 lg:row-start-1"
                      : ""
                  } 
                    bg-black rounded-lg border border-gray-800 overflow-hidden flex flex-col 
                    transform transition duration-500 hover:scale-105 hover:shadow-lg 
                    opacity-0 animate-fadeIn`}
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="relative h-32 md:h-40">
                    <Image
                      src={prototype.image}
                      alt={prototype.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-lg"
                    />
                  </div>

                  <div className="p-2 flex flex-col flex-grow">
                    <div className="text-xs text-gray-400">
                      <div>NAME: {prototype.name}</div>
                      {prototype.category && (
                        <div>CATEGORY: {prototype.category}</div>
                      )}
                    </div>

                    <div className="mt-auto flex space-x-2 pt-2">
                      <button
                        type="button"
                        className="bg-[#C12129] text-white text-xs rounded px-2 py-1 flex-1 hover:bg-[#a81d23] transition-colors"
                      >
                        ADOPT
                      </button>
                      <button
                        type="button"
                        className="bg-transparent border border-[#C12129] text-white text-xs rounded px-2 py-1 flex-1 hover:bg-[#C12129] hover:text-black transition-colors"
                      >
                        DETAILS
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full animate-pulse">
                No prototypes match your search.
              </p>
            )}
          </div>

          {/* Tagline */}
          <div className="text-center text-white/90 mb-4 italic animate-fadeIn">
            Proven to guarantee success and earn investors&apos; trust
          </div>
        </div>

        {/* Megaphone section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 mb-6 animate-fadeIn">
          <div className="w-24 h-24 md:w-32 md:h-32 relative flex-shrink-0">
            <Image
              src="/megaphone-icon.png"
              alt="Megaphone"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          <div>
            <p className="text-white text-base md:text-lg">
              To obtain an invitation to our much sought-after business clinic,
              and get a chance to win a free diagnostic care,
              <Link href="#" className="text-[#C12129] hover:underline ml-1">
                Click here
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Counter */}
        <div className="mt-8 text-[#C12129] text-2xl md:text-3xl font-bold animate-bounce">
          3000+ SMES CREATED
        </div>
      </div>
    </div>
  );
};

export default BizPT;
