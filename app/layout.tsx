import type React from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = { themeColor: "#faf5e8", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  title: "Saksham Chauhan — Software Engineer & Founder",
  description: "Software Engineer at OmniDimension, ex-Spyne, Founder of Ajnabee. Building conversational AI, voice agents, and full-stack products.",
  icons: { icon: "/favicon.svg", apple: "/apple-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;800;900&family=Nunito:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Script id="microsoft-clarity" strategy="beforeInteractive">
          {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "zatdbu3bq8");`}
        </Script>
      </head>
      <body className="font-sans antialiased grain-overlay">
        {children}
      </body>
    </html>
  );
}
