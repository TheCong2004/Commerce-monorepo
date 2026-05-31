"use client";

import React from "react";
import { 
  Info, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  Gem
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function IntroSaoChieuMenh() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* 1. Wrapper chính: Sử dụng hiệu ứng Scale nhẹ để "cuốn sách" kiến thức mở ra */}
      <FadeIn scale={0.98} direction="up">
        <div className="bg-[#FDFBF7] rounded-[3rem] shadow-sm border border-[#8A0000]/5 overflow-hidden text-[#252525]">
          
          {/* Header */}
          <div className="bg-[#8A0000]/5 py-12 px-8 text-center border-b border-[#8A0000]/5">
            <h2 className="text-[#8A0000] text-3xl font-black uppercase tracking-tighter italic">
              Tìm hiểu về Cửu Diệu Tinh Quân
            </h2>
            <p className="text-[#8b4513]/60 text-xs mt-2 uppercase tracking-widest font-bold">
              Kiến thức tử vi bản mệnh 2025
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            
            {/* SECTION 1: KHÁI NIỆM */}
            <FadeIn direction="up" delay={0.2}>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#8A0000]">
                    <Info size={20} />
                    <span className="font-black uppercase tracking-widest text-xs">Khái niệm</span>
                  </div>
                  <h3 className="text-2xl font-bold leading-tight">Sao chiếu mệnh là gì?</h3>
                  <p className="text-gray-600 leading-relaxed font-serif italic text-justify">
                    Trong vòng quay của thời gian, mỗi năm con người lại đón nhận một nguồn năng lượng khác nhau từ vũ trụ. 
                    <span className="text-[#8A0000] font-bold"> Sao chiếu mệnh</span> chính là đại diện cho tần số năng lượng đó, 
                    quyết định sự hanh thông hay trắc trở của bản mệnh trong năm 2025.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-[#8A0000]/10 shadow-inner">
                   <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="space-y-1">
                        <p className="text-[#8A0000] font-black text-xl">9</p>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">Vì sao</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[#8A0000] font-black text-xl">1</p>
                        <p className="text-[10px] uppercase text-gray-400 font-bold">Chu kỳ năm</p>
                      </div>
                   </div>
                </div>
              </section>
            </FadeIn>

            {/* SECTION 2: PHÂN LOẠI - Hiện ra đuổi nhau */}
            <section className="space-y-6">
              <div className="h-px bg-[#8A0000]/10 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FadeIn direction="up" delay={0.4}>
                  <StarType 
                    icon={<Gem className="text-emerald-600" size={20} />}
                    title="Cát Tinh" 
                    list="Thái Dương, Thái Âm, Mộc Đức"
                    desc="Tượng trưng cho ánh sáng và tài lộc."
                  />
                </FadeIn>
                <FadeIn direction="up" delay={0.5}>
                  <StarType 
                    icon={<Sparkles className="text-amber-500" size={20} />}
                    title="Trung Tinh" 
                    list="Thủy Diệu, Thổ Tú, Vân Hớn"
                    desc="Cân bằng giữa thử thách và cơ hội."
                  />
                </FadeIn>
                <FadeIn direction="up" delay={0.6}>
                  <StarType 
                    icon={<ShieldCheck className="text-rose-600" size={20} />}
                    title="Hung Tinh" 
                    list="La Hầu, Kế Đô, Thái Bạch"
                    desc="Cần giữ tâm vững trước biến động."
                  />
                </FadeIn>
              </div>
            </section>

            {/* SECTION 3: GÓC GIẢI ĐÁP - Hiện sau cùng */}
            <FadeIn direction="up" delay={0.8}>
              <section className="bg-[#8A0000] text-white p-8 rounded-[2rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <HelpCircle size={100} />
                </div>
                <div className="relative z-10 space-y-4 text-left">
                  <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] opacity-70">Góc giải đáp</h4>
                  <p className="text-xl font-serif italic">"Gặp sao xấu có cần quá lo lắng?"</p>
                  <p className="text-sm opacity-80 max-w-2xl leading-relaxed">
                    Người xưa có câu: "Đức năng thắng số". Sao xấu chỉ là lời nhắc nhở ta sống chậm lại, cẩn trọng và bao dung hơn. Khi tâm ta an ổn, mọi vận hạn đều có thể chuyển hóa thành bài học quý giá.
                  </p>
                </div>
              </section>
            </FadeIn>

          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function StarType({ icon, title, list, desc }: any) {
  return (
    <div className="space-y-3 p-2 text-left">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="font-black text-sm uppercase tracking-wider">{title}</h4>
      </div>
      <p className="text-[#8A0000] font-bold text-sm">{list}</p>
      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}