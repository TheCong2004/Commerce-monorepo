import { hc } from "hono/client";
import type { AppType } from "merchant";

export function createCommerceClient(baseUrl: string) {
  return hc<AppType>(baseUrl);
}

export type { AppType };
