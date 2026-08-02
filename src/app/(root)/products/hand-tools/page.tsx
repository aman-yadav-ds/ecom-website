import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCatalogClient from "@/components/ProductCatalogClient";
import CategoryHeader from "@/components/CategoryHeader";
import { exampleProducts, exampleCategories, exampleVariants } from "@/lib/details";
import { Wrench, Shield, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Agricultural & Garden Hand Tools | KOREVA Tools",
  description: "Explore drop-forged SK5 alloy steel secateurs, pruners, and high-carbon manganese steel harvesting sickles with ergonomic handles.",
};

export default function HandToolsPage() {
  const category = exampleCategories.find((c) => c.slug === "hand-tools");
  if (!category) notFound();

  const mappedProducts = exampleProducts
    .filter((product) => product.isPublished && product.categoryId === category.id)
    .map((product) => {
      const productVariants = exampleVariants.filter((v) => v.productId === product.id);
      const defaultVariant = productVariants.find((v) => v.id === product.defaultVariantId) || productVariants[0];

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        categoryName: category.name,
        tags: product.tags,
        price: defaultVariant ? parseFloat(defaultVariant.price) : 0,
        image: product.coverImage || (defaultVariant?.images?.[0]) || "/placeholder.png",
        variantsCount: productVariants.length,
        technicalDetails: defaultVariant ? defaultVariant.technicalDetails : {},
      };
    });

  return (
    <main className="min-h-screen bg-[#fbfbfb] text-dark-900 font-jost">
      <CategoryHeader category={category} totalProducts={mappedProducts.length} />
      
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
                <p className="text-xs text-dark-600 mt-0.5 font-medium leading-relaxed">High-hardness Japanese SK5 carbon steel blades hold an ultra-sharp cutting edge through thousands of prunings.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red shrink-0 shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-dark-900 uppercase">Induction Hardening</h3>
                <p className="text-xs text-dark-600 mt-0.5 font-medium leading-relaxed">Heat-treated teeth and cutting edges prevent deformation when working thick branches.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red shrink-0 shadow-xs">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-dark-900 uppercase">Ergonomic Rubber Grip</h3>
                <p className="text-xs text-dark-600 mt-0.5 font-medium leading-relaxed">Non-slip aluminum handles reduce hand fatigue during long field harvesting sessions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="p-8 text-center text-dark-600 font-medium">Loading hand tools...</div>}>
        <ProductCatalogClient initialProducts={mappedProducts} initialCategory={category.name} />
      </Suspense>
    </main>
  );
}
