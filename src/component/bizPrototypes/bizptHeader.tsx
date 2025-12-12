"use client";

import Head from "next/head";
import Image from "next/image";
import useProgressiveTypewriter from "@/hooks/progressiveTexe";

const Header: React.FC = () => {
  const texts = useProgressiveTypewriter(
    ["ADVICE", "INNOVATION", "FUNDING"],
    [
      "bg-gradient-to-r from-blue-400 to-white",
      "bg-gradient-to-r from-red-500 to-white",
      "bg-gradient-to-r from-green-400 to-white",
    ],
    150,
    2000
  );

  return (
    <div className="relative bg-black">
      <Head>
        <title>Header | Bizp</title>
        <meta
          name="description"
          content="Advice, Innovation, Funding — driving transformation."
        />
      </Head>

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/LD2.jpg"
          alt="Background audience"
          fill
          priority
          className="object-cover opacity-60"
        />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 py-10 text-white">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full mx-auto gap-6 md:gap-10">
          {/* Light bulb image */}
          <div className="relative w-full max-w-xs sm:max-w-sm md:w-2/5 mb-6 md:mb-0">
            <div className="p-4 md:p-6 flex items-center justify-center">
              <Image
                src="/bizp-lightbulb.png"
                alt="Light bulb"
                width={200}
                height={200}
                priority
                className="drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] w-auto h-auto max-w-full"
              />
            </div>
          </div>

          {/* Progressive Typewriter text */}
          <div className="text-center md:text-left w-full md:w-3/5">
            <h1 className="font-bold tracking-tight flex flex-col gap-2">
              {texts.map((item, i) => (
                <span
                  key={i}
                  className={`text-5xl md:text-6xl lg:text-7xl ${item.gradient} bg-clip-text text-transparent animate-pulse`}
                >
                  {item.text}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Supporting paragraphs */}
        <div className="w-full mt-6 space-y-4">
          <p className="text-[#C12129] text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center mx-auto max-w-4xl px-4">
            You do not have to re-invent the wheel, see our proven successful
            transformations.
          </p>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl text-center mx-auto max-w-3xl px-4 italic">
            Empowering businesses with clarity, creativity, and capital to
            thrive in a changing world.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Header;
