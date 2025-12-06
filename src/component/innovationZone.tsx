"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface PipelineStage {
  title: string;
  icon: string;
  color: string;
  href: string;
}

const stages: PipelineStage[] = [
  {
    title: "Viable Opportunities",
    icon: "/icons/opportunities.png",
    color: "bg-purple-700 hover:bg-purple-800 border-purple-500",
    href: "/innovazion/opportunities",
  },
  {
    title: "State-of-the-art Structures & Systems",
    icon: "/icons/structures.png",
    color: "bg-gray-900 hover:bg-gray-800 border-gray-600",
    href: "/innovazion/structures",
  },
  {
    title: "Mentoring Strategy",
    icon: "/icons/mentoring.png",
    color: "bg-teal-600 hover:bg-teal-700 border-teal-400",
    href: "/innovazion/mentoring",
  },
  {
    title: "Minimum Viable Prototype & Model",
    icon: "/icons/prototype.png",
    color: "bg-red-600 hover:bg-red-700 border-red-400",
    href: "/innovazion/prototype",
  },
  {
    title: "Top-of-market Talent Services",
    icon: "/icons/talent.png",
    color: "bg-orange-500 hover:bg-orange-600 border-orange-400",
    href: "/innovazion/talent",
  },
  {
    title: "Joint Ventures",
    icon: "/icons/joint-ventures.png",
    color: "bg-green-600 hover:bg-green-700 border-green-400",
    href: "/innovazion/joint-ventures",
  },
  {
    title: "State-of-the-art Structures & Systems",
    icon: "/icons/structures.png",
    color: "bg-gray-900 hover:bg-gray-800 border-gray-600",
    href: "/innovazion/structures-2",
  },
  {
    title: "Global Access",
    icon: "/icons/global-access.png",
    color: "bg-white hover:bg-gray-100 border-gray-300 text-black",
    href: "/innovazion/global-access",
  },
];

const InnovazionZone: FC = () => {
  return (
    <section className="bg-black py-10 px-4 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {stages.map((stage, index) => (
          <Link key={index} href={stage.href} className="group">
            <div
              className={`rounded-lg p-4 border text-center transition-transform transform hover:scale-105 shadow-md ${stage.color}`}
            >
              <div className="w-12 h-12 mx-auto mb-3">
                <Image
                  src={stage.icon}
                  alt={`${stage.title} icon`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <p
                className={`text-sm font-semibold leading-snug ${
                  stage.color.includes("text-black")
                    ? "text-black"
                    : "text-white"
                }`}
              >
                {stage.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-gray-300">
        Over <span className="text-yellow-400 font-bold">3000</span> start-ups
        created and accelerated. Be the next raving success!
      </p>
    </section>
  );
};

export default InnovazionZone;
