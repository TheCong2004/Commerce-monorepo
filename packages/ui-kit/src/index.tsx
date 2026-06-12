import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Platform = "web" | "zalo" | "telegram" | "mini";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  platform?: Platform;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", platform = "web", ...props }, ref) => {
    const isMini = platform === "zalo" || platform === "telegram" || platform === "mini";
    const variants = {
      primary: "bg-teal-600 text-white shadow-lg shadow-teal-500/20 hover:bg-teal-700",
      secondary: "bg-slate-100 text-slate-950 hover:bg-slate-200 dark:bg-slate-800 dark:text-white",
      outline: "border border-slate-200 bg-white text-slate-950 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white",
      ghost: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
    };
    const sizes = {
      sm: isMini ? "h-9 px-3 text-[12px]" : "h-8 px-3 text-xs",
      md: isMini ? "h-11 px-5 text-[13px]" : "h-10 px-4 text-sm",
      lg: isMini ? "h-12 px-6 text-[14px]" : "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-bold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export interface ProductCardProps {
  product: {
    id: string;
    title: string;
    description?: string;
    priceCents: number;
    imageUrl?: string;
  };
  onAddToCart?: (id: string) => void;
  platform?: Platform;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, platform = "web" }) => (
  <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="aspect-square bg-slate-100 dark:bg-slate-800">
      {product.imageUrl ? (
        <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" loading="lazy" />
      ) : null}
    </div>
    <div className="p-3">
      <h3 className="line-clamp-2 text-[14px] font-extrabold leading-5">{product.title}</h3>
      <p className="mt-2 text-[13px] font-black text-teal-600 dark:text-teal-400">{formatVnd(product.priceCents)}</p>
      <Button platform={platform} size="sm" className="mt-3 w-full" onClick={() => onAddToCart?.(product.id)}>
        Mua ngay
      </Button>
    </div>
  </article>
);

export interface MiniShopProduct {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  category?: string;
  brand?: string;
  priceCents: number;
  salePriceCents?: number;
  imageUrl?: string;
  rating?: number;
  sold?: number;
  stock?: number;
  badges?: string[];
}

export interface MiniShopCartItem extends MiniShopProduct {
  quantity: number;
}

export interface MiniCommerceAppProps {
  platform: Extract<Platform, "zalo" | "telegram" | "mini">;
  products?: any[];
  cart: MiniShopCartItem[];
  isLoading?: boolean;
  error?: unknown;
  onAddToCart: (product: MiniShopProduct) => void;
  onRemoveFromCart: (id: string) => void;
  onCheckout: () => Promise<void> | void;
  appName?: string;
}

const categories = [
  "Tất cả",
  "Sim số",
  "Gói cước mạng",
  "Sách PDF",
  "Mẫu hợp đồng",
  "Digital marketing",
  "Nông nghiệp",
  "POD",
];

const priceFilters = [
  { label: "Tất cả giá", max: Number.POSITIVE_INFINITY },
  { label: "Dưới 100k", max: 10000000 },
  { label: "Dưới 500k", max: 50000000 },
  { label: "Dưới 5 triệu", max: 500000000 },
];

const sortFilters = ["Bán chạy", "Đang giảm giá", "Mới nhất", "Còn hàng"];

function Icon({ name, className }: { name: "search" | "cart" | "home" | "grid" | "user" | "heart" | "filter" | "star"; className?: string }) {
  const common = { className: cn("h-5 w-5", className), fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24" };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    cart: <><path d="M6 6h15l-2 8H8L6 3H3" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>,
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    heart: <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
    filter: <><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2l-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
  };
  return <svg {...common}>{paths[name]}</svg>;
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

  return {
    id: String(product?.id || product?.slug || product?.handle || product?.title || product?.name),
    title: product?.title || product?.name || "Sản phẩm",
    slug: product?.slug || product?.handle,
    description: product?.description || product?.short_description || product?.summary,
    category: product?.category || product?.product_type || product?.type || "Sản phẩm",
    brand: product?.brand || product?.vendor || "AssetFlow",
    priceCents: Number(price) || 0,
    salePriceCents: salePrice ? Number(salePrice) : undefined,
    imageUrl: image,
    rating: Number(product?.rating) || 4.8,
    sold: Number(product?.sold) || Number(product?.metadata?.sold) || 0,
    stock: product?.stock ?? product?.inventory_quantity ?? product?.metadata?.stock,
    badges: product?.badges || product?.tags || [],
  };
}

function formatVnd(cents: number) {
  return (Math.max(0, cents) / 100).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });
}

function productMatchesCategory(product: MiniShopProduct, category: string) {
  if (category === "Tất cả") return true;
  const text = `${product.category || ""} ${product.title}`.toLowerCase();
  return category.toLowerCase().split(" ").every((part) => text.includes(part));
}

function MiniHeader({
  platform,
  appName,
  cartCount,
  query,
  onQueryChange,
  onCartClick,
}: {
  platform: MiniCommerceAppProps["platform"];
  appName: string;
  cartCount: number;
  query: string;
  onQueryChange: (value: string) => void;
  onCartClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 px-4 pb-3 pt-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            {platform === "telegram" ? "Telegram Shop" : platform === "zalo" ? "Zalo Shop" : "Mini Shop"}
          </p>
          <h1 className="text-[24px] font-black tracking-tight text-slate-950 dark:text-white">{appName}</h1>
        </div>
        <button
          onClick={onCartClick}
          className="relative grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white shadow-sm transition active:scale-95 dark:border-slate-800 dark:bg-slate-900"
          aria-label="Mở giỏ hàng"
        >
          <Icon name="cart" className="text-slate-900 dark:text-white" />
          {cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[10px] font-black text-white">
              {cartCount}
            </span>
          ) : null}
        </button>
      </div>

      <label className="mt-3 flex h-12 items-center gap-3 rounded-2xl border border-teal-200 bg-white px-3 shadow-[0_14px_36px_rgba(0,178,169,0.12)] ring-4 ring-teal-500/5 dark:border-teal-900 dark:bg-slate-900">
        <Icon name="search" className="text-teal-600 dark:text-teal-400" />
        <input
          value={query}
          onChange={(event) => onQueryChange((event.target as any).value)}
          placeholder="Tìm sim, sách PDF, mẫu hợp đồng..."
          className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
        />
      </label>
    </header>
  );
}

function HeroBanner({ platform }: { platform: MiniCommerceAppProps["platform"] }) {
  return (
    <section className="px-4 pt-4">
      <div className="relative overflow-hidden rounded-[28px] bg-slate-950 p-5 text-white shadow-xl shadow-slate-900/10">
        <div className="absolute inset-x-0 top-0 h-1 bg-teal-500" />
        <div className="relative">
          <span className="inline-flex rounded-full bg-white/12 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-teal-100">
            Ưu đãi hôm nay
          </span>
          <h2 className="mt-4 max-w-[260px] text-[24px] font-black leading-8 tracking-tight">
            Mua nhanh sản phẩm số, sim số và dịch vụ
          </h2>
          <p className="mt-2 max-w-[280px] text-[13px] leading-5 text-white/78">
            Đồng bộ dữ liệu merchant, tối ưu cho {platform === "telegram" ? "Telegram" : "Zalo"} và thanh toán gọn.
          </p>
          <div className="mt-5 flex gap-2">
            <span className="rounded-full bg-teal-500 px-3 py-2 text-[12px] font-black text-white">Bán chạy</span>
            <span className="rounded-full bg-white/12 px-3 py-2 text-[12px] font-black text-white">Giảm giá</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-10 shrink-0 rounded-full border px-4 text-[13px] font-extrabold shadow-sm transition active:scale-95",
        active
          ? "border-teal-600 bg-teal-600 text-white"
          : "border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
      )}
    >
      {label}
    </button>
  );
}

function CategoryRail({ active, onChange }: { active: string; onChange: (category: string) => void }) {
  return (
    <section className="px-4 pt-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[18px] font-black tracking-tight">Danh mục</h2>
        <span className="text-[12px] font-bold text-slate-400">Kéo ngang</span>
      </div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {categories.map((item) => (
          <CategoryChip key={item} label={item} active={active === item} onClick={() => onChange(item)} />
        ))}
      </div>
    </section>
  );
}

function FilterBar({
  priceMax,
  sort,
  onPriceChange,
  onSortChange,
}: {
  priceMax: number;
  sort: string;
  onPriceChange: (value: number) => void;
  onSortChange: (value: string) => void;
}) {
  return (
    <section className="px-4 pt-3">
      <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
        <select
          value={String(priceMax)}
          onChange={(event) => onPriceChange(Number((event.target as any).value))}
          className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-[13px] font-bold shadow-sm outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          {priceFilters.map((filter) => (
            <option key={filter.label} value={String(filter.max)}>
              {filter.label}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(event) => onSortChange((event.target as any).value)}
          className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-[13px] font-bold shadow-sm outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          {sortFilters.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
        <button className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900" aria-label="Bộ lọc">
          <Icon name="filter" className="text-slate-600 dark:text-slate-300" />
        </button>
      </div>
    </section>
  );
}

function ProductCardMini({
  product,
  selected,
  onOpen,
  onAdd,
  onCompare,
}: {
  product: MiniShopProduct;
  selected: boolean;
  onOpen: () => void;
  onAdd: () => void;
  onCompare: () => void;
}) {
  const effectivePrice = product.salePriceCents || product.priceCents;
  const discount =
    product.salePriceCents && product.priceCents > product.salePriceCents
      ? Math.round((1 - product.salePriceCents / product.priceCents) * 100)
      : 0;

  return (
    <article className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900">
      <button onClick={onOpen} className="block w-full text-left">
        <div className="relative aspect-[1/1.05] overflow-hidden bg-slate-100 dark:bg-slate-800">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-[12px] font-bold text-slate-400">No image</div>
          )}
          {discount > 0 ? (
            <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-1 text-[10px] font-black text-white">
              -{discount}%
            </span>
          ) : null}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onCompare();
            }}
            className={cn(
              "absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full border backdrop-blur",
              selected
                ? "border-teal-500 bg-teal-500 text-white"
                : "border-white/70 bg-white/80 text-slate-700 dark:bg-slate-950/70 dark:text-white"
            )}
            aria-label="So sánh"
          >
            <Icon name="heart" className="h-4 w-4" />
          </button>
        </div>
      </button>

      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[11px] font-black uppercase tracking-wide text-teal-600 dark:text-teal-400">
            {product.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500">
            <Icon name="star" className="h-3 w-3 fill-amber-400" />
            {product.rating?.toFixed(1)}
          </span>
        </div>
        <button onClick={onOpen} className="mt-1 block text-left">
          <h3 className="line-clamp-2 min-h-10 text-[14px] font-black leading-5 text-slate-950 dark:text-white">
            {product.title}
          </h3>
        </button>
        <p className="mt-1 line-clamp-2 min-h-9 text-[12px] leading-[18px] text-slate-500 dark:text-slate-400">
          {product.description || "Sản phẩm đã được merchant kiểm duyệt trước khi bán."}
        </p>
        <div className="mt-3">
          <div className="flex flex-wrap items-end gap-1.5">
            <span className="text-[15px] font-black text-teal-600 dark:text-teal-400">{formatVnd(effectivePrice)}</span>
            {discount > 0 ? <span className="text-[11px] text-slate-400 line-through">{formatVnd(product.priceCents)}</span> : null}
          </div>
          <Button platform="mini" size="md" className="mt-3 w-full" onClick={onAdd}>
            Mua ngay
          </Button>
        </div>
      </div>
    </article>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="aspect-[1/1.05] animate-pulse bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />
          <div className="space-y-2 p-3">
            <div className="h-3 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-10 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductSection({
  title,
  count,
  products,
  isLoading,
  error,
  compareIds,
  onOpen,
  onAdd,
  onCompare,
}: {
  title: string;
  count: number;
  products: MiniShopProduct[];
  isLoading?: boolean;
  error?: unknown;
  compareIds: string[];
  onOpen: (product: MiniShopProduct) => void;
  onAdd: (product: MiniShopProduct) => void;
  onCompare: (id: string) => void;
}) {
  return (
    <section className="px-4 pt-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[18px] font-black tracking-tight">{title}</h2>
        <span className="text-[12px] font-bold text-slate-400">{count} gợi ý</span>
      </div>
      {isLoading ? (
        <SkeletonGrid />
      ) : error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-[13px] font-bold text-red-700 dark:border-red-950 dark:bg-red-950/40 dark:text-red-300">
          Không tải được sản phẩm từ backend.
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-[13px] text-slate-500 dark:border-slate-700 dark:bg-slate-900">
          Chưa có sản phẩm phù hợp.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCardMini
              key={product.id}
              product={product}
              selected={compareIds.includes(product.id)}
              onOpen={() => onOpen(product)}
              onAdd={() => onAdd(product)}
              onCompare={() => onCompare(product.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function TrustPanel() {
  return (
    <section className="px-4 pt-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-[18px] font-black tracking-tight">Niềm tin mua hàng</h2>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-bold leading-4 text-slate-600 dark:text-slate-300">
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">Thanh toán bảo mật</div>
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">Hỗ trợ sau mua</div>
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">Dữ liệu merchant thật</div>
        </div>
      </div>
    </section>
  );
}

function CartView({ cart, onRemove, onCheckout }: { cart: MiniShopCartItem[]; onRemove: (id: string) => void; onCheckout: () => void | Promise<void> }) {
  const total = cart.reduce((sum, item) => sum + (item.salePriceCents || item.priceCents) * item.quantity, 0);

  return (
    <main className="px-4 py-4">
      <h2 className="text-[24px] font-black tracking-tight">Giỏ hàng</h2>
      {cart.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-[13px] text-slate-500 dark:border-slate-700 dark:bg-slate-900">
          Giỏ hàng đang trống
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                {item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" loading="lazy" /> : null}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-[14px] font-black leading-5">{item.title}</h3>
                <p className="mt-1 text-[13px] font-black text-teal-600 dark:text-teal-400">
                  {formatVnd(item.salePriceCents || item.priceCents)} x {item.quantity}
                </p>
                <button onClick={() => onRemove(item.id)} className="mt-2 text-[12px] font-bold text-red-600">
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <div className="rounded-[24px] border border-teal-100 bg-teal-50 p-4 shadow-sm dark:border-teal-900 dark:bg-teal-950/40">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-slate-600 dark:text-slate-300">Tổng cộng</span>
              <span className="text-[22px] font-black text-teal-700 dark:text-teal-300">{formatVnd(total)}</span>
            </div>
            <Button platform="mini" size="lg" className="mt-4 w-full" onClick={onCheckout}>
              Thanh toán ngay
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}

function ProductDetailSheet({ product, onClose, onAdd, onCompare }: { product: MiniShopProduct; onClose: () => void; onAdd: () => void; onCompare: () => void }) {
  return (
    <div className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px]" onClick={onClose}>
      <section
        className="animate-[miniSlideUp_220ms_ease-out] absolute bottom-0 max-h-[88vh] w-full overflow-y-auto rounded-t-[28px] bg-white p-4 shadow-2xl dark:bg-slate-950"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-slate-300 dark:bg-slate-700" />
        <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-slate-100 dark:bg-slate-800">
          {product.imageUrl ? <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" loading="lazy" /> : null}
        </div>
        <p className="mt-4 text-[11px] font-black uppercase tracking-wide text-teal-600 dark:text-teal-400">{product.category}</p>
        <h2 className="mt-1 text-[24px] font-black leading-8 tracking-tight">{product.title}</h2>
        <p className="mt-2 text-[13px] leading-6 text-slate-600 dark:text-slate-300">
          {product.description || "Sản phẩm phù hợp cho khách cần mua nhanh, thông tin rõ và thanh toán gọn."}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-slate-600 dark:text-slate-300">
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">Đánh giá {product.rating?.toFixed(1)}</div>
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">{product.sold || 0} đã bán</div>
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">Còn hàng</div>
        </div>
        <div className="sticky bottom-0 mt-5 flex gap-3 bg-white py-3 dark:bg-slate-950">
          <Button platform="mini" variant="outline" className="flex-1" onClick={onCompare}>
            So sánh
          </Button>
          <Button platform="mini" className="flex-[1.4]" onClick={onAdd}>
            Mua ngay - {formatVnd(product.salePriceCents || product.priceCents)}
          </Button>
        </div>
      </section>
    </div>
  );
}

function BottomNav({ view, onHome, onCategory, onCart }: { view: "home" | "cart" | "account"; onHome: () => void; onCategory: () => void; onCart: () => void }) {
  const itemClass = (active: boolean) => cn("flex flex-col items-center justify-center gap-1 text-[11px] font-black", active ? "text-teal-600 dark:text-teal-400" : "text-slate-400");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 grid h-[68px] grid-cols-4 border-t border-slate-200 bg-white/95 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
      <button onClick={onHome} className={itemClass(view === "home")}>
        <Icon name="home" className="h-5 w-5" />
        Home
      </button>
      <button onClick={onCategory} className={itemClass(false)}>
        <Icon name="grid" className="h-5 w-5" />
        Categories
      </button>
      <button onClick={onCart} className={itemClass(view === "cart")}>
        <Icon name="cart" className="h-5 w-5" />
        Cart
      </button>
      <button className={itemClass(view === "account")}>
        <Icon name="user" className="h-5 w-5" />
        Account
      </button>
    </nav>
  );
}

export function MiniCommerceApp({
  platform,
  products = [],
  cart,
  isLoading,
  error,
  onAddToCart,
  onRemoveFromCart,
  onCheckout,
  appName = "AssetFlow",
}: MiniCommerceAppProps) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("Tất cả");
  const [priceMax, setPriceMax] = React.useState(Number.POSITIVE_INFINITY);
  const [sort, setSort] = React.useState("Bán chạy");
  const [view, setView] = React.useState<"home" | "cart" | "account">("home");
  const [detail, setDetail] = React.useState<MiniShopProduct | null>(null);
  const [compareIds, setCompareIds] = React.useState<string[]>([]);

  const normalized = React.useMemo(() => products.map(normalizeMiniShopProduct), [products]);
  const filtered = React.useMemo(() => {
    const search = query.trim().toLowerCase();
    const items = normalized.filter((product) => {
      const effectivePrice = product.salePriceCents || product.priceCents;
      const text = `${product.title} ${product.description || ""} ${product.category || ""}`.toLowerCase();
      return (!search || text.includes(search)) && effectivePrice <= priceMax && productMatchesCategory(product, category);
    });

    if (sort === "Đang giảm giá") {
      return items.filter((product) => product.salePriceCents && product.salePriceCents < product.priceCents);
    }
    if (sort === "Mới nhất") return [...items].reverse();
    if (sort === "Còn hàng") return items.filter((product) => product.stock === undefined || Number(product.stock) > 0);
    return [...items].sort((a, b) => (b.sold || 0) - (a.sold || 0));
  }, [category, normalized, priceMax, query, sort]);

  const bestSellers = filtered.slice(0, 6);
  const saleProducts = filtered
    .filter((product) => product.salePriceCents && product.salePriceCents < product.priceCents)
    .slice(0, 6);
  const compareProducts = compareIds
    .map((id) => normalized.find((product) => product.id === id))
    .filter(Boolean) as MiniShopProduct[];

  const toggleCompare = (id: string) => {
    setCompareIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current.slice(-1), id]));
  };

  const addAndOpenCart = (product: MiniShopProduct) => {
    onAddToCart(product);
    setView("cart");
  };

  return (
    <div
      className="min-h-screen bg-slate-50 pb-24 text-[14px] text-slate-950 antialiased dark:bg-slate-950 dark:text-slate-50"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', Roboto, Inter, Arial, sans-serif" }}
    >
      <style>{`
        @keyframes miniSlideUp { from { transform: translateY(24px); opacity: .6; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
      <MiniHeader
        platform={platform}
        appName={appName}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        query={query}
        onQueryChange={setQuery}
        onCartClick={() => setView("cart")}
      />

      {view === "cart" ? (
        <CartView cart={cart} onRemove={onRemoveFromCart} onCheckout={onCheckout} />
      ) : (
        <main>
          <HeroBanner platform={platform} />
          <CategoryRail active={category} onChange={setCategory} />
          <FilterBar priceMax={priceMax} sort={sort} onPriceChange={setPriceMax} onSortChange={setSort} />
          <ProductSection
            title="Sản phẩm bán chạy"
            count={bestSellers.length}
            products={bestSellers}
            isLoading={isLoading}
            error={error}
            compareIds={compareIds}
            onOpen={setDetail}
            onAdd={addAndOpenCart}
            onCompare={toggleCompare}
          />
          <ProductSection
            title="Đang giảm giá"
            count={saleProducts.length}
            products={saleProducts.length ? saleProducts : filtered.slice(0, 4)}
            isLoading={false}
            compareIds={compareIds}
            onOpen={setDetail}
            onAdd={addAndOpenCart}
            onCompare={toggleCompare}
          />

          {compareProducts.length > 0 ? (
            <section className="px-4 pt-6">
              <h2 className="mb-3 text-[18px] font-black tracking-tight">So sánh nhanh</h2>
              <div className="grid grid-cols-2 gap-3">
                {compareProducts.map((product) => (
                  <div key={product.id} className="rounded-2xl border border-slate-200 bg-white p-3 text-[13px] shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h3 className="line-clamp-2 font-black">{product.title}</h3>
                    <p className="mt-2 font-black text-teal-600 dark:text-teal-400">{formatVnd(product.salePriceCents || product.priceCents)}</p>
                    <p className="mt-1 text-[11px] text-slate-500">Đánh giá {product.rating?.toFixed(1)} - {product.sold || 0} đã bán</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <TrustPanel />
        </main>
      )}

      {detail ? (
        <ProductDetailSheet
          product={detail}
          onClose={() => setDetail(null)}
          onCompare={() => toggleCompare(detail.id)}
          onAdd={() => {
            addAndOpenCart(detail);
            setDetail(null);
          }}
        />
      ) : null}

      <BottomNav
        view={view}
        onHome={() => {
          setView("home");
          setDetail(null);
        }}
        onCategory={() => {
          setView("home");
          (globalThis as any).setTimeout(() => (globalThis as any).document?.querySelector("section:nth-of-type(2)")?.scrollIntoView({ behavior: "smooth" }), 0);
        }}
        onCart={() => setView("cart")}
      />
    </div>
  );
}
