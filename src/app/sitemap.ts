import { MetadataRoute } from "next";
import {
  getCachedCategories,
  getCachedPublishedProducts,
  getCachedNewsArticles,
  getCachedDealers,
} from "@/lib/cached-queries";
import type { Category, ProductWithRelations, NewsArticle, Dealer } from "@/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://koreva9.com";

  // Core static routes including main company, services, and sub-guides
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/manufacturing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services-events/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    // Core Product Category Static Pages
    {
      url: `${baseUrl}/products/tractor-attachments`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/products/self-propelled-machinery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/products/food-processing-units`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/products/lubricants`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/products/hand-tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dealers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/downloads`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    // Guide Sub-Articles
    {
      url: `${baseUrl}/guides/e20-petrol`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/maintenance-checklist`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/tillage-basics`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/tractor-attachments`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/spare-parts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/warranty`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal-notice`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  let dynamicCategoryRoutes: MetadataRoute.Sitemap = [];
  let productRoutes: MetadataRoute.Sitemap = [];
  let newsRoutes: MetadataRoute.Sitemap = [];
  let dealerRoutes: MetadataRoute.Sitemap = [];

  try {
    const [categoriesList, productsList, newsList, dealersList] = await Promise.all([
      getCachedCategories(),
      getCachedPublishedProducts(),
      getCachedNewsArticles(),
      getCachedDealers(),
    ]);

    const staticUrlsSet = new Set(staticRoutes.map((r) => r.url));

    dynamicCategoryRoutes = categoriesList
      .map((category: Category) => ({
        url: `${baseUrl}/products/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }))
      .filter((route) => !staticUrlsSet.has(route.url));

    productRoutes = productsList.map((product: ProductWithRelations) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    newsRoutes = newsList.map((article: NewsArticle) => ({
      url: `${baseUrl}/news/${article.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    dealerRoutes = dealersList.map((dealer: Dealer) => ({
      url: `${baseUrl}/dealers/${dealer.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("[Sitemap Generation Error]", error);
  }

  return [...staticRoutes, ...dynamicCategoryRoutes, ...productRoutes, ...newsRoutes, ...dealerRoutes];
}
