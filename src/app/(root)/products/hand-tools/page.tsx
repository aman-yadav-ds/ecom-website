import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCatalogClient from "@/components/ProductCatalogClient";
import CategoryHeader from "@/components/CategoryHeader";
import { exampleProducts, exampleCategories, exampleVariants } from "@/lib/details";
import { Wrench, Shield, CheckCircle, Award } from "lucide-react";

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
    <main className="min-h-screen bg-white font-jost">
      <CategoryHeader category={category} totalProducts={mappedProducts.length} />
      
      {/* Category Specific Feature Banner for Hand Tools */}
      <section id="handtools-guide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-gradient-to-r from-stone-900 to-amber-950 text-white rounded-lg p-6 sm:p-8 shadow-lg border border-amber-800/50">
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-amber-400" />
            Forged Steel & Ergonomics Quality Standard
          </h2>
          <p className="text-sm text-amber-100 mb-6 max-w-3xl leading-relaxed">
            Every KOREVA hand tool is forged from premium SK5 high-carbon alloy steel or manganese steel, treated with induction edge hardening for maximum sharpness retention.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-amber-900/80 pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-900/50 rounded-sm text-amber-300">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase">SK5 Alloy Steel</h3>
                <p className="text-xs text-amber-200 mt-0.5">High-hardness Japanese SK5 carbon steel blades hold an ultra-sharp cutting edge through thousands of prunings.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-900/50 rounded-sm text-amber-300">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase">Anti-Sap & Anti-Rust</h3>
                <p className="text-xs text-amber-200 mt-0.5">Teflon and titanium protective coatings prevent sap sticking, friction, and environmental corrosion.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-900/50 rounded-sm text-amber-300">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase">Ergonomic Comfort</h3>
                <p className="text-xs text-amber-200 mt-0.5">Non-slip rubberized handles and cushioned shock absorbers reduce hand fatigue during long field work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="p-8 text-center">Loading hand tools...</div>}>
        <ProductCatalogClient initialProducts={mappedProducts} initialCategory={category.name} />
      </Suspense>
    </main>
  );
}
