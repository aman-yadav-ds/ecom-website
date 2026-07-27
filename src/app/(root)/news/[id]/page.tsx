import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calendar, User, ArrowLeft, ArrowRight, Tag, ShieldCheck, Share2 } from "lucide-react";
import { newsArticles } from "@/lib/details/newsData";

interface NewsDetailProps {
  params: Promise<{ id: string }>;
}

// SSG Prerendering for maximum server-side performance & SEO indexing
export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    id: article.id,
  }));
}

// Dynamic SEO Metadata Generation for Search Engines
export async function generateMetadata({ params }: NewsDetailProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = newsArticles.find((a) => a.id === resolvedParams.id);
  if (!article) {
    return {
      title: "Article Not Found | KOREVA GLOBAL LLP",
    };
  }

  const siteUrl = "https://korevaglobal.com";
  const articleUrl = `${siteUrl}/news/${article.id}`;

  return {
    title: `${article.title} | KOREVA GLOBAL News`,
    description: article.excerpt,
    keywords: [
      article.category,
      "KOREVA GLOBAL LLP",
      "Power Weeder",
      "Agricultural Implements India",
      "Tractor Machinery",
      "Farm Equipment News"
    ],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      siteName: "KOREVA GLOBAL LLP",
      locale: "en_IN",
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: `${siteUrl}${article.image}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [`${siteUrl}${article.image}`],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const resolvedParams = await params;
  const article = newsArticles.find((a) => a.id === resolvedParams.id);

  if (!article) {
    notFound();
  }

  const currentIndex = newsArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? newsArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < newsArticles.length - 1 ? newsArticles[currentIndex + 1] : null;

  // JSON-LD NewsArticle Structured Data for Google SEO indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.excerpt,
    "image": [`https://korevaglobal.com${article.image}`],
    "datePublished": article.date,
    "author": {
      "@type": "Organization",
      "name": article.author,
      "url": "https://korevaglobal.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KOREVA GLOBAL LLP",
      "logo": {
        "@type": "ImageObject",
        "url": "https://korevaglobal.com/trademark.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://korevaglobal.com/news/${article.id}`
    }
  };

  return (
    <main className="min-h-screen bg-light-100 py-8 sm:py-12 md:py-16 font-jost">
      {/* JSON-LD Script for Google SEO Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link Nav - Mobile-First Touch Target (min-h-44px) */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 min-h-[44px] px-3 py-2 text-xs sm:text-sm font-bold text-dark-700 hover:text-brand-red uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xs"
          >
            <ArrowLeft className="w-4 h-4 text-brand-red" />
            <span>Back to All News</span>
          </Link>
        </div>

        {/* Main Article Container */}
        <article className="bg-white border border-light-300 rounded-lg shadow-sm overflow-hidden p-4 sm:p-8 md:p-10">
          {/* Article Category & Meta Header */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
            <span className="bg-brand-red text-white text-[11px] sm:text-xs font-extrabold uppercase px-3 py-1 rounded-xs tracking-wider">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-dark-500 font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-brand-red" />
              <span>{article.date}</span>
            </div>
            <span className="text-dark-300 hidden xs:inline">•</span>
            <div className="flex items-center gap-1.5 text-xs text-dark-500 font-bold uppercase tracking-wider">
              <User className="w-3.5 h-3.5 text-brand-red" />
              <span>{article.author}</span>
            </div>
          </div>

          {/* Article H1 Title */}
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-dark-900 uppercase tracking-tight leading-snug sm:leading-tight mb-6">
            {article.title}
          </h1>

          {/* Hero Article Image - Mobile First Aspect Ratio */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] mb-6 sm:mb-8 rounded-md overflow-hidden bg-gray-100 border border-light-300">
            <Image
              src={article.image}
              alt={`${article.title} - KOREVA GLOBAL LLP`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          {/* Lead Excerpt Block */}
          <div className="p-4 sm:p-6 bg-light-200 border-l-4 border-brand-red rounded-r-md mb-6 sm:mb-8">
            <p className="text-sm sm:text-base md:text-lg font-bold text-dark-900 leading-relaxed italic">
              &quot;{article.excerpt}&quot;
            </p>
          </div>

          {/* Body Content Paragraphs */}
          <div className="prose max-w-none text-dark-700 space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Related Implements & Products SEO Widget */}
          {article.relatedProducts && article.relatedProducts.length > 0 && (
            <div className="mt-8 sm:mt-10 p-4 sm:p-6 bg-light-200/80 border border-light-300 rounded-md">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-red mb-3 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-brand-red" /> Related Implements & Equipment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {article.relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={rel.href}
                    className="flex items-center justify-between p-3 min-h-[44px] bg-white border border-light-300 rounded-xs hover:border-brand-red group transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                  >
                    <span className="text-xs sm:text-sm font-bold text-dark-900 group-hover:text-brand-red transition-colors">
                      {rel.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-red transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Article Footer & Brand Guarantee */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-light-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-dark-500 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-red" />
              <span>Official Release by KOREVA GLOBAL LLP</span>
            </div>
            <Link
              href="/news"
              className="text-xs font-bold text-brand-red hover:underline uppercase tracking-wider min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-xs"
            >
              Explore All Corporate News
            </Link>
          </div>
        </article>

        {/* Prev / Next Article Navigation Footer */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {prevArticle ? (
            <Link
              href={`/news/${prevArticle.id}`}
              className="p-4 bg-white border border-light-300 rounded-md hover:border-brand-red transition-all group flex flex-col min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              <span className="text-[11px] font-bold text-dark-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5 text-brand-red" /> Previous Release
              </span>
              <span className="text-xs sm:text-sm font-bold text-dark-900 group-hover:text-brand-red transition-colors line-clamp-1">
                {prevArticle.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextArticle && (
            <Link
              href={`/news/${nextArticle.id}`}
              className="p-4 bg-white border border-light-300 rounded-md hover:border-brand-red transition-all group flex flex-col items-start sm:items-end text-left sm:text-right min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              <span className="text-[11px] font-bold text-dark-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                Next Release <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
              </span>
              <span className="text-xs sm:text-sm font-bold text-dark-900 group-hover:text-brand-red transition-colors line-clamp-1">
                {nextArticle.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
