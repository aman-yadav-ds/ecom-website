import React from "react";
import Image from "next/image";
import { AnimatedAboutContent } from "./AnimatedAboutContent";

export function AboutUsPreview() {
  return (
    <section className="relative w-full h-auto py-20 md:py-28 flex items-center justify-center overflow-hidden font-jost bg-[#fbfbfb] border-b border-light-300">
      {/* Background Image — server-rendered, no JS needed */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about_factory_1784013199832.jpg"
          alt="KOREVA GLOBAL LLP OEM Agricultural Machinery Manufacturing Plant"
          fill
          sizes="100vw"
          className="object-cover scale-105 filter brightness-95 opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbfb]/90 via-[#fbfbfb]/80 to-[#fbfbfb] z-10" />
      </div>

      {/* Animated content block with in-flow CTA button */}
      <AnimatedAboutContent />
    </section>
  );
}
