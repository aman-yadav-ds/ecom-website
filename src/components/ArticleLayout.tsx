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
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 font-jost pb-20">
      {/* Hero Image Section */}
      <div className="relative w-full h-[40vh] md:h-[55vh] bg-dark-900">
        <Image
          src={heroImage}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 md:pb-16">
            <Link 
              href="/guides" 
              className="inline-flex items-center text-white/90 hover:text-brand-red mb-4 transition-colors uppercase tracking-wider text-xs font-extrabold"
            >
              <ArrowLeft className="w-4 h-4 mr-2 text-brand-red" /> Back to Knowledge Guides
            </Link>
            <div className="inline-block bg-brand-red text-white text-xs font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider mb-4 shadow-xs">
              {category}
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight max-w-4xl uppercase tracking-tight">
              {title}
            </h1>
            <div className="flex items-center gap-6 text-xs sm:text-sm text-gray-300 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Calendar size={15} className="text-brand-red" /> {date}</span>
              <span className="flex items-center gap-1.5"><User size={15} className="text-brand-red" /> {author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* Main Article Content */}
        <div className="w-full lg:w-[65%]">
          <article className="prose prose-lg max-w-none text-dark-700 font-medium
            prose-headings:font-extrabold prose-headings:text-dark-900 prose-headings:uppercase prose-headings:tracking-wide
            prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-relaxed prose-p:mb-5 prose-p:text-dark-700
            prose-li:my-2 prose-ul:list-disc prose-ul:pl-6
            prose-a:text-brand-red prose-a:no-underline hover:prose-a:underline
            prose-strong:text-dark-900 prose-strong:font-extrabold
            prose-blockquote:border-l-4 prose-blockquote:border-brand-red prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-dark-900 prose-blockquote:bg-light-100 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:my-8"
          >
            {children}
          </article>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[35%]">
          <div className="sticky top-28">
            <div className="glass-panel border border-light-300 p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
              <h3 className="text-lg font-extrabold text-dark-900 uppercase tracking-wide border-b border-light-200 pb-4">
                Popular Guides
              </h3>
              <ul className="space-y-5">
                <li>
                  <Link href="/guides/e20-petrol" className="group block">
                    <span className="text-xs text-brand-red font-extrabold uppercase tracking-wider mb-1 block">Machine Care</span>
                    <h4 className="text-dark-900 font-extrabold group-hover:text-brand-red transition-colors text-sm leading-snug uppercase">E20 Petrol: Protecting Your Carburetor</h4>
                  </Link>
                </li>
                <li>
                  <Link href="/guides/tractor-attachments" className="group block">
                    <span className="text-xs text-brand-red font-extrabold uppercase tracking-wider mb-1 block">Buying Guide</span>
                    <h4 className="text-dark-900 font-extrabold group-hover:text-brand-red transition-colors text-sm leading-snug uppercase">Choosing the Right Tractor Attachment</h4>
                  </Link>
                </li>
                <li>
                  <Link href="/guides/tillage-basics" className="group block">
                    <span className="text-xs text-brand-red font-extrabold uppercase tracking-wider mb-1 block">Farming Advice</span>
                    <h4 className="text-dark-900 font-extrabold group-hover:text-brand-red transition-colors text-sm leading-snug uppercase">Tillage Farming Basics for Better Yields</h4>
                  </Link>
                </li>
                <li>
                  <Link href="/guides/maintenance-checklist" className="group block">
                    <span className="text-xs text-brand-red font-extrabold uppercase tracking-wider mb-1 block">Maintenance</span>
                    <h4 className="text-dark-900 font-extrabold group-hover:text-brand-red transition-colors text-sm leading-snug uppercase">End-of-Season Equipment Checklist</h4>
                  </Link>
                </li>
              </ul>
              
              <div className="pt-6 border-t border-light-200">
                <Link href="/dealers" className="flex items-center justify-between bg-brand-black text-white p-5 rounded-2xl hover:bg-brand-red transition-all group shadow-xs active:scale-95">
                  <div>
                    <h4 className="font-extrabold uppercase tracking-wide text-xs">Need Technical Help?</h4>
                    <p className="text-xs text-gray-300 font-medium mt-0.5">Find an authorized dealer</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-brand-red group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
