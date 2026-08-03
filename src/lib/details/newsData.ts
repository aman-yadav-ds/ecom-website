export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  author: string;
  category: string;
  image: string;
  relatedProducts?: { id: string; name: string; href: string }[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "koreva-expands-dealer-network-north-india",
    title: "KOREVA GLOBAL LLP Expands Authorized Dealer Network Across North & Central India",
    excerpt: "We are thrilled to announce the onboarding of 25 new authorized KOREVA dealerships across Punjab, Haryana, and Uttar Pradesh, bringing our premium agricultural machinery closer to local farmers.",
    date: "July 12, 2026",
    author: "KOREVA Corporate Communications",
    category: "Network Expansion",
    image: "/media/news_dealership.jpg",
    content: [
      "KOREVA GLOBAL LLP, a leading Indian manufacturer of agricultural implements and power machinery, has officially expanded its authorized dealer network by adding 25 new dealership hubs across key agricultural regions in North and Central India.",
      "The expansion aims to provide local farming communities with direct access to KOREVA's high-yield Power Weeders (DHURANDHAR & VIJAY), tractor-mounted Disc Harrows (RAINO), Rotavators (KOBRA), and certified STOU lubricants, alongside guaranteed on-site technical support.",
      "Speaking on the network expansion, KOREVA Leadership stated: 'Our mission is to empower the Indian farmer with reliable technology and zero downtime. By establishing these 25 new dealer hubs, we ensure that genuine OEM spare parts and certified service engineers are always within a short drive from every farm.'",
      "Each new authorized dealership is equipped with a dedicated spare parts inventory, display showroom for field demonstrations, and certified mechanics trained to perform routine maintenance and state agricultural subsidy documentation."
    ],
    relatedProducts: [
      { id: "ko-weeeder-dhurandhar", name: "Power Weeder (DHURANDHAR)", href: "/products/ko-weeeder-dhurandhar" },
      { id: "ko-rotavator", name: "Rotavator (KOBRA)", href: "/products/ko-rotavator" }
    ]
  },
  {
    id: "2",
    slug: "introducing-7hp-khet-shakti-power-weeder",
    title: "Introducing the KOREVA DHURANDHAR 7HP Heavy Duty Self-Propelled Power Weeder",
    excerpt: "Meet the latest addition to our self-propelled machinery lineup. Engineered specifically for Indian soil conditions, the KOREVA DHURANDHAR offers unprecedented torque, depth control, and fuel efficiency.",
    date: "June 28, 2026",
    author: "KOREVA Product Engineering",
    category: "Product Launch",
    image: "/products/power-weeder-dhurandhar.webp",
    content: [
      "KOREVA GLOBAL LLP has officially launched the KOREVA DHURANDHAR 7HP Heavy Duty Power Weeder, a next-generation walk-behind cultivator designed to tackle hard-packed soils and inter-crop weeding with high efficiency.",
      "Engineered with a heavy-duty 4-stroke air-cooled engine and reinforced steel tines, the DHURANDHAR 7HP delivers 3600 RPM output while maintaining minimal fuel consumption, allowing farmers to cultivate up to 1.5 acres on a single fuel tank.",
      "The machine features an adjustable tilling width (up to 1050 mm) and working depth control (100–300 mm), making it ideal for sugarcane, cotton, orchard, and vegetable farming.",
      "In addition, the DHURANDHAR is fully compliant with state agricultural machinery subsidies, making top-tier weed control accessible to smallholder and commercial farmers alike."
    ],
    relatedProducts: [
      { id: "ko-weeeder-dhurandhar", name: "Power Weeder (DHURANDHAR)", href: "/products/ko-weeeder-dhurandhar" },
      { id: "ko-bc-jpro", name: "Brush Cutter (JUNGLE PRO)", href: "/products/ko-bc-jpro" }
    ]
  },
  {
    id: "3",
    slug: "q2-operations-update-supply-chain-triumphs",
    title: "KOREVA GLOBAL LLP Localizes 95% OEM Spare Parts Production in Q2 2026",
    excerpt: "An operational update on how KOREVA GLOBAL LLP successfully localized 95% of our spare parts manufacturing in the second quarter of 2026, ensuring zero inventory delays for our dealer network.",
    date: "May 15, 2026",
    author: "KOREVA Manufacturing Operations",
    category: "Company Update",
    image: "/products/harrow-8x8.webp",
    content: [
      "KOREVA GLOBAL LLP is proud to report that 95% of all agricultural implement spare parts, including tiller tines, gearbox gears, rotor shafts, and cutting blades, are now produced in-house across our Indian OEM manufacturing facilities.",
      "By localizing key component manufacturing, KOREVA has eliminated reliance on imported replacement parts, ensuring stable pricing and same-day dispatch for dealer orders across India.",
      "Quality Assurance testing confirms that localized high-grade boron steel tines exhibit 30% greater wear resistance during field operation in rocky and abrasive soils compared to standard market alternatives.",
      "Looking forward to H2 2026, KOREVA plans to further scale its OEM manufacturing output to support international export demand across South Asia and East Africa."
    ],
    relatedProducts: [
      { id: "ko-harrow-raino", name: "Harrow (RAINO)", href: "/products/ko-harrow-raino" },
      { id: "ko-stou-15w40", name: "STOU 15W-40 Lubricant", href: "/products/ko-stou-15w40" }
    ]
  }
];
