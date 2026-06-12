import React from "react";
import { Bell, ShoppingBag } from "../icons";

interface HeaderProps {
  appName: string;
  cartCount: number;
  onCartClick: () => void;
  onNotificationClick: () => void;
}

export function Header({
  appName,
  cartCount,
  onCartClick,
  onNotificationClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 px-5 py-4 backdrop-blur-xl transition-colors duration-200">
      <div className="flex items-center justify-between">
        {/* Minimalist Logo */}
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white select-none">
          {appName.replace("AssetFlow", "Shope")}
          <span className="text-neutral-900 dark:text-white font-extrabold">.</span>
        </h1>
        
        {/* Notification & Cart Badges */}
        <div className="flex items-center gap-2">
          <button
            onClick={onNotificationClick}
            className="relative grid h-10 w-10 place-items-center rounded-full text-neutral-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200 active:scale-95"
            aria-label="Thông báo"
          >
            <Bell className="h-[21px] w-[21px] stroke-[1.8]" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-neutral-950 dark:bg-white animate-pulse" />
          </button>
          
          <button
            onClick={onCartClick}
            className="relative grid h-10 w-10 place-items-center rounded-full text-neutral-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200 active:scale-95"
            aria-label="Mở giỏ hàng"
          >
            <ShoppingBag className="h-[21px] w-[21px] stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-neutral-950 dark:bg-white px-1 text-[10px] font-bold text-white dark:text-neutral-950 ring-2 ring-white dark:ring-zinc-950 animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
