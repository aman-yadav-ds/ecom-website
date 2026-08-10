import { getDb } from "@/db";
import { unstable_cache } from "next/cache";
import { eq, and, inArray, asc } from "drizzle-orm";
import { ALLOWED_FILTERS, CATEGORY_FILTERS } from "@/lib/filter";
import {
  categories,
  products,
  variants,
  newsArticles,
  dealers,
  downloads,
  type Category,
  type ProductWithRelations,
  type NewsArticle,
  type Dealer,
  type Variant,
  type Download,
} from "@/db/schema";

const globalForCache = globalThis as unknown as {
  __productsFetchPromise?: Promise<ProductWithRelations[]>;
  __categoriesFetchPromise?: Promise<Category[]>;
  __newsFetchPromise?: Promise<NewsArticle[]>;
  __dealersFetchPromise?: Promise<Dealer[]>;
  __downloadsFetchPromise?: Promise<Download[]>;
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

        if (!productsList || productsList.length === 0) {
          return [];
        }

        const productIds = productsList.map((p) => p.id);
        const [categoriesList, variantsList] = await Promise.all([
          db.select().from(categories),
          db.select().from(variants).where(inArray(variants.productId, productIds)),
        ]);

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
      } catch (error) {
        console.error("[getCachedPublishedProducts Error]", error);
        return [];
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
 * Single product lookup by ID using cached targeted query.
 */
export const getCachedProductById = unstable_cache(
  async (id: string): Promise<ProductWithRelations | null> => {
    try {
      const db = await getDb();
      const productsList = await db
        .select()
        .from(products)
        .where(and(eq(products.isPublished, true), eq(products.id, id)))
        .limit(1);

      if (!productsList || productsList.length === 0) {
        return null;
      }

      const p = productsList[0];
      const [categoriesList, variantsList] = await Promise.all([
        db.select().from(categories).where(eq(categories.id, p.categoryId)),
        db.select().from(variants).where(eq(variants.productId, p.id)),
      ]);

      return {
        ...p,
        category: categoriesList[0] || null,
        variants: variantsList || [],
      };
    } catch {
      return null;
    }
  },
  ["cached-product-by-id-key"],
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
        return await db.select().from(categories).limit(20);
      } catch (error) {
        console.error("[getCachedCategories Error]", error);
        return [];
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
      } catch (error) {
        console.error("[getCachedNewsArticles Error]", error);
        return [];
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
      } catch (error) {
        console.error("[getCachedDealers Error]", error);
        return [];
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

/**
 * Cached fetch for category filter facets (sidebar options).
 * Computes distinct technical options per category once and caches for 1 hour.
 */
export const getCachedCategoryFacets = unstable_cache(
  async (categoryKey?: string): Promise<Record<string, string[]>> => {
    const rawProducts = await getCachedPublishedProducts();
    const activeCategoryParam = categoryKey;
    const isMainProductsPage = !activeCategoryParam || activeCategoryParam === "All";

    const allowedKeys =
      activeCategoryParam && CATEGORY_FILTERS[activeCategoryParam]
        ? CATEGORY_FILTERS[activeCategoryParam]
        : ALLOWED_FILTERS;
    const allowedKeysSet = new Set(allowedKeys);

    const filtersMap: Record<string, Set<string>> = {};
    const categorySet = isMainProductsPage ? new Set<string>() : null;

    for (let i = 0; i < rawProducts.length; i++) {
      const product = rawProducts[i];
      const categoryName = product.category?.name || "Uncategorized";
      if (categorySet && categoryName) {
        categorySet.add(categoryName);
      }
      const productVariants = product.variants || [];
      const variantsTech = productVariants.map((v) => v.technicalDetails);

      for (let vIdx = 0; vIdx < variantsTech.length; vIdx++) {
        const tech = variantsTech[vIdx] || {};
        const keys = Object.keys(tech);
        for (let kIdx = 0; kIdx < keys.length; kIdx++) {
          const key = keys[kIdx];
          const value = tech[key];
          if (value && allowedKeysSet.has(key)) {
            if (!filtersMap[key]) {
              filtersMap[key] = new Set();
            }
            filtersMap[key].add(value);
          }
        }
      }
    }

    if (categorySet && categorySet.size > 1) {
      filtersMap["Category"] = categorySet;
    }

    const availableFilters: Record<string, string[]> = {};
    const filterMapKeys = Object.keys(filtersMap);
    for (let k = 0; k < filterMapKeys.length; k++) {
      const key = filterMapKeys[k];
      const sortedValues = Array.from(filtersMap[key]).sort();
      if (sortedValues.length > 1) {
        availableFilters[key] = sortedValues;
      }
    }

    return availableFilters;
  },
  ["cached-category-facets-key"],
  { revalidate: 3600, tags: ["products", "categories"] }
);

/**
 * Cached fetch for published downloads/documents ordered by sortOrder.
 */
export const getCachedDownloads = unstable_cache(
  async (): Promise<Download[]> => {
    if (globalForCache.__downloadsFetchPromise) {
      return globalForCache.__downloadsFetchPromise;
    }

    const fetchTask = (async () => {
      try {
        const db = await getDb();
        return await db
          .select()
          .from(downloads)
          .orderBy(asc(downloads.id));
      } catch (error) {
        console.error("[getCachedDownloads Error]", error);
        return [];
      } finally {
        globalForCache.__downloadsFetchPromise = undefined;
      }
    })();

    globalForCache.__downloadsFetchPromise = fetchTask;
    return fetchTask;
  },
  ["cached-downloads-key"],
  { revalidate: 3600, tags: ["downloads"] }
);
