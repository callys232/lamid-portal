"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Project, Milestone } from "@/types/project";
import { Consultant } from "@/types/client";
import BidSection from "./bidSection";

interface JobModalProps {
  job: Project;
  isRegisteredUser?: boolean;
  onClose: () => void;
  onApply: (job: Project) => void;
  onBid: (job: Project, amount: number) => void;
  bids?: { amount: number; date: string }[];
}

export default function JobModal({
  job,
  isRegisteredUser = false,
  onClose,
  onApply,
  onBid,
  bids = [],
}: JobModalProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const images = (Array.isArray(job.images) ? job.images : [job.image]).filter(
    Boolean
  ) as string[];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 max-w-6xl w-full text-gray-100 relative overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl font-bold transition-colors"
            aria-label="Close"
          >
            ×
          </button>

          {/* Images */}
          {images.length > 0 && (
            <div className="relative w-full h-72 rounded-xl overflow-hidden mb-8 shadow-lg">
              <Image
                src={images[currentImage]}
                alt={job.title}
                width={1200}
                height={600}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImage((p) =>
                        p === 0 ? images.length - 1 : p - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-3 py-1 rounded-full transition"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImage((p) =>
                        p === images.length - 1 ? 0 : p + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-3 py-1 rounded-full transition"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          )}

          {/* Title + meta */}
          <h2 className="text-3xl font-bold mb-2 text-white">{job.title}</h2>
          <p className="text-sm text-gray-300 mb-1">
            {job.organization} {job.location && `— ${job.location}`}
          </p>
          <p className="text-sm text-gray-400 mb-4">
            {job.category} {job.tech && `| ${job.tech}`}
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-6 mb-6">
            {job.budget && <Metric label="Budget" value={job.budget} />}
            {job.hourlyRate && (
              <Metric label="Hourly rate" value={job.hourlyRate} />
            )}
            {job.deadline && <Metric label="Deadline" value={job.deadline} />}
            {job.priority && <Metric label="Priority" value={job.priority} />}
          </div>

          {/* Description */}
          {job.description && (
            <Section title="Description">
              <p className="text-gray-300">{job.description}</p>
            </Section>
          )}

          {/* Milestones */}
          {job.milestones?.length ? (
            <Section title="Milestones">
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                {job.milestones.map((m: Milestone, i: number) => (
                  <li key={m.id || m._id || i}>
                    <span className="font-semibold text-[#c21219]">
                      {m.title}
                    </span>
                    {m.description && (
                      <span className="ml-2 text-gray-400">
                        — {m.description}
                      </span>
                    )}
                    {m.status && (
                      <span className="ml-2 text-xs text-gray-500">
                        [{m.status}]
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {/* Consultants */}
          {job.consultants?.length ? (
            <Section title="Consultants">
              <div className="flex flex-wrap gap-3">
                {(job.consultants as (string | Consultant)[]).map((c, i) =>
                  typeof c === "string" ? (
                    <Badge key={c} text={c} />
                  ) : (
                    <div
                      key={c.id || i}
                      className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-[#c21219] rounded-lg text-sm"
                    >
                      <p className="text-white font-semibold">{c.name}</p>
                      {c.role && <p className="text-gray-300">{c.role}</p>}
                    </div>
                  )
                )}
              </div>
            </Section>
          ) : null}

          {/* Suggested Bid Range */}
          {job.suggestedBidRange && (
            <Section title="Suggested Bid Range">
              <p className="text-gray-300">
                ${job.suggestedBidRange.min} – ${job.suggestedBidRange.max}
              </p>
            </Section>
          )}

          <hr className="border-t border-white/20 my-6" />

          {/* Apply button */}
          <button
            className="px-5 py-2 rounded-md font-semibold bg-[#c21219] hover:bg-red-700 text-white transition"
            onClick={() => onApply(job)}
          >
            Apply now
          </button>

          {/* ✅ Reusable BidSection */}
          <BidSection
            job={job}
            isRegisteredUser={isRegisteredUser}
            onBid={onBid}
            initialBids={bids}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* -------------------- Helper Components -------------------- */
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-md">
      <p className="font-semibold text-[#c21219]">{value}</p>
      <p className="text-sm text-gray-300">{label}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-[#c21219] rounded-lg text-sm">
      <p className="text-white font-semibold">{text}</p>
    </div>
  );
}
