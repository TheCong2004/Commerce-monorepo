import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MiniShopProduct } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeMiniShopProduct(product: any): MiniShopProduct {
  const variant = product?.variants?.[0] || {};
  const price =
    product?.priceCents ??
    product?.price_cents ??
    product?.price ??
    variant?.price_cents ??
    variant?.priceCents ??
    0;
  const salePrice =
    product?.salePriceCents ??
    product?.sale_price_cents ??
    product?.salePrice ??
    product?.sale_price;
  const image =
    product?.imageUrl ??
    product?.image_url ??
    product?.image ??
    product?.thumbnail ??
    variant?.image_url ??
    product?.images?.[0];

  const colors = ["#111111", "#E5E5E5", "#D4AF37", "#FFFFFF"].slice(0, Math.floor(Math.random() * 3) + 1);
  const sizes = ["S", "M", "L", "XL"];

  return {
    id: String(product?.id || product?.slug || product?.handle || product?.title || product?.name),
    title: product?.title || product?.name || "Sản phẩm",
    slug: product?.slug || product?.handle,
    description: product?.description || product?.short_description || product?.summary,
    category: product?.category || product?.product_type || product?.type || "Sản phẩm",
    brand: product?.brand || product?.vendor || "Shope",
    priceCents: Number(price) || 0,
    salePriceCents: salePrice ? Number(salePrice) : undefined,
    imageUrl: normalizeImageUrl(image),
    rating: Number(product?.rating) || 4.8,
    sold: Number(product?.sold) || Number(product?.metadata?.sold) || 0,
    stock: product?.stock ?? product?.inventory_quantity ?? product?.metadata?.stock,
    badges: product?.badges || product?.tags || [],
    colors,
    sizes
  };
}

function normalizeImageUrl(image: unknown): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  if (typeof image === "object") {
    const candidate = image as { url?: unknown; src?: unknown; fullImage?: unknown; thumbnail?: unknown };
    const value = candidate.url ?? candidate.src ?? candidate.fullImage ?? candidate.thumbnail;
    return typeof value === "string" ? value : undefined;
  }
  return undefined;
}

export function formatVnd(cents: number) {
  return (Math.max(0, cents) / 100).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });
}

export function normalizeSearch(value?: string) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function productMatchesCategory(product: MiniShopProduct, category: string) {
  if (category === "Tất cả") return true;
  const text = normalizeSearch(`${product.category || ""} ${product.title}`);
  return normalizeSearch(category)
    .split(" ")
    .every((part) => text.includes(part));
}

// ============================================================
// TRANSITIONS CONFIG (SPRING TRANSITIONS LIKE FLUTTER)
// ============================================================

export const pageTransition = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.25 } }
} as any;

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06
    }
  }
} as any;

export const fadeUpItem = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }
} as any;

// ============================================================
// MOCK DATA
// ============================================================

export const PROMO_SLIDES = [
  {
    id: 1,
    title: "Summer Essentials",
    subtitle: "New Minimalist Basic Items",
    discount: "Up to 50% OFF",
    bgColor: "bg-zinc-900 dark:bg-zinc-900",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    title: "Clean Palette",
    subtitle: "Premium Linen Wear",
    discount: "Daily Basic Pieces",
    bgColor: "bg-zinc-100 dark:bg-zinc-900/50",
    textColor: "text-zinc-900 dark:text-zinc-50",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    title: "Essential Cozy",
    subtitle: "Autumn Knitted Hoodies",
    discount: "Limited Editions",
    bgColor: "bg-neutral-800 dark:bg-neutral-900",
    textColor: "text-zinc-50",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400"
  }
];

export const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: "Minimalist Style",
    description: "Khám phá các thiết kế thời trang tinh gọn, sang trọng và hiện đại giúp tôn vinh vẻ đẹp tự nhiên của bạn.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    title: "Fast Mobile Payment",
    description: "Hỗ trợ thanh toán nhanh chóng qua ZaloPay hoặc Telegram Stars tiện lợi ngay trên thiết bị di động của bạn.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    title: "Premium Delivery",
    description: "Nhận hàng nhanh chóng đóng gói kỹ lưỡng và an toàn với dịch vụ giao hàng cao cấp dành riêng cho bạn.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=400"
  }
];

export const CATEGORIES = ["Tất cả", "Sim số", "Gói cước mạng", "Sách PDF", "Mẫu hợp đồng", "Digital marketing", "Nông nghiệp", "POD"];
