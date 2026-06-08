import { now, uuid } from '../types';
import { hashKey } from '../middleware/auth';

export type OrderDownloadGrant = {
  asset_id: string;
  order_id: string;
  title: string;
  file_name: string;
  token: string;
  expires_at: string;
  max_downloads: number;
  download_url: string;
};

type OrderItemForDownloads = {
  sku: string;
  qty: number;
};

type DownloadDatabase = {
  query: <T = unknown>(sql: string, params?: unknown[]) => Promise<T[]>;
  run: (sql: string, params?: unknown[]) => Promise<{ changes: number }>;
};

function randomToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function buildDownloadUrl(origin: string, token: string): string {
  return `${origin.replace(/\/$/, '')}/v1/downloads/files/${token}`;
}

export async function grantDownloadsForOrder(
  db: DownloadDatabase,
  input: {
    orderId: string;
    customerEmail: string;
    items: OrderItemForDownloads[];
    origin: string;
    expiresInDays?: number;
  }
): Promise<OrderDownloadGrant[]> {
  const expiresAt = new Date(
    Date.now() + (input.expiresInDays ?? 7) * 24 * 60 * 60 * 1000
  ).toISOString();
  const grants: OrderDownloadGrant[] = [];

  for (const item of input.items) {
    const assets = await db.query<any>(
      `SELECT DISTINCT da.*
       FROM digital_assets da
       LEFT JOIN variants v ON v.product_id = da.product_id
       WHERE da.status = 'active'
         AND (
           da.variant_sku = ?
           OR (da.variant_sku IS NULL AND v.sku = ?)
         )`,
      [item.sku, item.sku]
    );

    for (const asset of assets) {
      const existing = await db.query<any>(
        `SELECT id FROM download_tokens WHERE order_id = ? AND asset_id = ? AND revoked_at IS NULL LIMIT 1`,
        [input.orderId, asset.id]
      );
      if (existing.length > 0) continue;

      const token = randomToken();
      const tokenHash = await hashKey(token);
      const maxDownloads = Math.max(1, Number(asset.max_downloads || 5) * item.qty);

      await db.run(
        `INSERT INTO download_tokens
         (id, token_hash, order_id, customer_email, asset_id, expires_at, max_downloads, download_count, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)`,
        [
          uuid(),
          tokenHash,
          input.orderId,
          input.customerEmail.toLowerCase(),
          asset.id,
          expiresAt,
          maxDownloads,
          now(),
        ]
      );

      grants.push({
        asset_id: asset.id,
        order_id: input.orderId,
        title: asset.title,
        file_name: asset.file_name,
        token,
        expires_at: expiresAt,
        max_downloads: maxDownloads,
        download_url: buildDownloadUrl(input.origin, token),
      });
    }
  }

  return grants;
}
