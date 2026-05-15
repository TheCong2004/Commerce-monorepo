import React, { lazy, Suspense, useState } from "react";
import { useProducts, useCart } from "@commerce/shared-hooks";
import { ProductCard, Button } from "@commerce/ui-kit";
import api from "zmp-sdk";

import HomePage from "./pages/index";
import CheckoutPage from "./pages/Checkout";

const CartPage = ({ cart, onRemove, onCheckout, subtotal }: any) => (
  <div className="p-4">
    <h2 className="text-2xl font-black mb-6">Giỏ hàng</h2>
    {cart.length === 0 ? (
      <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
        <p className="text-gray-400">Giỏ hàng đang trống</p>
      </div>
    ) : (
      <div className="space-y-4">
        {cart.map((item: any) => (
          <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
              <img src={item.imageUrl} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm line-clamp-1">{item.title}</h4>
              <p className="text-blue-600 font-bold mt-1">{(item.priceCents / 100).toLocaleString('vi-VN')}đ x {item.quantity}</p>
              <button onClick={() => onRemove(item.id)} className="text-xs text-red-500 mt-2">Xóa</button>
            </div>
          </div>
        ))}
        
        <div className="mt-8 p-4 bg-blue-50 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Tổng cộng</span>
            <span className="text-xl font-black text-blue-600">{(subtotal / 100).toLocaleString('vi-VN')}đ</span>
          </div>
          <Button onClick={onCheckout} platform="zalo" className="w-full">
            Thanh toán ngay
          </Button>
        </div>
      </div>
    )}
  </div>
);

function MainApp() {
  const [view, setView] = useState<'home' | 'checkout' | 'cart'>('home');
  const { cart, addToCart, removeFromCart, subtotal } = useCart();

  React.useEffect(() => {
    // Set navigation bar color native to Zalo
    api.setNavigationBarColor({
      color: "#2563eb",
      textColor: "white"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b p-4 flex justify-between items-center">
        <h1 
          className="text-2xl font-black tracking-tighter text-blue-600 cursor-pointer"
          onClick={() => setView('home')}
        >
          Printerval
        </h1>
        <div className="relative">
          <button 
            onClick={() => setView('cart')}
            className="p-2 bg-gray-100 rounded-full"
          >
            🛒
          </button>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
        </div>
      </header>

      <main>
        <Suspense fallback={<div className="p-10 text-center">Đang tải module...</div>}>
          {view === 'home' && <HomePage onAddToCart={(p) => { addToCart(p); setView('cart'); }} />}
          {view === 'cart' && <CartPage cart={cart} onRemove={removeFromCart} onCheckout={() => setView('checkout')} subtotal={subtotal} />}
          {view === 'checkout' && <CheckoutPage />}
        </Suspense>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t flex justify-around p-3 z-20 pb-safe">
        <button onClick={() => setView('home')} className={`text-[10px] flex flex-col items-center gap-1 ${view === 'home' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${view === 'home' ? 'bg-blue-600' : 'bg-transparent'}`}></div>
          Trang chủ
        </button>
        <button onClick={() => setView('cart')} className={`text-[10px] flex flex-col items-center gap-1 ${view === 'cart' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${view === 'cart' ? 'bg-blue-600' : 'bg-transparent'}`}></div>
          Giỏ hàng
        </button>
        <button onClick={() => setView('checkout')} className={`text-[10px] flex flex-col items-center gap-1 ${view === 'checkout' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${view === 'checkout' ? 'bg-blue-600' : 'bg-transparent'}`}></div>
          Thanh toán
        </button>
      </nav>
    </div>
  );
}

export default MainApp;
