/**
 * Common business logic utilities for formatting, calculating tax/discounts, etc.
 */
export function formatCurrencyVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}

export function calculateTotalWithTax(subtotalCents: number, taxRate: number = 0.1): number {
  return Math.round(subtotalCents * (1 + taxRate));
}
