import { exampleCategories } from "../lib/details/categories";
import { exampleProducts } from "../lib/details/products";
import { exampleVariants } from "../lib/details/variants";
import { exampleDealers } from "../lib/details/dealers";
import { newsArticles } from "../lib/details/newsData";

function escapeSqlString(str: string): string {
  if (!str) return "NULL";
  return `'${str.replace(/'/g, "''")}'`;
}

function jsonSql(val: any): string {
  if (val === undefined || val === null) return "NULL";
  return escapeSqlString(JSON.stringify(val));
}

let initPromise: Promise<void> | null = null;
let isInitialized = false;

export async function ensureTablesAndSeed(d1: any): Promise<void> {
  if (isInitialized) {
    return;
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      // Fast path: probe if tables are already initialized to avoid 5 expensive DDL queries per request
      try {
        await d1.prepare("SELECT 1 FROM categories LIMIT 1").first();
        isInitialized = true;
        return;
      } catch {
        // Table doesn't exist yet, proceed with creation and seeding
      }

      // 1. Create tables in a single D1 batch round-trip instead of 5 separate IPC calls
      await d1.batch([
        d1.prepare(
          `CREATE TABLE IF NOT EXISTS categories (id text PRIMARY KEY NOT NULL, name text NOT NULL, slug text NOT NULL UNIQUE, parent_id text, description text, tagline text, badge text, highlights text)`
        ),
        d1.prepare(
          `CREATE TABLE IF NOT EXISTS dealers (id text PRIMARY KEY NOT NULL, name text NOT NULL, address_line_1 text NOT NULL, address_line_2 text NOT NULL, address_line_3 text NOT NULL, contact_no text, email text, map_link text, coordinates text NOT NULL, website text, assortment text NOT NULL, services text NOT NULL, is_premium_hub integer DEFAULT false NOT NULL)`
        ),
        d1.prepare(
          `CREATE TABLE IF NOT EXISTS news_articles (id text PRIMARY KEY NOT NULL, slug text NOT NULL UNIQUE, title text NOT NULL, excerpt text NOT NULL, content text NOT NULL, date text NOT NULL, author text NOT NULL, category text NOT NULL, image text NOT NULL, related_products text)`
        ),
        d1.prepare(
          `CREATE TABLE IF NOT EXISTS products (id text PRIMARY KEY NOT NULL, name text NOT NULL, description text NOT NULL, cover_image text NOT NULL, cover_image_alt text, category_id text NOT NULL, tags text NOT NULL, is_published integer DEFAULT true NOT NULL, default_variant_id text, maintenance_tips text, FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE no action ON DELETE cascade)`
        ),
        d1.prepare(
          `CREATE TABLE IF NOT EXISTS variants (id text PRIMARY KEY NOT NULL, name text NOT NULL, product_id text NOT NULL, images text NOT NULL, images_alt text, price text NOT NULL, applicable_gst text NOT NULL, technical_details text NOT NULL, FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE no action ON DELETE cascade)`
        ),
      ]);

      // 2. Check if categories table is populated
      const checkResult = await d1.prepare("SELECT count(*) as count FROM categories").first();
      const count = checkResult?.count ?? 0;

      if (count === 0) {
        console.log("[D1 Auto-Init] Database is empty. Seeding initial data...");
        const seedStatements: any[] = [];

        for (const cat of exampleCategories) {
          seedStatements.push(
            d1.prepare(
              `INSERT OR IGNORE INTO categories (id, name, slug, parent_id, description, tagline, badge, highlights) VALUES (` +
                `${escapeSqlString(cat.id)}, ${escapeSqlString(cat.name)}, ${escapeSqlString(cat.slug)}, ` +
                `${escapeSqlString(cat.parentId || "")}, ${escapeSqlString(cat.description || "")}, ` +
                `${escapeSqlString(cat.tagline || "")}, ${escapeSqlString(cat.badge || "")}, ` +
                `${jsonSql(cat.highlights || [])})`
            )
          );
        }

        for (const prod of exampleProducts) {
          seedStatements.push(
            d1.prepare(
              `INSERT OR IGNORE INTO products (id, name, description, cover_image, cover_image_alt, category_id, tags, is_published, default_variant_id, maintenance_tips) VALUES (` +
                `${escapeSqlString(prod.id)}, ${escapeSqlString(prod.name)}, ${escapeSqlString(prod.description)}, ` +
                `${escapeSqlString(prod.coverImage)}, ${escapeSqlString(prod.coverImageAlt || "")}, ` +
                `${escapeSqlString(prod.categoryId)}, ${jsonSql(prod.tags)}, ${prod.isPublished ? 1 : 0}, ` +
                `${escapeSqlString(prod.defaultVariantId || "")}, ${jsonSql(prod.maintenanceTips || [])})`
            )
          );
        }

        for (const variant of exampleVariants) {
          seedStatements.push(
            d1.prepare(
              `INSERT OR IGNORE INTO variants (id, name, product_id, images, images_alt, price, applicable_gst, technical_details) VALUES (` +
                `${escapeSqlString(variant.id)}, ${escapeSqlString(variant.name)}, ${escapeSqlString(variant.productId)}, ` +
                `${jsonSql(variant.images)}, ${jsonSql(variant.imagesAlt || [])}, ${escapeSqlString(variant.price)}, ` +
                `${escapeSqlString(variant.applicableGst)}, ${jsonSql(variant.technicalDetails)})`
            )
          );
        }

        for (const dealer of exampleDealers) {
          seedStatements.push(
            d1.prepare(
              `INSERT OR IGNORE INTO dealers (id, name, address_line_1, address_line_2, address_line_3, contact_no, email, map_link, coordinates, website, assortment, services, is_premium_hub) VALUES (` +
                `${escapeSqlString(dealer.id)}, ${escapeSqlString(dealer.name)}, ${escapeSqlString(dealer.addressLine1)}, ` +
                `${escapeSqlString(dealer.addressLine2)}, ${escapeSqlString(dealer.addressLine3)}, ` +
                `${escapeSqlString(dealer.contactNo || "")}, ${escapeSqlString(dealer.email || "")}, ` +
                `${escapeSqlString(dealer.mapLink || "")}, ${jsonSql(dealer.coordinates)}, ` +
                `${escapeSqlString(dealer.website || "")}, ${jsonSql(dealer.assortment)}, ` +
                `${jsonSql(dealer.services)}, ${dealer.isPremiumHub ? 1 : 0})`
            )
          );
        }

        for (const article of newsArticles) {
          seedStatements.push(
            d1.prepare(
              `INSERT OR IGNORE INTO news_articles (id, slug, title, excerpt, content, date, author, category, image, related_products) VALUES (` +
                `${escapeSqlString(article.id)}, ${escapeSqlString(article.slug)}, ${escapeSqlString(article.title)}, ` +
                `${escapeSqlString(article.excerpt)}, ${jsonSql(article.content)}, ${escapeSqlString(article.date)}, ` +
                `${escapeSqlString(article.author)}, ${escapeSqlString(article.category)}, ` +
                `${escapeSqlString(article.image)}, ${jsonSql(article.relatedProducts || [])})`
            )
          );
        }

        // Execute batch in chunks of 40 to fit D1 batch limits
        const chunkSize = 40;
        for (let i = 0; i < seedStatements.length; i += chunkSize) {
          const chunk = seedStatements.slice(i, i + chunkSize);
          await d1.batch(chunk);
        }

        console.log("[D1 Auto-Init] Database seeding complete.");
      }

      isInitialized = true;
    } catch (err) {
      console.error("[D1 Auto-Init Error]", err);
      initPromise = null;
      throw err;
    }
  })();

  return initPromise;
}
