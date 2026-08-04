import React from 'react';
import Link from 'next/link';
import { exampleProducts, exampleVariants } from '@/lib/details';
import ComparisonMatrix from '@/components/ComparisonMatrix';
import CompareBackButton from '@/components/CompareBackButton';

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ ids?: string }> }) {
  const params = await searchParams;
  const ids = params?.ids ? params.ids.split(',') : [];

  const productsData = ids.map(id => {
    const product = exampleProducts.find(p => p.id === id);
    if (!product) return null;
    const variants = exampleVariants.filter(v => v.productId === id);
    const defaultVariant = variants.find(v => v.id === product.defaultVariantId) || variants[0];
    
    return {
      id: product.id,
      name: product.name,
      image: product.coverImage || defaultVariant?.images?.[0] || "/placeholder.png",
      imageAlt: product.coverImageAlt || defaultVariant?.imagesAlt?.[0] || product.name,
      price: defaultVariant ? parseFloat(defaultVariant.price) : 0,
      technicalDetails: defaultVariant?.technicalDetails || {},
    };
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 font-jost py-8 md:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CompareBackButton />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-light-300">
          <div>
            <span className="text-brand-red font-extrabold text-xs uppercase tracking-widest block mb-1">Specification Matrix</span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-dark-900 uppercase">Compare Machinery & Equipment</h1>
          </div>
          {productsData.length > 0 && (
            <span className="px-4 py-1.5 rounded-full glass-panel text-brand-red text-xs font-extrabold uppercase border border-brand-red/20 shadow-xs">
              {productsData.length} Selected
            </span>
          )}
        </div>
        
        {productsData.length > 0 ? (
          <ComparisonMatrix products={productsData as any} />
        ) : (
          <div className="text-center py-20 px-6 glass-panel border border-light-300 rounded-3xl shadow-xs max-w-2xl mx-auto my-8">
            <h3 className="text-xl font-extrabold text-dark-900 uppercase mb-2">No Products Selected</h3>
            <p className="text-dark-600 text-sm font-medium mb-6">
              Select up to 3 agricultural machines, power weeders, or lubricants from our catalog to compare technical specifications side-by-side.
            </p>
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-accent text-white font-extrabold py-3.5 px-8 rounded-full shadow-md transition-all text-xs uppercase tracking-wider active:scale-95"
            >
              Browse Products Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
