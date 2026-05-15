import { createCommerceClient } from "@commerce/api-client";

const baseUrl = process.env.NEXT_PUBLIC_COMMERCE_BACKEND_URL || "http://localhost:8787";

/**
 * Type-safe commerce client for the backend API.
 * 
 * Usage:
 * const { data, error } = await commerce.v1.products.$get({ query: { limit: "10" } });
 */
export const commerce = createCommerceClient(baseUrl);

export default commerce;
