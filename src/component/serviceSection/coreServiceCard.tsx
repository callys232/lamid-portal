"use client";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

interface CoreServiceCardProps {
  title: string;
  icon: string;
  category: "business" | "hcd" | "sustainable" | "consulting";
  href: string;
  description: string;
  hoverImage: string; // path to background image
}

const categoryColors: Record<string, string> = {
  business: "bg-blue-600 border-blue-600",
  hcd: "bg-orange-600 border-orange-600",
  sustainable: "bg-emerald-400 border-emerald-400",
  consulting: "bg-purple-700 border-purple-700",
};

const CoreServiceCard: FC<CoreServiceCardProps> = ({
  title,
  icon,
  category,
  href,
  description,
  hoverImage,
}) => {
  const [hovered, setHovered] = useState(false);
  const baseColor = categoryColors[category];

  return (
    <Link href={href} aria-label={`${title} - ${description}`}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative rounded-md p-6 flex flex-col items-center justify-center h-full w-full cursor-pointer 
                    transition-all duration-300 ease-in-out overflow-hidden border ${
                      baseColor.split(" ")[1]
                    }`}
      >
        {/* Background image on hover */}
        {hovered && (
          <Image
            src={hoverImage}
            alt={`${title} background`}
            fill
            className="object-cover absolute inset-0 z-0"
          />
        )}

        {hovered && <div className="absolute inset-0 bg-black/50 z-10"></div>}

        <div className="relative z-20 text-center">
          <Image
            src={icon}
            alt={`${title} icon`}
            width={40}
            height={40}
            className="w-10 h-10 object-contain mb-3 transition-transform group-hover:scale-110"
          />
          <p
            className={`text-sm md:text-base font-sans font-semibold tracking-wide ${
              hovered ? "text-yellow-300" : "text-white"
            }`}
          >
            {title}
          </p>
          <p
            className={`mt-2 text-xs font-sans ${
              hovered ? "text-yellow-200" : "text-gray-200"
            }`}
          >
            {description}
          </p>
        </div>

        {/* Tooltip */}
        <div
          role="tooltip"
          className={`hidden md:block absolute bottom-full mb-2 w-56 text-white text-xs rounded-md px-3 py-2 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out 
              pointer-events-none shadow-xl text-center border ${
                baseColor.split(" ")[1]
              } z-30`}
        >
          {description}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 top-full 
                w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent ${
                  baseColor.split(" ")[1]
                }`}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default CoreServiceCard;
