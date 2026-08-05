import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCatalogClient from "@/components/ProductCatalogClient";
import CategoryHeader from "@/components/CategoryHeader";
import { getDb } from "@/db";
import { getCatalogData, CatalogQueryParams } from "@/lib/catalog";

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

interface PageProps {
  searchParams?: Promise<CatalogQueryParams>;
}

export default async function TractorAttachmentsPage({ searchParams }: PageProps) {
  const db = await getDb();
  const category = await db.query.categories.findFirst({
    where: (c, { eq }) => eq(c.slug, "tractor-attachments"),
  });

  if (!category) notFound();

  const resolvedSearchParams = (await searchParams) || {};
  const catalogData = await getCatalogData(resolvedSearchParams, "tractor-attachments");

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
