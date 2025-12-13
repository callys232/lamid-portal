"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInDown,
  fadeIn,
  staggerContainer,
} from "@/utils/motionVaraints"; // adjust path

const BizToolbox: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-md p-6 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Icon */}
          <motion.div
            className="w-32 h-32 relative flex-shrink-0"
            variants={fadeInDown}
          >
            <Image
              src="/best-icon.png"
              alt="BEST Logo"
              width={128}
              height={128}
              priority
              style={{ objectFit: "contain" }}
            />
          </motion.div>

          {/* Text Block */}
          <motion.div className="flex-1" variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-red-500">B</span>usiness
              <span className="text-yellow-500"> E</span>xpansion
              <span className="text-orange-500"> S</span>trategy
              <span> and </span>
              <span className="text-green-500">T</span>echnology
              <span className="ml-2 text-gray-400">- TheBiz Tool Box</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              We use expertise and technology to innovate and hand-hold the
              entrepreneur and business.
            </p>
            <p className="text-base text-gray-300 mt-4">
              BEST is part of our BIZ suite which constructs the bridge that
              connects your idea and dream to the global market...
            </p>
          </motion.div>
        </motion.div>

        {/* SUITE TOUR heading */}
        <motion.h2
          className="text-center text-xl md:text-2xl font-bold text-orange-400 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          SUITE TOUR
        </motion.h2>

        {/* Cards */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-stretch gap-4 mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {[
            {
              border: "border-green-500",
              items: [
                "Diagnostics and Health Check",
                "Client Raving",
                "Business Model Canvas",
                "Continuous Innovation",
                "Entrepreneurship & Training",
                "Strategy",
                "HR Services",
                "E-accounting",
              ],
            },
            {
              border: "border-orange-500",
              items: [
                "Credit Sourcing",
                "Digitalization",
                "Export",
                "Executive Attachment",
                "Brand Building",
                "Export Syndication",
              ],
            },
            {
              border: "border-blue-500",
              items: [
                "Digitalize for Competitiveness",
                "Finance Syndication",
                "E-client Relations",
                "Scaling",
                "E-commerce",
                "Scale and make the solution globally accessible",
              ],
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className={`relative group bg-transparent border-2 ${card.border} rounded-lg p-6 md:w-1/3 transition duration-300 overflow-hidden`}
              variants={fadeInUp}
            >
              <ul className="space-y-2 text-sm md:text-base relative z-10">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default BizToolbox;
