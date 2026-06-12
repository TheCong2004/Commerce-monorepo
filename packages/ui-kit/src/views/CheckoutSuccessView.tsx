import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { formatVnd, pageTransition } from "../helpers";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

interface CheckoutSuccessViewProps {
  lastOrderCode: string;
  lastOrderTotal: number;
  paymentMethod: "pay" | "stars";
  navigateTo: (screen: any) => void;
}

export function CheckoutSuccessView({
  lastOrderCode,
  lastOrderTotal,
  paymentMethod,
  navigateTo,
}: CheckoutSuccessViewProps) {
  return (
    <motion.div key="checkout-success" {...pageTransition} className="absolute inset-0 z-10 bg-white dark:bg-zinc-950 flex flex-col justify-center items-center p-6 text-center">
      <div className="h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 grid place-items-center mb-5 animate-bounce">
        <Check className="h-8 w-8 stroke-[2.5]" />
      </div>
      
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Đặt hàng thành công!</h2>
      <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-[240px] leading-5 mt-2">
        Đơn hàng của bạn đang được xử lý và đóng gói nhanh nhất có thể.
      </p>

      <Card className="p-4 my-6 w-full max-w-[280px] space-y-2 text-left bg-zinc-50/50 border-zinc-100 dark:border-zinc-800 text-xs font-semibold">
        <div className="flex justify-between">
          <span className="text-zinc-400">Mã đơn hàng:</span>
          <span className="text-neutral-800 dark:text-zinc-200">{lastOrderCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Tổng thanh toán:</span>
          <span className="text-neutral-800 dark:text-zinc-200">{formatVnd(lastOrderTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Hình thức:</span>
          <span className="text-neutral-800 dark:text-zinc-200">
            {paymentMethod === "pay" ? "Thanh toán ZaloPay" : "Telegram Stars"}
          </span>
        </div>
      </Card>

      <div className="space-y-3 w-full max-w-[240px]">
        <Button size="md" className="w-full rounded-2xl" onClick={() => navigateTo("order-history")}>
          Xem lịch sử đặt hàng
        </Button>
        <Button size="md" variant="outline" className="w-full rounded-2xl" onClick={() => navigateTo("home")}>
          Tiếp tục mua sắm
        </Button>
      </div>
    </motion.div>
  );
}
