"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";

const EventCard = ({ event, index, selectedEventId, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 300);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <button
      onClick={() => onSelect(event.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-col items-center rounded-lg p-4 shadow-md transition-all duration-500 ease-out transform
        ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}
        ${
          selectedEventId === event.id || isHovered
            ? "border border-orange-400/50"
            : "border border-gray-700"
        }
        hover:scale-[1.02] hover:shadow-lg`}
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden mb-3">
        <Image
          src={event.image}
          alt={event.name}
          fill
          sizes="(max-width: 600px) 100vw, 40vw"
          className="object-cover"
        />
      </div>
      <p className="text-center text-xs md:text-sm text-gray-200 hover:text-orange-400 transition-colors duration-300">
        {event.name}
      </p>
    </button>
  );
};

const Events = ({
  categories = ["Startups", "Growth Firms", "Co-operatives", "Social Sector"],
  events = [
    { id: 1, name: "About To Disappear Jobs", image: "/EfficiencyIcon.png" },
    { id: 2, name: "Human Development", image: "/EfficiencyIcon.png" },
    { id: 3, name: "The Niger Delta", image: "/EfficiencyIcon.png" },
    { id: 4, name: "Transforming Communities", image: "/EfficiencyIcon.png" },
  ],
  showSignUp = true,
  showMore = true,
  onSignUp = () => console.log("Sign Up clicked"),
  onMore = () => console.log("More clicked"),
}) => {
  const [selectedEventId, setSelectedEventId] = useState(null);

  return (
    <>
      <Head>
        <title>Events | Lamid Consulting</title>
        <meta
          name="description"
          content="Explore upcoming events, workshops, and conferences that drive innovation, leadership, and sustainable development across communities."
        />
        <link rel="canonical" href="https://lamidconsulting.com/events" />
      </Head>

      <section className="w-full bg-black text-white py-10">
        {/* Category Navigation */}
        <div className="container mx-auto px-4 mb-8">
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm lg:text-base">
            {categories.map((category, index) => (
              <a
                key={index}
                href="#"
                className="text-orange-500 hover:text-orange-400 transition-colors duration-300"
              >
                {category}
              </a>
            ))}
          </nav>
        </div>

        {/* Events Section */}
        <div className="container mx-auto px-4">
          <div className="flex justify-start mb-8">
            <div className="border border-orange-900 rounded-lg inline-block px-6 py-2 hover:bg-orange-700 transition-colors duration-500">
              <h2 className="text-white text-sm md:text-base hover:text-orange-400 transition-colors duration-300">
                EVENTS
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                selectedEventId={selectedEventId}
                onSelect={setSelectedEventId}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            {showSignUp && (
              <button
                onClick={onSignUp}
                className="px-6 py-2 rounded-md border border-orange-500 text-orange-400 
                           hover:bg-orange-500 hover:text-black 
                           hover:scale-[0.97] hover:shadow-sm hover:brightness-95 
                           transition-all duration-500 ease-in-out"
              >
                Sign Up
              </button>
            )}
            {showMore && (
              <button
                onClick={onMore}
                className="px-6 py-2 rounded-md border border-orange-500 text-orange-400 
                           hover:bg-orange-500 hover:text-black 
                           hover:scale-[0.97] hover:shadow-sm hover:brightness-95 
                           transition-all duration-500 ease-in-out"
              >
                More
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
