// src/constants/nav-links.ts

// Định nghĩa kiểu dữ liệu cho chặt chẽ (TypeScript)
export interface SubNavItem {
    label: string;
    href: string;
}

export interface NavItem {
    id: string;
    label: string;
    href: string;
    children?: SubNavItem[];
    angle: number;
}

// Export dữ liệu ra để dùng chung
export const NAV_ITEMS: NavItem[] = [
    {
        angle: 0,
        id: "blog",
        label: "Blog",
        href: "/blog",
        children: [
        ]
    },
     {
         angle: 2,
        id: "tra-cuu",
        label: "Tra Cứu",
        href: "/tracuu",
        children: [
            { label: "Thần số học cho con",  href: "/thansohoc/baby-numerology" },
            { label: "Trắc nghiệm DISC", href: "/thansohoc/test-disc" },
            { label: "Trắc nghiệm MBTI", href: "/thansohoc/MBTI" },
            { label: "Tra cứu bản đồ sao", href: "/thansohoc/natal-star" },
        ]
       
    },
    {
         angle: 3,
        id: "xem-ngay",
        label: "Xem Ngày",
        href: "/xem-ngay",
        children: [
            { label: "Xem ngày tốt xấu", href: "/xem-ngay/tot-xau" },
            { label: "Xem ngày tốt động thổ", href: "/xem-ngay/dong-tho" },
            { label: "Xem ngày tốt khai trương", href: "/xem-ngay/khai-truong" },
            { label: "Xem ngày tốt mua xe", href: "/xem-ngay/mua-xe" },
            { label: "Xem ngày tốt mua nhà", href: "/xem-ngay/mua-nha" },
            { label: "Xem ngày tốt kết hôn", href: "/xem-ngay/ket-hon" },
            { label: "Xem ngày tốt nhận chức", href: "/xem-ngay/nhan-chuc" },
            { label: "Xem ngày tốt ký hợp đồng", href: "/xem-ngay/ky-hop-dong" },
            { label: "Xem ngày hoàng đạo hắc đạo", href: "/xem-ngay/hoang-dao" },
            { label: "Xem ngày tốt nhập trạch", href: "/xem-ngay/nhap-trach" },
            { label: "Xem ngày tốt an táng", href: "/xem-ngay/an-tang" },
            { label: "Xem ngày tốt xây dựng", href: "/xem-ngay/xay-dung" },
            { label: "Xem ngày tốt đặt bếp sửa bếp", href: "/xem-ngay/dat-bep" },
            { label: "Xem ngày tốt chuyển nhà", href: "/xem-ngay/chuyen-nha" },
            { label: "Xem ngày tốt đổ trần lợp mái", href: "/xem-ngay/do-tran" },
            { label: "Xem ngày tốt xuất hành", href: "/xem-ngay/xuat-hanh" },
            { label: "Xem ngày tốt chuyển bàn thờ", href: "/xem-ngay/chuyen-ban-tho" },
        ]
    },
    {
         angle: 4,
        id: "phong-thuy",
        label: "Phong Thủy",
        href: "/phong-thuy",
        children: [
            { label: "Phong Thủy Sim", href: "/phong-thuy/phong-thuy-sim" },
            { label: "Hướng Nhà Theo Tuổi", href: "/phong-thuy/huong-nha-theo-tuoi" },
            { label: "Hướng Bếp Theo Tuổi", href: "/phong-thuy/huong-bep-theo-tuoi" },
            { label: "Hướng Bàn Thờ", href: "/phong-thuy/huong-ban-tho" },
            { label: "Hướng Bàn Làm Việc", href: "/phong-thuy/huong-ban-lam-viec" },
            { label: "Hướng Nhà Tắm", href: "/phong-thuy/huong-nha-tam-theo-tuoi" },
        ]
    },
    {
         angle: 5,
        id: "tu-vi",
        label: "Tử Vi",
        href: "/tu-vi",
        children: [
            { label: "Tử vi trọn đời", href: "/tu-vi/tron-doi" },
            { label: "Tử vi hàng ngày", href: "/tu-vi/hang-ngay" },
            { label: "Sao chiếu mệnh", href: "/tu-vi/sao-chieu-menh" },
            { label: "Bói Tình Yêu", href: "/tu-vi/boi-tinh-yeu" },
        ]
    },
    
    //     {
    //          angle: 6,
    //     id: "mua-vip",
    //     label: "Mua VIP",
    //     href: "/mua-vip",
    //     children: [
    //     ] 
    // },
            {
             angle: 6,
        id: "gioi-thieu",
        label: "Giới Thiệu",
        href: "/gioi-thieu",
        children: [
        ] 
    },
    {
         angle: 7,
        id: "tarot",
        label: "Tarot Reading",
        href: "/tarot",
        children: [] 
    },
    { angle: 8,
        id: "than-so-hoc",
        label: "Thần Số Học",
        href: "/thansohoc",
       children: []
    },
];
