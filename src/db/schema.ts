import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// ==========================================
// AUTHENTICATION & ADMIN SESSION TABLES
// ==========================================

export const adminUsers = sqliteTable("admin_users", {
  id: text("id").primaryKey(), // UUID v4
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(), // Web Crypto PBKDF2 / SHA-256 hash
  salt: text("salt").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"), // "superadmin" | "admin" | "editor"
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  lastLoginAt: text("last_login_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const adminSessions = sqliteTable("admin_sessions", {
  id: text("id").primaryKey(), // Session Token
  userId: text("user_id")
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  expiresAt: text("expires_at").notNull(), // ISO Date String
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  createdAt: text("created_at").notNull(),
});

// ==========================================
// E-COMMERCE CORE TABLES (Shared with Admin Site)
// ==========================================

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

  // B2B Portfolio & RFQ Extensions (Nullable / Default for non-breaking deployment)
  moq: text("moq"), // e.g. "50 Units"
  leadTime: text("lead_time"), // e.g. "10-14 Days"
  isOemAvailable: integer("is_oem_available", { mode: "boolean" }).notNull().default(false),
  specSheetUrl: text("spec_sheet_url"), // PDF download URL
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
    .$type<Record<string, string>>(),

  // B2B Portfolio Extensions (Nullable for non-breaking deployment)
  bulkPricingTiers: text("bulk_pricing_tiers", { mode: "json" }).$type<{ minQty: number; price: string }[]>(),
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
    .$type<{ lat: number; lng: number }>(),
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

export const downloads = sqliteTable("downloads", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type").notNull().default("pdf"), // "pdf" | "zip" | "doc"
  fileSize: text("file_size").notNull(), // "12.4 MB"
  category: text("category").notNull(), // "catalogue" | "manual" | "certificate"
  createdAt: text("created_at").notNull(),
});

// ==========================================
// B2B INQUIRIES & RFQ TABLE
// ==========================================

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(), // UUID v4
  fullName: text("full_name").notNull(),
  companyName: text("company_name"),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  countryOrRegion: text("country_or_region"),
  inquiryType: text("inquiry_type").notNull().default("rfq"), // "rfq" | "sample" | "custom_oem" | "general"
  message: text("message").notNull(),
  items: text("items", { mode: "json" }).$type<{ productId: string; variantId?: string; quantity: number }[]>(),
  status: text("status").notNull().default("new"), // "new" | "contacted" | "quoted" | "closed"
  notes: text("notes"),
  createdAt: text("created_at").notNull(), // ISO Timestamp
});

// ==========================================
// RELATIONAL DEFINITIONS
// ==========================================

export const adminUsersRelations = relations(adminUsers, ({ many }) => ({
  sessions: many(adminSessions),
}));

export const adminSessionsRelations = relations(adminSessions, ({ one }) => ({
  user: one(adminUsers, {
    fields: [adminSessions.userId],
    references: [adminUsers.id],
  }),
}));

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

// Types
export type AdminUser = typeof adminUsers.$inferSelect;
export type AdminSession = typeof adminSessions.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Variant = typeof variants.$inferSelect;
export type Dealer = typeof dealers.$inferSelect;
export type NewsArticle = typeof newsArticles.$inferSelect;
export type Download = typeof downloads.$inferSelect;
export type DownloadItem = typeof downloads.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;

export type ProductWithRelations = Product & {
  category: Category | null;
  variants: Variant[];
};
