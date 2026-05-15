/**
 * Common business logic utilities for formatting, calculating tax/discounts, etc.
 */
export function formatCurrencyVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}

export function calculateTotalWithTax(subtotalCents: number, taxRate: number = 0.1): number {
  return Math.round(subtotalCents * (1 + taxRate));
}

export interface CartItem {
  sku: string;
  priceCents: number;
  qty: number;
}

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.priceCents * item.qty, 0);
}

export function applyDiscount(subtotal: number, discountPercent: number): number {
  return Math.round(subtotal * (1 - discountPercent / 100));
}

export function validateSku(sku: string): boolean {
  return /^[A-Z0-9-_]{3,20}$/.test(sku);
}
