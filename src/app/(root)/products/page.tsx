import React, { Suspense } from "react";
import { Metadata } from "next";
import ProductCatalogClient from "@/components/ProductCatalogClient";
import CategoryGridShowcase from "@/components/CategoryGridShowcase";
import { exampleProducts, exampleCategories, exampleVariants } from "@/lib/details";
import { Tractor } from "lucide-react";

export const metadata: Metadata = {
  title: "Koreva Machines & Agricultural Products Catalog | Koreva Global LLP (Koreva9)",
  description:
    "Browse the full lineup of Koreva Machines and Koreva Agriculture farm equipment by Koreva Global LLP (Koreva9), including Power Weeders, Laser Land Levellers, Disc Harrows, Reapers, STOU Lubricants, and Hand Tools.",
  keywords: [
    "Koreva Machines",
    "Koreva Agriculture",
    "Koreva Global LLP",
    "Koreva9",
    "Koreva Global",
    "Koreva",
    "Power Weeder Catalog",
    "Disc Harrow Catalog",
    "Agricultural Machinery India"
  ],
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  // Pre-render logic: map relational static data into a flat array for the client
  const mappedProducts = exampleProducts
    .filter((product) => product.isPublished)
    .map((product) => {
      const category = exampleCategories.find((c) => c.id === product.categoryId);
      const productVariants = exampleVariants.filter((v) => v.productId === product.id);
      const defaultVariant = productVariants.find((v) => v.id === product.defaultVariantId) || productVariants[0];

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        categoryName: category?.name || "Uncategorized",
        tags: product.tags,
        price: defaultVariant ? parseFloat(defaultVariant.price) : 0,
        image: product.coverImage || (defaultVariant?.images?.[0]) || "/placeholder.png",
        imageAlt: product.coverImageAlt || (defaultVariant?.imagesAlt?.[0]) || product.name,
        variantsCount: productVariants.length,
        technicalDetails: defaultVariant ? defaultVariant.technicalDetails : {},
      };
    });

  return (
    <main className="min-h-screen bg-[#fbfbfb] text-dark-900 font-jost">
      {/* Main Catalog Hero Section */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-light-300 overflow-hidden bg-[#fbfbfb]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-red/8 rounded-full filter blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-red/20 text-brand-red text-xs font-extrabold uppercase tracking-widest mb-4 shadow-xs">
            <Tractor className="w-4 h-4" />
            <span>KOREVA Machinery Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase mb-3 text-dark-900">
            Agricultural Equipments and Food Processing Machinery
          </h1>
          <p className="text-base sm:text-lg text-dark-700 max-w-3xl font-medium leading-relaxed">
            High-yield tractor attachments, autonomous self-propelled machinery, food processing units, certified thermal lubricants, and forged SK5 hand tools.
          </p>
        </div>
      </section>

      {/* Visual Category Cards Grid Showcase */}
      <CategoryGridShowcase />

      {/* Main Product Catalog */}
      <Suspense fallback={<div className="p-8 text-center text-dark-600 font-medium">Loading catalog...</div>}>
        <ProductCatalogClient initialProducts={mappedProducts} />
      </Suspense>
    </main>
  );
}
