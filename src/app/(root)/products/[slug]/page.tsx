import React from "react";
import { notFound } from "next/navigation";
import { exampleProducts, exampleVariants } from "@/lib/details";
import ProductInteractiveSection from "@/components/ProductInteractiveSection";
import Card from "@/components/Card";
import { BookOpen, HelpCircle, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug?: string; id?: string }>;
}

async function resolveProduct(params: Promise<{ slug?: string; id?: string }> | { slug?: string; id?: string }) {
  const resolved = params instanceof Promise ? await params : params;
  const rawParam = resolved?.slug || resolved?.id || "";
  const decoded = decodeURIComponent(rawParam).trim();

  return {
    slug: rawParam || decoded,
    product: exampleProducts.find(
      (p) =>
        p.id === rawParam ||
        p.id === decoded ||
        p.id.toLowerCase() === decoded.toLowerCase()
    ),
  };
}

// Statically generate routes at build time
export async function generateStaticParams() {
  return exampleProducts.map((product) => ({
    slug: product.id,
  }));
}

// Generate SEO Metadata dynamically based on product details
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug, product } = await resolveProduct(params);
  if (!product) {
    return {
      title: "Product Not Found | Koreva",
      description: "The requested Koreva agricultural product could not be found.",
    };
  }

  const title = `${product.name} | Koreva - Agriculture Machinery`;
  const description = product.description;
  const ogImage = product.coverImage || "/images/og-koreva-default.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${slug || product.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://koreva9.com/products/${slug || product.id}`,
      siteName: "Koreva",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${product.name} manufactured by Koreva Global LLP`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug, product } = await resolveProduct(params);

  if (!product) {
    notFound();
  }

  const targetId = product.id;

  // Fetch product variants statically
  const variants = exampleVariants.filter((v) => v.productId === targetId);

  // Find default variant price for JSON-LD schema & cards
  const defaultVariant =
    variants.find((v) => v.id === product.defaultVariantId) || variants[0];
  const productPrice = defaultVariant ? defaultVariant.price : "0";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": [
      product.coverImage.startsWith("http")
        ? product.coverImage
        : `https://koreva9.com${product.coverImage}`,
    ],
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Koreva",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "12",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://koreva9.com/products/${slug}`,
      "priceCurrency": "INR",
      "price": productPrice,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Koreva Global LLP",
      },
    },
  };

  // BreadcrumbList JSON-LD for SERP breadcrumb rich results
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://koreva9.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Equipment",
        "item": "https://koreva9.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://koreva9.com/products/${slug}`
      }
    ]
  };

  // Recommendation engine: find related products via shared tags
  const relatedProducts = exampleProducts
    .filter((p) => p.id !== product.id)
    .map((p) => {
      const sharedTagsCount = p.tags.filter((t) => product.tags.includes(t)).length;
      return { product: p, score: sharedTagsCount };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((p) => p.product);

  return (
    <main className="min-h-screen bg-[#fbfbfb] text-dark-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-jost">
      {/* Product JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      {/* BreadcrumbList JSON-LD for SERP rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto mb-6">
        <ol className="flex items-center space-x-2 text-xs font-extrabold text-dark-600 uppercase tracking-wider">
          <li>
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
          </li>
          <li><ChevronRight className="w-3.5 h-3.5 text-dark-400" /></li>
          <li>
            <Link href="/products" className="hover:text-brand-red transition-colors">Equipment</Link>
          </li>
          <li><ChevronRight className="w-3.5 h-3.5 text-dark-400" /></li>
          <li className="text-dark-900" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      {/* Primary Product Section (Interactive Glass Panel) */}
      <article className="max-w-7xl mx-auto mb-16 glass-panel-elevated p-6 sm:p-10 rounded-3xl shadow-md border border-light-300 bg-white/90 backdrop-blur-2xl">
        <ProductInteractiveSection product={product} variants={variants} />
      </article>

      {/* Service & Tips Hub */}
      <section className="max-w-7xl mx-auto mb-16" aria-labelledby="service-hub-heading">
        <h2 id="service-hub-heading" className="text-xl sm:text-2xl font-extrabold text-dark-900 mb-6 uppercase tracking-wide border-b border-light-300 pb-3">
          Service & Documentation Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/downloads"
            className="glass-card flex items-center justify-between p-6 sm:p-8 border border-light-300/80 rounded-3xl hover:border-brand-red shadow-xs hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-dark-900 mb-1 group-hover:text-brand-red transition-colors uppercase">User Manuals</h3>
                <p className="text-xs sm:text-sm text-dark-600 font-medium">Download operator guides and safety procedures.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-brand-red group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>

          <Link
            href="/faq"
            className="glass-card flex items-center justify-between p-6 sm:p-8 border border-light-300/80 rounded-3xl hover:border-brand-red shadow-xs hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-dark-900 mb-1 group-hover:text-brand-red transition-colors uppercase">Frequently Asked Questions</h3>
                <p className="text-xs sm:text-sm text-dark-600 font-medium">Find answers to common maintenance queries.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-brand-red group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </div>
      </section>

      {/* Recommended Products Slider */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto mb-12" aria-labelledby="recommended-heading">
          <div className="flex items-center justify-between mb-6 border-b border-light-300 pb-3">
            <h2 id="recommended-heading" className="text-xl sm:text-2xl font-extrabold text-dark-900 uppercase tracking-wide">
              Recommended Equipment
            </h2>
            <Link href="/products" className="text-xs font-extrabold text-brand-red hover:underline flex items-center gap-1 uppercase tracking-wider">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => {
              const relatedVariants = exampleVariants.filter(v => v.productId === relatedProduct.id);
              const defaultVariant = relatedVariants.find(v => v.id === relatedProduct.defaultVariantId) || relatedVariants[0];
              const price = defaultVariant ? Number(defaultVariant.price) : 0;

              return (
                <Card
                  key={relatedProduct.id}
                  title={relatedProduct.name}
                  category={relatedProduct.categoryId}
                  price={price}
                  image={relatedProduct.coverImage}
                  href={`/products/${relatedProduct.id}`}
                />
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
