import React from "react";
import ArticleLayout from "@/components/ArticleLayout";

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function E20PetrolGuide() {
  return (
    <ArticleLayout
      title="E20 Petrol: Protecting Your Carburetor"
      category="Machine Care"
      date="July 10, 2026"
      author="KOREVA Engineering Team"
      heroImage="/guides/carburetor.jpg"
    >
      <p>
        The introduction of E20 petrol (a blend of 20% ethanol and 80% petrol) across fuel stations represents a significant step forward for the environment. However, for small agricultural engines—specifically power weeders and brush cutters—it introduces a critical maintenance challenge: <strong>carburetor corrosion and clogging.</strong>
      </p>

      <h2>The Chemistry of the Problem</h2>
      <p>
        Ethanol is hygroscopic, meaning it actively attracts and absorbs moisture from the air. When E20 fuel is left sitting in a carburetor bowl for an extended period, the ethanol-water mixture begins to separate from the petrol in a process known as <em>phase separation</em>.
      </p>
      <p>
        This separated, highly corrosive mixture attacks the soft metals and rubber seals inside your carburetor. Furthermore, as the petrol evaporates, it leaves behind a sticky varnish that completely clogs the microscopic jets required for your engine to start.
      </p>

      <blockquote>
        &quot;Leaving E20 fuel in your power weeder&apos;s carburetor for more than 15 days of inactivity is the #1 cause of starting failures and expensive replacements.&quot;
      </blockquote>

      <h2>The Solution: The 60-Second Fuel Drain Protocol</h2>
      <p>
        Fortunately, protecting your KOREVA9 machinery from E20 fuel damage is entirely preventable and takes less than a minute. You must build this habit into your post-work routine.
      </p>

      <div className="bg-light-200 border-l-4 border-brand-red p-6 my-8 rounded-r-lg">
        <h3 className="!mt-0 !mb-4">Step-by-Step Carburetor Drain</h3>
        <ol className="mb-0">
          <li><strong>Turn off the fuel valve:</strong> Locate the fuel shut-off valve beneath the petrol tank and turn it to the &apos;OFF&apos; position.</li>
          <li><strong>Start the engine:</strong> With the valve off, pull the recoil starter and start the machine.</li>
          <li><strong>Let it run dry:</strong> Allow the engine to idle. It will run for about 1 to 2 minutes on the fuel remaining in the fuel line and carburetor bowl.</li>
          <li><strong>Wait for it to stall:</strong> The engine will begin to surge and eventually stall out completely. </li>
          <li><strong>Attempt one more start:</strong> Pull the cord one more time with the choke on to ensure every last drop of fuel is burned out.</li>
        </ol>
      </div>

      <h2>Long-Term Storage (Winterization)</h2>
      <p>
        If you are storing your power weeder for the off-season (anything longer than 30 days), draining the carburetor is not enough. You must also completely drain the main fuel tank. E20 fuel sitting in a plastic or metal tank will degrade rapidly, losing its combustibility and potentially rusting metal tanks from the inside out due to moisture accumulation.
      </p>
      
      <p>
        <strong>KOREVA9 Warranty Notice:</strong> Please note that carburetor damage explicitly caused by stale E20 fuel or phase separation is considered user negligence and is <strong>not covered</strong> under your standard 12-month warranty. Protect your investment by following these simple steps.
      </p>
    </ArticleLayout>
  );
}
