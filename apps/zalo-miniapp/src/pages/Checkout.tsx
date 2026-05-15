import React from "react";
import { Payment } from "zmp-sdk/apis";
import { useCheckout } from "@commerce/shared-hooks";

export default function CheckoutPage() {
  const { createPayment } = useCheckout();

  const handlePay = async () => {
    try {
      // Mock data for demonstration
      const { zpTransToken } = await createPayment({
        provider: 'zalopay',
        cartId: 'mock-cart-id',
        userId: 'zalo-user-id',
        description: 'Thanh toán đơn hàng Commerce',
      });
      
      (Payment as any).payOrder({
        zpTransToken,
        success: (data: any) => {
          console.log('ZaloPay success', data);
          alert('Thanh toán thành công!');
        },
        fail: (err: any) => {
          console.error('ZaloPay failed', err);
          alert('Thanh toán thất bại: ' + JSON.stringify(err));
        },
      });
    } catch (error) {
      console.error('Failed to initiate payment', error);
      alert('Có lỗi xảy ra khi tạo thanh toán');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>
      <button 
        onClick={handlePay}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg active:bg-blue-700 transition-colors"
      >
        Thanh toán qua ZaloPay
      </button>
    </div>
  );
}
