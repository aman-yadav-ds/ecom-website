import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const seedProducts = [
  {
    name: "Power Weeder",
    slug: "power-weeder",
    description:
      "High-performance power weeder designed for efficient inter-row weeding in fields. Features a robust 4-stroke engine with adjustable working width for precise weed removal without damaging crops.",
    price: "32500.00",
    image: "/products/power-weeder.jpg",
    category: "Agriculture Implements",
    inStock: true,
  },
  {
    name: "Brush Cutter",
    slug: "brush-cutter",
    description:
      "Professional-grade brush cutter with anti-vibration system and ergonomic harness. Ideal for clearing thick vegetation, overgrown grass, and dense undergrowth in agricultural and forestry applications.",
    price: "12800.00",
    image: "/products/brush-cutter.jpg",
    category: "Agriculture Implements",
    inStock: true,
  },
  {
    name: "Disc Harrow",
    slug: "disc-harrow",
    description:
      "Heavy-duty disc harrow for primary and secondary tillage. Features high-carbon steel discs with sealed bearings for long-lasting performance in breaking up soil clods and incorporating crop residues.",
    price: "85000.00",
    image: "/products/disc-harrow.jpg",
    category: "Agriculture Implements",
    inStock: true,
  },
  {
    name: "Rotavator",
    slug: "rotavator",
    description:
      "Multi-speed rotavator with L-shaped blades for superior soil pulverization. Perfect for seedbed preparation, stubble incorporation, and mixing organic matter into the soil profile.",
    price: "125000.00",
    image: "/products/rotavator.jpg",
    category: "Agriculture Implements",
    inStock: true,
  },
  {
    name: "Cultivator",
    slug: "cultivator",
    description:
      "Spring-loaded tine cultivator for secondary tillage and weed control between rows. Adjustable depth control with reversible shovels ensures uniform soil loosening across varied field conditions.",
    price: "45000.00",
    image: "/products/cultivator.jpg",
    category: "Agriculture Implements",
    inStock: true,
  },
  {
    name: "Seed Drill",
    slug: "seed-drill",
    description:
      "Precision seed drill with metering mechanism for accurate seed placement and spacing. Supports multiple crop types with interchangeable seed plates and fertilizer attachment capability.",
    price: "68000.00",
    image: "/products/seed-drill.jpg",
    category: "Agriculture Implements",
    inStock: true,
  },
  {
    name: "Power Tiller",
    slug: "power-tiller",
    description:
      "Versatile power tiller with 12HP diesel engine for small to medium-scale farming. Features multiple gear ratios, PTO attachment, and robust chassis for plowing, puddling, and transportation.",
    price: "175000.00",
    image: "/products/power-tiller.jpg",
    category: "Agriculture Implements",
    inStock: false,
  },
  {
    name: "Sprayer Pump",
    slug: "sprayer-pump",
    description:
      "Battery-operated knapsack sprayer with 16L capacity tank and adjustable nozzle. Delivers consistent pressure for uniform application of pesticides, herbicides, and foliar fertilizers.",
    price: "4500.00",
    image: "/products/sprayer-pump.jpg",
    category: "Agriculture Implements",
    inStock: true,
  },
];

async function seed() {
  console.log("🌱 Seeding products...");
  await db.insert(products).values(seedProducts);
  console.log("✅ Seeded", seedProducts.length, "products successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
