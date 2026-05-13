"use client";
import Thumbnail from "./Thumbnail";
import VirtualTour from "./VirtualTourImg";
import ReportViewer from "./ReportViewer";

// Props for Home products (VirtualTour)
interface Spot {
    id: string;
    name: string;
    url: string;
    panoramaUrl: string;
    thumbnailUrl?: string;
    floorPlanX: number;
    floorPlanY: number;
}

// Props for Report products
interface ReportPage {
    id: string;
    pageNum: number;
    thumbnail: string;
    fullImage: string;
    title?: string;
}

// Unified ImageViewer Props
interface ImageViewerProps {
    productType: "home" | "fashion" | "report"; // 'home' = nhà nội thất, 'fashion' = quần áo, 'report' = báo cáo
    product?: any; // For fashion products
    spots?: Spot[]; // For home products
    floorPlanImage?: string; // For home products
    floorPlan3DImage?: string; // For home products
    reportPages?: ReportPage[]; // For report products
    reportTitle?: string; // For report products
    reportRating?: number;
    reportViews?: number;
    reportDownloads?: number;
    reportPrice?: number;
    customDesign?: any;
    customTemplate?: any;
    customElements?: any[];
}

/**
 * ImageViewer - Wrapper component để lựa chọn hiển thị component phù hợp
 * dựa vào loại sản phẩm (nhà nội thất vs quần áo vs báo cáo)
 */
export default function ImageViewer({
    productType,
    product,
    spots,
    floorPlanImage,
    floorPlan3DImage,
    reportPages,
    reportTitle,
    reportRating,
    reportViews,
    reportDownloads,
    reportPrice,
    customDesign,
    customTemplate,
    customElements,
}: ImageViewerProps) {
    // Nếu là sản phẩm nhà nội thất → hiển thị VirtualTour (360° panorama)
    if (productType === "home" && spots) {
        return (
            <VirtualTour
                spots={spots}
                floorPlanImage={floorPlanImage || ""}
                floorPlan3DImage={floorPlan3DImage}
                customDesign={customDesign}
                customTemplate={customTemplate}
                customElements={customElements}
            />
        );
    }

    // Nếu là báo cáo → hiển thị ReportViewer
    if (productType === "report" && reportPages && reportPages.length > 0) {
        return (
            <ReportViewer
                title={reportTitle || "Báo cáo"}
                pages={reportPages}
                rating={reportRating}
                views={reportViews}
                downloads={reportDownloads}
                price={reportPrice}
            />
        );
    }

    // Nếu là sản phẩm thời trang → hiển thị Thumbnail (carousel)
    if (productType === "fashion" && product) {
        return (
            <Thumbnail
                product={product}
                customDesign={customDesign}
                customTemplate={customTemplate}
                customElements={customElements}
            />
        );
    }

    // Fallback: hiển thị carousel mặc định
    return (
        <Thumbnail
            product={product}
            customDesign={customDesign}
            customTemplate={customTemplate}
            customElements={customElements}
        />
    );
}
