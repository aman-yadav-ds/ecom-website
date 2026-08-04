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
  imageAlt?: string;
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
    <div className="w-full max-w-full overflow-x-auto hide-scrollbar pb-8 font-jost">
      <div className="glass-panel-elevated border border-light-300 rounded-3xl shadow-xl overflow-hidden min-w-[640px] md:min-w-[800px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-light-100/90 border-b border-light-300">
              {/* Top-left sticky cell */}
              <th className="w-44 sm:w-52 md:w-64 p-4 md:p-6 text-left align-bottom sticky left-0 z-20 bg-white/95 backdrop-blur-xl border-r border-light-300 shadow-xs">
                <span className="text-xs md:text-base font-extrabold uppercase tracking-wider text-dark-900">Technical Specs</span>
              </th>
              {products.map(product => (
                <th key={product.id} className="w-48 sm:w-56 md:w-72 p-4 md:p-6 align-top relative border-r border-light-300 bg-white/80">
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="absolute top-3 right-3 text-dark-500 hover:text-white hover:bg-brand-red transition-all bg-white/90 border border-light-300 rounded-full p-1.5 shadow-xs z-30 group"
                    aria-label="Remove from comparison"
                  >
                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  </button>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 mb-3 md:mb-4 bg-white border border-light-200 rounded-2xl p-2 shadow-xs">
                      <Image
                        src={product.image}
                        alt={product.imageAlt || `${product.name} - Koreva Agriculture Equipment`}
                        fill
                        sizes="(max-width: 768px) 96px, 128px"
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xs md:text-base font-extrabold text-dark-900 mb-1 md:mb-2 line-clamp-2 min-h-[36px] md:min-h-[48px] uppercase tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-sm md:text-lg font-extrabold text-brand-red mb-3 md:mb-4">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}*
                    </p>
                    <Link
                      href={`/products/${product.id}`}
                      className="w-full py-2.5 px-3 bg-brand-red hover:bg-brand-red-accent text-white font-extrabold rounded-full shadow-xs transition-all text-xs uppercase tracking-wider text-center active:scale-95"
                    >
                      View Details
                    </Link>
                  </div>
                </th>
              ))}
              {/* Fill empty columns if less than 3 on desktop */}
              <th className="hidden lg:table-cell p-4 bg-light-100/40 w-full" />
            </tr>
          </thead>
          <tbody>
            {allKeys.map((key, index) => {
              const isEven = index % 2 === 0;
              const bgClass = isEven ? 'bg-white/90' : 'bg-light-100/60';
              const stickyBgClass = isEven ? 'bg-white/95' : 'bg-light-100/90';
              
              return (
                <tr 
                  key={key} 
                  className={`border-b border-light-200 hover:bg-white transition-colors ${bgClass}`}
                >
                  {/* Sticky feature name column */}
                  <td className={`p-4 md:p-5 font-bold text-dark-900 border-r border-light-300 sticky left-0 z-10 backdrop-blur-xl shadow-xs ${stickyBgClass}`}>
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="line-clamp-2 pr-1 uppercase tracking-wider text-dark-800">{key}</span>
                      <Info className="w-3.5 h-3.5 text-dark-400 cursor-help shrink-0" />
                    </div>
                  </td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 md:p-5 text-dark-900 text-center border-r border-light-200 font-extrabold text-xs md:text-sm">
                      {product.technicalDetails[key] || '-'}
                    </td>
                  ))}
                  {/* Fill empty td */}
                  <td className="hidden lg:table-cell p-3 bg-light-100/30" />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonMatrix;
