import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import { Toaster } from "react-hot-toast";
import { inter, playfair } from "../fonts"; // now using next/font/google

export const metadata: Metadata = {
  title: "Lamid Consulting",
  description: "International Management Consultants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="antialiased font-sans bg-[#0c0000] text-white min-h-screen flex flex-col">
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
