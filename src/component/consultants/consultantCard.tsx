"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import type { Consultant } from "@/types/client";

interface ConsultantCardProps {
  consultant: Consultant;
}

export default function ConsultantCard({ consultant }: ConsultantCardProps) {
  const { name, image, industry, delivery, rate, rating, experience, role } =
    consultant;

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i + 1 <= Math.round(rating)
            ? "text-red-500 fill-red-500"
            : "text-gray-600"
        }`}
      />
    ));

  return (
    <div className="bg-[#140000] border border-[#2a0d0d] rounded-lg shadow-lg hover:shadow-red-700/30 transition-all duration-300 hover:-translate-y-1 p-4 flex flex-col justify-between">
      {/* Avatar / Image */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-16 h-16 rounded-full bg-[#2a0d0d] flex items-center justify-center overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-full"
            />
          ) : (
            <div className="text-red-500 text-2xl font-bold">👤</div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-white mt-3">{name}</h3>
        <p className="text-xs text-gray-400 -mt-1 mb-1">{role}</p>

        <div
          className="flex justify-center mb-2"
          aria-label={`Rating: ${rating} out of 5`}
        >
          {renderStars(rating)}
        </div>
      </div>

      {/* Info */}
      <div className="text-center mb-3">
        <p className="text-gray-300 text-sm">{industry}</p>
        <p className="text-gray-300 text-sm">{delivery}</p>
        {experience && (
          <p className="text-gray-300 text-sm">Experience: {experience} yrs</p>
        )}
      </div>

      {/* Rate */}
      <div className="text-center mb-4">
        <p className="text-red-500 font-semibold text-sm">${rate}/hr</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3 mt-auto">
        <button
          type="button"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md transition-all"
        >
          View Team
        </button>
        <button
          type="button"
          className="px-4 py-2 border border-red-600 text-red-400 hover:bg-red-800 hover:text-white text-xs font-medium rounded-md transition-all"
        >
          Use Team
        </button>
      </div>
    </div>
  );
}
