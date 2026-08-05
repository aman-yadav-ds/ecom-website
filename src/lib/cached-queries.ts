import { getDb } from "@/db";
import { unstable_cache } from "next/cache";
import { eq, and } from "drizzle-orm";
import {
  categories,
  products,
  variants,
  newsArticles,
  dealers,
  type Category,
  type ProductWithRelations,
  type NewsArticle,
  type Dealer,
  type Variant,
} from "@/db/schema";

const globalForCache = globalThis as unknown as {
  __productsFetchPromise?: Promise<ProductWithRelations[]>;
  __categoriesFetchPromise?: Promise<Category[]>;
  __newsFetchPromise?: Promise<NewsArticle[]>;
  __dealersFetchPromise?: Promise<Dealer[]>;
};

/**
 * Cached fetch for published products with category and variants.
 * Strict pagination enforced with limit and offset.
 * Revalidates every 1 hour (3600s) or when 'products' tag is revalidated.
 */
export const getCachedPublishedProducts = unstable_cache(
  async (limit: number = 50, offset: number = 0, categoryId?: string): Promise<ProductWithRelations[]> => {
    if (globalForCache.__productsFetchPromise && limit === 50 && offset === 0 && !categoryId) {
      return globalForCache.__productsFetchPromise;
    }

    const fetchTask = (async () => {
      try {
        const db = await getDb();
        const whereClause = categoryId
          ? and(eq(products.isPublished, true), eq(products.categoryId, categoryId))
          : eq(products.isPublished, true);

        const productsList = await db
          .select()
          .from(products)
          .where(whereClause)
          .limit(limit)
          .offset(offset);

        const categoriesList = await db.select().from(categories);
        const variantsList = await db.select().from(variants);

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
        if (limit === 50 && offset === 0 && !categoryId) {
          globalForCache.__productsFetchPromise = undefined;
        }
      }
    })();

    if (limit === 50 && offset === 0 && !categoryId) {
      globalForCache.__productsFetchPromise = fetchTask;
    }

    return fetchTask;
  },
  ["cached-published-products-key"],
  { revalidate: 3600, tags: ["products"] }
);

/**
 * Single product lookup by ID using cached products pool.
 */
export const getCachedProductById = async (id: string): Promise<ProductWithRelations | null> => {
  const all = await getCachedPublishedProducts();
  return all.find((p) => p.id === id) || null;
};

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
        return await db.select().from(categories).limit(20);
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
 * Cached fetch for news articles with strict limit.
 */
export const getCachedNewsArticles = unstable_cache(
  async (limit: number = 20, offset: number = 0): Promise<NewsArticle[]> => {
    if (globalForCache.__newsFetchPromise && limit === 20 && offset === 0) {
      return globalForCache.__newsFetchPromise;
    }

    const fetchTask = (async () => {
      try {
        const db = await getDb();
        return await db.select().from(newsArticles).limit(limit).offset(offset);
      } finally {
        if (limit === 20 && offset === 0) {
          globalForCache.__newsFetchPromise = undefined;
        }
      }
    })();

    if (limit === 20 && offset === 0) {
      globalForCache.__newsFetchPromise = fetchTask;
    }

    return fetchTask;
  },
  ["cached-news-articles-key"],
  { revalidate: 3600, tags: ["news"] }
);

/**
 * Cached fetch for authorized dealers with strict limit.
 */
export const getCachedDealers = unstable_cache(
  async (limit: number = 50, offset: number = 0): Promise<Dealer[]> => {
    if (globalForCache.__dealersFetchPromise && limit === 50 && offset === 0) {
      return globalForCache.__dealersFetchPromise;
    }

    const fetchTask = (async () => {
      try {
        const db = await getDb();
        return await db.select().from(dealers).limit(limit).offset(offset);
      } finally {
        if (limit === 50 && offset === 0) {
          globalForCache.__dealersFetchPromise = undefined;
        }
      }
    })();

    if (limit === 50 && offset === 0) {
      globalForCache.__dealersFetchPromise = fetchTask;
    }

    return fetchTask;
  },
  ["cached-dealers-key"],
  { revalidate: 3600, tags: ["dealers"] }
);
