import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Wrench, Sprout } from "lucide-react";

interface GuideCard {
  title: string;
  category: string;
  excerpt: string;
  icon: React.ElementType;
  image: string;
  href: string;
}

const guides: GuideCard[] = [
  {
    title: "E20 Petrol: Protecting Your Carburetor",
    category: "Machine Care",
    excerpt: "Learn why the new 20% Ethanol blend (E20) can choke your petrol power weeder and the exact steps to store your machine safely.",
    icon: Wrench,
    image: "/guides/e20_hero.jpg",
    href: "/guides/e20-petrol"
  },
  {
    title: "Choosing the Right Tractor Attachment",
    category: "Buying Guide",
    excerpt: "Harrow vs. Rotavator: A comprehensive guide on which attachment is best suited for your specific soil type and crop requirements.",
    icon: BookOpen,
    image: "/guides/tractor_attachment_hero.jpg",
    href: "/guides/tractor-attachments"
  },
  {
    title: "Tillage Farming Basics",
    category: "Farming Tips",
    excerpt: "Maximize your yield by mastering the basics of soil preparation and secondary tillage using KOREVA9 equipment.",
    icon: Sprout,
    image: "/guides/tillage_basics_hero.jpg",
    href: "/guides/tillage-basics"
  },
  {
    title: "End-of-Season Maintenance Checklist",
    category: "Machine Care",
    excerpt: "Don't just park your machinery. Follow this 10-step checklist to ensure your equipment is ready for the next season.",
    icon: Wrench,
    image: "/guides/maintenance_hero.jpg",
    href: "/guides/maintenance-checklist"
  }
];

export default function GuidesPage() {
  const FeaturedIcon = guides[0].icon;

  return (
    <div className="min-h-screen bg-light-100 py-12 md:py-20 px-4 font-jost">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark uppercase tracking-wide mb-4">
            Guides & Advice
          </h1>
          <div className="w-24 h-2 bg-brand-red mx-auto mb-6"></div>
          <p className="text-lg text-dark-700 max-w-2xl mx-auto">
            Expert tips on farming techniques, buying decisions, and essential maintenance routines for your KOREVA9 machinery.
          </p>
        </div>

        {/* Featured Guide: The E20 Warning */}
        <Link href={guides[0].href} className="bg-white border border-light-300 shadow-sm overflow-hidden flex flex-col md:flex-row mb-12 group cursor-pointer hover:shadow-lg transition-all block">
          <div className="w-full md:w-1/2 relative min-h-[300px]">
            <Image 
              src={guides[0].image} 
              alt={guides[0].title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 bg-brand-red text-white text-xs font-bold uppercase px-3 py-1 tracking-wider flex items-center gap-2">
              <FeaturedIcon size={14} />
              {guides[0].category}
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-4 group-hover:text-brand-red transition-colors">
              {guides[0].title}
            </h2>
            <p className="text-dark-700 leading-relaxed mb-6">
              {guides[0].excerpt}
            </p>
            <div className="mt-auto">
              <span className="inline-flex items-center text-brand-red font-bold uppercase text-sm group-hover:underline">
                Read Full Guide <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </div>
          </div>
        </Link>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {guides.slice(1).map((guide, idx) => {
            const Icon = guide.icon;
            return (
            <Link href={guide.href} key={idx} className="bg-white border border-light-300 shadow-sm group cursor-pointer hover:shadow-lg transition-all flex flex-col h-full overflow-hidden block">
              <div className="w-full relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={guide.image} 
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-dark-900 text-white text-xs font-bold uppercase px-3 py-1 tracking-wider flex items-center gap-2">
                  <Icon size={14} />
                  {guide.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-brand-black mb-3 group-hover:text-brand-red transition-colors line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-dark-700 text-sm leading-relaxed mb-6 line-clamp-3">
                  {guide.excerpt}
                </p>
                <div className="mt-auto">
                  <span className="inline-flex items-center text-brand-red font-bold uppercase text-sm group-hover:underline">
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
