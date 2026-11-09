import type React from "react";
import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito, Space_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["600", "800", "900"], variable: "--font-fraunces", display: "swap" });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-nunito", display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono", display: "swap" });

export const viewport: Viewport = { themeColor: "#faf5e8", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  title: "Saksham Chauhan — Software Engineer & Founder",
  description: "Software Engineer at OmniDimension, ex-Spyne, Founder of Ajnabee. Building conversational AI, voice agents, and full-stack products.",
  icons: { icon: "/favicon.svg", apple: "/apple-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${nunito.variable} ${spaceMono.variable} font-sans antialiased grain-overlay`}>
        {children}
      </body>
    </html>
  );
}
