import React from "react";
import ArticleLayout from "@/components/ArticleLayout";
import { CheckCircle } from "lucide-react";

export default function MaintenanceChecklistGuide() {
  return (
    <ArticleLayout
      title="End-of-Season Equipment Checklist"
      category="Maintenance"
      date="May 30, 2026"
      author="KOREVA Service Division"
      heroImage="/guides/maintenance.jpg"
    >
      <p>
        The harvest is in, the fields are resting, and the season is officially over. However, simply parking your heavy machinery in a shed and walking away is a guaranteed recipe for expensive repairs next spring.
      </p>
      <p>
        Agricultural equipment operates in the harshest environments imaginable: dust, mud, extreme heat, and constant vibration. Taking the time to properly winterize and store your KOREVA9 equipment will double its lifespan and ensure it starts on the first pull next season.
      </p>

      <h2>The Ultimate 10-Step Shutdown Checklist</h2>
      
      <div className="bg-white border border-light-300 p-6 my-8 rounded-lg shadow-sm">
        <ul className="space-y-4 list-none pl-0">
          <li className="flex items-start gap-4">
            <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-1" />
            <div>
              <strong>1. Thorough Pressure Wash</strong>
              <p className="text-dark-700 m-0">Remove all mud, caked-on fertilizer, and plant residue. Fertilizer is highly acidic and will rapidly rust metal surfaces if left over winter.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-1" />
            <div>
              <strong>2. Drain the Carburetor (Critical!)</strong>
              <p className="text-dark-700 m-0">E20 fuel will destroy a carburetor in 30 days. Turn off the fuel valve, run the engine until it stalls, and drain the main tank.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-1" />
            <div>
              <strong>3. Change the Engine Oil</strong>
              <p className="text-dark-700 m-0">Used engine oil contains acidic combustion by-products. Drain it while the engine is still slightly warm, and replace it with fresh, high-grade oil.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-1" />
            <div>
              <strong>4. Inspect & Replace Belts</strong>
              <p className="text-dark-700 m-0">Check drive belts for fraying or cracking. Relieve the tension on belts if the machine will be stored for more than 3 months to prevent stretching.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-1" />
            <div>
              <strong>5. Grease All Fittings</strong>
              <p className="text-dark-700 m-0">Pump fresh lithium grease into every single zerk fitting on the machine until you see the old, dirty grease squeeze out of the bearings.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-1" />
            <div>
              <strong>6. Clean or Replace Air Filters</strong>
              <p className="text-dark-700 m-0">Tapping out dust is fine for mid-season, but install a brand-new paper element and clean the pre-filter sponge before winter storage.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-1" />
            <div>
              <strong>7. Remove the Spark Plug</strong>
              <p className="text-dark-700 m-0">Remove the plug, squirt a teaspoon of clean engine oil directly into the cylinder, and pull the recoil cord slowly to coat the cylinder walls. Reinstall the plug.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-1" />
            <div>
              <strong>8. Sharpen Blades and Tines</strong>
              <p className="text-dark-700 m-0">Sharpen rotary tiller tines or brush cutter blades now. Once sharpened, coat the exposed metal edges with a light layer of oil or WD-40 to prevent rust.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-1" />
            <div>
              <strong>9. Check Tire Pressure</strong>
              <p className="text-dark-700 m-0">Inflate tires to their maximum recommended PSI to prevent flat spots from sitting in one place for months.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <CheckCircle className="text-brand-red w-6 h-6 shrink-0 mt-1" />
            <div>
              <strong>10. Store in a Dry Location</strong>
              <p className="text-dark-700 m-0">Store the machinery under a roof, away from direct rain and sunlight. If using a tarp, ensure it is breathable to prevent condensation buildup.</p>
            </div>
          </li>
        </ul>
      </div>

      <h2>Preparation is Profit</h2>
      <p>
        Treating your machinery with respect guarantees it will respect you when planting season begins. If you discovered any broken components while performing this checklist, order your replacement parts from your local KOREVA9 dealer now, rather than waiting until the spring rush!
      </p>
    </ArticleLayout>
  );
}
