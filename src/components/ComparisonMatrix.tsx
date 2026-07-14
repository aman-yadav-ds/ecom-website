"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Info } from 'lucide-react';
import { useCompareStore } from '@/store/useCompareStore';
import { useRouter } from 'next/navigation';

export interface CompareProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  technicalDetails: Record<string, string>;
}

interface ComparisonMatrixProps {
  products: CompareProduct[];
}

const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ products }) => {
  const { removeProduct } = useCompareStore();
  const router = useRouter();

  const handleRemove = (id: string) => {
    removeProduct(id);
    const newProducts = products.filter(p => p.id !== id);
    if (newProducts.length > 0) {
      router.push(`/compare?ids=${newProducts.map(p => p.id).join(',')}`);
    } else {
      router.push('/products');
    }
  };

  const allKeys = useMemo(() => {
    const keys = new Set<string>();
    products.forEach(p => {
      Object.keys(p.technicalDetails).forEach(k => keys.add(k));
    });
    return Array.from(keys);
  }, [products]);

  return (
    <div className="w-full max-w-full overflow-x-auto hide-scrollbar pb-8">
      <table className="w-full min-w-[600px] md:min-w-[800px] border-collapse bg-white shadow-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {/* Top-left sticky cell */}
            <th className="w-40 sm:w-48 md:w-64 p-4 md:p-6 text-left align-bottom sticky left-0 z-20 bg-gray-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
              <span className="text-sm md:text-xl font-bold text-dark-900">Technical Specs</span>
            </th>
            {products.map(product => (
              <th key={product.id} className="w-48 sm:w-56 md:w-72 p-4 md:p-6 align-top relative border-l border-gray-100 bg-gray-50">
                <button
                  onClick={() => handleRemove(product.id)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-400 hover:text-brand-red transition-colors bg-white rounded-full p-1 shadow-sm md:shadow-none z-30"
                  aria-label="Remove from comparison"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mb-3 md:mb-4 bg-white border border-gray-100 rounded-lg p-2 shadow-sm">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-sm md:text-lg font-bold text-dark-900 mb-1 md:mb-2 line-clamp-2 min-h-[40px] md:min-h-[56px]">
                    {product.name}
                  </h3>
                  <p className="text-base md:text-xl font-bold text-brand-red mb-3 md:mb-4">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}*
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="w-full py-2 px-2 md:px-4 bg-brand-red hover:bg-brand-red-accent text-white font-semibold rounded-lg shadow-sm transition-colors text-xs md:text-sm uppercase tracking-wider"
                  >
                    View Product
                  </Link>
                </div>
              </th>
            ))}
            {/* Fill empty columns if less than 3 on desktop only to maintain layout */}
            <th className="hidden lg:table-cell p-4 bg-gray-50 border-l border-gray-100 w-full" />
          </tr>
        </thead>
        <tbody>
          {allKeys.map((key, index) => {
            const isEven = index % 2 === 0;
            const bgClass = isEven ? 'bg-white' : 'bg-gray-50/50';
            const stickyBgClass = isEven ? 'bg-white' : 'bg-gray-50';
            
            return (
              <tr 
                key={key} 
                className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${bgClass}`}
              >
                {/* Sticky feature name column */}
                <td className={`p-3 md:p-6 font-semibold text-dark-900 border-r border-gray-100 sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] ${stickyBgClass}`}>
                  <div className="flex items-center justify-between text-xs md:text-base">
                    <span className="line-clamp-2 pr-1">{key}</span>
                    <Info className="w-3 h-3 md:w-4 md:h-4 text-gray-400 cursor-help shrink-0" />
                  </div>
                </td>
                {products.map(product => (
                  <td key={product.id} className="p-3 md:p-6 text-gray-700 text-center border-r border-gray-100 font-medium text-xs md:text-base">
                    {product.technicalDetails[key] || '-'}
                  </td>
                ))}
                {/* Fill empty td */}
                <td className="hidden lg:table-cell p-3 border-r border-gray-100 bg-gray-50/10" />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonMatrix;
