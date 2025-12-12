"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

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
      name: "BEST",
      href: "/bizPT",
      desc: "Guiding businesses toward sustainable growth and competitive advantage.",
      color: "from-blue-400 to-blue-600",
      iconColor: "text-blue-400 group-hover:text-blue-500",
      icon: BriefcaseIcon,
    },
    {
      name: "Operations",
      href: "/hcd",
      desc: "Optimizing workflows and processes for maximum efficiency.",
      color: "from-orange-400 to-orange-600",
      iconColor: "text-orange-400 group-hover:text-orange-500",
      icon: Cog6ToothIcon,
    },
    {
      name: "Sustainable Development",
      href: "/sustainable",
      desc: "Helping organizations evolve through innovation and change management.",
      color: "from-emerald-400 to-emerald-600",
      iconColor: "text-emerald-400 group-hover:text-emerald-500",
      icon: ArrowPathIcon,
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
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                whileHover={
                  !mobile
                    ? { scale: 1.04, backgroundColor: "rgba(255,255,255,0.06)" }
                    : {}
                }
                transition={{ duration: 0.2 }}
                className={`
                  rounded-xl p-4 cursor-pointer transition-all group relative
                  ${
                    mobile
                      ? "border border-[#222] hover:bg-[#111]"
                      : "hover:shadow-[0_0_20px_rgba(193,33,41,0.35)] bg-white/5 backdrop-blur-md border border-white/10"
                  }
                `}
              >
                <Link href={item.href} className="block">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-6 h-6 transition-colors ${item.iconColor}`}
                    />

                    <h3
                      className={`
                        text-lg font-extrabold
                        bg-gradient-to-r ${item.color} bg-clip-text text-transparent
                        transition-all
                      `}
                    >
                      {item.name}
                    </h3>
                  </div>

                  {/* Divider */}
                  {!mobile && (
                    <div className="mt-3 mb-3 h-px bg-white/10 group-hover:bg-white/20 transition-all" />
                  )}

                  {/* Description */}
                  {!mobile && (
                    <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                      {item.desc}
                    </p>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
