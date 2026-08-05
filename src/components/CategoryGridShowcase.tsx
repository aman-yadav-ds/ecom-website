import React from "react";
import Link from "next/link";
import { Zap, Award, ShieldCheck, Droplet, Wrench, ArrowRight } from "lucide-react";
import { getCachedCategories, getCachedPublishedProducts } from "@/lib/cached-queries";
import type { Category, ProductWithRelations } from "@/db/schema";

const CATEGORY_META: Record<
  string,
  { icon: React.ReactNode; color: string; hoverBorder: string; gradient: string }
> = {
  "tractor-attachments": {
    icon: <Zap className="w-5 h-5 text-brand-red" />,
    color: "text-brand-red",
    hoverBorder: "hover:border-brand-red/50",
    gradient: "from-red-500/10 via-transparent to-transparent",
  },
  "self-propelled-machinery": {
    icon: <Award className="w-5 h-5 text-amber-600" />,
    color: "text-amber-600",
    hoverBorder: "hover:border-amber-500/50",
    gradient: "from-amber-500/10 via-transparent to-transparent",
  },
  "food-processing-units": {
    icon: <ShieldCheck className="w-5 h-5 text-cyan-600" />,
    color: "text-cyan-600",
    hoverBorder: "hover:border-cyan-500/50",
    gradient: "from-cyan-500/10 via-transparent to-transparent",
  },
  lubricants: {
    icon: <Droplet className="w-5 h-5 text-emerald-600" />,
    color: "text-emerald-600",
    hoverBorder: "hover:border-emerald-500/50",
    gradient: "from-emerald-500/10 via-transparent to-transparent",
  },
  "hand-tools": {
    icon: <Wrench className="w-5 h-5 text-orange-600" />,
    color: "text-orange-600",
    hoverBorder: "hover:border-orange-500/50",
    gradient: "from-orange-500/10 via-transparent to-transparent",
  },
};

export default async function CategoryGridShowcase() {
  const [categoriesList, productsList] = await Promise.all([
    getCachedCategories(),
    getCachedPublishedProducts(),
  ]);

  return (
    <section className="glass-panel border-y border-light-300 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10 font-jost">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
              Product Categories
            </span>
            <div className="flex items-center justify-between mt-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-900 uppercase tracking-tight">
                Explore By Category
              </h2>
              <span className="text-xs font-bold text-brand-red sm:hidden flex items-center gap-1 shrink-0">
                Swipe &rarr;
              </span>
            </div>
          </div>
          <p className="text-sm text-dark-600 max-w-md font-medium hidden sm:block">
            Select a specialized category below to view server-rendered product specifications, variant guides, and field documentation.
          </p>
        </div>

        {/* Mobile View: Compact Horizontal Scroll Slider (sm:hidden) */}
        <div className="sm:hidden flex overflow-x-auto gap-3 pb-3 pt-1 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
          {categoriesList.map((category: Category) => {
            const meta = CATEGORY_META[category.slug] || CATEGORY_META["tractor-attachments"];
            const productCount = productsList.filter(
              (p: ProductWithRelations) => p.categoryId === category.id
            ).length;

            return (
              <Link
                key={`mobile-${category.id}`}
                href={`/products/${category.slug}`}
                className={`group relative flex flex-col justify-between p-4 min-w-[210px] w-[210px] shrink-0 snap-start glass-card border border-light-300/80 rounded-2xl shadow-xs transition-all duration-300 active:scale-[0.98] ${meta.hoverBorder} overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-brand-red/10 border border-brand-red/20 rounded-xl">
                      {meta.icon}
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-light-200 text-dark-700 rounded-full">
                      {productCount} {productCount === 1 ? "Item" : "Items"}
                    </span>
                  </div>

                  <h3 className="text-xs font-extrabold text-dark-900 group-hover:text-brand-red transition-colors line-clamp-1 uppercase tracking-wide">
                    {category.name}
                  </h3>

                  <p className="text-[11px] text-dark-600 mt-1 line-clamp-1 leading-snug font-medium">
                    {category.tagline || category.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-light-200 flex items-center justify-between text-[11px] font-extrabold text-dark-900 group-hover:text-brand-red transition-colors">
                  <span>Explore Lineup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Desktop View: Full Grid (hidden sm:grid) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categoriesList.map((category: Category) => {
            const meta = CATEGORY_META[category.slug] || CATEGORY_META["tractor-attachments"];
            const productCount = productsList.filter(
              (p: ProductWithRelations) => p.categoryId === category.id
            ).length;

            return (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className={`group relative flex flex-col justify-between p-5 glass-card border border-light-300/80 rounded-2xl shadow-xs transition-all duration-300 hover:shadow-md ${meta.hoverBorder} overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-brand-red/10 border border-brand-red/20 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-xs">
                      {meta.icon}
                    </div>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-light-200 text-dark-700 rounded-full">
                      {productCount} {productCount === 1 ? "Item" : "Items"}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-dark-900 group-hover:text-brand-red transition-colors line-clamp-1 uppercase tracking-wide">
                    {category.name}
                  </h3>

                  <p className="text-xs text-dark-600 mt-1 line-clamp-2 leading-relaxed font-medium">
                    {category.tagline || category.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-light-200 flex items-center justify-between text-xs font-extrabold text-dark-900 group-hover:text-brand-red transition-colors">
                  <span>Explore Lineup</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
