"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { useTheme } from "next-themes";

const Footer: React.FC = () => {
  const { theme } = useTheme();

  // Define color palette
  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#181818]" : "bg-[#0c0c0c]";
  const textColor = isDark ? "text-red" : "text-white-900";
  const accentColor = isDark ? "text-[#c12129]" : "text-[#c12129]";
  const buttonBg = isDark ? "bg-[#c12129]" : "bg-[#c12129]";
  const cardBg = isDark ? "bg-[#c12129]" : "bg-white-100";

  return (
    <footer
      className={`${bgColor} ${textColor} py-8 px-4 md:px-12 transition-all duration-300`}
    >
      <div className="container mx-auto">
        {/* Top section with logo and social icons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <Image
                src="/lamid-logo.png"
                alt="Lamid Consulting"
                width={200}
                height={80}
                className="mb-4"
              />
            </Link>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[
                {
                  href: "https://facebook.com",
                  icon: <FaFacebook size={24} />,
                },
                { href: "https://twitter.com", icon: <FaTwitter size={24} /> },
                {
                  href: "https://instagram.com",
                  icon: <FaInstagram size={24} />,
                },
                {
                  href: "https://linkedin.com",
                  icon: <FaLinkedin size={24} />,
                },
              ].map(({ href, icon }, i) => (
                <Link
                  key={i}
                  href={href}
                  className={`${textColor} hover:text-[#c12129] transition-colors`}
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className={`${accentColor} text-lg font-bold mb-2`}>
              Newsletter
            </h3>
            <p className="text-sm mb-4">
              Sign up for our newsletter to stay up to date on the latest from
              Lamid Consulting.
            </p>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="your mail here..."
                className={`rounded-l px-4 py-2 w-full sm:w-2/3 focus:outline-none ${cardBg} ${textColor}`}
              />
              <button
                className={`${buttonBg} text-white px-4 py-2 rounded-r uppercase text-sm font-semibold mt-2 sm:mt-0 hover:opacity-90`}
              >
                Signup
              </button>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
          {["Bizphere", "Events", "BIZ", "HCD", "SD"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`${buttonBg} hover:bg-[#a71a22] px-4 py-2 rounded text-white transition`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-8">
          <h3 className={`${accentColor} text-lg font-bold mb-4`}>
            Contact Us
          </h3>
          <div className="flex items-center">
            <FaEnvelope className="mr-2" />
            <a
              href="mailto:hp@lamidconsulting.com"
              className={`${textColor} hover:text-[#c12129]`}
            >
              hp@lamidconsulting.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
