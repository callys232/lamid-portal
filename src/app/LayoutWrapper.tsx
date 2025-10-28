"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/component/navbar/navBar";
import Footer from "@/component/Footer";
import ModalWrapper from "@/component/modalWrapper";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ Hide layout elements on these routes
  const noLayoutRoutes = ["/signin", "/signup", "/admin"];
  const hideLayout = noLayoutRoutes.some((path) => pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0d0d0d] dark:text-white transition-colors duration-300">
      {!hideLayout && <Navbar />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
      {!hideLayout && <ModalWrapper />}
    </div>
  );
}
