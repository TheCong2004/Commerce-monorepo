"use client";

import { getProducts } from '@/lib/productApi';
import { getProductPrices } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel';
import { Card, CardContent } from '@/shared/ui/card';
import { Dialog, DialogContent } from '@/shared/ui/dialog';

type ProductVideoProps = {
  url?: string;
  product_id?: string;
};

const ProductVideo = ({ productId }: { productId?: string }) => {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!productId) return;
    let cancelled = false;

    getProducts({ limit: 100 })
      .then((products) => {
        if (!cancelled) setProduct(products.find((item: any) => item.id === productId || item.handle === productId) || null);
      })
      .catch(() => {
        if (!cancelled) setProduct(null);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (!product) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-4 grid-rows-2 gap-2 text-white items-center h-10">
        <div className="col-span-1 row-span-2 w-10 h-10 bg-gray-700 animate-pulse rounded-md mx-auto" />
        <div className="col-span-2 md:col-span-3 h-3 bg-gray-700 animate-pulse rounded" />
        <div className="col-span-2 md:col-span-3 h-3 bg-gray-700 animate-pulse rounded w-12" />
      </div>
    );
  }

  const prices = getProductPrices(product);

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 grid-rows-2 gap-2 text-white items-stretch">
      <Image
        width={50}
        height={50}
        src={product.thumbnail || '/placeholder.png'}
        alt={product.title || 'Product'}
        className="col-span-1 row-span-2 object-cover w-10 h-10 rounded-md mx-auto"
      />
      <p className="font-semibold text-xs sm:text-sm line-clamp-2 truncate col-span-2 md:col-span-3 row-span-1 leading-tight">{product.title}</p>
      <span className="font-semibold text-xs sm:text-sm line-clamp-2 truncate col-span-2 md:col-span-3 row-span-1 text-orange-400">${prices.salePrice}</span>
    </div>
  );
};

export const Promotions = ({ video }: { video: any }) => {
  const { t } = useTranslation('home');
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<ProductVideoProps>({});
  const videoList = video?.productVideo ?? [];

  const handleBannerClick = (videoUrl: any) => {
    setSelectedVideo(videoUrl);
    setOpen(true);
  };

  const getProductSlug = (productId?: string) => productId || '';

  return (
    <div className="max-w-7xl mx-auto px-2 py-2 md:my-4 lg:my-6">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <Image src="/assets/logo.webp" alt="logo" width={96} height={96} className="w-24" />
      </div>

      <Carousel opts={{ align: "start", containScroll: "trimSnaps", dragFree: false, loop: true }} className="w-full relative h-40 md:h-80 lg:h-80">
        <CarouselContent className="-ml-1.5 sm:-ml-2 md:-ml-3 h-full">
          {videoList.map((videoUrl: any, index: number) => (
            <CarouselItem
              key={videoUrl.url || index}
              className="basis-2/5 md:basis-1/3 lg:basis-1/5 pl-1.5 sm:pl-2 md:pl-3 cursor-pointer h-full"
              onClick={() => handleBannerClick(videoUrl)}
            >
              <Card className="h-full overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl border-2 border-gray-100 hover:border-blue-300">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4]">
                    <video src={videoUrl.url} controls={false} muted loop autoPlay playsInline className="w-full h-full object-cover" />
                    <Link href={`/product/${getProductSlug(videoUrl.product_id)}`} className="w-full absolute bottom-1 bg-transparent text-white text-sm px-2 py-1 rounded-md z-30">
                      <ProductVideo productId={videoUrl.product_id} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex left-2" />
        <CarouselNext className="hidden lg:flex right-2" />
      </Carousel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm bg-transparent shadow-none border-none h-[75vh]">
          <div className="w-full h-full relative overflow-hidden rounded-lg">
            {selectedVideo.url && (
              <>
                <video src={selectedVideo.url} autoPlay loop playsInline className="absolute top-0 left-0 w-full h-full object-cover" />
                <div className="absolute bottom-4 grid grid-cols-6 gap-3 w-full px-2">
                  <div className="col-span-4">
                    <ProductVideo productId={selectedVideo.product_id} />
                  </div>
                  <Link href={`/product/${getProductSlug(selectedVideo.product_id)}`} className="col-span-2 flex items-center justify-center border rounded-md bg-orange-500 text-white">
                    Buy Now
                  </Link>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
