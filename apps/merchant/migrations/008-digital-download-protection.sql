CREATE TABLE IF NOT EXISTS digital_assets (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id),
  variant_sku TEXT,
  title TEXT NOT NULL,
  file_key TEXT NOT NULL,
  file_name TEXT NOT NULL,
  content_type TEXT,
  file_size INTEGER,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  max_downloads INTEGER NOT NULL DEFAULT 5,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS download_tokens (
  id TEXT PRIMARY KEY,
  token_hash TEXT NOT NULL UNIQUE,
  order_id TEXT NOT NULL REFERENCES orders(id),
  customer_email TEXT NOT NULL,
  asset_id TEXT NOT NULL REFERENCES digital_assets(id),
  expires_at TEXT NOT NULL,
  max_downloads INTEGER NOT NULL DEFAULT 5,
  download_count INTEGER NOT NULL DEFAULT 0,
  revoked_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS download_logs (
  id TEXT PRIMARY KEY,
  token_id TEXT NOT NULL REFERENCES download_tokens(id),
  order_id TEXT NOT NULL REFERENCES orders(id),
  asset_id TEXT NOT NULL REFERENCES digital_assets(id),
  customer_email TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_digital_assets_product ON digital_assets(product_id);
CREATE INDEX IF NOT EXISTS idx_digital_assets_variant_sku ON digital_assets(variant_sku);
CREATE INDEX IF NOT EXISTS idx_download_tokens_hash ON download_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_download_tokens_order ON download_tokens(order_id);
CREATE INDEX IF NOT EXISTS idx_download_tokens_asset ON download_tokens(asset_id);
CREATE INDEX IF NOT EXISTS idx_download_logs_order ON download_logs(order_id);
