
import React from "react";
import { ShieldCheck, MapPin, Award, CheckCircle2, Wrench, Factory } from "lucide-react";

const tickerItems = [
  { icon: ShieldCheck, label: "ISO 9001:2015 Certified Manufacturing" },
  { icon: MapPin, label: "400+ Pan-India Authorized Dealers" },
  { icon: Award, label: "State Subsidy Approved Equipment" },
  { icon: Wrench, label: "Precision Heat-Treated Boron Blades" },
  { icon: Factory, label: "Rudrapur Precision Metallurgy Facility" },
  { icon: CheckCircle2, label: "Field-Tested in 14 Agro-Climatic Zones" },
];

export function IndustrialTicker() {
  return (
    <section className="bg-brand-black text-white py-3.5 border-y border-neutral-800 overflow-hidden font-manrope select-none">
      <div className="flex overflow-hidden">
        <div className="animate-ticker flex items-center space-x-8 sm:space-x-12 shrink-0 pr-8 sm:pr-12">
          {tickerItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`item-1-${idx}`} className="flex items-center space-x-3 shrink-0">
                <span className="w-6 h-6 rounded bg-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-200">
                  {item.label}
                </span>
                <span className="text-brand-red/60 text-xs font-mono pl-4">/</span>
              </div>
            );
          })}
        </div>

        {/* Duplicate clone for seamless infinite loop */}
        <div className="animate-ticker flex items-center space-x-8 sm:space-x-12 shrink-0 pr-8 sm:pr-12" aria-hidden="true">
          {tickerItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`item-2-${idx}`} className="flex items-center space-x-3 shrink-0">
                <span className="w-6 h-6 rounded bg-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-200">
                  {item.label}
                </span>
                <span className="text-brand-red/60 text-xs font-mono pl-4">/</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
