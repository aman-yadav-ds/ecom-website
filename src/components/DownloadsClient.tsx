"use client";

import React, { useState } from "react";
import { Download, FileText, Settings, ShieldAlert } from "lucide-react";

type DownloadType = "Catalogue" | "Manual" | "Safety";
type FilterTab = "All" | DownloadType;

interface DownloadItem {
  id: string;
  title: string;
  type: DownloadType;
  size: string;
  date: string;
  fileUrl?: string;
}

interface DownloadsClientProps {
  downloads: DownloadItem[];
}

const getIcon = (type: string) => {
  switch (type) {
    case "Catalogue":
      return <FileText className="text-brand-red w-6 h-6" />;
    case "Manual":
      return <Settings className="text-dark-900 w-6 h-6" />;
    case "Safety":
      return <ShieldAlert className="text-brand-red w-6 h-6" />;
    default:
      return <FileText className="text-dark-900 w-6 h-6" />;
  }
};

export function DownloadsClient({ downloads }: DownloadsClientProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  const filteredDownloads =
    activeTab === "All"
      ? downloads
      : downloads.filter((d) => d.type === activeTab);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
        {(["All", "Catalogue", "Manual", "Safety"] as FilterTab[]).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-extrabold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-brand-red text-white shadow-md border border-brand-red active:scale-95"
                  : "bg-white/90 text-dark-800 border border-light-300 hover:border-brand-red hover:text-brand-red shadow-xs"
              }`}
            >
              {tab === "All" ? "All Documents" : `${tab}s`}
            </button>
          )
        )}
      </div>

      {/* Downloads List */}
      <div className="glass-panel-elevated border border-light-300 shadow-md rounded-3xl overflow-hidden p-4 sm:p-6">
        {filteredDownloads.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredDownloads.map((item) => (
              <div
                key={item.id}
                className="glass-card p-5 sm:p-6 rounded-2xl border border-light-300/80 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shrink-0 shadow-xs">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-dark-900 text-base sm:text-lg group-hover:text-brand-red transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-dark-600 font-bold uppercase tracking-wider mt-1.5">
                      <span className="text-brand-red">{item.type}</span>
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
                    className="shrink-0 w-full sm:w-auto px-6 py-3 bg-brand-red hover:bg-brand-red-accent text-white font-extrabold uppercase text-xs tracking-wider rounded-full transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="shrink-0 w-full sm:w-auto px-6 py-3 bg-light-200 border border-light-300 text-dark-400 font-bold uppercase text-xs tracking-wider rounded-full cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-dark-600 font-medium">
            No downloads available for this category yet.
          </div>
        )}
      </div>
    </>
  );
}
