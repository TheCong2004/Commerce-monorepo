"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const carouselImages = [
  'https://res.cloudinary.com/dm1wqczhm/image/upload/w_1200,q_80,c_limit/v1774876250/homepage-3-b5afe1433bf414d14c788e2a128a211f_1_nwmcg3.jpg',
  'https://res.cloudinary.com/dm1wqczhm/image/upload/w_1200,q_80,c_limit/v1774875809/banner-3-b11fbb0d4d4b99ee571bfaf6e54759e8_lrrruw.png',
];

export const Hero = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: false })
  );

  return (
    <div className="my-4 lg:my-6">
      {/* Grid: 2/3 and 1/3 split using standard grid-cols-3 on desktop (lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">

        {/* --- MAIN CAROUSEL (Left Banner) --- */}
        <div className="lg:col-span-2">
          <Carousel
            className="w-full"
            plugins={[plugin.current]}
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent>
              {carouselImages.map((src, i) => (
                <CarouselItem key={i} className="pl-2 md:pl-4">
                  {/* Aspect ratio co giãn tự động theo tỷ lệ Printerval (781 x 273) */}
                  <div className="relative w-full aspect-[2.1/1] sm:aspect-[2.4/1] lg:aspect-[781/273] rounded-xl lg:rounded-2xl overflow-hidden shadow-sm isolate">
                    <Image
                      src={src}
                      fill
                      alt={`carousel ${i + 1}`}
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      priority={i === 0}
                      fetchPriority={i === 0 ? 'high' : 'low'}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 70vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* --- PRODUCT CAROUSEL (Right Banner) --- */}
        <div className="hidden lg:block lg:col-span-1 w-full h-full">
          <Carousel className="w-full h-full" opts={{ align: "start", loop: true }}>
            <CarouselContent className="h-full">
              {[
                { id: 1, handle: 'custom-tshirt-1', image: 'https://res.cloudinary.com/dm1wqczhm/image/upload/v1774876745/hog_p3gudm.png', title: 'Personalized presents that make memories' },
                { id: 2, handle: 'custom-mug-1', image: 'https://placehold.co/290x290/ff7a00/white?text=Product+2', title: 'Premium custom products for you' },
                { id: 3, handle: 'custom-hoodie-1', image: 'https://placehold.co/290x290/5542be/white?text=Product+3', title: 'Unique gifts that stand out' },
                { id: 4, handle: 'custom-poster-1', image: 'https://placehold.co/290x290/ffd700/white?text=Product+4', title: 'Create your own masterpiece' },
              ].map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full h-full">
                  <Link href={`/product/${product.handle}`} className="group block h-full">
                    <div className="relative w-full h-full shadow-sm rounded-xl lg:rounded-2xl overflow-hidden cursor-pointer bg-white border border-gray-100 lg:border-none">

                      {/* Image full coverage */}
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <Image
                          src={product.image}
                          fill
                          alt={product.title}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 30vw"
                        />
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 xl:p-6">
                        {/* Badge */}
                        <div className="flex items-center text-[10px] md:text-xs gap-1 mb-2 backdrop-blur-sm bg-white/20 text-yellow-400 p-1 px-2.5 rounded-full max-w-fit">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span className="truncate font-Inter">Featured</span>
                        </div>
                        {/* Title */}
                        <p className="font-semibold font-Inter text-white text-sm md:text-base xl:text-lg leading-snug line-clamp-2">
                          {product.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

      </div>
    </div>
  );
};