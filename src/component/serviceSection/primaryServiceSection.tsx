"use client";
import { FC } from "react";
import LamidServiceCard from "./lamidServiceCard";

const PrimaryServicesSection: FC = () => (
  <div className="mb-12">
    <div className="border border-white inline-block px-6 py-2 mb-6">
      <h2 className="text-xl font-serif">SERVICES</h2>
    </div>
    <p className="mb-8 md:text-lg font-sans text-gray-300 leading-relaxed">
      We reveal uncommon opportunities from everyday ideas and grow you to
      dominate the competition. We are known for transforming organizations
      using customized Management Solutions, Innovation Consulting, Strategy,
      Process Improvement and Talent Development.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <LamidServiceCard
        title="Business Innovation Zone"
        icon="/biz-icon.png"
        coloredLetters={[0, 9, 20]}
        href="/biz"
        description="Rapidly nurture and expand startups to deliver exceptional value."
        category="business" // Blue
      />
      <LamidServiceCard
        title="Human Capital Development"
        icon="/human-capital-icon.png"
        coloredLetters={[0, 6, 14]}
        href="/hcd"
        description="Develop talent and leadership capacity for sustainable growth."
        category="hcd" // Orange
      />
      <LamidServiceCard
        title="Sustainable Development"
        icon="/sustainable-icon.png"
        coloredLetters={[0, 12]}
        href="/sustainableDev"
        description="Balance growth with responsibility through long-term strategies."
        category="sustainable" // Emerald
      />
      <LamidServiceCard
        title="Lamid Hybrid Consultancy"
        icon="/lamid-hybrid-icon.png"
        coloredLetters={[0, 6, 15]}
        href="/lamidHybrid"
        description="Blend traditional and modern consulting for tailored strategies."
        category="consulting" // Purple
      />
    </div>
  </div>
);

export default PrimaryServicesSection;
