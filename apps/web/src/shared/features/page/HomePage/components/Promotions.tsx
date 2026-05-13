"use client"
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/shared/components/FadeIn';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/ui/carousel"
import { MOCK_PRODUCTS_DATABASE } from '@/lib/mockProduct';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export const SaleProduct = ({ TopSale, title }: { TopSale?: any[], title: string }) => {
    // Sử dụng TopSale prop nếu có, nếu không thì dùng MOCK_PRODUCTS_DATABASE
    const products = TopSale || MOCK_PRODUCTS_DATABASE;
    const countArrays = Array.from({ length: Math.ceil(products?.length / 4) }, (_, i) => i);

    return (
        <div className='w-full mx-auto h-full lg:px-2 md:my-10'>
            <div className='bg-[#F77C32] lg:rounded-2xl py-4 px-3 xl:px-10 shadow-sm border border-black/5'>

                {/* Header: tiêu đề + countdown + View all */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                         <DotLottieReact
                            src="/animations/advertising.lottie"
                            loop
                            autoplay
                            style={{ width: 60, height: 60 }}
                        />
                        <h1 className='text-lg sm:text-2xl md:text-3xl font-semibold font-Inter text-white'>
                            Today's Big Deals
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

                <Carousel opts={{ align: "start" }} className="w-full relative">
                    <CarouselContent className='-ml-2 md:-ml-4'>
                        {countArrays.map((_, groupIndex) => (
                            <CarouselItem key={groupIndex} className="basis-full pl-2 md:pl-4">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
                                    {products?.slice(groupIndex * 4, groupIndex * 4 + 4)?.map((product, index) => {
                                        const originalPrice = (product.variants?.[0].calculated_price?.original_amount / 100).toFixed(2);
                                        const salePrice = (product.variants?.[0].calculated_price?.calculated_amount / 100).toFixed(2);
                                        const discount = Math.round(((product.variants?.[0].calculated_price?.original_amount - product.variants?.[0].calculated_price?.calculated_amount) / product.variants?.[0].calculated_price?.original_amount) * 100);

                                        return (
                                            <FadeIn key={index} delay={index * 0.05} direction="up">
                                                <Link
                                                    href={`/product/${product.handle}`}
                                                    key={index}
                                                    className='group bg-white rounded-xl overflow-hidden flex flex-col h-full'
                                                >
                                                    {/* Ảnh */}
                                                    <div className="relative w-full aspect-square h-[175px] sm:h-[240px] lg:h-[290px] overflow-hidden">
                                                        <Image
                                                            src={product.thumbnail}
                                                            alt={product.title}
                                                            fill
                                                            className='object-cover transition-transform duration-500 group-hover:scale-125'
                                                        />
                                                    </div>

                                                    {/* Info */}
                                                    <div className=' sm:p-3 flex flex-col flex-grow'>
                                                        <h2 className='text-14px sm:text-sm font-semibold font-Inter text-gray-600 line-clamp-2 leading-tight min-h-[1.5rem]'>
                                                            {product.title}
                                                        </h2>

                                                        <div className='flex flex-wrap items-center gap-2'>
                                                            <span className='text-base sm:text-[16px] font-semibold font-Inter text-[#111111]'>
                                                                ${salePrice}
                                                            </span>
                                                            {discount > 0 && (
                                                                <>
                                                                    <span className='text-xs font-Inter text-gray-400 line-through'>
                                                                        ${originalPrice}
                                                                    </span>
                                                                    <span className="bg-[#FFF4E5] text-[#FF8A00] text-sm font-semibold font-Inter px-2  rounded-full">
                                                                        {discount}% OFF
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>

                                                        <div className="mt-auto">
                                                            <p className="text-[#22C55E] text-[11px] sm:text-xs font-Inter">
                                                                Sale ends in 00:17:17
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </FadeIn>
                                        );
                                    })}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className='hidden lg:flex -left-5 bg-white border-black/5 hover:bg-[#111111] hover:text-white transition-all shadow-md' />
                    <CarouselNext className='hidden lg:flex -right-5 bg-white border-black/5 hover:bg-[#111111] hover:text-white transition-all shadow-md' />
                </Carousel>
            </div>
        </div>
    )
}