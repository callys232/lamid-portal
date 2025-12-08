"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./../../utils/motionVaraints";

const skills = [
  { text: "STRATEGY", tip: "Planning long-term direction and execution" },
  { text: "SOFT SKILLS", tip: "Communication, teamwork, adaptability" },
  { text: "LEADERSHIP", tip: "Inspiring and guiding teams effectively" },
  { text: "MANAGEMENT", tip: "Supervising tasks, people, and outcomes" },
  {
    text: "ENTREPRENEURSHIP",
    tip: "Building ventures through innovation and risk",
  },
  { text: "MARKETING", tip: "Creating value and connecting with audiences" },
  { text: "SALES", tip: "Converting prospects into revenue" },
];

export default function SkillsTags() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-wrap justify-center gap-3 mb-8"
    >
      {skills.map((skill) => (
        <motion.div
          key={skill.text}
          variants={fadeInUp}
          className="relative group"
        >
          <div
            className="bg-orange-500 px-3 py-1 text-xs md:text-sm rounded cursor-pointer 
                          hover:shadow-lg hover:shadow-orange-400/40 hover:border hover:border-white/30 transition-all duration-500"
          >
            {skill.text}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-3 py-1 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black text-white">
            {skill.tip}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
