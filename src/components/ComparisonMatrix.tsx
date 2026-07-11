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
    <div className="w-full overflow-x-auto hide-scrollbar pb-8">
      <table className="w-full min-w-[800px] border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {/* Empty top-left cell */}
            <th className="w-64 p-6 text-left align-bottom">
              <span className="text-xl font-bold text-dark-900">Technical Specifications</span>
            </th>
            {products.map(product => (
              <th key={product.id} className="w-72 p-6 align-top relative border-l border-gray-100">
                <button
                  onClick={() => handleRemove(product.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-brand-red transition-colors"
                  aria-label="Remove from comparison"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-4 bg-white border border-gray-100 rounded-lg p-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-dark-900 mb-2 line-clamp-2 min-h-[56px]">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-brand-red mb-4">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}*
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-sm transition-colors text-sm"
                  >
                    Go to product
                  </Link>
                </div>
              </th>
            ))}
            {/* Fill empty columns if less than 3 */}
            {Array.from({ length: 3 - products.length }).map((_, i) => (
              <th key={`empty-${i}`} className="w-72 p-6 bg-gray-50/50 border-l border-gray-100" />
            ))}
          </tr>
        </thead>
        <tbody>
          {allKeys.map((key, index) => (
            <tr 
              key={key} 
              className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
            >
              <td className="p-4 md:p-6 font-semibold text-dark-900 border-r border-gray-100 flex items-center justify-between">
                <span>{key}</span>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </td>
              {products.map(product => (
                <td key={product.id} className="p-4 md:p-6 text-gray-700 text-center border-r border-gray-100 font-medium">
                  {product.technicalDetails[key] || '-'}
                </td>
              ))}
              {Array.from({ length: 3 - products.length }).map((_, i) => (
                <td key={`empty-td-${i}`} className="p-4 md:p-6 border-r border-gray-100 bg-gray-50/20" />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonMatrix;
