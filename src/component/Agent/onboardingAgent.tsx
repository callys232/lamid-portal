import React, { useMemo, useState } from "react";

type Role = "client" | "consultant" | "teamlead" | "visitor";
type Intent = "find" | "post" | null;

export default function OnboardingAgent() {
  const [role, setRole] = useState<Role | null>(null);
  const [intent, setIntent] = useState<Intent>(null);

  const roleGuess: Role = useMemo(() => "visitor", []);

  const confirmedRole = role ?? roleGuess;

  return (
    <div className="bg-[#010101] p-6 rounded-lg border border-[#1f1f1f]">
      <h2 className="text-xl font-bold mb-3">🧭 Onboarding & Guidance</h2>
      <p className="text-gray-400 mb-4">
        I think you’re a{" "}
        <span className="font-semibold text-white">{roleGuess}</span>. Confirm
        your role to continue.
      </p>

      {!role && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {(["client", "consultant", "teamlead", "visitor"] as Role[]).map(
            (r) => (
              <button
                key={r}
                className="bg-[#c21219] hover:bg-[#8b0f14] text-white p-3 rounded"
                onClick={() => setRole(r)}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            )
          )}
        </div>
      )}

      {confirmedRole !== "visitor" && (
        <>
          <p className="text-gray-400 mb-2">What brings you here today?</p>
          <div className="flex gap-3 mb-6">
            <button
              className="px-4 py-2 bg-[#c21219] hover:bg-[#8b0f14] rounded text-white"
              onClick={() => setIntent("find")}
            >
              Find a gig
            </button>
            <button
              className="px-4 py-2 bg-[#c21219] hover:bg-[#8b0f14] rounded text-white"
              onClick={() => setIntent("post")}
            >
              Post a gig
            </button>
          </div>
        </>
      )}

      {/* Wizard preview */}
      {confirmedRole === "client" && intent === "post" && (
        <div className="bg-[#1a1a1a] p-4 rounded border border-[#8b0f14]">
          <h3 className="font-semibold text-white">Project scoping</h3>
          <p className="text-sm text-gray-400">
            Step 1 of 3: Name your project
          </p>
          <input
            type="text"
            placeholder="Project Name"
            className="w-full mt-3 p-2 rounded bg-[#010101] border border-[#333] text-white focus:ring-2 focus:ring-[#c21219]"
          />
          <div className="mt-4 flex justify-between">
            <button className="px-4 py-2 bg-[#0f0f0f] border border-[#333] rounded text-white">
              Back
            </button>
            <button className="px-4 py-2 bg-[#c21219] rounded text-white">
              Next
            </button>
          </div>
          <div className="mt-6">
            <div className="bg-[#333] h-2 rounded">
              <div
                className="bg-[#c21219] h-2 rounded"
                style={{ width: "33%" }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">Progress: 33%</p>
          </div>
        </div>
      )}
    </div>
  );
}
