import React from "react";
import { useQuery } from "@tanstack/react-query";
export * from "@tanstack/react-query";
import { createCommerceClient } from "@commerce/api-client";
import { MOCK_PRODUCTS } from "./mockData";

// This should be initialized in the app and passed via context or similar
// For now, we export the hooks that take the client as an argument or use a default one
// @ts-ignore
const baseUrl = import.meta.env?.VITE_API_URL || "http://localhost:8787";
const defaultClient = createCommerceClient(baseUrl) as any;

export function useProducts(limit = "10") {
  return useQuery({
    queryKey: ["products", limit],
    queryFn: async () => {
      try {
        const res = await (defaultClient as any).v1.products.$get({ query: { limit } });
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        return data.items ? data : { items: MOCK_PRODUCTS };
      } catch (e) {
        console.warn("API Error, using Mock Data instead:", e);
        return { items: MOCK_PRODUCTS };
      }
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
