import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export { products, variants } from "./schema";
export * from "drizzle-orm";

export function getDb(d1: D1Database) {
  return drizzle(d1, { schema });
}
