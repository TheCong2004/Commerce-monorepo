"use client";

import React from "react";
import { MiniCommerceApp } from "@commerce/ui-kit";
import { useCart, useCheckout, useProducts } from "@commerce/shared-hooks";

export default function Home() {
  const { data, isLoading, error } = useProducts("60");
  const { cart, addToCart, removeFromCart } = useCart();
  const { createPayment } = useCheckout();

  const handleCheckout = async () => {
    const totalCents = cart.reduce((sum: number, item: any) => sum + item.priceCents * item.quantity, 0);
    const starsAmount = Math.max(1, Math.ceil(totalCents / 100000));
    const { invoiceLink } = await createPayment({
      provider: "telegram-stars",
      cartId: "telegram-cart",
      userId: "telegram-user",
      title: "Thanh toán Telegram Stars",
      description: "Thanh toán đơn hàng AssetFlow",
      starsAmount,
    });

    const webApp = (window as any).Telegram?.WebApp;
    if (webApp?.openInvoice) {
      webApp.openInvoice(invoiceLink);
      return;
    }

    window.location.href = invoiceLink;
  };

  return (
    <MiniCommerceApp
      platform="telegram"
      appName="AssetFlow"
      products={data?.items || []}
      cart={cart}
      isLoading={isLoading}
      error={error}
      onAddToCart={addToCart}
      onRemoveFromCart={removeFromCart}
      onCheckout={handleCheckout}
    />
  );
}
