"use client"
import { getProducts } from '@/lib/productApi';
import { categories } from '@/shared/layout/header/data';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/shared/layout/header/Header';
import { Footer } from '@/shared/layout/footer/Footer';
import Recently from '@/packages/browsing-history/components/recently';
import { Toaster } from '@/shared/ui/sonner';
import { Card, CardContent } from '@/shared/ui/card';
import { getProductPrices } from '@/utils';
import { ArrowRight } from 'lucide-react';

export default function CollectionsOverviewPage() {
    const [catalogProducts, setCatalogProducts] = useState<any[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        setIsLoading(true);
        getProducts({ limit: 100 })
            .then((products) => {
                if (!cancelled) {
                    setCatalogProducts(products);
                    setError(null);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setCatalogProducts([]);
                    setError(err?.message || 'Failed to load products');
                }
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const productsSource = catalogProducts || [];

    // Group products by category handle
    const categoriesWithProducts = categories.map(cat => {
        const products = productsSource.filter(
            product => product.category?.toLowerCase() === cat.handle.toLowerCase()
        );
        return {
            ...cat,
            products: products.slice(0, 4) // Show top 4 products in each category
        };
    }).filter(cat => cat.products.length > 0); // Only show categories with products

    return (
        <div className="w-full min-h-screen bg-gray-50 font-sans">
            <Header />

            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-Inter font-bold mb-4 tracking-tight">
                        Explore Our Collections
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Discover unique, high-quality custom printed products designed to fit your style.
                    </p>
                </div>
            </div>

            {/* Categories Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                {isLoading ? (
                    <div className="flex justify-center py-16">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
                    </div>
                ) : error ? (
                    <div className="rounded-lg border border-red-100 bg-red-50 p-6 text-center text-red-700">
                        {error}
                    </div>
                ) : categoriesWithProducts.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
                        <h2 className="text-xl font-bold text-gray-900">No collections yet</h2>
                        <p className="mt-2 text-gray-500">Add products in merchant admin, then this page will update from the API.</p>
                    </div>
                ) : categoriesWithProducts.map((cat) => (
                    <div key={cat.id} className="border-b border-gray-100 pb-12 last:border-0 last:pb-0">
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold font-Inter text-gray-900 tracking-tight">
                                    Custom {cat.name}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Premium quality custom {cat.name.toLowerCase()} with unique designs.
                                </p>
                            </div>
                            <Link 
                                href={`/collection/${cat.handle}`} 
                                className="flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors group"
                            >
                                View All 
                                <ArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {cat.products.map((product) => {
                                const prices = getProductPrices(product);
                                return (
                                    <Link key={product.id} href={`/product/${product.handle}`} className="group block">
                                        <Card className="border border-black/5 hover:border-black/10 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden h-full flex flex-col justify-between bg-white">
                                            {/* Fixed Aspect Ratio Wrap */}
                                            <div className="relative w-full aspect-square bg-gray-50 overflow-hidden shrink-0" style={{ aspectRatio: '1/1' }}>
                                                <Image
                                                    src={product.thumbnail || '/placeholder.png'}
                                                    alt={product.title || 'Product Image'}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 640px) 45vw, 20vw"
                                                />
                                            </div>
                                            <CardContent className="p-3 flex flex-col gap-1 bg-white flex-grow justify-center">
                                                <p className="text-sm font-semibold font-Inter text-gray-700 line-clamp-1 group-hover:text-orange-500 transition-colors">
                                                    {product.title}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base font-Inter font-semibold text-gray-900">
                                                        ${prices.salePrice}
                                                    </span>
                                                    {prices.hasDiscount && (
                                                        <span className="text-xs font-Inter text-gray-400 line-through">
                                                            ${prices.originalPrice}
                                                        </span>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recently Viewed */}
            <Recently />

            {/* Footer */}
            <Footer />
            <Toaster />
        </div>
    );
}
