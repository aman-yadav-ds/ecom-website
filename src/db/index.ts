import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";
import { ensureTablesAndSeed } from "./init";

export type DbType = DrizzleD1Database<typeof schema>;

/**
 * Instantiate Drizzle ORM bound to Cloudflare D1 using getCloudflareContext({ async: true })
 * Supporting static prerendering (SSG), local development (next dev), and dynamic runtime requests.
 */
export async function getDb(): Promise<DbType> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const d1 = (env as any).DB || (env as any).ecom_db;
    if (!d1) {
      throw new Error(
        "D1 Database binding ('DB' or 'ecom_db') not found in Cloudflare context."
      );
    }

    // Ensure database tables and initial seed data exist
    await ensureTablesAndSeed(d1);

    return drizzle(d1, { schema });
  } catch (error) {
    console.error("[Database Connection Error]", error);
    throw error;
  }
}

export { schema };
