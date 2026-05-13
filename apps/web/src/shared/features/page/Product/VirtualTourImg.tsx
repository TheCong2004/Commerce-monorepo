
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import NextImage from "next/image";
import { Sparkles, X } from "lucide-react";
import { VirtualTryOnModal } from "@/packages/tryon";
import { createPortal } from "react-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import type { CarouselApi } from "@/shared/ui/carousel";

interface Spot {
    id: string;
    name: string;
    url: string;
    panoramaUrl: string;
    thumbnailUrl?: string; // ảnh thumbnail sidebar trái
    floorPlanX: number;
    floorPlanY: number;
}

interface VirtualTourProps {
    spots: Spot[];
    floorPlanImage: string;
    floorPlan3DImage?: string;
    customDesign?: any;
    customTemplate?: any;
    customElements?: any[];
}

export default function VirtualTour({
    spots,
    floorPlanImage,
    floorPlan3DImage,
    customDesign,
    customTemplate,
    customElements,
}: VirtualTourProps) {
    const [activeSpotId, setActiveSpotId] = useState("");
    const [showTryOn, setShowTryOn] = useState(false);
    const [showFloorModal, setShowFloorModal] = useState(false);
    const [floorModalTab, setFloorModalTab] = useState<"floorplan" | "3d">("floorplan");
    const [pannellumLoaded, setPannellumLoaded] = useState(false);
    const [viewerReady, setViewerReady] = useState(false);
    const [show3D, setShow3D] = useState(false);

    // Carousel state for static preview
    const [activeIndex, setActiveIndex] = useState(0);
    const [mainApi, setMainApi] = useState<CarouselApi>();
    const [thumbApi, setThumbApi] = useState<CarouselApi>();

    const panoramaRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);
    const initDoneRef = useRef(false);

    // Init activeSpotId
    useEffect(() => {
        if (spots?.length && !activeSpotId) {
            setActiveSpotId(spots[0].id);
        }
    }, [spots]);

    const currentSpot = spots?.find(s => s.id === activeSpotId);

    // Carousel sync
    useEffect(() => {
        if (!mainApi) return;
        const onSelect = () => {
            const currentIndex = mainApi.selectedScrollSnap();
            setActiveIndex(currentIndex);
        };
        mainApi.on("select", onSelect);
        return () => {
            mainApi.off("select", onSelect);
        };
    }, [mainApi]);

    useEffect(() => {
        if (!thumbApi) return;
        thumbApi.scrollTo(activeIndex);
    }, [activeIndex, thumbApi]);

    const handleThumbnailClick = (idx: number) => {
        setActiveIndex(idx);
        mainApi?.scrollTo(idx);
    };

    // Load Pannellum script ONLY when user enables 3D view (lazy load)
    useEffect(() => {
        if (!show3D || typeof window === "undefined") return;
        if ((window as any).pannellum) {
            setPannellumLoaded(true);
            return;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
        script.async = true;
        script.onload = () => setPannellumLoaded(true);
        document.head.appendChild(script);
    }, [show3D]);

    // Init Pannellum — chỉ 1 lần sau khi cả pannellumLoaded và DOM ref ready
    const initViewer = useCallback(() => {
        if (!pannellumLoaded || !panoramaRef.current || !spots?.length || initDoneRef.current) return;
        if (viewerRef.current) {
            viewerRef.current.destroy();
            viewerRef.current = null;
        }

        const firstId = activeSpotId || spots[0].id;
        const config: any = {
            default: {
                firstScene: firstId,
                sceneFadeDuration: 800,
            },
            scenes: {},
        };

        spots.forEach(spot => {
            config.scenes[spot.id] = {
                type: "equirectangular",
                panorama: spot.panoramaUrl,
                title: spot.name,
                hfov: 110,
                autoLoad: true,
                autoRotate: -1.5,
                compass: false,
                mouseZoom: true,
                draggable: true,
            };
        });

        try {
            const viewer = (window as any).pannellum.viewer(panoramaRef.current, config);
            viewerRef.current = viewer;
            initDoneRef.current = true;

            viewer.on("scenechange", (id: string) => setActiveSpotId(id));
            viewer.on("load", () => setViewerReady(true));
        } catch (e) {
            console.error("Pannellum init error:", e);
        }
    }, [pannellumLoaded, spots, activeSpotId]);

    useEffect(() => {
        // Delay nhỏ để đảm bảo DOM đã mount
        const timer = setTimeout(initViewer, 100);
        return () => clearTimeout(timer);
    }, [initViewer]);

    // Cleanup khi unmount
    useEffect(() => {
        return () => {
            if (viewerRef.current) {
                viewerRef.current.destroy();
                viewerRef.current = null;
                initDoneRef.current = false;
            }
        };
    }, []);

    const switchSpot = (id: string) => {
        if (viewerRef.current) {
            viewerRef.current.loadScene(id);
        }
        setActiveSpotId(id);
    };

    const handleFloorSpotClick = (id: string) => {
        switchSpot(id);
        setShowFloorModal(false);
    };

    if (!show3D) {
        // Static preview with carousel thumbnail sidebar (like old code)
        return (
            <div className="flex sm:gap-3 items-stretch flex-col md:flex-row-reverse p-2">
                {/* Carousel chính */}
                <Carousel
                    className="relative w-full h-full"
                    opts={{ loop: false }}
                    setApi={setMainApi}
                >
                    <CarouselContent>
                        {spots && spots.length > 0 ? (
                            spots.map((item: any, idx: number) => (
                                <CarouselItem key={idx} className="px-2 lg:pl-4">
                                    {/* Aspect ratio container to prevent CLS */}
                                    <div className="relative w-full aspect-[5/4] bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-95 transition-opacity" onClick={() => setShow3D(true)}>
                                        {/* Ảnh sản phẩm gốc - LCP optimize */}
                                        <NextImage
                                            src={item.url}
                                            fill
                                            alt={`Product image ${idx + 1}`}
                                            className="rounded-lg object-cover"
                                            priority={idx === 0}  // Only first image is priority
                                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 800px"
                                        />

                                        {/* Image Count Indicator Badge - Premium Design */}
                                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium tracking-wide flex items-center gap-1.5 z-50 shadow-lg border border-white/20 transition-all">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                            <span>{idx + 1} / {spots.length}</span>
                                        </div>

                                        {/* TRY ON Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowTryOn(true);
                                            }}
                                            className="absolute bottom-4 right-4 bg-white hover:bg-gray-50 text-purple-600 font-semibold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 transition-all hover:shadow-xl z-20"
                                        >
                                            <Sparkles size={18} />
                                            TRY ON
                                        </button>
                                    </div>
                                </CarouselItem>
                            ))
                        ) : (
                            <CarouselItem>
                                <div className="w-full h-[300px] lg:h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
                                    <p className="text-gray-500 text-lg">Không có ảnh sản phẩm</p>
                                </div>
                            </CarouselItem>
                        )}
                    </CarouselContent>
                </Carousel>

                {/* Thumbnail vertical column (bên trái trên Desktop/Laptop) */}
                <div className="hidden md:flex flex-col gap-2 w-16 md:w-24 xl:w-40 flex-shrink-0">
                    <Carousel
                        opts={{ align: "start", startIndex: activeIndex }}
                        orientation="vertical"
                        className="w-full"
                        setApi={setThumbApi}
                    >
                        <CarouselContent className="gap-2.5 max-h-[520px] pr-1">
                            {spots && spots.length > 0 ? (
                                spots.map((item: any, idx: number) => (
                                    <CarouselItem
                                        key={idx}
                                        className={`basis-auto cursor-pointer transition-all ${activeIndex === idx ? 'ring-2 ring-[#ff4e00] rounded-lg' : 'opacity-60 hover:opacity-100'}`}
                                        onClick={() => handleThumbnailClick(idx)}
                                    >
                                        {/* Aspect ratio container */}
                                        <div className="relative w-full h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                            <NextImage
                                                src={item.url}
                                                fill
                                                alt={`Thumbnail ${idx + 1}`}
                                                className="object-cover"
                                                loading="lazy"
                                                sizes="160px"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))
                            ) : (
                                <CarouselItem>
                                    <div className="w-full h-[150px] bg-gray-200 rounded-lg" />
                                </CarouselItem>
                            )}
                        </CarouselContent>
                    </Carousel>
                </div>

                {/* Virtual Try On Modal */}
                {showTryOn && createPortal(
                    <div className="fixed inset-0 bg-black/10 flex items-center justify-center" style={{ zIndex: 999999 }}>
                        <div className="absolute inset-0" onClick={() => setShowTryOn(false)}></div>
                        <div className="max-h-[90vh] overflow-y-auto relative w-full rounded-xl shadow-2xl" style={{ zIndex: 1000000 }}>
                            <VirtualTryOnModal onClose={() => setShowTryOn(false)} />
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        );
    }

    return (
        <>
            {/* Pannellum CSS */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"
            />

            <div className="flex sm:gap-3 items-stretch flex-col md:flex-row-reverse p-2">
                {/* Carousel hoặc Panorama container */}
                {!show3D ? (
                    // STATIC MODE - Carousel
                    <Carousel
                        className="relative w-full h-full"
                        opts={{ loop: false }}
                        setApi={setMainApi}
                    >
                        <CarouselContent>
                            {spots && spots.length > 0 ? (
                                spots.map((item: any, idx: number) => (
                                    <CarouselItem key={idx} className="px-2 lg:pl-4">
                                        {/* Aspect ratio container to prevent CLS */}
                                        <div className="relative w-full aspect-[5/4] bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-95 transition-opacity" onClick={() => setShow3D(true)}>
                                            <NextImage
                                                src={item.url}
                                                fill
                                                alt={`Product image ${idx + 1}`}
                                                className="rounded-lg object-cover"
                                                priority={idx === 0}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 800px"
                                            />

                                            {/* Image Count Indicator Badge - Premium Design */}
                                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium tracking-wide flex items-center gap-1.5 z-50 shadow-lg border border-white/20 transition-all">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                                <span>{idx + 1} / {spots.length}</span>
                                            </div>

                                            {/* TRY ON Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowTryOn(true);
                                                }}
                                                className="absolute bottom-4 right-4 bg-white hover:bg-gray-50 text-purple-600 font-semibold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 transition-all hover:shadow-xl z-20"
                                            >
                                                <Sparkles size={18} />
                                                TRY ON
                                            </button>
                                        </div>
                                    </CarouselItem>
                                ))
                            ) : (
                                <CarouselItem>
                                    <div className="w-full h-[300px] lg:h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
                                        <p className="text-gray-500 text-lg">Không có ảnh sản phẩm</p>
                                    </div>
                                </CarouselItem>
                            )}
                        </CarouselContent>
                    </Carousel>
                ) : (
                    // 3D MODE - Panorama viewer in same carousel container
                    <div className="relative w-full h-[300px] lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                        {/* Pannellum container */}
                        <div
                            ref={panoramaRef}
                            className="absolute inset-0"
                            style={{ width: "100%", height: "100%" }}
                        />

                        {/* Mini Floor Plan — góc trên trái */}
                        {currentSpot && (
                            <button
                                onClick={() => setShowFloorModal(true)}
                                className="absolute top-4 left-4 z-20 bg-white/90 hover:bg-white p-2 rounded-lg border border-gray-300 transition-all shadow-md"
                                title="Sơ đồ tầng / Mô hình 3D"
                            >
                                <div className="relative w-[60px] h-[60px] rounded-md overflow-hidden">
                                    <NextImage
                                        src={floorPlanImage}
                                        fill
                                        alt="mini map"
                                        className="object-contain"
                                        loading="lazy"
                                        sizes="60px"
                                    />
                                    {/* Chấm đỏ vị trí hiện tại */}
                                    <div
                                        className="absolute z-10 w-2 h-2 bg-red-500 rounded-full border border-white shadow-sm"
                                        style={{
                                            left: `${currentSpot.floorPlanX}%`,
                                            top: `${currentSpot.floorPlanY}%`,
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    />
                                </div>
                            </button>
                        )}

                        {/* View 3D Button - hidden in 3D mode, use Back button instead */}
                        <button
                            onClick={() => setShow3D(false)}
                            className="absolute bottom-4 left-4 bg-white hover:bg-gray-50 text-purple-600 font-semibold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 transition-all hover:shadow-xl z-20"
                        >
                            <X size={18} />
                            Back
                        </button>

                        {/* Room selector tabs */}
                        <div className="absolute bottom-4 left-20 right-4 z-20 flex gap-2 overflow-x-auto max-w-[calc(100%-120px)]">
                            {spots?.map(spot => (
                                <button
                                    key={spot.id}
                                    onClick={() => switchSpot(spot.id)}
                                    className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all border ${activeSpotId === spot.id
                                        ? "bg-purple-600 text-white border-purple-500"
                                        : "bg-white/80 text-gray-700 border-gray-300 hover:bg-white"
                                        }`}
                                >
                                    {spot.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Thumbnail vertical column - ALWAYS SHOW */}
                <div className="hidden md:flex flex-col gap-2 w-16 md:w-24 xl:w-40 flex-shrink-0">
                    {/* Header hiển thị tổng số hình ảnh cực kỳ trực quan ở bên trái */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg py-2 px-2 text-center shadow-sm">
                        <span className="text-xs font-bold text-[#ff4e00]">📸 Tổng: {spots?.length || 0} hình</span>
                    </div>

                    <Carousel
                        opts={{ align: "start", startIndex: activeIndex }}
                        orientation="vertical"
                        className="w-full"
                        setApi={setThumbApi}
                    >
                        <CarouselContent className="gap-2.5 max-h-[520px] pr-1">
                            {spots && spots.length > 0 ? (
                                spots.map((item: any, idx: number) => (
                                    <CarouselItem
                                        key={idx}
                                        className={`basis-auto cursor-pointer transition-all ${activeIndex === idx || activeSpotId === item.id ? 'ring-2 ring-[#ff4e00] rounded-lg' : 'opacity-60 hover:opacity-100'}`}
                                        onClick={() => {
                                            handleThumbnailClick(idx);
                                            if (show3D) switchSpot(item.id);
                                        }}
                                    >
                                        {/* Aspect ratio container */}
                                        <div className="relative w-full h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                            <NextImage
                                                src={item.url}
                                                fill
                                                alt={`Thumbnail ${idx + 1}`}
                                                className="object-cover"
                                                loading="lazy"
                                                sizes="160px"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))
                            ) : (
                                <CarouselItem>
                                    <div className="w-full h-[150px] bg-gray-200 rounded-lg" />
                                </CarouselItem>
                            )}
                        </CarouselContent>
                    </Carousel>
                </div>

                {/* Virtual Try On Modal */}
                {showTryOn && createPortal(
                    <div className="fixed inset-0 bg-black/10 flex items-center justify-center" style={{ zIndex: 999999 }}>
                        <div className="absolute inset-0" onClick={() => setShowTryOn(false)}></div>
                        <div className="max-h-[90vh] overflow-y-auto relative w-full rounded-xl shadow-2xl" style={{ zIndex: 1000000 }}>
                            <VirtualTryOnModal onClose={() => setShowTryOn(false)} />
                        </div>
                    </div>,
                    document.body
                )}

                {/* Floor Plan Modal */}
                {showFloorModal && createPortal(
                    <div className="fixed inset-0 z-[99998] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="absolute inset-0" onClick={() => setShowFloorModal(false)} />
                        <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-300 w-full max-w-2xl mx-4 overflow-hidden">

                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
                                <div className="flex gap-1 rounded-lg">
                                    <button
                                        onClick={() => setFloorModalTab("floorplan")}
                                        className={`px-5 py-2 rounded-lg text-sm font-medium transition ${floorModalTab === "floorplan" ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        Sơ đồ tầng
                                    </button>
                                    <button
                                        onClick={() => setFloorModalTab("3d")}
                                        className={`px-5 py-2 rounded-lg text-sm font-medium transition ${floorModalTab === "3d" ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        Mô hình 3D
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowFloorModal(false)}
                                    className="text-gray-500 hover:text-gray-700 transition p-1.5 rounded-lg hover:bg-gray-200"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-5">
                                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
                                    <NextImage
                                        src={floorModalTab === "3d" && floorPlan3DImage ? floorPlan3DImage : floorPlanImage}
                                        fill
                                        alt={floorModalTab === "3d" ? "3D Model" : "Floor Plan"}
                                        className="object-contain"
                                        loading="lazy"
                                        sizes="(max-width: 768px) 90vw, 600px"
                                    />
                                    {/* Floor plan hotspots */}
                                    {floorModalTab === "floorplan" && spots?.map(spot => (
                                        <button
                                            key={spot.id}
                                            onClick={() => handleFloorSpotClick(spot.id)}
                                            title={spot.name}
                                            style={{
                                                position: "absolute",
                                                left: `${spot.floorPlanX}%`,
                                                top: `${spot.floorPlanY}%`,
                                                transform: "translate(-50%, -50%)",
                                            }}
                                            className="group flex flex-col items-center z-10"
                                        >
                                            <span className={`flex items-center justify-center w-5 h-5 rounded-full border-2 border-white shadow-lg transition-transform group-hover:scale-125 ${spot.id === activeSpotId ? "bg-red-500" : "bg-purple-500"}`}>
                                                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                            </span>
                                            <span className="mt-1 px-2 py-0.5 bg-black/80 text-white text-[10px] font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                                                {spot.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Room list below modal */}
                                <div className="flex gap-2 mt-4 flex-wrap">
                                    {spots?.map(spot => (
                                        <button
                                            key={spot.id}
                                            onClick={() => handleFloorSpotClick(spot.id)}
                                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${spot.id === activeSpotId
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                }`}
                                        >
                                            {spot.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </>
    );
}