import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag as CartIcon } from "lucide-react";
import { MiniShopProduct, MiniShopCartItem } from "../types";
import { formatVnd, pageTransition } from "../helpers";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

interface CartViewProps {
  cart: MiniShopCartItem[];
  goBack: () => void;
  navigateTo: (screen: any) => void;
  onAddToCart: (product: MiniShopProduct) => void;
  onRemoveFromCart: (id: string) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  handleApplyPromo: () => void;
  promoDiscount: number;
}

export function CartView({
  cart,
  goBack,
  navigateTo,
  onAddToCart,
  onRemoveFromCart,
  promoCode,
  setPromoCode,
  handleApplyPromo,
  promoDiscount,
}: CartViewProps) {
  return (
    <motion.div key="cart" {...pageTransition} className="flex flex-col justify-between p-5 min-h-[85vh]">
      <div className="space-y-4">
        {/* Header */}
        <header className="flex items-center gap-3 pb-2 border-b border-zinc-100 dark:border-zinc-900">
          <button onClick={goBack} className="p-1 rounded-full text-neutral-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-[20px] font-bold tracking-tight">Giỏ hàng của tôi</h2>
        </header>

        {cart.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-zinc-200 bg-white p-12 text-center flex flex-col items-center justify-center dark:border-zinc-800 dark:bg-zinc-900/10">
            <CartIcon className="h-10 w-10 text-zinc-300 mb-3" />
            <p className="text-sm font-semibold text-zinc-500">Giỏ hàng đang trống</p>
            <Button size="sm" className="mt-4 rounded-full" onClick={() => navigateTo("home")}>
              Mua sắm ngay
            </Button>
          </div>
        ) : (
          <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-[24px] border border-zinc-100 bg-white p-3 shadow-sm dark:border-zinc-900 dark:bg-zinc-900/30"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[16px] bg-zinc-50 border border-zinc-100 dark:border-zinc-800">
                  {item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" /> : null}
                </div>

                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                  <div>
                    <h3 className="line-clamp-2 text-xs font-bold leading-5 text-neutral-800 dark:text-zinc-200">{item.title}</h3>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white mt-0.5">
                      {formatVnd(item.salePriceCents || item.priceCents)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    {/* Quantity control */}
                    <div className="flex items-center gap-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full px-2.5 py-1">
                      <button
                        onClick={() => {
                          try {
                            onRemoveFromCart(item.id);
                          } catch (err) {}
                        }}
                        className="text-neutral-800 dark:text-zinc-200 active:scale-90"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-[11px] font-black">{item.quantity}</span>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="text-neutral-800 dark:text-zinc-200 active:scale-90"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        // Force full remove
                        for (let i = 0; i < item.quantity; i++) {
                          try {
                            onRemoveFromCart(item.id);
                          } catch (err) {}
                        }
                      }}
                      className="text-[11px] font-bold text-red-500 hover:underline"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="space-y-4 mt-6">
          {/* Coupon Code section */}
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode((e.target as any).value)}
              placeholder="Mã giảm giá (ví dụ: MINIMALS)"
              className="h-11 flex-1 rounded-2xl border border-zinc-200 bg-white px-4 text-xs dark:border-zinc-800 dark:bg-zinc-950 focus:outline-none"
            />
            <Button size="md" variant="secondary" className="rounded-2xl" onClick={handleApplyPromo}>
              Áp dụng
            </Button>
          </div>

          {/* Totals Box */}
          <Card className="p-5 space-y-2.5 bg-zinc-50/50 dark:bg-zinc-900/20 border-zinc-100 dark:border-zinc-800">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Tạm tính</span>
              <span className="font-bold text-neutral-800 dark:text-zinc-200">
                {formatVnd(cart.reduce((sum, item) => sum + (item.salePriceCents || item.priceCents) * item.quantity, 0))}
              </span>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between text-xs text-emerald-600">
                <span>Khuyến mãi (10%)</span>
                <span className="font-bold">
                  -{formatVnd(cart.reduce((sum, item) => sum + (item.salePriceCents || item.priceCents) * item.quantity, 0) * promoDiscount)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Phí vận chuyển</span>
              <span className="font-bold text-neutral-800 dark:text-zinc-200">{formatVnd(3000000)}</span>
            </div>
            <div className="border-t border-zinc-200/50 dark:border-zinc-800 pt-2.5 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-zinc-400">Tổng cộng</span>
              <span className="text-lg font-bold text-neutral-955 dark:text-white">
                {formatVnd(
                  cart.reduce((sum, item) => sum + (item.salePriceCents || item.priceCents) * item.quantity, 0) * (1 - promoDiscount) + 3000000
                )}
              </span>
            </div>
          </Card>

          <Button size="lg" className="w-full rounded-2xl h-12 font-bold" onClick={() => navigateTo("checkout")}>
            Tiến hành thanh toán
          </Button>
        </div>
      )}
    </motion.div>
  );
}
