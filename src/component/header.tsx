"use client";

import { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

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

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-white overflow-hidden bg-black">
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

      {/* 🩶 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />

      {/* 🌟 Foreground Content */}
      <div className="relative z-20 w-full md:w-2/3 pt-28 md:pt-0 text-center md:text-left px-4">
        {/* Animated Heading */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="whitespace-pre-line text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug max-w-2xl mx-auto md:mx-0 font-display text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-white"
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
        <div className="mt-10 mx-auto max-w-xl w-full">
          {/* Tabs */}
          <div className="flex justify-center items-center bg-black/30 rounded-xl border border-gray-700 backdrop-blur-sm overflow-hidden">
            <button
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
              onClick={() => setActiveTab("jobs")}
              className={`flex-1 py-3 text-base font-semibold transition-all ${
                activeTab === "jobs"
                  ? "bg-[#c12129] text-white"
                  : "text-[#c12129] hover:text-red-400"
              }`}
            >
              View Jobs
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
        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <button className="text-white text-lg hover:text-[#c12129] transition">
            Find Jobs
          </button>
          <button className="text-white text-lg hover:text-[#c12129] transition">
            Post Jobs
          </button>
          <button className="bg-[#c12129] px-6 py-3 rounded-xl text-white text-lg hover:bg-[#a11e25] transition">
            Seek a consultant
          </button>
        </div>
      </div>
    </section>
  );
}
