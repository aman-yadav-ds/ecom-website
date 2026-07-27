import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, ChevronRight } from "lucide-react";

interface ArticleLayoutProps {
  title: string;
  category: string;
  date: string;
  author: string;
  heroImage: string;
  children: React.ReactNode;
}

export default function ArticleLayout({
  title,
  category,
  date,
  author,
  heroImage,
  children,
}: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-light-100 font-jost pb-20">
      {/* Hero Image Section */}
      <div className="relative w-full h-[40vh] md:h-[60vh] bg-brand-dark">
        <Image
          src={heroImage}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-4 pb-12 md:pb-20">
            <Link 
              href="/guides" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors uppercase tracking-wider text-sm font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Guides
            </Link>
            <div className="inline-block bg-brand-red text-white text-xs font-bold uppercase px-4 py-2 tracking-wider mb-6">
              {category}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
              {title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-light-200 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-2"><Calendar size={16} /> {date}</span>
              <span className="flex items-center gap-2"><User size={16} /> {author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Main Article Content */}
        <div className="w-full lg:w-[65%]">
          <article className="prose prose-lg max-w-none text-dark-700
            prose-headings:font-bold prose-headings:text-brand-dark prose-headings:uppercase prose-headings:tracking-wide
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:leading-relaxed prose-p:mb-6
            prose-li:my-2 prose-ul:list-disc prose-ul:pl-6
            prose-a:text-brand-red prose-a:no-underline hover:prose-a:underline
            prose-strong:text-brand-dark prose-strong:font-bold
            prose-blockquote:border-l-4 prose-blockquote:border-brand-red prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-dark-900 prose-blockquote:bg-light-200 prose-blockquote:py-2 prose-blockquote:my-8"
          >
            {children}
          </article>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[35%]">
          <div className="sticky top-32">
            <div className="bg-white border border-light-300 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-brand-dark uppercase tracking-wide mb-6 border-b border-light-300 pb-4">
                Popular Guides
              </h3>
              <ul className="space-y-6">
                <li>
                  <Link href="/guides/e20-petrol" className="group block">
                    <span className="text-xs text-brand-red font-bold uppercase tracking-wider mb-1 block">Machine Care</span>
                    <h4 className="text-dark-900 font-bold group-hover:text-brand-red transition-colors leading-snug">E20 Petrol: Protecting Your Carburetor</h4>
                  </Link>
                </li>
                <li>
                  <Link href="/guides/tractor-attachments" className="group block">
                    <span className="text-xs text-brand-red font-bold uppercase tracking-wider mb-1 block">Buying Guide</span>
                    <h4 className="text-dark-900 font-bold group-hover:text-brand-red transition-colors leading-snug">Choosing the Right Tractor Attachment</h4>
                  </Link>
                </li>
                <li>
                  <Link href="/guides/tillage-basics" className="group block">
                    <span className="text-xs text-brand-red font-bold uppercase tracking-wider mb-1 block">Farming Advice</span>
                    <h4 className="text-dark-900 font-bold group-hover:text-brand-red transition-colors leading-snug">Tillage Farming Basics for Better Yields</h4>
                  </Link>
                </li>
                <li>
                  <Link href="/guides/maintenance-checklist" className="group block">
                    <span className="text-xs text-brand-red font-bold uppercase tracking-wider mb-1 block">Maintenance</span>
                    <h4 className="text-dark-900 font-bold group-hover:text-brand-red transition-colors leading-snug">End-of-Season Equipment Checklist</h4>
                  </Link>
                </li>
              </ul>
              
              <div className="mt-10 pt-8 border-t border-light-300">
                <Link href="/dealers" className="flex items-center justify-between bg-brand-dark text-white p-6 hover:bg-brand-red transition-colors group">
                  <div>
                    <h4 className="font-bold uppercase tracking-wide mb-1">Need Help?</h4>
                    <p className="text-sm text-light-200">Find a local dealer</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-brand-red group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
