import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const dealers = pgTable("dealers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  addressLine1: text("address_line_1").notNull(),
  addressLine2: text("address_line_2").notNull(),
  addressLine3: text("address_line_3").notNull(),
  contactNo: varchar("contact_no", { length: 50 }),
  email: varchar("email", { length: 255 }),
  mapLink: text("map_link"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDealerSchema = createInsertSchema(dealers);
export const selectDealerSchema = createSelectSchema(dealers);
