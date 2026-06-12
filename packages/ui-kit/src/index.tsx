import React, { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import {
  Platform,
  Screen,
  MiniShopProduct,
  MiniShopCartItem,
  MiniCommerceAppProps
} from "./types";

import {
  cn,
  normalizeMiniShopProduct,
  formatVnd,
  normalizeSearch,
  productMatchesCategory,
} from "./helpers";

// Import components
import { BottomNav } from "./components/BottomNav";

// Import screen views
import { OnboardingView } from "./views/OnboardingView";
import { AuthView } from "./views/AuthView";
import { WalletSendView } from "./views/WalletSendView";
import { WalletReceiveView } from "./views/WalletReceiveView";
import { WalletHistoryView } from "./views/WalletHistoryView";
import { SearchSuggestView } from "./views/SearchSuggestView";
import { OrderTrackingView } from "./views/OrderTrackingView";
import { HomeView } from "./views/HomeView";
import { CatalogView } from "./views/CatalogView";
import { DetailView } from "./views/DetailView";
import { CartView } from "./views/CartView";
import { CheckoutView } from "./views/CheckoutView";
import { CheckoutSuccessView } from "./views/CheckoutSuccessView";
import { ProfileView } from "./views/ProfileView";
import { OrderHistoryView } from "./views/OrderHistoryView";

// Export everything for backward compatibility
export * from "./types";
export * from "./helpers";
export { Button, type ButtonProps } from "./components/Button";
export { Card } from "./components/Card";
export { ProductCard, type ProductCardProps } from "./components/ProductCard";

export function MiniCommerceApp({
  platform,
  products = [],
  cart,
  isLoading,
  error,
  onAddToCart,
  onRemoveFromCart,
  onCheckout,
  appName = "Shope. Minimalist",
  initialUser = null,
}: MiniCommerceAppProps) {
  // Navigation Router states
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [screenHistory, setScreenHistory] = useState<Screen[]>([]);
  
  // Auth state
  const [user, setUser] = useState<{ name: string; email: string } | null>(initialUser);

  // Auto-login inside Telegram and Zalo mini-apps
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
      setCurrentScreen("home");
      return;
    }

    if (platform === "telegram") {
      const tgUser = (globalThis as any).Telegram?.WebApp?.initDataUnsafe?.user;
      if (tgUser) {
        setUser({
          name: `${tgUser.first_name || ""} ${tgUser.last_name || ""}`.trim() || tgUser.username || "Telegram User",
          email: tgUser.username ? `${tgUser.username}@telegram.org` : "tg-user@telegram.org",
        });
      } else {
        setUser({ name: "Telegram Dev", email: "dev@telegram.org" });
      }
      setCurrentScreen("home");
    } else if (platform === "zalo") {
      setUser({ name: "Khách hàng Zalo", email: "zalo-user@zalo.me" });
      setCurrentScreen("home");
    }
  }, [platform, initialUser]);

  // Search & Filters states
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MiniShopProduct | null>(null);
  
  // Checkout variables
  const [shippingAddress, setShippingAddress] = useState("123 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh");
  const [paymentMethod, setPaymentMethod] = useState<"pay" | "stars">("pay");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [checkingOutLoader, setCheckingOutLoader] = useState(false);
  const [lastOrderCode, setLastOrderCode] = useState("");
  const [lastOrderTotal, setLastOrderTotal] = useState(0);

  // Sorting bottom sheet controls
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(Number.POSITIVE_INFINITY);
  const [sortBy, setSortBy] = useState("Bán chạy");
  const [sendAmountVal, setSendAmountVal] = useState("54.24");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingProfileAddress, setIsEditingProfileAddress] = useState(false);

  // Navigation helpers
  const navigateTo = (screen: Screen) => {
    setScreenHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length === 0) return;
    const previous = screenHistory[screenHistory.length - 1];
    setScreenHistory((prev) => prev.slice(0, -1));
    setCurrentScreen(previous);
  };

  const logout = () => {
    setUser(null);
    setScreenHistory([]);
    setCurrentScreen("auth");
  };

  // Normalizing Backend products
  const normalized = useMemo(() => products.map(normalizeMiniShopProduct), [products]);

  // Filtering products
  const filtered = useMemo(() => {
    const search = normalizeSearch(query.trim());
    let items = normalized.filter((product) => {
      const text = normalizeSearch(`${product.title} ${product.description || ""} ${product.category || ""}`);
      const price = product.salePriceCents || product.priceCents;
      return (!search || text.includes(search)) && 
             productMatchesCategory(product, category) && 
             price <= priceMax;
    });

    if (sortBy === "Giá thấp đến cao") {
      return items.sort((a, b) => (a.salePriceCents || a.priceCents) - (b.salePriceCents || b.priceCents));
    }
    if (sortBy === "Giá cao đến thấp") {
      return items.sort((a, b) => (b.salePriceCents || b.priceCents) - (a.salePriceCents || a.priceCents));
    }
    if (sortBy === "Mới nhất") {
      return [...items].reverse();
    }
    // Default: Best sellers (Bán chạy)
    return items.sort((a, b) => (b.sold || 0) - (a.sold || 0));
  }, [category, normalized, query, priceMax, sortBy]);

  // Flash Sale products
  const flashSales = useMemo(() => {
    return normalized.filter(p => p.salePriceCents && p.salePriceCents < p.priceCents).slice(0, 4);
  }, [normalized]);

  // Toggle favorite items
  const handleFavoriteToggle = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Coupon code trigger
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "MINIMALS") {
      setPromoDiscount(0.1); // 10%
      (globalThis as any).alert("Áp dụng mã giảm giá 10% thành công!");
    } else {
      (globalThis as any).alert("Mã giảm giá không hợp lệ.");
    }
  };

  // Payment checkout triggers
  const handlePlaceOrder = async () => {
    setCheckingOutLoader(true);
    const cartTotal = cart.reduce((sum, item) => sum + (item.salePriceCents || item.priceCents) * item.quantity, 0);
    const discountAmount = cartTotal * promoDiscount;
    const shippingFee = 3000000; // 30,000 VND in cents
    const finalTotal = cartTotal - discountAmount + shippingFee;

    // Simulate backend payment creation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Call original checkout handler (Telegram Stars invoice trigger etc) if platform specific invoice exists
    try {
      if (platform === "telegram") {
        await onCheckout();
      }
    } catch (checkoutErr) {
      console.warn("External checkout provider bypassed in simulated UI checkout flow:", checkoutErr);
    }

    const orderCode = `SP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      code: orderCode,
      date: new Date().toLocaleDateString("vi-VN"),
      status: "Chờ xử lý",
      total: finalTotal,
      itemsCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    };

    setOrderList((prev) => [newOrder, ...prev]);
    setLastOrderCode(orderCode);
    setLastOrderTotal(finalTotal);

    // Empty local cart
    cart.forEach(item => {
      try {
        onRemoveFromCart(item.id);
      } catch (err) {}
    });

    setCheckingOutLoader(false);
    navigateTo("checkout-success");
  };

  return (
    <div
      className="min-h-screen bg-zinc-50 pb-24 text-[14px] text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-200 max-w-md mx-auto relative shadow-2xl overflow-x-hidden"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', Roboto, Inter, Arial, sans-serif" }}
    >
      <AnimatePresence mode="wait">
        {/* Onboarding page */}
        {currentScreen === "onboarding" && (
          <OnboardingView key="onboarding" onFinish={() => navigateTo("auth")} />
        )}

        {/* Login & Register Auth page */}
        {currentScreen === "auth" && (
          <AuthView
            key="auth"
            onLoginSuccess={(name, email) => {
              setUser({ name, email });
              navigateTo("home");
            }}
          />
        )}

        {/* Screen: Home View */}
        {currentScreen === "home" && (
          <HomeView
            key="home"
            appName={appName}
            cart={cart}
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            flashSales={flashSales}
            favorites={favorites}
            handleFavoriteToggle={handleFavoriteToggle}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
            error={error}
            normalized={normalized}
            navigateTo={navigateTo}
            setShowFilterDrawer={setShowFilterDrawer}
          />
        )}

        {/* Screen: Catalog & Search Results */}
        {currentScreen === "catalog" && (
          <CatalogView
            key="catalog"
            goBack={goBack}
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            filtered={filtered}
            favorites={favorites}
            handleFavoriteToggle={handleFavoriteToggle}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={onAddToCart}
            navigateTo={navigateTo}
            setShowFilterDrawer={setShowFilterDrawer}
          />
        )}

        {/* Screen: Full Product Detail Page */}
        {currentScreen === "detail" && selectedProduct && (
          <DetailView
            key="detail"
            selectedProduct={selectedProduct}
            goBack={goBack}
            favorites={favorites}
            handleFavoriteToggle={(id) => handleFavoriteToggle(id)}
            onAddToCart={onAddToCart}
            navigateTo={navigateTo}
          />
        )}

        {/* Screen: Full Cart Page */}
        {currentScreen === "cart" && (
          <CartView
            key="cart"
            cart={cart}
            goBack={goBack}
            navigateTo={navigateTo}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            handleApplyPromo={handleApplyPromo}
            promoDiscount={promoDiscount}
          />
        )}

        {/* Screen: Checkout, Address & Payment */}
        {currentScreen === "checkout" && (
          <CheckoutView
            key="checkout"
            goBack={goBack}
            user={user}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            isEditingAddress={isEditingAddress}
            setIsEditingAddress={setIsEditingAddress}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            cart={cart}
            promoDiscount={promoDiscount}
            checkingOutLoader={checkingOutLoader}
            handlePlaceOrder={handlePlaceOrder}
          />
        )}

        {/* Screen: Checkout Success Screen */}
        {currentScreen === "checkout-success" && (
          <CheckoutSuccessView
            key="checkout-success"
            lastOrderCode={lastOrderCode}
            lastOrderTotal={lastOrderTotal}
            paymentMethod={paymentMethod}
            navigateTo={navigateTo}
          />
        )}

        {/* Screen: Profile Account Screen */}
        {currentScreen === "profile" && (
          <ProfileView
            key="profile"
            user={user}
            logout={logout}
            navigateTo={navigateTo}
            isEditingProfileAddress={isEditingProfileAddress}
            setIsEditingProfileAddress={setIsEditingProfileAddress}
            shippingAddress={shippingAddress}
            setShippingAddress={setShippingAddress}
            favorites={favorites}
          />
        )}

        {/* Screen: Order History */}
        {currentScreen === "order-history" && (
          <OrderHistoryView
            key="order-history"
            goBack={goBack}
            orderList={orderList}
            navigateTo={navigateTo}
          />
        )}

        {/* Screen: Send Amount */}
        {currentScreen === "wallet-send" && (
          <WalletSendView
            key="wallet-send"
            sendAmountVal={sendAmountVal}
            setSendAmountVal={setSendAmountVal}
            goBack={goBack}
            navigateTo={navigateTo}
          />
        )}

        {/* Screen: Receive Payment */}
        {currentScreen === "wallet-receive" && (
          <WalletReceiveView
            key="wallet-receive"
            sendAmountVal={sendAmountVal}
            goBack={goBack}
          />
        )}

        {/* Screen: Payment History */}
        {currentScreen === "wallet-history" && (
          <WalletHistoryView
            key="wallet-history"
            goBack={goBack}
          />
        )}

        {/* Screen: Search Suggest */}
        {currentScreen === "search-suggest" && (
          <SearchSuggestView
            key="search-suggest"
            query={query}
            setQuery={setQuery}
            goBack={goBack}
            navigateTo={navigateTo}
          />
        )}

        {/* Screen: Order Tracking / Delivery Map */}
        {currentScreen === "order-tracking" && (
          <OrderTrackingView
            key="order-tracking"
            goBack={goBack}
            navigateTo={navigateTo}
          />
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigator for authenticated screens */}
      {["home", "catalog", "detail", "profile", "order-history", "wallet-send", "wallet-receive", "wallet-history"].includes(currentScreen) && (
        <BottomNav
          view={
            currentScreen === "home"
              ? "home"
              : currentScreen === "catalog"
              ? "catalog"
              : ["profile", "order-history", "wallet-send", "wallet-receive", "wallet-history"].includes(currentScreen)
              ? "account"
              : "home"
          }
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onHome={() => {
            setQuery("");
            setCategory("Tất cả");
            setCurrentScreen("home");
          }}
          onCatalog={() => {
            setCategory("Tất cả");
            navigateTo("catalog");
          }}
          onCart={() => navigateTo("cart")}
          onProfile={() => navigateTo("profile")}
        />
      )}

      {/* Sorting Drawer Bottom Sheet */}
      <AnimatePresence>
        {showFilterDrawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-center bg-zinc-950/40 dark:bg-black/60"
            onClick={() => setShowFilterDrawer(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 w-full max-w-md bg-white dark:bg-zinc-950 rounded-t-[32px] p-6 space-y-5 border-t border-zinc-100 dark:border-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold">Bộ lọc sản phẩm</h3>
                <button onClick={() => setShowFilterDrawer(false)} className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Sort selector */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Sắp xếp theo</h4>
                <div className="grid grid-cols-2 gap-2">
                  {["Bán chạy", "Giá thấp đến cao", "Giá cao đến thấp", "Mới nhất"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={cn(
                        "py-2.5 px-3 rounded-xl border text-xs font-semibold tracking-wide transition-all",
                        sortBy === option
                          ? "bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950"
                          : "bg-zinc-50 text-zinc-600 border-zinc-200/50 dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-zinc-300"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Khoảng giá tối đa</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Tất cả giá", val: Number.POSITIVE_INFINITY },
                    { label: "Dưới 500k", val: 50000000 },
                    { label: "Dưới 1 triệu", val: 100000000 },
                    { label: "Dưới 5 triệu", val: 500000000 }
                  ].map((option) => (
                    <button
                      key={option.label}
                      onClick={() => setPriceMax(option.val)}
                      className={cn(
                        "py-2.5 px-3 rounded-xl border text-xs font-semibold tracking-wide transition-all",
                        priceMax === option.val
                          ? "bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950"
                          : "bg-zinc-50 text-zinc-600 border-zinc-200/50 dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-zinc-300"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="w-full inline-flex items-center justify-center font-bold tracking-wide transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 bg-neutral-950 text-white hover:bg-neutral-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-all duration-200 h-11.5 px-5 text-[13px] rounded-2xl"
                onClick={() => setShowFilterDrawer(false)}
              >
                Áp dụng bộ lọc
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
