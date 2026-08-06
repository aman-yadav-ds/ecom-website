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
  title: formatPageSeoTitle("Tractor Attachments & Implements"),
  description: formatPageSeoDescription(
    "Browse heavy-duty Koreva9 tractor attachments by Koreva Global LLP including disc harrows, laser land levellers, and rotavators."
  ),
  canonicalUrl: "/products/tractor-attachments",
  keywords: ["Tractor Attachments", "Disc Harrow", "Rotavator", "Laser Leveller"],
});

export const revalidate = 60;

export default async function TractorAttachmentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = (await searchParams) || {};
  const categoriesList = await getCachedCategories();
  const category = categoriesList.find((c) => c.slug === "tractor-attachments");

  if (!category) notFound();

  const catalogData = await getCatalogData(resolvedParams, "tractor-attachments", category);

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
      <Suspense fallback={<div className="p-8 text-center text-dark-600 font-medium">Loading tractor attachments...</div>}>
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
