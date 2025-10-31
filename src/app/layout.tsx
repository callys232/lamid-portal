import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import LayoutWrapper from "./LayoutWrapper";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

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
      <body className="antialiased font-sans bg-[#0c0000] text-white  min-h-screen flex flex-col">
        {/* LayoutWrapper handles navbar, footer, and main content */}
        <LayoutWrapper>{children}</LayoutWrapper>

        {/* Global Toasts */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
