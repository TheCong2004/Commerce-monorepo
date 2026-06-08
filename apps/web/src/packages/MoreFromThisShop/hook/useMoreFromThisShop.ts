import { getProducts } from '@/lib/productApi';
import { useEffect, useState } from 'react';

export function useMoreFromThisShop(currentProductId: string, limit: number = 4) {
  const [products, setProducts] = useState<any[]>([]);
  const [shopName, setShopName] = useState('');
  const [sellerId, setSellerId] = useState<string | null>(null);

  useEffect(() => {
    if (!currentProductId) return;
    let cancelled = false;

    getProducts({ limit: 100 })
      .then((items) => {
        if (cancelled) return;
        const currentProduct = items.find((product: any) => product.id === currentProductId || product.handle === currentProductId);
        const currentMetadata = currentProduct?.metadata as any;
        const currentSellerId = currentProduct?.sellerId || currentMetadata?.sellerId;

        if (!currentSellerId) {
          setProducts([]);
          setShopName('');
          setSellerId(null);
          return;
        }

        setProducts(
          items
            .filter((product: any) => (product.sellerId || (product.metadata as any)?.sellerId) === currentSellerId && product.id !== currentProduct?.id)
            .slice(0, limit)
        );
        setShopName(currentProduct?.seller?.name || currentMetadata?.seller?.name || 'This Shop');
        setSellerId(currentSellerId);
      })
      .catch(() => {
        if (!cancelled) {
          setProducts([]);
          setShopName('');
          setSellerId(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentProductId, limit]);

  return { products, shopName, sellerId };
}
