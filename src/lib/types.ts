export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  description?: string;
  tagline?: string;
  badge?: string;
  highlights?: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  coverImageAlt?: string;
  categoryId: string;
  tags: string[];
  isPublished: boolean;
  defaultVariantId: string | null;
  maintenanceTips?: string[];

  // B2B Portfolio & RFQ Extensions (Optional for defensive rendering)
  moq?: string | null;
  leadTime?: string | null;
  isOemAvailable?: boolean | null;
  specSheetUrl?: string | null;
}

export interface Variant {
  id: string;
  name: string;
  productId: string;
  images: string[];
  imagesAlt?: string[];
  price: string;
  applicableGst: string;
  technicalDetails: Record<string, string>;

  // B2B Portfolio Extensions (Optional for defensive rendering)
  bulkPricingTiers?: { minQty: number; price: string }[] | null;
}

export interface Dealer {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  contactNo: string | null;
  email: string | null;
  mapLink: string | null;
  coordinates: {
    lat: number;
    lng: number;
  };
  website?: string | null;
  assortment: string[];
  services: string[];
  isPremiumHub: boolean;
}
