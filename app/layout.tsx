import type { Metadata } from "next";
import { Comfortaa, Quicksand, Righteous } from "next/font/google";
import "./globals.css";

// Primary Display Font - Child-friendly, rounded, warm
const displayFont = Comfortaa({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Body Font - Readable but friendly
const bodyFont = Quicksand({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Accent Font - Bold, impactful for CTAs
const accentFont = Righteous({
  variable: "--font-accent",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sande Events | Decorazioni con Palloncini per Feste di Bambini",
  description: "Crea momenti magici con Sande Events. Decorazioni con palloncini professionali per compleanni, baby shower, battesimi, cresime ed eventi aziendali. Temi unici: pirati, principesse, supereroi e altro!",
  keywords: ["decorazioni con palloncini", "compleanno bambino", "baby shower", "battesimo", "cresima", "eventi aziendali", "palloncini", "decorazioni feste"],
  authors: [{ name: "Sande Events" }],
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Sande Events | Decorazioni con Palloncini per Feste di Bambini",
    description: "Crea momenti magici con decorazioni professionali con palloncini",
    type: "website",
    locale: "it_IT",
    images: [
      {
        url: "/logo.png",
        width: 400,
        height: 400,
        alt: "Sande Events Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${accentFont.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
