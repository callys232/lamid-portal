"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/motionVaraints";
import { useState } from "react";

const impactData = [
  {
    title: "Job & Wealth Creation",
    image: "/img1.png",
    description:
      "We re-positioned cooperatives to re-set globalization; starting from few groups to communities and states. By experience, we see job and wealth creation with cooperatives as a scalable model for inclusive growth.",
    cta: "Learn how this unique opportunity transformed over 5000 cooperatives.",
    link: "/impact/job-creation",
    border: "border-mint-400",
    headingColor: "text-mint-400",
    glow: "hover:shadow-[0_0_60px_rgba(0,255,180,0.9)]",
  },
  {
    title: "Healthcare Partnerships",
    image: "/img2.png",
    description:
      "We improved maternal care, child survival, and healthcare delivery while achieving organizational and financial sustainability across community clusters.",
    cta: "Read more.",
    link: "/impact/healthcare",
    border: "border-blue-400",
    headingColor: "text-blue-400",
    glow: "hover:shadow-[0_0_60px_rgba(0,150,255,0.9)]",
  },
  {
    title: "Climate Action",
    image: "/img3.png",
    description:
      "We created women and youth-led entrepreneurship clusters powered by clean energy to promote equalization, conflict recovery, and environmental remediation.",
    cta: "Read more.",
    link: "/impact/climate-action",
    border: "border-green-400",
    headingColor: "text-green-400",
    glow: "hover:shadow-[0_0_60px_rgba(0,255,100,0.9)]",
  },
  {
    title: "Digital Inclusion",
    image: "/img4.png",
    description:
      "We addressed youth unemployment by supporting startups, empowering digital skills, and enabling high-growth jobs that retain talents locally.",
    cta: "READ MORE →",
    link: "/impact/digital-inclusion",
    border: "border-yellow-400",
    headingColor: "text-yellow-400",
    glow: "hover:shadow-[0_0_60px_rgba(255,220,0,0.9)]",
  },
];

function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="text-white font-medium leading-relaxed text-sm md:text-base">
      <p className={expanded ? "" : "line-clamp-3"}>{text}</p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-yellow-400 hover:underline mt-2 font-semibold"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}

export default function ImpactGrid() {
  return (
    <section className="relative bg-black text-white py-20 px-6">
      {/* Section background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/impact-bg.png"
          alt="Impact background"
          fill
          className="object-cover opacity-25"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-16 text-mint-400">
          Impact
        </h1>

        {/* Grid of flexible cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {impactData.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={`relative rounded-xl overflow-hidden border-4 ${item.border} 
                          backdrop-blur-md bg-white/10 
                          transition-all duration-500 ease-in-out 
                          ${item.glow} hover:bg-white/20 p-8 flex flex-col`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-40 transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Overlay Content */}
              <div className="relative z-10 flex flex-col h-full justify-start space-y-4">
                <h2
                  className={`${item.headingColor} text-xl md:text-2xl font-bold`}
                >
                  {item.title}
                </h2>
                <ExpandableText text={item.description} />
                {item.cta && item.link && (
                  <a
                    href={item.link}
                    className="text-yellow-400 font-semibold hover:underline text-sm md:text-base mt-2"
                  >
                    {item.cta}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
