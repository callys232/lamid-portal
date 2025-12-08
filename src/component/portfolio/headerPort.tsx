"use client";
import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <section className="w-full bg-black text-white py-16 pt-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-stretch gap-8 space-y-6 md:space-y-0">
          {/* Left side - Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3 bg-gradient-to-br from-red-900 to-red-700 rounded-3xl p-8 flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-3xl font-bold uppercase tracking-wider">
              OUR STRENGTH
            </h2>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-2/3 flex items-center p-6 bg-black/40 rounded-2xl"
          >
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-100">
              For over three decades, through in-depth research, we have
              successfully proffered solutions to a wide array of clients in the
              private sector especially SMEs, as well as governments, NGOs and
              international development partners. Broadly, our results include
              increased profits, innovation, job creation, youth development,
              environmental enhancement, and knowledge building.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Header;
