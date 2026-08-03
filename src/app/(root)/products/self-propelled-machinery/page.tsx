import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCatalogClient from "@/components/ProductCatalogClient";
import CategoryHeader from "@/components/CategoryHeader";
import { exampleProducts, exampleCategories, exampleVariants } from "@/lib/details";

export const metadata: Metadata = {
  title: "Self Propelled Machinery | KOREVA Industrial Equipment",
  description: "Explore walk-behind power weeders, power reapers, and brush cutters for efficient agricultural field operations.",
};

export default function SelfPropelledMachineryPage() {
  const category = exampleCategories.find((c) => c.slug === "self-propelled-machinery");
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
        imageAlt: product.coverImageAlt || (defaultVariant?.imagesAlt?.[0]) || product.name,
        variantsCount: productVariants.length,
        technicalDetails: defaultVariant ? defaultVariant.technicalDetails : {},
      };
    });

  return (
    <main className="min-h-screen bg-[#fbfbfb] text-dark-900 font-jost">
      <CategoryHeader category={category} totalProducts={mappedProducts.length} />
      <Suspense fallback={<div className="p-8 text-center text-dark-600 font-medium">Loading self-propelled machinery...</div>}>
        <ProductCatalogClient initialProducts={mappedProducts} initialCategory={category.name} />
      </Suspense>
    </main>
  );
}
