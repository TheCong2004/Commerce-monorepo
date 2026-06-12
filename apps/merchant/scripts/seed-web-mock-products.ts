/// <reference types="node" />

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

type MockVariant = {
  id?: string;
  title?: string;
  calculated_price?: {
    calculated_amount?: number;
    original_amount?: number;
  };
};

type MockProduct = {
  id?: string;
  handle?: string;
  title?: string;
  description?: string;
  category?: string;
  product_type?: string;
  thumbnail?: string;
  image?: string;
  images?: Array<{ url?: string } | string>;
  variants?: MockVariant[];
  created_at?: string;
  metadata?: Record<string, unknown>;
  seller?: unknown;
  [key: string]: unknown;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '../../..');
const mockPath = resolve(repoRoot, 'apps/web/src/lib/mockProduct.ts');
const outputPath = resolve(repoRoot, 'apps/merchant/.generated/seed-web-mock-products.sql');
const dataOutputPath = resolve(repoRoot, 'apps/merchant/src/data/web-mock-products.ts');

function extractArraySource(source: string, exportName: string) {
  const marker = `export const ${exportName} = [`;
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Cannot find ${exportName}`);

  const arrayStart = source.indexOf('[', start);
  let depth = 0;
  let quote: '"' | "'" | '`' | null = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let i = arrayStart; i < source.length; i++) {
    const char = source[i];
    const next = source[i + 1];

    if (lineComment) {
      if (char === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false;
        i++;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '/' && next === '/') {
      lineComment = true;
      i++;
      continue;
    }
    if (char === '/' && next === '*') {
      blockComment = true;
      i++;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '[') depth++;
    if (char === ']') {
      depth--;
      if (depth === 0) return source.slice(arrayStart, i + 1);
    }
  }

  throw new Error(`Cannot extract ${exportName}`);
}

function sqlString(value: unknown) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replace(/'/g, "''")}'`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function firstImage(product: MockProduct) {
  if (product.thumbnail) return product.thumbnail;
  if (product.image) return product.image;
  const first = product.images?.[0];
  if (typeof first === 'string') return first;
  return first?.url || null;
}

function priceToCents(value: unknown) {
  const amount = Number(value) || 0;
  // mockProduct uses POD-style cent values like 1495, 2500. Convert to VND-ish cents
  // so storefront prices are readable beside existing merchant seed data.
  return Math.round(amount * 100);
}

function safeJson(value: unknown) {
  return JSON.stringify(value ?? null);
}

function stableUuid(value: string) {
  const hex = createHash('sha1').update(value).digest('hex').slice(0, 32);
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    `4${hex.slice(13, 16)}`,
    `${((parseInt(hex.slice(16, 18), 16) & 0x3f) | 0x80).toString(16)}${hex.slice(18, 20)}`,
    hex.slice(20, 32),
  ].join('-');
}

const source = readFileSync(mockPath, 'utf8');
const sellersSource = extractArraySource(source, 'MOCK_SELLERS');
const arraySource = extractArraySource(source, 'MOCK_PRODUCTS_DATABASE');
const MOCK_SELLERS = vm.runInNewContext(sellersSource, {}, { timeout: 5000 });
const products = vm.runInNewContext(arraySource, { MOCK_SELLERS }, { timeout: 5000 }) as MockProduct[];

const timestamp = new Date().toISOString();
const seedProducts = products.map((product) => {
  const mockId = String(product.id || product.handle || product.title || crypto.randomUUID());
  const id = stableUuid(`web-mock-product:${mockId}`);
  const title = String(product.title || 'San pham');
  const handle = slugify(String(product.handle || title || mockId));
  const image = firstImage(product);
  const variants = product.variants?.length ? product.variants : [{ id: `${mockId}-standard`, title: 'Standard', calculated_price: { calculated_amount: 0 } }];
  return {
    id,
    handle,
    title,
    description: product.description || null,
    image_url: image,
    category: product.category || null,
    product_type: product.product_type || product.category || 'pod',
    metadata: {
      ...product.metadata,
      source: 'apps/web/src/lib/mockProduct.ts',
      seller: product.seller ?? null,
      mock_product: product,
    },
    created_at: product.created_at || timestamp,
    variants: variants.map((variant, index) => ({
      id: stableUuid(`web-mock-variant:${mockId}:${variant.id || index + 1}`),
      sku: `WEBMOCK-${mockId}-${index + 1}`.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 120),
      title: variant.title || 'Standard',
      price_cents: priceToCents(variant.calculated_price?.calculated_amount ?? variants[0]?.calculated_price?.calculated_amount ?? 0),
      image_url: image,
    })),
  };
});

const lines: string[] = [
  '-- Generated by apps/merchant/scripts/seed-web-mock-products.ts',
  '-- Idempotent import from apps/web/src/lib/mockProduct.ts',
];

for (const product of seedProducts) {
  lines.push(`DELETE FROM variants WHERE product_id = ${sqlString(product.id)};`);
  lines.push(
    `INSERT INTO products (id, handle, title, description, image_url, category, product_type, metadata, status, created_at) VALUES (` +
      [
        sqlString(product.id),
        sqlString(product.handle),
        sqlString(product.title),
        sqlString(product.description),
        sqlString(product.image_url),
        sqlString(product.category),
        sqlString(product.product_type),
        sqlString(safeJson(product.metadata)),
        sqlString('active'),
        sqlString(product.created_at),
      ].join(', ') +
      `) ON CONFLICT(id) DO UPDATE SET handle=excluded.handle, title=excluded.title, description=excluded.description, image_url=excluded.image_url, category=excluded.category, product_type=excluded.product_type, metadata=excluded.metadata, status=excluded.status;`
  );

  product.variants.forEach((variant) => {
    lines.push(
      `INSERT INTO variants (id, product_id, sku, title, price_cents, weight_g, image_url, created_at) VALUES (` +
        [
          sqlString(variant.id),
          sqlString(product.id),
          sqlString(variant.sku),
          sqlString(variant.title),
          String(variant.price_cents),
          '0',
          sqlString(variant.image_url),
          sqlString(product.created_at),
        ].join(', ') +
        `) ON CONFLICT(id) DO UPDATE SET sku=excluded.sku, title=excluded.title, price_cents=excluded.price_cents, image_url=excluded.image_url;`
    );
  });
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${lines.join('\n')}\n`);
mkdirSync(dirname(dataOutputPath), { recursive: true });
writeFileSync(
  dataOutputPath,
  `// Generated by apps/merchant/scripts/seed-web-mock-products.ts\n` +
    `// Source: apps/web/src/lib/mockProduct.ts\n` +
    `export const webMockProducts = ${JSON.stringify(seedProducts, null, 2)} as const;\n`
);

console.log(`Generated ${outputPath}`);
console.log(`Generated ${dataOutputPath}`);
console.log(`Products: ${products.length}`);
