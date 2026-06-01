"use client";

type CheckoutItemInput = {
  id: string;
  title: string;
  price: number;
  quantity?: number;
  variantTitle?: string;
  thumbnail?: string;
  source?: string;
  metadata?: Record<string, unknown>;
};

const DEFAULT_PRINTERVAL_CART_URL = "https://printerval.thecong2610.workers.dev/cart";

export function redirectToPrintervalCheckout(item: CheckoutItemInput) {
  const cartUrl =
    process.env.NEXT_PUBLIC_PRINTERVAL_CART_URL || DEFAULT_PRINTERVAL_CART_URL;

  const checkoutItem = {
    id: item.id,
    title: item.title,
    quantity: item.quantity || 1,
    unit_price: item.price,
    variant_title: item.variantTitle || "Xemboituvi service",
    thumbnail: item.thumbnail || "",
    metadata: {
      source_app: "xemboituvi",
      source: item.source,
      ...item.metadata,
    },
  };

  const url = new URL(cartUrl);
  url.searchParams.set("checkout_items", JSON.stringify([checkoutItem]));
  url.searchParams.set("source", "xemboituvi");

  window.location.href = url.toString();
}

export function parseVndPrice(price: string) {
  const digits = price.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}
