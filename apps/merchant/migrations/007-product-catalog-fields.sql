ALTER TABLE products ADD COLUMN handle TEXT;
ALTER TABLE products ADD COLUMN category TEXT;
ALTER TABLE products ADD COLUMN product_type TEXT;
ALTER TABLE products ADD COLUMN metadata TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_products_handle ON products(handle);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);
