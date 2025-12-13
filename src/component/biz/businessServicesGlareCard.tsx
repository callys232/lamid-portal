"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/motionVaraints"; // adjust path

// Define the shape of each service item
interface Service {
  image: string;
  text: string;
}

const services: Service[] = [
  {
    image: "/biz-clientcenter.png",
    text: "Design & execute a lean client-centred plan.",
  },
  { image: "/biz-achieve.png", text: "Achieve greater prospects conversion." },
  {
    image: "/biz-top-notch.png",
    text: "Build a top-notch team to deliver real-time value.",
  },
  {
    image: "/biz-digitalsystem.png",
    text: "Digitalize systems structure & processes.",
  },
  {
    image: "/biz-dominate.png",
    text: "Become globally accessible & Dominate the market.",
  },
  {
    image: "/biz-builds.png",
    text: "Build capacity & trust with ventured capitalist.",
  },
  {
    image: "/biz-rapid-growth.png",
    text: "Deliver rapid and sustainable growth.",
  },
  { image: "/biz-running-figure.png", text: "Avert crisis & Distress." },
  { image: "/biz-funnel.png", text: "Focus on continuous innovation." },
];

const BusinessServicesGlareGrid: React.FC = () => {
  return (
    <section className="bg-black py-12 px-4">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {services.map((service, index) => (
          <motion.div
            key={service.text}
            className="relative h-60 rounded-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 border border-white/20"
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            variants={fadeInUp}
            custom={index}
          >
            {/* Black dim layer */}
            <div className="absolute inset-0 bg-black/30 z-0" />

            {/* Hover overlay with text */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/20 to-white/5 opacity-0 hover:opacity-100 backdrop-blur-sm z-10 flex items-center justify-center transition-opacity duration-500">
              <p className="text-white text-sm md:text-base font-medium text-center bg-black/60 px-4 py-3 rounded-lg shadow-md z-20">
                {service.text}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BusinessServicesGlareGrid;
