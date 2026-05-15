import { createCommerceClient } from "@commerce/api-client";
import { PaymentMethod } from "@commerce/shared-types";

const defaultClient = createCommerceClient("http://localhost:8787") as any;

export function useCheckout() {
  const createPayment = async (params: {
    provider: 'zalopay' | 'telegram-stars';
    cartId: string;
    userId: string;
    title?: string;
    description?: string;
    starsAmount?: number;
  }) => {
    const res = await (defaultClient as any).v1.carts["create-payment"].$post({
      json: params
    });

    if (!res.ok) {
      throw new Error("Failed to create payment");
    }

    return res.json();
  };

  return { createPayment };
}
