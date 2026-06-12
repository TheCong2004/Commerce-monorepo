import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, X, ChevronRight, Truck } from "../icons";
import { pageTransition } from "../helpers";

interface OrderTrackingViewProps {
  goBack: () => void;
  navigateTo: (screen: any) => void;
}

export function OrderTrackingView({ goBack, navigateTo }: OrderTrackingViewProps) {
  return (
    <motion.div key="order-tracking" {...pageTransition} className="p-5 space-y-5">
      <header className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-900">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="p-1 rounded-full text-neutral-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-[20px] font-bold tracking-tight">Shipped</h2>
        </div>
        <button onClick={() => navigateTo("home")} className="p-1 rounded-full text-zinc-400 hover:text-zinc-600">
          <X className="h-5 w-5" />
        </button>
      </header>

      {/* Dropdown displaying tracking item name */}
      <div className="p-4 rounded-3xl border border-zinc-100 bg-white dark:border-zinc-900 dark:bg-zinc-900/30 flex justify-between items-center text-xs font-bold">
        <span>Boat Headphones Bass boost 100v</span>
        <ChevronRight className="h-4 w-4 text-zinc-400 rotate-90" />
      </div>

      {/* Delivery Map / Journey Line */}
      <div className="relative p-6 rounded-[32px] border border-zinc-100 bg-white dark:border-zinc-900 dark:bg-zinc-900/30 overflow-hidden shadow-sm flex flex-col justify-start">
        
        {/* Vertical timeline path */}
        <div className="relative pl-8 space-y-8 py-2 before:absolute before:left-[11px] before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-zinc-100 dark:before:bg-zinc-800/80">
          
          {/* Node 1 */}
          <div className="relative flex flex-col items-start gap-1">
            <div className="absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-zinc-200 dark:border-zinc-950 dark:bg-zinc-800" />
            <p className="text-xs font-semibold text-zinc-400">Order Placed</p>
            <p className="text-[9px] text-zinc-400 font-semibold">12th June 2026</p>
          </div>

          {/* Node 2 */}
          <div className="relative flex flex-col items-start gap-1">
            <div className="absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-zinc-200 dark:border-zinc-950 dark:bg-zinc-800" />
            <p className="text-xs font-semibold text-zinc-400">Mumbai Facility</p>
            <p className="text-[9px] text-zinc-400 font-semibold">14th June 2026</p>
          </div>

          {/* Node 3 */}
          <div className="relative flex flex-col items-start gap-1">
            <div className="absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-amber-400 dark:border-zinc-950 dark:bg-amber-500 ring-4 ring-amber-400/20" />
            <p className="text-xs font-bold text-neutral-800 dark:text-zinc-200">Chennai Facility</p>
            <p className="text-[9px] text-zinc-400 font-semibold">20th June 2026</p>
          </div>

          {/* Node 4 (Current Node with Delivery Truck) */}
          <div className="relative flex flex-col items-start gap-1">
            <div className="absolute -left-[32px] -top-1 grid h-8 w-8 place-items-center rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-md">
              <Truck className="h-4 w-4 animate-bounce" />
            </div>
            <p className="text-xs font-bold text-neutral-950 dark:text-white">Kerala Facility</p>
            <p className="text-[10px] text-emerald-600 font-bold">Out for delivery</p>
            <p className="text-[9px] text-zinc-400 font-semibold">23rd June 2026 - 3:30 pm</p>
          </div>
        </div>
      </div>

      {/* Bottom summary note */}
      <div className="p-4 rounded-3xl bg-zinc-100 dark:bg-zinc-900/50 text-[11px] font-medium leading-5 text-zinc-500 dark:text-zinc-400">
        Đơn hàng của bạn đang được giao bởi shipper **Kerala Facility**. Vui lòng chú ý điện thoại để nhận hàng.
      </div>
    </motion.div>
  );
}
