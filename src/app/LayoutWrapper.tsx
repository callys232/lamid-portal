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
    <div className="min-h-screen w-screen bg-[#0c0000] text-white overflow-x-hidden flex flex-col transition-colors duration-300">
      {/* Navbar */}
      {!hideLayout && <Navbar />}

      {/* Main Content */}
      <main className="flex-1 w-full overflow-y-auto">{children}</main>

      {/* Footer */}
      {!hideLayout && <Footer />}

      {/* Modal */}
      {!hideLayout && <ModalWrapper />}
    </div>
  );
}
