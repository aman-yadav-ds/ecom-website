import React from "react";
import Link from "next/link";
import { Category } from "@/lib/types";
import { ShieldCheck, Zap, Award, Droplet, Wrench, ArrowRight, ChevronRight } from "lucide-react";

interface CategoryHeaderProps {
  category: Category;
  totalProducts: number;
}

const CATEGORY_THEMES: Record<string, {
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ReactNode;
}> = {
  "tractor-attachments": {
    accentColor: "border-brand-red",
    badgeBg: "bg-red-50 text-brand-red border-red-200",
    badgeText: "Heavy Duty Tillage",
    icon: <Zap className="w-4 h-4 text-brand-red" />,
  },
  "self-propelled-machinery": {
    accentColor: "border-amber-500",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    badgeText: "High Efficiency Motors",
    icon: <Award className="w-4 h-4 text-amber-600" />,
  },
  "food-processing-units": {
    accentColor: "border-cyan-500",
    badgeBg: "bg-cyan-50 text-cyan-800 border-cyan-200",
    badgeText: "Commercial Grade SS",
    icon: <ShieldCheck className="w-4 h-4 text-cyan-700" />,
  },
  "lubricants": {
    accentColor: "border-emerald-500",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    badgeText: "ISO 9001 Thermal Fluids",
    icon: <Droplet className="w-4 h-4 text-emerald-600" />,
  },
  "hand-tools": {
    accentColor: "border-orange-500",
    badgeBg: "bg-orange-50 text-orange-800 border-orange-200",
    badgeText: "SK5 Forged Alloy",
    icon: <Wrench className="w-4 h-4 text-orange-600" />,
  }
};

export default function CategoryHeader({ category, totalProducts }: CategoryHeaderProps) {
  const theme = CATEGORY_THEMES[category.slug] || CATEGORY_THEMES["tractor-attachments"];

  return (
    <section className="relative overflow-hidden bg-[#fbfbfb] text-dark-900 py-10 md:py-14 px-4 sm:px-6 lg:px-8 border-b border-light-300 mb-8 font-jost">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-red/8 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs font-extrabold text-dark-600 uppercase tracking-wider">
            <li>
              <Link href="/" prefetch={false} className="hover:text-brand-red transition-colors">Home</Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-dark-400" /></li>
            <li>
              <Link href="/products" prefetch={false} className="hover:text-brand-red transition-colors">Products</Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-dark-400" /></li>
            <li className="text-dark-900" aria-current="page">{category.name}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            {/* Category Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border uppercase tracking-wider mb-4 shadow-xs ${theme.badgeBg}`}>
              {theme.icon}
              <span>{category.badge || theme.badgeText}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 tracking-tight uppercase mb-3">
              {category.name}
            </h1>

            <p className="text-base sm:text-lg text-dark-700 font-medium mb-3 leading-relaxed">
              {category.tagline || category.description}
            </p>

            {category.description && (
              <p className="text-xs sm:text-sm text-dark-600 max-w-2xl leading-relaxed font-medium">
                {category.description}
              </p>
            )}
          </div>

          {/* Quick Category Stats */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
            <div className="glass-panel border border-light-300 rounded-2xl px-6 py-3 text-left lg:text-right shadow-xs">
              <span className="text-2xl font-extrabold text-dark-900 block">{totalProducts}</span>
              <span className="text-xs uppercase text-dark-600 font-bold tracking-wider">Products Available</span>
            </div>

            {category.slug === "lubricants" && (
              <a
                href="#lubricants-guide"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <span>View Viscosity & Application Guide</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            {category.slug === "hand-tools" && (
              <a
                href="#handtools-guide"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-orange-700 hover:text-orange-800 transition-colors"
              >
                <span>Steel & Ergonomics Guide</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Feature Highlights Pill Strip */}
        {category.highlights && category.highlights.length > 0 && (
          <div className="mt-8 pt-6 border-t border-light-300 flex flex-wrap gap-2.5">
            {category.highlights.map((highlight, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 glass-panel border border-light-300 text-xs font-bold text-dark-800 rounded-full shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                {highlight}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
