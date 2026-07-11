import React from "react";
import { notFound } from "next/navigation";
import { exampleProducts, exampleVariants } from "@/lib/details";
import ProductInteractiveSection from "@/components/ProductInteractiveSection";
import Card from "@/components/Card";
import { BookOpen, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Statically generate routes at build time
export async function generateStaticParams() {
  return exampleProducts.map((product) => ({
    id: product.id,
  }));
}

// Generate SEO Metadata dynamically based on product details
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = exampleProducts.find((p) => p.id === id);
  if (!product) {
    return { title: "Product Not Found | KOREVA" };
  }
  return {
    title: `${product.name} | KOREVA Industrial Equipment`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;

  // Fetch product data statically
  const product = exampleProducts.find((p) => p.id === id);
  if (!product) {
    notFound();
  }

  // Fetch product variants statically
  const variants = exampleVariants.filter((v) => v.productId === id);

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
    <main className="min-h-screen bg-light-200 py-12 px-4 sm:px-6 lg:px-8 font-jost">

      {/* Breadcrumbs (SEO friendly) */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto mb-8">
        <ol className="flex items-center space-x-2 text-sm text-dark-500 font-medium">
          <li>
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li>
            <Link href="/products" className="hover:text-brand-red transition-colors">Equipment</Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li className="text-dark-900" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      {/* Primary Product Section (Interactive) */}
      <article className="max-w-7xl mx-auto mb-20 bg-white p-6 sm:p-10 rounded-sm shadow-sm border border-light-300">
        <ProductInteractiveSection product={product} variants={variants} />
      </article>

      {/* Service & Tips Hub */}
      <section className="max-w-7xl mx-auto mb-20" aria-labelledby="service-hub-heading">
        <h2 id="service-hub-heading" className="text-2xl font-bold text-dark-900 mb-8 uppercase tracking-wide border-b border-light-300 pb-4">
          Service & Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="#"
            className="flex items-center justify-between p-8 bg-white border border-light-300 rounded-sm hover:border-brand-red hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-red-50 text-brand-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark-900 mb-1">User Manuals</h3>
                <p className="text-sm text-dark-500">Download operator guides and safety procedures.</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-light-400 group-hover:text-brand-red transform group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="#"
            className="flex items-center justify-between p-8 bg-white border border-light-300 rounded-sm hover:border-brand-red hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-red-50 text-brand-red rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <HelpCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark-900 mb-1">Frequently Asked Questions</h3>
                <p className="text-sm text-dark-500">Find answers to common maintenance queries.</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-light-400 group-hover:text-brand-red transform group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </section>

      {/* Recommended Products Slider */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto mb-12" aria-labelledby="recommended-heading">
          <div className="flex items-center justify-between mb-8 border-b border-light-300 pb-4">
            <h2 id="recommended-heading" className="text-2xl font-bold text-dark-900 uppercase tracking-wide">
              Recommended Equipment
            </h2>
            <Link href="/products" className="text-sm font-bold text-brand-red hover:text-brand-red-accent flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => {
              // Find default variant price for Card
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
