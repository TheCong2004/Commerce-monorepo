"use client";
import ProductGrid from '@/packages/YouMightLoveThese/components/ProductGrid';
import { useState, useMemo } from 'react';
import { X, Filter } from 'lucide-react';

interface Product {
    id: string;
    title: string;
    handle: string;
    thumbnail: string;
    price: number;
    originalPrice?: number;
    category?: string;
    subCategory?: string;
    postedBy?: string;
}

interface ShopAllProductsProps {
    products: Product[];
}

export const ShopAllProducts = ({ products }: ShopAllProductsProps) => {
    // State cho các filter
    const [selectedMainCategory, setSelectedMainCategory] = useState<string>('Tất cả');
    const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<string>('all'); // 'all', 'under-500k', '500k-2m', 'over-2m'
    const [postedBy, setPostedBy] = useState<string>('all');     // 'all', 'ca-nhan', 'doi-tac', 'cua-hang'
    const [showFilterDrawer, setShowFilterDrawer] = useState(false);

    // Dynamically extract categories and subcategories from actual products
    const { mainCategories, subCategoriesByMain } = useMemo(() => {
        // Get unique main categories from products
        const uniqueMainCategories = new Set<string>();
        const subCatMap = new Map<string, Set<string>>();

        products.forEach(product => {
            if (product.category) {
                uniqueMainCategories.add(product.category);

                // If there's a subCategory, map it to the main category
                if (product.subCategory) {
                    if (!subCatMap.has(product.category)) {
                        subCatMap.set(product.category, new Set());
                    }
                    subCatMap.get(product.category)!.add(product.subCategory);
                }
            }
        });

        // Convert Sets to sorted arrays
        const mainCats = ['Tất cả', ...Array.from(uniqueMainCategories).sort()];
        const subCatsObj: Record<string, string[]> = {};

        subCatMap.forEach((subs, main) => {
            subCatsObj[main] = Array.from(subs).sort();
        });

        return {
            mainCategories: mainCats,
            subCategoriesByMain: subCatsObj
        };
    }, [products]);

    // Lọc sản phẩm theo nhiều điều kiện
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Lọc theo main category
            const matchMainCategory =
                selectedMainCategory === 'Tất cả' ||
                product.category === selectedMainCategory;

            // Lọc theo sub-category (nếu có chọn)
            const matchSubCategory =
                selectedSubCategories.length === 0 ||
                selectedSubCategories.includes(product.subCategory || '');

            // Lọc theo giá
            let matchPrice = true;
            if (priceRange !== 'all') {
                if (priceRange === 'under-500k') matchPrice = product.price < 500000;
                else if (priceRange === '500k-2m') matchPrice = product.price >= 500000 && product.price <= 2000000;
                else if (priceRange === 'over-2m') matchPrice = product.price > 2000000;
            }

            // Lọc theo "Đăng bởi"
            const matchPostedBy =
                postedBy === 'all' ||
                product.postedBy?.toLowerCase() === postedBy;

            return matchMainCategory && matchSubCategory && matchPrice && matchPostedBy;
        });
    }, [products, selectedMainCategory, selectedSubCategories, priceRange, postedBy]);

    // Reset tất cả filter
    const resetFilters = () => {
        setSelectedMainCategory('Tất cả');
        setSelectedSubCategories([]);
        setPriceRange('all');
        setPostedBy('all');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Tất cả sản phẩm
                </h2>
                <button
                    onClick={() => setShowFilterDrawer(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium"
                >
                    <Filter size={18} />
                    Lọc
                </button>
            </div>

            {/* Main Category Tabs */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                {mainCategories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setSelectedMainCategory(cat);
                            // Reset sub-categories when switching categories
                            setSelectedSubCategories([]);
                        }}
                        className={`px-6 py-2.5 rounded-full font-medium whitespace-nowrap transition-all flex-shrink-0 ${selectedMainCategory === cat
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Sub Categories (chỉ hiện khi có sub-categories cho category được chọn) */}
            {selectedMainCategory !== 'Tất cả' && subCategoriesByMain[selectedMainCategory]?.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-10">
                    {subCategoriesByMain[selectedMainCategory].map((sub) => (
                        <button
                            key={sub}
                            onClick={() => {
                                setSelectedSubCategories(prev =>
                                    prev.includes(sub)
                                        ? prev.filter(s => s !== sub)
                                        : [...prev, sub]
                                );
                            }}
                            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${selectedSubCategories.includes(sub)
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            {sub}
                        </button>
                    ))}
                </div>
            )}

            {/* Active Filters + Clear Button */}
            {(selectedSubCategories.length > 0 || priceRange !== 'all' || postedBy !== 'all') && (
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-sm text-gray-500">Đang lọc:</span>
                    {selectedSubCategories.map(sub => (
                        <span key={sub} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                            {sub}
                            <X size={14} className="cursor-pointer" onClick={() => setSelectedSubCategories(prev => prev.filter(s => s !== sub))} />
                        </span>
                    ))}
                    <button
                        onClick={resetFilters}
                        className="ml-auto text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                    >
                        Xoá lọc
                    </button>
                </div>
            )}

            {/* Product Grid */}
            <ProductGrid
                products={filteredProducts.map(p => ({
                    id: p.id,
                    title: p.title,
                    handle: p.handle,
                    thumbnail: p.thumbnail,
                    price: p.price,
                    originalPrice: p.originalPrice,
                }))}
                title=""
                linkHref={(product) => `/product/${product.handle}`}
            />

            {/* Filter Drawer (Mobile + Desktop) */}
            {showFilterDrawer && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center">
                    <div className="bg-white w-full max-w-lg md:rounded-2xl p-6 max-h-[90vh] overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">Lọc sản phẩm</h3>
                            <button onClick={() => setShowFilterDrawer(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Giá */}
                        <div className="mb-8">
                            <p className="font-medium mb-3">Giá</p>
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="w-full p-3 border rounded-xl"
                            >
                                <option value="all">Tất cả giá</option>
                                <option value="under-500k">Dưới 500.000đ</option>
                                <option value="500k-2m">500.000 - 2.000.000đ</option>
                                <option value="over-2m">Trên 2.000.000đ</option>
                            </select>
                        </div>

                        {/* Đăng bởi */}
                        <div className="mb-8">
                            <p className="font-medium mb-3">Đăng bởi</p>
                            <select
                                value={postedBy}
                                onChange={(e) => setPostedBy(e.target.value)}
                                className="w-full p-3 border rounded-xl"
                            >
                                <option value="all">Tất cả</option>
                                <option value="ca-nhan">Cá nhân</option>
                                <option value="doi-tac">Đối tác</option>
                                <option value="cua-hang">Cửa hàng</option>
                            </select>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <button
                                onClick={resetFilters}
                                className="flex-1 py-3 border border-gray-300 rounded-xl font-medium"
                            >
                                Xoá lọc
                            </button>
                            <button
                                onClick={() => setShowFilterDrawer(false)}
                                className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium"
                            >
                                Áp dụng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopAllProducts;