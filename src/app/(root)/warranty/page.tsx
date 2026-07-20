import React from "react";
import Link from "next/link";
import { ShieldCheck, Settings, AlertTriangle, CheckCircle } from "lucide-react";

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-light-100 py-12 md:py-20 px-4 font-jost">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark uppercase tracking-wide mb-4">
            Warranty Conditions
          </h1>
          <div className="w-24 h-2 bg-brand-red mx-auto mb-6"></div>
          <p className="text-lg text-dark-700 max-w-2xl mx-auto">
            At KOREVA9, we stand behind the quality and durability of our agricultural implements. Read our comprehensive warranty terms below.
          </p>
        </div>

        <div className="bg-white border border-light-300 shadow-sm p-8 md:p-12 mb-12 relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute -top-12 -right-12 text-light-200 opacity-50 pointer-events-none">
            <ShieldCheck size={200} />
          </div>

          <div className="relative z-10 space-y-12">
            
            {/* Section 1 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-red flex items-center justify-center rounded-sm shrink-0">
                  <CheckCircle className="text-white w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-brand-black uppercase">Standard Warranty Coverage</h2>
              </div>
              <div className="pl-0 md:pl-13 text-dark-700 leading-relaxed space-y-4">
                <p>
                  KOREVA9 warrants that all new products manufactured and sold by us are free from defects in material and workmanship under normal agricultural use and proper maintenance. 
                </p>
                <p>
                  The standard warranty period for most self-propelled machinery (including Power Weeders, Brush Cutters, and Reapers) and heavy tractor attachments is <strong>12 Months</strong> from the date of purchase by the original retail purchaser.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-dark-900 flex items-center justify-center rounded-sm shrink-0">
                  <AlertTriangle className="text-white w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-brand-black uppercase">What is NOT Covered</h2>
              </div>
              <div className="pl-0 md:pl-13 text-dark-700 leading-relaxed">
                <p className="mb-4">
                  This warranty does not apply to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Normal wear and tear items such as tines, blades, belts, filters, spark plugs, and tires.</li>
                  <li>Damage caused by improper assembly, maintenance, or storage.</li>
                  <li><strong>Fuel System Damage (E20 Warning):</strong> Damage to carburetors or fuel lines caused by stale fuel or the improper storage of ethanol-blended petrol (E20). The carburetor must be drained if the machine is stored for long periods.</li>
                  <li>Machinery that has been modified, altered, or used with non-KOREVA9 approved attachments.</li>
                  <li>Damage resulting from accidents, abuse, or use beyond the specified capacities of the machine.</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-sm shrink-0">
                  <Settings className="text-brand-dark w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-brand-black uppercase">How to Claim Warranty</h2>
              </div>
              <div className="pl-0 md:pl-13 text-dark-700 leading-relaxed space-y-4">
                <p>
                  To make a warranty claim, the product must be delivered, at the owner's expense, to an authorized KOREVA9 Dealer. Proof of purchase (original sales receipt) must accompany the claim. 
                </p>
                <p>
                  The authorized dealer will evaluate the claim. If the failure is determined to be due to a defect in materials or workmanship, KOREVA9 will repair or replace the defective part without charge for parts or labor.
                </p>
                <div className="mt-6">
                  <Link href="/dealers" className="inline-flex items-center justify-center px-6 py-3 bg-brand-dark text-white font-bold uppercase text-sm hover:bg-brand-red transition-colors shadow-md">
                    Find Your Nearest Dealer
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
