"use client";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface LamidServiceCardProps {
  title: string;
  icon: string;
  coloredLetters: number[];
  href: string;
  description: string;
  category: "business" | "hcd" | "sustainable" | "consulting";
}

const categoryStyles: Record<
  string,
  { text: string; border: string; hover: string; bg: string }
> = {
  business: {
    text: "text-blue-500",
    border: "border-blue-600",
    hover: "hover:border-blue-600",
    bg: "bg-blue-600",
  },
  hcd: {
    text: "text-orange-500",
    border: "border-orange-600",
    hover: "hover:border-orange-600",
    bg: "bg-orange-600",
  },
  sustainable: {
    text: "text-emerald-500",
    border: "border-emerald-500",
    hover: "hover:border-emerald-500",
    bg: "bg-emerald-500",
  },
  consulting: {
    text: "text-purple-500",
    border: "border-purple-600",
    hover: "hover:border-purple-600",
    bg: "bg-purple-600",
  },
};

const LamidServiceCard: FC<LamidServiceCardProps> = ({
  title,
  icon,
  coloredLetters,
  href,
  description,
  category,
}) => {
  const { text, border, hover, bg } = categoryStyles[category]; // ✅ include bg

  const colorizedTitle = () =>
    title.split("").map((letter, index) =>
      coloredLetters.includes(index) ? (
        <span key={index} className={text}>
          {letter}
        </span>
      ) : (
        <span key={index}>{letter}</span>
      )
    );

  return (
    <Link href={href} aria-label={`${title} - ${description}`}>
      <div
        className={`group flex flex-col items-center mb-8 p-6 rounded-lg bg-black border border-gray-700 cursor-pointer 
                    transition-all duration-300 hover:scale-105 hover:bg-gray-900 ${hover} shadow-md relative`}
      >
        <Image
          src={icon}
          alt={`${title} icon`}
          width={100}
          height={100}
          className="w-32 h-28 object-contain mb-4 transition-transform group-hover:scale-110"
        />
        <h3 className="text-xl font-serif font-bold text-center">
          {colorizedTitle()}
        </h3>
        <div
          role="tooltip"
          className={`hidden md:block absolute bottom-full mb-2 w-56 ${bg} text-white text-xs rounded-md px-3 py-2 
              opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg text-center ${border}`}
        >
          {description}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 top-full 
                w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent ${border}`}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default LamidServiceCard;
