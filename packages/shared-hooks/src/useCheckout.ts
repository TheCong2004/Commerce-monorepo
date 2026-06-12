import { createCommerceClient } from "@commerce/api-client";
import { PaymentMethod } from "@commerce/shared-types";

const runtimeEnv = (globalThis as any).process?.env || {};
const viteEnv = (import.meta as any).env || {};
const productionMerchantUrl = "https://merchant.thecong2610.workers.dev";
const cleanUrl = (value: unknown) => {
  if (!value) return undefined;
  const url = String(value);
  return url.includes('localhost') || url.includes('127.0.0.1') ? undefined : url;
};
const baseUrl =
  cleanUrl(runtimeEnv.NEXT_PUBLIC_MERCHANT_URL) ||
  cleanUrl(runtimeEnv.NEXT_PUBLIC_MERCHANT_API_URL) ||
  cleanUrl(viteEnv.VITE_MERCHANT_URL) ||
  cleanUrl(viteEnv.VITE_API_URL) ||
  productionMerchantUrl;
const defaultClient = createCommerceClient(baseUrl) as any;

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
