import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCatalogClient from "@/components/ProductCatalogClient";
import CategoryHeader from "@/components/CategoryHeader";
import { getCatalogData, CatalogQueryParams } from "@/lib/catalog";
import { Wrench, Shield, Award } from "lucide-react";

import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildProductMetadata({
  title: formatPageSeoTitle("Agricultural Hand Tools & Equipment"),
  description: formatPageSeoDescription(
    "Explore drop-forged SK5 alloy steel secateurs, pruners, garden hoes, and harvesting sickles manufactured by official brand Koreva9."
  ),
  canonicalUrl: "/products/hand-tools",
  keywords: ["Hand Tools", "SK5 Pruning Secateur", "Harvesting Sickle", "Garden Tools"],
});

interface PageProps {
  searchParams?: Promise<CatalogQueryParams>;
}

import { getCachedCategories } from "@/lib/cached-queries";

export const revalidate = 60;

export default async function HandToolsPage({ searchParams }: PageProps) {
  const categoriesList = await getCachedCategories();
  const category = categoriesList.find((c) => c.slug === "hand-tools");

  if (!category) notFound();

  const resolvedSearchParams = (await searchParams) || {};
  const catalogData = await getCatalogData(resolvedSearchParams, "hand-tools", category);

  return (
    <main className="min-h-screen bg-[#fbfbfb] text-dark-900 font-jost">
      <CategoryHeader
        category={{
          id: category.id,
          name: category.name,
          slug: category.slug,
          parentId: category.parentId,
          description: category.description || undefined,
          tagline: category.tagline || undefined,
          badge: category.badge || undefined,
          highlights: category.highlights || undefined,
        }}
        totalProducts={catalogData.totalProducts}
      />

      {/* Category Specific Feature Banner for Hand Tools */}
      <section id="handtools-guide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="glass-panel-elevated border border-light-300 p-6 sm:p-8 rounded-3xl shadow-md bg-white/90 backdrop-blur-2xl">
          <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide mb-3 flex items-center gap-2 text-dark-900">
            <Wrench className="w-5 h-5 text-brand-red" />
            <span>Forged Steel & Ergonomics Quality Standard</span>
          </h2>
          <p className="text-xs sm:text-sm text-dark-700 mb-6 max-w-3xl leading-relaxed font-medium">
            Every KOREVA hand tool is forged from premium SK5 high-carbon alloy steel or manganese steel, treated with induction edge hardening for maximum sharpness retention.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-light-200 pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red shrink-0 shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-dark-900 uppercase">SK5 Alloy Steel</h3>
                <p className="text-xs text-dark-600 mt-0.5 font-medium leading-relaxed">
                  High-hardness Japanese SK5 carbon steel blades hold an ultra-sharp cutting edge through thousands of prunings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red shrink-0 shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-dark-900 uppercase">Induction Hardening</h3>
                <p className="text-xs text-dark-600 mt-0.5 font-medium leading-relaxed">
                  Heat-treated teeth and cutting edges prevent deformation when working thick branches.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red shrink-0 shadow-xs">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-dark-900 uppercase">Ergonomic Rubber Grip</h3>
                <p className="text-xs text-dark-600 mt-0.5 font-medium leading-relaxed">
                  Non-slip aluminum handles reduce hand fatigue during long field harvesting sessions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="p-8 text-center text-dark-600 font-medium">Loading hand tools...</div>}>
        <ProductCatalogClient
          products={catalogData.products}
          totalProducts={catalogData.totalProducts}
          currentPage={catalogData.currentPage}
          totalPages={catalogData.totalPages}
          pageSize={catalogData.pageSize}
          availableFilters={catalogData.availableFilters}
          initialCategory={category.name}
        />
      </Suspense>
    </main>
  );
}
