"use client";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import getService from "@/features/service/actions/get-service";
import { TServicesColumnProps } from "@/types";

// Import Utils & Resources
import { getImageUrl } from "@/features/user/services/urlService";

export default function Service() {
    const { id } = useParams();
    const [service, setService] = useState<TServicesColumnProps | null>(null);
    const [loading, setLoading] = useState(true); // 1. Thêm state Loading

    useEffect(() => {
        const fetchService = async () => {
            if (typeof id !== "string") return;
            
            try {
                setLoading(true);
                const response = await getService(id);
                setService(response.service);
            } catch (err) {
                console.error("Error fetching service:", err);
            } finally {
                setLoading(false); // Kết thúc loading dù thành công hay thất bại
            }
        };
        fetchService();
    }, [id]);

    // 2. Hiển thị Loading UI (Có thể thay bằng Skeleton nếu muốn đẹp hơn)
    if (loading) {
        return (
            <div className="w-full h-[50vh] flex items-center justify-center">
                <p>Loading service details...</p>
            </div>
        );
    }

    // 3. Xử lý khi không tìm thấy Service
    if (!service) {
        return (
            <div className="w-full h-[50vh] flex items-center justify-center">
                <p>Service not found.</p>
            </div>
        );
    }

    // 4. Xử lý link ảnh bằng hàm chuẩn
    const imageUrl = getImageUrl(service.image) || 'https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266650/Wands14_py0tik.png';

    return (
        <div className="w-full padding-y padding-x">
            <div className="w-full flex justify-between gap-10">
                <div className="flex flex-1 items-center justify-center flex-col gap-10">
                    <Image
                        src={imageUrl}
                        alt={service.title || "Service Image"}
                        className="w-full h-[600px] object-cover object-center rounded-2xl"
                        width={600}
                        height={600}
                        // Thêm loading lazy và placeholder blur nếu muốn xịn hơn
                        placeholder="blur" 
                        blurDataURL={'https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266650/Wands14_py0tik.png'} 
                    />
                </div>
                <div className="flex flex-1 flex-col gap-5">
                    <h3 className="text-black heading font-normal leading-tight forum tracking-tight">
                        {service.title}
                    </h3>
                    <div className="flex flex-col gap-4">
                        <span className="text-3xl text-black leading-tight tracking-tight montserrat font-semibold">
                            Price: ${service.price}.00
                        </span>
                        <div className="text-black paragraph font-normal montserrat leading-loose tracking-normal">
                            {/* Parse description an toàn hơn */}
                            {service.description ? parse(service.description) : "No description available."}
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-4 flex-col">
                        <Link
                            href={`/services/${id}/booking-form`}
                            className={`w-full bg-[#936d42] btn text-center transition-all duration-300 ease-in-out text-white px-6 py-3 rounded-lg text-[20px] montserrat leading-tight tracking-tight`}>
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}