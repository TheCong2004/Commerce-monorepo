"use client"
import { Download, Eye } from "lucide-react";

interface ReportDetailProps {
    product: any;
    rating?: number;
    views?: number;
    downloads?: number;
    onDownload?: () => void;
}

export default function ReportDetail({
    product,
    rating = 4.7,
    views = 0,
    downloads = 0,
    onDownload,
}: ReportDetailProps) {
    const safeProduct = product || {};

    return (
        <div className="w-full px-1 sm:px-2 font-sans space-y-4">
            {/* Title */}
            <h1 className="text-[20px] sm:text-base md:text-lg font-semibold text-gray-900 leading-snug">
                {safeProduct?.title || "Báo cáo"}
            </h1>

            {/* Rating & Stats */}
            <div className="space-y-3 pb-4 border-b border-gray-200">
                {/* Rating */}
                {rating && (
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-800">
                            ⭐ {rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-600">(Đánh giá)</span>
                    </div>
                )}

                {/* View Count */}
                {views && (
                    <div className="flex items-center gap-2">
                        <Eye size={16} className="text-gray-500" />
                        <span className="text-xs text-gray-600">
                            {views?.toLocaleString?.()} lượt xem
                        </span>
                    </div>
                )}

                {/* Download Count */}
                {downloads && (
                    <div className="flex items-center gap-2">
                        <Download size={16} className="text-gray-500" />
                        <span className="text-xs text-gray-600">
                            {downloads?.toLocaleString?.()} lần tải
                        </span>
                    </div>
                )}
            </div>

            {/* Price & Download Button */}
            {safeProduct?.price && (
                <div className="space-y-3">
                    <div>
                        <p className="text-xs text-gray-600 mb-1">Tải về bộ file</p>
                        <p className="text-2xl font-bold text-green-600">
                            {(safeProduct.price / 1000).toLocaleString()}K đ
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Bảo gồm: Word, PDF, Excel
                        </p>
                    </div>

                    <button
                        onClick={onDownload}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-full transition flex items-center justify-center gap-2"
                    >
                        <Download size={18} />
                        TẢI NGAY
                    </button>
                </div>
            )}

            {/* Additional Info */}
            <div className="pt-4 border-t border-gray-200 space-y-2 text-xs text-gray-600">
                <p>✓ Tải về nhanh chóng</p>
                <p>✓ Chỉ 3 click</p>
                <p>✓ Tải ngay sau khi thanh toán</p>
                <p>✓ Không nén dữ liệu</p>
            </div>
        </div>
    );
}
