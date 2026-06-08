"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/productApi';
import { getProductPrices } from '@/utils';

export default function GraduationSection() {
  const [graduationProducts, setGraduationProducts] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    getProducts({ limit: 100 })
      .then((products) => {
        if (!cancelled) {
          setGraduationProducts(products.filter((p: any) => p.category === 'graduation' || p.handle?.includes('graduation')));
        }
      })
      .catch(() => {
        if (!cancelled) setGraduationProducts([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full py-4 sm:py-6 md:py-8 lg:py-10">
      {/* 2-Column Mobile, 5-Column Desktop Grid Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        
        {/* Premium Graduation Banner Card */}
        <div className="col-span-2 lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFFBF0] via-white to-[#FFF5E6] border border-orange-100 shadow-sm p-5 sm:p-6 flex flex-col justify-between min-h-[260px] h-full">
          
          {/* Background Decorative SVG Elements */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            {/* Confetti sparkle - Top Left */}
            <div className="absolute top-4 left-[25%] opacity-40">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 0L14.3 9.7L24 12L14.3 14.3L12 24L9.7 14.3L0 12L9.7 9.7Z" fill="#F77C32" />
              </svg>
            </div>
            
            {/* Confetti sparkle - Mid Right */}
            <div className="absolute top-1/3 right-[10%] opacity-35 animate-pulse">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 0L14.3 9.7L24 12L14.3 14.3L12 24L9.7 14.3L0 12L9.7 9.7Z" fill="#F5C040" />
              </svg>
            </div>

            {/* Graduation Cap decoration (floating in top right) */}
            <div className="absolute top-3 right-4 transform rotate-12 opacity-95 transition-transform hover:scale-110 duration-500">
              <svg width="55" height="55" viewBox="0 0 100 100" className="drop-shadow-sm">
                <path d="M50 15 L88 32 L50 49 L12 32 Z" fill="#1A1A1A" />
                <path d="M30 42 L30 52 C30 62, 70 62, 70 52 L70 42" fill="#2E2E2E" />
                <circle cx="50" cy="32" r="2" fill="#3A3A3A" />
                <path d="M50 32 L68 40 L68 56" stroke="#F5A623" strokeWidth="2" fill="none" />
                <circle cx="68" cy="58" r="3" fill="#F5A623" />
              </svg>
            </div>

            {/* Balloon / Ribbon graphics at the bottom right */}
            <div className="absolute bottom-[-10px] right-[-5px] transform -rotate-12 opacity-85">
              <svg width="75" height="95" viewBox="0 0 100 120" className="drop-shadow-lg">
                <defs>
                  <radialGradient id="balloon-grad-2" cx="40%" cy="30%" r="50%">
                    <stop offset="0%" stopColor="#FFF2B2" />
                    <stop offset="70%" stopColor="#F5B800" />
                    <stop offset="100%" stopColor="#D49000" />
                  </radialGradient>
                </defs>
                <ellipse cx="45" cy="50" rx="25" ry="32" fill="url(#balloon-grad-2)" />
                <polygon points="42,82 48,82 45,77" fill="#D49000" />
                <path d="M45,82 Q42,92 48,102" stroke="#D49000" strokeWidth="1" fill="none" />
                <path d="M55,75 Q65,85 58,110" stroke="#FF8A00" strokeWidth="1" fill="none" className="opacity-60" />
              </svg>
            </div>

            {/* Confetti circles */}
            <div className="absolute bottom-[35%] right-[20%] w-2 h-2 rounded-full bg-[#F5B800] opacity-50"></div>
            <div className="absolute bottom-[15%] left-[30%] w-3 h-3 rounded-full bg-[#FF8A00] opacity-40"></div>
          </div>

          {/* Banner Contents: End date, Heading, Description, CTA */}
          <div className="relative z-10 flex flex-col gap-3.5 items-start">
            {/* End Date Badge */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-gray-500 font-Inter">End on</span>
              <div className="flex items-center gap-1 px-2.5 py-0.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                <CalendarDays className="w-3.5 h-3.5 text-[#F77C32]" />
                <span>Jun 01 2026</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-Inter text-gray-900 tracking-tight leading-snug">
              Explore Graduation Season Collection
            </h2>

            {/* Description */}
            <p className="text-xs text-gray-600 font-Inter leading-relaxed max-w-md">
              Honor the Class of 2026! Discover personalized graduation gifts, custom senior shirts, and unique keepsakes to celebrate their big milestone. Shop now!
            </p>
          </div>

          {/* Action button */}
          <div className="relative z-10 mt-4">
            <Link
              href="/collection/graduation"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#F77C32] hover:bg-[#e06620] text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer w-fit"
            >
              <span>View more</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Product Cards mapped inline */}
        {graduationProducts.map((product) => {
          const { salePrice, originalPrice, discount, hasDiscount } = getProductPrices(product);

          return (
            <Link
              key={product.id}
              href={`/product/${product.handle}`}
              className="col-span-1 group bg-white rounded-xl overflow-hidden flex flex-col h-auto hover:shadow-md transition-shadow duration-300 border border-black/5"
            >
              {/* Product Image Wrapper */}
              <div 
                className="relative w-full aspect-square shrink-0 overflow-hidden bg-gray-50" 
                style={{ aspectRatio: '1/1' }}
              >
                <Image
                  src={product.thumbnail || '/placeholder.png'}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>

              {/* Product Information */}
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-xs sm:text-sm font-semibold font-Inter text-gray-800 line-clamp-2 leading-snug min-h-[2.5rem] mb-2 group-hover:text-[#F77C32] transition-colors">
                  {product.title}
                </h3>

                <div className="flex flex-wrap items-center gap-1.5 mt-auto">
                  <span className="text-sm sm:text-base font-bold font-Inter text-gray-900">
                    ${salePrice}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-[11px] sm:text-xs font-Inter text-gray-400 line-through">
                        ${originalPrice}
                      </span>
                      <span className="bg-[#FF5500] text-white text-[9px] sm:text-[10px] font-bold font-Inter px-2 py-0.5 rounded-full">
                        {discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
