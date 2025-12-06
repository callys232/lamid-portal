"use client";

import { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Head from "next/head";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeTab, setActiveTab] = useState<"consultants" | "jobs">(
    "consultants"
  );

  // ▶ Auto-play video only when in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // 💡 Update placeholder text depending on active tab
  const placeholder =
    activeTab === "consultants"
      ? "Search for consultants, experts, or advisors..."
      : "Search for available jobs or opportunities...";

  // ✅ Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hero Section - Consultants & Jobs",
    description:
      "Find world-class consultants, experts, advisors, and job opportunities. Build and grow your organization with ease.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://yourdomain.com/search?q={query}",
      "query-input": "required name=query",
    },
  };

  return (
    <>
      {/* ✅ Inject JSON-LD into <head> for SEO */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <header className="relative w-full min-h-screen flex flex-col items-center justify-start text-white overflow-hidden bg-black pt-20 md:pt-28">
        {/* 🎥 Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/hero-bg.mp4" // replace with your actual path
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* 🩶 Overlay (fade top to bottom for better text contrast) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />

        {/* 🌟 Foreground Content */}
        <div className="relative z-20 w-full md:w-2/3 text-center md:text-left px-4">
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="whitespace-pre-line text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug 
             max-w-2xl mx-auto font-display text-transparent bg-clip-text 
             bg-gradient-to-r from-red-600 to-white text-center"
          >
            <Typewriter
              words={["We build and grow\nworld-class organizations"]}
              loop={Infinity}
              typeSpeed={60}
              deleteSpeed={30}
              delaySpeed={1800}
              cursor
              cursorStyle="|"
            />
          </motion.h1>

          {/* 🔘 Tabs + Search grouped together */}
          <div className="mt-10 mx-auto max-w-xl w-full" role="search">
            {/* Tabs */}
            <div className="flex justify-center items-center bg-black/30 rounded-xl border border-gray-700 backdrop-blur-sm overflow-hidden">
              <button
                aria-label="Search consultants"
                onClick={() => setActiveTab("consultants")}
                className={`flex-1 py-3 text-base font-semibold transition-all ${
                  activeTab === "consultants"
                    ? "bg-[#c12129] text-white"
                    : "text-[#c12129] hover:text-red-400"
                }`}
              >
                CONSULTANTS
              </button>

              <button
                aria-label="Search jobs"
                onClick={() => setActiveTab("jobs")}
                className={`flex-1 py-3 text-base font-semibold transition-all ${
                  activeTab === "jobs"
                    ? "bg-[#c12129] text-white"
                    : "text-[#c12129] hover:text-red-400"
                }`}
              >
                JOBS
              </button>
            </div>

            {/* Search bar */}
            <div className="mt-4 border border-gray-400 rounded-xl overflow-hidden flex transition-all duration-300">
              <input
                type="text"
                placeholder={placeholder}
                className="w-full px-5 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* ⚡ Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="mt-8 flex justify-center gap-6 flex-wrap"
          >
            <button className="text-white text-lg hover:text-[#c12129] transition">
              Find Jobs
            </button>
            <button className="text-white text-lg hover:text-[#c12129] transition">
              Post Jobs
            </button>
            <button className="bg-[#c12129] px-6 py-3 rounded-xl text-white text-lg hover:bg-[#a11e25] transition">
              Seek a Consultant
            </button>
          </motion.div>
        </div>
      </header>
    </>
  );
}
