import React from "react";
import Link from "next/link";
import { exampleCategories, exampleProducts } from "@/lib/details";
import { Zap, Award, ShieldCheck, Droplet, Wrench, ArrowRight } from "lucide-react";

const CATEGORY_META: Record<string, { icon: React.ReactNode; color: string; hoverBorder: string; gradient: string }> = {
  "tractor-attachments": {
    icon: <Zap className="w-6 h-6 text-brand-red" />,
    color: "text-brand-red",
    hoverBorder: "hover:border-brand-red/50",
    gradient: "from-red-500/10 via-transparent to-transparent",
  },
  "self-propelled-machinery": {
    icon: <Award className="w-6 h-6 text-amber-600" />,
    color: "text-amber-600",
    hoverBorder: "hover:border-amber-500/50",
    gradient: "from-amber-500/10 via-transparent to-transparent",
  },
  "food-processing-units": {
    icon: <ShieldCheck className="w-6 h-6 text-cyan-600" />,
    color: "text-cyan-600",
    hoverBorder: "hover:border-cyan-500/50",
    gradient: "from-cyan-500/10 via-transparent to-transparent",
  },
  "lubricants": {
    icon: <Droplet className="w-6 h-6 text-emerald-600" />,
    color: "text-emerald-600",
    hoverBorder: "hover:border-emerald-500/50",
    gradient: "from-emerald-500/10 via-transparent to-transparent",
  },
  "hand-tools": {
    icon: <Wrench className="w-6 h-6 text-orange-600" />,
    color: "text-orange-600",
    hoverBorder: "hover:border-orange-500/50",
    gradient: "from-orange-500/10 via-transparent to-transparent",
  },
};

export default function CategoryGridShowcase() {
  return (
    <section className="bg-light-200/60 border-y border-light-300 py-10 px-4 sm:px-6 lg:px-8 mb-10 font-jost">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
              Product Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-900 uppercase tracking-tight mt-1">
              Explore By Category
            </h2>
          </div>
          <p className="text-sm text-dark-500 max-w-md font-medium">
            Select a specialized category below to view server-rendered product specifications, variant guides, and field documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {exampleCategories.map((category) => {
            const meta = CATEGORY_META[category.slug] || CATEGORY_META["tractor-attachments"];
            const productCount = exampleProducts.filter(
              (p) => p.isPublished && p.categoryId === category.id
            ).length;

            return (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className={`group relative flex flex-col justify-between p-5 bg-white border border-light-300 rounded-sm shadow-xs transition-all duration-300 hover:shadow-md ${meta.hoverBorder} overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red`}
              >
                {/* Subtle top corner gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${meta.gradient} rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125`} />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-light-200 rounded-sm group-hover:scale-110 transition-transform duration-300">
                      {meta.icon}
                    </div>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-light-200 text-dark-700 rounded-full">
                      {productCount} {productCount === 1 ? "Item" : "Items"}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-dark-900 group-hover:text-brand-red transition-colors line-clamp-1 uppercase tracking-wide">
                    {category.name}
                  </h3>

                  <p className="text-xs text-dark-500 mt-1 line-clamp-2 leading-relaxed">
                    {category.tagline || category.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-light-300 flex items-center justify-between text-xs font-bold text-dark-900 group-hover:text-brand-red transition-colors">
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
