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
    <main className="min-h-screen bg-white font-jost">
      <CategoryHeader category={category} totalProducts={mappedProducts.length} />
      
      {/* Category Specific Feature Banner for Lubricants */}
      <section id="lubricants-guide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-lg p-6 sm:p-8 shadow-lg border border-emerald-700/50">
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
            <Droplet className="w-6 h-6 text-emerald-400" />
            Lubricant Technical Application Guide
          </h2>
          <p className="text-sm text-emerald-100 mb-6 max-w-3xl leading-relaxed">
            KOREVA STOU fluids combine tractor engine oil, hydraulic fluid, wet-brake protection, and transmission fluid into a single high-performance formulation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-emerald-800/80 pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-800/50 rounded-sm text-emerald-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase">Engine Protection</h3>
                <p className="text-xs text-emerald-200 mt-0.5">High thermal oxidation resistance prevents deposit buildup in high-heat field conditions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-800/50 rounded-sm text-emerald-300">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase">ISO & API Standard</h3>
                <p className="text-xs text-emerald-200 mt-0.5">Fully certified for CJ-4, GL-4, and JASO MA2 standards for universal multi-machine compatibility.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-800/50 rounded-sm text-emerald-300">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase">Bulk & Fleet Supply</h3>
                <p className="text-xs text-emerald-200 mt-0.5">Available in 5L cans, 20L buckets, and 210L commercial drums for farms and dealer hubs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="p-8 text-center">Loading lubricants...</div>}>
        <ProductCatalogClient initialProducts={mappedProducts} initialCategory={category.name} />
      </Suspense>
    </main>
  );
}
