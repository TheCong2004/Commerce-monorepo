import React from "react";
import { Platform } from "../types";
import { Card } from "./Card";
import { ProductImage } from "./ProductImage";
import { Button } from "./Button";
import { formatVnd } from "../helpers";

export interface ProductCardProps {
  product: {
    id: string;
    title: string;
    description?: string;
    priceCents: number;
    imageUrl?: string;
  };
  onAddToCart?: (id: string) => void;
  platform?: Platform;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, platform = "web" }) => (
  <Card className="overflow-hidden rounded-2xl">
    <ProductImage imageUrl={product.imageUrl} title={product.title} ratio="aspect-square" />
    <div className="p-3">
      <h3 className="line-clamp-2 text-[14px] font-extrabold leading-5">{product.title}</h3>
      <p className="mt-2 text-[13px] font-black text-neutral-800 dark:text-zinc-200">{formatVnd(product.priceCents)}</p>
      <Button platform={platform} size="sm" className="mt-3 w-full" onClick={() => onAddToCart?.(product.id)}>
        Mua ngay
      </Button>
    </div>
  </Card>
);
