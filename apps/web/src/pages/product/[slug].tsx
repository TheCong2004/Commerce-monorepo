import { PrimaryLayout } from "@/layouts";
import { ReactElement, useEffect, useCallback, useMemo, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { NextPageWithLayout } from "../_app";
import Thumbnail from "@/shared/features/page/Product/Thumbnail";
import Detail from "@/shared/features/page/Product/Detail";
import CarouselProductList from "@/shared/features/page/Product/CarouselProductList";
import BoughtTogether from "@/packages/bought-together/BoughtTogether";

import { mockProducts, getMockProductByHandle, getBoughtTogetherSuggestions } from "@/lib/mockProduct";
import { useRouter } from 'next/router';
import { useRecentlyViewed } from "@/packages/browsing-history/hooks/useRecentlyViewed";
import { MOCK_REVIEWS } from "@/packages/reviews/Reviews";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { QuickGiftFinder } from "@/shared/layout/header/QuickGiftFinder";
import { SaleProduct } from "@/shared/features/page/HomePage/components/Promotions";
import ImageViewer from "@/shared/features/page/Product/ImageViewer";

// Lazy load below-fold components for better performance
const FAQ = dynamic(() => import("@/shared/features/page/Product/FAQ"), {
  loading: () => <div className="h-20" />,
  ssr: true,
});
const Reviews = dynamic(() => import("@/packages/reviews/Reviews"), {
  loading: () => <div className="h-32" />,
  ssr: true,
});
const YouMightLoveThese = dynamic(() => import("@/packages/YouMightLoveThese/components/YouMightLoveThese"), {
  loading: () => <div className="h-40" />,
  ssr: true,
});
const ExploreRelatedSearches = dynamic(() => import("@/packages/ExploreRelatedSearches/components/ExploreRelatedSearches"), {
  loading: () => <div className="h-16" />,
  ssr: true,
});
const Description = dynamic(() => import("@/shared/features/page/Product/Description"), {
  loading: () => <div className="h-24" />,
  ssr: true,
});
const MoreFromThisShop = dynamic(() => import("@/packages/MoreFromThisShop/components/MoreFromThisShop"), {
  loading: () => null,
  ssr: true,
});

const detectProductType = (productData: any): "home" | "fashion" | "report" => {
  // Check if it's a report product first
  if (productData?.productType === "report") return "report";

  // Check if it's a home product (with panorama)
  if (productData?.images?.[0]) {
    return 'panoramaUrl' in productData.images[0] && productData.images[0].panoramaUrl ? "home" : "fashion";
  }

  return "fashion";
};

// Calculate average rating from review data
const calculateAverageRating = (reviews: typeof MOCK_REVIEWS): number => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal place
};
const productSalesData = mockProducts;
const priceList = { price_lists: [{ id: 'pl1', title: 'Sale' }, { id: 'pl2', title: 'Top Picks For You' }] };
const Products: NextPageWithLayout = () => {
  const { addViewedProduct } = useRecentlyViewed();

  // Map products để add price field từ variants - memoized to prevent recalculation
  const productsWithPrice = useMemo(() =>
    mockProducts.map(product => ({
      ...product,
      price: product.variants?.[0]?.calculated_price?.calculated_amount || 0,
      originalPrice: product.variants?.[0]?.calculated_price?.original_amount || 0,
    }))
    , []);

  // === USING MOCK DATA INSTEAD ===
  const router = useRouter();
  const { slug } = router.query;
  const productData = getMockProductByHandle(slug as string) || getMockProductByHandle("custom-comfort-colors-tee");
  const cart = productData;

  // Transform productData to add price field
  const currentProductWithPrice = useMemo(() => ({
    id: productData?.id || '',
    title: productData?.title || '',
    handle: productData?.handle || '',
    thumbnail: productData?.thumbnail || '',
    price: productData?.variants?.[0]?.calculated_price?.calculated_amount || 0,
    originalPrice: productData?.variants?.[0]?.calculated_price?.original_amount,
    category: (productData?.metadata as any)?.category ||
      (productData as any)?.category ||
      'uncategorized',
  }), [productData]);

  const [isLoading, setIsLoading] = useState(false);
  const [boughtTogetherSelections, setBoughtTogetherSelections] = useState<Set<string>>(new Set());
  const [customDesign, setCustomDesign] = useState<any>(null);
  const [customTemplate, setCustomTemplate] = useState<any>(null);
  const [customElements, setCustomElements] = useState<any[]>([]);

  const handleCustomizationApply = useCallback((payload: any, template: any) => {
    const { design, elements } = payload || {};
    console.log('[Product Page] handleCustomizationApply called with:', {
      elements_count: elements?.length,
      elements,
      template_id: template?.id
    });
    setCustomDesign(design);
    setCustomTemplate(template);
    setCustomElements(elements || []);
  }, []);

  // Check if user has purchased the product
  const hasPurchased = useMemo(() => {
    if (typeof window !== 'undefined') {
      const purchased = JSON.parse(localStorage.getItem('purchased_products') || '[]');
      return purchased.includes(productData?.id);
    }
    return false;
  }, [productData?.id]);

  // Save product to recently viewed when page loads
  useEffect(() => {
    if (productData?.id) {
      addViewedProduct({
        id: productData.id,
        name: productData.title,
        image_url: productData.thumbnail,
        url: `/product/${productData.handle}`,
        price: productData.variants?.[0]?.calculated_price?.calculated_amount
          ? (productData.variants[0].calculated_price.calculated_amount / 100).toFixed(2)
          : "0.00",
        compare_at_price: productData.variants?.[0]?.calculated_price?.original_amount
          ? (productData.variants[0].calculated_price.original_amount / 100).toFixed(2)
          : undefined,
        handle: productData.handle,
      });
    }
  }, [productData?.id, productData?.title, productData?.thumbnail, productData?.handle, addViewedProduct]);

  // Get bought together suggestions
  const boughtTogetherSuggestions = useMemo(() =>
    getBoughtTogetherSuggestions(productData?.id || "", 5),
    [productData?.id]
  );

  // Memoize bought together products for 3 items
  const boughtTogetherFor3 = useMemo(() =>
    getBoughtTogetherSuggestions(productData?.id || "", 3),
    [productData?.id]
  );

  // Calculate average rating and review count
  const averageRating = useMemo(() => calculateAverageRating(MOCK_REVIEWS), []);
  const reviewCount = MOCK_REVIEWS.length;

  const handleAddToCart = useCallback(async (data: any) => {
    setIsLoading(true);
    try {
      // Save product to cart (localStorage)
      const currentCart = JSON.parse(localStorage.getItem('cart_items') || '[]');

      // Check if product already exists in cart
      const existingItem = currentCart.find((item: any) => item.id === productData?.id);

      if (existingItem) {
        // If exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // If not exists, add new
        currentCart.push({
          id: productData?.id,
          title: productData?.title,
          thumbnail: productData?.thumbnail,
          quantity: 1,
          price: productData?.variants?.[0]?.calculated_price?.calculated_amount || 0,
        });
      }

      // Save back to localStorage
      localStorage.setItem('cart_items', JSON.stringify(currentCart));
      console.log("Updated cart:", currentCart);

      // Save to purchased products list to allow review
      if (productData?.id) {
        const purchased = JSON.parse(localStorage.getItem('purchased_products') || '[]');
        if (!purchased.includes(productData.id)) {
          purchased.push(productData.id);
          localStorage.setItem('purchased_products', JSON.stringify(purchased));
        }
      }

      // Dispatch event for cart page to update
      window.dispatchEvent(new CustomEvent('cart:updated', { detail: { success: true, cart: currentCart } }));
      // TODO: Show success toast or redirect to cart page
    } catch (error) {
      console.error("Mock add to cart error:", error);
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  }, [productData?.id]);

  if (!router.isReady) return <div className="p-20 text-center font-sans">Loading...</div>;
  if (!productData) return <div className="p-20 text-center font-sans">Product Not Found</div>;

  return (
    <div>
      {/* Mobile layout */}
      <div className="md:hidden">
        <ImageViewer
          productType={detectProductType(productData)}
          product={productData}
          spots={productData.images as any}
          floorPlanImage={(productData as any)?.floorPlanImage || ""}
          floorPlan3DImage={(productData as any)?.floorPlan3DImage || ""}
          reportPages={(productData as any)?.reportPages}
          reportTitle={(productData as any)?.title}
          reportRating={(productData as any)?.rating}
          reportViews={(productData as any)?.views}
          reportDownloads={(productData as any)?.downloads}
          reportPrice={(productData as any)?.price}
          customDesign={customDesign}
          customTemplate={customTemplate}
          customElements={customElements}
        />
        <Detail
          product={productData}
          cart={[cart]}
          boughtTogetherSelections={boughtTogetherSelections}
          boughtTogetherProducts={boughtTogetherSuggestions}
          rating={averageRating}
          reviewCount={reviewCount}
          views={(productData as any)?.views}
          downloads={(productData as any)?.downloads}
          onCustomizationApply={handleCustomizationApply}
          addToCart={{
            mutate: () => { },
            isLoading: false
          }}
          createCart={{
            mutate: () => { },
            isLoading: false
          }}
        />
        <Reviews
          productId={productData?.id}
          star={4.8}
          date={'11/2/2025'}
          canReview={hasPurchased}
        />
        <FAQ />
        <YouMightLoveThese
          currentProduct={currentProductWithPrice}
          allProducts={productsWithPrice}
          title="You Might Love These"
        />
        <ExploreRelatedSearches
          currentProduct={productData}
          title="Explore related searches"
        />
        {/* Only show review form if product has been purchased */}

        {/* Fix TypeScript error: add fallback || [] */}
        {(productData?.product_builder?.complementary_products?.length ?? 0) > 0 && (
          <CarouselProductList products={productData?.product_builder?.complementary_products || []} />
        )}
        <BoughtTogether
          currentProduct={productData as any}
          products={boughtTogetherFor3 as any}
          onAddSelectedToCart={handleAddToCart}
          addToCart={{ mutate: () => { }, isLoading: false }}
          createCart={{ mutate: () => { }, isLoading: false }}
        />
        <Description description={productData?.description || ''} />
      </div>

      {/* Desktop layout - Determine product type based on images */}
      {(() => {
        const productType = detectProductType(productData);
        return (
          <div className="hidden md:grid md:grid-cols-3 md:px-2 xl:max-w-7xl xl:mx-auto xl:gap-4 xl:p-6">
            <div className="flex flex-col gap-3 col-span-2 sticky top-0 h-fit">
              {/* Image Viewer - Thay đổi theo loại sản phẩm (home = 360°, fashion = carousel, report = multi-page) */}
              <ImageViewer
                productType={productType}
                product={productData}
                spots={productData.images as any}
                floorPlanImage={(productData as any)?.floorPlanImage || ""}
                floorPlan3DImage={(productData as any)?.floorPlan3DImage || ""}
                reportPages={(productData as any)?.reportPages}
                reportTitle={(productData as any)?.title}
                reportRating={(productData as any)?.rating}
                reportViews={(productData as any)?.views}
                reportDownloads={(productData as any)?.downloads}
                reportPrice={(productData as any)?.price}
                customDesign={customDesign}
                customTemplate={customTemplate}
                customElements={customElements}
              />
              <BoughtTogether
                currentProduct={productData as any}
                products={boughtTogetherFor3 as any}
                onAddSelectedToCart={handleAddToCart}
                addToCart={{ mutate: () => { }, isLoading: false }}
                createCart={{ mutate: () => { }, isLoading: false }}
              />
              {(productData?.product_builder?.complementary_products?.length ?? 0) > 0 && (
                <CarouselProductList products={productData?.product_builder?.complementary_products || []} />
              )}
              {/* Only show review form if product has been purchased */}
              <Reviews
                productId={productData?.id}
                star={4.8}
                date={'11/2/2025'}
                canReview={hasPurchased}
              />
              <YouMightLoveThese
                currentProduct={currentProductWithPrice}
                allProducts={productsWithPrice}
                title="You Might Love These"
              />
              <ExploreRelatedSearches
                currentProduct={productData}
                title="Explore related searches"
              />
              <Description description={productData?.description || ''} />
            </div>
            <div className="flex flex-col gap-3">
              <Detail
                product={productData}
                cart={[cart]}
                boughtTogetherSelections={boughtTogetherSelections}
                boughtTogetherProducts={boughtTogetherSuggestions}
                rating={averageRating}
                reviewCount={reviewCount}
                views={(productData as any)?.views}
                downloads={(productData as any)?.downloads}
                onCustomizationApply={handleCustomizationApply}
                addToCart={{
                  mutate: () => { },
                  isLoading: false
                }}
                createCart={{
                  mutate: () => { },
                  isLoading: false
                }}
              />
              <FAQ />
              {/* Sticky mini cart (desktop only) */}
              <div className="bg-[#F3F3F5] items-center gap-3 h-32 rounded-xl sticky overflow-hidden shadow-sm border border-gray-200 flex" style={{ top: '180px' }}>
                <Image
                  src={productData?.thumbnail || productData?.images?.[0]?.url || "/assets/placeholder.png"}
                  alt={productData?.title || "Product"}
                  width={200} height={200}
                  className="h-full w-28 object-cover rounded-l-xl flex-shrink-0"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = "/assets/placeholder.png"; }}
                />
                <div className="flex flex-col gap-1.5 w-full pr-3">
                  <h3 className="font-semibold text-sm line-clamp-1 text-gray-800">{productData?.title}</h3>
                  <div className="flex gap-0.5 items-center">
                    <span className="underline text-xs font-bold mr-1">{averageRating.toFixed(1)}</span>
                    {[...Array(5)].map((_, i) => {
                      const index = i + 1;
                      return (
                        <span key={index} className="text-yellow-400 text-sm">
                          {averageRating >= index ? <BsStarFill /> : averageRating >= index - 0.5 ? <BsStarHalf /> : <BsStar />}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-green-700">${((productData?.variants?.[0]?.calculated_price?.calculated_amount ?? 0) / 100 || 14.95).toFixed(2)}</span>
                    <span className="line-through text-gray-400 text-xs">${((productData?.variants?.[0]?.calculated_price?.original_amount ?? 0) / 100 || 29.90).toFixed(2)}</span>
                  </div>
                  <Button
                    className="w-full text-xs h-8 bg-[#C72C37] hover:bg-[#a82530] text-white rounded-lg"
                    onClick={() => handleAddToCart({})}
                    disabled={false}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

Products.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const { slug } = router.query;
  const productData = getMockProductByHandle(slug as string) || getMockProductByHandle("custom-comfort-colors-tee");

  return (
    <PrimaryLayout seo={{ title: 'Product', canonical: '/product' }}>
      {page}
      <QuickGiftFinder />
      <SaleProduct TopSale={productSalesData as any} title={priceList?.price_lists?.[0]?.title as string} />
      {productData && (
        <Suspense fallback={null}>
          <MoreFromThisShop
            currentProduct={{ id: productData?.id }}
            shopId={productData?.sellerId || ''}
            shopName={productData?.title || 'This Shop'}
            seller={{ id: productData?.sellerId || '', name: productData?.title }}
            limit={4}
          />
        </Suspense>
      )}
    </PrimaryLayout>
  );
};

export default Products;