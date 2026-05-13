import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
  createdAt: z.date().optional(),
});

export const VariantSchema = z.object({
  id: z.string(),
  sku: z.string(),
  title: z.string(),
  priceCents: z.number().int().positive(),
  inventoryQty: z.number().int().nonnegative().default(0),
});

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["active", "draft", "archived"]).default("active"),
  variants: z.array(VariantSchema).optional(),
  images: z.array(z.string().url()).optional(),
  createdAt: z.date().optional(),
});

export const CartItemSchema = z.object({
  sku: z.string(),
  qty: z.number().int().positive(),
});

export const CartSchema = z.object({
  id: z.string(),
  customerEmail: z.string().email().optional(),
  items: z.array(CartItemSchema).default([]),
});

export const OrderSchema = z.object({
  id: z.string(),
  customerEmail: z.string().email(),
  status: z.enum(["pending", "paid", "processing", "shipped", "delivered", "refunded", "canceled"]).default("pending"),
  totalCents: z.number().int().nonnegative(),
  items: z.array(CartItemSchema),
  trackingNumber: z.string().optional(),
  trackingUrl: z.string().url().optional(),
  createdAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type Variant = z.infer<typeof VariantSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
export type Order = z.infer<typeof OrderSchema>;
