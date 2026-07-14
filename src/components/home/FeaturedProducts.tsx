import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

// Pulling actual IDs from src/lib/details/products.ts
const featuredProducts = [
  {
    name: "Power Weeder",
    description: "Self-propelled walk-behind tractor for heavy-duty weeding.",
    image: "/products/power-weeder.jpeg",
    link: "/products/p-powerweeder" // ID from products.ts
  },
  {
    name: "Rotavator",
    description: "Tractor-mounted rotavator for efficient seedbed preparation.",
    image: "/products/rotavator.jpg",
    link: "/products/p-rotavator" // ID from products.ts
  },
  {
    name: "Brush Cutter",
    description: "Versatile cutter for clearing grass, weeds, and small bushes.",
    image: "/products/brushcutter.jpeg", // From public/products
    link: "/products/p-brushcutter" // ID from products.ts
  }
];

export function FeaturedProducts() {
  return (
    <section className="bg-light-200 py-16 md:py-24 px-4 border-b border-light-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
          <div className="w-full">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-[2px] w-8 md:w-12 bg-brand-red"></div>
              <span className="text-brand-red font-semibold tracking-widest text-xs md:text-sm uppercase">KOREVA Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black uppercase">
              FEATURED PRODUCTS
            </h2>
            <p className="max-w-lg text-brand-dark text-sm md:text-base mt-3 md:mt-4">
              Explore our top-of-the-line agricultural machinery, engineered specifically for the tough demands of Indian farming.
            </p>
          </div>
          
          <Link 
            href="/products" 
            className="hidden md:flex items-center gap-2 text-brand-red border border-brand-red hover:bg-brand-red hover:text-white font-semibold text-sm transition-all duration-300 px-6 py-2.5 rounded-full group whitespace-nowrap"
          >
            VIEW ALL PRODUCTS
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <Link 
              key={index} 
              href={product.link}
              className="group block bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-light-300 hover:border-brand-red"
            >
              <div className="relative w-full h-[250px] md:h-[300px] bg-white overflow-hidden p-6 md:p-8 flex items-center justify-center">
                {/* Premium badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-brand-black text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-full uppercase tracking-wider">
                  <Star className="w-3 h-3 text-brand-red fill-current" />
                  Premium
                </div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={280}
                  height={280}
                  className="object-contain transition-transform duration-700 group-hover:scale-110 w-full h-full"
                />
              </div>
              <div className="p-5 md:p-6 border-t border-light-200 bg-gradient-to-b from-white to-light-100">
                <h3 className="text-brand-black text-xl md:text-2xl font-bold mb-1 md:mb-2 group-hover:text-brand-red transition-colors">
                  {product.name}
                </h3>
                <p className="text-brand-dark text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center text-brand-red font-semibold text-xs md:text-sm gap-2">
                  View Details
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 md:mt-10 flex justify-center md:hidden">
          <Link 
            href="/products" 
            className="flex items-center justify-center gap-2 text-brand-red border border-brand-red hover:bg-brand-red hover:text-white font-semibold text-sm transition-all duration-300 px-8 py-3 rounded-full group w-full sm:w-auto"
          >
            VIEW ALL PRODUCTS
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
