"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useProducts, useCart } from "@commerce/shared-hooks";
import { Providers } from "./providers";

import type { ProductCardProps } from "@commerce/ui-kit";

// Dynamically import ProductCard to split its code
const ProductCard = dynamic<ProductCardProps>(() => import("@commerce/ui-kit").then(mod => mod.ProductCard), {
  loading: () => <div className="h-48 bg-gray-900 animate-pulse rounded-2xl"></div>,
  ssr: false
});

export default function Home() {
  const { data, isLoading } = useProducts();
  const { cart, addToCart } = useCart();

  if (isLoading) return (
    <div className="p-4 bg-black min-h-screen text-white flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
    </div>
  );

  return (
    <Providers>
      <div className="min-h-screen bg-black text-white pb-28">
      <header className="p-4 border-b border-gray-900 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-10">
        <h1 className="text-2xl font-black tracking-tighter text-blue-500">Printerval</h1>
        <Link href="/checkout" className="relative p-2 bg-gray-900 rounded-full">
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
        </Link>
      </header>

      <main className="p-4">
        <div className="mb-10 p-8 rounded-[2rem] bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
          <h2 className="text-3xl font-black mb-2 tracking-tight">POD Market</h2>
          <p className="text-gray-400 text-sm font-medium">Unique designs for unique people.</p>
        </div>

        <h3 className="mb-6 text-xl font-black text-gray-200 flex items-center gap-3">
          New Drops
          <span className="flex-1 h-[1px] bg-gray-900"></span>
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {data?.items?.map((product: any) => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.id,
                title: product.title,
                description: product.description,
                priceCents: product.variants?.[0]?.price_cents || 0,
                imageUrl: product.variants?.[0]?.image_url
              }} 
              platform="telegram"
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      </main>

      {/* Bottom Nav for Telegram */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-900 p-6 flex justify-around items-center z-20">
        <Link href="/" className="flex flex-col items-center gap-1">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Home</span>
        </Link>
        <Link href="/checkout" className="flex flex-col items-center gap-1 opacity-40">
          <div className="w-1.5 h-1.5 bg-transparent rounded-full"></div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Order</span>
        </Link>
      </div>
      </div>
    </Providers>
  );
}
