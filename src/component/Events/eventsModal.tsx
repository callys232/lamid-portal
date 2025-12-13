"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { EventItem } from "@/types/eventTypes";
import EventSignupForm from "@/forms/eventSignUp";

interface EventModalProps {
  event: EventItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({
  event,
  isOpen,
  onClose,
}: EventModalProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showSignup, setShowSignup] = useState(false);

  const images = (
    Array.isArray(event.images)
      ? event.images.map((img) => img.path)
      : [event.image]
  ).filter(Boolean) as string[];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-black border border-orange-500 rounded-t-2xl shadow-2xl p-8 max-w-4xl w-full text-white relative overflow-y-auto max-h-[90vh]"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-orange-500 hover:text-[#c21219] text-2xl font-bold transition-colors"
              aria-label="Close"
            >
              ×
            </button>

            {/* Images */}
            {images.length > 0 && (
              <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 shadow-lg border border-white/10">
                <Image
                  src={images[currentImage]}
                  alt={event.title}
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
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-orange-600/70 hover:bg-[#c21219] text-white px-3 py-1 rounded-full transition"
                    >
                      ‹
                    </button>

                    <button
                      onClick={() =>
                        setCurrentImage((p) =>
                          p === images.length - 1 ? 0 : p + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-600/70 hover:bg-[#c21219] text-white px-3 py-1 rounded-full transition"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Title + meta */}
            <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              {event.title}
            </h2>

            {event.date && (
              <p className="text-sm text-gray-300 mb-1">
                {event.date} {event.time && `— ${event.time}`}
              </p>
            )}

            {event.location && (
              <p className="text-sm text-gray-400 mb-4">{event.location}</p>
            )}

            {/* Description */}
            {event.description && (
              <Section title="Description">
                <p className="text-gray-200">{event.description}</p>
              </Section>
            )}

            <hr className="border-t border-orange-500/40 my-6" />

            {/* Buttons */}
            {!showSignup && (
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSignup(true)}
                  className="px-5 py-2 rounded-md font-semibold bg-orange-500 hover:bg-[#c21219] text-white transition"
                >
                  Sign Up for This Event
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-md font-semibold border border-orange-500 text-orange-500 hover:text-white hover:bg-orange-500 transition"
                >
                  All Events
                </button>
              </div>
            )}

            {/* Signup Form */}
            {showSignup && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <EventSignupForm
                  eventId={event.id}
                  eventTitle={event.title}
                  onSuccess={onClose}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------- Helper Components -------------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}
