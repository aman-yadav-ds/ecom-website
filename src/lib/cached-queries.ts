import { getDb } from "@/db";
import { unstable_cache } from "next/cache";

/**
 * Cached fetch for published products with category and variants.
 * Revalidates every 1 hour (3600s) or when 'products' tag is revalidated.
 */
export const getCachedPublishedProducts = unstable_cache(
  async () => {
    const db = await getDb();
    return db.query.products.findMany({
      where: (products, { eq }) => eq(products.isPublished, true),
      with: {
        category: true,
        variants: true,
      },
    });
  },
  ["cached-published-products-key"],
  { revalidate: 3600, tags: ["products"] }
);

/**
 * Cached fetch for all categories.
 * Revalidates every 1 hour (3600s) or when 'categories' tag is revalidated.
 */
export const getCachedCategories = unstable_cache(
  async () => {
    const db = await getDb();
    return db.query.categories.findMany();
  },
  ["cached-categories-key"],
  { revalidate: 3600, tags: ["categories"] }
);

/**
 * Cached fetch for all news articles.
 * Revalidates every 1 hour (3600s) or when 'news' tag is revalidated.
 */
export const getCachedNewsArticles = unstable_cache(
  async () => {
    const db = await getDb();
    return db.query.newsArticles.findMany();
  },
  ["cached-news-articles-key"],
  { revalidate: 3600, tags: ["news"] }
);

/**
 * Cached fetch for all authorized dealers.
 * Revalidates every 1 hour (3600s) or when 'dealers' tag is revalidated.
 */
export const getCachedDealers = unstable_cache(
  async () => {
    const db = await getDb();
    return db.query.dealers.findMany();
  },
  ["cached-dealers-key"],
  { revalidate: 3600, tags: ["dealers"] }
);
