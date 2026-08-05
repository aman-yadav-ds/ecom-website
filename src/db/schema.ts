import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  parentId: text("parent_id"),
  description: text("description"),
  tagline: text("tagline"),
  badge: text("badge"),
  highlights: text("highlights", { mode: "json" }).$type<string[]>(),
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  coverImage: text("cover_image").notNull(),
  coverImageAlt: text("cover_image_alt"),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  tags: text("tags", { mode: "json" }).notNull().$type<string[]>(),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(true),
  defaultVariantId: text("default_variant_id"),
  maintenanceTips: text("maintenance_tips", { mode: "json" }).$type<string[]>(),
});

export const variants = sqliteTable("variants", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  images: text("images", { mode: "json" }).notNull().$type<string[]>(),
  imagesAlt: text("images_alt", { mode: "json" }).$type<string[]>(),
  price: text("price").notNull(),
  applicableGst: text("applicable_gst").notNull(),
  technicalDetails: text("technical_details", { mode: "json" })
    .notNull()
    . $type<Record<string, string>>(),
});

export const dealers = sqliteTable("dealers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  addressLine1: text("address_line_1").notNull(),
  addressLine2: text("address_line_2").notNull(),
  addressLine3: text("address_line_3").notNull(),
  contactNo: text("contact_no"),
  email: text("email"),
  mapLink: text("map_link"),
  coordinates: text("coordinates", { mode: "json" })
    .notNull()
    . $type<{ lat: number; lng: number }>(),
  website: text("website"),
  assortment: text("assortment", { mode: "json" }).notNull().$type<string[]>(),
  services: text("services", { mode: "json" }).notNull().$type<string[]>(),
  isPremiumHub: integer("is_premium_hub", { mode: "boolean" }).notNull().default(false),
});

export const newsArticles = sqliteTable("news_articles", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content", { mode: "json" }).notNull().$type<string[]>(),
  date: text("date").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  relatedProducts: text("related_products", { mode: "json" }).$type<
    { id: string; name: string; href: string }[]
  >(),
});

// Relational Definitions
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  variants: many(variants),
}));

export const variantsRelations = relations(variants, ({ one }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
  }),
}));
