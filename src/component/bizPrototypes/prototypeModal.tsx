"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/component/Cartcontext";

interface PrototypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  imagePath: string;
  altText: string;
}

const PrototypeModal: React.FC<PrototypeModalProps> = ({
  isOpen,
  onClose,
  name,
  imagePath,
  altText,
}) => {
  const { addToCart } = useCart();

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
            className="bg-[#0b0b0b] border border-white/20 rounded-2xl p-8 max-w-md w-full text-white shadow-xl relative"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-white hover:text-[#c21219] text-xl"
            >
              ✕
            </button>

            {/* Image */}
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border border-white/20 mb-4">
              <Image
                src={imagePath}
                fill
                alt={altText}
                className="object-contain"
              />
            </div>

            <h3 className="text-2xl font-bold text-center text-blue-400">
              {name}
            </h3>
            <p className="mt-3 text-white/80 text-center">
              This is a reusable modal for{" "}
              <span className="text-[#c21219]">{name}</span>. Extend it with
              more details, pricing, or checkout flow.
            </p>

            <div className="mt-8 flex gap-3 justify-center">
              <button
                onClick={() => {
                  addToCart({ id: Date.now(), name, imagePath });
                  onClose();
                }}
                className="px-5 py-2 bg-[#c21219] text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Confirm Purchase
              </button>
              <button
                onClick={() => {
                  addToCart({ id: Date.now(), name, imagePath });
                  onClose();
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition font-medium"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrototypeModal;
