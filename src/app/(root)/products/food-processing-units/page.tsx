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
  title: formatPageSeoTitle("Food Processing Machinery & Units"),
  description: formatPageSeoDescription(
    "Commercial stainless steel pulverisers, mini rice mills, and food processing machinery engineered by official manufacturer Koreva9."
  ),
  canonicalUrl: "/products/food-processing-units",
  keywords: ["Food Processing Machinery", "Mini Rice Mill", "Grain Pulveriser", "Agro Processing"],
});

interface PageProps {
  searchParams?: Promise<CatalogQueryParams>;
}

export default async function FoodProcessingUnitsPage({ searchParams }: PageProps) {
  const db = await getDb();
  const category = await db.query.categories.findFirst({
    where: (c, { eq }) => eq(c.slug, "food-processing-units"),
  });

  if (!category) notFound();

  const resolvedSearchParams = (await searchParams) || {};
  const catalogData = await getCatalogData(resolvedSearchParams, "food-processing-units");

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
      <Suspense fallback={<div className="p-8 text-center text-dark-600 font-medium">Loading food processing units...</div>}>
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
