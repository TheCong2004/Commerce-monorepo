import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const numberWithCommas = (number: number | string) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export interface ResolvedPrices {
  salePrice: string;
  originalPrice: string;
  discount: number;
  hasDiscount: boolean;
}

export const getProductPrices = (product: any, currencyCode: string = 'usd'): ResolvedPrices => {
  if (!product || !product.variants || product.variants.length === 0) {
    return { salePrice: '0.00', originalPrice: '0.00', discount: 0, hasDiscount: false };
  }

  const variant = product.variants[0];

  // 1. Storefront API calculated_price
  if (variant.calculated_price) {
    const calc = (variant.calculated_price.calculated_amount || 0) / 100;
    const orig = (variant.calculated_price.original_amount || 0) / 100;
    const hasDiscount = orig > calc;
    const discount = hasDiscount ? Math.round(((orig - calc) / orig) * 100) : 0;
    return {
      salePrice: calc.toFixed(2),
      originalPrice: orig.toFixed(2),
      discount,
      hasDiscount
    };
  }

  // 2. Admin API prices (currency prices) or raw price lists
  if (variant.prices && variant.prices.length > 0) {
    const priceObj = variant.prices.find((p: any) => p.currency_code?.toLowerCase() === currencyCode.toLowerCase()) || variant.prices[0];
    const amount = (priceObj.amount || 0) / 100;
    const originalAmount = (priceObj.compare_at_amount || priceObj.original_amount || priceObj.amount || 0) / 100;
    const hasDiscount = originalAmount > amount;
    const discount = hasDiscount ? Math.round(((originalAmount - amount) / originalAmount) * 100) : 0;

    return {
      salePrice: amount.toFixed(2),
      originalPrice: originalAmount.toFixed(2),
      discount,
      hasDiscount
    };
  }

  // 3. Fallback to raw/mock values if variants have any inline properties
  const rawCalc = variant.calculated_amount || variant.price || 0;
  const rawOrig = variant.original_amount || variant.compare_at_price || rawCalc;
  const calc = typeof rawCalc === 'number' ? rawCalc / 100 : parseFloat(rawCalc) || 0;
  const orig = typeof rawOrig === 'number' ? rawOrig / 100 : parseFloat(rawOrig) || calc;
  const hasDiscount = orig > calc;
  const discount = hasDiscount ? Math.round(((orig - calc) / orig) * 100) : 0;

  return {
    salePrice: calc.toFixed(2),
    originalPrice: orig.toFixed(2),
    discount,
    hasDiscount
  };
};
