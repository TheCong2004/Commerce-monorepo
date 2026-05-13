"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, Download, Share2 } from "lucide-react";
import { mediaSecurityManager, WatermarkManager } from "@/packages/drm-security";

interface ReportPage {
    id: string;
    pageNum: number;
    thumbnail: string;
    fullImage: string;
    title?: string;
}

interface ReportViewerProps {
    title: string;
    rating?: number;
    views?: number;
    downloads?: number;
    price?: number;
    pages: ReportPage[];
    orderId?: string;
    reportId?: string;
    buyerEmail?: string;
    buyerName?: string;
    onDownload?: () => void;
    onShare?: () => void;
}

export default function ReportViewer({
    title,
    pages,
    reportId,
    buyerEmail,
    buyerName,
    onDownload,
    onShare,
}: ReportViewerProps) {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [zoom, setZoom] = useState(70);
    const mainViewerRef = useRef<HTMLDivElement>(null);
    const documentRef = useRef<HTMLDivElement>(null); // ref cho vùng chứa trang tài liệu
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [accessToken, setAccessToken] = useState<string>("");
    const cleanupAntiCopyRef = useRef<(() => void) | null>(null);
    const watermarkRef = useRef<HTMLElement | null>(null);

    const currentPage = pages[currentPageIndex];

    const handlePrevious = () => {
        if (currentPageIndex > 0) setCurrentPageIndex(currentPageIndex - 1);
    };

    const handleNext = () => {
        if (currentPageIndex < pages.length - 1) setCurrentPageIndex(currentPageIndex + 1);
    };

    const handlePageClick = (index: number) => setCurrentPageIndex(index);
    const handleZoomIn = () => setZoom(Math.min(zoom + 10, 200));
    const handleZoomOut = () => setZoom(Math.max(zoom - 10, 50));

    const handleDownloadWithSecurity = () => {
        if (accessToken && reportId) {
            const tokenManager = mediaSecurityManager.getTokenManager();
            const verification = tokenManager.verifyAccessToken(accessToken);
            if (!verification.isValid) {
                alert("Your access has expired. Please reload the document.");
                return;
            }
        }
        onDownload?.();
    };

    const handleWheel = (e: WheelEvent) => {
        if (!mainViewerRef.current?.contains(e.target as Node)) return;
        e.preventDefault();
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
            if (e.deltaY > 30 && currentPageIndex < pages.length - 1) {
                setCurrentPageIndex((p) => p + 1);
            } else if (e.deltaY < -30 && currentPageIndex > 0) {
                setCurrentPageIndex((p) => p - 1);
            }
        }, 50);
    };

    useEffect(() => {
        const viewer = mainViewerRef.current;
        if (viewer) viewer.addEventListener("wheel", handleWheel as any, { passive: false });
        return () => {
            if (viewer) viewer.removeEventListener("wheel", handleWheel as any);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [currentPageIndex, pages.length]);

    // ✅ Anti-copy: chỉ chạy 1 lần khi mount
    useEffect(() => {
        if (!mainViewerRef.current) return;

        // 1. Generate access token
        const token = mediaSecurityManager.generateAccessToken(
            buyerEmail || "anonymous",
            reportId || `report-${Date.now()}`
        );
        setAccessToken(token.token);

        // 2. Apply anti-copy protection
        cleanupAntiCopyRef.current = mediaSecurityManager.applyAntiCopyProtection(mainViewerRef.current);

        return () => {
            cleanupAntiCopyRef.current?.();
        };
    }, [reportId, buyerEmail]);

    // ✅ Watermark: dùng WatermarkManager.generateDynamicOverlayWatermark từ package
    useEffect(() => {
        if (!documentRef.current) return;

        // Xóa watermark cũ trước khi tạo mới (tránh duplicate)
        if (watermarkRef.current?.parentNode) {
            watermarkRef.current.parentNode.removeChild(watermarkRef.current);
            watermarkRef.current = null;
        }

        // documentRef cần position relative
        documentRef.current.style.position = "relative";

        // Dùng generateDynamicOverlayWatermark từ WatermarkManager
        const watermark = WatermarkManager.generateDynamicOverlayWatermark({
            imageUrl: "", // không dùng ảnh watermark
            opacity: 1,
            position: "right",
            backgroundColor: "transparent", // nền trong suốt
            backdropBlur: "blur(0px)",
            zIndex: 20,
            showUserInfo: {
                name: buyerName || "",
                email: buyerEmail || "",
            },
            showDate: false,
        });

        // Override style để hiển thị dạng SVG pattern thay vì ảnh
        // vì imageUrl để trống, ta replace nội dung container bằng SVG pattern
        const container = watermark.querySelector("div") as HTMLElement;
        if (container) {
            // Xóa img element (vì không có imageUrl)
            const img = container.querySelector("img");
            if (img) img.remove();

            // Thêm SVG pattern watermark vào container
            container.style.cssText = `
                position: absolute;
                top: 0;
                right: 0;
                width: 50%;
                height: 100%;
                pointer-events: none;
                user-select: none;
                z-index: 20;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='180'%3E%3Ctext transform='rotate(-35 150 90)' x='10' y='80' font-size='20' font-weight='bold' font-family='Arial' fill='%236464B4' fill-opacity='0.22' letter-spacing='3'%3EPRINTERVAL%3C/text%3E%3Ctext transform='rotate(-35 150 90)' x='30' y='106' font-size='13' font-family='Arial' fill='%236464B4' fill-opacity='0.15' letter-spacing='2'%3ECONFIDENTIAL%3C/text%3E%3C/svg%3E");
                background-repeat: repeat;
                background-size: 300px 180px;
            `;
        }

        documentRef.current.appendChild(watermark);
        watermarkRef.current = watermark;

        return () => {
            if (watermarkRef.current?.parentNode) {
                watermarkRef.current.parentNode.removeChild(watermarkRef.current);
                watermarkRef.current = null;
            }
        };
    }, [buyerEmail, buyerName]); // chỉ re-run khi thông tin buyer thay đổi

    return (
        <div className="flex gap-4 bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Left Sidebar */}
            <div className="hidden sm:flex flex-col w-32 lg:w-40 bg-gray-50 border-r border-gray-200 overflow-y-auto max-h-[600px]">
                {pages.map((page, idx) => (
                    <button
                        key={page.id}
                        onClick={() => handlePageClick(idx)}
                        className={`flex-shrink-0 p-2 border-2 transition-all ${
                            currentPageIndex === idx
                                ? "border-green-500 bg-green-50"
                                : "border-gray-300 hover:border-gray-400"
                        }`}
                    >
                        <div className="relative w-full aspect-[3/4] rounded overflow-hidden bg-gray-100">
                            <Image
                                src={page.thumbnail}
                                fill
                                alt={`Page ${page.pageNum}`}
                                className="object-cover"
                                sizes="120px"
                            />
                        </div>
                        <p className="text-xs text-center mt-1 font-semibold text-gray-700">
                            {page.pageNum}
                        </p>
                    </button>
                ))}
            </div>

            {/* Center - Main Viewer */}
            <div className="flex-1 flex flex-col bg-gray-100">
                {/* Toolbar */}
                <div className="flex items-center justify-between bg-white border-b border-gray-200 p-3">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPageIndex === 0}
                            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <ChevronUp size={20} />
                        </button>
                        <span className="text-sm font-semibold text-gray-700 px-2">
                            {currentPageIndex + 1} / {pages.length}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPageIndex === pages.length - 1}
                            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <ChevronDown size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 rounded transition">−</button>
                        <span className="text-sm font-semibold text-gray-700 min-w-[50px] text-center">{zoom}%</span>
                        <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 rounded transition">+</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDownloadWithSecurity}
                            className="p-2 hover:bg-gray-100 rounded transition text-blue-600"
                        >
                            <Download size={20} />
                        </button>
                        <button
                            onClick={onShare}
                            className="p-2 hover:bg-gray-100 rounded transition text-blue-600"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Document Display */}
                <div
                    ref={mainViewerRef}
                    className="flex-1 overflow-auto flex items-center justify-center bg-gray-200 p-4"
                    style={{ userSelect: "none", WebkitUserSelect: "none" } as React.CSSProperties}
                >
                    <div style={{ width: `${zoom}%` }} className="transition-all duration-200">
                        {/* ✅ documentRef: watermark được append vào đây, đúng trên trang tài liệu */}
                        <div
                            ref={documentRef}
                            style={{
                                position: "relative",
                                width: "100%",
                                paddingBottom: "133.33%",
                                borderRadius: "8px",
                                overflow: "hidden",
                                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                                background: "#fff",
                            }}
                        >
                            <Image
                                src={currentPage?.fullImage || ""}
                                fill
                                alt={`${title} - Page ${currentPageIndex + 1}`}
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 800px"
                            />
                            {/* watermark được append vào đây qua useEffect */}
                        </div>
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="bg-white border-t border-gray-200 px-4 py-2 text-xs text-gray-600">
                    <p>{title} - Page {currentPageIndex + 1} of {pages.length}</p>
                </div>
            </div>
        </div>
    );
}