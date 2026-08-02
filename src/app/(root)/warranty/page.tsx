import React from "react";
import Link from "next/link";
import { ShieldCheck, Settings, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-jost">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-red/20 text-brand-red text-xs font-extrabold uppercase tracking-widest mb-4 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>KOREVA Brand Quality Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight mb-4">
            Warranty Conditions
          </h1>
          <p className="text-dark-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            At KOREVA, we stand behind the quality and durability of our agricultural implements. Read our comprehensive warranty terms below.
          </p>
        </div>

        <div className="glass-panel-elevated border border-light-300 shadow-md p-6 sm:p-10 md:p-12 rounded-3xl relative overflow-hidden bg-white/90 backdrop-blur-2xl">
          <div className="relative z-10 space-y-10">
            
            {/* Section 1 */}
            <section className="glass-card p-6 sm:p-8 rounded-2xl border border-light-300/80 shadow-xs">
              <div className="flex items-center gap-3 mb-4 border-b border-light-200 pb-3">
                <div className="w-10 h-10 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-dark-900 uppercase">Standard Warranty Coverage</h2>
              </div>
              <div className="text-dark-700 text-xs sm:text-sm leading-relaxed space-y-3 font-medium">
                <p>
                  KOREVA warrants that all new products manufactured and sold by us are free from defects in material and workmanship under normal agricultural use and proper maintenance. 
                </p>
                <p>
                  The standard warranty period for self-propelled machinery (including Power Weeders, Brush Cutters, and Reapers) and tractor attachments is <strong className="text-dark-900 font-extrabold">12 Months</strong> from the date of purchase by the original retail purchaser.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="glass-card p-6 sm:p-8 rounded-2xl border border-light-300/80 shadow-xs">
              <div className="flex items-center gap-3 mb-4 border-b border-light-200 pb-3">
                <div className="w-10 h-10 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl flex items-center justify-center shrink-0 shadow-xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-dark-900 uppercase">What is NOT Covered</h2>
              </div>
              <div className="text-dark-700 text-xs sm:text-sm leading-relaxed font-medium">
                <p className="mb-3 font-bold text-dark-900">
                  This warranty does not apply to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Normal wear and tear items such as tines, blades, belts, filters, spark plugs, and tires.</li>
                  <li>Damage caused by improper assembly, maintenance, or storage.</li>
                  <li><strong className="text-brand-red font-extrabold">Fuel System Damage (E20 Warning):</strong> Damage to carburetors or fuel lines caused by stale fuel or the improper storage of ethanol-blended petrol (E20). The carburetor must be drained if the machine is stored for long periods.</li>
                  <li>Machinery that has been modified, altered, or used with non-KOREVA approved attachments.</li>
                  <li>Damage resulting from accidents, abuse, or use beyond the specified capacities of the machine.</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="glass-card p-6 sm:p-8 rounded-2xl border border-light-300/80 shadow-xs">
              <div className="flex items-center gap-3 mb-4 border-b border-light-200 pb-3">
                <div className="w-10 h-10 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl flex items-center justify-center shrink-0 shadow-xs">
                  <Settings className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-dark-900 uppercase">How to Claim Warranty</h2>
              </div>
              <div className="text-dark-700 text-xs sm:text-sm leading-relaxed space-y-4 font-medium">
                <p>
                  To make a warranty claim, the product must be delivered, at the owner's expense, to an authorized KOREVA Dealer. Proof of purchase (original sales receipt) must accompany the claim. 
                </p>
                <p>
                  The authorized dealer will evaluate the claim. If the failure is determined to be due to a defect in materials or workmanship, KOREVA will repair or replace the defective part without charge for parts or labor.
                </p>
                <div className="pt-2">
                  <Link href="/dealers" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-red hover:bg-brand-red-accent text-white font-extrabold uppercase tracking-wider text-xs rounded-full transition-all shadow-md active:scale-95 cursor-pointer">
                    <span>Find Your Nearest Dealer</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
