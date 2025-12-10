"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BusinessTraining: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#0b0b0b] text-white">
      <div className="container mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Business diagram */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
            className="w-full md:w-1/3"
          >
            <div className="relative w-64 h-64 mx-auto">
              <Image
                src="/BIZ_LOGOS.png"
                alt="Business Diagram with BIZ, prototypes, and bbgr sections"
                width={250}
                height={250}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Middle - Training description and options */}
          <div className="w-full md:w-1/3 space-y-4">
            <div className="mb-6">
              <p className="text-white text-sm mb-4 italic">
                Use cutting-edge tools to secure top-tier talent for permanent,
                temporary, and contract roles
              </p>

              <div className="space-y-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#c21219] px-3 py-2 text-sm text-white rounded shadow-md"
                >
                  Functional management training
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-700 px-3 py-2 text-sm text-white rounded shadow-md"
                >
                  Leadership awareness training
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-500 px-3 py-2 text-sm text-white rounded shadow-md"
                >
                  Job Search workshops
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right side - People with rising arrow illustration */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="w-full md:w-1/3"
          >
            <div className="relative w-64 h-64 mx-auto">
              <Image
                src="/hcd-team-illustration.png"
                alt="Business growth illustration with people and rising arrow"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BusinessTraining;
