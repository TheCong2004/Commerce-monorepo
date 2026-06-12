import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { MiniShopProduct } from "../types";
import { pageTransition } from "../helpers";
import { SearchBar } from "../components/SearchBar";
import { CategoryList } from "../components/CategoryList";
import { ProductItemCard } from "../components/ProductItemCard";

interface CatalogViewProps {
  goBack: () => void;
  query: string;
  setQuery: (q: string) => void;
  category: string;
  setCategory: (cat: string) => void;
  filtered: MiniShopProduct[];
  favorites: string[];
  handleFavoriteToggle: (productId: string, e?: React.MouseEvent) => void;
  setSelectedProduct: (product: MiniShopProduct) => void;
  onAddToCart: (product: MiniShopProduct) => void;
  navigateTo: (screen: any) => void;
  setShowFilterDrawer: (show: boolean) => void;
}

export function CatalogView({
  goBack,
  query,
  setQuery,
  category,
  setCategory,
  filtered,
  favorites,
  handleFavoriteToggle,
  setSelectedProduct,
  onAddToCart,
  navigateTo,
  setShowFilterDrawer,
}: CatalogViewProps) {
  return (
    <motion.div key="catalog" {...pageTransition}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-zinc-950 px-5 py-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center gap-3">
        <button onClick={goBack} className="p-1 rounded-full text-neutral-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold tracking-tight">Danh mục sản phẩm</h2>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        onFilterClick={() => setShowFilterDrawer(true)}
        onFocus={() => navigateTo("search-suggest")}
      />

      <CategoryList selected={category} onChange={setCategory} />

      <section className="px-5 pt-4">
        <div className="mb-3.5 flex justify-between items-center text-xs font-bold text-zinc-400">
          <span>Bộ lọc: {category}</span>
          <span>Tìm thấy {filtered.length} kết quả</span>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-200 bg-white p-12 text-center text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/10">
            Không tìm thấy sản phẩm phù hợp.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {filtered.map((product) => (
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
