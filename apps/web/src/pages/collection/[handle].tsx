"use client"
import { useRouter } from 'next/router';
import { getProducts } from '@/lib/productApi';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/shared/layout/header/Header';
import { categories } from '@/shared/layout/header/data';
import Recently from '@/packages/browsing-history/components/recently';
import { Footer } from '@/shared/layout/footer/Footer';
import { Toaster } from '@/shared/ui/sonner';
import { Heart, Star, ChevronDown, ChevronRight, SlidersHorizontal, X } from 'lucide-react';

// Category metadata
const COLLECTION_METADATA: Record<string, { title: string; description: string; rating: number; reviewCount: number }> = {
    't-shirt': {
        title: 'Custom T-Shirts',
        description: 'Design your custom t-shirt easily – just create, request, and let the fulfillment service print and deliver it to you.',
        rating: 4.8, reviewCount: 12450,
    },
    'hoodie': {
        title: 'Custom Hoodies',
        description: 'Create cozy, personalized hoodies perfect for any season. Stay warm and stylish with unique custom designs.',
        rating: 4.7, reviewCount: 8230,
    },
    'tanktop': {
        title: 'Custom Tank Tops',
        description: 'Design lightweight tank tops for active wear. Perfect for gym, casual outings, and warm weather.',
        rating: 4.6, reviewCount: 3100,
    },
    'sweatshirt': {
        title: 'Custom Sweatshirts',
        description: 'Comfortable personalized sweatshirts for casual everyday comfort. Ideal for layering and relaxed style.',
        rating: 4.7, reviewCount: 5600,
    },
    'mug': {
        title: 'Custom Mugs',
        description: 'Design personalized mugs to brighten your morning. Perfect gifts for coffee and tea lovers.',
        rating: 4.9, reviewCount: 9870,
    },
    'poster': {
        title: 'Custom Posters',
        description: 'Create decorative posters to transform your space. Add art and personality to your walls.',
        rating: 4.6, reviewCount: 4200,
    },
    'pets': {
        title: 'Pet Products',
        description: 'Custom pet-friendly products and accessories. Everything your furry friends need and love.',
        rating: 4.8, reviewCount: 6700,
    },
    'report': {
        title: 'Digital Reports',
        description: 'Professional digital reports and documents. Secure downloads with DRM protection.',
        rating: 4.5, reviewCount: 1200,
    },
    'digital-product': {
        title: 'Digital Products',
        description: 'Downloadable products, templates, files, guides, and business-ready digital assets.',
        rating: 4.6, reviewCount: 900,
    },
    'pdf-book': {
        title: 'PDF Books',
        description: 'Curated PDF books and downloadable learning materials for instant access.',
        rating: 4.6, reviewCount: 760,
    },
    'contract-template': {
        title: 'Contract Templates',
        description: 'Ready-to-use contract templates and business documents for fast download.',
        rating: 4.7, reviewCount: 860,
    },
    'telecom-plan': {
        title: 'SIM & Telecom Plans',
        description: 'SIM numbers, mobile data, internet, and telecom packages for customers and businesses.',
        rating: 4.5, reviewCount: 640,
    },
    'agriculture': {
        title: 'Agriculture',
        description: 'Agricultural products, supplies, services, and digital tools for farm operations.',
        rating: 4.5, reviewCount: 520,
    },
    'digital-marketing': {
        title: 'Digital Marketing Products',
        description: 'Marketing templates, content kits, ad assets, SEO files, and growth resources.',
        rating: 4.6, reviewCount: 780,
    },
    'all': {
        title: 'All Products',
        description: 'Explore our wide range of custom printed products and unique designs for every occasion.',
        rating: 4.7, reviewCount: 52000,
    },
};

const SORT_OPTIONS = [
    { value: 'relevant', label: 'Most Relevant' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'bestselling', label: 'Best Selling' },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={15}
                    className={star <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : star - 0.5 <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                />
            ))}
        </div>
    );
}

export default function CollectionPage() {
    const router = useRouter();
    const { handle } = router.query;
    const [wishlist, setWishlist] = useState<Set<string>>(new Set());
    const [sortBy, setSortBy] = useState('relevant');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [catalogProducts, setCatalogProducts] = useState<any[] | null>(null);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [productsError, setProductsError] = useState<string | null>(null);

    useEffect(() => { setMounted(true); }, []);

    const handleStr = (handle as string) || '';
    const isAll = handleStr.toLowerCase() === 'all';
    const meta = COLLECTION_METADATA[handleStr] || COLLECTION_METADATA['all'];

    useEffect(() => {
        if (!handleStr) return;
        let cancelled = false;

        setIsLoadingProducts(true);
        getProducts({ category: isAll ? undefined : handleStr, limit: 100 })
            .then((products) => {
                if (!cancelled) {
                    setCatalogProducts(products);
                    setProductsError(null);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setCatalogProducts([]);
                    setProductsError(err?.message || 'Failed to load products');
                }
            })
            .finally(() => {
                if (!cancelled) setIsLoadingProducts(false);
            });

        return () => {
            cancelled = true;
        };
    }, [handleStr, isAll]);

    const productsSource = catalogProducts || [];

    const collectionProducts = useMemo(() => {
        if (!handleStr) return [];
        let products = isAll
            ? productsSource
            : productsSource.filter(
                p => p.category?.toLowerCase() === handleStr.toLowerCase() ||
                    p.handle?.toLowerCase().includes(handleStr.toLowerCase())
            );

        if (sortBy === 'price-asc') products = [...products].sort((a, b) => (a.variants?.[0]?.calculated_price?.calculated_amount || 0) - (b.variants?.[0]?.calculated_price?.calculated_amount || 0));
        else if (sortBy === 'price-desc') products = [...products].sort((a, b) => (b.variants?.[0]?.calculated_price?.calculated_amount || 0) - (a.variants?.[0]?.calculated_price?.calculated_amount || 0));
        else if (sortBy === 'newest') products = [...products].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

        return products;
    }, [handleStr, isAll, productsSource, sortBy]);

    const categoryFilters = useMemo(() => {
        return categories
            .map((category) => {
                const count = productsSource.filter((product) => {
                    const productCategory = String(product.category || product.metadata?.category || '').toLowerCase();
                    return productCategory === category.handle.toLowerCase();
                }).length;

                return { ...category, count };
            })
            .filter((category) => category.count > 0);
    }, [productsSource]);

    const toggleWishlist = useCallback((e: React.MouseEvent, productId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlist(prev => {
            const next = new Set(prev);
            if (next.has(productId)) next.delete(productId);
            else next.add(productId);
            return next;
        });
    }, []);

    if (!handle || !mounted) {
        return (
            <div className="w-full min-h-screen bg-white">
                <Header />
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    const parentLabel = isAll ? 'All Collections' : 'Products';
    const parentHref = '/collection';

    return (
        <div className="w-full min-h-screen bg-white">
            <Header />

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
                <nav className="flex items-center gap-1.5 text-sm text-gray-500 font-Inter">
                    <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
                    <ChevronRight size={14} className="text-gray-300" />
                    <Link href={parentHref} className="hover:text-orange-500 transition-colors">{parentLabel}</Link>
                    {!isAll && (
                        <>
                            <ChevronRight size={14} className="text-gray-300" />
                            <span className="text-gray-800 font-medium">{meta.title}</span>
                        </>
                    )}
                </nav>
            </div>

            {/* Hero Header - Printerval style (centered, white bg) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 text-center border-b border-gray-100">
                <h1 className="text-3xl md:text-4xl font-Inter font-bold text-gray-900 mb-3 tracking-tight">
                    {meta.title}
                    <span className="text-base font-normal text-gray-400 ml-3">
                        ({collectionProducts.length.toLocaleString()} Results)
                    </span>
                </h1>
                <p className="text-gray-500 font-Inter text-base max-w-2xl mx-auto mb-4 leading-relaxed">
                    {meta.description}
                </p>
                <div className="flex items-center justify-center gap-2">
                    <StarRating rating={meta.rating} />
                    <span className="text-sm font-semibold text-gray-700">{meta.rating}</span>
                    <span className="text-sm text-gray-400">({meta.reviewCount.toLocaleString()} reviews)</span>
                </div>
            </div>

            {isAll && categoryFilters.length > 0 && (
                <div className="border-b border-gray-100 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                        <div className="mb-3 flex items-center justify-between gap-4">
                            <h2 className="text-base font-Inter font-bold text-gray-900">Browse by category</h2>
                            <Link href="/collection" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                                View collections
                            </Link>
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-1">
                            {categoryFilters.map((category) => (
                                <Link
                                    key={category.handle}
                                    href={`/collection/${category.handle}`}
                                    className="shrink-0 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-left transition hover:border-orange-300 hover:bg-orange-50"
                                >
                                    <span className="block text-sm font-Inter font-bold text-gray-900">{category.name}</span>
                                    <span className="mt-1 block text-xs font-Inter text-gray-500">{category.count.toLocaleString()} products</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Toolbar: Result count + Sort */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <p className="text-sm font-Inter text-gray-500">
                    About <span className="font-semibold text-gray-800">{collectionProducts.length.toLocaleString()}</span> Results
                </p>
                <div className="relative">
                    <button
                        onClick={() => setShowSortDropdown(v => !v)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-Inter font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
                    >
                        {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                        <ChevronDown size={15} />
                    </button>
                    {showSortDropdown && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                            <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden w-52 py-1">
                                {SORT_OPTIONS.map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-sm font-Inter transition-colors ${sortBy === opt.value ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Product Grid */}
            {isLoadingProducts ? (
                <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
                </div>
            ) : productsError ? (
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="rounded-lg border border-red-100 bg-red-50 p-6 text-center text-red-700">
                        {productsError}
                    </div>
                </div>
            ) : collectionProducts.length > 0 ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
                        {collectionProducts.map((product) => {
                            const salePrice = product.variants?.[0]?.calculated_price?.calculated_amount || 0;
                            const origPrice = product.variants?.[0]?.calculated_price?.original_amount;
                            const hasDiscount = origPrice && origPrice > salePrice;
                            const discountPct = hasDiscount ? Math.round((1 - salePrice / origPrice) * 100) : 0;
                            const inWishlist = wishlist.has(product.id);

                            return (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.handle}`}
                                    className="group flex flex-col"
                                >
                                    {/* Image Card */}
                                    <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden rounded-2xl bg-gray-50 border border-black/5">
                                        <Image
                                            src={product.thumbnail || '/placeholder.png'}
                                            alt={product.title || 'Product'}
                                            fill
                                            sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 22vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Discount Badge */}
                                        {hasDiscount && (
                                            <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                -{discountPct}%
                                            </div>
                                        )}

                                        {/* Wishlist Button */}
                                        <button
                                            onClick={(e) => toggleWishlist(e, product.id)}
                                            className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all duration-200
                                                ${inWishlist
                                                    ? 'bg-red-500 text-white scale-110'
                                                    : 'bg-white/90 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-white'
                                                }`}
                                        >
                                            <Heart size={16} fill={inWishlist ? 'white' : 'none'} />
                                        </button>
                                    </div>

                                    {/* Info */}
                                    <div className="mt-3 flex flex-col gap-1 px-0.5">
                                        <h3 className="text-sm font-Inter font-medium text-gray-800 line-clamp-2 group-hover:text-orange-500 transition-colors leading-snug">
                                            {product.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-base font-Inter font-bold text-gray-900">
                                                ${(salePrice / 100).toFixed(2)}
                                            </span>
                                            {hasDiscount && (
                                                <span className="text-xs font-Inter text-gray-400 line-through">
                                                    ${(origPrice / 100).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <SlidersHorizontal size={32} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">No products found</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        This collection doesn't have any products yet. Check back soon!
                    </p>
                    <Link
                        href="/collection"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
                    >
                        Browse All Collections
                    </Link>
                </div>
            )}

            {/* Recently Viewed */}
            <Recently />
            <Footer />
            <Toaster />
        </div>
    );
}
