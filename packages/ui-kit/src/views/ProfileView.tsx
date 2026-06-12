import React from "react";
import { motion } from "framer-motion";
import { LogOut, Wallet, ChevronRight, History, MapPin, Heart, FileText } from "../icons";
import { cn, pageTransition } from "../helpers";
import { Button } from "../components/Button";

interface ProfileViewProps {
  user: { name: string; email: string } | null;
  logout: () => void;
  navigateTo: (screen: any) => void;
  isEditingProfileAddress: boolean;
  setIsEditingProfileAddress: (val: boolean | ((prev: boolean) => boolean)) => void;
  shippingAddress: string;
  setShippingAddress: (addr: string) => void;
  favorites: string[];
}

export function ProfileView({
  user,
  logout,
  navigateTo,
  isEditingProfileAddress,
  setIsEditingProfileAddress,
  shippingAddress,
  setShippingAddress,
  favorites,
}: ProfileViewProps) {
  return (
    <motion.div key="profile" {...pageTransition}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-zinc-950 px-5 py-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
        <h2 className="text-[20px] font-bold tracking-tight text-neutral-900 dark:text-white">Tài khoản</h2>
        <button onClick={logout} className="p-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 active:scale-95 transition-all">
          <LogOut className="h-5 w-5" />
        </button>
      </header>

      <div className="p-5 space-y-6">
        {/* Profile Card Header */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-zinc-900 to-zinc-950 text-white p-6 shadow-lg shadow-zinc-900/10 dark:shadow-none flex items-center gap-4.5">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-xl -mr-6 -mt-6" />
          <div className="relative h-16 w-16 rounded-full bg-white/10 text-white grid place-items-center font-extrabold text-2xl select-none ring-4 ring-white/10 shadow-inner">
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div className="z-10 min-w-0">
            <h3 className="text-base font-extrabold tracking-tight text-white leading-tight truncate">{user?.name || "Khách hàng"}</h3>
            <p className="text-[11px] text-zinc-400 font-semibold truncate mt-1">{user?.email || "customer@shope.minimalist"}</p>
          </div>
        </div>

        {/* Menu items card block */}
        <div className="bg-white dark:bg-zinc-900/30 rounded-[32px] p-2.5 border border-zinc-100 dark:border-zinc-900 shadow-sm space-y-1.5">
          
          {/* 1. Ví của tôi */}
          <button
            onClick={() => navigateTo("wallet-send")}
            className="w-full flex items-center justify-between h-13 px-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all duration-200 text-left outline-none"
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Wallet className="h-4.5 w-4.5" />
              </div>
              <span className="text-[13px] font-bold text-neutral-800 dark:text-zinc-200 pl-3">Ví của tôi (Wallet)</span>
            </div>
            <ChevronRight className="h-4.5 w-4.5 text-zinc-300 dark:text-zinc-700" />
          </button>

          {/* 2. Lịch sử đặt hàng */}
          <button
            onClick={() => navigateTo("order-history")}
            className="w-full flex items-center justify-between h-13 px-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all duration-200 text-left outline-none"
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 dark:text-blue-400 flex items-center justify-center shrink-0">
                <History className="h-4.5 w-4.5" />
              </div>
              <span className="text-[13px] font-bold text-neutral-800 dark:text-zinc-200 pl-3">Lịch sử đặt hàng</span>
            </div>
            <ChevronRight className="h-4.5 w-4.5 text-zinc-300 dark:text-zinc-700" />
          </button>

          {/* 3. Địa chỉ giao hàng (Row + Collapsible Editor) */}
          <div className="w-full">
            <button
              onClick={() => setIsEditingProfileAddress(prev => !prev)}
              className="w-full flex items-center justify-between h-13 px-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all duration-200 text-left outline-none"
            >
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <span className="text-[13px] font-bold text-neutral-800 dark:text-zinc-200 pl-3">Địa chỉ giao hàng</span>
              </div>
              <ChevronRight className={cn("h-4.5 w-4.5 text-zinc-300 dark:text-zinc-700 transition-transform duration-200", isEditingProfileAddress ? "rotate-90" : "")} />
            </button>

            {isEditingProfileAddress && (
              <div className="p-4 bg-zinc-50/50 dark:bg-zinc-950/20 rounded-2xl border border-zinc-100 dark:border-zinc-900 mt-1 mb-2 space-y-2.5 mx-2.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Cập nhật địa chỉ nhận hàng</p>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress((e.target as any).value)}
                  className="w-full min-h-[65px] rounded-xl border border-zinc-200/60 bg-white p-2 text-xs text-neutral-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
                <Button
                  size="sm"
                  className="h-8 rounded-lg text-[11px] font-bold w-full"
                  onClick={() => setIsEditingProfileAddress(false)}
                >
                  Lưu địa chỉ
                </Button>
              </div>
            )}
          </div>

          {/* 4. Sản phẩm yêu thích */}
          <button
            onClick={() => (globalThis as any).alert(`Bạn đã lưu thích ${favorites.length} sản phẩm.`)}
            className="w-full flex items-center justify-between h-13 px-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all duration-200 text-left outline-none"
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-xl bg-rose-50 dark:bg-rose-955/20 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Heart className="h-4.5 w-4.5" />
              </div>
              <span className="text-[13px] font-bold text-neutral-800 dark:text-zinc-200 pl-3">Sản phẩm yêu thích</span>
            </div>
            <ChevronRight className="h-4.5 w-4.5 text-zinc-300 dark:text-zinc-700" />
          </button>

          {/* 5. Điều khoản sử dụng */}
          <button
            onClick={() => (globalThis as any).alert("Mọi thông tin liên hệ xin gửi về support@shope.minimalist")}
            className="w-full flex items-center justify-between h-13 px-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all duration-200 text-left outline-none"
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 text-zinc-500 dark:text-zinc-400 flex items-center justify-center shrink-0">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <span className="text-[13px] font-bold text-neutral-800 dark:text-zinc-200 pl-3">Điều khoản sử dụng</span>
            </div>
            <ChevronRight className="h-4.5 w-4.5 text-zinc-300 dark:text-zinc-700" />
          </button>

        </div>
      </div>
    </motion.div>
  );
}
