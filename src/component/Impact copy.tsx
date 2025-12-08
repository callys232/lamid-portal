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
  },
  {
    title: "Healthcare Partnerships",
    image: "/img2.png",
    description:
      "We improved maternal care, child survival, and healthcare delivery while achieving organizational and financial sustainability across community clusters.",
    cta: null,
    link: null,
  },
  {
    title: "Climate Action",
    image: "/img3.png",
    description:
      "We created women and youth-led entrepreneurship clusters powered by clean energy to promote equalization, conflict recovery, and environmental remediation.",
    cta: "Read more.",
    link: "/impact/climate-action",
  },
  {
    title: "Digital Inclusion",
    image: "/img4.png",
    description:
      "We addressed youth unemployment by supporting startups, empowering digital skills, and enabling high-growth jobs that retain talents locally.",
    cta: "READ MORE →",
    link: "/impact/digital-inclusion",
  },
];

function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const preview = text.split(" ").slice(0, 20).join(" ") + "...";

  return (
    <p className="text-white leading-relaxed text-sm">
      {expanded ? text : preview}{" "}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-yellow-400 hover:underline ml-2 font-medium"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </p>
  );
}

export default function ImpactSection() {
  return (
    <section className="bg-black text-white py-16 px-4 md:px-8">
      {/* Full-width header */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-mint-400">
        Impact
      </h1>

      {/* Full-width cards */}
      <div className="flex flex-col gap-8 w-full">
        {impactData.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row items-stretch w-full 
                       rounded-xl border border-gray-700 
                       bg-gradient-to-br from-gray-900 via-black to-gray-800 
                       hover:border-mint-400 hover:bg-gray-800/80 
                       transition-all duration-500 ease-in-out"
          >
            {/* Left: Image */}
            <div className="relative w-full md:w-1/2 h-36 md:h-40 rounded-l-xl overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Right: Text */}
            <div className="flex-1 flex flex-col justify-center p-5 md:p-6 space-y-3">
              <h2 className="text-mint-400 text-lg md:text-xl font-semibold">
                {item.title}
              </h2>

              <ExpandableText text={item.description} />

              {item.cta && item.link && (
                <a
                  href={item.link}
                  className="text-yellow-400 font-semibold hover:underline text-sm md:text-base"
                >
                  {item.cta}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
