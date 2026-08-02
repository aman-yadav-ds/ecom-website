"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";

export function AboutUsPreview() {
  return (
    <section className="relative w-full h-auto py-20 md:py-28 flex items-center justify-center overflow-hidden font-jost bg-[#fbfbfb] border-b border-light-300">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about_factory_1784013199832.jpg"
          alt="KOREVA GLOBAL LLP OEM Agricultural Machinery Manufacturing Plant"
          fill
          sizes="100vw"
          className="object-cover scale-105 filter brightness-95 opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbfb]/90 via-[#fbfbfb]/80 to-[#fbfbfb] z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-5 md:gap-7">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-brand-red text-xs font-bold uppercase tracking-widest border border-brand-red/20 shadow-xs">
            <Building2 className="w-4 h-4" />
            <span>KOREVA GLOBAL LLP Corporate Overview</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-dark-900 font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider relative pb-4 leading-tight">
            ABOUT KOREVA GLOBAL LLP
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-brand-red rounded-full" />
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-dark-700 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
            <strong className="text-dark-900 font-extrabold">KOREVA GLOBAL LLP</strong> is a premier Indian manufacturer and exporter dedicated to empowering agricultural productivity. We engineer an advanced lineup of <strong className="text-dark-900 font-bold">Power Weeders</strong>, tractor-mounted <strong className="text-dark-900 font-bold">Harrows</strong>, <strong className="text-dark-900 font-bold">Rotavators</strong>, ISO 9001 certified <strong className="text-dark-900 font-bold">STOU Lubricants</strong>, and forged <strong className="text-dark-900 font-bold">Hand Tools</strong>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-dark-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium">
            Driven by innovation, OEM quality assurance, and a nationwide network of authorized dealer hubs, <strong className="text-dark-900 font-bold">KOREVA GLOBAL LLP</strong> ensures every product delivers long-lasting field reliability and exceptional return on investment for Indian farmers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mt-2 flex flex-wrap justify-center gap-4 text-xs font-bold uppercase text-dark-800 tracking-wider">
            <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-panel border border-light-300 shadow-xs"><CheckCircle2 className="w-4 h-4 text-brand-red" /> ISO 9001:2015 Quality</span>
            <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-panel border border-light-300 shadow-xs"><CheckCircle2 className="w-4 h-4 text-brand-red" /> State Subsidy Compliant</span>
            <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-panel border border-light-300 shadow-xs"><CheckCircle2 className="w-4 h-4 text-brand-red" /> Pan-India Dealer Network</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link 
            href="/about" 
            className="mt-4 flex items-center justify-center gap-2 text-white bg-brand-red hover:bg-brand-red-accent border border-brand-red font-bold text-xs sm:text-sm transition-all duration-300 group px-9 py-4 rounded-full uppercase tracking-wider shadow-lg hover:shadow-brand-red/30 w-full sm:w-auto hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red active:scale-95"
          >
            <span>Discover KOREVA Vision</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


