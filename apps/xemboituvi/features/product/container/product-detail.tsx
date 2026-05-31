"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { formatUSD } from "@/lib/formate-price";
import { getToken } from "@/features/auth/lib/get-token";
import { useCart } from "@/features/cart/context/cart-context";
import useLoginModal from "@/features/auth/hooks/use-login-modal";
import { TextMask, TextReveal } from "@/components/ui/client";
import { TproductColumnProps, TuserProps } from "@/types";

// Import Actions & Services
import getProduct from "@/features/product/actions/get-product"; // Helper xử lý ảnh
import { getUserProfile } from "@/features/setting/services/profileService";
import { addItemToCart } from "../services/cartService";
import { getProductMainImage } from "@/features/user/services/urlService";

export default function ProductDetail({ id }: { id: string }) {
    const loginModal = useLoginModal();
    const token = getToken("authToken");
    const { toggleCart, refreshCart } = useCart();
    
    // State
    const [loading, setLoading] = useState(false); // Loading cho nút Add Cart
    const [pageLoading, setPageLoading] = useState(true); // Loading cho cả trang
    const [user, setUser] = useState<TuserProps>();
    const [product, setProduct] = useState<TproductColumnProps>();

    // 1. Fetch Data (Gộp User và Product vào để quản lý loading tốt hơn)
    useEffect(() => {
        const initData = async () => {
            try {
                setPageLoading(true);
                // Chạy song song 2 request cho nhanh
                const [productRes, userRes] = await Promise.all([
                    getProduct(id),
                    token ? getUserProfile(token) : Promise.resolve(null)
                ]);

                setProduct(productRes.product);
                if (userRes) setUser(userRes.data);

            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Could not load product details.");
            } finally {
                setPageLoading(false);
            }
        };

        initData();
    }, [id, token]);

    // 2. Handle Add to Cart (Logic tách biệt)
    const handleAddToCart = async () => {
        if (!user || !token) {
            loginModal.onOpen();
            return;
        }

        if (!product?.id) return;

        try {
            setLoading(true);
            // Gọi Service
            const data = await addItemToCart(user.id.toString(), product.id.toString(), token);

            if (data.success === false) {
                toast.error(data.message);
            } else {
                toast.success(data.success || "Added to cart!");
                refreshCart();
                toggleCart();
            }
        } catch (error: any) {
            const msg = error?.response?.data?.message || error.message || "An unknown error occurred";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
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