export type Platform = "web" | "zalo" | "telegram" | "mini";

export type Screen =
  | "onboarding"
  | "auth"
  | "home"
  | "catalog"
  | "detail"
  | "cart"
  | "checkout"
  | "profile"
  | "order-history"
  | "checkout-success"
  | "wallet-send"
  | "wallet-receive"
  | "wallet-history"
  | "search-suggest"
  | "order-tracking";

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
  colors?: string[];
  sizes?: string[];
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
  initialUser?: { name: string; email: string } | null;
}
