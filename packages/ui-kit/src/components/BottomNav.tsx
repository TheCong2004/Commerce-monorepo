import React from "react";
import { motion } from "framer-motion";
import { Home, LayoutGrid, ShoppingBag, UserRound } from "../icons";
import { cn } from "../helpers";

interface BottomNavProps {
  view: "home" | "catalog" | "cart" | "account";
  cartCount: number;
  onHome: () => void;
  onCatalog: () => void;
  onCart: () => void;
  onProfile: () => void;
}

export function BottomNav({
  view,
  cartCount,
  onHome,
  onCatalog,
  onCart,
  onProfile,
}: BottomNavProps) {
  const itemClass = (active: boolean) =>
    cn(
      "flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 relative",
      active ? "text-neutral-950 dark:text-white scale-105" : "text-zinc-400 hover:text-zinc-500"
    );

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40 grid h-[68px] grid-cols-4 rounded-full border border-zinc-200/50 bg-white/95 dark:border-zinc-800/50 dark:bg-zinc-950/95 shadow-lg shadow-zinc-900/5 dark:shadow-black/20 backdrop-blur-xl transition-colors duration-200">
      <button onClick={onHome} className={itemClass(view === "home")}>
        <Home className="h-5.5 w-5.5 stroke-[1.8]" />
        <span className="text-[10px]">Trang chủ</span>
        {view === "home" && (
          <motion.span layoutId="activeDot" className="absolute -bottom-1 h-1 w-1 rounded-full bg-neutral-950 dark:bg-white" />
        )}
      </button>
      
      <button onClick={onCatalog} className={itemClass(view === "catalog")}>
        <LayoutGrid className="h-5.5 w-5.5 stroke-[1.8]" />
        <span className="text-[10px]">Danh mục</span>
        {view === "catalog" && (
          <motion.span layoutId="activeDot" className="absolute -bottom-1 h-1 w-1 rounded-full bg-neutral-950 dark:bg-white" />
        )}
      </button>
      
      <button onClick={onCart} className={itemClass(view === "cart")}>
        <div className="relative">
          <ShoppingBag className="h-5.5 w-5.5 stroke-[1.8]" />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-neutral-950 dark:bg-white text-[9px] font-black text-white dark:text-neutral-900 ring-2 ring-white dark:ring-zinc-950">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px]">Giỏ hàng</span>
        {view === "cart" && (
          <motion.span layoutId="activeDot" className="absolute -bottom-1 h-1 w-1 rounded-full bg-neutral-950 dark:bg-white" />
        )}
      </button>
      
      <button onClick={onProfile} className={itemClass(view === "account")}>
        <UserRound className="h-5.5 w-5.5 stroke-[1.8]" />
        <span className="text-[10px]">Tài khoản</span>
        {view === "account" && (
          <motion.span layoutId="activeDot" className="absolute -bottom-1 h-1 w-1 rounded-full bg-neutral-950 dark:bg-white" />
        )}
      </button>
    </nav>
  );
}
