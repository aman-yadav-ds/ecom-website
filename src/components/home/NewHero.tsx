import Image from "next/image";
import Link from "next/link";

export function NewHero() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] md:h-[80vh] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg_koreva.png"
          alt="KOREVA modern manufacturing"
          fill
          className="object-cover"
          priority
        />
        {/* Rich gradient overlay for a cinematic look */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/60 to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-4 md:gap-6 mt-12 md:mt-0 w-full">
        <p className="text-brand-red font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-xs md:text-sm animate-[fade-in_1s_ease-out]">
          Welcome to the future of Indian agriculture
        </p>
        <h1 className="text-light-100 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[72px] leading-tight tracking-tight uppercase animate-[fade-in_1s_ease-out_0.2s_both]">
          KOREVA: EMPOWERING <br className="hidden sm:block" /> THE INDIAN FARMER
        </h1>
        <p className="text-light-200 text-sm sm:text-base md:text-xl font-medium max-w-2xl animate-[fade-in_1s_ease-out_0.4s_both]">
          Bringing reliable, high-quality, and next-generation agricultural technology to every corner of India. Built on trust, driven by innovation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-[fade-in_1s_ease-out_0.6s_both] w-full sm:w-auto px-4 sm:px-0">
          <Link 
            href="/products" 
            className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-accent text-light-100 font-semibold py-3 px-6 md:py-4 md:px-10 rounded-full transition-all duration-300 hover:scale-105 inline-block uppercase tracking-wider shadow-lg hover:shadow-brand-red/50 text-sm md:text-base"
          >
            Explore Products
          </Link>
          <Link 
            href="/dealers" 
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-light-100 font-semibold py-3 px-6 md:py-4 md:px-10 rounded-full transition-all duration-300 hover:scale-105 inline-block uppercase tracking-wider text-sm md:text-base"
          >
            Find a Dealer
          </Link>
        </div>
      </div>
    </section>
  );
}
