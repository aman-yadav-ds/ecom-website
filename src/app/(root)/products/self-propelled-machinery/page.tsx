import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCatalogClient from "@/components/ProductCatalogClient";
import CategoryHeader from "@/components/CategoryHeader";
import { getCatalogData } from "@/lib/catalog";
import { getCachedCategories } from "@/lib/cached-queries";

import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildProductMetadata({
  title: formatPageSeoTitle("Self-Propelled Farm Machinery"),
  description: formatPageSeoDescription(
    "Explore self-propelled Power Weeders, Power Reapers, and Brush Cutters engineered by Koreva9 (Koreva Global LLP) for heavy-duty farming."
  ),
  canonicalUrl: "/products/self-propelled-machinery",
  keywords: ["Power Weeder", "Power Reaper", "Self Propelled Machinery", "Brush Cutter"],
});

export const revalidate = 60;

export default async function SelfPropelledMachineryPage() {
  const categoriesList = await getCachedCategories();
  const category = categoriesList.find((c) => c.slug === "self-propelled-machinery");

  if (!category) notFound();

  const catalogData = await getCatalogData({}, "self-propelled-machinery", category);

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
      <Suspense fallback={<div className="p-8 text-center text-dark-600 font-medium">Loading self-propelled machinery...</div>}>
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
