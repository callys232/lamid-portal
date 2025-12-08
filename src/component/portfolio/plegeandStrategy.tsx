"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const PledgeStrategySection = () => {
  const [pledgeExpanded, setPledgeExpanded] = useState(false);
  const [economyExpanded, setEconomyExpanded] = useState(false);

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Diagonal background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-full md:w-3/4 lg:w-2/3 h-full bg-red-900/30 transform -skew-x-12 origin-bottom-right"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left column - Pledge */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/50 backdrop-blur-sm rounded-lg p-4 sm:p-5"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-blue-700 rounded-md px-2 sm:px-3 py-1 sm:py-1.5">
                <h2 className="text-xs sm:text-sm font-medium text-white uppercase tracking-wider">
                  Our Pledge and Strategy
                </h2>
              </div>
              <button
                onClick={() => setPledgeExpanded(!pledgeExpanded)}
                className="bg-white rounded-md p-1 hover:bg-gray-200 transition-colors min-w-[32px]"
                aria-label={pledgeExpanded ? "Collapse" : "Expand"}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:w-5 sm:h-5"
                >
                  <path
                    d={pledgeExpanded ? "M19 15l-7-7-7 7" : "M5 9l7 7 7-7"}
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                pledgeExpanded
                  ? "max-h-[1000px]"
                  : "max-h-32 sm:max-h-48 md:max-h-64"
              }`}
            >
              <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                We go the extra mile always, that is why our clients come back
                for more service and create referrals, we customize our
                solutions and deepen relationships with incentives in order to
                retain and grow our core of loyal clients.
              </p>
              <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed">
                We implement robust business and global strategies to keep our
                costs to the minimum, in order to deliver world-class
                organizations value, products, and services to our clients. We
                help clients connect with themselves and their stakeholders, and
                work to fix in their world, as we use opportunities created by
                knowledge in the 21st century
              </p>
            </div>
          </motion.div>

          {/* Right column - Economy */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-black/50 backdrop-blur-sm rounded-lg p-4 sm:p-5"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-green-700 rounded-md px-2 sm:px-3 py-1 sm:py-1.5">
                <h2 className="text-xs sm:text-sm font-medium text-white uppercase tracking-wider truncate max-w-[200px] sm:max-w-none">
                  Building and Enduring Great Economy
                </h2>
              </div>
              <button
                onClick={() => setEconomyExpanded(!economyExpanded)}
                className="bg-white rounded-md p-1 hover:bg-gray-200 transition-colors min-w-[32px]"
                aria-label={economyExpanded ? "Collapse" : "Expand"}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:w-5 sm:h-5"
                >
                  <path
                    d={economyExpanded ? "M19 15l-7-7-7 7" : "M5 9l7 7 7-7"}
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                economyExpanded
                  ? "max-h-[1000px]"
                  : "max-h-32 sm:max-h-48 md:max-h-64"
              }`}
            >
              <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                A great company can be measured by its performance (generating
                enough cash flow through highly profitable operations to invest
                in future-focused and create value for its customers through
                innovation), its impact on the industry, the reputation it
                creates for itself with its stakeholders, and its business model
                that gives it the ability to remain healthy for decades. The
                greatness of a company has a lot to do with its operation; their
                functions are run by people who are experienced, educated, well
                prepared, business savvy through common sense and profitability
                centered. Such companies take advantage of opportunities
                available in the environment and taking advantage of such.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PledgeStrategySection;
