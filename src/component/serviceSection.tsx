"use client";
import { FC } from "react";
import PrimaryServicesSection from "./serviceSection/primaryServiceSection";
import CoreServicesSection from "./serviceSection/coreServiceGrid";

const ServicesSection: FC = () => {
  return (
    <section
      id="services"
      className="bg-black text-white min-h-screen px-4 md:px-8 lg:px-16 py-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Component 1: Lamid Service Categories */}
        <PrimaryServicesSection />

        {/* Component 2: Our Services (13 cardboxes) */}
        <CoreServicesSection />
      </div>
    </section>
  );
};

export default ServicesSection;
