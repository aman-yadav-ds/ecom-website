import { getDb } from "@/db";
import { ALLOWED_FILTERS, CATEGORY_FILTERS } from "@/lib/filter";
import { ProductListingItem } from "@/components/ProductCatalogClient";

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
  categorySlug?: string
): Promise<CatalogResult> {
  const db = await getDb();

  // 1. Resolve category filter if accessing a category-specific page
  let categoryIdFilter: string | undefined = undefined;
  let categoryNameFromSlug: string | undefined = undefined;

  if (categorySlug) {
    const category = await db.query.categories.findFirst({
      where: (c, { eq }) => eq(c.slug, categorySlug),
    });
    if (category) {
      categoryIdFilter = category.id;
      categoryNameFromSlug = category.name;
    }
  }

  // 2. Fetch published products with category and variant details from D1
  const rawProducts = await db.query.products.findMany({
    where: (products, { eq, and }) =>
      categoryIdFilter
        ? and(eq(products.isPublished, true), eq(products.categoryId, categoryIdFilter))
        : eq(products.isPublished, true),
    with: {
      category: true,
      variants: true,
    },
  });

  const allProductsMapped: ProductListingItem[] = rawProducts.map((product) => {
    const category = product.category;
    const productVariants = product.variants || [];
    const defaultVariant =
      productVariants.find((v) => v.id === product.defaultVariantId) ||
      productVariants[0];

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
      categoryName: category?.name || "Uncategorized",
      tags: product.tags || [],
      price: defaultVariant ? parseFloat(defaultVariant.price) : 0,
      image: product.coverImage || defaultVariant?.images?.[0] || "/placeholder.png",
      imageAlt: product.coverImageAlt || defaultVariant?.imagesAlt?.[0] || product.name,
      variantsCount: productVariants.length,
      technicalDetails: defaultVariant ? defaultVariant.technicalDetails : {},
      allVariantsTechnicalDetails: productVariants.map((v) => v.technicalDetails),
    };
  });

  // 3. Compute available sidebar filters dynamically for current context
  const activeCategoryParam = (queryParams.category as string) || categoryNameFromSlug || categorySlug;
  const isMainProductsPage = !activeCategoryParam || activeCategoryParam === "All";

  const filtersMap: Record<string, Set<string>> = {};

  if (isMainProductsPage) {
    const categorySet = new Set<string>();
    allProductsMapped.forEach((p) => {
      if (p.categoryName) categorySet.add(p.categoryName);
    });
    if (categorySet.size > 1) {
      filtersMap["Category"] = categorySet;
    }
  }

  const allowedKeys =
    activeCategoryParam && CATEGORY_FILTERS[activeCategoryParam]
      ? CATEGORY_FILTERS[activeCategoryParam]
      : ALLOWED_FILTERS;

  allProductsMapped.forEach((product) => {
    if (
      activeCategoryParam &&
      activeCategoryParam !== "All" &&
      product.categoryName !== activeCategoryParam &&
      product.categoryId !== activeCategoryParam &&
      product.categoryName?.toLowerCase() !== activeCategoryParam.toLowerCase() &&
      product.categoryId?.toLowerCase() !== activeCategoryParam.toLowerCase()
    ) {
      return;
    }

    const variantsTech =
      product.allVariantsTechnicalDetails && product.allVariantsTechnicalDetails.length > 0
        ? product.allVariantsTechnicalDetails
        : [product.technicalDetails];

    variantsTech.forEach((tech) => {
      Object.entries(tech || {}).forEach(([key, value]) => {
        if (!value) return;
        if (!allowedKeys.includes(key)) return;
        if (!filtersMap[key]) {
          filtersMap[key] = new Set();
        }
        filtersMap[key].add(value);
      });
    });
  });

  const availableFilters: Record<string, string[]> = {};
  Object.keys(filtersMap).forEach((key) => {
    const sortedValues = Array.from(filtersMap[key]).sort();
    if (sortedValues.length > 1) {
      availableFilters[key] = sortedValues;
    }
  });

  // 4. Extract Search, Sort, and Technical Filter values from queryParams
  const searchQuery = typeof queryParams.search === "string" ? queryParams.search.toLowerCase().trim() : "";
  const sortMode = typeof queryParams.sort === "string" ? queryParams.sort : "featured";

  const activeTechnicalFilters: Record<string, string[]> = {};
  Object.keys(queryParams).forEach((key) => {
    if (key !== "search" && key !== "sort" && key !== "page" && key !== "limit") {
      const val = queryParams[key];
      if (val !== undefined && val !== null && val !== "") {
        activeTechnicalFilters[key] = Array.isArray(val)
          ? (val as string[])
          : [val as string];
      }
    }
  });

  // 5. Apply filtering across all products in database
  let filtered = allProductsMapped.filter((product) => {
    // Search query matching
    if (searchQuery) {
      const nameMatch = product.name.toLowerCase().includes(searchQuery);
      const tagMatch = product.tags.some((tag) => tag.toLowerCase().includes(searchQuery));
      const descMatch = product.description.toLowerCase().includes(searchQuery);
      if (!nameMatch && !tagMatch && !descMatch) {
        return false;
      }
    }

    // Technical / Category filter matching
    for (const [filterKey, selectedValues] of Object.entries(activeTechnicalFilters)) {
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

  // 6. Apply sorting
  if (sortMode === "price_asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortMode === "price_desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  // 7. Apply pagination
  const pageSize = Number(queryParams.limit) || 12;
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
