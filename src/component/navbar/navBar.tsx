"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";

// Dropdown components
import ServicesDropdown from "./ServicesDropdown";
import PortfolioDropdown from "./PortfolioDropdown";
import ConsultingDropdown from "./ConsultingDropdown";

const navItems = [
  { name: "HOME", href: "/" },
  { name: "SERVICES", href: "#", DropdownComponent: ServicesDropdown },
  { name: "PORTFOLIO", href: "#", DropdownComponent: PortfolioDropdown },
  { name: "CONSULTING", href: "/", DropdownComponent: ConsultingDropdown },
  { name: "TALENT CLUB", href: "/talent" },
  { name: "CONTACT US", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown((prev) => (prev === name ? null : name));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b0b0b]/95 shadow-lg py-2 border-b border-[#2a2a2a]"
          : "bg-transparent py-4"
      }`}
    >
      <div className="flex items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="Lamid Consulting"
            width={140}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-white font-sans font-medium">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className={`transition-colors font-serif tracking-wide ${
                  isActive(item.href)
                    ? "text-[#c12129]"
                    : "hover:text-[#c12129] text-white"
                }`}
              >
                {item.name}
              </Link>

              {item.DropdownComponent && openDropdown === item.name && (
                <item.DropdownComponent isOpen />
              )}
            </li>
          ))}

          {/* Account Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => handleMouseEnter("ACCOUNT")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-2 bg-black px-4 py-2 rounded-lg hover:bg-[#c12129] transition text-white font-sans">
              <span className="text-lg">👤</span>
              <span className="font-serif">Account</span>
            </button>

            {openDropdown === "ACCOUNT" && (
              <div className="absolute right-0 top-full mt-3 w-56 bg-white text-black rounded-lg shadow-xl z-30 overflow-hidden font-sans">
                <ul className="flex flex-col">
                  <li>
                    <Link
                      href="/signin"
                      className="block px-4 py-2 hover:bg-[#c12129] hover:text-white transition"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="block px-4 py-2 hover:bg-[#c12129] hover:text-white transition"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-[#c12129] hover:text-white transition">
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
          className="md:hidden text-3xl text-white hover:text-[#c12129] transition"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#0b0b0b] border-t border-[#2a2a2a] overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-4 text-white font-sans font-medium">
          {navItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() =>
                  item.DropdownComponent && toggleMobileDropdown(item.name)
                }
                className={`w-full text-left text-lg mb-2 flex justify-between items-center font-serif tracking-wide ${
                  isActive(item.href) ? "text-[#c12129]" : ""
                }`}
              >
                {item.name}
                {item.DropdownComponent && (
                  <span
                    className={`transition-transform ${
                      openMobileDropdown === item.name ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                )}
              </button>

              {item.DropdownComponent ? (
                <div className="ml-4">
                  <item.DropdownComponent
                    mobile
                    isOpen={openMobileDropdown === item.name}
                  />
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`block ml-2 transition ${
                    isActive(item.href)
                      ? "text-[#c12129]"
                      : "text-gray-300 hover:text-[#c12129]"
                  }`}
                >
                  Visit
                </Link>
              )}
            </div>
          ))}

          {/* Account options */}
          <div className="space-y-2 pt-2 border-t border-[#1a1a1a] font-sans">
            <Link
              href="/signin"
              className="block bg-black px-4 py-2 rounded-lg hover:bg-[#c12129] transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block bg-black px-4 py-2 rounded-lg hover:bg-[#c12129] transition"
            >
              Sign Up
            </Link>
            <button className="w-full bg-[#c12129] text-white py-2 rounded-lg hover:bg-red-700 transition">
              Continue with Google
            </button>
          </div>
        </div>
      </div>

      {/* Sliding red accent line */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-[#c12129] transition-all duration-500 ease-out ${
          scrolled ? "w-full" : "w-0"
        }`}
      />
    </nav>
  );
}
