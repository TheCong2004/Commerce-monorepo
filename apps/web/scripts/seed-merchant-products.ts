import productSeed from "../src/lib/mockProduct";

type SeedProduct = Record<string, any>;

const products = (productSeed as any).mockProducts || (productSeed as any).MOCK_PRODUCTS_DATABASE || [];

const apiUrl = process.env.NEXT_PUBLIC_MERCHANT_API_URL?.replace(/\/$/, "");
const adminToken = process.env.MERCHANT_ADMIN_TOKEN || process.env.NEXT_PUBLIC_MERCHANT_ADMIN_TOKEN;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_MERCHANT_API_URL is required");
}

if (!adminToken) {
  throw new Error("MERCHANT_ADMIN_TOKEN is required");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${adminToken}`,
  };
}

function getPrice(variant: any, product: SeedProduct) {
  return (
    variant?.calculated_price?.calculated_amount ||
    variant?.price_cents ||
    product.price ||
    product.salePrice ||
    0
  );
}

function getOriginalPrice(product: SeedProduct) {
  return (
    product.variants?.[0]?.calculated_price?.original_amount ||
    product.originalPrice ||
    product.price ||
    0
  );
}

function buildMetadata(product: SeedProduct) {
  const {
    id,
    seller,
    sellerId,
    category,
    productType,
    thumbnail,
    images,
    variants,
    options,
    weight,
    rating,
    views,
    downloads,
    print_locations,
    print_additional_prices,
    default_print_position,
    product_builder,
    reportPages,
    subCategory,
    metadata,
  } = product;

  return {
    ...(metadata || {}),
    mock_id: id,
    seller,
    sellerId,
    category,
    subCategory,
    productType,
    thumbnail,
    images,
    variants,
    options,
    weight,
    rating,
    views,
    downloads,
    print_locations,
    print_additional_prices,
    default_print_position,
    product_builder,
    reportPages,
    compare_at_price_cents: getOriginalPrice(product),
  };
}

async function merchantFetch(path: string, init?: RequestInit) {
  const response = await fetch(`${apiUrl}${path}`, init);
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`${init?.method || "GET"} ${path} failed (${response.status}): ${body}`);
  }
  return response.json();
}

async function findProduct(handle: string) {
  const data = await merchantFetch(`/v1/products?handle=${encodeURIComponent(handle)}&limit=1`);
  return data.items?.[0] || null;
}

async function upsertProduct(product: SeedProduct) {
  const handle = product.handle || slugify(product.title || product.name || product.id);
  const title = product.title || product.name || handle;
  const thumbnail = product.thumbnail || product.image || product.images?.[0]?.url || product.images?.[0] || null;
  const body = {
    handle,
    title,
    description: product.description || "",
    image_url: thumbnail,
    category: product.category || product.metadata?.category || "uncategorized",
    product_type: product.productType || product.product_type || product.metadata?.product_type || "pod",
    metadata: buildMetadata(product),
  };

  const existing = await findProduct(handle);
  const saved = existing
    ? await merchantFetch(`/v1/products/${existing.id}`, {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify(body),
      })
    : await merchantFetch(`/v1/products`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
      });

  const existingSkus = new Set((saved.variants || []).map((variant: any) => variant.sku));
  const variants = product.variants?.length ? product.variants : [{ title: "Default" }];

  for (const [index, variant] of variants.entries()) {
    const sku = String(variant.sku || `${handle}-${index + 1}`).toUpperCase();
    if (existingSkus.has(sku)) continue;

    await merchantFetch(`/v1/products/${saved.id}/variants`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        sku,
        title: variant.title || `Variant ${index + 1}`,
        price_cents: getPrice(variant, product),
        image_url: variant.image_url || thumbnail,
      }),
    });
  }

  return saved;
}

async function main() {
  let createdOrUpdated = 0;

  for (const product of products as SeedProduct[]) {
    if (!product?.id || !(product.title || product.name)) continue;
    await upsertProduct(product);
    createdOrUpdated += 1;
  }

  console.log(`Seeded ${createdOrUpdated} products into merchant.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
