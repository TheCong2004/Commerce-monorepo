import React from "react";
import { useQuery } from "@tanstack/react-query";
export * from "@tanstack/react-query";
import { createCommerceClient } from "@commerce/api-client";

const runtimeEnv = (globalThis as any).process?.env || {};
const viteEnv = (import.meta as any).env || {};
const productionMerchantUrl = "https://merchant.thecong2610.workers.dev";
const cleanUrl = (value: unknown) => {
  if (!value) return undefined;
  const url = String(value);
  return url.includes('localhost') || url.includes('127.0.0.1') ? undefined : url;
};
const baseUrl =
  cleanUrl(runtimeEnv.NEXT_PUBLIC_MERCHANT_URL) ||
  cleanUrl(runtimeEnv.NEXT_PUBLIC_MERCHANT_API_URL) ||
  cleanUrl(viteEnv.VITE_MERCHANT_URL) ||
  cleanUrl(viteEnv.VITE_API_URL) ||
  productionMerchantUrl;
const defaultClient = createCommerceClient(baseUrl) as any;

export function useProducts(limit = "10") {
  return useQuery({
    queryKey: ["products", limit],
    queryFn: async () => {
      const res = await (defaultClient as any).v1.products.$get({ query: { limit } });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data.items ? data : { items: [] };
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await (defaultClient as any).v1.products[":id"].$get({ param: { id } });
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCart() {
  const [cart, setCart] = React.useState<any[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('commerce-cart');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('commerce-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + (item.priceCents * item.quantity), 0);

  return { cart, addToCart, removeFromCart, clearCart, subtotal };
}
export * from "./useCheckout";
