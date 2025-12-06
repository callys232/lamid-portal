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
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="bg-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Divider */}
        <div className="w-full h-px bg-gray-700 mb-6"></div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <div className="border border-blue-600 rounded-md p-4 md:mr-6 max-w-[200px] transform hover:scale-105 transition">
            <Image
              src="/biz-icon.png"
              alt="Business Innovation Zone Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col justify-center mt-2 w-full">
            <h2
              data-aos="fade-up"
              className="text-3xl font-bold text-center md:text-left animate-rainbowPulse drop-shadow-md text-blue-500"
            >
              Business Innovation Zone
            </h2>
            <div className="border border-blue-600 rounded-md p-4 mt-2 transform hover:scale-105 transition">
              <p className="text-white text-center md:text-left">
                The one-stop place that rapidly nurtures and expands startups to
                deliver exceptional value.
              </p>
            </div>
          </div>
        </div>

        {/* BEST Section */}
        <div className="mt-10">
          <div className="border border-orange-600 rounded-md p-4 flex flex-col md:flex-row justify-between items-center mb-4 hover:bg-orange-800 transition">
            <h3 className="text-xl text-center md:text-left mb-3 md:mb-0 transform hover:scale-105 transition">
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

            <div className="w-16 h-16 sm:w-20 md:w-24 transform hover:scale-110 transition">
              <Image
                src="/best-icon.png"
                alt="BEST Icon"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-sm md:text-base text-center md:text-left mt-4 px-2 md:px-4">
            Our portfolio of simple, easy-to-use entrepreneurial management
            know-how delivers sustainable growth by executing a lean plan on
            digitalized, client-centered systems and processes.
          </p>
        </div>

        {/* Pipeline Component */}
        <InnovazionZone />

        {/* Buttons & Form Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-8 px-4">
          <button className="border border-white px-6 py-3 rounded-md bg-transparent hover:bg-red-700 text-white font-medium text-lg transform hover:scale-105 transition">
            Build Right! Avoid costly trial and error.
          </button>

          <button
            onClick={() => setShowPopup(true)}
            className="border border-white px-6 py-3 rounded-md bg-transparent hover:bg-red-700 text-white font-medium text-lg transform hover:scale-105 transition"
          >
            Get started - FREE Diagnostics, Limited time only!
          </button>
        </div>

        {/* Popup Modal */}
        {showPopup && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-lg z-[999999] w-full"
            onClick={() => setShowPopup(false)}
          >
            <div
              className="bg-black rounded-lg shadow-2xl border border-blue-600 w-[80%] sm:w-[70%] md:w-[50%] max-h-[60vh] overflow-y-auto relative transition-all duration-500"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 text-blue-500 hover:text-white transition"
              >
                ✖
              </button>
              <GetDiagnostics closeModal={() => setShowPopup(false)} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BusinessInnovationZone;
