"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ConsultingDropdownProps {
  mobile?: boolean;
  isOpen?: boolean;
}

export default function ConsultingDropdown({
  mobile = false,
  isOpen = false,
}: ConsultingDropdownProps) {
  const items = [
    {
      name: "Strategy Consulting",
      href: "/consulting/strategy",
      desc: "Guiding businesses through competitive strategy and growth planning.",
    },
    {
      name: "Operations Consulting",
      href: "/consulting/operations",
      desc: "Streamlining workflows and boosting efficiency across the organization.",
    },
    {
      name: "Transformation Consulting",
      href: "/consulting/transformation",
      desc: "Leading digital and cultural transformation for lasting impact.",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`${
            mobile
              ? "space-y-3 px-3 py-2 bg-black text-white"
              : "absolute left-0 top-full mt-4 w-[700px] rounded-2xl shadow-[0_0_30px_rgba(193,33,41,0.25)] grid grid-cols-3 gap-6 p-6 border border-[#2a2a2a] backdrop-blur-xl bg-[#0b0b0b] text-white z-50"
          }`}
        >
          {items.map((item) => (
            <motion.div
              key={item.name}
              whileHover={
                !mobile
                  ? {
                      scale: 1.03,
                      backgroundColor: "rgba(193,33,41,0.08)",
                    }
                  : {}
              }
              className={`rounded-xl p-4 cursor-pointer transition-all ${
                mobile
                  ? "border border-[#222] hover:bg-[#111]"
                  : "hover:shadow-[0_0_15px_rgba(193,33,41,0.3)]"
              } group`}
            >
              <Link href={item.href} className="block">
                <h3 className="text-lg font-semibold text-white group-hover:text-[#c12129] transition-colors">
                  {item.name}
                </h3>
                {!mobile && (
                  <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">
                    {item.desc}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
