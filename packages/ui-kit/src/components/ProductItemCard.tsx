import React from "react";
import { motion } from "framer-motion";
import { Heart, Plus } from "../icons";
import { MiniShopProduct } from "../types";
import { cn, formatVnd, fadeUpItem } from "../helpers";
import { ProductImage } from "./ProductImage";

interface ProductItemCardProps {
  product: MiniShopProduct;
  isFavorite: boolean;
  onOpen: () => void;
  onAdd: (e: React.MouseEvent) => void;
  onFavoriteToggle: (e: React.MouseEvent) => void;
}

export function ProductItemCard({
  product,
  isFavorite,
  onOpen,
  onAdd,
  onFavoriteToggle,
}: ProductItemCardProps) {
  return (
    <motion.article
      variants={fadeUpItem}
      className="group relative flex flex-col rounded-3xl bg-white dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <button onClick={onOpen} className="relative block w-full text-left outline-none">
        <ProductImage imageUrl={product.imageUrl} title={product.title} />
        
        <button
          type="button"
          onClick={onFavoriteToggle}
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm active:scale-90 transition-all text-neutral-800 dark:text-zinc-200"
          aria-label="Yêu thích"
        >
          <Heart className={cn("h-4 w-4 transition-all duration-300", isFavorite ? "fill-neutral-900 stroke-neutral-900 dark:fill-white dark:stroke-white scale-110" : "")} />
        </button>
      </button>
      
      <div className="flex flex-col flex-1 p-3.5">
        <div className="flex-1">
          <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-0.5">
            {product.category}
          </p>
          <h3
            onClick={onOpen}
            className="line-clamp-2 text-[12px] font-semibold leading-[18px] text-zinc-800 dark:text-zinc-200 hover:text-neutral-950 dark:hover:text-white cursor-pointer select-none"
          >
            {product.title}
          </h3>
          
          <div className="flex items-center gap-1 mt-1.5 mb-1">
            {product.colors?.map((color, colorIdx) => (
              <span
                key={colorIdx}
                className="h-2 w-2 rounded-full border border-zinc-200 dark:border-zinc-800"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-2.5 flex items-center justify-between gap-1">
          <div className="flex flex-col">
            {product.salePriceCents && product.salePriceCents < product.priceCents ? (
              <>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 line-through">
                  {formatVnd(product.priceCents)}
                </span>
                <span className="text-xs font-bold text-neutral-900 dark:text-white">
                  {formatVnd(product.salePriceCents)}
                </span>
              </>
            ) : (
              <span className="text-xs font-bold text-neutral-900 dark:text-white">
                {formatVnd(product.priceCents)}
              </span>
            )}
          </div>
          
          <button
            onClick={onAdd}
            className="grid h-7 w-7 place-items-center rounded-full bg-neutral-950 text-white hover:bg-neutral-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-sm active:scale-95 transition-all"
            aria-label="Thêm vào giỏ"
          >
            <Plus className="h-4 w-4 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
