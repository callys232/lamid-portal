import React from "react";

export default function ProjectAgent() {
  return (
    <div className="bg-[#010101] p-6 rounded-lg border border-[#1f1f1f]">
      <h3 className="text-lg font-semibold mb-3">
        📂 Project & Team Intelligence
      </h3>

      <div className="bg-[#1a1a1a] p-4 rounded border border-[#374151]">
        <h4 className="font-semibold text-white">Website Redesign</h4>
        <p className="text-sm text-gray-400">Deadline: 2 weeks</p>

        <div className="bg-[#333] h-2 rounded mt-3">
          <div className="bg-[#3b82f6] h-2 rounded" style={{ width: "60%" }} />
        </div>

        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1 bg-[#3b82f6] text-white rounded">
            Assign consultant
          </button>
          <button className="px-3 py-1 bg-[#0f0f0f] border border-[#374151] text-white rounded">
            Reassign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <ConsultantCard name="Aisha N." rating={4.8} availability="Available" />
        <ConsultantCard name="David K." rating={4.5} availability="Limited" />
      </div>
    </div>
  );
}

function ConsultantCard({
  name,
  rating,
  availability,
}: {
  name: string;
  rating: number;
  availability: "Available" | "Limited" | "Unavailable";
}) {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded border border-[#374151]">
      <h4 className="font-semibold text-white">{name}</h4>
      <p className="text-sm text-gray-400">
        Rating: {rating} • {availability}
      </p>
      <button className="mt-2 px-3 py-1 bg-[#3b82f6] text-white rounded">
        View profile
      </button>
    </div>
  );
}
