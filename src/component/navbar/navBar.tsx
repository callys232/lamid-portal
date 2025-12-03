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
  { name: "SERVICES", href: "/services", DropdownComponent: ServicesDropdown },
  {
    name: "PORTFOLIO",
    href: "/portfolio",
    DropdownComponent: PortfolioDropdown,
  },
  {
    name: "CONSULTING",
    href: "/jobs",
    DropdownComponent: ConsultingDropdown,
  },
  { name: "TALENT CLUB", href: "/talent" },
  { name: "CONTACT US", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown((prev) => (prev === name ? null : name));
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b0b0b]/95 shadow-lg py-2 border-b border-[#2a2a2a]"
          : "bg-transparent py-4"
      }`}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <Image
            src="/Logo.png"
            alt="Lamid Consulting"
            width={140}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-white font-medium">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className={`transition font-serif ${
                  isActive(item.href)
                    ? "text-[#c12129]"
                    : "hover:text-[#c12129]"
                }`}
              >
                {item.name}
              </Link>

              {/* Desktop dropdown */}
              {item.DropdownComponent && openDropdown === item.name && (
                <item.DropdownComponent isOpen />
              )}
            </li>
          ))}

          {/* Desktop Account */}
          <li
            className="relative"
            onMouseEnter={() => handleMouseEnter("ACCOUNT")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              aria-label="Account menu"
              className="flex items-center gap-2 bg-black px-4 py-2 rounded-lg hover:bg-[#c12129] transition text-white"
            >
              👤 <span className="font-serif">Account</span>
            </button>

            {openDropdown === "ACCOUNT" && (
              <div className="absolute right-0 top-full mt-3 w-56 bg-white text-black rounded-lg shadow-xl z-30">
                <ul className="flex flex-col">
                  <li>
                    <Link
                      href="/signin"
                      className="block px-4 py-2 hover:bg-[#c12129] hover:text-white"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="block px-4 py-2 hover:bg-[#c12129] hover:text-white"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin"
                      className="block px-4 py-2 hover:bg-[#c12129] hover:text-white"
                    >
                      Admin
                    </Link>
                  </li>
                  <li>
                    <button className="px-4 py-2 w-full text-left hover:bg-[#c12129] hover:text-white">
                      Continue with Google
                    </button>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-[#c12129] hover:text-white"
                    >
                      Consultant Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/client"
                      className="block px-4 py-2 hover:bg-[#c12129] hover:text-white"
                    >
                      Client Login
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle mobile menu"
          className="md:hidden text-3xl text-white hover:text-[#c12129] transition"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        className={`md:hidden bg-[#0b0b0b] border-t border-[#2a2a2a] transition-all duration-300 ${
          mobileOpen
            ? "max-h-[800px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 space-y-4 text-white font-medium">
          {navItems.map((item) => {
            const hasDropdown = !!item.DropdownComponent;
            return (
              <div key={item.name}>
                <div className="flex justify-between items-center">
                  {hasDropdown ? (
                    <button
                      className="text-lg w-full text-left font-serif flex justify-between items-center"
                      onClick={() => toggleMobileDropdown(item.name)}
                      aria-label={`${item.name} menu`}
                    >
                      {item.name}
                      <span
                        className={`transition-transform ${
                          openMobileDropdown === item.name ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-serif block"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>

                {hasDropdown && (
                  <div
                    className={`ml-4 overflow-hidden transition-all ${
                      openMobileDropdown === item.name ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <item.DropdownComponent
                      mobile
                      isOpen={openMobileDropdown === item.name}
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* Account Section */}
          <div className="pt-2 border-t border-[#1a1a1a] space-y-2">
            <Link
              href="/signin"
              className="block bg-black px-4 py-2 rounded-lg hover:bg-[#c12129]"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block bg-black px-4 py-2 rounded-lg hover:bg-[#c12129]"
            >
              Sign Up
            </Link>
            <Link
              href="/profile"
              className="block bg-black px-4 py-2 rounded-lg hover:bg-[#c12129]"
            >
              Consultant Login
            </Link>
            <Link
              href="/client"
              className="block bg-black px-4 py-2 rounded-lg hover:bg-[#c12129]"
            >
              Client Login
            </Link>
            <Link
              href="/admin"
              className="block bg-black px-4 py-2 rounded-lg hover:bg-[#c12129]"
            >
              Admin
            </Link>
            <button className="w-full bg-[#c12129] py-2 rounded-lg hover:bg-red-700">
              Continue with Google
            </button>
          </div>
        </div>
      </div>

      {/* 🔴 Red Theme Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#c12129] via-red-600 to-[#c12129]" />
    </nav>
  );
}
