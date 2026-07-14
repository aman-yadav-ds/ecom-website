import Image from "next/image";

const strengths = [
  {
    title: "MADE FOR INDIA",
    description: "Our upcoming products are engineered specifically to withstand the harsh conditions and diverse terrains of Indian agriculture. We understand the local needs and are building for them.",
    image: "/images/manufacturing.png"
  },
  {
    title: "ISO 9001:2015 CERTIFIED",
    description: "We adhere to the highest international quality management standards. Every KOREVA machine undergoes strict quality control to ensure maximum reliability and performance on the field.",
    image: "/images/hero_bg_1784013135158.png"
  },
  {
    title: "DEDICATED SUPPORT",
    description: "We are establishing a strong foundation for after-sales service. When we launch, you can expect swift, reliable support to keep your operations running smoothly.",
    image: "/images/manufacturing.png"
  },
  {
    title: "NATIONWIDE REACH",
    description: "KOREVA is building an extensive network of authorized dealers across India to ensure our products and support are accessible to farmers in every state.",
    image: "/images/about_factory_1784013199832.png"
  },
  {
    title: "GUARANTEED SPARE PARTS",
    description: "Downtime costs money. We guarantee a well-stocked inventory of genuine spare parts across our network from day one, ensuring seamless maintenance.",
    image: "/images/manufacturing.png"
  },
  {
    title: "SUBSIDY ELIGIBLE",
    description: "Our products are eligible for Government-allotted subsidies across various states, making our high-quality machinery even more accessible and budget-friendly for farmers.",
    image: "/images/agri_machinery_new_1784014752914.png"
  }
];

export function OurStrength() {
  return (
    <section className="bg-light-200 py-16 md:py-24 px-4 border-y border-light-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-6">
          <div className="w-full md:w-auto">
             <div className="flex items-center gap-4 mb-2">
              <div className="h-[2px] w-8 md:w-12 bg-brand-red"></div>
              <span className="text-brand-red font-semibold tracking-widest text-xs md:text-sm uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black uppercase">
              THE KOREVA PROMISE
            </h2>
          </div>
          <p className="max-w-md text-brand-dark text-sm md:text-base text-left md:text-right mt-2 md:mt-0 border-l-4 md:border-l-0 md:border-r-4 border-brand-red pl-4 md:pl-0 md:pr-4">
            As a new brand entering the Indian market, our strength lies in our unwavering commitment to quality, extensive planned reach, and a purely customer-centric approach. We are building a legacy of trust.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {strengths.map((strength, index) => (
            <div 
              key={index} 
              className="group relative h-auto min-h-[220px] md:h-[260px] overflow-hidden rounded-xl border-l-4 border-brand-red/0 hover:border-brand-red transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              {/* Background Image */}
              <Image
                src={strength.image}
                alt={strength.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Dark Gradient Overlay with hint of red */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-black/95 to-brand-black/85 group-hover:from-brand-black/90 group-hover:to-[#3a0000]/85 transition-colors duration-500 z-10" />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center z-20">
                <h3 className="text-light-100 text-lg md:text-xl font-bold uppercase mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                  <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-brand-red inline-block shadow-[0_0_8px_rgba(211,47,47,0.8)]"></span>
                  {strength.title}
                </h3>
                <p className="text-light-300 text-xs md:text-sm leading-relaxed border-t border-light-300/10 pt-3 md:pt-4">
                  {strength.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
