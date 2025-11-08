"use client";

import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "default";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "default", className = "", ...props }, ref) => {
    const base =
      "px-3 py-2 rounded-lg font-medium transition focus:outline-none";
    const variants = {
      default: "bg-blue-600 hover:bg-blue-700 text-white",
      outline: "border border-gray-700 text-white hover:bg-gray-800",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
