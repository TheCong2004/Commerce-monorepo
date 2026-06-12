import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { formatVnd, pageTransition } from "../helpers";
import { Card } from "../components/Card";

interface OrderHistoryViewProps {
  goBack: () => void;
  orderList: any[];
  navigateTo: (screen: any) => void;
}

export function OrderHistoryView({
  goBack,
  orderList,
  navigateTo,
}: OrderHistoryViewProps) {
  return (
    <motion.div key="order-history" {...pageTransition}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-zinc-950 px-5 py-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center gap-3">
        <button onClick={goBack} className="p-1 rounded-full text-neutral-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold tracking-tight">Lịch sử đặt hàng</h2>
      </header>

      <div className="p-5 space-y-4">
        {orderList.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-zinc-200 bg-white p-12 text-center text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/10">
            Bạn chưa đặt bất kỳ đơn hàng nào.
          </div>
        ) : (
          orderList.map((order) => (
            <Card
              key={order.code}
              className="p-4 space-y-2 bg-white dark:bg-zinc-900/30 cursor-pointer active:scale-[0.99] transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
              onClick={() => navigateTo("order-tracking")}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-neutral-900 dark:text-white">{order.code}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 text-[10px] font-bold">
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {order.date}
                </span>
                <span>{order.itemsCount} sản phẩm</span>
              </div>

              <div className="border-t border-zinc-200/40 dark:border-zinc-800/40 pt-2 flex justify-between items-center text-xs">
                <span className="font-medium">Tổng hóa đơn:</span>
                <span className="font-bold text-neutral-950 dark:text-white">{formatVnd(order.total)}</span>
              </div>
            </Card>
          ))
        )}
      </div>
    </motion.div>
  );
}
