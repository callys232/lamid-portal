"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/motionVaraints"; // adjust path

interface MotionCardProps {
  image: string;
  text: string;
  index?: number; // optional for staggered animation
}

const MotionCard: React.FC<MotionCardProps> = ({ image, text, index = 0 }) => {
  return (
    <motion.div
      className="relative h-60 rounded-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 border border-white/20"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      variants={fadeInUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Black dim layer */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Hover overlay with text */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/20 to-white/5 opacity-0 hover:opacity-100 backdrop-blur-sm z-10 flex items-center justify-center transition-opacity duration-500">
        <p className="text-white text-sm md:text-base font-medium text-center bg-black/60 px-4 py-3 rounded-lg shadow-md z-20">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export default MotionCard;
