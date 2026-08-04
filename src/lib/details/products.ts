import { Product } from "../types";

export const exampleProducts: Product[] = [
  {
    id: "ko-harrow-raino",
    name: "KOREVA - Harrow (RAINO)",
    description: "High-quality tractor-mounted harrow for tilling and optimal soil preparation.",
    categoryId: "tractor-attachments",
    tags: ["Harrow", "Tractor Attachment", "Tillage", "Soil Preparation", "Harrows"],
    coverImage: "/products/harrow-8x8.webp",
    coverImageAlt: "KOREVA Raino Heavy-Duty Tractor Mounted Disc Harrow for efficient soil tilling and seedbed preparation",
    isPublished: true,
    defaultVariantId: "ko-raino-8x8"
  },
  {
    id: "ko-rotavator",
    name: "KOREVA - Rotavator",
    description: "Reliable tractor-mounted rotavator for efficient seedbed preparation.",
    categoryId: "tractor-attachments",
    tags: ["Rotavator", "Tractor Attachment", "Tillage", "Seedbed", "Rotavator 7ft", "Rotavators", "Rotavator 8ft", "Rotavator 6ft", "7ft", "8ft"],
    coverImage: "/products/rotavator-ko-kobra.png",
    coverImageAlt: "KOREVA KOS-KOBRA Heavy-Duty Tractor Rotavator for superior soil pulverization",
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
    coverImageAlt: "KOREVA DHURANDHAR 7HP Heavy Duty Self-Propelled Power Weeder for field weeding and cultivation",
    isPublished: true,
    defaultVariantId: "ko-1080"
  },
  {
    id: "ko-weeder-vijay",
    name: "KOREVA - Power Weeder (VIJAY)",
    description: "Powerful self-propelled walk-behind tractor designed for heavy-duty weeding and agricultural tasks.",
    categoryId: "self-propelled-machinery",
    tags: ["Power Weeder", "Self Propelled", "Weeding", "Tillage"],
    coverImage: "/products/power-weeder-vijay.webp",
    coverImageAlt: "KOREVA VIJAY 7.8HP Self-Propelled Power Weeder for intensive inter-crop weeding",
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
    coverImageAlt: "KOREVA KHET SHAKTI 7HP Self-Propelled Agricultural Power Reaper for fast crop harvesting",
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
    coverImageAlt: "KOREVA JUNGLE PRO 4-Stroke Commercial Brush Cutter for weed and grass clearing",
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
    coverImageAlt: "KOREVA GRAH LAXMI 3HP Commercial Food Processing Pulveriser for grain and spice grinding",
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
    coverImageAlt: "KOREVA DHAN LAXMI MINI Commercial Rice Mill for rice processing and hulling",
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
    coverImageAlt: "KOREVA STOU 15W-40 Super Tractor Universal Lubricant Oil container",
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
    coverImageAlt: "KOREVA 4T Agro 20W-50 Heavy Duty Engine Oil bottle for power machinery",
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
    coverImageAlt: "KOREVA PRO PRUNER SK5 Steel Professional Garden Bypass Pruning Shears Secateur",
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
    coverImageAlt: "KOREVA AGRO CUT High-Carbon Steel Serrated Harvesting Sickle with Wooden Handle",
    isPublished: true,
    defaultVariantId: "ko-sickle-12inch"
  },
  {
    id: "ko-hand-sprayer",
    name: "KOREVA - Pressure Hand Sprayer (TURBO SPRAY)",
    description: "Ergonomic high-pressure agricultural and garden hand sprayer featuring a durable HDPE chemical tank, adjustable brass nozzle, and smooth pump mechanism.",
    categoryId: "hand-tools",
    tags: ["Hand Sprayer", "Garden Sprayer", "Agricultural Tools", "Hand Tools", "Chemical Sprayer", "Pressure Sprayer"],
    coverImage: "/products/hand-sprayer-1.5l.png",
    coverImageAlt: "KOREVA TURBO SPRAY High Pressure Agricultural Hand Sprayer with Adjustable Brass Spray Nozzle",
    isPublished: true,
    defaultVariantId: "ko-sprayer-1-5l"
  },
  {
    id: "ko-sledge-hammer",
    name: "KOREVA - Heavy Duty Sledge Hammer (IRON CLAW)",
    description: "Drop-forged carbon steel head sledge hammer with unbreakable shock-absorbing fiberglass handle for tough agricultural, construction, and demolition tasks.",
    categoryId: "hand-tools",
    tags: ["Sledge Hammer", "Demolition Hammer", "Hand Tools", "Carbon Steel", "Fiberglass Handle"],
    coverImage: "/products/hammer-6kg.png",
    coverImageAlt: "KOREVA IRON CLAW Drop Forged Carbon Steel Sledge Hammer with Fiberglass Handle",
    isPublished: true,
    defaultVariantId: "ko-hammer-6kg"
  },
  {
    id: "ko-bill-hook",
    name: "KOREVA - Heavy Duty Bill Hook (MACHETE CUT)",
    description: "Curved high-carbon manganese steel billhook blade designed for heavy bush clearing, branch pruning, and agricultural harvesting.",
    categoryId: "hand-tools",
    tags: ["Bill Hook", "Machete", "Hand Tools", "Bush Clearing", "Harvesting Tool"],
    coverImage: "/products/bill-hook-wooden.png",
    coverImageAlt: "KOREVA MACHETE CUT High-Carbon Steel Agricultural Harvesting Bill Hook",
    isPublished: true,
    defaultVariantId: "ko-billhook-wooden"
  },
  {
    id: "ko-sickle-pro",
    name: "KOREVA - Agricultural Harvesting Sickle (PRO CUT)",
    description: "Precision-forged manganese steel harvesting sickle designed for crop cutting, grass trimming, and orchard pruning with specialized blade options.",
    categoryId: "hand-tools",
    tags: ["Sickle", "Harvesting Tool", "Hand Tools", "Crescent Sickle", "Pruning Sickle"],
    coverImage: "/products/sickle-crescent.png",
    coverImageAlt: "KOREVA PRO CUT High-Carbon Manganese Steel Agricultural Harvesting Sickle",
    isPublished: true,
    defaultVariantId: "ko-sickle-crescent"
  },
  {
    id: "ko-khurpa",
    name: "KOREVA - Heavy Duty Garden Khurpa (SOIL KING)",
    description: "Ergonomic hand-forged steel khurpa designed for soil tilling, weeding, and garden bed preparation with heavy-duty hardwood handle.",
    categoryId: "hand-tools",
    tags: ["Khurpa", "Hand Tools", "Garden Tools", "Weeding Tool", "Tilling", "Forged Steel"],
    coverImage: "/products/khurpa-3inch.png",
    coverImageAlt: "KOREVA SOIL KING Heavy-Duty Hand Forged Garden Khurpa Tilling Tool",
    isPublished: true,
    defaultVariantId: "ko-khurpa-3inch"
  },
  {
    id: "ko-agrihorti-ladder",
    name: "KOREVA - Heavy Duty AgriHorti Orchard Ladder (HIGH REACH)",
    description: "Commercial grade tripod aluminum orchard and horticulture ladder engineered for stable fruit picking, tree pruning, and high branch maintenance.",
    categoryId: "hand-tools",
    tags: ["AgriHorti Ladder", "Orchard Ladder", "Tripod Ladder", "Pruning Ladder", "Hand Tools", "Aluminum Ladder"],
    coverImage: "/products/agrihorti-ladder.png",
    coverImageAlt: "KOREVA HIGH REACH Heavy-Duty Aluminum Tripod Orchard and Horticulture Ladder",
    isPublished: true,
    defaultVariantId: "ko-agrihorti-ladder-std"
  },
  {
    id: "ko-pahadi-kudal",
    name: "KOREVA - Heavy Duty Pahadi Kudal (MOUNTAIN DIGGER)",
    description: "Forged high-manganese steel specialized hill terrain kudal designed for rocky soil digging, terraced farming, and heavy root cutting.",
    categoryId: "hand-tools",
    tags: ["Pahadi Kudal", "Kudal", "Mattock", "Digging Tool", "Hand Tools", "Terraced Farming"],
    coverImage: "/products/pahadi-kudal-medium.png",
    coverImageAlt: "KOREVA MOUNTAIN DIGGER Forged Manganese Steel Pahadi Kudal Digging Tool",
    isPublished: true,
    defaultVariantId: "ko-pahadi-kudal-medium"
  },
  {
    id: "ko-garden-hoe",
    name: "KOREVA - Ergonomic Garden Hoe (CULTI HOE)",
    description: "Dual-action forged steel garden hoe for soil aeration, bed weeding, and furrow creation with durable weather-resistant handle.",
    categoryId: "hand-tools",
    tags: ["Garden Hoe", "Hoe", "Cultivator", "Hand Tools", "Weeding Hoe", "Garden Tools"],
    coverImage: "/products/garden-hoe-single.png",
    coverImageAlt: "KOREVA CULTI HOE Dual-Action Forged Steel Agricultural Garden Hoe",
    isPublished: true,
    defaultVariantId: "ko-garden-hoe-single"
  }
];

