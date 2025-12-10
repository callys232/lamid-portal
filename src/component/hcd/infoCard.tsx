"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface InfoCardProps {
  title: string;
  description: string;
  secondaryText?: string;
  imageSrc: string;
  imageAlt: string;
  tags?: string[];
  buttonText?: string;
  buttonAction?: () => void;
  reverse?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  secondaryText,
  imageSrc,
  imageAlt,
  tags = [],
  buttonText,
  buttonAction,
  reverse = false,
}) => {
  const hoverGlow =
    "transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/30";

  return (
    <motion.section
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } gap-10 p-10 rounded-2xl 
        bg-gradient-to-br from-neutral-900 to-black border border-white/10 ${hoverGlow}`}
    >
      <div className="w-full md:w-1/3">
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="overflow-hidden rounded-xl shadow-lg shadow-black/40"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={600}
            height={450}
            className="object-cover w-full h-auto"
          />
        </motion.div>
      </div>

      <div className="w-full md:w-2/3 flex flex-col justify-center space-y-5">
        <h2 className="text-4xl font-extrabold text-orange-400 drop-shadow-sm">
          {title}
        </h2>
        <p className="text-gray-200 leading-relaxed">{description}</p>
        {secondaryText && (
          <p className="text-gray-400 text-sm leading-relaxed">
            {secondaryText}
          </p>
        )}
        {buttonText && buttonAction && (
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
            onClick={buttonAction}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 
              text-white px-7 py-3 rounded-full text-sm font-bold shadow-lg shadow-orange-500/30"
          >
            {buttonText}
          </motion.button>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {tags.map((tag, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-1 rounded-full text-xs font-semibold 
                  bg-white/10 text-white tracking-wide shadow-sm"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default InfoCard;
