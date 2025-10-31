// src/fonts.ts
import localFont from "next/font/local";

export const inter = localFont({
  src: [
    { path: "/fonts/Inter-Medium.otf", weight: "400", style: "normal" },
    { path: "/fonts/Inter-Black.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const playfair = localFont({
  src: [
    {
      path: "/fonts/PlayfairDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/PlayfairDisplay-Black.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});
