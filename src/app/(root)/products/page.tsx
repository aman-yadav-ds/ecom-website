import React, { Suspense } from "react";
import { Metadata } from "next";
import ProductCatalogClient from "@/components/ProductCatalogClient";
import CategoryGridShowcase from "@/components/CategoryGridShowcase";
import { exampleProducts, exampleCategories, exampleVariants } from "@/lib/details";

export const metadata: Metadata = {
  title: "Agricultural Products & Implements Catalog | Koreva9",
  description:
    "Browse Koreva9's complete agricultural machinery catalog including Power Weeders, Laser Land Levellers, Disc Harrows, Reapers, STOU Lubricants, and SK5 Hand Tools.",
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
        variantsCount: productVariants.length,
        technicalDetails: defaultVariant ? defaultVariant.technicalDetails : {},
      };
    });

  return (
    <main className="min-h-screen bg-white font-jost">
      {/* Main Catalog Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-neutral-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-brand-red shadow-lg">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
            KOREVA Machinery & Supplies
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase mt-2 mb-3">
            Industrial Equipment & Field Supplies
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl font-medium leading-relaxed">
            High-yield tractor attachments, autonomous self-propelled machinery, food processing units, certified thermal lubricants, and forged SK5 hand tools.
          </p>
        </div>
      </section>

      {/* Visual Category Cards Grid Showcase */}
      <CategoryGridShowcase />

      {/* Main Product Catalog */}
      <Suspense fallback={<div className="p-8 text-center">Loading catalog...</div>}>
        <ProductCatalogClient initialProducts={mappedProducts} />
      </Suspense>
    </main>
  );
}
