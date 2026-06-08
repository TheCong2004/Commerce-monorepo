import { Hono } from 'hono';
import { getDb } from '../db';
import { authMiddleware, adminOnly, hashKey } from '../middleware/auth';
import { ApiError, now, uuid, type HonoEnv } from '../types';
import { grantDownloadsForOrder } from '../lib/downloads';

export const downloads = new Hono<HonoEnv>();

downloads.get('/files/:token', async (c) => {
  const token = c.req.param('token');
  if (!token || token.length < 32) throw ApiError.notFound('Download not found');
  if (!c.env.IMAGES) throw ApiError.invalidRequest('File storage is not configured');

  const db = getDb(c.var.db);
  const tokenHash = await hashKey(token);
  const [grant] = await db.query<any>(
    `SELECT dt.*, da.title, da.file_key, da.file_name, da.content_type, da.file_size
     FROM download_tokens dt
     JOIN digital_assets da ON da.id = dt.asset_id
     WHERE dt.token_hash = ? AND da.status = 'active'
     LIMIT 1`,
    [tokenHash]
  );

  if (!grant) throw ApiError.notFound('Download not found');
  if (grant.revoked_at) throw ApiError.forbidden('Download link has been revoked');
  if (grant.expires_at <= now()) throw ApiError.forbidden('Download link has expired');
  if (grant.download_count >= grant.max_downloads) {
    throw ApiError.forbidden('Download limit reached');
  }

  const object = await c.env.IMAGES.get(grant.file_key);
  if (!object) throw ApiError.notFound('File not found');

  await db.run(
    `UPDATE download_tokens SET download_count = download_count + 1 WHERE id = ?`,
    [grant.id]
  );
  await db.run(
    `INSERT INTO download_logs (id, token_id, order_id, asset_id, customer_email, ip, user_agent, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      uuid(),
      grant.id,
      grant.order_id,
      grant.asset_id,
      grant.customer_email,
      c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || null,
      c.req.header('user-agent') || null,
      now(),
    ]
  );

  const headers = new Headers();
  headers.set('Content-Type', grant.content_type || 'application/octet-stream');
  headers.set('Content-Disposition', `attachment; filename="${grant.file_name || 'download'}"`);
  headers.set('Cache-Control', 'private, no-store');

  if (grant.file_size) headers.set('Content-Length', String(grant.file_size));

  return new Response(object.body, { headers });
});

downloads.use('/assets', authMiddleware, adminOnly);
downloads.use('/assets/*', authMiddleware, adminOnly);
downloads.use('/orders/*', authMiddleware, adminOnly);

downloads.get('/assets', async (c) => {
  const db = getDb(c.var.db);
  const productId = c.req.query('product_id');
  const params: unknown[] = [];
  let query = `SELECT * FROM digital_assets WHERE 1=1`;

  if (productId) {
    query += ` AND product_id = ?`;
    params.push(productId);
  }

  query += ` ORDER BY created_at DESC`;
  const items = await db.query<any>(query, params);
  return c.json({ items: items.map(formatAsset) });
});

downloads.post('/assets', async (c) => {
  const db = getDb(c.var.db);
  const body = await c.req.json<any>();

  if (!body.product_id) throw ApiError.invalidRequest('product_id is required');
  if (!body.title) throw ApiError.invalidRequest('title is required');
  if (!body.file_key) throw ApiError.invalidRequest('file_key is required');
  if (!body.file_name) throw ApiError.invalidRequest('file_name is required');

  const [product] = await db.query<any>(`SELECT id FROM products WHERE id = ?`, [body.product_id]);
  if (!product) throw ApiError.notFound('Product not found');

  if (body.variant_sku) {
    const [variant] = await db.query<any>(
      `SELECT sku FROM variants WHERE sku = ? AND product_id = ?`,
      [body.variant_sku, body.product_id]
    );
    if (!variant) throw ApiError.notFound('Variant SKU not found for product');
  }

  const assetId = uuid();
  await db.run(
    `INSERT INTO digital_assets
     (id, product_id, variant_sku, title, file_key, file_name, content_type, file_size, status, max_downloads, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      assetId,
      body.product_id,
      body.variant_sku || null,
      body.title,
      body.file_key,
      body.file_name,
      body.content_type || 'application/octet-stream',
      body.file_size || null,
      body.status || 'active',
      body.max_downloads || 5,
      now(),
    ]
  );

  const [asset] = await db.query<any>(`SELECT * FROM digital_assets WHERE id = ?`, [assetId]);
  return c.json(formatAsset(asset), 201);
});

downloads.post('/orders/:orderId/grant', async (c) => {
  const db = getDb(c.var.db);
  const orderId = c.req.param('orderId');
  const [order] = await db.query<any>(`SELECT * FROM orders WHERE id = ?`, [orderId]);
  if (!order) throw ApiError.notFound('Order not found');
  if (order.status !== 'paid') throw ApiError.invalidRequest('Downloads can only be granted for paid orders');

  const items = await db.query<any>(`SELECT sku, qty FROM order_items WHERE order_id = ?`, [orderId]);
  const origin = new URL(c.req.url).origin;
  const grants = await grantDownloadsForOrder(db, {
    orderId,
    customerEmail: order.customer_email,
    items,
    origin,
  });

  return c.json({ items: grants });
});

function formatAsset(asset: any) {
  return {
    id: asset.id,
    product_id: asset.product_id,
    variant_sku: asset.variant_sku || null,
    title: asset.title,
    file_key: asset.file_key,
    file_name: asset.file_name,
    content_type: asset.content_type || null,
    file_size: asset.file_size || null,
    status: asset.status,
    max_downloads: asset.max_downloads,
    created_at: asset.created_at,
  };
}
