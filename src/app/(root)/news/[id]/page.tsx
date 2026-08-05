import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calendar, User, ArrowLeft, ArrowRight, Tag, ShieldCheck, ChevronLeft } from "lucide-react";
import { getCachedNewsArticles } from "@/lib/cached-queries";

import {
  formatPageSeoTitle,
  formatPageSeoDescription,
  buildProductMetadata,
} from "@/lib/seo";

interface NewsDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const newsArticlesList = await getCachedNewsArticles();
  return newsArticlesList.map((article) => ({
    id: article.id,
  }));
}

export async function generateMetadata({ params }: NewsDetailProps): Promise<Metadata> {
  const resolvedParams = await params;
  const newsArticlesList = await getCachedNewsArticles();
  const article = newsArticlesList.find((a) => a.id === resolvedParams.id);

  if (!article) {
    return buildProductMetadata({
      title: formatPageSeoTitle("Article Not Found"),
      description: formatPageSeoDescription("The requested news article could not be found on Koreva9."),
      canonicalUrl: "/news",
    });
  }

  const title = formatPageSeoTitle(article.title);
  const description = formatPageSeoDescription(article.excerpt);
  const articleUrl = `/news/${article.id}`;

  return buildProductMetadata({
    title,
    description,
    canonicalUrl: articleUrl,
    imageUrl: article.image,
    imageAlt: article.title,
    keywords: [article.category, "Agricultural Machinery News"],
  });
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const resolvedParams = await params;
  const newsArticlesList = await getCachedNewsArticles();
  const article = newsArticlesList.find((a) => a.id === resolvedParams.id);

  if (!article) {
    notFound();
  }

  const currentIndex = newsArticlesList.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? newsArticlesList[currentIndex - 1] : null;
  const nextArticle = currentIndex < newsArticlesList.length - 1 ? newsArticlesList[currentIndex + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [`https://korevaglobal.com${article.image}`],
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: article.author,
      url: "https://korevaglobal.com",
    },
    publisher: {
      "@type": "Organization",
      name: "KOREVA GLOBAL LLP",
      logo: {
        "@type": "ImageObject",
        url: "https://korevaglobal.com/trademark.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://korevaglobal.com/news/${article.id}`,
    },
  };

  return (
    <main className="min-h-screen bg-[#fbfbfb] text-dark-900 py-8 sm:py-12 md:py-16 font-jost">
      {/* JSON-LD Script for Google SEO Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link Nav */}
        <div className="mb-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel border border-light-300 text-xs font-extrabold text-dark-700 hover:text-brand-red uppercase tracking-wider transition-colors shadow-xs"
          >
            <ChevronLeft className="w-4 h-4 text-brand-red" />
            <span>Back to Corporate News</span>
          </Link>
        </div>

        {/* Main Article Container */}
        <article className="glass-panel-elevated border border-light-300 rounded-3xl shadow-md overflow-hidden p-6 sm:p-10 md:p-12 bg-white/90 backdrop-blur-2xl">
          {/* Article Category & Meta Header */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
            <span className="bg-brand-red text-white text-xs font-extrabold uppercase px-3.5 py-1 rounded-full tracking-wider shadow-xs">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-dark-600 font-extrabold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-brand-red" />
              <span>{article.date}</span>
            </div>
            <span className="text-dark-300 hidden xs:inline">•</span>
            <div className="flex items-center gap-1.5 text-xs text-dark-600 font-extrabold uppercase tracking-wider">
              <User className="w-3.5 h-3.5 text-brand-red" />
              <span>{article.author}</span>
            </div>
          </div>

          {/* Article H1 Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-dark-900 uppercase tracking-tight leading-snug sm:leading-tight mb-6">
            {article.title}
          </h1>

          {/* Hero Article Image */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] mb-6 sm:mb-8 rounded-2xl overflow-hidden border border-light-200 shadow-xs">
            <Image
              src={article.image}
              alt={`${article.title} - KOREVA GLOBAL LLP`}
              fill
              className="object-cover"
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          {/* Lead Excerpt Block */}
          <div className="p-5 sm:p-6 bg-light-100 border-l-4 border-brand-red rounded-r-2xl mb-6 sm:mb-8">
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
            <div className="mt-8 sm:mt-10 p-6 glass-panel border border-light-300 rounded-2xl shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-red mb-3 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-brand-red" /> Related Implements & Equipment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {article.relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={rel.href}
                    className="flex items-center justify-between p-3.5 bg-white border border-light-300 rounded-xl hover:border-brand-red group transition-all shadow-xs"
                  >
                    <span className="text-xs sm:text-sm font-bold text-dark-900 group-hover:text-brand-red transition-colors uppercase">
                      {rel.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-red transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Article Footer & Brand Guarantee */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-light-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-dark-600 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-red" />
              <span>Official Press Release by KOREVA GLOBAL LLP</span>
            </div>
            <Link
              href="/news"
              className="text-xs font-extrabold text-brand-red hover:underline uppercase tracking-wider flex items-center gap-1"
            >
              <span>Explore All News</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {/* Prev / Next Article Navigation Footer */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              href={`/news/${prevArticle.id}`}
              className="p-5 glass-card border border-light-300 rounded-2xl hover:border-brand-red transition-all group flex flex-col shadow-xs"
            >
              <span className="text-[11px] font-extrabold text-dark-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5 text-brand-red" /> Previous Release
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-dark-900 group-hover:text-brand-red transition-colors line-clamp-1 uppercase">
                {prevArticle.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextArticle && (
            <Link
              href={`/news/${nextArticle.id}`}
              className="p-5 glass-card border border-light-300 rounded-2xl hover:border-brand-red transition-all group flex flex-col items-start sm:items-end text-left sm:text-right shadow-xs"
            >
              <span className="text-[11px] font-extrabold text-dark-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                Next Release <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-dark-900 group-hover:text-brand-red transition-colors line-clamp-1 uppercase">
                {nextArticle.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
