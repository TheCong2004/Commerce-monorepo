"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

// Component con để xử lý logic lấy params (Bắt buộc phải bọc trong Suspense)
function GoogleCallbackHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // 1. Lấy dữ liệu từ URL do Backend gửi về
        const token = searchParams.get("token");
        const role = searchParams.get("role");

        if (token) {
            // 2. Lưu Token vào Cookie (Giống hệt lúc đăng nhập thường)
            if (role === "admin") {
                Cookies.set("adminAuthToken", token, { expires: 1 });
                // Chuyển hướng vào trang Admin
                window.location.href = "/dashboard"; 
            } else {
                Cookies.set("authToken", token, { expires: 1 });
                // Chuyển hướng vào trang chủ User
                window.location.href = "/"; 
            }
        } else {
            // Nếu không có token (Lỗi), quay về trang chủ
            router.push("/");
        }
    }, [searchParams, router]);

    return (
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-white w-10 h-10" />
            <span className="text-white text-lg font-medium">
                Đang đăng nhập bằng Google...
            </span>
        </div>
    );
}

// Component chính của trang
export default function GoogleSuccessPage() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-[#04031b]">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
                <GoogleCallbackHandler />
            </Suspense>
        </div>
    );
}