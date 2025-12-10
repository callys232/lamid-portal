"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PrototypeCardProps {
  id: number;
  imagePath: string;
  altText: string;
  name: string;
  onBuy: () => void;
  onAddToCart: () => void;
}

const PrototypeCard: React.FC<PrototypeCardProps> = ({
  id,
  imagePath,
  altText,
  name,
  onBuy,
  onAddToCart,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-800 rounded-lg overflow-hidden shadow-md bg-[#0b0b0b] hover:shadow-lg hover:border-[#c21219] transition-all"
    >
      {/* Image */}
      <div className="relative aspect-square w-full mb-4">
        <Image
          src={imagePath}
          alt={altText}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Name */}
      <div className="px-4 space-y-3">
        <div className="flex items-center gap-4 w-full text-center">
          <p className="text-sm text-gray-400">NAME:</p>
          <div className="h-8 flex items-center justify-center font-semibold text-white">
            {name}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-2">
          <button
            onClick={onBuy}
            className="flex-1 bg-[#0b0b0b] border border-white text-white text-xs px-4 py-2 rounded hover:bg-[#c21219] hover:text-white transition-colors"
          >
            BUY NOW
          </button>
          <button
            onClick={onAddToCart}
            className="flex-1 bg-[#0b0b0b] border border-white text-white text-xs px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-colors"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PrototypeCard;
