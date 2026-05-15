import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Platform = "web" | "zalo" | "telegram" | "mini";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  platform?: Platform;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", platform = "web", ...props }, ref) => {
    const isMini = platform === "zalo" || platform === "telegram" || platform === "mini";
    
    const baseStyles = cn(
      "inline-flex items-center justify-center font-medium transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50",
      isMini ? "rounded-xl" : "rounded-md"
    );
    
    const variants = {
      primary: isMini 
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20" 
        : "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
      ghost: "hover:bg-gray-100 text-gray-700",
    };

    const sizes = {
      sm: isMini ? "h-9 px-4 text-xs" : "h-8 px-3 text-xs",
      md: isMini ? "h-11 px-6 py-2.5 text-sm" : "h-10 px-4 py-2",
      lg: isMini ? "h-14 px-8 text-base" : "h-12 px-6 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

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

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, platform = "web" }) => {
  const isMini = platform === "zalo" || platform === "telegram" || platform === "mini";

  return (
    <div className={cn(
      "group overflow-hidden transition-all",
      isMini 
        ? "rounded-2xl border-none bg-white/5 backdrop-blur-md shadow-xl" 
        : "rounded-xl border bg-white shadow-sm hover:shadow-md"
    )}>
      <div className={cn(
        "aspect-square overflow-hidden bg-gray-100",
        isMini ? "rounded-t-2xl" : ""
      )}>
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            No Image
          </div>
        )}
      </div>
      <div className={isMini ? "p-3" : "p-4"}>
        <h3 className={cn(
          "font-bold line-clamp-1",
          isMini ? "text-sm text-white" : "text-lg text-gray-900"
        )}>{product.title}</h3>
        {!isMini && product.description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        )}
        <div className={cn(
          "mt-3 flex items-center justify-between",
          isMini ? "flex-col items-start gap-2" : ""
        )}>
          <span className={cn(
            "font-black",
            isMini ? "text-blue-400 text-base" : "text-xl text-gray-900"
          )}>
            {(product.priceCents / 100).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
          </span>
          <Button 
            onClick={() => onAddToCart?.(product.id)} 
            size={isMini ? "sm" : "sm"}
            platform={platform}
            className={isMini ? "w-full" : ""}
          >
            {isMini ? "Mua ngay" : "Thêm vào giỏ"}
          </Button>
        </div>
      </div>
    </div>
  );
};
