import { pgTable, uuid, varchar, integer, boolean, AnyPgColumn } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { products } from "./products";
import { variants } from "./variants";
export const productImages = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").notNull().references((): AnyPgColumn => products.id, { onDelete: 'cascade' }),
  variantId: uuid("variant_id").references((): AnyPgColumn => variants.id, { onDelete: 'set null' }),
  url: varchar("url", { length: 500 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isPrimary: boolean("is_primary").default(false).notNull(),
});

export const insertProductImageSchema = createInsertSchema(productImages);
export const selectProductImageSchema = createSelectSchema(productImages);
