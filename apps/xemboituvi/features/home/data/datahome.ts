// src/data/sections.ts
import {
  CalendarDays, Compass, Sparkles, Stars, SunMoon, BookOpenText,
  LayoutGrid, Home, Utensils, Footprints, Briefcase, 
  Building, Users, Baby, Heart, Store, CreditCard,
  HeartHandshake, Hand, Gem, Phone, Calendar, Clock,
  Search, Sun, Star, Dice5, TrendingUp, Scroll,
  Flame, Zap, Bird, Globe, FileSignature, MapPin, Bath
} from "lucide-react";

export const sections = [
  {
    title: "Tử Vi & Lá Số",
    description: "Tử vi là bộ môn khoa học dự đoán vận mệnh dựa trên các quy luật chuyển động của tinh tú tại thời điểm bạn chào đời. Khám phá 'bản đồ gene tâm linh' giúp bạn thấu hiểu bản thân, nhận diện cơ hội thăng tiến và chủ động phòng tránh rủi ro trong từng giai đoạn cuộc đời.",
    items: [
      { text: "Lập Lá Số Tử Vi", icon: Scroll, url: "/tu-vi/lap-la-so", bgImage: "https://images.unsplash.com/photo-1532667449560-72a95c8d381b?q=80&w=500" },
      { text: "Tử Vi 2025", icon: Stars, url: "/tu-vi/2025", bgImage: "https://png.pngtree.com/thumb_back/fw800/background/20210506/pngtree-gemini-constellation-zodiac-horoscope-image_710491.jpg" },
      { text: "Tử Vi Hằng Ngày", icon: Clock, url: "/tu-vi/hang-ngay", bgImage: "https://png.pngtree.com/thumb_back/fh260/background/20240526/pngtree-astrology-zodiac-sign-of-horoscope-in-deep-blue-the-star-and-image_15731970.jpg" },
      { text: "Tử Vi Trọn Đời", icon: Flame, url: "/tu-vi/tron-doi", bgImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=500" },
      { text: "Sao Chiếu Mệnh", icon: Star, url: "/tu-vi/sao-chieu-menh", bgImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500" },
      { text: "12 Cung Hoàng Đạo", icon: Bird, url: "/tu-vi/12-cung-hoang-dao", bgImage: "https://gcs.tripi.vn/public-tripi/tripi-feed/img/476586ieL/anh-mo-ta.png" },
    ],
  },
  {
    title: "Trắc Nghiệm & Khám Phá",
    description: "Dành cho những tâm hồn đang tìm kiếm sự thấu hiểu sâu sắc về cái tôi cá nhân. Thông qua các bộ môn khoa học tâm lý hiện đại như MBTI, DISC hay trí tuệ cổ xưa của Thần số học và Bản đồ sao, bạn sẽ tìm thấy câu trả lời cho những băn khoăn về tính cách, nghề nghiệp và định hướng tương lai.",
    items: [
      { text: "Thần Số Học Cho Con", icon: Baby, url: "/baby-numerology", bgImage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=500" },
      { text: "Trắc Nghiệm DISC", icon: FileSignature, url: "/test-disc", bgImage: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=500" },
      { text: "Trắc Nghiệm MBTI", icon: FileSignature, url: "/test-mbti", bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-gJMVIV98ziuVLnGpCYyaC9x_Hhx5rMIFeg&s" },
      { text: "Tra Cứu Bản Đồ Sao", icon: Globe, url: "/natal-star", bgImage: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=500" },
      { text: "Bói Bài Tarot", icon: Sparkles, url: "/tarot", bgImage: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?q=80&w=500" },
      { text: "Thần Số Học Tổng Hợp", icon: Gem, url: "/thansohoc", bgImage: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=500" },
    ],
  },
  {
    title: "Phong Thủy Cải Vận",
    description: "Phong thủy là nghệ thuật điều hòa luồng khí xung quanh để hỗ trợ vận mệnh con người. Bằng cách tối ưu hóa không gian sống, hướng nhà, hay các vật phẩm cá nhân hợp mệnh, bạn đang trực tiếp kích hoạt năng lượng tích cực, giúp gia đạo bình an và thu hút tài lộc hanh thông.",
    items: [
      { text: "Phong Thủy Sim", icon: LayoutGrid, url: "/phong-thuy/phong-thuy-sim", bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTD5mhfS9VQjmKffKVlTp1dvlWvAB6enl-kA&s" },
      { text: "Hướng Nhà Theo Tuổi", icon: Home, url: "/phong-thuy/huong-nha-theo-tuoi", bgImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=500" },
      { text: "Hướng Bếp Theo Tuổi", icon: Utensils, url: "/phong-thuy/huong-bep-theo-tuoi", bgImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=500" },
      { text: "Hướng Bàn Thờ", icon: Footprints, url: "/phong-thuy/huong-ban-tho", bgImage: "https://salt.tikicdn.com/ts/tmp/e9/c9/12/017b0fbb15a844dd4c8079cf601e0620.jpg" },
      { text: "Bàn Làm Việc", icon: Briefcase, url: "/phong-thuy/huong-ban-lam-viec", bgImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=500" },
      { text: "Hướng Nhà Tắm", icon: Bath, url: "/phong-thuy/huong-nha-tam-theo-tuoi", bgImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500" },
    ],
  },
  {
    title: "Xem Ngày Tốt",
    description: "Mỗi ngày đều mang một luồng năng lượng riêng biệt. Việc chọn ngày lành tháng tốt giúp bạn 'thuận thiên thừa vận', khiến các việc đại sự như cưới hỏi, khai trương hay động thổ diễn ra suôn sẻ, tạo khởi đầu may mắn và giảm thiểu những trục trặc không đáng có.",
    items: [
      { text: "Ngày Tốt Xấu", icon: SunMoon, url: "/xem-ngay/tot-xau", bgImage: "https://images.unsplash.com/photo-1495594059084-33752639b9c3?q=80&w=500" },
      { text: "Ngày Cưới Hỏi", icon: Heart, url: "/xem-ngay/ket-hon", bgImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500" },
      { text: "Ngày Động Thổ", icon: Building, url: "/xem-ngay/dong-tho", bgImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=500" },
      { text: "Ngày Khai Trương", icon: Store, url: "/xem-ngay/khai-truong", bgImage: "https://img4.thuthuatphanmem.vn/uploads/2020/12/25/background-khai-truong-cua-hang-cuc-dep_030943545.png" },
      { text: "Ngày Nhập Trạch", icon: MapPin, url: "/xem-ngay/nhap-trach", bgImage: "https://richardland.vn/wp-content/uploads/2024/09/mam-cung-nhap-trach-1.jpg" },
      { text: "Ngày Xuất Hành", icon: TrendingUp, url: "/xem-ngay/xuat-hanh", bgImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=500" },
    ],
  },
];