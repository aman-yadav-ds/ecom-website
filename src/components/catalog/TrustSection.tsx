"use client";

import React from "react";
import { Award, ShieldCheck, Cog, Headphones } from "lucide-react";

interface TrustItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: Award,
    title: "ISO 9001:2015 Certified Manufacturing",
    description:
      "Engineering heavy-duty farm equipment & ISO certified STOU lubricants for Indian agriculture.",
  },
  {
    icon: ShieldCheck,
    title: "Pan-India Dealer Support",
    description: "Wide network of authorized dealers across all states.",
  },
  {
    icon: Cog,
    title: "Genuine Spare Parts",
    description: "Ensure long life & reliable performance of your machinery.",
  },
  {
    icon: Headphones,
    title: "Technical Assistance",
    description: "Expert support whenever you need it.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-10 sm:py-12 bg-white border-t border-light-300 font-jost">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_ITEMS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#fdfdfd] border border-light-200 hover:border-brand-red/30 transition-all duration-200 shadow-2xs hover:shadow-xs group"
              >
                {/* Red square outlined icon box */}
                <div className="w-11 h-11 rounded-xl bg-brand-red/8 border border-brand-red/25 text-brand-red flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xs sm:text-[13px] font-black text-dark-900 uppercase tracking-wider mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-dark-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
