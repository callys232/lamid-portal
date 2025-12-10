"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, fadeInUp } from "@/utils/motionVaraints";

interface BizSphereModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BizSphereModal: React.FC<BizSphereModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
          onClick={onClose}
        >
          <motion.div
            className="bg-white text-black rounded-lg shadow-xl p-6 w-full max-w-md relative"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-black transition"
            >
              ✕
            </button>

            {/* Modal Content */}
            <h2 className="text-xl font-bold mb-4">
              Join the BizSphere Community
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              Connect with entrepreneurs, showcase your products and services,
              and gain access to valuable resources. Take the first step toward
              expanding your business network.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
                Get Started
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BizSphereModal;
