import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "KOREVA GLOBAL — Premium Agriculture Implements",
  description:
    "Discover KOREVA's curated range of high-quality agriculture implements — Power Weeders, Brush Cutters, Rotavators, and more. Engineered for efficiency, built for Indian farms.",
  keywords: [
    "agriculture implements",
    "harrow",
    "power weeder",
    "brush cutter",
    "rotavator",
    "farming equipment",
    "KOREVA",
    "Koreva Global",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jost.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
