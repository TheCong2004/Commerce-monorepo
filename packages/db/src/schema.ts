import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("active"),
  imagesJson: text("images_json").default("[]"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const variants = sqliteTable("variants", {
  id: text("id").primaryKey(),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  sku: text("sku").notNull().unique(),
  title: text("title").notNull(),
  priceCents: integer("price_cents").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
