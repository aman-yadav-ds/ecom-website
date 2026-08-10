import React from "react";
import Image from "next/image";
import { HeroMotionContent } from "./HeroMotionContent";

// NewHero is now a Server Component.
// The background image and section shell are pre-rendered, removing them
// from the JS bundle and making them immediately available to crawlers.
export function NewHero() {
  return (
    <section className="relative w-full min-h-[55vh] md:min-h-[65vh] flex items-center justify-center overflow-hidden font-jost bg-[#fbfbfb] py-10 md:py-16 border-b border-light-300">
      {/* Background Facility Image — server-rendered, priority-loaded */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg_koreva.jpg"
          alt="KOREVA GLOBAL LLP Agricultural Machinery Manufacturing Plant & Assembly Line"
          fill
          sizes="100vw"
          priority
          loading="eager"
          fetchPriority="high"
          className="object-cover object-center filter brightness-95 contrast-105 saturate-105 opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/50 to-[#fbfbfb] z-10" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-red/10 rounded-full blur-[150px] pointer-events-none z-10" />
      </div>

      {/* Client boundary: animated text, badge, and CTAs */}
      <HeroMotionContent />
    </section>
  );
}
