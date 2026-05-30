"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/shared/components/FadeIn';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/shared/ui/carousel";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useProductData } from '@/shared/hooks';
import { getProductPrices } from '@/utils';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SaleProduct = ({ TopSale, title }: { TopSale?: any[], title: string }) => {
    // Fetch sales products using Hook
    const { products: salesProducts } = useProductData('sales');
    const products = (TopSale && TopSale.length > 0) ? TopSale : salesProducts;

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

    return (
        <div className='w-full h-full md:my-10'>
            <div className='bg-[#F77C32] lg:rounded-2xl py-4 px-3 xl:px-10 shadow-sm border border-black/5'>

                {/* Header: title + countdown */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                         <DotLottieReact
                            src="/animations/advertising.lottie"
                            loop
                            autoplay
                            style={{ width: 60, height: 60 }}
                        />
                        <h1 className='text-lg sm:text-2xl md:text-3xl font-semibold font-Inter text-white'>
                            Today&apos;s Big Deals
                        </h1>
                    </div>

                    {/* Countdown */}
                    <div className="flex items-center gap-1 text-white text-xs font-Inter">
                        <span className="hidden sm:inline">Fresh deals in</span>
                        <span className="bg-black text-white font-semibold text-sm px-2 py-1 rounded">01</span>
                        <span className="font-semibold">:</span>
                        <span className="bg-black text-white font-semibold text-sm px-2 py-1 rounded">42</span>
                        <span className="font-semibold">:</span>
                        <span className="bg-black text-white font-semibold text-sm px-2 py-1 rounded">01</span>
                    </div>
                </div>

                {/* Mobile-first Swipeable Carousel */}
                <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full relative">
                    <CarouselContent className='-ml-2 sm:-ml-4'>
                        {products?.map((product, index) => {
                            const { salePrice, originalPrice, discount, hasDiscount } = getProductPrices(product);

                            return (
                                <CarouselItem key={index} className="pl-2 sm:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                        <Link
                                            href={`/product/${product.handle}`}
                                            className='group bg-white rounded-xl overflow-hidden flex flex-col h-auto hover:shadow-md transition-shadow duration-300 border border-black/5'
                                        >
                                            {/* Image container using aspect ratio instead of fixed height */}
                                            <div className="relative w-full aspect-square shrink-0 overflow-hidden bg-gray-50" style={{ aspectRatio: '1/1' }}>
                                                <Image
                                                    src={product.thumbnail || '/placeholder.png'}
                                                    alt={product.title || 'Product Image'}
                                                    fill
                                                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                />
                                            </div>

                                            {/* Info */}
                                            <div className='p-3 sm:p-4 flex flex-col flex-grow'>
                                                <h2 className='text-xs sm:text-sm font-semibold font-Inter text-gray-700 line-clamp-2 leading-snug min-h-[2.5rem] mb-2 group-hover:text-[#F77C32] transition-colors'>
                                                    {product.title}
                                                </h2>

                                                <div className='flex flex-wrap items-center gap-1.5 mb-3'>
                                                    <span className='text-sm sm:text-base font-semibold font-Inter text-gray-900'>
                                                        ${salePrice}
                                                    </span>
                                                    {hasDiscount && (
                                                        <>
                                                            <span className='text-[11px] sm:text-xs font-Inter text-gray-400 line-through'>
                                                                ${originalPrice}
                                                            </span>
                                                            <span className="bg-[#FFF4E5] text-[#FF8A00] text-[10px] sm:text-[11px] font-semibold font-Inter px-2 py-0.5 rounded-full">
                                                                {discount}% OFF
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                <div className="mt-auto">
                                                    <p className="text-[#22C55E] text-[11px] sm:text-xs font-Inter font-medium">
                                                        Sale ends in 00:17:17
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>

                    <CarouselPrevious className='hidden lg:flex -left-5 bg-white border-black/5 hover:bg-[#111111] hover:text-white transition-all shadow-md' />
                    <CarouselNext className='hidden lg:flex -right-5 bg-white border-black/5 hover:bg-[#111111] hover:text-white transition-all shadow-md' />
                    
                    {/* Mobile Pagination (Dots + Arrows) */}
                    {count > 1 && (
                        <div className="flex lg:hidden items-center justify-center gap-4 mt-6">
                            <button
                                onClick={() => api?.scrollPrev()}
                                disabled={!canScrollPrev}
                                className="text-white disabled:opacity-30 transition-opacity p-1 bg-black/10 hover:bg-black/20 rounded-full"
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
                                                ? "bg-white w-5"
                                                : "bg-white/40 w-1.5 hover:bg-white/60"
                                        )}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => api?.scrollNext()}
                                disabled={!canScrollNext}
                                className="text-white disabled:opacity-30 transition-opacity p-1 bg-black/10 hover:bg-black/20 rounded-full"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                            </button>
                        </div>
                    )}
                </Carousel>
            </div>
        </div>
    );
};