import { Product } from "../types";

export const exampleProducts: Product[] = [
  {
    id: "ko-harrow-raino",
    name: "KOREVA - Harrow (RAINO)",
    description: "High-quality tractor-mounted harrow for tilling and optimal soil preparation.",
    categoryId: "tractor-attachments",
    tags: ["Harrow", "Tractor Attachment", "Tillage", "Soil Preparation", "Harrows"],
    coverImage: "/products/harrrow.webp",
    isPublished: true,
    defaultVariantId: "ko-raino-disc"
  },
  {
    id: "ko-rotavator",
    name: "KOREVA - Rotavator",
    description: "Reliable tractor-mounted rotavator for efficient seedbed preparation.",
    categoryId: "tractor-attachments",
    tags: ["Rotavator", "Tractor Attachment", "Tillage", "Seedbed", "Rotavator 7ft", "Rotavators", "Rotavator 8ft", "Rotavator 6ft", "7ft", "8ft"],
    coverImage: "/products/rotavator.png",
    isPublished: true,
    defaultVariantId: "ko-kobra-6ft"
  },
  {
    id: "ko-weeeder-dhurandhar",
    name: "KOREVA - Power Weeder (DHURANDHAR)",
    description: "Powerful self-propelled walk-behind tractor designed for heavy-duty weeding and agricultural tasks.",
    categoryId: "self-propelled-machinery",
    tags: ["Power Weeder", "Self Propelled", "Weeding", "Tillage"],
    coverImage: "/products/power-weeder-dhurandhar.webp",
    isPublished: true,
    defaultVariantId: "ko-1080"
  },
  {
    id: "ko-weeder-vijay",
    name: "KOREVA - Power Weeder (VIJAY)",
    description: "Powerful self-propelled walk-behind tractor designed for heavy-duty weeding and agricultural tasks.",
    categoryId: "self-propelled-machinery",
    tags: ["Power Weeder", "Self Propelled", "Weeding", "Tillage"],
    coverImage: "/products/power-weeder-dhurandhar.webp",
    isPublished: true,
    defaultVariantId: "ko-1110"
  },
  {
    id: "ko-pr-khetshakti",
    name: "KOREVA - Power Reaper (KHET SHAKTI)",
    description: "Efficient power reaper for fast, reliable, and clean crop harvesting.",
    categoryId: "self-propelled-machinery",
    tags: ["Power Reaper", "Harvesting", "Self Propelled"],
    coverImage: "/products/power-reaper.webp",
    isPublished: true,
    defaultVariantId: "ko-1260"
  },
  {
    id: "ko-bc-jpro",
    name: "KOREVA - Brush Cutter (JUNGLE PRO)",
    description: "Versatile brush cutter for clearing grass, weeds, and small bushes effortlessly.",
    categoryId: "self-propelled-machinery",
    tags: ["Brush Cutter", "Weed Cutting", "Self Propelled"],
    coverImage: "/products/brushcutter.webp",
    isPublished: true,
    defaultVariantId: "ko-bc-jpro-sp"
  },
  {
    id: "ko-pulveriser",
    name: "KOREVA - Pulveriser (GRAH LAXMI)",
    description: "High-performance pulveriser for grinding spices, grains, and herbs.",
    categoryId: "food-processing-units",
    tags: ["Pulveriser", "Food Processing", "Grinding"],
    coverImage: "/products/Pulverizer.webp",
    isPublished: true,
    defaultVariantId: "ko-pulv-1170"
  },
  {
    id: "ko-ricemill",
    name: "MINI Rice Mill",
    description: "Compact and efficient MINI Rice Mill for small-scale commercial or home milling.",
    categoryId: "food-processing-units",
    tags: ["Rice Mill", "Food Processing", "Milling"],
    coverImage: "/products/mini-rice-mill.png",
    isPublished: true,
    defaultVariantId: "ko-ricemill-1080"
  },
  // Lubricants
  {
    id: "ko-stou-15w40",
    name: "KOREVA - Super Tractor Oil Universal (STOU 15W-40)",
    description: "Multi-purpose premium lubricant specially formulated for tractor engines, hydraulic systems, wet brakes, and transmissions.",
    categoryId: "lubricants",
    tags: ["Tractor Fluid", "Engine Oil", "Hydraulic Oil", "STOU", "Lubricant", "15W-40"],
    coverImage: "/products/stou-lubricant.png",
    isPublished: true,
    defaultVariantId: "ko-stou-5l"
  },
  {
    id: "ko-4t-agro-20w50",
    name: "KOREVA - Heavy Duty 4T Agro Engine Oil (20W-50)",
    description: "High-performance thermal-stable 4-stroke engine oil designed for power weeders, reapers, and small agricultural engines.",
    categoryId: "lubricants",
    tags: ["4T Oil", "Engine Oil", "Weeder Oil", "20W-50", "Lubricants"],
    coverImage: "/products/4t-agro-lubricant.png",
    isPublished: true,
    defaultVariantId: "ko-4t-3-5l"
  },
  // Hand Tools
  {
    id: "ko-secateur-pro",
    name: "KOREVA - Bypass Pruning Secateur (PRO PRUNER)",
    description: "Professional drop-forged SK5 steel pruning shears with ergonomic non-slip grip for precise orchard and vineyard maintenance.",
    categoryId: "hand-tools",
    tags: ["Secateur", "Pruning Shears", "Garden Tools", "Hand Tools", "SK5 Steel"],
    coverImage: "/products/secateur-pro.png",
    isPublished: true,
    defaultVariantId: "ko-secateur-8inch"
  },
  {
    id: "ko-sickle-agro",
    name: "KOREVA - Heavy Duty Grass & Weed Sickle (AGRO CUT)",
    description: "High-carbon manganese steel harvesting sickle featuring an induction-hardened edge and comfortable wooden handle.",
    categoryId: "hand-tools",
    tags: ["Sickle", "Harvesting Tool", "Hand Tools", "Weed Cutting"],
    coverImage: "/products/sickle-agro.png",
    isPublished: true,
    defaultVariantId: "ko-sickle-12inch"
  }
];

