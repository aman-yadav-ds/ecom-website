import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";
import { ensureTablesAndSeed } from "./init";

export type DbType = DrizzleD1Database<typeof schema>;

const globalForDb = globalThis as unknown as {
  __d1TablesInitPromise?: Promise<void>;
};

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

    // Runtime requests on Cloudflare should never execute DDL / seed checks.
    // Guard auto-seed so it only runs if explicitly requested in local development.
    if (process.env.NODE_ENV === "development" && process.env.ENABLE_AUTO_SEED === "true") {
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
