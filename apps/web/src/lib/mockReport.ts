/**
 * Mock dữ liệu báo cáo/hợp đồng với 20 trang
 * Sử dụng placeholder images hoặc images thực tế
 */

export interface ReportData {
  id: string;
  title: string;
  rating: number;
  views: number;
  downloads: number;
  price: number;
  pages: Array<{
    id: string;
    pageNum: number;
    thumbnail: string;
    fullImage: string;
    title?: string;
  }>;
}

// Hợp đồng thị công xây dựng công trình dân dụng
export const contractReport: ReportData = {
  id: "contract-1",
  title: "Hợp đồng thị công xây dựng công trình dân dụng",
  rating: 4.7,
  views: 50600,
  downloads: 278,
  price: 110000,
  pages: Array.from({ length: 20 }, (_, i) => ({
    id: `page-${i + 1}`,
    pageNum: i + 1,
    // Sử dụng placeholder image từ placehold.co hoặc Unsplash
    thumbnail: `https://placehold.co/200x280/f0f0f0/333333?text=Trang+${i + 1}`,
    fullImage: `https://placehold.co/600x800/ffffff/333333?text=Hợp+Đồng+-+Trang+${i + 1}`,
  })),
};

// Ví dụ: Báo cáo khác (có thể thêm vào)
export const sampleReportList: ReportData[] = [
  contractReport,
  {
    id: "report-2",
    title: "Báo cáo thẩm dò địa chất",
    rating: 4.5,
    views: 32100,
    downloads: 145,
    price: 150000,
    pages: Array.from({ length: 15 }, (_, i) => ({
      id: `report2-page-${i + 1}`,
      pageNum: i + 1,
      thumbnail: `https://placehold.co/200x280/e8f5e9/2e7d32?text=Báo+cáo+${i + 1}`,
      fullImage: `https://placehold.co/600x800/c8e6c9/1b5e20?text=Báo+Cáo+-+Trang+${i + 1}`,
    })),
  },
  {
    id: "report-3",
    title: "Hợp đồng bảo hiểm xây dựng công trình",
    rating: 4.8,
    views: 78900,
    downloads: 356,
    price: 95000,
    pages: Array.from({ length: 12 }, (_, i) => ({
      id: `report3-page-${i + 1}`,
      pageNum: i + 1,
      thumbnail: `https://placehold.co/200x280/ede7f6/512da8?text=Bảo+hiểm+${i + 1}`,
      fullImage: `https://placehold.co/600x800/d1c4e9/311b92?text=Bảo+Hiểm+-+Trang+${i + 1}`,
    })),
  },
];

/**
 * Tạo báo cáo động với số trang tùy ý
 * @param title - Tiêu đề báo cáo
 * @param pageCount - Số trang
 * @param baseColor - Màu nền (hex), ví dụ: "ff7a00"
 */
export function createCustomReport(
  title: string,
  pageCount: number = 20,
  baseColor: string = "4a90e2"
): ReportData {
  return {
    id: `custom-report-${Date.now()}`,
    title,
    rating: 4.5 + Math.random() * 0.5,
    views: Math.floor(Math.random() * 100000),
    downloads: Math.floor(Math.random() * 500),
    price: 100000 + Math.floor(Math.random() * 100000),
    pages: Array.from({ length: pageCount }, (_, i) => ({
      id: `page-${i + 1}`,
      pageNum: i + 1,
      thumbnail: `https://placehold.co/200x280/${baseColor}/ffffff?text=Trang+${i + 1}`,
      fullImage: `https://placehold.co/600x800/${baseColor}/ffffff?text=${encodeURIComponent(title)}+-+Trang+${i + 1}`,
      title: `${title} - Trang ${i + 1}`,
    })),
  };
}

/**
 * Ví dụ sử dụng với real images từ Unsplash
 * (Thay thế URLs phía trên bằng URLs thực tế)
 */
export const contractReportWithRealImages: ReportData = {
  ...contractReport,
  pages: [
    {
      id: "page-cover",
      pageNum: 1,
      thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&h=400&fit=crop",
      fullImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=1067&fit=crop",
      title: "Bìa Hợp Đồng",
    },
    // Thêm các trang khác...
    ...Array.from({ length: 19 }, (_, i) => ({
      id: `page-${i + 2}`,
      pageNum: i + 2,
      thumbnail: `https://placehold.co/200x280/f0f0f0/333333?text=Trang+${i + 2}`,
      fullImage: `https://placehold.co/600x800/ffffff/333333?text=Hợp+Đồng+-+Trang+${i + 2}`,
    })),
  ],
};
