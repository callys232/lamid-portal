"use client";

import React, { useState } from "react";
import Head from "next/head";
import PrototypeCard from "./prototypeCard";
import PrototypeModal from "./prototypeModal";
import { useCart } from "@/component/Cartcontext";

interface BusinessPrototypesProps {
  text: string;
}

const BusinessPrototypes: React.FC<BusinessPrototypesProps> = ({ text }) => {
  const { addToCart } = useCart();
  const [activePrototype, setActivePrototype] = useState<number | null>(null);

  const prototypes = [
    {
      id: 1,
      imagePath: "/prototype1.png",
      altText: "Business concept visualization prototype",
      name: "Web Design",
    },
    {
      id: 2,
      imagePath: "/prototype2.png",
      altText: "Product development prototype",
      name: "Mobile Rental Services",
    },
    {
      id: 3,
      imagePath: "/prototype3.png",
      altText: "Project management prototype",
      name: "Event Planning",
    },
    {
      id: 4,
      imagePath: "/prototype4.png",
      altText: "Product design prototype",
      name: "Gadget Replacement",
    },
  ];

  const selected = prototypes.find((p) => p.id === activePrototype);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Head>
        <title>{text}</title>
        <meta name="description" content="Business prototype examples" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-center mb-8">
          <div className="border border-white px-6 py-2">
            <h1 className="text-lg md:text-xl font-bold">{text}</h1>
          </div>
        </div>

        {/* Grid of Prototypes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {prototypes.map((prototype) => (
            <PrototypeCard
              key={prototype.id}
              {...prototype}
              onBuy={() => setActivePrototype(prototype.id)}
              onAddToCart={() => addToCart(prototype)}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      {selected && (
        <PrototypeModal
          isOpen={!!activePrototype}
          onClose={() => setActivePrototype(null)}
          name={selected.name}
          imagePath={selected.imagePath}
          altText={selected.altText}
        />
      )}
    </div>
  );
};

export default BusinessPrototypes;
