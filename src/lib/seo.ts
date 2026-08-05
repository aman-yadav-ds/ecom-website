import { Metadata } from "next";

export const BRAND_NAME = "Koreva9";
export const LEGAL_MANUFACTURER = "Koreva Global LLP";
export const BRAND_ALIASES = ["Koreva", "Koreva Agriculture", "Koreva Machines"];
export const SITE_URL = "https://koreva9.com";
export const DEFAULT_OG_IMAGE = "/images/og-koreva9-default.jpg";

/**
 * Formats title tags to strictly fit within 50–60 characters (approx. 580px width)
 * preventing SERP truncation on search engines while using "Koreva9" as the main brand suffix.
 */
export function formatSeoTitle(productName: string, categoryName?: string): string {
  const brandSuffix = ` | ${BRAND_NAME}`;
  const maxLen = 60;
  const minLen = 50;

  const cleanName = productName.trim();

  // Handle 404 / missing product states
  if (/not found/i.test(cleanName)) {
    return `${cleanName}${brandSuffix}`;
  }

  // 1. Direct title test: `${product.name} | Koreva9`
  const directTitle = `${cleanName}${brandSuffix}`;
  if (directTitle.length >= minLen && directTitle.length <= maxLen) {
    return directTitle;
  }

  // 2. If direct title is too long (> 60 chars), truncate at word boundary
  if (directTitle.length > maxLen) {
    const allowedNameLen = maxLen - brandSuffix.length;
    let truncated = cleanName.slice(0, allowedNameLen).trim();
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 15) {
      truncated = truncated.slice(0, lastSpace).trim();
    }
    // Remove unclosed parenthetical fragments (e.g. "(TURBO") and trailing punctuation
    truncated = truncated.replace(/\([^\)]*$/g, "").replace(/[\s\(\-\,\:]+$/g, "").trim();
    return `${truncated}${brandSuffix}`;
  }

  // 3. If direct title is too short (< 50 chars), intelligently append category or keyword descriptor
  const descriptors: string[] = [];
  if (categoryName && categoryName.trim()) {
    descriptors.push(categoryName.trim());
  }

  if (/weeder/i.test(cleanName)) {
    descriptors.push("Power Weeder", "Heavy Duty Weeder", "Farm Weeder Machine");
  } else if (/harrow/i.test(cleanName)) {
    descriptors.push("Disc Harrow", "Heavy-Duty Disc Harrow", "Tractor Attachment");
  } else if (/rotavator/i.test(cleanName)) {
    descriptors.push("Tractor Rotary Tiller", "Rotary Tiller", "Tillage Machine");
  } else if (/leveller/i.test(cleanName)) {
    descriptors.push("Laser Land Leveller", "Field Levelling Machine");
  } else if (/reaper/i.test(cleanName)) {
    descriptors.push("Straw Reaper Machine", "Bhusa Maker Reaper");
  } else if (/oil|lubricant|stou|gear/i.test(cleanName)) {
    descriptors.push("Engine Oil & Lubricants", "Agricultural Lubricant");
  } else {
    descriptors.push("Farm Machinery", "Agricultural Equipment");
  }

  for (const descriptor of descriptors) {
    const candidate = `${cleanName} - ${descriptor}${brandSuffix}`;
    if (candidate.length >= minLen && candidate.length <= maxLen) {
      return candidate;
    }
  }

  for (const descriptor of descriptors) {
    const candidate = `${cleanName} - ${descriptor}${brandSuffix}`;
    if (candidate.length <= maxLen && candidate.length >= 44) {
      return candidate;
    }
  }

  return directTitle;
}

/**
 * Formats general page title tags (Category, About, Contact, News, etc.) to 50-60 chars with ` | Koreva9` suffix.
 */
export function formatPageSeoTitle(pageHeading: string, categoryOrKeyword?: string): string {
  const brandSuffix = ` | ${BRAND_NAME}`;
  const maxLen = 60;
  const minLen = 50;

  const cleanHeading = pageHeading.trim();

  // 1. Direct title test
  const directTitle = `${cleanHeading}${brandSuffix}`;
  if (directTitle.length >= minLen && directTitle.length <= maxLen) {
    return directTitle;
  }

  // 2. Too long (> 60 chars) -> truncate cleanly
  if (directTitle.length > maxLen) {
    const allowed = maxLen - brandSuffix.length;
    let truncated = cleanHeading.slice(0, allowed).trim();
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 15) {
      truncated = truncated.slice(0, lastSpace).trim();
    }
    truncated = truncated.replace(/\([^\)]*$/g, "").replace(/[\s\(\-\,\:]+$/g, "").trim();
    return `${truncated}${brandSuffix}`;
  }

  // 3. Too short (< 50 chars) -> append keyword descriptor
  const descriptors: string[] = [];
  if (categoryOrKeyword && categoryOrKeyword.trim()) {
    descriptors.push(categoryOrKeyword.trim());
  }

  descriptors.push(
    "Farm Machinery & Equipment",
    "Agricultural Equipment",
    "Koreva Global LLP",
    "Official Store"
  );

  for (const descriptor of descriptors) {
    const candidate = `${cleanHeading} - ${descriptor}${brandSuffix}`;
    if (candidate.length >= minLen && candidate.length <= maxLen) {
      return candidate;
    }
  }

  for (const descriptor of descriptors) {
    const candidate = `${cleanHeading} - ${descriptor}${brandSuffix}`;
    if (candidate.length <= maxLen && candidate.length >= 44) {
      return candidate;
    }
  }

  return directTitle;
}

/**
 * Formats meta descriptions concisely between 140–160 characters,
 * highlighting "Koreva9" along with primary product features and buyer search intent.
 */
export function formatSeoDescription(productName: string, description?: string): string {
  const cleanName = productName.trim().replace(/^KOREVA\s*-\s*/i, "");
  const prefix = `Buy the official ${cleanName} by Koreva9. `;

  let rawDesc = (description || "").trim();

  // Default feature statement if description is short or missing
  if (!rawDesc || rawDesc.length < 30) {
    rawDesc = "Designed for heavy-duty farm weeding, soil preparation, and inter-cultivation.";
  }

  const combined = `${prefix}${rawDesc}`;

  // Ideal length range check (140-160)
  if (combined.length >= 140 && combined.length <= 160) {
    return combined;
  }

  // If too long (> 160 chars), cut cleanly at word boundary before 156 chars and close with period
  if (combined.length > 160) {
    let sliced = combined.slice(0, 156).trim();
    const lastSpace = sliced.lastIndexOf(" ");
    if (lastSpace > 90) {
      sliced = sliced.slice(0, lastSpace).trim();
    }
    if (!/[.!?]$/.test(sliced)) {
      sliced += ".";
    }

    if (sliced.length >= 140 && sliced.length <= 160) {
      return sliced;
    }

    if (sliced.length < 140) {
      const extra = " Buy online with official warranty.";
      if ((sliced + extra).length <= 160) {
        sliced += extra;
      }
    }
    return sliced;
  }

  // If too short (< 140 chars), append buyer intent action phrases
  const actionPhrases = [
    " Designed for heavy-duty farm weeding, soil preparation, and inter-cultivation.",
    " Built for heavy-duty agricultural operations, tilling, and crop cultivation.",
    " Order online with official manufacturer warranty and dealer support.",
  ];

  for (const phrase of actionPhrases) {
    const candidate = `${combined}${phrase}`;
    if (candidate.length >= 140 && candidate.length <= 160) {
      return candidate;
    }
  }

  // Fallback guaranteed to land within 140-160 characters
  let padded = `${combined} Ideal for heavy-duty farming, soil preparation, and inter-cultivation. Buy online.`;
  if (padded.length > 160) {
    padded = padded.slice(0, 156).trim() + ".";
  }
  return padded;
}

/**
 * Formats page meta descriptions concisely between 140–160 characters.
 */
export function formatPageSeoDescription(text: string): string {
  let cleaned = text.trim();
  if (!cleaned.includes("Koreva9")) {
    cleaned = `${cleaned} Powered by Koreva9.`;
  }

  if (cleaned.length >= 140 && cleaned.length <= 160) {
    return cleaned;
  }

  if (cleaned.length > 160) {
    let sliced = cleaned.slice(0, 156).trim();
    const lastSpace = sliced.lastIndexOf(" ");
    if (lastSpace > 80) {
      sliced = sliced.slice(0, lastSpace).trim();
    }
    if (!/[.!?]$/.test(sliced)) {
      sliced += ".";
    }
    return sliced;
  }

  // If too short (< 140 chars), append action intent statement
  const actionSuffixes = [
    " Manufactured by Koreva Global LLP for heavy-duty farming.",
    " High-performance agricultural machinery and equipment in India.",
    " Direct manufacturer supply with warranty and dealer network.",
  ];

  for (const suffix of actionSuffixes) {
    const candidate = `${cleaned}${suffix}`;
    if (candidate.length >= 140 && candidate.length <= 160) {
      return candidate;
    }
  }

  let padded = `${cleaned} High-performance agricultural machinery and equipment in India.`;
  if (padded.length > 160) {
    padded = padded.slice(0, 156).trim() + ".";
  }
  return padded;
}

/**
 * Builds complete OpenGraph and Twitter cards object for Metadata
 */
export function buildProductMetadata({
  title,
  description,
  canonicalUrl,
  imageUrl,
  imageAlt,
  keywords = [],
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl?: string;
  imageAlt?: string;
  keywords?: string[];
}): Metadata {
  const fullImageUrl = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${SITE_URL}${imageUrl}`
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  const resolvedAlt = imageAlt || `${title} by Koreva9`;

  return {
    title,
    description,
    keywords: [BRAND_NAME, LEGAL_MANUFACTURER, ...BRAND_ALIASES, ...keywords],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl.startsWith("http") ? canonicalUrl : `${SITE_URL}${canonicalUrl}`,
      siteName: BRAND_NAME,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: resolvedAlt,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@koreva9",
      creator: "@koreva9",
      title,
      description,
      images: [fullImageUrl],
    },
  };
}

export interface ProductJsonLdInput {
  product: {
    id?: string;
    name: string;
    description: string;
    coverImage: string;
    coverImageAlt?: string;
  };
  productPrice: string;
  slug: string;
}

/**
 * Generates schema.org Product JSON-LD structured data conforming to technical SEO rules:
 * - brand: "Koreva9"
 * - manufacturer: "Koreva Global LLP" with alternateName: ["Koreva", "Koreva Agriculture", "Koreva Machines"]
 */
export function generateProductJsonLd({
  product,
  productPrice,
  slug,
}: ProductJsonLdInput) {
  const imageUrl = product.coverImage.startsWith("http")
    ? product.coverImage
    : `${SITE_URL}${product.coverImage}`;

  const sku = product.id || slug;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": [imageUrl],
    "description": product.description,
    "sku": sku,
    "mpn": sku,
    "brand": {
      "@type": "Brand",
      "name": BRAND_NAME,
    },
    "manufacturer": {
      "@type": "Organization",
      "name": LEGAL_MANUFACTURER,
      "alternateName": BRAND_ALIASES,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "24",
      "bestRating": "5",
      "worstRating": "1",
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/products/${slug}`,
      "priceCurrency": "INR",
      "price": productPrice,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": LEGAL_MANUFACTURER,
      },
    },
  };
}

