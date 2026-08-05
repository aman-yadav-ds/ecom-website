import { ALLOWED_FILTERS, CATEGORY_FILTERS } from "@/lib/filter";
import { ProductListingItem } from "@/components/ProductCatalogClient";
import { getCachedCategories, getCachedPublishedProducts } from "@/lib/cached-queries";
import type { Category } from "@/db/schema";

const getCachedRawProducts = async (categoryIdFilter?: string) => {
  const all = await getCachedPublishedProducts();
  if (!categoryIdFilter) return all;
  return all.filter((p) => p.categoryId === categoryIdFilter);
};

export interface CatalogQueryParams {
  search?: string;
  sort?: string;
  page?: string | number;
  limit?: string | number;
  category?: string;
  [key: string]: unknown;
}

export interface CatalogResult {
  products: ProductListingItem[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  availableFilters: Record<string, string[]>;
}

/**
 * Server-side helper to query, filter, search, sort, and paginate products from Cloudflare D1.
 */
export async function getCatalogData(
  queryParams: CatalogQueryParams = {},
  categorySlug?: string,
  preloadedCategory?: { id: string; name: string } | null
): Promise<CatalogResult> {
  let categoryIdFilter: string | undefined = preloadedCategory?.id;
  let categoryNameFromSlug: string | undefined = preloadedCategory?.name;

  if (categorySlug && !preloadedCategory) {
    const categoriesList = await getCachedCategories();
    const category = categoriesList.find((c: Category) => c.slug === categorySlug);
    if (category) {
      categoryIdFilter = category.id;
      categoryNameFromSlug = category.name;
    }
  }

  // Fetch published products (cached)
  const rawProducts = await getCachedRawProducts(categoryIdFilter);

  const activeCategoryParam = (queryParams.category as string) || categoryNameFromSlug || categorySlug;
  const isMainProductsPage = !activeCategoryParam || activeCategoryParam === "All";

  const allowedKeys =
    activeCategoryParam && CATEGORY_FILTERS[activeCategoryParam]
      ? CATEGORY_FILTERS[activeCategoryParam]
      : ALLOWED_FILTERS;
  const allowedKeysSet = new Set(allowedKeys);

  const filtersMap: Record<string, Set<string>> = {};
  const categorySet = isMainProductsPage ? new Set<string>() : null;

  // Single-pass mapping and filter aggregation
  const allProductsMapped: ProductListingItem[] = new Array(rawProducts.length);

  for (let i = 0; i < rawProducts.length; i++) {
    const product = rawProducts[i];
    const category = product.category;
    const productVariants = product.variants || [];

    let defaultVariant = productVariants[0];
    if (product.defaultVariantId) {
      for (let j = 0; j < productVariants.length; j++) {
        if (productVariants[j].id === product.defaultVariantId) {
          defaultVariant = productVariants[j];
          break;
        }
      }
    }

    const categoryName = category?.name || "Uncategorized";
    if (categorySet && categoryName) {
      categorySet.add(categoryName);
    }

    const allVariantsTech = productVariants.map((v) => v.technicalDetails);

    const item: ProductListingItem = {
      id: product.id,
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
      categoryName,
      tags: product.tags || [],
      price: defaultVariant ? parseFloat(defaultVariant.price) : 0,
      image: product.coverImage || defaultVariant?.images?.[0] || "/placeholder.png",
      imageAlt: product.coverImageAlt || defaultVariant?.imagesAlt?.[0] || product.name,
      variantsCount: productVariants.length,
      technicalDetails: defaultVariant ? defaultVariant.technicalDetails : {},
      allVariantsTechnicalDetails: allVariantsTech,
    };

    allProductsMapped[i] = item;

    // Aggregate filters if product matches current category context
    const matchesCategoryContext =
      !activeCategoryParam ||
      activeCategoryParam === "All" ||
      categoryName === activeCategoryParam ||
      product.categoryId === activeCategoryParam ||
      categoryName.toLowerCase() === activeCategoryParam.toLowerCase() ||
      product.categoryId.toLowerCase() === activeCategoryParam.toLowerCase();

    if (matchesCategoryContext) {
      const variantsTech = allVariantsTech.length > 0 ? allVariantsTech : [item.technicalDetails];
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

  // Extract query filters
  const searchQuery = typeof queryParams.search === "string" ? queryParams.search.toLowerCase().trim() : "";
  const sortMode = typeof queryParams.sort === "string" ? queryParams.sort : "featured";

  const activeTechnicalFiltersEntries: [string, string[]][] = [];
  const qKeys = Object.keys(queryParams);
  for (let i = 0; i < qKeys.length; i++) {
    const key = qKeys[i];
    if (key !== "search" && key !== "sort" && key !== "page" && key !== "limit") {
      const val = queryParams[key];
      if (val !== undefined && val !== null && val !== "") {
        activeTechnicalFiltersEntries.push([
          key,
          Array.isArray(val) ? (val as string[]) : [val as string],
        ]);
      }
    }
  }

  // Filter matching
  const filtered = allProductsMapped.filter((product) => {
    if (searchQuery) {
      const nameMatch = product.name.toLowerCase().includes(searchQuery);
      const tagMatch = product.tags.some((tag) => tag.toLowerCase().includes(searchQuery));
      const descMatch = product.description.toLowerCase().includes(searchQuery);
      if (!nameMatch && !tagMatch && !descMatch) {
        return false;
      }
    }

    for (let f = 0; f < activeTechnicalFiltersEntries.length; f++) {
      const [filterKey, selectedValues] = activeTechnicalFiltersEntries[f];
      if (!selectedValues || selectedValues.length === 0) continue;

      if (filterKey.toLowerCase() === "category") {
        if (!selectedValues.includes(product.categoryName)) {
          return false;
        }
      } else {
        const variantsTech =
          product.allVariantsTechnicalDetails && product.allVariantsTechnicalDetails.length > 0
            ? product.allVariantsTechnicalDetails
            : [product.technicalDetails];

        const matchesFilter = variantsTech.some((tech) => {
          const productDetailValue = tech[filterKey];
          return productDetailValue && selectedValues.includes(productDetailValue);
        });

        if (!matchesFilter) {
          return false;
        }
      }
    }

    return true;
  });

  if (sortMode === "price_asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortMode === "price_desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  const pageSize = Math.min(Math.max(1, Number(queryParams.limit) || 12), 12);
  const totalProducts = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));

  const rawPage = Number(queryParams.page) || 1;
  const currentPage = Math.min(Math.max(1, rawPage), totalPages);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filtered.slice(startIndex, startIndex + pageSize);

  return {
    products: paginatedProducts,
    totalProducts,
    currentPage,
    totalPages,
    pageSize,
    availableFilters,
  };
}
