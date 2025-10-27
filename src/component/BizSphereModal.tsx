"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BizSphereModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BizSphereModal({
  isOpen,
  onClose,
}: BizSphereModalProps) {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/60 dark:bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden
              bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100
            "
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="
                absolute top-4 right-4 p-1.5 rounded-md transition
                bg-black text-white hover:bg-gray-800
                dark:bg-[#1a1a1a] dark:hover:bg-[#2a2a2a]
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="py-12 px-6 text-center">
              {/* Logo dots */}
              <div className="flex justify-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#C12129]" />
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <div className="h-2 w-2 rounded-full bg-gray-400" />
                  <div className="h-2 w-2 border border-black dark:border-gray-300" />
                </div>
              </div>

              {/* Brand name */}
              <div className="flex flex-col items-center mb-6">
                <h2 className="text-lg font-bold tracking-wider">BIZSPHERE</h2>
                <p className="text-xs opacity-80">
                  it&apos;s all about business
                </p>
              </div>

              {/* Main text */}
              <p className="mb-8 text-sm md:text-base leading-relaxed">
                The exclusive online networking{" "}
                <span className="text-[#C12129] font-medium">marketplace</span>,
                where sellers meet buyers, and exchange services and products.
              </p>

              {/* CTA button */}
              <button
                onClick={onClose}
                className="
                  py-2 px-8 rounded-lg font-medium transition-colors w-full sm:w-auto
                  bg-[#C12129] text-white hover:bg-red-900
                  dark:bg-[#C12129] dark:hover:bg-[#a5161d]
                "
              >
                Join our Community
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
