import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, User, Newspaper, ArrowRight } from "lucide-react";
import { getCachedNewsArticles } from "@/lib/cached-queries";

import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildProductMetadata({
  title: formatPageSeoTitle("Official News & Press Releases"),
  description: formatPageSeoDescription(
    "Stay updated with product launches, dealer expansions, and agricultural machinery insights from official manufacturer Koreva9."
  ),
  canonicalUrl: "/news",
  keywords: ["Koreva News", "Koreva9 Press Releases", "Agricultural Machinery News"],
});

export default async function NewsPage() {
  const newsArticlesList = await getCachedNewsArticles();

  const featuredArticle = newsArticlesList[0];
  const secondaryArticles = newsArticlesList.slice(1);

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-jost">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-red/20 text-brand-red text-xs font-extrabold uppercase tracking-widest mb-4 shadow-xs">
            <Newspaper className="w-4 h-4" />
            <span>Corporate Communications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight mb-4">
            News & Press Announcements
          </h1>
          <p className="text-dark-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Stay up to date with the latest agricultural equipment releases, company milestones, and dealer network updates at KOREVA GLOBAL LLP.
          </p>
        </div>

        {/* Featured Article Hero Card */}
        {featuredArticle && (
          <Link
            href={`/news/${featuredArticle.id}`}
            className="group glass-panel-elevated border border-light-300 shadow-md rounded-3xl overflow-hidden flex flex-col lg:flex-row mb-12 hover:shadow-xl transition-all duration-300 block"
          >
            <div className="w-full lg:w-[58%] relative min-h-[280px] sm:min-h-[350px] lg:min-h-[420px]">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                loading="eager"
              />
              <div className="absolute top-4 left-4 bg-brand-red text-white text-xs font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider shadow-xs">
                {featuredArticle.category}
              </div>
            </div>
            <div className="w-full lg:w-[42%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white/90 backdrop-blur-xl">
              <div>
                <div className="flex items-center gap-3 text-xs text-dark-600 font-extrabold uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-brand-red" /> {featuredArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <User size={14} className="text-brand-red" /> {featuredArticle.author}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-900 mb-4 group-hover:text-brand-red transition-colors leading-tight uppercase">
                  {featuredArticle.title}
                </h2>
                <p className="text-dark-700 text-sm sm:text-base leading-relaxed mb-6 font-medium line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-light-200 flex items-center justify-between">
                <span className="inline-flex items-center text-brand-red font-extrabold uppercase text-xs sm:text-sm tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Read Full Press Release</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </span>
                <div className="w-8 h-8 rounded-full bg-brand-red/10 group-hover:bg-brand-red text-brand-red group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Secondary News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {secondaryArticles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.id}`}
              className="group glass-card border border-light-300/80 shadow-xs rounded-3xl overflow-hidden flex flex-col h-full hover:shadow-md transition-all duration-300 block"
            >
              <div className="w-full relative aspect-[16/9] overflow-hidden bg-white">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-dark-900 border border-light-300 text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider shadow-xs">
                  {article.category}
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-dark-600 font-extrabold uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-brand-red" /> {article.date}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-dark-900 mb-3 group-hover:text-brand-red transition-colors uppercase leading-tight">
                  {article.title}
                </h3>
                <p className="text-dark-700 text-xs sm:text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-light-200 flex items-center justify-between text-brand-red font-extrabold uppercase text-xs tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter Subscription Banner */}
        <div className="glass-panel-elevated border border-light-300 text-dark-900 p-8 md:p-12 rounded-3xl shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 bg-white/90 backdrop-blur-2xl">
          <div className="relative z-10 md:w-1/2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red mb-1 block">
              Stay Informed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-3 text-dark-900">
              Subscribe to KOREVA News
            </h2>
            <p className="text-dark-700 text-sm sm:text-base font-medium leading-relaxed">
              Receive instant updates on agricultural machinery releases, technical guides, and authorized dealership openings.
            </p>
          </div>
          <div className="relative z-10 md:w-1/2 w-full max-w-md">
            <form className="flex flex-col sm:flex-row gap-3" action="#">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3.5 bg-white border border-light-300 text-dark-900 placeholder-dark-400 text-sm font-medium rounded-full focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red shadow-xs"
                required
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-brand-red text-white font-extrabold uppercase tracking-wider text-xs hover:bg-brand-red-accent transition-all rounded-full shadow-md active:scale-95 cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
