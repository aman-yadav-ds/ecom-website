import { pgTable, uuid, varchar, text, boolean, timestamp, AnyPgColumn } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { categories } from "./categories";
import { variants } from "./variants";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  categoryId: uuid("category_id").notNull().references((): AnyPgColumn => categories.id),
  isPublished: boolean("is_published").default(false).notNull(),
  defaultVariantId: uuid("default_variant_id").references((): AnyPgColumn => variants.id, { onDelete: 'set null' }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
