import { pgTable, uuid, numeric, timestamp, jsonb, varchar, AnyPgColumn } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { products } from "./products";

export const variants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  productId: uuid("product_id").notNull().references((): AnyPgColumn => products.id, { onDelete: 'cascade' }),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  salePrice: numeric("sale_price", { precision: 10, scale: 2 }),
  applicableGst: numeric("applicable_gst", { precision: 2, scale: 0 }).notNull(),
  technicalDetails: jsonb("technical_details").default('{}').notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVariantSchema = createInsertSchema(variants);
export const selectVariantSchema = createSelectSchema(variants);
