import {
  fetchMerchantProductByHandle,
  fetchMerchantProducts,
  mapMerchantProduct,
  type MerchantProduct,
} from "./merchantCatalog";

const MERCHANT_API_URL = process.env.NEXT_PUBLIC_MERCHANT_API_URL?.replace(/\/$/, "");

type ProductWriteBody = {
  title?: string;
  description?: string | null;
  handle?: string | null;
  image_url?: string | null;
  category?: string | null;
  product_type?: string | null;
  metadata?: Record<string, unknown> | null;
  status?: "active" | "draft";
};

function requireMerchantApi() {
  if (!MERCHANT_API_URL) {
    throw new Error("NEXT_PUBLIC_MERCHANT_API_URL is not configured");
  }
  return MERCHANT_API_URL;
}

function authHeaders(token?: string) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getProducts(params: { category?: string; limit?: number } = {}) {
  return (await fetchMerchantProducts(params)) || [];
}

export async function getProductBySlug(slug: string) {
  return fetchMerchantProductByHandle(slug);
}

export async function getProductById(id: string) {
  const baseUrl = requireMerchantApi();
  const response = await fetch(`${baseUrl}/v1/products/${id}`);
  if (!response.ok) throw new Error(`Product fetch failed: ${response.status}`);
  return mapMerchantProduct((await response.json()) as MerchantProduct);
}

export async function createProduct(body: Required<Pick<ProductWriteBody, "title">> & ProductWriteBody, token?: string) {
  const baseUrl = requireMerchantApi();
  const response = await fetch(`${baseUrl}/v1/products`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Product create failed: ${response.status}`);
  return mapMerchantProduct((await response.json()) as MerchantProduct);
}

export async function updateProduct(id: string, body: ProductWriteBody, token?: string) {
  const baseUrl = requireMerchantApi();
  const response = await fetch(`${baseUrl}/v1/products/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Product update failed: ${response.status}`);
  return mapMerchantProduct((await response.json()) as MerchantProduct);
}

export async function deleteProduct(id: string, token?: string) {
  const baseUrl = requireMerchantApi();
  const response = await fetch(`${baseUrl}/v1/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!response.ok) throw new Error(`Product delete failed: ${response.status}`);
  return response.json();
}
