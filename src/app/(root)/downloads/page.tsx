"use client";

import React, { useState } from "react";
import { Download, FileText, Settings, ShieldAlert } from "lucide-react";

interface DownloadItem {
  id: string;
  title: string;
  type: "Catalogue" | "Manual" | "Safety";
  size: string;
  date: string;
  fileUrl?: string;
}

const downloads: DownloadItem[] = [
  { id: "1", title: "KOREVA9 Master Product Catalogue 2026", type: "Catalogue", size: "12.4 MB", date: "Jan 2026" },
  { id: "2", title: "7HP Khet Shakti Power Weeder - User Manual", type: "Manual", size: "4.2 MB", date: "Mar 2026" },
  {
    id: "3",
    title: "Rotavator Attachment Installation Guide",
    type: "Manual",
    size: "148 KB",
    date: "Feb 2026",
    fileUrl: "/downloads/rotavator-installation-guide.pdf",
  },
  { id: "4", title: "Brush Cutter Pro - Operating Instructions", type: "Manual", size: "3.5 MB", date: "Apr 2026" },
  {
    id: "5",
    title: "E20 Petrol Safety & Carburetor Care",
    type: "Safety",
    size: "135 KB",
    date: "May 2026",
    fileUrl: "/downloads/e20-petrol-safety-care.pdf",
  },
  {
    id: "6",
    title: "Heavy Machinery General Safety Guidelines",
    type: "Safety",
    size: "142 KB",
    date: "Jan 2026",
    fileUrl: "/downloads/heavy-machinery-safety-guidelines.pdf",
  },
  { id: "7", title: "Food Processing Units - Mini Rice Mill Specs", type: "Catalogue", size: "5.6 MB", date: "Jun 2026" },
];

export default function DownloadsPage() {
  const [activeTab, setActiveTab] = useState<"All" | "Catalogue" | "Manual" | "Safety">("All");

  const filteredDownloads = activeTab === "All" 
    ? downloads 
    : downloads.filter(d => d.type === activeTab);

  const getIcon = (type: string) => {
    switch (type) {
      case "Catalogue": return <FileText className="text-brand-red w-6 h-6" />;
      case "Manual": return <Settings className="text-dark-900 w-6 h-6" />;
      case "Safety": return <ShieldAlert className="text-brand-red w-6 h-6" />;
      default: return <FileText className="text-dark-900 w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-light-100 py-12 md:py-20 px-4 font-jost">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark uppercase tracking-wide mb-4">
            Downloads Hub
          </h1>
          <div className="w-24 h-2 bg-brand-red mx-auto mb-6"></div>
          <p className="text-lg text-dark-700 max-w-2xl mx-auto">
            Access our complete library of product catalogues, operating instructions, and essential safety manuals.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {["All", "Catalogue", "Manual", "Safety"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-brand-red text-white shadow-md" 
                  : "bg-white text-dark-700 border border-light-300 hover:border-brand-red hover:text-brand-red"
              }`}
            >
              {tab === "All" ? "All Downloads" : `${tab}s`}
            </button>
          ))}
        </div>

        {/* Downloads List */}
        <div className="bg-white border border-light-300 shadow-sm rounded-lg overflow-hidden">
          {filteredDownloads.length > 0 ? (
            <ul className="divide-y divide-light-200">
              {filteredDownloads.map((item) => (
                <li key={item.id} className="p-6 hover:bg-light-100 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-light-200 rounded-md shrink-0">
                      {getIcon(item.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-black text-lg group-hover:text-brand-red transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-dark-700 mt-1">
                        <span className="uppercase font-medium tracking-wider text-xs">{item.type}</span>
                        <span>•</span>
                        <span>{item.size}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                  {item.fileUrl ? (
                    <a
                      href={item.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-full sm:w-auto px-6 py-2.5 bg-brand-red border-2 border-brand-red text-white font-bold uppercase text-sm hover:bg-brand-red-accent transition-all flex items-center justify-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                    >
                      <Download className="w-4 h-4" /> Download PDF
                    </a>
                  ) : (
                    <button
                      disabled
                      className="shrink-0 w-full sm:w-auto px-6 py-2.5 border-2 border-gray-200 text-gray-400 font-bold uppercase text-xs cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Coming Soon
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-12 text-center text-dark-700">
              No downloads available for this category yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
