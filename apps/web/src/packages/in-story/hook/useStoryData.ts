"use client";

export interface Product {
  id: string;
  handle: string; // Tên URL thân thiện
  name: string;
  price: number;
  originalPrice?: number;
  images: string[]; // Mảng hình ảnh sản phẩm
  thumbnail_logo: string; // Logo thương hiệu nhỏ
}

export interface Story {
  id: string;
  thumbnail_poster: string; // Hình ảnh tĩnh đại diện cho video (poster)
  videoUrl: string; // Link video dạng mp4
  product: Product;
}

// Dữ liệu mẫu (Sử dụng hình ảnh từ ảnh bạn gửi và link video thực tế)
// Dữ liệu mẫu với ẢNH VÀ VIDEO THẬT 100% (Từ Unsplash và Pexels)
const MOCK_STORIES: Story[] = [
  {
    id: "s1",
    thumbnail_poster: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&q=80",
    videoUrl: "https://videos.pexels.com/video-files/5309381/5309381-uhd_1440_2560_25fps.mp4",
    product: {
      id: "story_prod_1",
      handle: "blink-182-world-tour-poster",
      name: "B.lin.k 182 World Tour Poster",
      price: 12.95,
      originalPrice: 19.99,
      images: [
        "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&q=80"
      ], 
      thumbnail_logo: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=150&q=80"
    },
  },
  {
    id: "s2",
    thumbnail_poster: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80",
    videoUrl: "https://videos.pexels.com/video-files/4453258/4453258-uhd_1440_2560_25fps.mp4",
    product: {
      id: "story_prod_2",
      handle: "boys-like-girls-soundtrack-tour-poster",
      name: "Boys Like Girls The Soundtrack of Your Life Tour Poster",
      price: 12.95,
      originalPrice: 19.99,
      images: [
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80"
      ],
      thumbnail_logo: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&q=80" 
    },
  },
  {
    id: "s3",
    thumbnail_poster: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    videoUrl: "https://videos.pexels.com/video-files/7688533/7688533-uhd_1440_2560_30fps.mp4",
    product: {
      id: "story_prod_3",
      handle: "acf-tshirt",
      name: "ACF T-Shirt",
      price: 14.95,
      originalPrice: 22.50,
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
      ],
      thumbnail_logo: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&q=80"
    },
  },
  {
    id: "s4",
    thumbnail_poster: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    videoUrl: "https://videos.pexels.com/video-files/6561284/6561284-uhd_1440_2560_24fps.mp4",
    product: {
      id: "story_prod_4",
      handle: "minecraft-bee-and-flower-hoodie",
      name: "Minecraft Bee And Flower Hoodie",
      price: 27.95,
      originalPrice: 39.99,
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
      ],
      thumbnail_logo: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&q=80"
    },
  },
  {
    id: "s5",
    thumbnail_poster: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    videoUrl: "https://videos.pexels.com/video-files/5896379/5896379-hd_1080_1920_24fps.mp4",
    product: {
      id: "story_prod_5",
      handle: "all-time-low-tour-poster",
      name: "All Time Low Tour Poster",
      price: 12.95,
      originalPrice: 19.99,
      images: [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80"
      ],
      thumbnail_logo: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=150&q=80"
    },
  },
];

export function useStoryData() {
  return {
    stories: MOCK_STORIES,
    isLoading: false,
  };
}

