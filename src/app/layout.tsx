import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/component/navbar/navBar";
import Footer from "@/component/Footer";
import ModalWrapper from "@/component/modalWrapper";
import { Inter, Playfair_Display } from "next/font/google";

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
      <body className="antialiased font-sans">
        <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0d0d0d] dark:text-white transition-colors duration-300">
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ModalWrapper />
        </div>
      </body>
    </html>
  );
}
