import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";
import { ensureTablesAndSeed } from "./init";

export type DbType = DrizzleD1Database<typeof schema>;

const globalForDb = globalThis as unknown as {
  __d1TablesInitPromise?: Promise<void>;
};

function isCloudflareWorkerRuntime(): boolean {
  // In Cloudflare Workers workerd environment, navigator.userAgent is 'Cloudflare-Workers'
  return typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers";
}

/**
 * Instantiate Drizzle ORM bound to Cloudflare D1 using getCloudflareContext({ async: true })
 * Supporting static site generation (SSG), local development (next dev), and runtime requests.
 */
export async function getDb(): Promise<DbType> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const envMap = env as unknown as Record<string, D1Database>;
    const d1 = envMap.DB || envMap.ecom_db;
    if (!d1) {
      throw new Error(
        "D1 Database binding ('DB' or 'ecom_db') not found in Cloudflare context."
      );
    }

    // Runtime requests on Cloudflare Workers edge should never execute DDL / seed checks,
    // protecting against the 10ms CPU execution limit on Cloudflare Free Tier.
    // During build time (static site generation in Node.js / CI) or local dev, ensure
    // the local Miniflare D1 database has tables and seed data ready for SSG queries.
    if (!isCloudflareWorkerRuntime()) {
      if (!globalForDb.__d1TablesInitPromise) {
        globalForDb.__d1TablesInitPromise = ensureTablesAndSeed(d1).catch((err) => {
          globalForDb.__d1TablesInitPromise = undefined;
          console.warn("[Table Init Warning]", err);
        });
      }
      await globalForDb.__d1TablesInitPromise;
    }

    return drizzle(d1, { schema });
  } catch (error) {
    console.error("[Database Connection Error]", error);
    throw error;
  }
}

export { schema };
