import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutUsPreview() {
  return (
    <section className="relative w-full h-auto min-h-[500px] py-16 md:py-24 md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Brand Red Accent Stripe at the top */}
      <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-brand-red z-20 shadow-md" />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about_factory_1784013199832.jpg"
          alt="KOREVA Manufacturing Vision"
          fill
          className="object-cover"
        />
        {/* Dark overlay with subtle red gradient at bottom */}
        <div className="absolute inset-0 bg-brand-black/85 bg-gradient-to-t from-[#2a0000]/70 to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-4 md:gap-6">
        <p className="text-brand-red font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-xs md:text-sm">
          A New Era of Agriculture
        </p>
        <h2 className="text-light-100 font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-widest relative pb-3 md:pb-4 leading-tight">
          ABOUT KOREVA
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 md:w-16 h-1 bg-brand-red rounded-full" />
        </h2>
        
        <p className="text-light-200 text-sm sm:text-base md:text-lg leading-relaxed mt-2 md:mt-4">
          KOREVA is an upcoming, proudly Indian brand dedicated to transforming the agricultural landscape. We are building a robust portfolio of high-quality machinery, premium lubricants, and durable hand tools designed specifically for the unique needs of the Indian farmer.
        </p>
        <p className="text-light-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
          Driven by innovation and a commitment to rural empowerment, our upcoming state-of-the-art facilities will ensure that every product carrying the KOREVA name represents unparalleled reliability and trust.
        </p>
        <Link 
          href="/about" 
          className="mt-6 md:mt-8 flex items-center justify-center gap-2 text-light-100 bg-brand-red hover:bg-brand-red-accent border border-brand-red font-semibold text-xs sm:text-sm transition-all duration-300 group px-8 py-3.5 md:px-10 md:py-4 rounded-full uppercase tracking-wider shadow-lg hover:shadow-brand-red/40 w-full sm:w-auto"
        >
          DISCOVER OUR VISION
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
