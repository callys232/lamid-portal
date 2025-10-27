"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  {
    name: "SERVICES",
    href: "#",
    dropdown: [
      {
        title: "Consulting",
        desc: "Business strategy & operations",
        href: "/services/consulting",
      },
      {
        title: "Finance",
        desc: "Financial advisory & audits",
        href: "/services/finance",
      },
      {
        title: "Tech",
        desc: "Digital transformation & IT",
        href: "/services/tech",
      },
      {
        title: "HR",
        desc: "Talent management & HR solutions",
        href: "/services/hr",
      },
    ],
  },
  {
    name: "PORTFOLIO",
    href: "#",
    dropdown: [
      {
        title: "Case Studies",
        desc: "Real-world success stories",
        href: "/portfolio/cases",
      },
      {
        title: "Clients",
        desc: "Trusted by global brands",
        href: "/portfolio/clients",
      },
      {
        title: "Industries",
        desc: "Cross-industry expertise",
        href: "/portfolio/industries",
      },
    ],
  },
  {
    name: "CONSULTING",
    href: "#",
    dropdown: [
      {
        title: "Strategy",
        desc: "Long-term growth planning",
        href: "/consulting/strategy",
      },
      {
        title: "Operations",
        desc: "Efficiency & optimization",
        href: "/consulting/operations",
      },
      {
        title: "Transformation",
        desc: "Change management",
        href: "/consulting/transformation",
      },
    ],
  },
  { name: "Talent Club", href: "/talent" },
  { name: "CONTACT US", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // store timeout id so we can clear it
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // 150ms delay before closing
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#111] shadow-lg py-2" : "bg-transparent py-4"
      } relative`}
    >
      <div className="flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/lamid-logo.png"
            alt="Lamid Consulting"
            width={140}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-white font-semibold">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={item.href} className="hover:text-red-500 transition">
                {item.name}
              </Link>

              {item.dropdown && openDropdown === item.name && (
                <div className="absolute left-0 top-full mt-3 w-[600px] bg-white text-black rounded-lg shadow-xl p-6 grid grid-cols-2 gap-6 z-20">
                  {item.dropdown.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="block p-3 rounded hover:bg-red-50 transition"
                    >
                      <p className="font-bold text-gray-900">{link.title}</p>
                      <p className="text-sm text-gray-600">{link.desc}</p>
                    </Link>
                  ))}
                  <div className="col-span-2 mt-4">
                    <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                      Explore {item.name}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}

          {/* Account Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => handleMouseEnter("ACCOUNT")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="#"
              className="flex items-center gap-2 bg-black px-4 py-2 rounded-lg hover:bg-red-700 transition text-white"
            >
              <span className="text-red-500 text-lg">👤</span>
              <span className="font-semibold">Account</span>
            </Link>

            {openDropdown === "ACCOUNT" && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white text-black rounded-lg shadow-lg z-20">
                <ul className="flex flex-col">
                  <li>
                    <Link
                      href="/signin"
                      className="block px-4 py-2 hover:bg-red-600 hover:text-white transition"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="block px-4 py-2 hover:bg-red-600 hover:text-white transition"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition">
                      Continue with Google
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#111] border-t border-red-700 p-6 space-y-4 text-white">
          {navItems.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className="block font-semibold text-lg mb-2"
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="ml-4 space-y-2">
                  {item.dropdown.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="block text-gray-300 hover:text-red-500"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Mobile Account Options */}
          <div className="space-y-2">
            <Link
              href="/signin"
              className="block bg-black px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block bg-black px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Sign Up
            </Link>
            <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
              Continue with Google
            </button>
          </div>
        </div>
      )}

      {/* Sliding Red Line */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-red-600 transition-all duration-500 ease-out ${
          scrolled ? "w-full" : "w-0"
        }`}
      />
    </nav>
  );
}
