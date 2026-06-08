"use client"
import { useRouter } from 'next/router';
import { getProducts } from '@/lib/productApi';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { ShopHeader, ShopFeaturedProducts, ShopAboutArtist, ShopAllProducts, ShopCustomerReviews, ShopNeverMissDrop, ShopNewsletter } from '@/packages/shops/components';
import { Header } from '@/shared/layout/header/Header';
import Recently from '@/packages/browsing-history/components/recently';
import { Footer } from '@/shared/layout/footer/Footer';
import { Toaster } from '@/shared/ui/sonner';

export default function ShopPage() {
    const router = useRouter();
    const { slug } = router.query;
    const [sellerProducts, setSellerProducts] = useState<any[]>([]);
    const [seller, setSeller] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        let cancelled = false;

        setIsLoading(true);
        getProducts({ limit: 100 })
            .then((products) => {
                if (cancelled) return;
                const slugValue = String(slug);
                const shopProducts = products.filter((product: any) => {
                    const metadata = product.metadata as any;
                    const sellerName = product.seller?.name || metadata?.seller?.name || metadata?.sellerId;
                    return sellerName === slugValue || product.sellerId === slugValue || metadata?.sellerId === slugValue;
                });

                const firstSeller = (shopProducts[0]?.metadata as any)?.seller || shopProducts[0]?.seller || {
                    id: slugValue,
                    name: slugValue,
                    avatar: '',
                    followerCount: 0,
                    favoriteCount: 0,
                    rating: 4.8,
                };

                setSeller(firstSeller);
                setSellerProducts(shopProducts);
            })
            .catch(() => {
                if (!cancelled) {
                    setSeller(null);
                    setSellerProducts([]);
                }
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [slug]);

    if (!slug || isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!seller || sellerProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <h1 className="text-2xl font-bold">Shop not found</h1>
                <Link href="/">
                    <Button>Back to home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <Header />
            <ShopHeader
                seller={seller}
                productCount={sellerProducts.length}
                onFollowClick={() => console.log('Follow clicked')}
                onShareClick={() => console.log('Share clicked')}
            />

            {/* Featured Products Section */}
            <ShopFeaturedProducts
                products={sellerProducts.map((product) => ({
                    id: product.id,
                    title: product.title,
                    handle: product.handle,
                    thumbnail: product.thumbnail,
                    price: product.variants?.[0]?.calculated_price?.calculated_amount || 0,
                    originalPrice: product.variants?.[0]?.calculated_price?.original_amount,
                }))}
                shopName={seller.name}
            />

            {/* About Artist Section */}
            <ShopAboutArtist
                seller={seller}
                description={`This artist is part of our global creative community, bringing unique ideas to life through original designs. Each piece reflects a blend of creativity, personality, and attention to detail — crafted to help you express yourself in your own way.

From everyday essentials to standout statements, their work is made to inspire, connect, and add a personal touch to your style.`}
            />

            {/* All Products Section */}
            <ShopAllProducts
                products={sellerProducts.map((product) => ({
                    id: product.id,
                    title: product.title,
                    handle: product.handle,
                    thumbnail: product.thumbnail,
                    price: product.variants?.[0]?.calculated_price?.calculated_amount || 0,
                    originalPrice: product.variants?.[0]?.calculated_price?.original_amount,
                    category: product.category || 't-shirt',
                    subCategory: product.subCategory,
                }))}
            />

            {/* Customer Reviews Section */}
            <ShopCustomerReviews />

            {/* Never Miss a Drop Section */}
            <ShopNeverMissDrop onFollowClick={() => console.log('Follow clicked')} />


            <Recently />
            {/* Newsletter Section */}
            <ShopNewsletter onSubscribe={(email) => console.log('Newsletter subscription:', email)} />
            <Toaster />
            <Footer />
        </div>
    );
}
