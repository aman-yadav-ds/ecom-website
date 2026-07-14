import React from "react";
import { NewHero } from "@/components/home/NewHero";
import { StatsSection } from "@/components/home/StatsSection";
import { OurSolutions } from "@/components/home/OurSolutions";
import { OurStrength } from "@/components/home/OurStrength";
import { Sustainability } from "@/components/home/Sustainability";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AboutUsPreview } from "@/components/home/AboutUsPreview";

export default function Home() {
  return (
    <div className="min-h-screen bg-light-100 flex flex-col font-jost">
      <main className="flex-grow">
        <NewHero />
        <StatsSection />
        <FeaturedProducts />
        <OurSolutions />
        <OurStrength />
        <Sustainability />
        <AboutUsPreview />
      </main>
    </div>
  );
}