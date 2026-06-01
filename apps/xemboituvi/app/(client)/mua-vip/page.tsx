"use client";

import { motion } from "framer-motion";
import { Crown, Check, Sparkles, Star, Moon, Sun, Compass } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import FadeIn from "../../../components/ui/FadeIn";
import { parseVndPrice, redirectToPrintervalCheckout } from "@/lib/printerval-checkout";

const VIP_SERVICES = [
  {
    id: "numerology",
    title: "Thần Số Học",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-amber-400 to-orange-600",
    price: "199.000",
    features: ["Xuất báo cáo 60+ trang", "Chỉ số nợ nghiệp chi tiết", "Dự báo vận trình 12 tháng", "Lời khuyên cải vận"],
  },
  {
    id: "tu-vi",
    title: "Tử Vi Chuẩn",
    icon: <Star className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-700",
    price: "299.000",
    features: ["Lá số tử vi trọn đời", "Giải đoán 12 cung chi tiết", "Hạn năm & Đại vận", "Hỏi đáp chuyên gia"],
  },
  {
    id: "phong-thuy",
    title: "Phong Thủy",
    icon: <Compass className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-700",
    price: "250.000",
    features: ["Bố trí nhà cửa cát tường", "Màu sắc & Con số hợp mệnh", "Vật phẩm trợ vận", "Sim phong thủy"],
  },
  {
    id: "xem-ngay",
    title: "Xem Ngày Tốt",
    icon: <Sun className="w-6 h-6" />,
    color: "from-rose-500 to-red-700",
    price: "99.000",
    features: ["Ngày giờ hoàng đạo", "Khai trương, cưới hỏi", "Xuất hành, động thổ", "Tránh ngày hắc đạo"],
  },
  {
    id: "tarot",
    title: "Tarot VIP",
    icon: <Moon className="w-6 h-6" />,
    color: "from-blue-600 to-cyan-700",
    price: "150.000",
    features: ["Trải bài không giới hạn", "Giải mã thông điệp ẩn", "Kết nối năng lượng trực tiếp", "Dự báo tuần mới"],
  },
];

export default function MuaVipPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (tab) setActiveId(tab);
  }, [tab]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] py-20 px-4 relative overflow-hidden text-white">
      {/* Hiệu ứng nền mờ - Giữ nguyên */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 1. Header: Hiệu ứng rơi từ trên xuống */}
        <FadeIn direction="down">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-bold mb-6">
              <Crown size={16} /> DỊCH VỤ CAO CẤP
            </div>
            <h1 className="text-4xl papyrus md:text-6xl font-black mb-4 tracking-tight">
              Nâng Cấp Quyền Lợi <span className="text-transparent papyrus bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">VIP</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Mở khóa các bản luận giải chuyên sâu, không giới hạn tính năng và nhận sự hỗ trợ đặc biệt từ đội ngũ chuyên gia hàng đầu.
            </p>
          </div>
        </FadeIn>

        {/* 2. Danh sách Cards: Sử dụng delay so le để tạo hiệu ứng đuổi nhau */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIP_SERVICES.map((item, index) => (
            <FadeIn 
              key={item.id} 
              direction="up" 
              delay={index * 0.1} // Mỗi card hiện cách nhau 0.1s
            >
              <div className={`relative p-[1px] rounded-[32px] group transition-all duration-500 h-full ${
                activeId === item.id ? "scale-105" : "hover:scale-[1.02]"
              }`}>
                <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${item.color} opacity-30 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative h-full bg-[#161618] rounded-[31px] p-8 flex flex-col">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg shadow-black/50`}>
                    {item.icon}
                  </div>

                  <h3 className="text-2xl papyrus font-bold mb-2">{item.title}</h3>
                  
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-black">{item.price}đ</span>
                    <span className="text-gray-500 text-sm">/gói</span>
                  </div>

                  <div className="space-y-4 flex-grow mb-8">
                    {item.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3">
                        <div className="mt-1 bg-white/10 rounded-full p-0.5">
                          <Check size={12} className="text-amber-400" />
                        </div>
                        <span className="text-gray-300 text-sm leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-4 rounded-2xl bg-gradient-to-r ${item.color} font-bold text-white shadow-xl hover:brightness-110 active:scale-[0.98] transition-all`}
                    onClick={() =>
                      redirectToPrintervalCheckout({
                        id: `vip-${item.id}`,
                        title: `Goi VIP ${item.title}`,
                        price: parseVndPrice(item.price),
                        variantTitle: "Goi VIP",
                        source: "mua-vip",
                        metadata: {
                          service_id: item.id,
                          features: item.features,
                          original_price: item.price,
                        },
                      })
                    }
                  >
                    Đăng Ký Ngay
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 3. Phần Combo: Hiện ra sau cùng */}
        <FadeIn direction="up" delay={0.5}>
          <div className="mt-20 p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-black">
                <Crown size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Gói VIP Combo (Tất cả dịch vụ)</h4>
                <p className="text-gray-400 text-sm">Tiết kiệm 50% khi đăng ký trọn bộ dịch vụ cao cấp.</p>
              </div>
            </div>
            <button className="px-10 py-4 rounded-2xl bg-white text-black font-black hover:bg-amber-400 transition-colors">
              TƯ VẤN COMBO
            </button>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
