"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import GetDiagnostics from "../forms/diagnostics/GetDiagnostic";
import AOS from "aos";
import "aos/dist/aos.css";

import InnovazionZone from "./innovationZone";

const BusinessInnovationZone = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Divider */}
        <div className="w-full h-px bg-gray-700 mb-12"></div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-16 gap-8">
          <div className="border border-blue-600 rounded-md p-4 max-w-[200px] hover:scale-105 transition-transform duration-500">
            <Image
              src="/biz-icon.png"
              alt="Business Innovation Zone Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col justify-center w-full">
            <h2
              data-aos="fade-up"
              className="text-4xl font-extrabold text-center md:text-left animate-rainbowPulse drop-shadow-md text-blue-400 tracking-wide"
            >
              Business Innovation Zone
            </h2>
            <div className="relative mt-6 rounded-md overflow-hidden">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradientMove opacity-30"></div>
              <div className="relative border border-blue-600 rounded-md p-6 hover:scale-105 transition-transform duration-500 backdrop-blur-sm">
                <p className="text-white text-center md:text-left leading-relaxed">
                  The one-stop place that rapidly nurtures and expands startups
                  to deliver exceptional value.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BEST Section */}
        <div className="mt-12 relative rounded-md overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 animate-gradientMove opacity-20"></div>
          <div className="relative border border-orange-600 rounded-md p-6 flex flex-col md:flex-row justify-between items-center mb-6 hover:bg-orange-900/40 transition-colors duration-500 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl text-center md:text-left mb-4 md:mb-0 hover:scale-105 transition-transform duration-500 leading-snug">
              <span className="animate-rainbowPulse drop-shadow-[0_0_2px_cyan]">
                B
              </span>
              usiness{" "}
              <span className="animate-rainbowPulse drop-shadow-[0_0_2px_cyan]">
                E
              </span>
              xpansion{" "}
              <span className="animate-rainbowPulse drop-shadow-[0_0_2px_cyan]">
                S
              </span>
              trategy &{" "}
              <span className="animate-rainbowPulse drop-shadow-[0_0_2px_cyan]">
                T
              </span>
              echnology –{" "}
              <span className="animate-glitchPulse [animation-delay:0.6s]">
                BEST
              </span>{" "}
              – our all-in-one growth toolbox
            </h3>

            <div className="w-20 md:w-24 hover:scale-110 transition-transform duration-500">
              <Image
                src="/best-icon.png"
                alt="BEST Icon"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-sm md:text-base text-center md:text-left mt-4 px-2 md:px-4 leading-relaxed">
            Our portfolio of simple, easy-to-use entrepreneurial management
            know-how delivers sustainable growth by executing a lean plan on
            digitalized, client-centered systems and processes.
          </p>
        </div>

        {/* Pipeline Component */}
        <div className="mt-20">
          <InnovazionZone />
        </div>

        {/* Buttons & Form Section */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mt-12 px-4">
          <button className="border border-white px-6 py-3 rounded-md bg-transparent hover:bg-red-700 hover:brightness-90 text-white font-semibold text-lg transition-all duration-500 shadow-md hover:shadow-lg">
            Build Right! Avoid costly trial and error.
          </button>

          <button
            onClick={() => setShowPopup(true)}
            className="border border-white px-6 py-3 rounded-md bg-transparent hover:bg-red-700 hover:brightness-90 text-white font-semibold text-lg transition-all duration-500 shadow-md hover:shadow-lg"
          >
            Get started - FREE Diagnostics, Limited time only!
          </button>
        </div>

        {/* Popup Modal */}
        {showPopup && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 backdrop-blur-lg z-[999999] w-full animate-fadeIn"
            onClick={() => setShowPopup(false)}
          >
            <div
              className="bg-black rounded-xl shadow-2xl border border-blue-600 w-[80%] sm:w-[70%] md:w-[50%] max-h-[70vh] overflow-y-auto relative transform scale-95 hover:scale-100 transition-transform duration-500"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 text-blue-500 hover:text-white transition-colors duration-300 text-xl"
              >
                ✖
              </button>
              <GetDiagnostics closeModal={() => setShowPopup(false)} />
            </div>
          </div>
        )}
      </div>

      {/* Gradient animation keyframes */}
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradientMove {
          background-size: 200% 200%;
          animation: gradientMove 8s ease infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default BusinessInnovationZone;
