import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const PRODUCTS_DIR = path.join(process.cwd(), "public", "products");
const UPLOADS_DIR = path.join(process.cwd(), "public", "static", "uploads");

const KOREVA_PRODUCTS = [
  { name: "Koreva Power Weeder 7HP", description: "Efficient power weeder for inter-row weeding.", slug: "power-weeder", price: "32000.00", categoryName: "Weeders" },
  { name: "Koreva Brush Cutter Pro", description: "Heavy-duty brush cutter for thick vegetation.", slug: "brush-cutter", price: "12500.00", categoryName: "Cutters" },
  { name: "Koreva Disc Harrow", description: "Primary tillage disc harrow.", slug: "disc-harrow", price: "85000.00", categoryName: "Tillage" },
  { name: "Koreva Rotavator 5FT", description: "5-feet rotary tiller for seedbed preparation.", slug: "rotavator", price: "115000.00", categoryName: "Tillage" },
  { name: "Koreva Cultivator 9-Tine", description: "Spring-loaded tine cultivator.", slug: "cultivator", price: "45000.00", categoryName: "Tillage" },
  { name: "Koreva Seed Drill Machine", description: "Precision seed cum fertilizer drill.", slug: "seed-drill", price: "68000.00", categoryName: "Seeding" },
  { name: "Koreva Power Tiller 12HP", description: "Versatile diesel power tiller.", slug: "power-tiller", price: "175000.00", categoryName: "Tillers" },
  { name: "Koreva Sprayer Pump 16L", description: "Battery-operated knapsack sprayer.", slug: "sprayer-pump", price: "4500.00", categoryName: "Sprayers" },
  { name: "Koreva Chaff Cutter", description: "Electric chaff cutter for animal feed.", slug: "chaff-cutter", price: "22000.00", categoryName: "Livestock" },
  { name: "Koreva Sugarcane Crusher", description: "Heavy-duty sugarcane crushing machine.", slug: "sugarcane-crusher", price: "48000.00", categoryName: "Processing" },
  { name: "Koreva Earth Auger", description: "Petrol earth auger for post-hole digging.", slug: "earth-auger", price: "18500.00", categoryName: "Digging" },
  { name: "Koreva Rice Transplanter", description: "Walk-behind rice transplanter.", slug: "rice-transplanter", price: "245000.00", categoryName: "Planting" },
  { name: "Koreva Mini Tractor 20HP", description: "Compact tractor for small farms.", slug: "mini-tractor", price: "350000.00", categoryName: "Tractors" },
  { name: "Koreva Water Pump 3HP", description: "Diesel water pump for irrigation.", slug: "water-pump", price: "15500.00", categoryName: "Irrigation" },
  { name: "Koreva Reaper Binder", description: "Harvesting and binding machine.", slug: "reaper-binder", price: "195000.00", categoryName: "Harvesting" },
];

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  } catch (err) {
    console.error("Error creating uploads directory:", err);
  }

  console.log("Clearing existing data...");
  await db.delete(schema.productImages);
  // Remove variants first
  await db.delete(schema.variants);
  // We need to nullify defaultVariantId before deleting variants if there was a circular ref, but since we delete variants first, we must remove defaultVariantId from products, OR just delete products which deletes variants.
  await db.update(schema.products).set({ defaultVariantId: null });
  await db.delete(schema.variants);
  await db.delete(schema.products);
  await db.delete(schema.categories);

  const categoryMap = new Map<string, string>();

  console.log("Seeding categories...");
  for (const prod of KOREVA_PRODUCTS) {
    if (!categoryMap.has(prod.categoryName)) {
      const catId = crypto.randomUUID();
      await db.insert(schema.categories).values({
        id: catId,
        name: prod.categoryName,
        slug: prod.categoryName.toLowerCase().replace(/\s+/g, '-'),
      });
      categoryMap.set(prod.categoryName, catId);
    }
  }

  console.log("Seeding products, variants, and images...");
  for (const [index, prod] of KOREVA_PRODUCTS.entries()) {
    const productId = crypto.randomUUID();
    const variantId = crypto.randomUUID();
    const categoryId = categoryMap.get(prod.categoryName)!;

    const technicalDetails = {
      brand: "Koreva",
      model: `KOR-${1000 + index}`,
      weight: `${Math.floor(Math.random() * 100) + 10} kg`,
      warranty: "1 Year",
    };

    await db.insert(schema.products).values({
      id: productId,
      name: prod.name,
      description: prod.description,
      categoryId: categoryId,
      isPublished: true,
    });

    await db.insert(schema.variants).values({
      id: variantId,
      name: "Standard",
      productId: productId,
      price: prod.price,
      applicableGst: "18",
      technicalDetails: technicalDetails,
    });

    await db.update(schema.products)
      .set({ defaultVariantId: variantId })
      .where(eq(schema.products.id, productId));

    // Handle Image
    const sourceImage = path.join(PRODUCTS_DIR, `${prod.slug}.jpg`);
    const destImageName = `${productId}-${prod.slug}.jpg`;
    const destImage = path.join(UPLOADS_DIR, destImageName);
    const imageUrl = `/static/uploads/${destImageName}`;

    try {
      // Check if source image exists, then copy
      await fs.access(sourceImage);
      await fs.copyFile(sourceImage, destImage);
      
      // Insert primary image
      await db.insert(schema.productImages).values({
        id: crypto.randomUUID(),
        productId: productId,
        variantId: variantId,
        url: imageUrl,
        sortOrder: 0,
        isPrimary: true,
      });
      
      // Create a secondary dummy image
      await db.insert(schema.productImages).values({
        id: crypto.randomUUID(),
        productId: productId,
        variantId: variantId,
        url: `/static/uploads/secondary-${destImageName}`,
        sortOrder: 1,
        isPrimary: false,
      });
    } catch (err) {
      console.log(`Image not found for ${prod.slug}, skipping image copy.`);
    }
  }

  console.log("✅ Seeding completed!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
