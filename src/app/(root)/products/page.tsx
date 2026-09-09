import React, { Suspense } from "react";
import { Metadata } from "next";
import ProductCatalogClient from "@/components/ProductCatalogClient";
import CatalogHero from "@/components/catalog/CatalogHero";
import CategoryExplorer from "@/components/catalog/CategoryExplorer";
import TrustSection from "@/components/catalog/TrustSection";
import { getCatalogData } from "@/lib/catalog";

import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildProductMetadata({
  title: formatPageSeoTitle("Agricultural Equipments & Food Processing Machinery Catalog"),
  description: formatPageSeoDescription(
    "Browse the official Koreva9 heavy agricultural equipment catalog: Disc Harrows, Rotavators, Laser Land Levellers, Straw Reapers, Power Weeders, STOU Lubricants, and SK5 Hand Tools."
  ),
  canonicalUrl: "/products",
  keywords: [
    "Koreva Machines",
    "Koreva Agriculture",
    "Koreva Global LLP",
    "Koreva9",
    "Power Weeder Catalog",
    "Disc Harrow Catalog",
    "Rotavator India",
    "Agricultural Machinery India",
    "Food Processing Units",
  ],
});

export const revalidate = 60;

function CatalogSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse font-jost">
      <div className="h-14 bg-light-200 rounded-full mb-8"></div>
      <div className="flex gap-8">
        <div className="hidden md:block w-64 h-96 bg-light-200 rounded-2xl"></div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-light-200 rounded-2xl p-4 h-80 flex flex-col justify-between">
              <div className="w-full h-44 bg-light-200 rounded-xl mb-3"></div>
              <div className="h-4 bg-light-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-light-200 rounded w-1/3 mb-4"></div>
              <div className="flex justify-between items-center pt-2 border-t border-light-200">
                <div className="h-5 bg-light-200 rounded w-1/3"></div>
                <div className="w-8 h-8 rounded-full bg-light-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = (await searchParams) || {};
  const catalogData = await getCatalogData(resolvedParams);

  return (
    <main className="min-h-screen bg-[#fafafa] text-dark-900 font-jost">
      {/* 1. Hero Section */}
      <CatalogHero />

      {/* 2. Category Explorer */}
      <CategoryExplorer />

      {/* 3. Main Product Catalog */}
      <Suspense fallback={<CatalogSkeleton />}>
        <ProductCatalogClient
          products={catalogData.products}
          totalProducts={catalogData.totalProducts}
          currentPage={catalogData.currentPage}
          totalPages={catalogData.totalPages}
          pageSize={catalogData.pageSize}
          availableFilters={catalogData.availableFilters}
        />
      </Suspense>

      {/* 4. Trust & Certification Section */}
      <TrustSection />
    </main>
  );
}
