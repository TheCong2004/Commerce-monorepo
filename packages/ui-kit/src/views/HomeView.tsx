import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "../icons";
import { MiniShopProduct, MiniShopCartItem } from "../types";
import { pageTransition } from "../helpers";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryList } from "../components/CategoryList";
import { ProductItemCard } from "../components/ProductItemCard";
import { BannerSlider } from "../components/BannerSlider";

interface HomeViewProps {
  appName: string;
  cart: MiniShopCartItem[];
  query: string;
  setQuery: (q: string) => void;
  category: string;
  setCategory: (cat: string) => void;
  flashSales: MiniShopProduct[];
  favorites: string[];
  handleFavoriteToggle: (productId: string, e?: React.MouseEvent) => void;
  setSelectedProduct: (product: MiniShopProduct) => void;
  onAddToCart: (product: MiniShopProduct) => void;
  isLoading?: boolean;
  error?: unknown;
  normalized: MiniShopProduct[];
  navigateTo: (screen: any) => void;
  setShowFilterDrawer: (show: boolean) => void;
}

export function HomeView({
  appName,
  cart,
  query,
  setQuery,
  category,
  setCategory,
  flashSales,
  favorites,
  handleFavoriteToggle,
  setSelectedProduct,
  onAddToCart,
  isLoading,
  error,
  normalized,
  navigateTo,
  setShowFilterDrawer,
}: HomeViewProps) {
  return (
    <motion.div key="home" {...pageTransition}>
      <Header
        appName={appName}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => navigateTo("cart")}
        onNotificationClick={() => (globalThis as any).alert("Bạn chưa có thông báo mới!")}
      />

      <SearchBar
        value={query}
        onChange={(val) => {
          setQuery(val);
          if (val) navigateTo("catalog");
        }}
        onFilterClick={() => setShowFilterDrawer(true)}
        onFocus={() => navigateTo("search-suggest")}
      />

      <CategoryList selected={category} onChange={(cat) => {
        setCategory(cat);
        navigateTo("catalog");
      }} />

      {/* Premium Banner Slider */}
      <BannerSlider />

      {/* Flash Sale Banner */}
      {flashSales.length > 0 && (
        <section className="px-5 pt-5 pb-2">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-amber-500 animate-pulse" />
            <h2 className="text-[17px] font-bold tracking-tight">Giảm giá chớp nhoáng</h2>
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            {flashSales.map((product) => (
              <ProductItemCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onOpen={() => {
                  setSelectedProduct(product);
                  navigateTo("detail");
                }}
                onAdd={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                onFavoriteToggle={(e) => handleFavoriteToggle(product.id, e)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recommended Products Grid */}
      <section className="px-5 pt-5">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-[17px] font-bold tracking-tight">Gợi ý hôm nay</h2>
          <button
            onClick={() => navigateTo("catalog")}
            className="text-xs font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            Xem tất cả
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3.5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-zinc-900/30 p-2 animate-pulse">
                <div className="aspect-[3/4] bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
                <div className="mt-3 space-y-2 px-1 pb-1">
                  <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                  <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4 text-[13px] font-bold text-red-700 dark:border-red-950 dark:bg-red-950/20 dark:text-red-300">
            Không thể tải danh sách sản phẩm.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {normalized.slice(0, 6).map((product) => (
              <ProductItemCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onOpen={() => {
                  setSelectedProduct(product);
                  navigateTo("detail");
                }}
                onAdd={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                onFavoriteToggle={(e) => handleFavoriteToggle(product.id, e)}
              />
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}
