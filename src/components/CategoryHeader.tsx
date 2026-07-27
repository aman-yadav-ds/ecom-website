import React from "react";
import Link from "next/link";
import { Category } from "@/lib/types";
import { ShieldCheck, Zap, Award, Droplet, Wrench, ArrowRight } from "lucide-react";

interface CategoryHeaderProps {
  category: Category;
  totalProducts: number;
}

const CATEGORY_THEMES: Record<string, {
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ReactNode;
  bgGradient: string;
}> = {
  "tractor-attachments": {
    accentColor: "border-brand-red",
    badgeBg: "bg-red-900/10 text-brand-red border-red-200",
    badgeText: "Heavy Duty Tillage",
    icon: <Zap className="w-5 h-5 text-brand-red" />,
    bgGradient: "from-gray-900 via-neutral-900 to-black text-white"
  },
  "self-propelled-machinery": {
    accentColor: "border-amber-500",
    badgeBg: "bg-amber-500/10 text-amber-600 border-amber-300",
    badgeText: "High Efficiency Motors",
    icon: <Award className="w-5 h-5 text-amber-500" />,
    bgGradient: "from-zinc-900 via-stone-900 to-neutral-950 text-white"
  },
  "food-processing-units": {
    accentColor: "border-cyan-500",
    badgeBg: "bg-cyan-500/10 text-cyan-700 border-cyan-300",
    badgeText: "Commercial Grade SS",
    icon: <ShieldCheck className="w-5 h-5 text-cyan-600" />,
    bgGradient: "from-slate-900 via-neutral-900 to-gray-900 text-white"
  },
  "lubricants": {
    accentColor: "border-emerald-500",
    badgeBg: "bg-emerald-500/10 text-emerald-700 border-emerald-300",
    badgeText: "ISO 9001 Thermal Fluids",
    icon: <Droplet className="w-5 h-5 text-emerald-500" />,
    bgGradient: "from-slate-950 via-emerald-950/40 to-neutral-900 text-white"
  },
  "hand-tools": {
    accentColor: "border-orange-500",
    badgeBg: "bg-orange-500/10 text-orange-700 border-orange-300",
    badgeText: "SK5 Forged Alloy",
    icon: <Wrench className="w-5 h-5 text-orange-500" />,
    bgGradient: "from-neutral-900 via-zinc-900 to-stone-900 text-white"
  }
};

export default function CategoryHeader({ category, totalProducts }: CategoryHeaderProps) {
  const theme = CATEGORY_THEMES[category.slug] || CATEGORY_THEMES["tractor-attachments"];

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${theme.bgGradient} py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b-4 ${theme.accentColor} shadow-xl mb-8`}>
      {/* Decorative backdrop patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 font-medium">
            <li>
              <Link href="/" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xs">Home</Link>
            </li>
            <li><span className="mx-2 text-gray-600">/</span></li>
            <li>
              <Link href="/products" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xs">Products</Link>
            </li>
            <li><span className="mx-2 text-gray-600">/</span></li>
            <li className="text-white font-bold" aria-current="page">{category.name}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            {/* Category Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider mb-4 ${theme.badgeBg}`}>
              {theme.icon}
              <span>{category.badge || theme.badgeText}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase mb-3">
              {category.name}
            </h1>

            <p className="text-base sm:text-lg text-gray-300 font-medium mb-4 leading-relaxed">
              {category.tagline || category.description}
            </p>

            {category.description && (
              <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            )}
          </div>

          {/* Quick Category Stats & Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-sm px-5 py-3 text-left lg:text-right">
              <span className="text-2xl font-extrabold text-white">{totalProducts}</span>
              <span className="text-xs uppercase text-gray-300 block font-medium">Products Available</span>
            </div>

            {category.slug === "lubricants" && (
              <a
                href="#lubricants-guide"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-colors"
              >
                <span>View Viscosity & Application Guide</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            {category.slug === "hand-tools" && (
              <a
                href="#handtools-guide"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 transition-colors"
              >
                <span>Steel & Ergonomics Guide</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Feature Highlights Pill Strip */}
        {category.highlights && category.highlights.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
            {category.highlights.map((highlight, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-xs font-semibold text-gray-200 rounded-sm">
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
