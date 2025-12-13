"use client";

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const BizHeader: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <Head>
        <title>Lamid Consulting - Business Innovation Zone</title>
        <meta
          name="description"
          content="The one-stop place that rapidly nurtures and expands startups"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 z-10" />

        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/LD3.jpg"
            alt="Dark business background"
            fill
            priority
            className="object-cover opacity-50 transition-opacity duration-700"
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 container mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
          {/* Left - Logo */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-start">
            <div className="relative w-64 h-64 transform transition duration-700 ease-in-out hover:scale-105">
              <Image
                src="/BIZ_LOGOS.png"
                alt="BIZ Logo"
                fill
                className={`object-contain transition-opacity duration-1000 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>

          {/* Right - Text */}
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start space-y-6">
            {/* Title */}
            <div className="bg-black/60 border border-blue-800 rounded-md p-4 w-full max-w-lg text-center hover:bg-blue-900 transition duration-300">
              <div
                className={`transition-opacity duration-1000 delay-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-blue-500 border-r-2 border-white whitespace-nowrap overflow-hidden max-w-full">
                  <Typewriter
                    words={["Business Innovation Zone"]}
                    loop={Infinity}
                    typeSpeed={60}
                    deleteSpeed={30}
                    delaySpeed={1800}
                    cursor
                    cursorStyle="|"
                  />
                </h1>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-center md:text-left max-w-2xl hover:text-gray-300 transition duration-300">
              The one-stop place that rapidly nurtures and expands startups to
              deliver exceptional value and become world-class organizations
            </p>

            <p className="text-base md:text-lg text-center md:text-left max-w-2xl hover:text-gray-400 transition duration-300">
              The BIZ suite of services empowers organizations to attract a
              continuous stream of clients and excel as best practices, thriving
              on a culture of innovation, management, and sustainability.
            </p>

            {/* Optional Read More Section */}
            {/*
            <div className="text-base md:text-lg text-center md:text-left max-w-2xl transition duration-300">
              {showMore ? (
                <p className="transition-all duration-500 ease-in-out hover:text-blue-600">
                  We avert crisis and rescue distressed organizations by
                  diagnosing health challenges and restoring operational
                  vitality through sustainable transformation programs that
                  align people, processes, and performance.
                </p>
              ) : (
                <p className="transition-all duration-500 ease-in-out hover:text-blue-600">
                  We avert crisis and rescue distressed organizations by
                  diagnosing health challenges and
                </p>
              )}
              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-1 text-sm text-red-500 hover:text-red-800 transition"
              >
                {showMore ? "Read Less" : "Read More"}
              </button>
            </div>
            */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BizHeader;
