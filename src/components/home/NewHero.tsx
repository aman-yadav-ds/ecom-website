import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "../ScrollReveal";
import { Search, Zap, CheckCircle2 } from "lucide-react";

export function NewHero() {
  const popularKeywords = [
    { label: "Power Weeder", href: "/products?search=Power+Weeder" },
    { label: "Harrow", href: "/products?search=Harrow" },
    { label: "Rotavator", href: "/products?search=Rotavator" },
    { label: "Power Reaper", href: "/products?search=Power+Reaper" },
    { label: "STOU Lubricant", href: "/products/lubricants" },
  ];

  return (
    <section className="relative w-full min-h-[580px] md:min-h-[660px] flex items-center justify-center overflow-hidden font-jost">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg_koreva.jpg"
          alt="KOREVA GLOBAL LLP modern agricultural machinery manufacturing facility"
          fill
          className="object-cover"
          priority
        />
        {/* Rich gradient overlay for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/75 to-brand-black/40 z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-4 md:gap-6 py-16 w-full">
        {/* Brand Subtitle */}
        <ScrollReveal animation="fade" delay={0}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/40 text-white text-xs md:text-sm font-bold uppercase tracking-wider backdrop-blur-md">
            <Zap className="w-4 h-4 text-brand-red animate-pulse" />
            <span>KOREVA GLOBAL LLP — Precision Agricultural Equipment</span>
          </div>
        </ScrollReveal>
        
        {/* Main H1 Title for SEO */}
        <ScrollReveal animation="fade" delay={150}>
          <h1 className="text-light-100 font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight uppercase">
            KOREVA GLOBAL LLP <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-light-200 to-red-400">
              POWER WEEDERS, HARROWS & MACHINERY
            </span>
          </h1>
        </ScrollReveal>

        {/* SEO Description */}
        <ScrollReveal animation="fade" delay={300}>
          <p className="text-light-200 text-sm sm:text-base md:text-lg font-medium max-w-3xl leading-relaxed">
            Engineered by <strong className="text-white font-bold">KOREVA GLOBAL LLP</strong> for the tough demands of Indian farming. Discover heavy-duty <strong className="text-white font-bold">Power Weeders</strong>, tractor-mounted <strong className="text-white font-bold">Harrows</strong>, <strong className="text-white font-bold">Rotavators</strong>, <strong className="text-white font-bold">Power Reapers</strong>, and ISO certified <strong className="text-white font-bold">STOU Lubricants</strong>.
          </p>
        </ScrollReveal>

        {/* Interactive Quick Product Pills */}
        <ScrollReveal animation="fade" delay={400}>
          <div className="flex flex-wrap items-center justify-center gap-2 my-2">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1 mr-1">
              <Search className="w-3.5 h-3.5 text-brand-red" /> Quick Search:
            </span>
            {popularKeywords.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-1 bg-white/10 hover:bg-brand-red/90 border border-white/20 hover:border-brand-red text-white text-xs font-bold rounded-full transition-all duration-200 hover:scale-105 backdrop-blur-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* Action CTAs with 200ms transitions */}
        <ScrollReveal animation="fade" delay={500}>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto px-4 sm:px-0">
            <Link 
              href="/products" 
              className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-accent text-light-100 font-bold py-3.5 px-8 md:py-4 md:px-10 rounded-full transition-all duration-200 hover:scale-105 inline-flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg hover:shadow-brand-red/50 text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              <span>Explore Products</span>
              <CheckCircle2 className="w-5 h-5" />
            </Link>
            <Link 
              href="/dealers" 
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-light-100 font-bold py-3.5 px-8 md:py-4 md:px-10 rounded-full transition-all duration-200 hover:scale-105 inline-block uppercase tracking-wider text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              Find a Local Dealer
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

