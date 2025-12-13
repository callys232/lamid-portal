"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ServicesDropdownProps {
  mobile?: boolean;
  isOpen?: boolean;
}

export default function ServicesDropdown({
  mobile = false,
  isOpen = false,
}: ServicesDropdownProps) {
  const items = [
    {
      name: "Business Development",
      href: "/biz",
      desc: "Helping organizations expand their reach and impact.",
      color: "from-blue-400 to-blue-600",
      icon: (
        <svg
          className="w-6 h-6 text-blue-400 group-hover:text-blue-500 transition-colors"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Human Capital",
      href: "/hcd",
      desc: "Building high-performing teams and leadership pipelines.",
      color: "from-orange-400 to-orange-600",
      icon: (
        <svg
          className="w-6 h-6 text-orange-400 group-hover:text-orange-500 transition-colors"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4 0-8 2-8 5v2h16v-2c0-3-4-5-8-5z"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Sustainable Development",
      href: "/sustainable",
      desc: "Modernizing systems, strategy, and culture for the digital age.",
      color: "from-emerald-400 to-emerald-600",
      icon: (
        <svg
          className="w-6 h-6 text-emerald-400 group-hover:text-emerald-500 transition-colors"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M4 4v6h6M20 20v-6h-6M5 19l14-14" strokeLinecap="round" />
        </svg>
      ),
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
              ? "flex flex-col space-y-3 px-3 py-2 bg-black text-white"
              : `
                absolute left-0 top-full mt-4 w-[700px] rounded-2xl 
                shadow-[0_0_30px_rgba(193,33,41,0.25)]
                grid grid-cols-3 gap-6 p-6 
                border border-[#2a2a2a] 
                backdrop-blur-xl 
                bg-gradient-to-b from-[#1a1a1a] to-[#0b0b0b]
                text-white z-50
              `
          }`}
        >
          {items.map((item) => (
            <motion.div
              key={item.name}
              whileHover={
                !mobile
                  ? { scale: 1.04, backgroundColor: "rgba(255,255,255,0.06)" }
                  : {}
              }
              transition={{ duration: 0.2 }}
              className={`
                rounded-xl p-4 cursor-pointer transition-all group
                ${
                  mobile
                    ? "border border-[#222] hover:bg-[#111]"
                    : "hover:shadow-[0_0_20px_rgba(193,33,41,0.35)] bg-white/5 backdrop-blur-md border border-white/10"
                }
              `}
            >
              <Link href={item.href} className="block">
                <div className="flex items-center gap-3">
                  {item.icon}

                  <h3
                    className={`
                      text-lg font-extrabold
                      bg-gradient-to-r ${item.color} bg-clip-text text-transparent
                      group-hover:opacity-90 transition-all
                    `}
                  >
                    {item.name}
                  </h3>
                </div>

                {!mobile && (
                  <div className="mt-3 mb-3 h-px bg-white/10 group-hover:bg-white/20 transition-all" />
                )}

                {!mobile && (
                  <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
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
