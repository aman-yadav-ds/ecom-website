export interface D1Database {
  prepare(query: string): {
    bind(...values: unknown[]): unknown;
    first<T = Record<string, unknown>>(column?: string): Promise<T | null>;
    all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
    run(): Promise<{ success: boolean }>;
  };
  batch<T = unknown>(statements: unknown[]): Promise<T[]>;
  exec(query: string): Promise<{ count: number; duration: number }>;
}

let initPromise: Promise<void> | null = null;
let isInitialized = false;

export async function ensureTablesAndSeed(d1: D1Database): Promise<void> {
  if (isInitialized) {
    return;
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      // Fast path: probe if tables are already initialized & seeded
      try {
        const check = await d1.prepare("SELECT count(*) as count FROM categories").first<{ count: number }>();
        if (check && (check.count ?? 0) > 0) {
          isInitialized = true;
          return;
        }
      } catch {
        // Table doesn't exist yet, proceed with table creation DDLs
      }

      // 1. Create tables in a single D1 batch round-trip
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

      // 2. If database has no categories (e.g. fresh local dev/build environment), seed from migration SQL
      try {
        const checkResult = await d1.prepare("SELECT count(*) as count FROM categories").first<{ count: number }>();
        const count = checkResult?.count ?? 0;

        if (count === 0) {
          const fs = await import("fs");
          const path = await import("path");
          const seedFilePath = path.join(process.cwd(), "drizzle/migrations/0001_seed_data.sql");
          if (fs.existsSync(seedFilePath)) {
            const sqlContent = fs.readFileSync(seedFilePath, "utf-8");
            const statements = sqlContent
              .split(";\n")
              .map((s) => s.trim())
              .filter(Boolean);
            const chunkSize = 15;
            for (let i = 0; i < statements.length; i += chunkSize) {
              const chunk = statements.slice(i, i + chunkSize).map((stmt) => d1.prepare(stmt));
              await d1.batch(chunk);
            }
          }
        }
      } catch (seedErr) {
        console.warn("[D1 Local Auto-Seed Warning]", seedErr);
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
