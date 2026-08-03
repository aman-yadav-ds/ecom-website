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
  website?: string;
  assortment: string[];
  services: string[];
  isPremiumHub: boolean;
}
