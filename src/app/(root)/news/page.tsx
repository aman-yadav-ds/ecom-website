"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User, Newspaper } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "KOREVA9 Expands Dealer Network in North India",
    excerpt: "We are thrilled to announce the onboarding of 15 new authorized KOREVA9 dealerships across Punjab and Haryana, bringing our premium agricultural machinery closer to local farmers.",
    date: "July 12, 2026",
    author: "KOREVA PR",
    category: "Network Expansion",
    image: "/media/news_dealership.jpg"
  },
  {
    id: "2",
    title: "Introducing the New 7HP Khet Shakti Power Weeder",
    excerpt: "Meet the latest addition to our self-propelled machinery lineup. Engineered specifically for Indian soil conditions, the KO-1260 offers unprecedented torque and fuel efficiency.",
    date: "June 28, 2026",
    author: "Product Team",
    category: "Product Launch",
    image: "/products/power-weeder-dhurandhar.webp"
  },
  {
    id: "3",
    title: "Q2 Operations Update: Navigating Supply Chain Triumphs",
    excerpt: "A message from our founders on how KOREVA9 successfully localized 95% of our spare parts manufacturing in the second quarter of 2026, ensuring zero delays for our dealers.",
    date: "May 15, 2026",
    author: "Founding Team",
    category: "Company Update",
    image: "/products/harrrow.webp" // Reusing a product image as a placeholder
  }
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-light-100 py-12 md:py-20 px-4 font-jost">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark uppercase tracking-wide mb-4">
            News & Announcements
          </h1>
          <div className="w-24 h-2 bg-brand-red mx-auto mb-6"></div>
          <p className="text-lg text-dark-700 max-w-2xl mx-auto">
            Stay up to date with the latest product launches, company milestones, and dealer network expansions at KOREVA9.
          </p>
        </div>

        {/* Featured Article */}
        <div className="bg-white border border-light-300 shadow-sm overflow-hidden flex flex-col lg:flex-row mb-12 group cursor-pointer hover:shadow-lg transition-all">
          <div className="w-full lg:w-[60%] relative min-h-[350px] lg:min-h-[450px]">
            <Image
              src={newsItems[0].image}
              alt={newsItems[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-6 left-6 bg-brand-red text-white text-xs font-bold uppercase px-4 py-2 tracking-wider">
              {newsItems[0].category}
            </div>
          </div>
          <div className="w-full lg:w-[40%] p-8 lg:p-12 flex flex-col justify-center bg-white">
            <div className="flex items-center gap-4 text-xs text-dark-700 font-medium uppercase tracking-wider mb-4">
              <span className="flex items-center gap-1"><Calendar size={14} /> {newsItems[0].date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><User size={14} /> {newsItems[0].author}</span>
            </div>
            <h2 className="text-3xl font-bold text-brand-black mb-6 group-hover:text-brand-red transition-colors leading-tight">
              {newsItems[0].title}
            </h2>
            <p className="text-dark-700 text-lg leading-relaxed mb-8">
              {newsItems[0].excerpt}
            </p>
            <div className="mt-auto">
              <span className="inline-flex items-center px-8 py-3 bg-brand-dark text-white font-bold uppercase text-sm group-hover:bg-brand-red transition-colors">
                Read Full Story
              </span>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {newsItems.slice(1).map((news) => (
            <div key={news.id} className="bg-white border border-light-300 shadow-sm group cursor-pointer hover:shadow-lg transition-all flex flex-col h-full overflow-hidden">
              <div className="w-full relative aspect-[16/9] overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-dark-900 text-white text-xs font-bold uppercase px-3 py-1 tracking-wider">
                  {news.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-dark-700 font-medium uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {news.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-4 group-hover:text-brand-red transition-colors">
                  {news.title}
                </h3>
                <p className="text-dark-700 leading-relaxed mb-8 line-clamp-3">
                  {news.excerpt}
                </p>
                <div className="mt-auto">
                  <span className="inline-flex items-center text-brand-red font-bold uppercase text-sm group-hover:underline">
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription Banner */}
        <div className="bg-brand-dark text-white p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute -right-20 -bottom-20 text-white/5 pointer-events-none">
            <Newspaper size={300} />
          </div>
          <div className="relative z-10 md:w-1/2">
            <h2 className="text-3xl font-bold uppercase tracking-wide mb-4">
              Subscribe to KOREVA9 News
            </h2>
            <p className="text-light-200 text-lg">
              Get the latest updates on new product releases and exclusive dealer opportunities delivered straight to your inbox.
            </p>
          </div>
          <div className="relative z-10 md:w-1/2 w-full max-w-md">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white text-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-red font-jost"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-red text-white font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-light-300 mt-3">
              We respect your privacy. Read our <Link href="/cookies" className="underline hover:text-white">Cookie Policy</Link>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
