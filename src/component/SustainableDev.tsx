"use client";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import Impact from "./Impact";
import {
  fadeInUp,
  fadeInDown,
  fadeIn,
  staggerContainer,
} from "@/utils/motionVaraints";

const SustainableDevelopmentSection = () => {
  const [showImpact, setShowImpact] = useState(false);

  // ✅ Precompute particle positions once
  const [particles] = useState(() =>
    Array.from({ length: 12 }).map((_, i) => {
      const randomLeft = Math.random() * 100;
      const randomTop = Math.random() * 100;
      const delay = `${i * 0.3}s`;
      const duration = `${4 + Math.random() * 4}s`;
      return { left: randomLeft, top: randomTop, delay, duration };
    })
  );

  return (
    <>
      <Head>
        <title>Sustainable Development | Lamid Consulting</title>
        <meta
          name="description"
          content="Lamid Consulting promotes sustainable development through social inclusion, healthcare partnerships, and gender equality initiatives."
        />
      </Head>

      <div className="relative w-full bg-black text-white overflow-hidden">
        {/* Floating Particles */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {particles.map((p, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 1 }}
              className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 animate-float hover:opacity-60 transition duration-500"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        {/* Background */}
        <div className="absolute inset-0 opacity-70">
          <Image
            src="/tree-background.jpg"
            alt="Tree background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 flex flex-col px-4"
        >
          {/* Header */}
          <motion.div
            variants={fadeInDown}
            className="flex items-center justify-between w-full pt-20 pb-8"
          >
            <div className="flex items-center">
              {/* Left globe */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-1/4 max-w-[140px]"
              >
                <Image
                  src="/sustainable-icon.png"
                  alt="Hands holding globe"
                  width={140}
                  height={140}
                  className="rounded-md shadow-lg hover:shadow-emerald-400/40"
                />
              </motion.div>

              {/* Center text */}
              <div className="text-center mx-4">
                <motion.h1
                  variants={fadeInUp}
                  className="text-3xl md:text-5xl font-bold mb-4 text-center"
                >
                  <span className="bg-gradient-to-r from-white via-emerald-400 to-gray-300 bg-clip-text text-transparent animate-gradient-x">
                    Sustainable Development
                  </span>
                </motion.h1>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block border border-emerald-400 rounded-xl px-6 py-2 bg-black/60 backdrop-blur-sm hover:bg-emerald-500 hover:text-black transition duration-300"
                >
                  <p className="text-xs md:text-sm">
                    Growing groups to world-class communities with sustainable
                    development
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right globe */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-1/3 max-w-[340px]"
            >
              <Image
                src="/sustainable-icon.png"
                alt="Multiple hands holding globe"
                width={340}
                height={340}
                className="rounded-md shadow-lg hover:shadow-emerald-400/40"
              />
            </motion.div>
          </motion.div>

          {/* Bottom message + CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16 max-w-xl mx-auto"
          >
            <p className="text-base md:text-lg mb-4 hover:text-emerald-400 transition duration-300">
              We achieved social inclusion, managed healthcare partnerships,
              gender equality...
            </p>

            <button
              onClick={() => setShowImpact(!showImpact)}
              className={`inline-flex items-center gap-2 px-6 py-2 text-xs font-medium rounded-md border transition-all duration-300
    ${
      showImpact
        ? "border-emerald-400 text-emerald-400"
        : "border-gray-500 text-gray-300"
    }
    hover:bg-emerald-400 hover:text-black hover:border-emerald-500
    active:bg-emerald-500 active:text-black active:border-emerald-600 active:shadow-inner`}
            >
              SEE HOW
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transform transition-transform duration-300 ${
                  showImpact ? "rotate-180 text-emerald-400" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>

            {/* Dropdown Impact Section */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                showImpact
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="overflow-hidden mt-6"
            >
              <Impact />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default SustainableDevelopmentSection;
