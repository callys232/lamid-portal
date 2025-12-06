"use client";
import { FC, ReactNode } from "react";

interface ServiceGridProps {
  children: ReactNode;
}

const ServiceGrid: FC<ServiceGridProps> = ({ children }) => (
  <div
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[200px] 
               max-w-6xl mx-auto border border-transparent transition-colors duration-300 p-4 rounded-lg"
  >
    {children}
  </div>
);

export default ServiceGrid;
