"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Define the shape of each service item
interface Service {
  name: string;
  href: string;
  color: string;
  logo: string;
}

const services: Service[] = [
  {
    name: "Business Innovation Zone",
    href: "/biz",
    color: "bg-red-600",
    logo: "/innovation-logo.png",
  },
  {
    name: "Human Capital Development",
    href: "/hcd",
    color: "bg-orange-600",
    logo: "/human-capital-logo.png",
  },
  {
    name: "Sustainable Development",
    href: "/services/sustainable-development",
    color: "bg-green-600",
    logo: "/sustainable-logo.png",
  },
  {
    name: "LAMID Hybrid Consultancy",
    href: "/services/lamid-hybrid-consultancy",
    color: "bg-purple-600",
    logo: "/hybrid-logo.png",
  },
];

const ServicesShapes: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.map((service) => (
          <Link key={service.name} href={service.href}>
            <div
              className={`${service.color} rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer 
              transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <Image
                src={service.logo}
                alt={`${service.name} logo`}
                width={80}
                height={80}
                className="mb-4"
              />
              <h3 className="text-lg font-semibold text-center">
                {service.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServicesShapes;
