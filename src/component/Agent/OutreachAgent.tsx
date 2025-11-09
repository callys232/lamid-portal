import React from "react";

export default function OutreachAgent() {
  return (
    <div className="bg-[#010101] p-6 rounded-lg border border-[#1f1f1f]">
      <h3 className="text-lg font-semibold text-white mb-4">
        ✉️ Outreach & SEO
      </h3>

      {/* Campaign Builder */}
      <div className="bg-[#1a1a1a] p-4 rounded-lg mb-6 border border-[#8b0f14]">
        <h4 className="font-semibold text-[#ff5722]">Campaign builder</h4>
        <input
          type="text"
          placeholder="Subject"
          className="w-full mt-3 p-2 rounded bg-[#010101] border border-[#333] text-white focus:ring-2 focus:ring-[#c21219]"
        />
        <textarea
          placeholder="Message content"
          className="w-full mt-3 p-2 rounded bg-[#010101] border border-[#333] text-white focus:ring-2 focus:ring-[#ff5722]"
          rows={5}
        />
        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 rounded bg-gradient-to-r from-[#c21219] to-[#ff5722] text-white hover:opacity-90 transition">
            Preview campaign
          </button>
          <button className="px-4 py-2 rounded bg-[#ff9800] text-black font-semibold hover:bg-[#ffb74d] transition">
            Send campaign
          </button>
        </div>
      </div>

      {/* Keyword Tracking */}
      <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#ff5722]">
        <h4 className="font-semibold text-[#ff9800]">Keyword tracking</h4>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <KeywordCard term="web design" hits={128} />
          <KeywordCard term="mobile app" hits={92} />
          <KeywordCard term="analytics" hits={47} />
        </div>
      </div>
    </div>
  );
}

function KeywordCard({ term, hits }: { term: string; hits: number }) {
  return (
    <div className="bg-[#010101] p-4 rounded-lg border border-[#333] hover:border-[#ff5722] transition">
      <p className="font-semibold text-white">{term}</p>
      <p className="text-sm text-gray-400">{hits} searches</p>
      <button className="mt-2 px-3 py-1 bg-gradient-to-r from-[#c21219] to-[#ff5722] text-white rounded hover:opacity-90 transition">
        Boost content
      </button>
    </div>
  );
}
