import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-light-100 flex flex-col font-jost">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero_bg_koreva.jpg"
              alt="KOREVA9 Manufacturing"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-brand-black/80 z-10" />
          </div>
          <ScrollReveal animation="slide-bottom" className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
            <p className="text-brand-red font-bold tracking-[0.2em] uppercase text-sm mb-4">
              ABOUT KOREVA9
            </p>
            <h1 className="text-light-100 font-bold text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight">
              A LEGACY IN THE MAKING
            </h1>
          </ScrollReveal>
        </section>

        {/* Introduction Section */}
        <section className="py-20 px-4">
          <ScrollReveal animation="fade" className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black uppercase mb-8">
              Who We Are
            </h2>
            <p className="text-brand-dark text-lg leading-relaxed mb-6">
              Welcome to <strong className="text-brand-black">KOREVA9</strong>, a proud brand of <strong className="text-brand-black">KOREVA GLOBAL LLP</strong>. We are a passionate, emerging force in the Indian agricultural sector, dedicated to empowering farmers with state-of-the-art machinery, robust garden hand tools, and high-performance lubricants.
            </p>
            <p className="text-brand-dark text-lg leading-relaxed">
              Based in Uttarakhand, India, our mission is simple: to provide high-quality, affordable, and sustainable farming solutions designed specifically for the unique challenges of Indian soils and terrains.
            </p>
          </ScrollReveal>
        </section>

        {/* Core Values Section */}
        <section className="bg-light-200 py-20 px-4 border-y border-light-300">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="slide-bottom" className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-black uppercase mb-4">
                Our Core Values
              </h2>
              <div className="w-16 h-1 bg-brand-red mx-auto rounded-full" />
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Value 1 */}
              <ScrollReveal animation="fade" delay={0}>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-light-300 hover:border-brand-red transition-colors text-center h-full">
                  <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-brand-red" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-black mb-3">FARMER FIRST</h3>
                  <p className="text-brand-dark text-sm leading-relaxed">
                    Every product we design under the KOREVA9 brand is built with the farmer's profitability, comfort, and success in mind.
                  </p>
                </div>
              </ScrollReveal>
              
              {/* Value 2 */}
              <ScrollReveal animation="fade" delay={150}>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-light-300 hover:border-brand-red transition-colors text-center h-full">
                  <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-8 h-8 text-brand-red" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-black mb-3">UNCOMPROMISING QUALITY</h3>
                  <p className="text-brand-dark text-sm leading-relaxed">
                    As an ISO 9001:2015 certified company, KOREVA GLOBAL LLP ensures that every machine undergoes rigorous field testing.
                  </p>
                </div>
              </ScrollReveal>

              {/* Value 3 */}
              <ScrollReveal animation="fade" delay={300}>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-light-300 hover:border-brand-red transition-colors text-center h-full">
                  <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-8 h-8 text-brand-red" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-black mb-3">INNOVATION</h3>
                  <p className="text-brand-dark text-sm leading-relaxed">
                    We are constantly investing in R&D to bring next-generation agricultural technology to the Indian market.
                  </p>
                </div>
              </ScrollReveal>

              {/* Value 4 */}
              <ScrollReveal animation="fade" delay={450}>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-light-300 hover:border-brand-red transition-colors text-center h-full">
                  <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Leaf className="w-8 h-8 text-brand-red" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-black mb-3">SUSTAINABILITY</h3>
                  <p className="text-brand-dark text-sm leading-relaxed">
                    From Zero Liquid Discharge manufacturing to eco-friendly engines, KOREVA9 is committed to a greener India.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Vision CTA */}
        <section className="py-24 px-4 bg-brand-black text-center">
          <ScrollReveal animation="slide-bottom" className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-light-100 uppercase tracking-wide mb-6">
              Join the KOREVA9 Family
            </h2>
            <p className="text-light-300 text-lg mb-10">
              We are actively expanding our dealer network across India. Partner with KOREVA GLOBAL LLP and be a part of the agricultural revolution.
            </p>
            <Link 
              href="/dealers" 
              className="bg-brand-red hover:bg-brand-red-accent text-light-100 font-semibold py-4 px-10 rounded-full transition-all duration-300 inline-flex items-center justify-center uppercase tracking-wider gap-2 group"
            >
              Become a Dealer
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </section>
      </main>
    </div>
  );
}
