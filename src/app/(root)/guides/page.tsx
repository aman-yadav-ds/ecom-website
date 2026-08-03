import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Wrench, Sprout, BookCheck } from "lucide-react";

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
    excerpt: "Maximize your yield by mastering the basics of soil preparation and secondary tillage using KOREVA equipment.",
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
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-jost">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-red/20 text-brand-red text-xs font-extrabold uppercase tracking-widest mb-4 shadow-xs">
            <BookCheck className="w-4 h-4" />
            <span>KOREVA Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight mb-4">
            Guides & Machinery Advice
          </h1>
          <p className="text-dark-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Expert tips on farming techniques, buying decisions, and essential maintenance routines for your KOREVA machinery.
          </p>
        </div>

        {/* Featured Guide: The E20 Warning */}
        <Link href={guides[0].href} className="glass-panel-elevated border border-light-300 shadow-md rounded-3xl overflow-hidden flex flex-col md:flex-row mb-12 group cursor-pointer hover:shadow-xl transition-all block">
          <div className="w-full md:w-1/2 relative min-h-[280px] sm:min-h-[350px]">
            <Image 
              src={guides[0].image} 
              alt={guides[0].title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
              loading="eager"
            />
            <div className="absolute top-4 left-4 bg-brand-red text-white text-xs font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider flex items-center gap-1.5 shadow-xs">
              <FeaturedIcon size={14} />
              <span>{guides[0].category}</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-dark-900 mb-4 group-hover:text-brand-red transition-colors uppercase leading-tight">
              {guides[0].title}
            </h2>
            <p className="text-dark-700 leading-relaxed mb-6 font-medium text-sm md:text-base">
              {guides[0].excerpt}
            </p>
            <div className="mt-auto">
              <span className="inline-flex items-center text-brand-red font-extrabold uppercase text-xs sm:text-sm tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </span>
            </div>
          </div>
        </Link>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {guides.slice(1).map((guide, idx) => {
            const Icon = guide.icon;
            return (
            <Link href={guide.href} key={idx} className="glass-card border border-light-300/80 shadow-xs group cursor-pointer hover:shadow-md transition-all flex flex-col h-full rounded-3xl overflow-hidden block">
              <div className="w-full relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={guide.image} 
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-dark-900 text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider flex items-center gap-1.5 border border-light-300 shadow-xs">
                  <Icon size={14} className="text-brand-red" />
                  <span>{guide.category}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-extrabold text-dark-900 mb-3 group-hover:text-brand-red transition-colors line-clamp-2 uppercase leading-tight">
                  {guide.title}
                </h3>
                <p className="text-dark-600 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                  {guide.excerpt}
                </p>
                <div className="mt-auto">
                  <span className="inline-flex items-center text-brand-red font-extrabold uppercase text-xs tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
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
