import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, CreditCard, Smartphone } from "lucide-react";
import { MiniShopCartItem } from "../types";
import { cn, formatVnd, pageTransition } from "../helpers";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

interface CheckoutViewProps {
  goBack: () => void;
  user: { name: string; email: string } | null;
  shippingAddress: string;
  setShippingAddress: (addr: string) => void;
  isEditingAddress: boolean;
  setIsEditingAddress: (editing: boolean) => void;
  paymentMethod: "pay" | "stars";
  setPaymentMethod: (method: "pay" | "stars") => void;
  cart: MiniShopCartItem[];
  promoDiscount: number;
  checkingOutLoader: boolean;
  handlePlaceOrder: () => void;
}

export function CheckoutView({
  goBack,
  user,
  shippingAddress,
  setShippingAddress,
  isEditingAddress,
  setIsEditingAddress,
  paymentMethod,
  setPaymentMethod,
  cart,
  promoDiscount,
  checkingOutLoader,
  handlePlaceOrder,
}: CheckoutViewProps) {
  return (
    <motion.div key="checkout" {...pageTransition} className="flex flex-col justify-between p-5 min-h-[85vh]">
      <div className="space-y-5">
        {/* Header */}
        <header className="flex items-center gap-3 pb-2 border-b border-zinc-100 dark:border-zinc-900">
          <button onClick={goBack} className="p-1 rounded-full text-neutral-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-[20px] font-bold tracking-tight">Thanh toán đơn hàng</h2>
        </header>

        {/* Address selection */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Địa chỉ giao hàng</h3>
          <Card className="p-4 flex gap-3 items-start bg-white dark:bg-zinc-900/30">
            <MapPin className="h-5 w-5 text-neutral-800 dark:text-zinc-200 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-neutral-800 dark:text-zinc-200">{user?.name || "Khách hàng"}</p>
              {isEditingAddress ? (
                <div className="space-y-2 mt-1.5">
                  <textarea
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress((e.target as any).value)}
                    className="w-full min-h-[60px] rounded-xl border border-zinc-200/60 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 p-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  />
                  <Button
                    size="sm"
                    className="h-8 rounded-lg text-[11px] font-bold"
                    onClick={() => setIsEditingAddress(false)}
                  >
                    Lưu địa chỉ
                  </Button>
                </div>
              ) : (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-5 mt-1">{shippingAddress}</p>
              )}
            </div>
            {!isEditingAddress && (
              <button
                onClick={() => setIsEditingAddress(true)}
                className="text-xs font-bold text-neutral-950 dark:text-white hover:underline shrink-0"
              >
                Sửa
              </button>
            )}
          </Card>
        </div>

        {/* Payment methods */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Phương thức thanh toán</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* ZaloPay Option */}
            <button
              onClick={() => setPaymentMethod("pay")}
              className={cn(
                "p-4 rounded-3xl border text-center flex flex-col items-center justify-center gap-2 transition-all",
                paymentMethod === "pay"
                  ? "bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950 dark:border-white"
                  : "bg-white text-zinc-600 border-zinc-200 dark:bg-zinc-900/20 dark:border-zinc-800 dark:text-zinc-300"
              )}
            >
              <CreditCard className="h-5 w-5" />
              <span className="text-xs font-bold">ZaloPay / thẻ</span>
            </button>

            {/* Telegram Stars Option */}
            <button
              onClick={() => setPaymentMethod("stars")}
              className={cn(
                "p-4 rounded-3xl border text-center flex flex-col items-center justify-center gap-2 transition-all",
                paymentMethod === "stars"
                  ? "bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950 dark:border-white"
                  : "bg-white text-zinc-600 border-zinc-200 dark:bg-zinc-900/20 dark:border-zinc-800 dark:text-zinc-300"
              )}
            >
              <Smartphone className="h-5 w-5" />
              <span className="text-xs font-bold">Telegram Stars</span>
            </button>
          </div>
        </div>

        {/* Order Summary details */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Sản phẩm thanh toán</h3>
          <Card className="p-4 bg-white dark:bg-zinc-900/30 max-h-[20vh] overflow-y-auto space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs">
                <span className="truncate max-w-[75%] font-medium">{item.title} x {item.quantity}</span>
                <span className="font-bold text-neutral-800 dark:text-zinc-200">
                  {formatVnd((item.salePriceCents || item.priceCents) * item.quantity)}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Bottom summary and submit */}
      <div className="space-y-4 mt-6">
        <Card className="p-4 space-y-2 bg-zinc-50/50 dark:bg-zinc-900/20 border-zinc-100 dark:border-zinc-800">
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Tổng tiền hàng</span>
            <span className="font-bold text-neutral-800 dark:text-zinc-200">
              {formatVnd(cart.reduce((sum, item) => sum + (item.salePriceCents || item.priceCents) * item.quantity, 0))}
            </span>
          </div>
          {promoDiscount > 0 && (
            <div className="flex justify-between text-xs text-emerald-600">
              <span>Mã giảm giá</span>
              <span className="font-bold">
                -{formatVnd(cart.reduce((sum, item) => sum + (item.salePriceCents || item.priceCents) * item.quantity, 0) * promoDiscount)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Phí giao hàng</span>
            <span className="font-bold text-neutral-800 dark:text-zinc-200">{formatVnd(3000000)}</span>
          </div>
          <div className="border-t border-zinc-200/50 dark:border-zinc-800 pt-2 flex justify-between items-center">
            <span className="text-xs font-bold text-neutral-900 dark:text-zinc-400">Tổng hóa đơn</span>
            <span className="text-base font-bold text-neutral-950 dark:text-white">
              {formatVnd(
                cart.reduce((sum, item) => sum + (item.salePriceCents || item.priceCents) * item.quantity, 0) * (1 - promoDiscount) + 3000000
              )}
            </span>
          </div>
        </Card>

        <Button
          size="lg"
          disabled={checkingOutLoader}
          className="w-full rounded-2xl h-12 font-bold"
          onClick={handlePlaceOrder}
        >
          {checkingOutLoader ? "Đang xử lý đơn hàng..." : "Đặt hàng & Thanh toán"}
        </Button>
      </div>
    </motion.div>
  );
}
