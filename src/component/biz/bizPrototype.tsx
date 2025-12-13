"use client";

import Head from "next/head";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/motionVaraints"; // adjust path

// Define the shape of each prototype card
interface Prototype {
  id: number;
  imagePath: string;
  altText: string;
  name: string;
}

interface BusinessPrototypesProps {
  text: string;
}

const BusinessPrototypes: React.FC<BusinessPrototypesProps> = ({ text }) => {
  // Sample data for the prototype cards
  const prototypes: Prototype[] = [
    {
      id: 1,
      imagePath: "/prototype1.png",
      altText: "Business concept visualization prototype",
      name: "Web Design",
    },
    {
      id: 2,
      imagePath: "/prototype2.png",
      altText: "Product development prototype",
      name: "Mobile Rental Services",
    },
    {
      id: 3,
      imagePath: "/prototype3.png",
      altText: "Project management prototype",
      name: "Event Planning",
    },
    {
      id: 4,
      imagePath: "/prototype4.png",
      altText: "Product design prototype",
      name: "Gadget Replacement",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>{text}</title>
        <meta name="description" content="Business prototype examples" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex justify-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="border border-white px-6 py-2">
            <h1 className="text-lg md:text-xl font-bold">{text}</h1>
          </div>
        </motion.div>

        {/* Prototype Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {prototypes.map((prototype, index) => (
            <motion.div
              key={prototype.id}
              className="border-l border-r border-t border-gray-800 pb-4"
              variants={fadeInUp}
              custom={index}
            >
              {/* Image container with fixed aspect ratio */}
              <div className="relative aspect-square w-full mb-4">
                <Image
                  src={prototype.imagePath}
                  alt={prototype.altText}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Name section */}
              <div className="px-4">
                <div className="flex items-center gap-7 w-full text-center">
                  <p className="text-sm">NAME:</p>
                  <div className="h-8 flex items-center justify-center">
                    {prototype.name}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-between mt-4">
                  <button className="bg-black border border-white text-white text-xs px-4 py-2 hover:bg-gray-900 transition-colors">
                    BUY NOW
                  </button>
                  <button className="bg-black border border-white text-white text-xs px-4 py-2 hover:bg-gray-900 transition-colors">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default BusinessPrototypes;
