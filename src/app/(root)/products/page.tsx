import React, { Suspense } from "react";
import { Metadata } from "next";
import ProductCatalogClient from "@/components/ProductCatalogClient";
import { exampleProducts, exampleCategories, exampleVariants } from "@/lib/details";

export const metadata: Metadata = {
  title: "Products | KOREVA",
  description: "Browse our extensive catalog of tractors and agricultural equipment.",
};

export default function ProductsPage() {
  // Pre-render logic: map relational static data into a flat array for the client
  const mappedProducts = exampleProducts
    .filter((product) => product.isPublished)
    .map((product) => {
      // Find category
      const category = exampleCategories.find((c) => c.id === product.categoryId);
      
      // Find variants
      const productVariants = exampleVariants.filter((v) => v.productId === product.id);
      
      // Get primary variant or fallback to first
      const defaultVariant = productVariants.find((v) => v.id === product.defaultVariantId) || productVariants[0];

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        categoryName: category?.name || "Uncategorized",
        tags: product.tags,
        price: defaultVariant ? parseFloat(defaultVariant.price) : 0,
        image: product.coverImage || (defaultVariant?.images?.[0]) || "/placeholder.png", // fallback image
        variantsCount: productVariants.length,
        technicalDetails: defaultVariant ? defaultVariant.technicalDetails : {},
      };
    });

  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="p-8 text-center">Loading catalog...</div>}>
        <ProductCatalogClient initialProducts={mappedProducts} />
      </Suspense>
    </main>
  );
}
