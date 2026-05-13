// src/lib/mockProduct.ts

import { mockCoupleTemplate } from '@/packages/customization/mockData';
import Fuse from 'fuse.js';

// ==================== SELLER DATA ====================
export const MOCK_SELLERS = [
  {
    id: "seller_1",
    name: "Gift Idea",
    avatar: "https://i.pravatar.cc/150?u=giftidea",
    followerCount: 155,
    favoriteCount: 56,
    rating: 4.7,
  },
  {
    id: "seller_2",
    name: "Drive Devotion",
    avatar: "https://i.pravatar.cc/150?u=drivedevotion",
    followerCount: 226,
    favoriteCount: 1,
    rating: 4.4,
  },
  {
    id: "seller_3",
    name: "Retro Vibes",
    avatar: "https://i.pravatar.cc/150?u=retrovibes",
    followerCount: 89,
    favoriteCount: 23,
    rating: 4.9,
  },
  {
    id: "seller_4",
    name: "Paw & Love Pet Shop",
    avatar: "https://i.pravatar.cc/150?u=pawlove",
    followerCount: 342,
    favoriteCount: 128,
    rating: 4.8,
  },
];

export const MOCK_PRODUCTS_DATABASE = [
  {
    id: "p1",
    sellerId: "seller_1",
    seller: MOCK_SELLERS[0],
    handle: "custom-comfort-colors-tee",
    title: "Custom Comfort Colors Tee",
    description: "Áo thun cao cấp dòng Comfort Colors, cotton mềm mại, màu sắc vintage.",
    category: "t-shirt",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      images: [
        {
          id: "scene-1",
          name: "Living Room",
          url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
          panoramaUrl: "https://pannellum.org/images/alma.jpg",
          floorPlanX: 30,
          floorPlanY: 25
        },
        {
          id: "scene-2",
          name: "Bedroom",
          url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
          panoramaUrl: "https://pannellum.org/images/alma.jpg",
          floorPlanX: 70,
          floorPlanY: 45
        },
        {
          id: "scene-3",
          name: "Kitchen",
          url: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
          panoramaUrl: "https://pannellum.org/images/alma.jpg",
          floorPlanX: 50,
          floorPlanY: 70
        }
      ],
    variants: [
      { id: "v1-1", title: "White / M", calculated_price: { calculated_amount: 1495, original_amount: 2990 }, options: [{ value: "White" }, { value: "Heavyweight T-shirt" }, { value: "M" }] },
      { id: "v1-2", title: "Black / L", calculated_price: { calculated_amount: 1495, original_amount: 2990 }, options: [{ value: "Black" }, { value: "Heavyweight T-shirt" }, { value: "L" }] },
      { id: "v1-3", title: "Navy / XL", calculated_price: { calculated_amount: 1495, original_amount: 2990 }, options: [{ value: "Navy" }, { value: "Premium T-shirt" }, { value: "XL" }] },
    ],
    options: [
      {
        title: "Color",
        values: [
          { id: "c1", value: "Black" },
          { id: "c2", value: "White" },
          { id: "c3", value: "Navy" },
          { id: "c4", value: "Red" },
          { id: "c5", value: "Dark Gray" },
          { id: "c6", value: "Blue" },
          { id: "c7", value: "Light Blue" },
        ]
      },
      {
        title: "Style",
        values: [
          { id: "st1", value: "Heavyweight T-shirt" },
          { id: "st2", value: "Premium T-shirt" },
          { id: "st3", value: "Classic Fit" },
        ]
      },
      {
        title: "Size",
        values: [
          { id: "s1", value: "S" },
          { id: "s2", value: "M" },
          { id: "s3", value: "L" },
          { id: "s4", value: "XL" },
          { id: "s5", value: "2XL" },
        ]
      }
    ],
    weight: 200,
    created_at: "2026-03-01T00:00:00Z",
    print_locations: ["Front", "Back"],
    print_additional_prices: { Back: 2.00 },
    default_print_position: "Front",
    metadata: { supports_customization: true, customization_type: "tee-male-only" },
    product_builder: { complementary_products: [] }
  },
  {
    id: "p2",
    sellerId: "seller_2",
    seller: MOCK_SELLERS[1],
    handle: "bonecrusher-skull-hoodie",
    title: "Bonecrusher Skull Hoodie",
    description: "Áo hoodie in hình Bonecrusher Skull độc đáo, nỉ bông dày dặn.",
    category: "hoodie",
    thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
images: [
  {
    id: "alma",
    name: "Observatory",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80",
    panoramaUrl: "https://pannellum.org/images/alma.jpg",
    floorPlanX: 25,   // % vị trí X trên bản đồ
    floorPlanY: 35    // % vị trí Y trên bản đồ
  },
  {
    id: "museum",
    name: "Museum Hall",
    url: "https://images.unsplash.com/photo-1518991791750-749df6b1f4b2?w=400&q=80",
    panoramaUrl: "https://pannellum.org/images/bma-1.jpg",
    floorPlanX: 55,
    floorPlanY: 45
  },
  {
    id: "mountain",
    name: "Mountain View",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80",
    panoramaUrl: "https://pannellum.org/images/cerro-toco-0.jpg",
    floorPlanX: 75,
    floorPlanY: 65
  },
  {
    id: "airport",
    name: "Airport",
    url: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&q=80",
    panoramaUrl: "https://pannellum.org/images/jfk.jpg",
    floorPlanX: 40,
    floorPlanY: 20
  }
],
    variants: [
      { id: "v2-1", title: "Black / L", calculated_price: { calculated_amount: 2500, original_amount: 5000 }, options: [{ value: "Black" }, { value: "Pullover" }, { value: "L" }] },
      { id: "v2-2", title: "Grey / M", calculated_price: { calculated_amount: 2500, original_amount: 5000 }, options: [{ value: "Grey" }, { value: "Zip-Up" }, { value: "M" }] },
    ],
    options: [
      {
        title: "Color",
        values: [
          { id: "c2-1", value: "Black" },
          { id: "c2-2", value: "Grey" },
          { id: "c2-3", value: "Maroon" },
        ]
      },
      {
        title: "Style",
        values: [
          { id: "st2-1", value: "Pullover" },
          { id: "st2-2", value: "Zip-Up" },
        ]
      },
      {
        title: "Size",
        values: [
          { id: "sz1", value: "M" },
          { id: "sz2", value: "L" },
          { id: "sz3", value: "XL" },
        ]
      }
    ],
    weight: 500,
    created_at: "2026-03-02T00:00:00Z",
    print_locations: ["Front", "Back"],
    print_additional_prices: { Back: 2.00 },
    default_print_position: "Front",
    metadata: { supports_customization: false },
    product_builder: { complementary_products: [] }
  },
  {
    id: "p3",
    sellerId: "seller_3",
    seller: MOCK_SELLERS[2],
    handle: "takayasu-akira-tanktop",
    title: "Takayasu Akira Tanktop",
    category: "tanktop",
    description: "Áo ba lỗ thoáng mát phong cách Sumo Nhật Bản.",
    thumbnail: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
    images: [{ url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80" }],
    variants: [
      { id: "v3", title: "Blue / M", calculated_price: { calculated_amount: 1250, original_amount: 2500 }, options: [{ value: "Blue" }, { value: "Standard" }, { value: "M" }] }
    ],
    options: [
      {
        title: "Color",
        values: [
          { id: "c3-1", value: "Blue" },
          { id: "c3-2", value: "White" },
          { id: "c3-3", value: "Yellow" },
        ]
      },
      {
        title: "Style",
        values: [
          { id: "st3-1", value: "Standard" },
          { id: "st3-2", value: "Athletic" },
        ]
      },
      {
        title: "Size",
        values: [
          { id: "sz-s", value: "S" },
          { id: "sz-m", value: "M" },
          { id: "sz-l", value: "L" },
        ]
      }
    ],
    weight: 150,
    created_at: "2026-03-03T00:00:00Z",
    print_locations: ["Front"],
    print_additional_prices: {},
    default_print_position: "Front",
    metadata: { supports_customization: false },
    product_builder: { complementary_products: [] }
  },
  {
    id: "p4",
    sellerId: "seller_1",
    seller: MOCK_SELLERS[0],
    handle: "annie-musical-hoodie",
    title: "Annie Musical Hoodie",
    category: "hoodie",
    description: "Áo hoodie in chữ Annie nổi bật.",
    thumbnail: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
    images: [{ url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80" }],
    variants: [
      { id: "v4", title: "Navy / L", calculated_price: { calculated_amount: 2100, original_amount: 3500 }, options: [{ value: "Navy" }, { value: "Pullover" }, { value: "L" }] }
    ],
    options: [
      {
        title: "Color",
        values: [
          { id: "c4-1", value: "Navy" },
          { id: "c4-2", value: "Black" },
        ]
      },
      {
        title: "Style",
        values: [
          { id: "st4-1", value: "Pullover" },
          { id: "st4-2", value: "Zip-Up" },
        ]
      },
      {
        title: "Size",
        values: [
          { id: "s4-1", value: "L" },
          { id: "s4-2", value: "XL" },
        ]
      }
    ],
    weight: 550,
    created_at: "2026-03-04T00:00:00Z",
    print_locations: ["Front", "Back"],
    print_additional_prices: { Back: 2.00 },
    default_print_position: "Front",
    metadata: { supports_customization: false },
    product_builder: { complementary_products: [] }
  },
  {
    id: "p5",
    sellerId: "seller_2",
    seller: MOCK_SELLERS[2],

    handle: "mike-gift-tshirt",
    category: "t-shirt",
    title: "MIKE Gift T-Shirt",
    description: "Chiếc áo hoàn hảo cho người tên Mike.",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" }],
    variants: [
      { id: "v-p5-1", title: "Blue / S", calculated_price: { calculated_amount: 1500, original_amount: 3000 }, options: [{ value: "Blue" }, { value: "Classic Fit" }, { value: "S" }] },
      { id: "v-p5-2", title: "Red / M", calculated_price: { calculated_amount: 1500, original_amount: 3000 }, options: [{ value: "Red" }, { value: "Classic Fit" }, { value: "M" }] },
    ],
    options: [
      {
        title: "Color",
        values: [
          { id: "color-blue", value: "Blue" },
          { id: "c-red", value: "Red" },
          { id: "c-green", value: "Green" },
        ]
      },
      {
        title: "Style",
        values: [
          { id: "st5-1", value: "Classic Fit" },
          { id: "st5-2", value: "Slim Fit" },
        ]
      },
      {
        title: "Size",
        values: [
          { id: "size-s", value: "S" },
          { id: "size-m", value: "M" },
          { id: "size-l", value: "L" },
        ]
      }
    ],
    weight: 200,
    created_at: "2026-03-05T00:00:00Z",
    print_locations: ["Front", "Back", "Left Sleeve"],
    print_additional_prices: { Back: 2.00, "Left Sleeve": 1.50 },
    default_print_position: "Front",
    metadata: { supports_customization: true },
    product_builder: { complementary_products: [] }
  },
  {
    id: "p6",
    sellerId: "seller_3",
    seller: MOCK_SELLERS[2],
    handle: "retro-camera-tee",
    title: "Retro Camera Tee",
    category: "t-shirt",
    thumbnail: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549843/1-4-0b4972d89ec0ee9d5581a977a5971f952_ihw0rm.jpg",
    images: [{ url: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549843/1-4-0b4972d89ec0ee9d5581a977a5971f952_ihw0rm.jpg" }],
    variants: [
      { id: "v6", title: "Grey / M", calculated_price: { calculated_amount: 1600, original_amount: 3200 }, options: [{ value: "Grey" }, { value: "Classic Fit" }, { value: "M" }] }
    ],
    options: [
      { title: "Color", values: [{ id: "c6-1", value: "Grey" }, { id: "c6-2", value: "Sand" }] },
      { title: "Style", values: [{ id: "st6-1", value: "Classic Fit" }] },
      { title: "Size", values: [{ id: "s6-1", value: "S" }, { id: "s6-2", value: "M" }, { id: "s6-3", value: "L" }] }
    ],
    weight: 200,
    created_at: "2026-03-06T00:00:00Z",
    print_locations: ["Front"],
    print_additional_prices: {},
    default_print_position: "Front",
    metadata: { supports_customization: false },
    product_builder: { complementary_products: [] }
  },
  {
    id: "p7",
    sellerId: "seller_3",
    seller: MOCK_SELLERS[2],
    handle: "8bit-gamer-hoodie",
    title: "8-Bit Gamer Hoodie",
    category: "hoodie",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    images: [{ url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80" }],
    variants: [
      { id: "v7", title: "Black / XL", calculated_price: { calculated_amount: 3000, original_amount: 6000 }, options: [{ value: "Black" }, { value: "Pullover" }, { value: "XL" }] }
    ],
    options: [
      { title: "Color", values: [{ id: "c7-1", value: "Black" }, { id: "c7-2", value: "Purple" }] },
      { title: "Style", values: [{ id: "st7-1", value: "Pullover" }, { id: "st7-2", value: "Zip-Up" }] },
      { title: "Size", values: [{ id: "s7-1", value: "M" }, { id: "s7-2", value: "L" }, { id: "s7-3", value: "XL" }, { id: "s7-4", value: "2XL" }] }
    ],
    weight: 600,
    created_at: "2026-03-07T00:00:00Z",
    print_locations: ["Front", "Back"],
    print_additional_prices: { Back: 2.00 },
    default_print_position: "Front",
    metadata: { supports_customization: false },
    product_builder: { complementary_products: [] }
  },
  {
    id: "p8",
    sellerId: "seller_1",
    seller: MOCK_SELLERS[0],

    handle: "mountain-mug",
    category: "mug",
    title: "Mountain Mug",
    thumbnail: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549838/1-3-6313daceee35d940fed8ea4eba611593_kobrht.jpg",
    images: [{ url: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549838/1-3-6313daceee35d940fed8ea4eba611593_kobrht.jpg" }],
    variants: [
      { id: "v8-1", title: "White / 11oz", calculated_price: { calculated_amount: 1000, original_amount: 2000 }, options: [{ value: "White" }, { value: "11oz" }] },
      { id: "v8-2", title: "Black / 15oz", calculated_price: { calculated_amount: 1200, original_amount: 2400 }, options: [{ value: "Black" }, { value: "15oz" }] },
    ],
    options: [
      { title: "Color", values: [{ id: "c8-1", value: "White" }, { id: "c8-2", value: "Black" }] },
      { title: "Size", values: [{ id: "sz8-1", value: "11oz" }, { id: "sz8-2", value: "15oz" }] }
    ],
    weight: 350,
    created_at: "2026-03-08T00:00:00Z",
    print_locations: ["Front", "Back"],
    print_additional_prices: {},
    default_print_position: "Front",
    metadata: { supports_customization: true },
    product_builder: { complementary_products: [] }
  },
  {
    id: "p9",
    sellerId: "seller_1",
    seller: MOCK_SELLERS[0],
    handle: "ocean-waves-poster",
    category: "poster",
    title: "Ocean Poster",
    thumbnail: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549838/1-3-6313daceee35d940fed8ea4eba611593_kobrht.jpg",
    images: [{ url: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549838/1-3-6313daceee35d940fed8ea4eba611593_kobrht.jpg" }],
    variants: [
      { id: "v9-1", title: "A4", calculated_price: { calculated_amount: 900, original_amount: 1800 }, options: [{ value: "A4" }] },
      { id: "v9-2", title: "A3", calculated_price: { calculated_amount: 1200, original_amount: 2400 }, options: [{ value: "A3" }] },
      { id: "v9-3", title: "A2", calculated_price: { calculated_amount: 1800, original_amount: 3600 }, options: [{ value: "A2" }] },
    ],
    options: [
      { title: "Size", values: [{ id: "sz9-1", value: "A4" }, { id: "sz9-2", value: "A3" }, { id: "sz9-3", value: "A2" }] }
    ],
    weight: 100,
    created_at: "2026-03-09T00:00:00Z",
    print_locations: [],
    print_additional_prices: {},
    default_print_position: "",
    metadata: { supports_customization: false },
    product_builder: { complementary_products: [] }
  },
  {
    id: "p10",
    sellerId: "seller_2",
    seller: MOCK_SELLERS[1],
    category: "sweatshirt",
    handle: "lofi-sweatshirt",
    title: "Lofi Sweatshirt",
    thumbnail: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80",
    images: [{ url: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80" }],
    variants: [
      { id: "v10", title: "Lilac / L", calculated_price: { calculated_amount: 2250, original_amount: 4500 }, options: [{ value: "Lilac" }, { value: "Relaxed Fit" }, { value: "L" }] }
    ],
    options: [
      { title: "Color", values: [{ id: "c10-1", value: "Lilac" }, { id: "c10-2", value: "Pink" }, { id: "c10-3", value: "White" }] },
      { title: "Style", values: [{ id: "st10-1", value: "Relaxed Fit" }, { id: "st10-2", value: "Cropped" }] },
      { title: "Size", values: [{ id: "s10-1", value: "S" }, { id: "s10-2", value: "M" }, { id: "s10-3", value: "L" }] }
    ],
    weight: 450,
    created_at: "2026-03-10T00:00:00Z",
    print_locations: ["Front", "Back"],
    print_additional_prices: { Back: 2.00 },
    default_print_position: "Front",
    metadata: { supports_customization: false },
    product_builder: { complementary_products: [] }
  },
  {
    id: "p11",
    sellerId: "seller_2",
    seller: MOCK_SELLERS[1],
    handle: "english-important-math-shirt",
    category: "t-shirt",
    title: "English is important but Math is Importanter",
    description: "Chiếc áo thun hài hước với dòng chữ 'English is important but Math is Importanter'.",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" }],
    variants: [
      { id: "v11-1", title: "Black / M", calculated_price: { calculated_amount: 1495, original_amount: 2990 }, options: [{ value: "Black" }, { value: "Unisex" }, { value: "M" }] },
      { id: "v11-2", title: "Black / L", calculated_price: { calculated_amount: 1495, original_amount: 2990 }, options: [{ value: "Black" }, { value: "Unisex" }, { value: "L" }] },
    ],
    options: [
      {
        title: "Color",
        values: [
          { id: "c11-1", value: "Black" },
          { id: "c11-2", value: "Dark Gray" },
          { id: "c11-3", value: "Navy" },
        ]
      },
      {
        title: "Style",
        values: [
          { id: "st11-1", value: "Unisex" },
          { id: "st11-2", value: "Women's Fit" },
        ]
      },
      {
        title: "Size",
        values: [
          { id: "s11-1", value: "S" },
          { id: "s11-2", value: "M" },
          { id: "s11-3", value: "L" },
          { id: "s11-4", value: "XL" },
          { id: "s11-5", value: "2XL" },
        ]
      }
    ],
    weight: 200,
    created_at: "2026-03-11T00:00:00Z",
    print_locations: ["Front"],
    print_additional_prices: {},
    default_print_position: "Front",
    metadata: { supports_customization: true },
    product_builder: { complementary_products: [] }
  },
  {
    id: "p12",
    sellerId: "seller_2",
    seller: MOCK_SELLERS[1],
    handle: "custom-couple-mug",
    category: "mug",
    title: "Annoying Couple Mug",
    description: "Tùy chỉnh cốc đôi với các màu da, kiểu tóc, cộc kính mắt và phụ kiện khác.",
    thumbnail: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549837/1-2-ae193eb82430001ab38746f8223aed222_zzsppw.jpg",
    images: [{ url: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549837/1-2-ae193eb82430001ab38746f8223aed222_zzsppw.jpg" }],
    variants: [
      { id: "v12-1", title: "White / 11oz", calculated_price: { calculated_amount: 1500, original_amount: 3000 }, options: [{ value: "White" }, { value: "11oz" }] },
      { id: "v12-2", title: "Black / 15oz", calculated_price: { calculated_amount: 1700, original_amount: 3400 }, options: [{ value: "Black" }, { value: "15oz" }] },
    ],
    options: [
      { title: "Color", values: [{ id: "c12-1", value: "White" }, { id: "c12-2", value: "Black" }] },
      { title: "Size", values: [{ id: "sz12-1", value: "11oz" }, { id: "sz12-2", value: "15oz" }] }
    ],
    weight: 350,
    created_at: "2026-03-12T00:00:00Z",
    print_locations: ["Front", "Back"],
    print_additional_prices: {},
    default_print_position: "Front",
    metadata: { supports_customization: true, customization_type: "couple-portrait" },
    product_builder: { complementary_products: [] }
  },
  {
    id: "p13",
    sellerId: "seller_3",
    seller: MOCK_SELLERS[2],
    category: "t-shirt",
    handle: "vintage-vinyl-tshirt",
    title: "Vintage Vinyl Record Tee",
    description: "Áo thun kiểu Vintage với in hình đĩa vinyl cổ điển.",
    thumbnail: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549838/1-2-b2faedb8ef9e84b47d04b7a2d99775202_ftw0mz.jpg",
    images: [{ url: "https://res.cloudinary.com/dzkcqktcl/image/upload/v1774549838/1-2-b2faedb8ef9e84b47d04b7a2d99775202_ftw0mz.jpg" }],
    variants: [
      { id: "v13-1", title: "Black / M", calculated_price: { calculated_amount: 1795, original_amount: 2990 }, options: [{ value: "Black" }, { value: "Classic Retro" }, { value: "M" }] },
      { id: "v13-2", title: "Cream / L", calculated_price: { calculated_amount: 1795, original_amount: 2990 }, options: [{ value: "Cream" }, { value: "Classic Retro" }, { value: "L" }] },
    ],
    options: [
      {
        title: "Color",
        values: [
          { id: "c13-1", value: "Black" },
          { id: "c13-2", value: "Cream" },
          { id: "c13-3", value: "Brown" },
        ]
      },
      {
        title: "Style",
        values: [
          { id: "st13-1", value: "Classic Retro" },
          { id: "st13-2", value: "Modern Fit" },
        ]
      },
      {
        title: "Size",
        values: [
          { id: "s13-1", value: "XS" },
          { id: "s13-2", value: "S" },
          { id: "s13-3", value: "M" },
          { id: "s13-4", value: "L" },
          { id: "s13-5", value: "XL" },
          { id: "s13-6", value: "2XL" },
        ]
      }
    ],
    weight: 210,
    created_at: "2026-03-13T00:00:00Z",
    print_locations: ["Front", "Back"],
    print_additional_prices: { Back: 1.50 },
    default_print_position: "Front",
    metadata: { supports_customization: false },
    product_builder: { complementary_products: [] }
  },

  // ==================== PET PRODUCTS DATA ====================
  // Mèo con
  // Mèo con
  {
    id: "pet1",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Mèo British Shorthair con 2 tháng tuổi",
    handle: "meo-british-shorthair-2-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/f_auto,q_auto/hinh-nen-meo-9_orwlet",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/f_auto,q_auto/hinh-nen-meo-9_orwlet" }],
    category: "Thú cưng",
    subCategory: "Mèo con",
    variants: [
      { id: "pet1-v1", title: "Mèo con", calculated_price: { calculated_amount: 2500, original_amount: 3000 }, options: [{ value: "Con đực" }] }
    ]
  },
  {
    id: "pet2",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Mèo Ba Tư màu xám 3 tháng tuổi",
    handle: "meo-ba-tu-xam-3-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/f_auto,q_auto/hinh-nen-meo-10_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/f_auto,q_auto/hinh-nen-meo-10_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Mèo con",
    variants: [
      { id: "pet2-v1", title: "Mèo con", calculated_price: { calculated_amount: 1800, original_amount: 2200 }, options: [{ value: "Con cái" }] }
    ]
  },
  {
    id: "pet3",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Mèo Ragdoll con 4 tháng tuổi - màu Seal Point",
    handle: "meo-ragdoll-seal-4-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250176/images_uecbdp.jpg",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250176/images_uecbdp.jpg" }],
    category: "Thú cưng",
    subCategory: "Mèo con",
    variants: [
      { id: "pet3-v1", title: "Mèo con", calculated_price: { calculated_amount: 3500, original_amount: 4500 }, options: [{ value: "Con đực" }] }
    ]
  },
  {
    id: "pet4",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Mèo Tabby con 2 tháng - hoang mang, tình cảm",
    handle: "meo-tabby-friendly-2-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250176/images_1_ytuqbe.jpg",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250176/images_1_ytuqbe.jpg" }],
    category: "Thú cưng",
    subCategory: "Mèo con",
    variants: [
      { id: "pet4-v1", title: "Mèo con", calculated_price: { calculated_amount: 800, original_amount: 1200 }, options: [{ value: "Con cái" }] }
    ]
  },
  // Chó con
  {
    id: "pet5",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Chó Phú Quốc con, 3 tháng tuổi, đen sạch",
    handle: "cho-phu-quoc-3-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250168/%E1%BA%A3nh-ch%C3%B3-m%C3%A8o-%C4%91%E1%BA%B9p-cover_q3pbdd.jpg",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250168/%E1%BA%A3nh-ch%C3%B3-m%C3%A8o-%C4%91%E1%BA%B9p-cover_q3pbdd.jpg" }],
    category: "Thú cưng",
    subCategory: "Chó con",
    variants: [
      { id: "pet5-v1", title: "Chó con", calculated_price: { calculated_amount: 1200, original_amount: 1800 }, options: [{ value: "Con đực" }] }
    ]
  },
  {
    id: "pet6",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Chó Shiba Inu con đỏ vàng, 2 tháng tuổi",
    handle: "cho-shiba-inu-do-vang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250168/%E1%BA%A3nh-ch%C3%B3-m%C3%A8o-%C4%91%E1%BA%B9p-cover_q3pbdd.jpg",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250168/%E1%BA%A3nh-ch%C3%B3-m%C3%A8o-%C4%91%E1%BA%B9p-cover_q3pbdd.jpg" }],
    category: "Thú cưng",
    subCategory: "Chó con",
    variants: [
      { id: "pet6-v1", title: "Chó con", calculated_price: { calculated_amount: 4500, original_amount: 6000 }, options: [{ value: "Con đực" }] }
    ]
  },
  {
    id: "pet7",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Chó Corgi con vàng trắng, 4 tháng, lành",
    handle: "cho-corgi-vang-trang-4-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250167/cho-hay-meo-thong-minh-hon-theo-goc-nhin-cua-bac-si-thu-y-202110210824476283_nkpe74.jpg",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250167/cho-hay-meo-thong-minh-hon-theo-goc-nhin-cua-bac-si-thu-y-202110210824476283_nkpe74.jpg" }],
    category: "Thú cưng",
    subCategory: "Chó con",
    variants: [
      { id: "pet7-v1", title: "Chó con", calculated_price: { calculated_amount: 3800, original_amount: 5200 }, options: [{ value: "Con cái" }] }
    ]
  },
  {
    id: "pet8",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Chó Chihuahua con nhỏ bé, 2.5 tháng",
    handle: "cho-chihuahua-nho-be",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250166/anh-cho-meo-2_k7lpwj.webp",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250166/anh-cho-meo-2_k7lpwj.webp" }],
    category: "Thú cưng",
    subCategory: "Chó Mini",
    variants: [
      { id: "pet8-v1", title: "Chó con", calculated_price: { calculated_amount: 2200, original_amount: 3200 }, options: [{ value: "Con cái" }] }
    ]
  },
  // Vẹt
  {
    id: "pet9",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Vẹt Macaw Lưng Xanh 1 tuổi, nói tiếng Việt",
    handle: "vet-macaw-lung-xanh-1-tuoi",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_orwlet.jpg",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_orwlet.jpg" }],
    category: "Thú cưng",
    subCategory: "Vẹt",
    variants: [
      { id: "pet9-v1", title: "Vẹt con", calculated_price: { calculated_amount: 5500, original_amount: 7000 }, options: [{ value: "Yêu tiếng người" }] }
    ]
  },
  {
    id: "pet10",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Vẹt Nông Nông con 4 tháng, khoẻ mạnh",
    handle: "vet-nong-nong-4-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Vẹt",
    variants: [
      { id: "pet10-v1", title: "Vẹt con", calculated_price: { calculated_amount: 2000, original_amount: 2800 }, options: [{ value: "Khỏe mạnh" }] }
    ]
  },
  {
    id: "pet11",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Vẹt Vàng Quảng Nam, dạy nói được",
    handle: "vet-vang-quang-nam-dao-noi",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Vẹt",
    variants: [
      { id: "pet11-v1", title: "Vẹt con", calculated_price: { calculated_amount: 1500, original_amount: 2200 }, options: [{ value: "Dạy nói" }] }
    ]
  },
  // Cá Cảnh
  {
    id: "pet12",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Cá Koi Nhật cid 30cm - màu đỏ trắng",
    handle: "ca-koi-nhat-30cm-do-trang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Cá Cảnh",
    variants: [
      { id: "pet12-v1", title: "Cá Koi", calculated_price: { calculated_amount: 3500, original_amount: 4500 }, options: [{ value: "30cm" }] }
    ]
  },
  {
    id: "pet13",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Cá Vàng Fantail cảnh đẹp, khoẻ",
    handle: "ca-vang-fantail-canh-dep",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Cá Cảnh",
    variants: [
      { id: "pet13-v1", title: "Cá Vàng", calculated_price: { calculated_amount: 500, original_amount: 800 }, options: [{ value: "15-20cm" }] }
    ]
  },
  {
    id: "pet14",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Cá Chép Rồng size 25cm - quý hiếm",
    handle: "ca-chep-rong-25cm-quy-hiem",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Cá Cảnh",
    variants: [
      { id: "pet14-v1", title: "Cá Chép Rồng", calculated_price: { calculated_amount: 8500, original_amount: 11000 }, options: [{ value: "25cm" }] }
    ]
  },
  // Thỏ Con
  {
    id: "pet15",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Thỏ con lông xám 2 tháng tuổi",
    handle: "tho-con-long-xam-2-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Thỏ Con",
    variants: [
      { id: "pet15-v1", title: "Thỏ con", calculated_price: { calculated_amount: 300, original_amount: 500 }, options: [{ value: "Con đực" }] }
    ]
  },
  {
    id: "pet16",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Thỏ Belgium trắng sạch 3 tháng",
    handle: "tho-belgium-trang-sach-3-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Thỏ Con",
    variants: [
      { id: "pet16-v1", title: "Thỏ con", calculated_price: { calculated_amount: 450, original_amount: 700 }, options: [{ value: "Con cái" }] }
    ]
  },
  {
    id: "pet17",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Thỏ Đức lông dài 2.5 tháng",
    handle: "tho-duc-long-dai-2-5-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Thỏ Con",
    variants: [
      { id: "pet17-v1", title: "Thỏ con", calculated_price: { calculated_amount: 600, original_amount: 900 }, options: [{ value: "Con đực" }] }
    ]
  },
  // Nhím Cảnh
  {
    id: "pet18",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Nhím Cảnh con 2 tháng tuổi, tính tình hiền lành",
    handle: "nhim-canh-con-2-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Nhím Cảnh",
    variants: [
      { id: "pet18-v1", title: "Nhím con", calculated_price: { calculated_amount: 1200, original_amount: 1800 }, options: [{ value: "Hiền lành" }] }
    ]
  },
  {
    id: "pet19",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Nhím Afican con màu ghi, khoẻ mạnh",
    handle: "nhim-afican-con-mau-ghi",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Nhím Cảnh",
    variants: [
      { id: "pet19-v1", title: "Nhím con", calculated_price: { calculated_amount: 1500, original_amount: 2100 }, options: [{ value: "Khỏe mạnh" }] }
    ]
  },
  // Chuột Lang
  {
    id: "pet20",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Chuột Lang con 1 tháng tuổi, trắng mắt đen",
    handle: "chuot-lang-con-1-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Chuột Lang",
    variants: [
      { id: "pet20-v1", title: "Chuột con", calculated_price: { calculated_amount: 200, original_amount: 350 }, options: [{ value: "Con đực" }] }
    ]
  },
  {
    id: "pet21",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Chuột Lang con lông dài 1.5 tháng",
    handle: "chuot-lang-con-long-dai-1-5-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Chuột Lang",
    variants: [
      { id: "pet21-v1", title: "Chuột con", calculated_price: { calculated_amount: 250, original_amount: 400 }, options: [{ value: "Con cái" }] }
    ]
  },
  // Sóc Cảnh
  {
    id: "pet22",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Sóc Cảnh con Thái ban, 2 tháng",
    handle: "soc-canh-con-thai-ban-2-thang",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Thú cưng",
    subCategory: "Sóc Cảnh",
    variants: [
      { id: "pet22-v1", title: "Sóc con", calculated_price: { calculated_amount: 800, original_amount: 1200 }, options: [{ value: "Con đực" }] }
    ]
  },
  // Phụ kiện, Thức ăn
  {
    id: "pet23",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Lồng chim inox cao cấp 80x60x160cm",
    handle: "long-chim-inox-cao-cap",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Phụ kiện, Thức ăn, Dịch vụ",
    subCategory: "Phụ kiện",
    variants: [
      { id: "pet23-v1", title: "Lồng chim", calculated_price: { calculated_amount: 2500, original_amount: 3200 }, options: [{ value: "80x60x160" }] }
    ]
  },
  {
    id: "pet24",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Cầu mèo 3 tầng bề ngoài bọc nỉ",
    handle: "cau-meo-3-tang-boc-ni",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Phụ kiện, Thức ăn, Dịch vụ",
    subCategory: "Phụ kiện",
    variants: [
      { id: "pet24-v1", title: "Cầu mèo", calculated_price: { calculated_amount: 1500, original_amount: 2000 }, options: [{ value: "3 tầng" }] }
    ]
  },
  {
    id: "pet25",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Thức ăn mèo Royal Canin 2kg",
    handle: "thuc-an-meo-royal-canin-2kg",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Phụ kiện, Thức ăn, Dịch vụ",
    subCategory: "Thức ăn",
    variants: [
      { id: "pet25-v1", title: "Thức ăn mèo", calculated_price: { calculated_amount: 350, original_amount: 450 }, options: [{ value: "2kg" }] }
    ]
  },
  {
    id: "pet26",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Thức ăn chó Pedigree 3kg",
    handle: "thuc-an-cho-pedigree-3kg",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Phụ kiện, Thức ăn, Dịch vụ",
    subCategory: "Thức ăn",
    variants: [
      { id: "pet26-v1", title: "Thức ăn chó", calculated_price: { calculated_amount: 280, original_amount: 350 }, options: [{ value: "3kg" }] }
    ]
  },
  {
    id: "pet27",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Dịch vụ tắm spa chó mèo tại nhà",
    handle: "dich-vu-tam-spa-cho-meo",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Phụ kiện, Thức ăn, Dịch vụ",
    subCategory: "Dịch vụ",
    variants: [
      { id: "pet27-v1", title: "Tắm spa", calculated_price: { calculated_amount: 150, original_amount: 200 }, options: [{ value: "Tại nhà" }] }
    ]
  },
  {
    id: "pet28",
    sellerId: "seller_4",
    seller: MOCK_SELLERS[3],
    title: "Dịch vụ cắt tỉa lông chó cao cấp",
    handle: "dich-vu-cat-tia-long-cho",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje",
    images: [{ url: "https://res.cloudinary.com/disr91rnz/image/upload/v1776250052/hinh-nen-meo-9_gxqjje" }],
    category: "Phụ kiện, Thức ăn, Dịch vụ",
    subCategory: "Dịch vụ",
    variants: [
      { id: "pet28-v1", title: "Cắt tỉa lông", calculated_price: { calculated_amount: 250, original_amount: 350 }, options: [{ value: "Cao cấp" }] }
    ]
  },
  // ==================== REPORT PRODUCTS ====================
  {
    id: "report1",
    sellerId: "seller_1",
    seller: MOCK_SELLERS[0],
    handle: "hop-dong-thi-cong-xay-dung-cong-trinh-dan-dung",
    title: "Hợp đồng thị công xây dựng công trình dân dụng",
    description: "Mẫu hợp đồng chuyên nghiệp cho dự án xây dựng công trình dân dụng, 20 trang, đầy đủ điều khoản pháp lý.",
    category: "Báo cáo & Hợp đồng",
    productType: "report",
    thumbnail: "https://placehold.co/400x600/3498db/ffffff?text=Hợp+Đồng+Xây+Dựng",
    rating: 4.7,
    views: 50600,
    downloads: 278,
    price: 110000,
    reportPages: Array.from({ length: 20 }, (_, i) => ({
      id: `report1-page-${i + 1}`,
      pageNum: i + 1,
      thumbnail: `https://placehold.co/200x280/3498db/ffffff?text=Trang+${i + 1}`,
      fullImage: `https://placehold.co/600x800/3498db/ffffff?text=Hợp+Đồng+-+Trang+${i + 1}`,
      title: `Hợp đồng - Trang ${i + 1}`,
    })),
  },
  {
    id: "report2",
    sellerId: "seller_2",
    seller: MOCK_SELLERS[1],
    handle: "bao-cao-tham-do-dia-chat",
    title: "Báo cáo thẩm dò địa chất",
    description: "Báo cáo chi tiết về thẩm dò địa chất, gồm 15 trang với các biểu đồ, dữ liệu kỹ thuật.",
    category: "Báo cáo & Hợp đồng",
    productType: "report",
    thumbnail: "https://placehold.co/400x600/27ae60/ffffff?text=Báo+Cáo+Địa+Chất",
    rating: 4.5,
    views: 32100,
    downloads: 145,
    price: 150000,
    reportPages: Array.from({ length: 15 }, (_, i) => ({
      id: `report2-page-${i + 1}`,
      pageNum: i + 1,
      thumbnail: `https://placehold.co/200x280/27ae60/ffffff?text=Trang+${i + 1}`,
      fullImage: `https://placehold.co/600x800/27ae60/ffffff?text=Báo+Cáo+-+Trang+${i + 1}`,
      title: `Báo cáo thẩm dò - Trang ${i + 1}`,
    })),
  },
  {
    id: "report3",
    sellerId: "seller_3",
    seller: MOCK_SELLERS[2],
    handle: "hop-dong-bao-hiem-xay-dung-cong-trinh",
    title: "Hợp đồng bảo hiểm xây dựng công trình",
    description: "Mẫu hợp đồng bảo hiểm cho công trình xây dựng, bao phủ đầy đủ rủi ro, 12 trang.",
    category: "Báo cáo & Hợp đồng",
    productType: "report",
    thumbnail: "https://placehold.co/400x600/e74c3c/ffffff?text=Bảo+Hiểm+Xây+Dựng",
    rating: 4.8,
    views: 78900,
    downloads: 356,
    price: 95000,
    reportPages: Array.from({ length: 12 }, (_, i) => ({
      id: `report3-page-${i + 1}`,
      pageNum: i + 1,
      thumbnail: `https://placehold.co/200x280/e74c3c/ffffff?text=Trang+${i + 1}`,
      fullImage: `https://placehold.co/600x800/e74c3c/ffffff?text=Bảo+Hiểm+-+Trang+${i + 1}`,
      title: `Hợp đồng bảo hiểm - Trang ${i + 1}`,
    })),
  },
  {
    id: "report4",
    sellerId: "seller_1",
    seller: MOCK_SELLERS[0],
    handle: "software-testing-agreement",
    title: "Software Testing Agreement",
    description: "Hợp đồng kiểm thử phần mềm chuyên nghiệp, 17 trang, đầy đủ điều khoản pháp lý.",
    category: "Báo cáo & Hợp đồng",
    productType: "report",
    thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/v1776352893/page_001_tx6bco.png",
    rating: 4.9,
    views: 45200,
    downloads: 189,
    price: 125000,
    reportPages: [
      {
        id: "report4-page-1",
        pageNum: 1,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352893/page_001_tx6bco.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352893/page_001_tx6bco.png",
        title: "Software Testing Agreement - Trang 1",
      },
      {
        id: "report4-page-2",
        pageNum: 2,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352892/page_002_zdqfjl.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352892/page_002_zdqfjl.png",
        title: "Software Testing Agreement - Trang 2",
      },
      {
        id: "report4-page-3",
        pageNum: 3,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352892/page_003_heas8d.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352892/page_003_heas8d.png",
        title: "Software Testing Agreement - Trang 3",
      },
      {
        id: "report4-page-4",
        pageNum: 4,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352892/page_004_cdqs1c.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352892/page_004_cdqs1c.png",
        title: "Software Testing Agreement - Trang 4",
      },
      {
        id: "report4-page-5",
        pageNum: 5,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352892/page_005_bsgm9t.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352892/page_005_bsgm9t.png",
        title: "Software Testing Agreement - Trang 5",
      },
      {
        id: "report4-page-6",
        pageNum: 6,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352893/page_006_mr1tv0.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352893/page_006_mr1tv0.png",
        title: "Software Testing Agreement - Trang 6",
      },
      {
        id: "report4-page-7",
        pageNum: 7,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352893/page_007_k2ntk4.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352893/page_007_k2ntk4.png",
        title: "Software Testing Agreement - Trang 7",
      },
      {
        id: "report4-page-8",
        pageNum: 8,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352893/page_008_qt2kiy.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352893/page_008_qt2kiy.png",
        title: "Software Testing Agreement - Trang 8",
      },
      {
        id: "report4-page-9",
        pageNum: 9,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352893/page_009_t4oyhh.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352893/page_009_t4oyhh.png",
        title: "Software Testing Agreement - Trang 9",
      },
      {
        id: "report4-page-10",
        pageNum: 10,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352893/page_010_mwakdy.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352893/page_010_mwakdy.png",
        title: "Software Testing Agreement - Trang 10",
      },
      {
        id: "report4-page-11",
        pageNum: 11,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352893/page_011_hjjifg.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352893/page_011_hjjifg.png",
        title: "Software Testing Agreement - Trang 11",
      },
      {
        id: "report4-page-12",
        pageNum: 12,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352894/page_012_bvt81k.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352894/page_012_bvt81k.png",
        title: "Software Testing Agreement - Trang 12",
      },
      {
        id: "report4-page-13",
        pageNum: 13,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352895/page_013_lhdd0t.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352895/page_013_lhdd0t.png",
        title: "Software Testing Agreement - Trang 13",
      },
      {
        id: "report4-page-14",
        pageNum: 14,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352894/page_014_we8uw5.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352894/page_014_we8uw5.png",
        title: "Software Testing Agreement - Trang 14",
      },
      {
        id: "report4-page-15",
        pageNum: 15,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352894/page_015_cvcbwq.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352894/page_015_cvcbwq.png",
        title: "Software Testing Agreement - Trang 15",
      },
      {
        id: "report4-page-16",
        pageNum: 16,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352894/page_016_n6pbrg.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352894/page_016_n6pbrg.png",
        title: "Software Testing Agreement - Trang 16",
      },
      {
        id: "report4-page-17",
        pageNum: 17,
        thumbnail: "https://res.cloudinary.com/disr91rnz/image/upload/w_200,h_280,c_fill/v1776352892/page_017_cxomxb.png",
        fullImage: "https://res.cloudinary.com/disr91rnz/image/upload/w_600,h_800,c_fill/v1776352892/page_017_cxomxb.png",
        title: "Software Testing Agreement - Trang 17",
      },
    ],
  }
];

export const mockProducts = MOCK_PRODUCTS_DATABASE;
export const mockProduct = MOCK_PRODUCTS_DATABASE[0];

// ==================== PET PRODUCTS HELPER ====================
// Get all pet products from unified database
export const MOCK_PET_PRODUCTS = MOCK_PRODUCTS_DATABASE.filter((p: any) => (p as any).id?.startsWith('pet'));

// Initialize Fuse.js for full-text search (lazy init)
let petProductsFuse: Fuse<any> | null = null;

function getPetProductsFuse() {
  if (!petProductsFuse) {
    petProductsFuse = new Fuse(MOCK_PET_PRODUCTS, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'subCategory', weight: 0.3 },
        { name: 'category', weight: 0.2 },
        { name: 'seller.name', weight: 0.1 }
      ],
      threshold: 0.3, // fuzzy search tolerance (0-1, lower = more fuzzy)
      includeScore: true,
      includeMatches: true
    });
  }
  return petProductsFuse;
}

/**
 * Search pet products by query string
 * @param query - Search query (e.g., "mèo vàng", "corgi", "vẹt")
 * @param limit - Max results to return (default: 10)
 * @returns Array of matched pet products with scores
 */
export function searchPetProducts(query: string, limit: number = 10) {
  if (!query.trim()) return [];
  
  const fuse = getPetProductsFuse();
  const results = fuse.search(query).slice(0, limit);
  return results.map(result => ({
    ...result.item,
    score: result.score, // relevance score (lower is better)
    matches: result.matches // which fields matched
  }));
}

/**
 * Search pet products by category (exact match)
 * @param category - Category name
 * @param subCategory - Optional subcategory
 * @returns Filtered pet products
 */
export function getPetProductsByCategory(
  category: string,
  subCategory?: string
) {
  return MOCK_PET_PRODUCTS.filter(p => 
    p.category === category && 
    (!subCategory || p.subCategory === subCategory)
  );
}

/**
 * Search pet products by seller
 * @param sellerId - Seller ID
 * @returns Products from that seller
 */
export function getPetProductsBySeller(sellerId: string) {
  return MOCK_PET_PRODUCTS.filter(p => p.sellerId === sellerId);
}

export function getBoughtTogetherSuggestions(productId: string, limit: number = 5) {
  const currentProduct = MOCK_PRODUCTS_DATABASE.find(p => p.id === productId);
  if (!currentProduct) return [];

  const otherProducts = MOCK_PRODUCTS_DATABASE.filter(p => p.id !== productId);

  // Score mỗi sản phẩm dựa trên độ liên quan
  const scored = otherProducts.map(product => {
    let score = 0;

    // Skip if both are pet products, they don't have print_locations
    const isCurrentPet = currentProduct.id.startsWith('pet');
    const isProductPet = product.id.startsWith('pet');

    // 1. Cùng category (nên suggest sản phẩm cùng loại)
    if (currentProduct.category === product.category) {
      score += 20;
    }

    // 2. Cùng print_locations (chỉ cho non-pet products)
    if (!isCurrentPet && !isProductPet && currentProduct.print_locations && product.print_locations) {
      const commonPrintLocations = currentProduct.print_locations.filter(loc =>
        product.print_locations?.includes(loc)
      );
      score += commonPrintLocations.length * 10;
    }

    // 3. Cùng số lượng options/styles (product type tương tự)
    if (currentProduct.options && product.options && 
        currentProduct.options.length === product.options.length) {
      score += 5;
    }

    // 4. Cùng support customization (đối tượng khách hàng giống)
    if (currentProduct.metadata?.supports_customization === product.metadata?.supports_customization) {
      score += 8;
    }

    // 5. Weight gần nhau (cùng loại hàng - nhưng pet products không có weight)
    if (currentProduct.weight && product.weight) {
      const weightDiff = Math.abs(currentProduct.weight - product.weight);
      if (weightDiff < 100) score += 8;
      else if (weightDiff < 300) score += 4;
    }

    // 6. Giá gần nhau (cùng tầm giá)
    const currentPrice = currentProduct.variants?.[0]?.calculated_price?.calculated_amount || 0;
    const productPrice = product.variants?.[0]?.calculated_price?.calculated_amount || 0;
    const priceDiff = Math.abs(currentPrice - productPrice);
    if (priceDiff < 500) score += 6; // Giá chênh lệch < 500 units
    else if (priceDiff < 1500) score += 3;

    // 7. Có ít nhất 1 option value tương tự (ví dụ: cùng Size options)
    if (currentProduct.options && product.options) {
      const hasSimilarOptions = currentProduct.options.some(opt1 =>
        product.options.some(opt2 =>
          opt1.title === opt2.title && // Cùng tên option (Color, Size, Style...)
          opt1.values?.some(v1 => opt2.values?.some(v2 => v2.value === v1.value))
        )
      );
      if (hasSimilarOptions) score += 15;
    }

    return { product, score };
  });

  // Sắp xếp theo score (cao nhất trước)
  scored.sort((a, b) => b.score - a.score);

  // Lấy top N sản phẩm có score cao nhất
  return scored.slice(0, limit).map(s => s.product);
}

export function getMockProductByHandle(handle: string) {
  return MOCK_PRODUCTS_DATABASE.find((p) => p.handle === handle) || null;
}

// ==================== CUSTOMIZATION DATA ====================

// Customization Templates Mapping
const CUSTOMIZATION_TEMPLATES = {
  'tee-male-only': null, // Will be defined below
  'couple-portrait': null, // Will be defined below
};

// Customization Product Template
export const customizationTeeData = {
  id: "p1",
  name: "Custom Comfort Colors Tee",
  template_id: "tee-template-1",
  template: mockCoupleTemplate,
  canvas_width: 800,
  canvas_height: 600,
  options: [
    {
      id: "man-skin-color",
      label: "Man Skin Color",
      type: "swatch" as const,
      order: 1,
      isShow: true,
      values: [
        { id: "skin-light", name: "Light", value: "light", color: "#fdbcb4" },
        { id: "skin-medium", name: "Medium", value: "medium", color: "#d4a574" },
        { id: "skin-tan", name: "Tan", value: "tan", color: "#a67c52" },
        { id: "skin-dark", name: "Dark", value: "dark", color: "#6d4c41" },
      ],
      function_items: [
        { type: "color", element_id: "man-head" },
        { type: "color", element_id: "man-body" },
      ],
    },
    {
      id: "man-hair-style",
      label: "Man Hair Style",
      type: "button-group" as const,
      order: 2,
      isShow: true,
      values: [
        { id: "hair-bald", name: "Bald", value: "bald", image_url: "/assets/hair-bald.png" },
        { id: "hair-short", name: "Short", value: "short", image_url: "/assets/hair-style-1.png" },
        { id: "hair-medium", name: "Medium", value: "medium", image_url: "/assets/hair-style-2.png" },
        { id: "hair-long", name: "Long", value: "long", image_url: "/assets/hair-style-3.png" },
        { id: "hair-curly", name: "Curly", value: "curly", image_url: "/assets/hair-curly.png" },
      ],
      function_items: [{ type: "dynamic-image", element_id: "man-hair" }],
    },
    {
      id: "man-hair-color",
      label: "Man Hair Color",
      type: "swatch" as const,
      order: 3,
      isShow: true,
      values: [
        { id: "hair-black", name: "Black", value: "black", color: "#000000" },
        { id: "hair-brown", name: "Brown", value: "brown", color: "#6d4c41" },
        { id: "hair-blonde", name: "Blonde", value: "blonde", color: "#d4a574" },
        { id: "hair-red", name: "Red", value: "red", color: "#c85a54" },
        { id: "hair-gray", name: "Gray", value: "gray", color: "#999999" },
      ],
    },
    {
      id: "man-beard",
      label: "Man Beard/Mustache",
      type: "button-group" as const,
      order: 4,
      isShow: true,
      values: [
        { id: "beard-none", name: "Clean Shaven", value: "none" },
        { id: "beard-light", name: "Light", value: "light", image_url: "/assets/beard-light.png" },
        { id: "beard-full", name: "Full", value: "full", image_url: "/assets/beard-full.png" },
        { id: "beard-stubble", name: "Stubble", value: "stubble", image_url: "/assets/beard-stubble.png" },
      ],
    },
    {
      id: "man-glasses",
      label: "Man Glasses",
      type: "button-group" as const,
      order: 5,
      isShow: true,
      values: [
        { id: "glasses-none", name: "NO GLASSES", value: "none" },
        { id: "glasses-normal", name: "Normal", value: "normal", image_url: "/assets/glasses-normal.png" },
        { id: "glasses-sunglasses", name: "Sunglasses", value: "sunglasses", image_url: "/assets/glasses-sunglasses.png" },
        { id: "glasses-wayfarer", name: "Wayfarer", value: "wayfarer", image_url: "/assets/glasses-wayfarer.png" },
      ],
      function_items: [{ type: "visibility", element_id: "man-glasses" }],
    },
    {
      id: "man-shirt",
      label: "Choose Man's Top",
      type: "button-group" as const,
      order: 6,
      isShow: true,
      values: [
        { id: "shirt-tshirt", name: "T-SHIRT", value: "tshirt" },
        { id: "shirt-dress", name: "SHIRT", value: "dress" },
        { id: "shirt-polo", name: "HOODIE", value: "polo" },
        { id: "shirt-hoodie", name: "CARO SHIRT", value: "hoodie" },
      ],
    },
    {
      id: "custom-text",
      label: "Your Text Here",
      type: "text-input" as const,
      order: 7,
      isShow: true,
      values: [
        { id: "text-value", name: "Custom Text", value: "Your text" },
      ],
      function_items: [
        { type: "text", element_id: "custom-text-element" },
      ],
    },
  ],
  default_values: {
    "man-skin-color": "skin-medium",
    "man-hair-style": "hair-short",
    "man-hair-color": "hair-black",
    "man-beard": "beard-none",
    "man-glasses": "glasses-none",
    "man-shirt": "shirt-tshirt",
    "custom-text": "Your text",
  },
} as const;

export const customizationProductData = {
  id: "p12",
  name: "Annoying Couple Mug",
  template_id: "couple-template-1",
  template: mockCoupleTemplate,
  canvas_width: 800,
  canvas_height: 600,
  options: [
    {
      id: "man-skin-color",
      label: "Man Skin Color",
      type: "swatch" as const,
      order: 1,
      isShow: true,
      values: [
        { id: "skin-light", name: "Light", value: "light", color: "#fdbcb4" },
        { id: "skin-medium", name: "Medium", value: "medium", color: "#d4a574" },
        { id: "skin-tan", name: "Tan", value: "tan", color: "#a67c52" },
        { id: "skin-dark", name: "Dark", value: "dark", color: "#6d4c41" },
      ],
      function_items: [
        { type: "color", element_id: "man-head" },
        { type: "color", element_id: "man-body" },
      ],
    },
    {
      id: "man-hair-style",
      label: "Man Hair Style",
      type: "button-group" as const,
      order: 2,
      isShow: true,
      values: [
        { id: "hair-bald", name: "Bald", value: "bald", image_url: "/assets/hair-bald.png" },
        { id: "hair-short", name: "Short", value: "short", image_url: "/assets/hair-style-1.png" },
        { id: "hair-medium", name: "Medium", value: "medium", image_url: "/assets/hair-style-2.png" },
        { id: "hair-long", name: "Long", value: "long", image_url: "/assets/hair-style-3.png" },
        { id: "hair-curly", name: "Curly", value: "curly", image_url: "/assets/hair-curly.png" },
      ],
      function_items: [{ type: "dynamic-image", element_id: "man-hair" }],
    },
    {
      id: "man-hair-color",
      label: "Man Hair Color",
      type: "swatch" as const,
      order: 3,
      isShow: true,
      values: [
        { id: "hair-black", name: "Black", value: "black", color: "#000000" },
        { id: "hair-brown", name: "Brown", value: "brown", color: "#6d4c41" },
        { id: "hair-blonde", name: "Blonde", value: "blonde", color: "#d4a574" },
        { id: "hair-red", name: "Red", value: "red", color: "#c85a54" },
        { id: "hair-gray", name: "Gray", value: "gray", color: "#999999" },
      ],
    },
    {
      id: "man-beard",
      label: "Man Beard/Mustache",
      type: "button-group" as const,
      order: 4,
      isShow: true,
      values: [
        { id: "beard-none", name: "Clean Shaven", value: "none" },
        { id: "beard-light", name: "Light", value: "light", image_url: "/assets/beard-light.png" },
        { id: "beard-full", name: "Full", value: "full", image_url: "/assets/beard-full.png" },
        { id: "beard-stubble", name: "Stubble", value: "stubble", image_url: "/assets/beard-stubble.png" },
      ],
    },
    {
      id: "man-glasses",
      label: "Man Glasses",
      type: "button-group" as const,
      order: 5,
      isShow: true,
      values: [
        { id: "glasses-none", name: "No Glasses", value: "none" },
        { id: "glasses-normal", name: "Normal", value: "normal", image_url: "/assets/glasses-normal.png" },
        { id: "glasses-sunglasses", name: "Sunglasses", value: "sunglasses", image_url: "/assets/glasses-sunglasses.png" },
        { id: "glasses-oval", name: "Oval", value: "oval", image_url: "/assets/glasses-oval.png" },
      ],
      function_items: [{ type: "visibility", element_id: "man-glasses" }],
    },
    {
      id: "man-shirt",
      label: "Man Top Option",
      type: "button-group" as const,
      order: 6,
      isShow: true,
      values: [
        { id: "shirt-tshirt", name: "T-Shirt", value: "tshirt" },
        { id: "shirt-dress", name: "Dress Shirt", value: "dress" },
        { id: "shirt-polo", name: "Polo", value: "polo" },
        { id: "shirt-hoodie", name: "Hoodie", value: "hoodie" },
      ],
    },
    {
      id: "woman-skin-color",
      label: "Woman Skin Color",
      type: "swatch" as const,
      order: 7,
      isShow: true,
      values: [
        { id: "wskin-light", name: "Light", value: "light", color: "#fdbcb4" },
        { id: "wskin-medium", name: "Medium", value: "medium", color: "#d4a574" },
        { id: "wskin-tan", name: "Tan", value: "tan", color: "#a67c52" },
        { id: "wskin-dark", name: "Dark", value: "dark", color: "#6d4c41" },
      ],
      function_items: [
        { type: "color", element_id: "woman-head" },
        { type: "color", element_id: "woman-body" },
      ],
    },
    {
      id: "woman-hair-style",
      label: "Woman Hair Style",
      type: "button-group" as const,
      order: 8,
      isShow: true,
      values: [
        { id: "whair-short", name: "Short", value: "short", image_url: "https://www.chuphinhsanpham.vn/wp-content/uploads/2021/06/chup-hinh-giay-dincox-shoes-c-photo-studio-4.jpg" },
        { id: "whair-medium", name: "Medium", value: "medium", image_url: "/assets/hair-style-woman-2.png" },
        { id: "whair-long", name: "Long", value: "long", image_url: "/assets/hair-style-woman-3.png" },
        { id: "whair-wave", name: "Wavy", value: "wave", image_url: "/assets/hair-style-woman-wave.png" },
        { id: "whair-bun", name: "Bun", value: "bun", image_url: "/assets/hair-style-woman-bun.png" },
      ],
      function_items: [{ type: "dynamic-image", element_id: "woman-hair" }],
    },
    {
      id: "woman-hair-color",
      label: "Woman Hair Color",
      type: "swatch" as const,
      order: 9,
      isShow: true,
      values: [
        { id: "whair-black", name: "Black", value: "black", color: "#000000" },
        { id: "whair-brown", name: "Brown", value: "brown", color: "#6d4c41" },
        { id: "whair-blonde", name: "Blonde", value: "blonde", color: "#d4a574" },
        { id: "whair-red", name: "Red", value: "red", color: "#c85a54" },
      ],
    },
    {
      id: "woman-glasses",
      label: "Woman Glasses",
      type: "button-group" as const,
      order: 10,
      isShow: true,
      values: [
        { id: "wglasses-none", name: "No Glasses", value: "none" },
        { id: "wglasses-normal", name: "Normal", value: "normal", image_url: "/assets/glasses-normal.png" },
        { id: "wglasses-sunglasses", name: "Sunglasses", value: "sunglasses", image_url: "/assets/glasses-sunglasses.png" },
        { id: "wglasses-cat", name: "Cat Eye", value: "cat", image_url: "/assets/glasses-cat.png" },
      ],
      function_items: [{ type: "visibility", element_id: "woman-glasses" }],
    },
    {
      id: "woman-top",
      label: "Woman Top Option",
      type: "button-group" as const,
      order: 11,
      isShow: true,
      values: [
        { id: "wtop-dress", name: "Dress", value: "dress" },
        { id: "wtop-shirt", name: "Shirt", value: "shirt" },
        { id: "wtop-blouse", name: "Blouse", value: "blouse" },
        { id: "wtop-camo", name: "Camo Shirt", value: "camo" },
      ],
    },
    {
      id: "custom-text",
      label: "Your Text Here",
      type: "text-input" as const,
      order: 12,
      isShow: true,
      values: [
        { id: "text-value", name: "Custom Text", value: "Your text" },
      ],
      function_items: [
        { type: "text", element_id: "custom-text-element" },
      ],
    },
  ],
  default_values: {
    "man-skin-color": "skin-medium",
    "man-hair-style": "hair-short",
    "man-hair-color": "hair-black",
    "man-beard": "beard-none",
    "man-glasses": "glasses-none",
    "man-shirt": "shirt-tshirt",
    "woman-skin-color": "wskin-medium",
    "woman-hair-style": "whair-short",
    "woman-hair-color": "whair-black",
    "woman-glasses": "wglasses-none",
    "woman-top": "wtop-dress",
    "custom-text": "Your text",
  },
} as const;

/**
 * Check if a product supports customization
 */
export function isCustomizableProduct(product: any): boolean {
  return product?.metadata?.supports_customization === true;
}

/**
 * Get customization data for a product
 */
export function getCustomizationDataForProduct(productId: string) {
  if (productId === "p12" || productId === "custom-couple-mug") {
    return customizationProductData;
  }
  return null;
}

/**
 * Get customization data by product handle
 */
export function getCustomizationByHandle(handle: string) {
  const product = getMockProductByHandle(handle);
  if (!product) return null;

  const customizationType = product.metadata?.customization_type;
  if (!customizationType) return null;

  // Clone data and inject conditions
  const enrichWithConditions = (data: any) => {
    const enriched = JSON.parse(JSON.stringify(data));
    
    // Hide hair color when hair is bald
    const hairColorOpt = enriched.options.find((o: any) => o.id === 'man-hair-color' || o.id === 'woman-hair-color');
    if (hairColorOpt && !hairColorOpt.conditions) {
      const hairStyleId = hairColorOpt.id === 'man-hair-color' ? 'man-hair-style' : 'woman-hair-style';
      hairColorOpt.conditions = [
        { option_id: hairStyleId, value_id: 'hair-bald', action: 'hide' as const },
      ];
    }
    
    // Hide beard when hair is bald
    const beardOpt = enriched.options.find((o: any) => o.id === 'man-beard' || o.id === 'woman-beard');
    if (beardOpt && !beardOpt.conditions) {
      const hairStyleId = beardOpt.id === 'man-beard' ? 'man-hair-style' : 'woman-hair-style';
      beardOpt.conditions = [
        { option_id: hairStyleId, value_id: 'hair-bald', action: 'hide' as const },
      ];
    }
    
    return enriched;
  };

  // Map customization_type to corresponding data with conditions injected
  if (customizationType === 'tee-male-only') {
    return enrichWithConditions(customizationTeeData);
  }
  if (customizationType === 'couple-portrait') {
    return enrichWithConditions(customizationProductData);
  }

  return null;
}