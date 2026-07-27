import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "../ScrollReveal";

export function AboutUsPreview() {
  return (
    <section className="relative w-full h-auto py-16 md:py-24 flex items-center justify-center overflow-hidden font-jost">
      {/* Brand Red Accent Stripe at top */}
      <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-brand-red z-20 shadow-md" />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about_factory_1784013199832.jpg"
          alt="KOREVA GLOBAL LLP OEM Agricultural Machinery Manufacturing Plant"
          fill
          className="object-cover"
        />
        {/* Dark overlay with subtle red gradient */}
        <div className="absolute inset-0 bg-brand-black/90 bg-gradient-to-t from-[#2a0000]/80 via-brand-black/85 to-brand-black/80 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-4 md:gap-6">
        <ScrollReveal animation="fade">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red/20 border border-brand-red/40 text-brand-red text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-4 h-4" />
            <span>KOREVA GLOBAL LLP Corporate Overview</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade" delay={100}>
          <h2 className="text-light-100 font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider relative pb-4 leading-tight">
            ABOUT KOREVA GLOBAL LLP
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-brand-red rounded-full" />
          </h2>
        </ScrollReveal>
        
        <ScrollReveal animation="fade" delay={200}>
          <p className="text-light-200 text-sm sm:text-base md:text-lg leading-relaxed mt-2 font-medium">
            <strong className="text-white font-extrabold">KOREVA GLOBAL LLP</strong> is a premier Indian manufacturer and exporter dedicated to empowering agricultural productivity. We engineer an advanced lineup of <strong className="text-white font-bold">Power Weeders</strong>, tractor-mounted <strong className="text-white font-bold">Harrows</strong>, <strong className="text-white font-bold">Rotavators</strong>, ISO 9001 certified <strong className="text-white font-bold">STOU Lubricants</strong>, and forged <strong className="text-white font-bold">Hand Tools</strong>.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade" delay={300}>
          <p className="text-light-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium">
            Driven by innovation, OEM quality assurance, and a nationwide network of authorized dealer hubs, <strong className="text-white font-bold">KOREVA GLOBAL LLP</strong> ensures every product delivers long-lasting field reliability and exceptional return on investment for Indian farmers.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade" delay={400}>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-bold uppercase text-gray-300 tracking-wider">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-brand-red" /> ISO 9001:2015 Quality</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-brand-red" /> State Subsidy Compliant</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-brand-red" /> Pan-India Dealer Network</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade" delay={500}>
          <Link 
            href="/about" 
            className="mt-6 flex items-center justify-center gap-2 text-light-100 bg-brand-red hover:bg-brand-red-accent border border-brand-red font-bold text-xs sm:text-sm transition-all duration-200 group px-8 py-3.5 md:px-10 md:py-4 rounded-full uppercase tracking-wider shadow-lg hover:shadow-brand-red/40 w-full sm:w-auto hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
          >
            <span>Discover KOREVA GLOBAL Vision</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
