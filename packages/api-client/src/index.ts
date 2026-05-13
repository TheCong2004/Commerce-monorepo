import { hc } from "hono/client";

// Example export for type-safe client wrapper
export function createCommerceClient(baseUrl: string) {
  return hc(baseUrl);
}
