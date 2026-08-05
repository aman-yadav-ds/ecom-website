import { getDb } from "@/db";
import { unstable_cache } from "next/cache";
import type { Category, ProductWithRelations, NewsArticle, Dealer, Variant } from "@/db/schema";

const globalForCache = globalThis as unknown as {
  __productsFetchPromise?: Promise<ProductWithRelations[]>;
  __categoriesFetchPromise?: Promise<Category[]>;
  __newsFetchPromise?: Promise<NewsArticle[]>;
  __dealersFetchPromise?: Promise<Dealer[]>;
};

/**
 * Cached fetch for published products with category and variants.
 * Revalidates every 1 hour (3600s) or when 'products' tag is revalidated.
 * Uses promise deduplication to prevent concurrent miniflare D1 query collisions during build.
 */
export const getCachedPublishedProducts = unstable_cache(
  async (): Promise<ProductWithRelations[]> => {
    if (globalForCache.__productsFetchPromise) {
      return globalForCache.__productsFetchPromise;
    }

    globalForCache.__productsFetchPromise = (async () => {
      try {
        const db = await getDb();
        const productsList = await db.query.products.findMany({
          where: (products, { eq }) => eq(products.isPublished, true),
        });
        const categoriesList = await db.query.categories.findMany();
        const variantsList = await db.query.variants.findMany();

        const categoryMap = new Map<string, Category>(categoriesList.map((c) => [c.id, c]));
        const variantsByProduct = new Map<string, Variant[]>();
        for (let i = 0; i < variantsList.length; i++) {
          const v = variantsList[i];
          let list = variantsByProduct.get(v.productId);
          if (!list) {
            list = [];
            variantsByProduct.set(v.productId, list);
          }
          list.push(v);
        }

        return productsList.map((p) => ({
          ...p,
          category: categoryMap.get(p.categoryId) || null,
          variants: variantsByProduct.get(p.id) || [],
        }));
      } finally {
        globalForCache.__productsFetchPromise = undefined;
      }
    })();

    return globalForCache.__productsFetchPromise;
  },
  ["cached-published-products-key"],
  { revalidate: 3600, tags: ["products"] }
);

/**
 * Cached fetch for all categories.
 */
export const getCachedCategories = unstable_cache(
  async (): Promise<Category[]> => {
    if (globalForCache.__categoriesFetchPromise) {
      return globalForCache.__categoriesFetchPromise;
    }

    globalForCache.__categoriesFetchPromise = (async () => {
      try {
        const db = await getDb();
        return await db.query.categories.findMany();
      } finally {
        globalForCache.__categoriesFetchPromise = undefined;
      }
    })();

    return globalForCache.__categoriesFetchPromise;
  },
  ["cached-categories-key"],
  { revalidate: 3600, tags: ["categories"] }
);

/**
 * Cached fetch for all news articles.
 */
export const getCachedNewsArticles = unstable_cache(
  async (): Promise<NewsArticle[]> => {
    if (globalForCache.__newsFetchPromise) {
      return globalForCache.__newsFetchPromise;
    }

    globalForCache.__newsFetchPromise = (async () => {
      try {
        const db = await getDb();
        return await db.query.newsArticles.findMany();
      } finally {
        globalForCache.__newsFetchPromise = undefined;
      }
    })();

    return globalForCache.__newsFetchPromise;
  },
  ["cached-news-articles-key"],
  { revalidate: 3600, tags: ["news"] }
);

/**
 * Cached fetch for all authorized dealers.
 */
export const getCachedDealers = unstable_cache(
  async (): Promise<Dealer[]> => {
    if (globalForCache.__dealersFetchPromise) {
      return globalForCache.__dealersFetchPromise;
    }

    globalForCache.__dealersFetchPromise = (async () => {
      try {
        const db = await getDb();
        return await db.query.dealers.findMany();
      } finally {
        globalForCache.__dealersFetchPromise = undefined;
      }
    })();

    return globalForCache.__dealersFetchPromise;
  },
  ["cached-dealers-key"],
  { revalidate: 3600, tags: ["dealers"] }
);
