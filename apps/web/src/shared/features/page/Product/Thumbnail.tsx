"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import type { CarouselApi } from "@/shared/ui/carousel"
import { CustomizationCanvasRenderer } from "@/packages/customization"
import { Sparkles } from "lucide-react"
import { VirtualTryOnModal } from "@/packages/tryon";

const Thumbnail = ({ product, customDesign, customTemplate, customElements }: { product: any; customDesign?: any; customTemplate?: any; customElements?: any[] }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [mainApi, setMainApi] = useState<CarouselApi>()
    const [thumbApi, setThumbApi] = useState<CarouselApi>()
    const [showTryOn, setShowTryOn] = useState(false)
    const svgContainerRef = useRef<HTMLDivElement>(null)

    // Thêm state mounted để tránh lỗi Hydration của Next.js khi dùng Portal
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Render customization preview khi có customDesign
    useEffect(() => {
        if (customDesign && customTemplate && customElements && customElements.length > 0 && svgContainerRef.current) {
            try {
                console.log('[Thumbnail] Rendering customization with elements:', customElements.map(el => ({ id: el.element_id, type: el.type, text: el.config?.text })));

                // Use template dimensions for proper SVG scaling
                const renderer = new CustomizationCanvasRenderer(
                    customTemplate.canvas_width || 800,
                    customTemplate.canvas_height || 600
                )

                const svgHtml = renderer.renderSVG(customElements);

                if (svgContainerRef.current) {
                    svgContainerRef.current.innerHTML = svgHtml;

                    const svgElement = svgContainerRef.current.querySelector('svg');
                    if (svgElement) {
                        svgElement.setAttribute('style', `
                            width: 100% !important;
                            height: 100% !important;
                            background: transparent !important;
                            position: absolute;
                            top: 0;
                            left: 0;
                        `);
                    }
                }
            } catch (error) {
                console.error('Error rendering customization preview:', error)
            }
        }
    }, [customDesign, customTemplate, customElements])

    // Đồng bộ activeIndex khi carousel chính thay đổi
    useEffect(() => {
        if (!mainApi) return

        const onSelect = () => {
            const currentIndex = mainApi.selectedScrollSnap()
            setActiveIndex(currentIndex)
        }

        mainApi.on("select", onSelect)

        return () => {
            mainApi.off("select", onSelect)
        }
    }, [mainApi])

    // Scroll thumbnail carousel khi activeIndex thay đổi
    useEffect(() => {
        if (!thumbApi) return
        thumbApi.scrollTo(activeIndex)
    }, [activeIndex, thumbApi])

    const handleThumbnailClick = (idx: number) => {
        setActiveIndex(idx)
        mainApi?.scrollTo(idx)
    }

    return (
        <div className="flex sm:gap-3 items-stretch flex-col md:flex-row-reverse p-2">
            {/* Carousel chính */}
            <Carousel
                className="relative w-full h-full"
                opts={{ loop: false }}
                setApi={setMainApi}
            >
                <CarouselContent >
                    {product?.images && product.images.length > 0 ? (
                        product.images.map((item: any, idx: number) => (
                            <CarouselItem key={idx} className="px-2 lg:pl-4">
                                {/* Aspect ratio container to prevent CLS */}
                                <div className="relative w-full aspect-[5/4] bg-gray-100 rounded-lg overflow-hidden">
                                    {/* Ảnh sản phẩm gốc */}
                                    <Image
                                        src={item.url}
                                        fill
                                        alt={`Product image ${idx + 1}`}
                                        className="object-cover"
                                        priority={idx === 0}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 800px"
                                    />

                                    {/* Image Count Indicator Badge - Premium Design */}
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium tracking-wide flex items-center gap-1.5 z-50 shadow-lg border border-white/20 transition-all">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span>{idx + 1} / {product.images.length}</span>
                                    </div>

                                    {/* TRY ON Button - Bottom Left Corner */}
                                    <button
                                        onClick={() => setShowTryOn(true)}
                                        className="absolute bottom-4 left-4 bg-white hover:bg-gray-50 text-purple-600 font-semibold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 transition-all hover:shadow-xl z-20"
                                    >
                                        <Sparkles size={18} />
                                        TRY ON
                                    </button>

                                    {/* Customization preview (chồng lên ảnh) */}
                                    {customDesign && customElements && customElements.length > 0 && (
                                        <div
                                            ref={svgContainerRef}
                                            className="absolute inset-0 rounded-lg"
                                            style={{
                                                zIndex: 10,
                                                overflow: 'hidden',
                                                background: 'transparent'
                                            }}
                                        />
                                    )}
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
                {product?.images && product.images.length > 1 && (
                    <>
                        <CarouselPrevious className="left-6 z-20 bg-white/80 hover:bg-white text-gray-800 border-none shadow-md hidden sm:flex" />
                        <CarouselNext className="right-6 z-20 bg-white/80 hover:bg-white text-gray-800 border-none shadow-md hidden sm:flex" />
                    </>
                )}
            </Carousel>

            <div className="flex bg-[#ff4e00] md:hidden">
                <Image src={'/assets/early-bird.webp'} width={64} height={64} alt="Early Bird" className="bg-[#fd0] skew-x-12 relative -left-1.5" />
                <div className="flex gap-4 items-center justify-center px-2 text-white text-xs">
                    <div className="flex gap-2 items-center">
                        <Image src={'/assets/verified_6764458.png'} width={20} height={20} alt="Fire Icon" />
                        <span>Fast delivery</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Image src={'/assets/verified_6764458.png'} width={20} height={20} alt="Fire Icon" />
                        <span>$5.00 credit for late delivery</span>
                    </div>
                </div>
            </div>

            {/* Thumbnail vertical column (bên trái trên Desktop/Laptop) */}
            <div className="hidden md:flex flex-col gap-2 w-16 md:w-24 xl:w-40 flex-shrink-0">
                {/* Header hiển thị tổng số hình ảnh cực kỳ trực quan ở bên trái */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg py-2 px-2 text-center shadow-sm">
                    <span className="text-xs font-bold text-[#ff4e00]">📸 Tổng: {product?.images?.length || 0} hình</span>
                </div>

                <Carousel
                    opts={{ align: "start", startIndex: activeIndex }}
                    orientation="vertical"
                    className="w-full"
                    setApi={setThumbApi}
                >
                    <CarouselContent className="gap-2.5 max-h-[520px] pr-1">
                        {product?.images && product.images.length > 0 ? (
                            product.images.map((item: any, idx: number) => (
                                <CarouselItem
                                    key={idx}
                                    className={`basis-auto cursor-pointer transition-all ${activeIndex === idx ? 'ring-2 ring-[#ff4e00] rounded-lg' : 'opacity-60 hover:opacity-100'}`}
                                    onClick={() => handleThumbnailClick(idx)}
                                >
                                    {/* Aspect ratio container */}
                                    <div className="relative w-full h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                        <Image
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

            {/* Virtual Try On Modal sử dụng Portal để nổi lên trên cùng */}
            {showTryOn && mounted && createPortal(
                <div className="fixed inset-0 bg-black/10 flex items-center justify-center " style={{ zIndex: 999999 }}>
                    {/* Bấm vào nền đen bên ngoài để đóng modal */}
                    <div className="absolute inset-0" onClick={() => setShowTryOn(false)}></div>

                    <div className="max-h-[90vh] overflow-y-auto relative w-full rounded-xl shadow-2xl" style={{ zIndex: 1000000 }}>
                        <VirtualTryOnModal onClose={() => setShowTryOn(false)} />
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}

export default Thumbnail;



