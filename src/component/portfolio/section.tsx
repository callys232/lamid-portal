"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Section = () => {
  return (
    <section className="bg-black text-white py-12 px-4 md:px-8 lg:px-16">
      {/* Three column services section */}
      <div className="container mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Management */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start bg-gray-900/40 rounded-lg p-6"
          >
            <Image
              src="/pt-target-icon.png"
              alt="Target icon"
              width={64}
              height={64}
              className="w-16 h-16 mb-4"
            />
            <p className="text-sm leading-relaxed text-center md:text-left">
              <span className="font-bold">
                LAMIDs Management comprises a core team of highly experienced
                and effective professionals.
              </span>{" "}
              They design, coordinate, manage and lead human capital development
              and business advisory services to client organizations. Their
              strong business acumen sets that clients cannot acquire elsewhere,
              making them a definite rare of LAMIDs services.
            </p>
          </motion.div>

          {/* Column 2 - Vision */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center md:items-start bg-gray-900/40 rounded-lg p-6"
          >
            <Image
              src="/pt-calendar-icon.png"
              alt="Calendar icon"
              width={64}
              height={64}
              className="w-16 h-16 mb-4"
            />
            <p className="text-sm leading-relaxed text-center md:text-left">
              <span className="font-bold">
                Vision 2025: To nurture 4,000 more of Africas best talents to
                deliver excellence, grow and in-creating profitability and
                providing sustainable businesses by 2025. With client-focused
                and customized organizational growth and development models and
                support, because we commit to a shared outcomes
              </span>{" "}
              Creating a growth of 25% annually.
            </p>
          </motion.div>

          {/* Column 3 - Technology */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center md:items-start bg-gray-900/40 rounded-lg p-6"
          >
            <Image
              src="/pt-dollar-icon.png"
              alt="Dollar up arrow icon"
              width={64}
              height={64}
              className="w-16 h-16 mb-4"
            />
            <p className="text-sm leading-relaxed text-center md:text-left">
              <span className="font-bold">
                As business is increasingly transacted with technology on the
                rise, introducing capabilities and flexibility,
              </span>{" "}
              technically infused presence and in the face of stiff competition
              in all markets, making it compelling for timely introduction of
              products, the use of old web technology is obsolete, our website
              is developed to conform with the latest technology.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom content section */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left box - What is Bizphare-Bizclub */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-gray-600 rounded-lg overflow-hidden relative h-64"
          >
            <Image
              src="/pt-business-meeting.png"
              alt="Business meeting"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-4">
              <div className="bg-red-800 text-white inline-block px-3 py-1 rounded mb-4">
                <h3 className="text-sm font-medium">
                  What is Bizphare-Bizclub?
                </h3>
              </div>
              {/* Content would go here */}
            </div>
          </motion.div>

          {/* Right box - Empty content area */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border border-gray-600 rounded-lg h-64 flex items-center justify-center text-gray-400"
          >
            {/* This appears to be an empty content area in the original image */}
            <span>Content coming soon...</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Section;
