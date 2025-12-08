"use client";
import { FC } from "react";
import CoreServiceCard from "./coreServiceCard";

const CoreServicesSection: FC = () => (
  <div className="mt-12 mb-8">
    <div className="border border-white inline-block px-6 py-2 mb-6">
      <h2 className="text-xl font-serif">Our Services</h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[200px] max-w-6xl mx-auto">
      <div className="md:col-span-2 md:row-span-2">
        <CoreServiceCard
          title="Process Transformation"
          icon="/rocket-icon.png"
          category="business"
          href="/biz"
          description="Streamline and optimize processes to boost efficiency and outcomes."
          hoverImage="/images/process-bg.jpg"
        />
      </div>

      <CoreServiceCard
        title="Innovation Consulting"
        icon="/rocket-icon.png"
        category="consulting"
        href="/lamidCore/innovation"
        description="Unlock new ideas and frameworks to drive competitive advantage."
        hoverImage="/images/innovation-bg.jpg"
      />

      <CoreServiceCard
        title="Sustainable Development"
        icon="/rocket-icon.png"
        category="sustainable"
        href="/sustainableDev"
        description="Design long-term strategies that balance growth with responsibility."
        hoverImage="/images/sustainable-bg.jpg"
      />

      <div className="md:col-span-2">
        <CoreServiceCard
          title="Digital Transformation"
          icon="/chart-icon.png"
          category="business"
          href="/biz"
          description="Adopt modern digital tools and platforms to scale operations."
          hoverImage="/images/digital-bg.jpg"
        />
      </div>

      <CoreServiceCard
        title="Strategy Development"
        icon="/rocket-icon.png"
        category="consulting"
        href="/lamidCore/strategy"
        description="Create clear, measurable plans aligned with your business goals."
        hoverImage="/images/strategy-bg.jpg"
      />

      <CoreServiceCard
        title="Talent Sourcing"
        icon="/people-icon.png"
        category="hcd"
        href="/hcd"
        description="Find and attract the right talent for critical roles."
        hoverImage="/images/talent-bg.jpg"
      />

      <div className="md:row-span-2">
        <CoreServiceCard
          title="Management Solutions"
          icon="/rocket-icon.png"
          category="consulting"
          href="/management"
          description="Implement tailored systems for governance, performance, and scaling."
          hoverImage="/images/management-bg.jpg"
        />
      </div>

      <CoreServiceCard
        title="HR, Training & Support"
        icon="/rocket-icon.png"
        category="hcd"
        href="/hcd"
        description="Develop teams with targeted training and ongoing HR support."
        hoverImage="/images/hr-bg.jpg"
      />

      <CoreServiceCard
        title="Hybrid Advisory"
        icon="/advisory-icon.png"
        category="consulting"
        href="/lamidHybrid"
        description="Blending traditional and modern consulting for tailored strategies."
        hoverImage="/images/hybrid-bg.jpg"
      />

      <CoreServiceCard
        title="AI-Driven Insights"
        icon="/ai-icon.png"
        category="consulting"
        href="/lamidHybrid"
        description="Harnessing data and AI to uncover actionable business intelligence."
        hoverImage="/images/ai-bg.jpg"
      />

      <div className="md:col-span-2">
        <CoreServiceCard
          title="Cross-Sector Solutions"
          icon="/solutions-icon.png"
          category="consulting"
          href="/lamidCore/solutions"
          description="Integrating expertise across industries to solve complex challenges."
          hoverImage="/images/solutions-bg.jpg"
        />
      </div>

      <CoreServiceCard
        title="Change Management"
        icon="/change-icon.png"
        category="consulting"
        href="/lamidHybrid"
        description="Guiding organizations through transformation with minimal disruption."
        hoverImage="/images/change-bg.jpg"
      />

      <CoreServiceCard
        title="Innovation Labs"
        icon="/labs-icon.png"
        category="consulting"
        href="/lamidHybrid"
        description="Creating experimental spaces to prototype and test new ideas."
        hoverImage="/images/labs-bg.jpg"
      />
    </div>
  </div>
);

export default CoreServicesSection;
