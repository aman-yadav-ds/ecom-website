export interface ProductSpecRow {
  label: string;
  values?: string[];
  variant1Value?: string;
  variant2Value?: string;
  highlight?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  code: string;
  tagline: string;
  image: string;
  imageAlt: string;
  badge?: string;
  keyStats: {
    label: string;
    value: string;
    sub?: string;
  }[];
}

export interface ShowcaseProduct {
  id: string;
  numericIndex: string; // e.g., "01", "02", "03"
  title: string;
  category: string;
  categorySlug: string;
  productSlug: string;
  tagline: string;
  badge: string;
  description?: string;
  bgWatermark: string; // e.g. "SUPER SEEDER"
  accentColor: string; // e.g. "#C40000"
  variants: ProductVariant[];
  specs: ProductSpecRow[];
  rfqDefaults: {
    productId: string;
    productName: string;
    categoryName: string;
  };
}
