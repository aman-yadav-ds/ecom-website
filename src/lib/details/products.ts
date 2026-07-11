import { Product } from "../types";

export const exampleProducts: Product[] = [
  {
    id: "p-harrow",
    name: "Harrow",
    description: "High-quality tractor-mounted harrow for tilling and optimal soil preparation.",
    categoryId: "TA",
    tags: ["Harrow", "Tractor Attachment", "Tillage", "Soil Preparation", "Harrows"],
    coverImage: "/products/harrow.jpeg",
    isPublished: true,
    defaultVariantId: "v-harrow-raino"
  },
  {
    id: "p-rotavator",
    name: "Rotavator",
    description: "Reliable tractor-mounted rotavator for efficient seedbed preparation.",
    categoryId: "TA",
    tags: ["Rotavator", "Tractor Attachment", "Tillage", "Seedbed", "Rotavator 7ft", "Rotavators", "Rotavator 8ft", "Rotavator 6ft", "7ft", "8ft"],
    coverImage: "/products/rotavator.jpg",
    isPublished: true,
    defaultVariantId: "v-rota-6ft"
  },
  {
    id: "p-powerweeder",
    name: "Power Weeder",
    description: "Powerful self-propelled walk-behind tractor designed for heavy-duty weeding and agricultural tasks.",
    categoryId: "SPM",
    tags: ["Power Weeder", "Self Propelled", "Weeding", "Tillage"],
    coverImage: "/products/power-weeder.jpeg",
    isPublished: true,
    defaultVariantId: "v-pw-1080"
  },
  {
    id: "p-powerreaper",
    name: "Power Reaper",
    description: "Efficient power reaper for fast, reliable, and clean crop harvesting.",
    categoryId: "SPM",
    tags: ["Power Reaper", "Harvesting", "Self Propelled"],
    coverImage: "/placeholder.png",
    isPublished: true,
    defaultVariantId: "v-pr-1260"
  },
  {
    id: "p-brushcutter",
    name: "Brush Cutter",
    description: "Versatile brush cutter for clearing grass, weeds, and small bushes effortlessly.",
    categoryId: "SPM",
    tags: ["Brush Cutter", "Weed Cutting", "Self Propelled"],
    coverImage: "/products/brushcutter.jpeg",
    isPublished: true,
    defaultVariantId: "v-bc-side"
  },
  {
    id: "p-pulveriser",
    name: "Pulveriser",
    description: "High-performance pulveriser for grinding spices, grains, and herbs.",
    categoryId: "FPU",
    tags: ["Pulveriser", "Food Processing", "Grinding"],
    coverImage: "/products/pulveriser.jpeg",
    isPublished: true,
    defaultVariantId: "v-pulv-1170"
  },
  {
    id: "p-ricemill",
    name: "MINI Rice Mill",
    description: "Compact and efficient MINI Rice Mill for small-scale commercial or home milling.",
    categoryId: "FPU",
    tags: ["Rice Mill", "Food Processing", "Milling"],
    coverImage: "/products/mini-rice-mill.jpeg",
    isPublished: true,
    defaultVariantId: "v-rice-1080"
  }
];
