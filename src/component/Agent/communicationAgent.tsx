import React from "react";

export default function CommunicationAgent() {
  return (
    <div className="bg-[#010101] p-6 rounded-lg border border-[#1f1f1f]">
      <h3 className="text-lg font-semibold">📢 Communication & Risk</h3>

      <div className="bg-[#f59e0b] p-3 rounded-lg mt-3 text-[#010101]">
        <p className="font-semibold">⚠️ Milestone overdue: Website Redesign</p>
        <div className="mt-2 flex gap-2">
          <button className="px-3 py-1 bg-[#010101] text-white rounded hover:bg-[#1a1a1a]">
            Send reminder
          </button>
          <button className="px-3 py-1 bg-[#facc15] text-black rounded">
            Escalate
          </button>
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4 border border-[#f59e0b]">
        <h4 className="font-semibold text-[#facc15]">Notification templates</h4>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <TemplateCard title="Overdue task" />
          <TemplateCard title="Payment due" />
          <TemplateCard title="Welcome message" />
          <TemplateCard title="Assignment notice" />
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ title }: { title: string }) {
  return (
    <div className="bg-[#010101] p-4 rounded-lg border border-[#333] hover:border-[#f59e0b] transition">
      <p className="font-semibold text-white">{title}</p>
      <button className="mt-2 px-3 py-1 bg-[#facc15] text-black rounded">
        Send
      </button>
    </div>
  );
}
