export type MerchantVariant = {
  id: string;
  sku: string;
  title: string;
  price_cents: number;
  image_url: string | null;
};

export type MerchantProduct = {
  id: string;
  handle: string | null;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  product_type: string | null;
  metadata: Record<string, unknown> | null;
  status: "active" | "draft";
  created_at: string;
  variants: MerchantVariant[];
};

type MerchantProductList = {
  items: MerchantProduct[];
  pagination: {
    has_more: boolean;
    next_cursor: string | null;
  };
};

const MERCHANT_API_URL = process.env.NEXT_PUBLIC_MERCHANT_API_URL?.replace(/\/$/, "");

function getPrice(product: MerchantProduct) {
  return product.variants[0]?.price_cents || 0;
}

export function isMerchantCatalogEnabled() {
  return Boolean(MERCHANT_API_URL);
}

export function mapMerchantProduct(product: MerchantProduct) {
  const thumbnail = product.image_url || product.variants.find((variant) => variant.image_url)?.image_url || "";
  const category = product.category || String(product.metadata?.category || "uncategorized");
  const handle = product.handle || product.id;
  const price = getPrice(product);
  const originalPrice = Number(product.metadata?.compare_at_price_cents || 0) || price;
  const isDigital =
    product.product_type === "digital" ||
    ["report", "pdf-book", "contract-template", "digital-marketing"].includes(category);

  return {
    id: product.id,
    sellerId: "merchant",
    seller: {
      id: "merchant",
      name: "Merchant",
      avatar: "",
      followerCount: 0,
      favoriteCount: 0,
      rating: 4.8,
    },
    handle,
    title: product.title,
    description: product.description || "",
    category,
    productType: isDigital ? "report" : product.product_type || "fashion",
    thumbnail,
    images: thumbnail ? [{ id: "primary", name: product.title, url: thumbnail }] : [],
    variants: product.variants.length
      ? product.variants.map((variant) => ({
          id: variant.id,
          title: variant.title,
          calculated_price: {
            calculated_amount: variant.price_cents,
            original_amount: originalPrice,
          },
          options: [{ value: variant.title }],
        }))
      : [
          {
            id: `${product.id}-default`,
            title: "Default",
            calculated_price: {
              calculated_amount: price,
              original_amount: originalPrice,
            },
            options: [{ value: "Default" }],
          },
        ],
    options: [],
    weight: 0,
    created_at: product.created_at,
    print_locations: [],
    print_additional_prices: {},
    default_print_position: "",
    metadata: {
      ...(product.metadata || {}),
      source: "merchant",
      merchantProductId: product.id,
      category,
      product_type: product.product_type,
    },
    product_builder: { complementary_products: [] },
  };
}

export async function fetchMerchantProducts(params: { category?: string; handle?: string; limit?: number } = {}) {
  if (!MERCHANT_API_URL) return null;

  const searchParams = new URLSearchParams();
  searchParams.set("status", "active");
  searchParams.set("limit", String(params.limit || 100));
  if (params.category && params.category !== "all") searchParams.set("category", params.category);
  if (params.handle) searchParams.set("handle", params.handle);

  const response = await fetch(`${MERCHANT_API_URL}/v1/products?${searchParams.toString()}`);
  if (!response.ok) throw new Error(`Merchant catalog failed: ${response.status}`);

  const data = (await response.json()) as MerchantProductList;
  return data.items.map(mapMerchantProduct);
}

export async function fetchMerchantProductByHandle(handle: string) {
  const products = await fetchMerchantProducts({ handle, limit: 1 });
  return products?.[0] || null;
}
