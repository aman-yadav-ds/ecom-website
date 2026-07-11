"use client";

import React, { useState } from "react";
import { Download, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

interface DetailTabsSectionProps {
  description: string;
  technicalDetails: Record<string, string>;
}

const TABS = ["Technical Details", "Description", "Features"];

const DetailTabsSection: React.FC<DetailTabsSectionProps> = ({
  description,
  technicalDetails,
}) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const specEntries = Object.entries(technicalDetails || {});
  const visibleSpecs = showAllSpecs ? specEntries : specEntries.slice(0, 10);
  const hasMoreSpecs = specEntries.length > 10;

  return (
    <div className="w-full mt-12 bg-white border-t border-light-300">
      {/* Sticky Tab Navigation */}
      <div className="sticky top-9 z-20 bg-white border-b border-light-300 shadow-sm">
        <div className="flex overflow-x-auto scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-6 py-4 text-sm font-medium transition-colors border-b-2 outline-none focus-visible:bg-light-100 ${activeTab === tab
                ? "border-brand-red text-brand-red"
                : "border-transparent text-dark-500 hover:text-dark-900 hover:border-light-400"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Panels */}
      <div className="py-8">
        {/* Technical Details Tab */}
        <div className={activeTab === "Technical Details" ? "block" : "hidden"}>
          <div className="overflow-hidden rounded-sm border border-light-300">
            <table className="w-full text-left border-collapse">
              <tbody>
                {visibleSpecs.map(([key, value], index) => (
                  <tr
                    key={key}
                    className={`transition-colors ${index % 2 === 0 ? "bg-light-100" : "bg-white"
                      } hover:bg-light-200`}
                  >
                    <th className="w-1/3 py-4 px-6 text-sm font-medium text-dark-700 border-r border-light-300 align-top">
                      {key}
                    </th>
                    <td className="w-2/3 py-4 px-6 text-sm text-dark-900">
                      {value}
                    </td>
                  </tr>
                ))}
                {specEntries.length === 0 && (
                  <tr>
                    <td colSpan={2} className="py-8 text-center text-dark-500">
                      No technical specifications available for this configuration.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {hasMoreSpecs && (
            <button
              onClick={() => setShowAllSpecs(!showAllSpecs)}
              className="mt-4 flex items-center justify-center w-full py-3 text-sm font-medium text-brand-red bg-red-50 hover:bg-red-100 transition-colors rounded-sm"
            >
              {showAllSpecs ? (
                <>Show Less <ChevronUp className="ml-2 w-4 h-4" /></>
              ) : (
                <>Show More ({specEntries.length - 10} more) <ChevronDown className="ml-2 w-4 h-4" /></>
              )}
            </button>
          )}
        </div>

        {/* Description Tab */}
        <div className={activeTab === "Description" ? "block" : "hidden"}>
          <div className="prose prose-sm sm:prose-base max-w-none text-dark-700">
            <p className="leading-relaxed">{description}</p>
            <p className="mt-4 leading-relaxed">
              Engineered for extreme environments, this product delivers unmatched durability and performance. It undergoes rigorous quality testing to meet KOREVA's exacting industrial standards.
            </p>
          </div>
        </div>

        {/* Features Tab */}
        <div className={activeTab === "Features" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Heavy-duty cast iron construction for maximum lifespan.",
              "Precision-machined tolerances down to 0.001mm.",
              "Corrosion-resistant industrial powder coating.",
              "Optimized thermal dissipation for continuous operation.",
              "Tool-free maintenance access panels.",
              "Integrated fail-safe safety interlocks."
            ].map((feature, i) => (
              <div key={i} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green flex-shrink-0 mt-0.5 mr-3" />
                <span className="text-sm text-dark-900 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTabsSection;
