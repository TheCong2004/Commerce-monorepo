"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { formatUSD } from "@/lib/formate-price";
import { TextMask, TextReveal } from "@/components/ui/client";
import { TproductColumnProps } from "@/types";
import { redirectToPrintervalCheckout } from "@/lib/printerval-checkout";

// Import Actions & Services
import getProduct from "@/features/product/actions/get-product"; // Helper xử lý ảnh
import { getProductMainImage } from "@/features/user/services/urlService";

export default function ProductDetail({ id }: { id: string }) {
    // State
    const [loading, setLoading] = useState(false); // Loading cho nút Add Cart
    const [pageLoading, setPageLoading] = useState(true); // Loading cho cả trang
    const [product, setProduct] = useState<TproductColumnProps>();

    // 1. Fetch Data (Gộp User và Product vào để quản lý loading tốt hơn)
    useEffect(() => {
        const initData = async () => {
            try {
                setPageLoading(true);
                const productRes = await getProduct(id);

                setProduct(productRes.product);

            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Could not load product details.");
            } finally {
                setPageLoading(false);
            }
        };

        initData();
    }, [id]);

    // 2. Handle Add to Cart (Logic tách biệt)
    const handleAddToCart = async () => {
        if (!product?.id) return;

        redirectToPrintervalCheckout({
            id: `xemboituvi-product-${product.id}`,
            title: product.title || "Xemboituvi product",
            price: Number(product.price) || 0,
            variantTitle: "Xemboituvi product",
            thumbnail: mainImage,
            source: "products",
            metadata: {
                product_id: product.id,
            },
        });
    };

    // 3. Render Loading State cho trang
    if (pageLoading) {
        return <div className="w-full h-[50vh] flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    // 4. Xử lý ảnh an toàn
    const mainImage = getProductMainImage(product?.image) ||"https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg";

    return (
        <div className="w-full padding-y padding-x">
            <div className="w-full flex justify-center gap-10 items-center">
                
                {/* Product Image */}
                <div className="w-[700px]">
                    <Image
                        src={mainImage}
                        alt={product?.title || "Product Image"}
                        className="w-full object-cover rounded-lg" // Thêm rounded cho đẹp
                        width={500}
                        height={500}
                        priority // Ảnh chính nên ưu tiên load
                    />
                </div>

                {/* Product Info */}
                <div className="w-[40%] flex flex-col gap-5">
                    <TextReveal>
                        <h1 className="text-[#2E073F] subHeading font-papyrus tracking-tight">
                            {product?.title || "Untitled Product"}
                        </h1>
                    </TextReveal>
                    
                    <div>
                        <p className="text-[#2E073F] subHeading font-semibold forum tracking-tight">
                            Description:
                        </p>
                        <div className="text-black paragraph font-normal montserrat leading-loose tracking-normal">
                            <TextMask>{[product?.description || "No description available."]}</TextMask>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-between">
                        <p className="text-[#2E073F] subHeading font-semibold forum tracking-tight">
                            Price:
                        </p>
                        <span className="text-3xl text-black leading-tight tracking-tight montserrat font-medium">
                            {formatUSD(product?.price)}
                        </span>
                    </div>

                    <div className="w-full flex items-center gap-4 flex-col">
                        <button
                            className="w-full bg-[#2E073F] btn text-center transition-all duration-300 ease-in-out text-white px-6 py-3 rounded-lg text-[20px] montserrat leading-tight tracking-tight cursor-pointer disabled:opacity-50"
                            onClick={handleAddToCart}
                            disabled={loading} // Disable nút khi đang loading
                        >
                            {loading ? (
                                <Loader2 className="animate-spin mx-auto" />
                            ) : (
                                "Add to Cart"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
