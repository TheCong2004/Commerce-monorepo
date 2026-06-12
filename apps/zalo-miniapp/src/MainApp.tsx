import React from "react";
import api, { Payment } from "zmp-sdk";
import { MiniCommerceApp } from "@commerce/ui-kit";
import { useCart, useCheckout, useProducts } from "@commerce/shared-hooks";

function MainApp() {
  const { data, isLoading, error } = useProducts("60");
  const { cart, addToCart, removeFromCart } = useCart();
  const { createPayment } = useCheckout();

  React.useEffect(() => {
    api.setNavigationBarColor({
      color: "#2563eb",
      textColor: "white",
    });
  }, []);

  const handleCheckout = async () => {
    const { zpTransToken } = await createPayment({
      provider: "zalopay",
      cartId: "zalo-cart",
      userId: "zalo-user",
      description: "Thanh toán đơn hàng AssetFlow",
    });

    (Payment as any).payOrder({
      zpTransToken,
      success: () => alert("Thanh toán thành công!"),
      fail: (error: any) => alert("Thanh toán thất bại: " + JSON.stringify(error)),
    });
  };

  return (
    <MiniCommerceApp
      platform="zalo"
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

export default MainApp;
