"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface ProjectOverviewProps {
  id: string;
  title: string;
  organization: string;
  location: string;
  category: string;
  rating: number;
  image: string;
  budget: number | string;
  hourlyRate: string;
  tech: string;
  timeline: string;
  milestones: string[];
  skills: string[];
  escrow: {
    date: string;
    type: string;
    amount: number;
    status: string;
    action: string;
  }[];
}

export default function ProjectOverview({
  id,
  title,
  organization,
  location,
  category,
  rating,
  image,
  budget,
  hourlyRate,
  tech,
  timeline,
  milestones = [],
  skills = [],
  escrow = [],
}: ProjectOverviewProps) {
  const [activeTab, setActiveTab] = useState<
    "milestones" | "skills" | "escrow"
  >("milestones");

  const fallbackImage = "/images/default-project.jpg"; // replace with your default image path

  return (
    <div className="bg-[#1a0d0d] border border-[#3a1919] rounded-xl p-6 text-gray-200 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          src={image || fallbackImage}
          alt={title}
          width={80}
          height={80}
          className="rounded object-cover"
        />
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-400">{organization}</p>
          <p className="text-sm text-gray-400">
            {location} • {category}
          </p>
          <div className="text-red-500 text-sm mt-1">
            {rating > 0 ? "★".repeat(rating) : "No rating"}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-400">Budget</p>
          <p className="text-lg text-white">{budget || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Rate</p>
          <p className="text-lg text-white">{hourlyRate || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Tech</p>
          <p className="text-lg text-white">{tech || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Timeline</p>
          <p className="text-lg text-white">{timeline || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Project ID</p>
          <p className="text-lg text-white">{id}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mt-6">
        {["milestones", "skills", "escrow"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "milestones" &&
          (milestones.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              {milestones.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No milestones available.</p>
          ))}

        {activeTab === "skills" &&
          (skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No skills listed.</p>
          ))}

        {activeTab === "escrow" &&
          (escrow.length > 0 ? (
            <table className="w-full text-left text-sm text-gray-300">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {escrow.map((tx, i) => (
                  <tr key={i}>
                    <td>{tx.date}</td>
                    <td>{tx.type}</td>
                    <td>${tx.amount.toLocaleString()}</td>
                    <td>{tx.status}</td>
                    <td>
                      <button className="text-blue-500 hover:underline">
                        {tx.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400">No escrow transactions found.</p>
          ))}
      </div>
    </div>
  );
}
