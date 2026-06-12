import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import { MiniShopProduct } from "../types";
import { cn, formatVnd, pageTransition } from "../helpers";
import { Button } from "../components/Button";
import { ProductImage } from "../components/ProductImage";

interface DetailViewProps {
  selectedProduct: MiniShopProduct | null;
  goBack: () => void;
  favorites: string[];
  handleFavoriteToggle: (productId: string) => void;
  onAddToCart: (product: MiniShopProduct) => void;
  navigateTo: (screen: any) => void;
}

export function DetailView({
  selectedProduct,
  goBack,
  favorites,
  handleFavoriteToggle,
  onAddToCart,
  navigateTo,
}: DetailViewProps) {
  if (!selectedProduct) return null;

  return (
    <motion.div key="detail" {...pageTransition} className="pb-6">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 px-5 py-4 backdrop-blur-md flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900">
        <button onClick={goBack} className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-neutral-805 dark:text-zinc-200">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-sm font-bold truncate max-w-[60%]">{selectedProduct.title}</h2>
        <button
          onClick={() => handleFavoriteToggle(selectedProduct.id)}
          className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-neutral-805 dark:text-zinc-200"
        >
          <Heart className={cn("h-5 w-5", favorites.includes(selectedProduct.id) ? "fill-neutral-950 stroke-neutral-950 dark:fill-white dark:stroke-white" : "")} />
        </button>
      </header>

      {/* Swipe Gallery Mock */}
      <div className="px-5 py-4">
        <ProductImage imageUrl={selectedProduct.imageUrl} title={selectedProduct.title} ratio="aspect-[4/3] rounded-[28px] shadow-sm" />
      </div>

      {/* Product Meta */}
      <div className="px-5 space-y-4">
        <div>
          <span className="inline-block text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded-full">
            {selectedProduct.category}
          </span>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight mt-2">
            {selectedProduct.title}
          </h1>
          <p className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
            {formatVnd(selectedProduct.salePriceCents || selectedProduct.priceCents)}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 text-center text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
          <div className="bg-zinc-50 border border-zinc-100/30 rounded-2xl py-3 dark:bg-zinc-900/40 dark:border-zinc-800">
            <span className="block text-[9px] text-zinc-400 mb-0.5">Rating</span>
            <span className="text-zinc-800 dark:text-zinc-200">★ {selectedProduct.rating?.toFixed(1)}</span>
          </div>
          <div className="bg-zinc-50 border border-zinc-100/30 rounded-2xl py-3 dark:bg-zinc-900/40 dark:border-zinc-800">
            <span className="block text-[9px] text-zinc-400 mb-0.5">Lượt bán</span>
            <span className="text-zinc-800 dark:text-zinc-200">{selectedProduct.sold}+ sold</span>
          </div>
          <div className="bg-zinc-50 border border-zinc-100/30 rounded-2xl py-3 dark:bg-zinc-900/40 dark:border-zinc-800">
            <span className="block text-[9px] text-zinc-400 mb-0.5">Tồn kho</span>
            <span className="text-zinc-800 dark:text-zinc-200">Còn hàng</span>
          </div>
        </div>

        {/* Variants: Color dots */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Tùy chọn màu sắc</h4>
          <div className="flex gap-2">
            {selectedProduct.colors?.map((col, idx) => (
              <button
                key={idx}
                className="h-8 w-8 rounded-full border border-zinc-300 dark:border-zinc-700 p-0.5 focus:scale-105 active:scale-95"
                style={{ backgroundColor: col }}
              />
            ))}
          </div>
        </div>

        {/* Variants: Size selection */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Kích thước (Size)</h4>
          <div className="flex gap-2">
            {selectedProduct.sizes?.map((size) => (
              <button
                key={size}
                className="h-9 px-4 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 font-semibold text-xs text-neutral-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 active:scale-95 transition-all"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Thông tin chi tiết</h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-6 font-medium">
            {selectedProduct.description || "Thiết kế cơ bản tinh tế, đường may chắc chắn. Chất liệu vải cao cấp thoáng mát, thấm hút mồ hôi và cực kỳ êm dịu cho làn da. Hoàn hảo cho phong cách Minimalist thời thượng."}
          </p>
        </div>

        {/* Action Bottom Bar */}
        <div className="flex gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
          <Button
            variant="outline"
            className="flex-1 rounded-2xl h-12 font-bold"
            onClick={() => {
              onAddToCart(selectedProduct);
              (globalThis as any).alert("Đã thêm sản phẩm vào giỏ!");
            }}
          >
            Thêm vào giỏ
          </Button>
          <Button
            className="flex-[1.5] rounded-2xl h-12 font-bold"
            onClick={() => {
              onAddToCart(selectedProduct);
              navigateTo("cart");
            }}
          >
            Mua ngay
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
