"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { EventItem } from "@/types/eventTypes";

interface EventModalProps extends EventItem {
  isOpen: boolean;
  onClose: () => void;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  images,
  date,
  time,
  location,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black border border-white/20 rounded-2xl p-8 max-w-md w-full text-white shadow-xl relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-white hover:text-orange-500 text-xl"
            >
              ✕
            </button>

            {/* Multiple images */}
            {images && images.length > 0 && (
              <div className="flex gap-3 overflow-x-auto mb-4">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-28 h-28 rounded overflow-hidden border border-white/20"
                  >
                    <Image
                      src={img.path}
                      alt={img.alt || title}
                      width={112}
                      height={112}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Title + description */}
            <h3 className="text-2xl font-bold text-center text-orange-500">
              {title}
            </h3>
            <p className="mt-3 text-white/80 text-center">{description}</p>

            {/* Meta info */}
            <div className="mt-6 text-sm text-white/70 space-y-1">
              {date && (
                <p>
                  <strong>Date:</strong> {date}
                </p>
              )}
              {time && (
                <p>
                  <strong>Time:</strong> {time}
                </p>
              )}
              {location && (
                <p>
                  <strong>Location:</strong> {location}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3 justify-center">
              {primaryAction && (
                <button
                  onClick={primaryAction.onClick}
                  className="px-5 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition font-medium"
                >
                  {primaryAction.label}
                </button>
              )}
              {secondaryAction && (
                <button
                  onClick={secondaryAction.onClick}
                  className="px-5 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition font-medium"
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
