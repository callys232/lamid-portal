// components/ServicesSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ServiceCardProps {
  title: string;
  icon: string;
  coloredLetters: number[];
}

const ServiceCard: FC<ServiceCardProps> = ({ title, icon, coloredLetters }) => {
  const colorizedTitle = () => {
    const letters = title.split("");
    return letters.map((letter, index) =>
      coloredLetters.includes(index) ? (
        <span key={index} className="text-blue-500">
          {letter}
        </span>
      ) : (
        <span key={index}>{letter}</span>
      )
    );
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <Image
        src={icon}
        alt={title}
        width={80}
        height={80}
        className="w-28 h-24 object-contain"
      />
      <h3 className="text-xl font-serif font-bold">{colorizedTitle()}</h3>
    </div>
  );
};

interface ServiceButtonProps {
  title: string;
  icon: string;
  bgColor: string;
  href: string;
  description: string;
}

const ServiceButton: FC<ServiceButtonProps> = ({
  title,
  icon,
  bgColor,
  href,
  description,
}) => (
  <Link href={href} aria-label={`${title} - ${description}`}>
    <div
      className={`${bgColor} group rounded-md p-4 flex flex-col items-center justify-center h-28 w-full max-w-xs mx-auto relative cursor-pointer transition-transform hover:scale-105`}
    >
      <Image
        src={icon}
        alt={title}
        width={24}
        height={24}
        className="w-6 h-6 object-contain mb-2"
      />
      <p className="text-white text-sm md:text-base font-sans font-semibold text-center">
        {title}
      </p>
      <p className="text-gray-200 text-xs text-center mt-1 block md:hidden font-sans">
        {description}
      </p>
      <div
        role="tooltip"
        className="hidden md:block absolute bottom-full mb-2 w-56 bg-gray-900 text-white text-xs rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg font-sans"
      >
        {description}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  </Link>
);

interface TextOnlyButtonProps {
  title: string;
  icon: string;
  description: string;
  href?: string;
}

const TextOnlyButton: FC<TextOnlyButtonProps> = ({
  title,
  icon,
  description,
  href = "#",
}) => (
  <Link href={href} aria-label={`${title} - ${description}`}>
    <div className="flex flex-col items-center justify-center h-24 sm:h-28 md:h-32 w-full group relative">
      <Image
        src={icon}
        alt={title}
        width={24}
        height={24}
        className="w-5 h-5 sm:w-6 sm:h-6 object-contain mb-1 sm:mb-2"
      />
      <p className="text-white text-xs sm:text-sm md:text-base text-center font-sans font-semibold">
        {title}
      </p>
      <p className="text-gray-300 text-[11px] sm:text-xs text-center mt-1 block md:hidden px-2 font-sans">
        {description}
      </p>
      <div
        role="tooltip"
        className="hidden md:block absolute bottom-full mb-2 w-56 bg-gray-900 text-white text-xs rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg font-sans"
      >
        {description}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  </Link>
);

const ServicesSection: FC = () => {
  return (
    <div className="bg-black text-white min-h-screen px-4 md:px-8 lg:px-16 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="border border-white inline-block px-6 py-2 mb-8">
          <h2 className="text-xl font-serif">SERVICES</h2>
        </div>
        <div className="w-full h-px bg-gray-700 mb-6"></div>

        <div className="mb-12">
          <p className="mb-4 md:text-lg font-sans">
            We reveal uncommon opportunities from everyday ideas and grow you to
            dominate the competition. We are known for transforming
            organizations using customized Management Solutions, Innovation
            Consulting, Strategy, Process Improvement and Talent Development.
          </p>
        </div>

        {/* Main Service Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <ServiceCard
            title="Business Innovation Zone"
            icon="/biz-icon.png"
            coloredLetters={[0, 9, 20]}
          />
          <ServiceCard
            title="Human Capital Development"
            icon="/human-capital-icon.png"
            coloredLetters={[0, 6, 14]}
          />
          <ServiceCard
            title="Sustainable Development"
            icon="/sustainable-icon.png"
            coloredLetters={[0, 12]}
          />
          <ServiceCard
            title="Lamid Hybrid Consultancy"
            icon="/lamid-hybrid-icon.png"
            coloredLetters={[0, 6, 15]}
          />
        </div>

        {/* Sub-services */}
        <div className="w-full mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* Existing rows */}
            <div className="grid grid-cols-3 gap-4 mb-4 max-w-4xl mx-auto">
              <ServiceButton
                title="Process Transformation"
                icon="/rocket-icon.png"
                bgColor="bg-blue-600"
                href="/biz"
                description="Streamline and optimize processes to boost efficiency and outcomes."
              />
              <TextOnlyButton
                title="Innovation Consulting"
                icon="/rocket-icon.png"
                description="Unlock new ideas and frameworks to drive competitive advantage."
                href="/biz"
              />
              <ServiceButton
                title="Sustainable Development"
                icon="/rocket-icon.png"
                bgColor="bg-green-800"
                href="/sustainableDev"
                description="Design long-term strategies that balance growth with responsibility."
              />
            </div>
            <div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto">
              <ServiceButton
                title="Digital Transformation"
                icon="/chart-icon.png"
                bgColor="bg-blue-600"
                href="/biz"
                description="Adopt modern digital tools and platforms to scale operations."
              />
              <TextOnlyButton
                title="Strategy Development"
                icon="/rocket-icon.png"
                description="Create clear, measurable plans aligned with your business goals."
                href="/biz"
              />
              <ServiceButton
                title="Talent Sourcing"
                icon="/people-icon.png"
                bgColor="bg-amber-900"
                href="/hcd"
                description="Find and attract the right talent for critical roles."
              />
              <ServiceButton
                title="Management Solutions"
                icon="/rocket-icon.png"
                bgColor="bg-black"
                href="#"
                description="Implement tailored systems for governance, performance, and scaling."
              />
              <ServiceButton
                title="HR, Training & Support"
                icon="/rocket-icon.png"
                bgColor="bg-amber-900"
                href="/hcd"
                description="Develop teams with targeted training and ongoing HR support."
              />
            </div>

            {/* Lamid Hybrid Consultancy row */}
            <div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto mt-6">
              <ServiceButton
                title="Hybrid Advisory"
                icon="/advisory-icon.png"
                bgColor="bg-purple-800"
                href="/lamidHybrid"
                description="Blending traditional and modern consulting for tailored strategies."
              />
              <ServiceButton
                title="AI-Driven Insights"
                icon="/ai-icon.png"
                bgColor="bg-purple-800"
                href="/lamidHybrid"
                description="Harnessing data and AI to uncover actionable business intelligence."
              />
              <TextOnlyButton
                title="Cross-Sector Solutions"
                icon="/solutions-icon.png"
                description="Integrating expertise across industries to solve complex challenges."
                href="/lamidHybrid"
              />
              <ServiceButton
                title="Change Management"
                icon="/change-icon.png"
                bgColor="bg-purple-800"
                href="/lamidHybrid"
                description="Guiding organizations through transformation with minimal disruption."
              />
              <ServiceButton
                title="Innovation Labs"
                icon="/labs-icon.png"
                bgColor="bg-purple-800"
                href="/lamidHybrid"
                description="Creating experimental spaces to prototype and test new ideas."
              />
            </div>
          </div>

          {/* Tablet Layout (sm screens) */}
          <div className="hidden sm:block md:hidden">
            <div className="grid grid-cols-3 gap-3 mb-3 mx-auto">
              <ServiceButton
                title="Process Transformation"
                icon="/rocket-icon.png"
                bgColor="bg-blue-700"
                href="/biz"
                description="Streamline and optimize processes to boost efficiency and outcomes."
              />
              <TextOnlyButton
                title="Innovation Consulting"
                icon="/rocket-icon.png"
                description="Unlock new ideas and frameworks to drive competitive advantage."
                href="/biz"
              />
              <ServiceButton
                title="Sustainable Development"
                icon="/rocket-icon.png"
                bgColor="bg-green-800"
                href="/sustainableDev"
                description="Design long-term strategies that balance growth with responsibility."
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3 mx-auto">
              <ServiceButton
                title="Digital Transformation"
                icon="/chart-icon.png"
                bgColor="bg-blue-600"
                href="/biz"
                description="Adopt modern digital tools and platforms to scale operations."
              />
              <TextOnlyButton
                title="Strategy Development"
                icon="/rocket-icon.png"
                description="Create clear, measurable plans aligned with your business goals."
                href="/biz"
              />
              <ServiceButton
                title="Talent Sourcing"
                icon="/people-icon.png"
                bgColor="bg-amber-900"
                href="/hcd"
                description="Find and attract the right talent for critical roles."
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mx-auto">
              <ServiceButton
                title="Management Solutions"
                icon="/rocket-icon.png"
                bgColor="bg-black"
                href="#"
                description="Implement tailored systems for governance, performance, and scaling."
              />
              <ServiceButton
                title="HR, Training & Support"
                icon="/rocket-icon.png"
                bgColor="bg-amber-900"
                href="/hcd"
                description="Develop teams with targeted training and ongoing HR support."
              />
            </div>

            {/* Lamid Hybrid Consultancy sub-services (tablet) */}
            <div className="grid grid-cols-3 gap-3 mb-3 mx-auto mt-4">
              <ServiceButton
                title="Hybrid Advisory"
                icon="/advisory-icon.png"
                bgColor="bg-purple-800"
                href="/lamidHybrid"
                description="Blending traditional and modern consulting for tailored strategies."
              />
              <ServiceButton
                title="AI-Driven Insights"
                icon="/ai-icon.png"
                bgColor="bg-purple-800"
                href="/lamidHybrid"
                description="Harnessing data and AI to uncover actionable business intelligence."
              />
              <TextOnlyButton
                title="Cross-Sector Solutions"
                icon="/solutions-icon.png"
                description="Integrating expertise across industries to solve complex challenges."
                href="/lamidHybrid"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mx-auto">
              <ServiceButton
                title="Change Management"
                icon="/change-icon.png"
                bgColor="bg-purple-800"
                href="/lamidHybrid"
                description="Guiding organizations through transformation with minimal disruption."
              />
              <ServiceButton
                title="Innovation Labs"
                icon="/labs-icon.png"
                bgColor="bg-purple-800"
                href="/lamidHybrid"
                description="Creating experimental spaces to prototype and test new ideas."
              />
            </div>
          </div>

          {/* Mobile Layout (xs screens) */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-2 gap-2 mx-auto">
              <ServiceButton
                title="Process Transformation"
                icon="/rocket-icon.png"
                bgColor="bg-blue-700"
                href="/biz"
                description="Streamline and optimize processes to boost efficiency and outcomes."
              />
              <TextOnlyButton
                title="Innovation Consulting"
                icon="/rocket-icon.png"
                description="Unlock new ideas and frameworks to drive competitive advantage."
                href="/biz"
              />
              <ServiceButton
                title="Sustainable Development"
                icon="/rocket-icon.png"
                bgColor="bg-green-800"
                href="/sustainableDev"
                description="Design long-term strategies that balance growth with responsibility."
              />
              <ServiceButton
                title="Digital Transformation"
                icon="/chart-icon.png"
                bgColor="bg-blue-600"
                href="/biz"
                description="Adopt modern digital tools and platforms to scale operations."
              />
              <TextOnlyButton
                title="Strategy Development"
                icon="/rocket-icon.png"
                description="Create clear, measurable plans aligned with your business goals."
                href="/biz"
              />
              <ServiceButton
                title="Talent Sourcing"
                icon="/people-icon.png"
                bgColor="bg-amber-900"
                href="/hcd"
                description="Find and attract the right talent for critical roles."
              />
              <ServiceButton
                title="Management Solutions"
                icon="/rocket-icon.png"
                bgColor="bg-black"
                href="#"
                description="Implement tailored systems for governance, performance, and scaling."
              />
              <ServiceButton
                title="HR, Training & Support"
                icon="/rocket-icon.png"
                bgColor="bg-amber-900"
                href="/hcd"
                description="Develop teams with targeted training and ongoing HR support."
              />

              {/* Lamid Hybrid Consultancy sub-services (mobile) */}
              <ServiceButton
                title="Hybrid Advisory"
                icon="/advisory-icon.png"
                bgColor="bg-purple-800"
                href="/lamidHybrid"
                description="Blending traditional and modern consulting for tailored strategies."
              />
              <ServiceButton
                title="AI-Driven Insights"
                icon="/ai-icon.png"
                bgColor="bg-purple-800"
                href="/lamidHybrid"
                description="Harnessing data and AI to uncover actionable business intelligence."
              />
              <TextOnlyButton
                title="Cross-Sector Solutions"
                icon="/solutions-icon.png"
                description="Integrating expertise across industries to solve complex challenges."
                href="/lamidHybrid"
              />
              <ServiceButton
                title="Change Management"
                icon="/change-icon.png"
                bgColor="bg-purple-800"
                href="/lamidHybrid"
                description="Guiding organizations through transformation with minimal disruption."
              />
              <ServiceButton
                title="Innovation Labs"
                icon="/labs-icon.png"
                bgColor="bg-purple-800"
                href="/lamidHybrid"
                description="Creating experimental spaces to prototype and test new ideas."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
