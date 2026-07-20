import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "../ScrollReveal";

const solutions = [
  {
    title: "AGRI MACHINERY",
    description: "Next-gen machinery tailored for Indian soils, including Laser Land Levellers, Straw Reapers, Power Sprayers, and heavy-duty Weeders.",
    image: "/images/agri_machinery_new_1784014752914.jpg",
    link: "/products"
  },
  {
    title: "GARDEN HAND TOOLS",
    description: "An extensive collection of 25+ unique, highly durable hand tools including Bill Hooks, Hand Sprayers, Shovels, and more.",
    image: "/images/garden_tools_new_1784014762909.jpg",
    link: "/products"
  },
  {
    title: "PREMIUM LUBRICANTS",
    description: "High-performance engine lubricants engineered to maximize the lifespan and efficiency of your agricultural machinery.",
    image: "/images/lubricants_new_1784014772364.jpg",
    link: "/products"
  }
];

export function OurSolutions() {
  return (
    <section className="bg-light-100 py-16 md:py-24 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-red-accent to-brand-red opacity-10" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 md:gap-6">
          <ScrollReveal animation="slide-left" className="flex-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black uppercase tracking-tight">
              KOREVA SOLUTIONS
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="slide-right" className="flex-1 flex justify-start md:justify-end">
            <p className="max-w-md text-brand-dark text-sm md:text-base border-l-4 border-brand-red pl-4 leading-relaxed">
              From heavy-duty field preparation to precision gardening and maintenance, KOREVA provides a complete ecosystem of tools designed for the modern Indian farmer.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {solutions.map((solution, index) => (
            <ScrollReveal
              key={index}
              animation="slide-bottom"
              delay={index * 150}
            >
              <div
                className="group relative h-[380px] md:h-[420px] overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {/* Subtle red accent line at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-brand-red z-30 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

                {/* Background Image */}
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/50 md:via-brand-black/40 to-transparent z-10" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
                  <p className="text-brand-red text-[10px] md:text-xs font-bold mb-1 md:mb-2 tracking-[0.2em] uppercase">KOREVA PRODUCT LINE</p>
                  <h3 className="text-light-100 text-xl md:text-2xl font-bold uppercase mb-2 md:mb-4 group-hover:text-brand-red transition-colors duration-300">
                    {solution.title}
                  </h3>
                  {/* Mobile: always show description. Desktop: show on hover */}
                  <p className="text-light-200 text-sm mb-4 md:mb-6 opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 leading-relaxed">
                    {solution.description}
                  </p>
                  <Link
                    href={solution.link}
                    className="flex items-center gap-2 text-brand-red font-bold text-xs md:text-sm group/link w-fit tracking-wide uppercase"
                  >
                    Explore Category
                    <div className="bg-brand-red text-light-100 rounded-full p-1.5 transition-transform duration-300 group-hover/link:translate-x-1 shadow-md">
                      <ArrowRight className="w-3 md:w-3.5 h-3 md:h-3.5" />
                    </div>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
