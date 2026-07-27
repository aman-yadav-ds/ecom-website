import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, User, Newspaper, ArrowRight } from "lucide-react";
import { newsArticles } from "@/lib/details/newsData";

export const metadata: Metadata = {
  title: "News & Press Releases | KOREVA GLOBAL LLP",
  description: "Stay updated with product launches, dealer network expansions, and manufacturing insights from KOREVA GLOBAL LLP.",
};

export default function NewsPage() {
  const featuredArticle = newsArticles[0];
  const secondaryArticles = newsArticles.slice(1);

  return (
    <div className="min-h-screen bg-light-100 py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-jost">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red">
            Corporate Communications
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black uppercase tracking-tight mt-1 mb-4">
            News & Press Announcements
          </h1>
          <div className="w-20 h-1.5 bg-brand-red mx-auto mb-4 rounded-full"></div>
          <p className="text-base sm:text-lg text-dark-700 max-w-2xl mx-auto font-medium">
            Stay up to date with the latest agricultural equipment releases, company milestones, and dealer network updates at KOREVA GLOBAL LLP.
          </p>
        </div>

        {/* Featured Article Hero Card */}
        {featuredArticle && (
          <Link
            href={`/news/${featuredArticle.id}`}
            className="group bg-white border border-light-300 shadow-sm rounded-lg overflow-hidden flex flex-col lg:flex-row mb-12 hover:shadow-xl hover:border-brand-red/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
          >
            <div className="w-full lg:w-[58%] relative min-h-[280px] sm:min-h-[350px] lg:min-h-[420px]">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-brand-red text-white text-xs font-bold uppercase px-3 py-1.5 rounded-xs tracking-wider">
                {featuredArticle.category}
              </div>
            </div>
            <div className="w-full lg:w-[42%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-3 text-xs text-dark-500 font-bold uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} className="text-brand-red" /> {featuredArticle.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><User size={14} className="text-brand-red" /> {featuredArticle.author}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black mb-4 group-hover:text-brand-red transition-colors leading-tight uppercase">
                  {featuredArticle.title}
                </h2>
                <p className="text-dark-700 text-sm sm:text-base leading-relaxed mb-6 font-medium line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-light-200 flex items-center justify-between">
                <span className="inline-flex items-center text-brand-red font-extrabold uppercase text-xs sm:text-sm tracking-wider">
                  Read Full Press Release
                </span>
                <div className="w-8 h-8 rounded-full bg-brand-red/10 group-hover:bg-brand-red text-brand-red group-hover:text-white flex items-center justify-center transition-colors">
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
              className="group bg-white border border-light-300 shadow-sm rounded-lg overflow-hidden flex flex-col h-full hover:shadow-xl hover:border-brand-red/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              <div className="w-full relative aspect-[16/9] overflow-hidden bg-gray-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-black text-white text-xs font-bold uppercase px-3 py-1 rounded-xs tracking-wider">
                  {article.category}
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-dark-500 font-bold uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1"><Calendar size={14} className="text-brand-red" /> {article.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-black mb-3 group-hover:text-brand-red transition-colors uppercase leading-tight">
                  {article.title}
                </h3>
                <p className="text-dark-700 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-light-200 flex items-center justify-between text-brand-red font-extrabold uppercase text-xs tracking-wider">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter Subscription Banner */}
        <div className="bg-brand-black text-white p-8 md:p-12 rounded-lg shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border-b-4 border-brand-red">
          <div className="absolute -right-20 -bottom-20 text-white/5 pointer-events-none">
            <Newspaper size={300} />
          </div>
          <div className="relative z-10 md:w-1/2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red mb-1 block">
              Stay Informed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-3">
              Subscribe to KOREVA GLOBAL News
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-medium">
              Receive instant updates on agricultural machinery releases, technical guides, and authorized dealership openings.
            </p>
          </div>
          <div className="relative z-10 md:w-1/2 w-full max-w-md">
            <form className="flex flex-col sm:flex-row gap-3" action="#">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white text-dark-900 text-sm font-medium rounded-xs focus:outline-none focus:ring-2 focus:ring-brand-red"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-red text-white font-bold uppercase tracking-wider text-xs hover:bg-brand-red-accent transition-colors rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
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
