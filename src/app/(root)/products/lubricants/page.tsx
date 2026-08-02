import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCatalogClient from "@/components/ProductCatalogClient";
import CategoryHeader from "@/components/CategoryHeader";
import { exampleProducts, exampleCategories, exampleVariants } from "@/lib/details";
import { Droplet, ShieldCheck, FileCheck, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Lubricants & Engine Oils | KOREVA Industrial Supplies",
  description: "Explore ISO 9001 certified STOU universal tractor oil and 4T heavy-duty engine oils for optimal thermal stability and wear protection.",
};

export default function LubricantsPage() {
  const category = exampleCategories.find((c) => c.slug === "lubricants");
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
      
      {/* Category Specific Feature Banner for Lubricants */}
      <section id="lubricants-guide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="glass-panel-elevated border border-light-300 p-6 sm:p-8 rounded-3xl shadow-md bg-white/90 backdrop-blur-2xl">
          <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide mb-3 flex items-center gap-2 text-dark-900">
            <Droplet className="w-5 h-5 text-emerald-600" />
            <span>Lubricant Technical Application Guide</span>
          </h2>
          <p className="text-xs sm:text-sm text-dark-700 mb-6 max-w-3xl leading-relaxed font-medium">
            KOREVA STOU fluids combine tractor engine oil, hydraulic fluid, wet-brake protection, and transmission fluid into a single high-performance formulation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-light-200 pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-dark-900 uppercase">Engine Protection</h3>
                <p className="text-xs text-dark-600 mt-0.5 font-medium leading-relaxed">High thermal oxidation resistance prevents deposit buildup in high-heat field conditions.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0 shadow-xs">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-dark-900 uppercase">ISO 9001 Certified</h3>
                <p className="text-xs text-dark-600 mt-0.5 font-medium leading-relaxed">Formulated under strict quality control standards for maximum hydraulic pump life.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0 shadow-xs">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-dark-900 uppercase">Universal STOU Fit</h3>
                <p className="text-xs text-dark-600 mt-0.5 font-medium leading-relaxed">Reduces inventory overhead by serving engine, gearbox, and hydraulic systems across tractor fleets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="p-8 text-center text-dark-600 font-medium">Loading lubricants...</div>}>
        <ProductCatalogClient initialProducts={mappedProducts} initialCategory={category.name} />
      </Suspense>
    </main>
  );
}
