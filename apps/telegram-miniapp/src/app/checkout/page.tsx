'use client';

import React from "react";
import { useUtils } from "@tma.js/sdk-react";
import { useCheckout } from "@commerce/shared-hooks";
import Link from "next/link";

export default function CheckoutPage() {
  const utils = useUtils();
  const { createPayment } = useCheckout();

  const handlePay = async () => {
    try {
      const { invoiceLink } = await createPayment({
        provider: 'telegram-stars',
        cartId: 'mock-cart-id',
        userId: 'telegram-user-id',
        title: 'Thanh toán Telegram Stars',
        description: 'Thanh toán đơn hàng POD Commerce',
        starsAmount: 10,
      });
      
      (utils as any).openInvoice(invoiceLink);
    } catch (error) {
      console.error('Failed to initiate payment', error);
      alert('Có lỗi xảy ra khi tạo thanh toán');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="mb-8 flex items-center gap-4">
        <Link href="/" className="p-2 bg-gray-900 rounded-full">
          <span className="text-sm">←</span>
        </Link>
        <h1 className="text-2xl font-black">Thanh toán</h1>
      </header>

      <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-6 mb-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-400">Đơn hàng</span>
          <span className="font-bold">#ORD-2026-X1</span>
        </div>
        <div className="border-t border-gray-800 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Tổng cộng</span>
            <span className="text-2xl font-black text-blue-500">10 Stars</span>
          </div>
        </div>
        
        <button 
          onClick={handlePay}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
        >
          Xác nhận {10} Stars
        </button>
      </div>

      <div className="text-center text-xs text-gray-500">
        Thanh toán an toàn qua cổng Telegram Stars
      </div>
    </div>
  );
}
