"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import GetDiagnostics from "../forms/diagnostics/GetDiagnostic";
import AOS from "aos";
import "aos/dist/aos.css";

const BusinessInnovationZone = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <main className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start mb-10">
          {/* Logo */}
          <div
            className="border border-blue-500 rounded-lg p-4 md:mr-6 max-w-[200px] 
                       transform hover:scale-105 transition duration-300 shadow-lg"
          >
            <Image
              src="/biz-icon.png"
              alt="Business Innovation Zone logo representing startup growth"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </div>

          {/* Text */}
          <article className="flex flex-col justify-center mt-4 w-full">
            <h1
              data-aos="fade-up"
              className="text-4xl font-extrabold text-center md:text-left 
                         bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 
                         drop-shadow-lg"
            >
              Business Innovation Zone
            </h1>
            <p
              className="border border-blue-500 rounded-lg p-4 mt-4 text-lg text-center md:text-left 
                         hover:scale-105 transition duration-300 shadow-md"
            >
              The one-stop hub that nurtures startups and accelerates growth
              with cutting-edge strategies and technology.
            </p>
          </article>
        </section>

        {/* BEST Section */}
        <section className="mt-12">
          <header
            className="border border-amber-500 rounded-lg p-6 flex flex-col md:flex-row 
                       justify-between items-center mb-6 bg-gradient-to-r from-amber-700/30 to-transparent 
                       hover:bg-amber-800/40 transition duration-300 shadow-md"
          >
            <h2 className="text-2xl font-semibold text-center md:text-left mb-4 md:mb-0">
              <span className="text-amber-400">BEST</span> – Business Expansion
              Strategy & Technology
              <br />
              <span className="text-sm text-gray-300">
                Your all-in-one growth toolbox for sustainable success
              </span>
            </h2>
            <Image
              src="/best-icon.png"
              alt="BEST strategy icon symbolizing growth"
              width={90}
              height={90}
              className="object-contain transform hover:scale-110 transition duration-300"
            />
          </header>
          <p className="text-base text-center md:text-left px-2 md:px-4 text-gray-300">
            Our portfolio of entrepreneurial management know-how delivers
            sustainable growth by executing lean, digitalized, client-centered
            systems and processes.
          </p>
        </section>

        {/* Image & CTA Section */}
        <section className="mt-12">
          <Image
            src="/BIT-picture.png"
            alt="Entrepreneurs collaborating in the Business Innovation Zone"
            width={1920}
            height={1080}
            priority
            className="w-full h-auto object-cover rounded-lg shadow-xl"
          />

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-6 px-4">
            <button
              aria-label="Learn how to build right"
              className="border border-white px-6 py-3 rounded-md bg-transparent 
                         hover:bg-red-700 text-white font-semibold text-lg 
                         transform hover:scale-105 transition duration-300 shadow-md"
            >
              Build Right! Avoid costly trial and error.
            </button>

            <button
              onClick={() => setShowPopup(true)}
              aria-label="Get free diagnostics"
              className="border border-white px-6 py-3 rounded-md bg-transparent 
                         hover:bg-red-700 text-white font-semibold text-lg 
                         transform hover:scale-105 transition duration-300 shadow-md"
            >
              Get started – FREE Diagnostics (Limited time!)
            </button>
          </div>

          {/* Popup Modal */}
          {showPopup && (
            <div
              className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 
                         backdrop-blur-lg z-[9999]"
              role="dialog"
              aria-modal="true"
              onClick={() => setShowPopup(false)}
            >
              <div
                className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700 
                           w-[90%] sm:w-[70%] md:w-[50%] max-h-[70vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowPopup(false)}
                  aria-label="Close diagnostics form"
                  className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
                >
                  ✖
                </button>
                <GetDiagnostics closeModal={() => setShowPopup(false)} />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default BusinessInnovationZone;
