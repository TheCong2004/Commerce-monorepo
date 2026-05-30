"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import FadeIn from '@/shared/components/FadeIn';
import { Card, CardContent } from "@/shared/ui/card";
import { useProductData } from '@/shared/hooks';
import { getProductPrices } from '@/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/shared/ui/carousel";
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TopPick = ({ product, title }: { product?: any[], title?: string }) => {
  // Fetch top-pick products using Hook
  const { products: fetchedProducts } = useProductData('top-pick');
  const displayProducts = (product && product.length > 0) ? product : fetchedProducts;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });
  }, [api]);

  if (!displayProducts || displayProducts.length === 0) return null;

  // Take up to 13 items: 1 featured + 12 rest (for desktop carousel)
  const featured = displayProducts[0];
  const rest = displayProducts.slice(1, 13);
  const featuredPrices = getProductPrices(featured);

  // Group rest into columns of 2 for desktop
  const columns: any[][] = [];
  for (let i = 0; i < rest.length; i += 2) {
    columns.push(rest.slice(i, i + 2));
  }

  return (
    <div className='font-Inter w-full'>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[24px] font-semibold text-gray-900 tracking-tight">
          {title || "Top Picks For You"}
        </h1>
      </div>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-5 lg:gap-6">

        {/* Featured Big Product (Left Side) */}
        <div className="lg:col-span-2 lg:h-full">
          <Link href={`/product/${featured.handle}`} className="group block lg:h-full">
            <Card className="overflow-hidden border border-black/5 hover:border-black/10 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl lg:h-full lg:flex lg:flex-col bg-white">
              {/* Responsive height instead of aspect ratio to prevent blow-up on tablets */}
              <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-0 lg:flex-grow shrink-0 overflow-hidden bg-gray-50">
                <Image
                  src={featured.thumbnail || '/placeholder.png'}
                  alt={featured.title || 'Product Image'}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
              </div>
              <CardContent className="p-6 bg-white shrink-0">
                <h3 className="font-Inter text-base sm:text-lg text-gray-700 font-semibold line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors">
                  {featured.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[20px] font-Inter font-semibold text-gray-900">
                    ${featuredPrices.salePrice}
                  </span>
                  {featuredPrices.hasDiscount && (
                    <span className="text-gray-400 line-through text-sm">
                      ${featuredPrices.originalPrice}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Remaining Products (Right Side) */}
        <div className="lg:col-span-3 lg:h-full">
          {/* Mobile/Tablet: Carousel layout */}
          <div className="lg:hidden">
            <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-2 sm:-ml-4">
                {rest.map((item: any, index: number) => {
                  const itemPrices = getProductPrices(item);
                  return (
                    <CarouselItem key={index} className="pl-2 sm:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3">
                        <Link href={`/product/${item.handle}`} className="group block">
                          <Card className="border-none shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden border border-black/5">
                            {/* Responsive height for small cards */}
                            <div className="relative w-full h-[150px] sm:h-[180px] md:h-[200px] shrink-0 bg-gray-50 overflow-hidden">
                              <Image
                                src={item.thumbnail || '/placeholder.png'}
                                alt={item.title || 'Product Image'}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                              />
                            </div>
                            <CardContent className="p-3 flex flex-col gap-1 bg-white">
                              <p className="text-[14px] font-semibold font-Inter text-gray-700 line-clamp-1 group-hover:text-orange-500 transition-colors">
                                {item.title}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-[16px] font-Inter font-semibold text-gray-900">
                                  ${itemPrices.salePrice}
                                </span>
                                {itemPrices.hasDiscount && (
                                  <span className="text-[14px] font-Inter text-gray-400 line-through">
                                    ${itemPrices.originalPrice}
                                  </span>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              {/* Mobile Pagination (Dots + Arrows) */}
              {count > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-6">
                      <button
                          onClick={() => api?.scrollPrev()}
                          disabled={!canScrollPrev}
                          className="text-gray-600 disabled:opacity-30 transition-opacity p-1 bg-black/5 hover:bg-black/10 rounded-full"
                          aria-label="Previous slide"
                      >
                          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                      </button>

                      <div className="flex items-center gap-1.5 overflow-x-auto max-w-[180px] no-scrollbar py-1">
                          {Array.from({ length: count }).map((_, index) => (
                              <button
                                  key={index}
                                  onClick={() => api?.scrollTo(index)}
                                  className={cn(
                                      "h-1.5 rounded-full transition-all duration-300",
                                      current === index
                                          ? "bg-gray-800 w-5"
                                          : "bg-gray-300 w-1.5 hover:bg-gray-400"
                                  )}
                                  aria-label={`Go to slide ${index + 1}`}
                              />
                          ))}
                      </div>

                      <button
                          onClick={() => api?.scrollNext()}
                          disabled={!canScrollNext}
                          className="text-gray-600 disabled:opacity-30 transition-opacity p-1 bg-black/5 hover:bg-black/10 rounded-full"
                          aria-label="Next slide"
                      >
                          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                      </button>
                  </div>
              )}
            </Carousel>
          </div>

          {/* Desktop: Carousel layout of columns */}
          <div className="hidden lg:block relative h-full">
            <Carousel opts={{ align: "start" }} className="w-full h-full">
              <CarouselContent className="-ml-4 h-full">
                {columns.map((column: any[], colIndex: number) => (
                  <CarouselItem key={colIndex} className="pl-4 basis-1/3 h-full">
                    <div className="flex flex-col gap-4 h-full justify-between">
                      {column.map((item: any, itemIndex: number) => {
                        const itemPrices = getProductPrices(item);
                        return (
                          <FadeIn key={item.id || itemIndex} delay={itemIndex * 0.05} direction="up" className="h-[calc(50%-8px)]">
                            <Link href={`/product/${item.handle}`} className="group block h-full">
                              <Card className="border border-black/5 hover:border-black/10 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden h-full flex flex-col justify-between bg-white">
                                {/* Fixed aspect ratio for small card images to define container height */}
                                <div className="relative w-full aspect-square bg-gray-50 overflow-hidden shrink-0" style={{ aspectRatio: '1/1' }}>
                                  <Image
                                    src={item.thumbnail || '/placeholder.png'}
                                    alt={item.title || 'Product Image'}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    sizes="20vw"
                                  />
                                </div>
                                <CardContent className="p-3 flex flex-col gap-1 bg-white flex-grow justify-center">
                                  <p className="text-[14px] font-semibold font-Inter text-gray-700 line-clamp-1 group-hover:text-orange-500 transition-colors">
                                    {item.title}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[16px] font-Inter font-semibold text-gray-900">
                                      ${itemPrices.salePrice}
                                    </span>
                                    {itemPrices.hasDiscount && (
                                      <span className="text-[14px] font-Inter text-gray-400 line-through">
                                        ${itemPrices.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          </FadeIn>
                        );
                      })}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-md border border-gray-200 disabled:opacity-0 pointer-events-none transition-opacity duration-300" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-md border border-gray-200 disabled:opacity-0 pointer-events-none transition-opacity duration-300" />
            </Carousel>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopPick;