import type React from "react";
import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/data/profile";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = "Saksham Chauhan — Product Engineer, AI Builder, Founder";
const description =
  "Saksham Chauhan builds AI products, voice systems and digital products from 0 → 1. Software Engineer at OmniDimension, ex-Spyne, founder of Ajnabee.";

export const viewport: Viewport = {
  themeColor: "#0a0d12",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description,
  applicationName: "Saksham's Product Lab",
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  keywords: [
    "Saksham Chauhan",
    "Product Engineer",
    "AI Builder",
    "Voice AI",
    "Conversational AI",
    "Founder",
    "Ajnabee",
    "OmniDimension",
    "Spyne",
    "Flutter",
    "Next.js",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "profile",
    url: profile.siteUrl,
    siteName: "Saksham's Product Lab",
    title,
    description,
    locale: "en_US",
    firstName: profile.firstName,
    lastName: profile.lastName,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "OmniDimension", url: "https://omnidim.io" },
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.school },
  address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
  sameAs: [profile.links.github, profile.links.linkedin],
  knowsAbout: ["Voice AI", "Conversational AI", "LLM workflows", "Product engineering", "Flutter", "Next.js"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body>
        {/* Lets CSS hide reveal-able content only when JS is present to reveal it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
