import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { exampleProducts, exampleVariants } from '@/lib/details';
import ComparisonMatrix from '@/components/ComparisonMatrix';

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
      price: defaultVariant ? parseFloat(defaultVariant.price) : 0,
      technicalDetails: defaultVariant?.technicalDetails || {},
    };
  }).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-dark-900 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to previous page
      </Link>

      <h1 className="text-3xl font-bold text-dark-900 mb-8">Compare Products</h1>
      
      {productsData.length > 0 ? (
        <ComparisonMatrix products={productsData as any} />
      ) : (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <p className="text-gray-500 mb-4">No products selected for comparison.</p>
          <Link href="/products" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors">
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}
