import React from "react";
import { Metadata } from "next";
import { FileCheck2 } from "lucide-react";
import { DownloadsClient } from "@/components/DownloadsClient";

export const metadata: Metadata = {
  title: "Downloads & Manuals | Koreva Agriculture & Machines (Koreva9)",
  description:
    "Download product catalogues, user manuals, and safety guides for Koreva Machines and Koreva Agriculture equipment by Koreva Global LLP (Koreva9).",
  keywords: [
    "Koreva Manuals",
    "Koreva Agriculture Catalog",
    "Koreva Machines Downloads",
    "Koreva Global LLP Manuals",
    "Koreva9 User Guides"
  ],
  alternates: { canonical: "/downloads" },
};

// Static download data lives in the Server Component.
// The page h1, description, and download titles are pre-rendered in the HTML.
const downloads = [
  {
    id: "1",
    title: "KOREVA Master Product Catalogue 2026",
    type: "Catalogue" as const,
    size: "12.4 MB",
    date: "Jan 2026",
  },
  {
    id: "2",
    title: "7HP Khet Shakti Power Weeder - User Manual",
    type: "Manual" as const,
    size: "4.2 MB",
    date: "Mar 2026",
  },
  {
    id: "3",
    title: "Rotavator Attachment Installation Guide",
    type: "Manual" as const,
    size: "148 KB",
    date: "Feb 2026",
    fileUrl: "/downloads/rotavator-installation-guide.pdf",
  },
  {
    id: "4",
    title: "Brush Cutter Pro - Operating Instructions",
    type: "Manual" as const,
    size: "3.5 MB",
    date: "Apr 2026",
  },
  {
    id: "5",
    title: "E20 Petrol Safety & Carburetor Care",
    type: "Safety" as const,
    size: "135 KB",
    date: "May 2026",
    fileUrl: "/downloads/e20-petrol-safety-care.pdf",
  },
  {
    id: "6",
    title: "Heavy Machinery General Safety Guidelines",
    type: "Safety" as const,
    size: "142 KB",
    date: "Jan 2026",
    fileUrl: "/downloads/heavy-machinery-safety-guidelines.pdf",
  },
  {
    id: "7",
    title: "Food Processing Units - Mini Rice Mill Specs",
    type: "Catalogue" as const,
    size: "5.6 MB",
    date: "Jun 2026",
  },
];

// Server Component — Metadata export is now possible.
// h1 and page description are pre-rendered for SEO.
export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-jost">
      <div className="max-w-5xl mx-auto">
        {/* Server-rendered header — h1 and description indexed immediately */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-red/20 text-brand-red text-xs font-extrabold uppercase tracking-widest mb-4 shadow-xs">
            <FileCheck2 className="w-4 h-4" />
            <span>Technical Documentation Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight mb-4">
            Downloads &amp; Technical Manuals
          </h1>
          <p className="text-dark-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Access our complete library of product catalogues, operating
            instructions, and essential safety manuals.
          </p>
        </div>

        {/* Tab filtering state is the only client concern */}
        <DownloadsClient downloads={downloads} />
      </div>
    </div>
  );
}
