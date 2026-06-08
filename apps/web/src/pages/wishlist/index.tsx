"use client";

import { PrimaryLayout } from "@/layouts";
import { getProducts } from "@/lib/productApi";
import RelatedProducts from "@/shared/components/RelatedProducts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const WishListPage = () => {
  const [wishlist, setWishList] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const storedWishlist = localStorage.getItem("wishlist");
    if (!storedWishlist) return;

    try {
      const parsed = JSON.parse(storedWishlist);
      if (Array.isArray(parsed)) setWishList(parsed);
    } catch (err) {
      console.error("Failed to parse wishlist", err);
    }
  }, []);

  useEffect(() => {
    if (!isClient || wishlist.length === 0) {
      setProducts([]);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    getProducts({ limit: 100 })
      .then((items) => {
        if (cancelled) return;
        const wishlistSet = new Set(wishlist);
        setProducts(items.filter((item: any) => wishlistSet.has(item.id) || wishlistSet.has(item.handle)));
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setProducts([]);
        setError(err?.message || "Failed to load wishlist");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isClient, wishlist]);

  if (!isClient) return null;

  return (
    <div className="py-6 lg:px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-medium px-4 lg:px-0">Wishlist</h1>

      {wishlist.length > 0 && isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500" />
        </div>
      ) : error ? (
        <div className="my-8 rounded-lg border border-red-100 bg-red-50 p-6 text-center text-red-700">
          {error}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-8 px-4 lg:px-0">
          {products.map((item: any) => {
            const originalPrice = item?.variants?.[0]?.calculated_price?.original_amount;
            const calculatedPrice = item?.variants?.[0]?.calculated_price?.calculated_amount;
            const discountPercent =
              originalPrice && calculatedPrice && originalPrice > calculatedPrice
                ? Math.round(((originalPrice - calculatedPrice) / originalPrice) * 100)
                : 0;

            return (
              <Link
                href={`/product/${item?.handle || item?.id}`}
                className="group col-span-1 flex flex-col rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
                key={item?.id || item?.handle}
              >
                <div className="relative w-full h-40 lg:h-48 bg-gray-50">
                  <Image
                    src={(item?.thumbnail as string) || "/assets/placeholder.png"}
                    alt={item?.title || "Product"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-3 bg-white flex flex-col flex-1">
                  <h2 className="text-sm font-medium mb-2 line-clamp-2 flex-1">{item?.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <p className="text-base font-bold text-red-600">${calculatedPrice || 0}</p>
                    {discountPercent > 0 && (
                      <div className="flex gap-2 items-center">
                        <span className="text-xs font-medium text-gray-400 line-through">${originalPrice}</span>
                        <span className="px-1.5 py-0.5 text-[10px] text-orange-600 font-bold bg-orange-100 rounded-full">
                          -{discountPercent}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full p-3 bg-blue-500 text-white text-center font-semibold text-sm group-hover:bg-blue-600 transition-colors mt-auto">
                  Customize Now
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-16">
          <Image src="/assets/wishlist-empty.gif" alt="wishlist" width={300} height={300} className="w-64 h-64 object-cover" />
          <p className="font-medium text-gray-600">Your wishlist is empty.</p>
          <Link href="/" className="mt-2 border border-transparent bg-orange-500 hover:bg-orange-600 transition-colors text-white font-bold rounded-full px-8 py-3">
            Continue Shopping
          </Link>
        </div>
      )}

      <div className="mt-8">
        <RelatedProducts currentProductId={wishlist[0] || ""} />
      </div>
    </div>
  );
};

export default WishListPage;

WishListPage.getLayout = function getLayout(page: any) {
  return <PrimaryLayout seo={{ title: "Wishlist", canonical: "/wishlist" }}>{page}</PrimaryLayout>;
};
