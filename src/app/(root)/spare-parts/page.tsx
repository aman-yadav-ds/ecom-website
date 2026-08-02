import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Wrench, CheckCircle, PackageSearch, Truck, ArrowRight, ShieldCheck } from "lucide-react";

export default function SparePartsPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-jost">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="glass-panel-elevated border border-light-300 shadow-md rounded-3xl overflow-hidden flex flex-col md:flex-row mb-16 bg-white/90 backdrop-blur-2xl">
          <div className="w-full md:w-1/2 relative min-h-[320px] sm:min-h-[400px]">
            <Image 
              src="/media/spare_parts.jpg" 
              alt="KOREVA Spare Parts Inventory"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/30 to-transparent flex items-end p-6 sm:p-8">
              <div>
                <span className="text-brand-red font-extrabold text-xs uppercase tracking-widest block mb-1">Pan-India Warehouses</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                  Nationwide Availability
                </h2>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/90">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-brand-red/20 text-brand-red text-xs font-extrabold uppercase tracking-widest mb-4 shadow-xs w-fit">
              <ShieldCheck className="w-4 h-4 text-brand-red" />
              <span>Genuine OEM Components</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight mb-4">
              Spare Parts & Service Support
            </h1>
            <p className="text-dark-700 text-sm sm:text-base leading-relaxed mb-8 font-medium">
              At KOREVA, we understand that in agriculture, downtime is not an option. Because we maintain domestic assembly lines and a localized inventory of spare parts, you will never have to wait weeks for replacement components.
            </p>
            <div>
              <Link href="/dealers" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-accent text-white font-extrabold uppercase tracking-wider text-xs sm:text-sm rounded-full transition-all shadow-md active:scale-95 cursor-pointer">
                <span>Find Your Local Dealer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <div className="glass-card p-8 border border-light-300/80 rounded-3xl shadow-xs text-center group hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform shadow-xs">
              <PackageSearch className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-dark-900 uppercase mb-2">Comprehensive Inventory</h3>
            <p className="text-xs sm:text-sm text-dark-600 font-medium leading-relaxed">
              From rotary tiller tines and engine belts to spark plugs and carburetor replacements, we stock all parts domestically.
            </p>
          </div>
          
          <div className="glass-card p-8 border border-light-300/80 rounded-3xl shadow-xs text-center group hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform shadow-xs">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-dark-900 uppercase mb-2">Rapid Dispatch</h3>
            <p className="text-xs sm:text-sm text-dark-600 font-medium leading-relaxed">
              Our regional distribution hubs dispatch emergency spare parts to authorized dealers within 48 to 72 hours.
            </p>
          </div>

          <div className="glass-card p-8 border border-light-300/80 rounded-3xl shadow-xs text-center group hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform shadow-xs">
              <Wrench className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-dark-900 uppercase mb-2">Certified Servicing</h3>
            <p className="text-xs sm:text-sm text-dark-600 font-medium leading-relaxed">
              All KOREVA dealers are factory trained to handle maintenance, tune-ups, and genuine part installation.
            </p>
          </div>
        </div>

        {/* How to Order */}
        <div className="glass-panel border border-light-300 p-8 sm:p-10 rounded-3xl shadow-xs">
          <h2 className="text-2xl font-extrabold text-dark-900 uppercase mb-6 border-b border-light-200 pb-3 tracking-wide">
            How to Order Genuine Spare Parts
          </h2>
          <div className="space-y-4 text-xs sm:text-sm font-medium">
            <div className="flex items-start gap-4 p-4 rounded-2xl glass-card border border-light-200">
              <CheckCircle className="text-brand-red w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-dark-700"><strong className="text-dark-900 font-extrabold">1. Identify the Part:</strong> Check your <Link href="/downloads" className="text-brand-red hover:underline font-extrabold">Operating Instructions manual</Link> to locate the exact part code.</p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl glass-card border border-light-200">
              <CheckCircle className="text-brand-red w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-dark-700"><strong className="text-dark-900 font-extrabold">2. Contact Your Local Dealer:</strong> We fulfill spare parts through our authorized dealer network to guarantee genuine OEM components.</p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl glass-card border border-light-200">
              <CheckCircle className="text-brand-red w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-dark-700"><strong className="text-dark-900 font-extrabold">3. Professional Installation:</strong> For internal engine work, have certified technicians perform installation to protect your <Link href="/warranty" className="text-brand-red hover:underline font-extrabold">warranty coverage</Link>.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
