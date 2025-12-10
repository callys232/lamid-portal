"use client";

import React, { useState } from "react";
import Head from "next/head";
import InfoCard from "./infoCard";
import FormsWrapper from "./formsWrapper";
import { User } from "@/types/user";

const HcdTrainer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formType, setFormType] = useState<
    "training" | "recruitment" | "talent" | null
  >(null);
  const [user] = useState<User | null>(null);

  const openForm = (type: "training" | "recruitment" | "talent") => {
    setFormType(type);
    setShowPopup(true);
  };

  return (
    <>
      <Head>
        <title>HCD Training & Recruitment</title>
        <meta
          name="description"
          content="Discover our transformative training programs and recruitment solutions."
        />
      </Head>

      <div className="relative min-h-screen bg-black text-white">
        {/* CONTENT */}
        <div className="relative z-20 container mx-auto px-8 py-20 space-y-24">
          <InfoCard
            title="Training"
            description="Hands-on, immersive learning designed to transform people and performance."
            secondaryText="Programs adapt to your organization’s needs with measurable outcomes."
            imageSrc="/hcd-training-meeting.png"
            imageAlt="Training Session"
            tags={[
              "BUSINESS",
              "SOFT SKILLS",
              "CLIENTS",
              "MANAGEMENT",
              "LEADERSHIP",
              "ENTREPRENEURSHIP",
            ]}
            buttonText="RESERVE A SLOT NOW"
            buttonAction={() => openForm("training")}
          />

          <InfoCard
            title="Recruitment"
            description="We secure exceptional professionals through executive search and advanced talent systems."
            secondaryText="We pair and retain high-value talent for innovation and long-term growth."
            imageSrc="/hcd-recruitment-meeting.png"
            imageAlt="Recruitment"
            reverse
            buttonText="SIGN UP HERE"
            buttonAction={() => openForm("recruitment")}
          />
        </div>

        <FormsWrapper
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          formType={formType}
          user={user}
        />
      </div>
    </>
  );
};

export default HcdTrainer;
