export interface D1DatabaseLike {
  prepare(query: string): {
    bind(...values: unknown[]): unknown;
    first<T = Record<string, unknown>>(column?: string): Promise<T | null>;
    all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
    run(): Promise<{ success: boolean }>;
  };
  batch(statements: unknown[]): Promise<unknown[]>;
  exec(query: string): Promise<{ count: number; duration: number }>;
}

let initPromise: Promise<void> | null = null;
let isInitialized = false;

export async function ensureTablesAndSeed(d1: D1DatabaseLike): Promise<void> {
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
        const check = (await d1.prepare("SELECT count(*) as count FROM categories").first()) as { count: number } | null;
        if (check && (check.count ?? 0) > 0) {
          isInitialized = true;
          return;
        }
      } catch {
        // Table doesn't exist yet, proceed with table creation DDLs
      }

      // 1. Create tables in a single D1 batch round-trip with retry for concurrent build workers
      for (let attempt = 0; attempt < 5; attempt++) {
        try {
          const check = (await d1.prepare("SELECT count(*) as count FROM categories").first()) as { count: number } | null;
          if (check && (check.count ?? 0) > 0) {
            isInitialized = true;
            return;
          }
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
              `CREATE TABLE IF NOT EXISTS products (id text PRIMARY KEY NOT NULL, name text NOT NULL, description text NOT NULL, cover_image text NOT NULL, cover_image_alt text, category_id text NOT NULL, tags text NOT NULL, is_published integer DEFAULT true NOT NULL, default_variant_id text, maintenance_tips text, moq text, lead_time text, is_oem_available integer DEFAULT false NOT NULL, spec_sheet_url text, FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE no action ON DELETE cascade)`
            ),
            d1.prepare(
              `CREATE TABLE IF NOT EXISTS variants (id text PRIMARY KEY NOT NULL, name text NOT NULL, product_id text NOT NULL, images text NOT NULL, images_alt text, price text NOT NULL, applicable_gst text NOT NULL, technical_details text NOT NULL, bulk_pricing_tiers text, FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE no action ON DELETE cascade)`
            ),
            d1.prepare(
              `CREATE TABLE IF NOT EXISTS downloads (id text PRIMARY KEY NOT NULL, title text NOT NULL, description text, file_url text, file_type text DEFAULT 'pdf' NOT NULL, file_size text NOT NULL, category text NOT NULL, created_at text NOT NULL)`
            ),
            d1.prepare(
              `CREATE TABLE IF NOT EXISTS inquiries (id text PRIMARY KEY NOT NULL, full_name text NOT NULL, company_name text, email text NOT NULL, phone text NOT NULL, country_or_region text, inquiry_type text DEFAULT 'rfq' NOT NULL, message text NOT NULL, items text, status text DEFAULT 'new' NOT NULL, notes text, created_at text NOT NULL)`
            ),
          ]);
          break;
        } catch (err: unknown) {
          const errMsg = String(err);
          if (attempt < 4 && (errMsg.includes("locked") || errMsg.includes("SQLITE_BUSY"))) {
            await new Promise((r) => setTimeout(r, 120 * (attempt + 1)));
            continue;
          }
          if (!errMsg.includes("locked") && !errMsg.includes("SQLITE_BUSY")) {
            throw err;
          }
        }
      }

      // Ensure existing local SQLite tables have new B2B columns
      try {
        await d1.prepare(`ALTER TABLE products ADD COLUMN moq text`).run();
      } catch {}
      try {
        await d1.prepare(`ALTER TABLE products ADD COLUMN lead_time text`).run();
      } catch {}
      try {
        await d1.prepare(`ALTER TABLE products ADD COLUMN is_oem_available integer DEFAULT false NOT NULL`).run();
      } catch {}
      try {
        await d1.prepare(`ALTER TABLE products ADD COLUMN spec_sheet_url text`).run();
      } catch {}
      try {
        await d1.prepare(`ALTER TABLE variants ADD COLUMN bulk_pricing_tiers text`).run();
      } catch {}

      // 2. If database has no categories (e.g. fresh local dev/build environment), seed from migration SQL
      try {
        const checkResult = (await d1.prepare("SELECT count(*) as count FROM categories").first()) as { count: number } | null;
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

      // 3. Ensure downloads table is populated even if database was created previously
      try {
        const dlCheck = (await d1.prepare("SELECT count(*) as count FROM downloads").first()) as { count: number } | null;
        if (!dlCheck || (dlCheck.count ?? 0) === 0) {
          await d1.batch([
            d1.prepare(`INSERT OR IGNORE INTO downloads (id, title, description, file_url, file_type, file_size, category, created_at) VALUES ('1', 'KOREVA Master Product Catalogue 2026', 'Complete product catalog for all Koreva machinery and tools', NULL, 'pdf', '12.4 MB', 'Catalogue', 'Jan 2026')`),
            d1.prepare(`INSERT OR IGNORE INTO downloads (id, title, description, file_url, file_type, file_size, category, created_at) VALUES ('2', '7HP Khet Shakti Power Weeder - User Manual', 'Operating and maintenance manual for 7HP Power Weeder', NULL, 'pdf', '4.2 MB', 'Manual', 'Mar 2026')`),
            d1.prepare(`INSERT OR IGNORE INTO downloads (id, title, description, file_url, file_type, file_size, category, created_at) VALUES ('3', 'Rotavator Attachment Installation Guide', 'Step by step assembly instructions for tractor rotavators', '/downloads/rotavator-installation-guide.pdf', 'pdf', '148 KB', 'Manual', 'Feb 2026')`),
            d1.prepare(`INSERT OR IGNORE INTO downloads (id, title, description, file_url, file_type, file_size, category, created_at) VALUES ('4', 'Brush Cutter Pro - Operating Instructions', 'Safety procedures and blade installation for brush cutters', NULL, 'pdf', '3.5 MB', 'Manual', 'Apr 2026')`),
            d1.prepare(`INSERT OR IGNORE INTO downloads (id, title, description, file_url, file_type, file_size, category, created_at) VALUES ('5', 'E20 Petrol Safety & Carburetor Care', 'Maintenance guidelines regarding 20% ethanol blended fuel', '/downloads/e20-petrol-safety-care.pdf', 'pdf', '135 KB', 'Safety', 'May 2026')`),
            d1.prepare(`INSERT OR IGNORE INTO downloads (id, title, description, file_url, file_type, file_size, category, created_at) VALUES ('6', 'Heavy Machinery General Safety Guidelines', 'General field safety and personal protective equipment rules', '/downloads/heavy-machinery-safety-guidelines.pdf', 'pdf', '142 KB', 'Safety', 'Jan 2026')`),
            d1.prepare(`INSERT OR IGNORE INTO downloads (id, title, description, file_url, file_type, file_size, category, created_at) VALUES ('7', 'Food Processing Units - Mini Rice Mill Specs', 'Technical specifications for mini rice mill processing units', NULL, 'pdf', '5.6 MB', 'Catalogue', 'Jun 2026')`),
          ]);
        }
      } catch (dlSeedErr) {
        console.warn("[D1 Downloads Auto-Seed Warning]", dlSeedErr);
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
