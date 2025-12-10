import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import { Toaster } from "react-hot-toast";
import { inter, playfair } from "../fonts";
import AIAgent from "@/component/Agent/Onboarding";
import { CartProvider } from "@/component/Cartcontext";
import CartDrawer from "@/component/cartDrawer";

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
        <CartProvider>
          {/* Layout wrapper for navbar, footer, main content */}
          <LayoutWrapper>{children}</LayoutWrapper>

          {/* Global Toast notifications */}
          <Toaster position="top-right" />

          {/* Floating AI Agent trigger + sliding drawer */}
          <AIAgent />

          {/* Global Cart Drawer */}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
