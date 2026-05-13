"use client"
import { useRouter } from 'next/router';
import { mockProducts } from '@/lib/mockProduct';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { ShopAllProducts } from '@/packages/shops/components';
import { Header } from '@/shared/layout/header/Header';
import Recently from '@/packages/browsing-history/components/recently';
import { Footer } from '@/shared/layout/footer/Footer';
import { Toaster } from '@/shared/ui/sonner';

// Category metadata
const COLLECTION_METADATA: Record<string, { title: string; description: string }> = {
    't-shirt': {
        title: 'T-Shirts',
        description: 'Comfortable and stylish t-shirts for everyday wear. Express yourself with our unique designs.'
    },
    'hoodie': {
        title: 'Hoodies',
        description: 'Cozy hoodies perfect for any season. Stay warm and stylish with our collection.'
    },
    'tanktop': {
        title: 'Tank Tops',
        description: 'Lightweight tank tops for active wear. Perfect for gym, casual outings, and warm weather.'
    },
    'sweatshirt': {
        title: 'Sweatshirts',
        description: 'Comfortable sweatshirts for casual comfort. Ideal for layering and relaxed style.'
    },
    'mug': {
        title: 'Mugs',
        description: 'Personalized mugs to brighten your morning. Perfect gifts for coffee and tea lovers.'
    },
    'poster': {
        title: 'Posters',
        description: 'Decorative posters to transform your space. Add art and personality to your walls.'
    },
    'pets': {
        title: 'Pets',
        description: 'Pet-friendly products and accessories. Everything your furry friends need and love.'
    },
    'report': {
        title: 'Digital Reports',
        description: 'Professional digital reports and documents. Secure downloads with DRM protection.'
    },
};

export default function CollectionPage() {
    const router = useRouter();
    const { handle } = router.query;
    const [collectionProducts, setCollectionProducts] = useState<any[]>([]);
    const [collectionName, setCollectionName] = useState<string>('');
    const [collectionDescription, setCollectionDescription] = useState<string>('');

    useEffect(() => {
        if (!handle) return;

        const handleStr = handle as string;
        const metadata = COLLECTION_METADATA[handleStr];

        // Filter products by category handle
        const filteredProducts = mockProducts.filter(
            product =>
                product.category?.toLowerCase() === handleStr.toLowerCase() ||
                product.handle?.toLowerCase().includes(handleStr.toLowerCase())
        );

        setCollectionProducts(filteredProducts);
        setCollectionName(metadata?.title || handleStr.replace('-', ' '));
        setCollectionDescription(
            metadata?.description ||
            `Browse our collection of ${handleStr.replace('-', ' ')} products.`
        );
    }, [handle]);

    if (!handle) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <Header />

            {/* Collection Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-Inter font-semibold mb-4">{collectionName}</h1>
                    <p className="text-lg text-gray-300 mb-6 max-w-2xl">
                        {collectionDescription}
                    </p>
                    <p className="text-sm text-gray-400">
                        {collectionProducts.length} products available
                    </p>
                </div>
            </div>

            {/* All Products Section */}
            {collectionProducts.length > 0 ? (
                <ShopAllProducts
                    products={collectionProducts.map((product) => ({
                        id: product.id,
                        title: product.title,
                        handle: product.handle,
                        thumbnail: product.thumbnail,
                        price: product.variants?.[0]?.calculated_price?.calculated_amount || 0,
                        originalPrice: product.variants?.[0]?.calculated_price?.original_amount,
                        category: product.category || handle,
                        subCategory: product.subCategory,
                        postedBy: product.postedBy || 'ca-nhan',
                    }))}
                />
            ) : (
                <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No products found</h2>
                    <p className="text-gray-600 mb-8">
                        This collection doesn't have any products yet. Check back soon!
                    </p>
                    <Link href="/">
                        <Button>Back to Home</Button>
                    </Link>
                </div>
            )}

            {/* Recently Viewed */}
            <Recently />

            {/* Footer */}
            <Footer />
            <Toaster />
        </div>
    );
}
