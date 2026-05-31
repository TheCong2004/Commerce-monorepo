"use client";
import React from "react";
import { 
  ScrollText, 
  Zap, 
  FileSearch, 
  Milestone,
  Gem,
  Crosshair,
  Star,
  Flame
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function IntroTuViTronDoi() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-4 font-sans text-[#252525]">
      <div className="space-y-24">
        
        {/* --- SECTION 1: KHÁI NIỆM --- */}
        <section id="la-so-tu-vi-la-gi">
          <FadeIn direction="up">
            <div className="flex items-center gap-4 mb-10 justify-center md:justify-start">
              <div className="p-3 bg-[#8A0000]/5 rounded-full border border-[#8A0000]/20 shadow-inner">
                <ScrollText className="text-[#8A0000] w-8 h-8" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[#8A0000] uppercase tracking-tighter papyrus italic drop-shadow-sm">
                1. Lá Số Tử Vi Là Gì?
              </h2>
            </div>
            
            <div className="relative bg-[#FDFBF7] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-x-[10px] md:border-x-[14px] border-[#E6D0A8] p-8 md:p-14 rounded-sm overflow-hidden border-y border-[#8A0000]/10 leading-[2.2] md:leading-[2.6] text-lg font-serif italic text-justify">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
              
              <p className="relative z-10 first-letter:text-6xl first-letter:font-black first-letter:text-[#8A0000] first-letter:mr-3 first-letter:float-left first-letter:papyrus">
                <strong className="text-[#8A0000] font-black not-italic underline decoration-double underline-offset-4">Lá số Tử Vi</strong> được ví như một bản "bản đồ gene tâm linh" của mỗi con người. Nó là sự phối hợp phức tạp giữa Thiên bàn và Địa bàn, dựa trên 4 trụ cột thời gian: <span className="font-black text-[#8A0000]">Giờ, Ngày, Tháng, Năm sinh</span> theo hệ thống Âm lịch phương Đông truyền thống.
              </p>
              <p className="mt-6 relative z-10">
                Khi lập lá số, các vị tinh tú sẽ được an định vào 12 cung chức. Mỗi sự sắp xếp này phản ánh một khía cạnh cụ thể của cuộc đời, từ tư chất cá nhân đến các mối quan hệ xã hội và biến cố theo từng đại vận của gia chủ.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* --- SECTION 2: 12 CUNG CHỨC --- */}
        <section id="12-cung-chuc">
          <FadeIn direction="up">
            <div className="flex flex-col items-center mb-12 text-center">
               <Star className="text-[#D4AF37] mb-4 animate-pulse" fill="#D4AF37" size={24} />
               <h2 className="text-3xl md:text-5xl font-black text-[#8A0000] uppercase tracking-tighter papyrus italic">
                 2. Cấu trúc 12 Cung Chức
               </h2>
               <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#8A0000]/30 to-transparent mt-4"></div>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: "Mệnh & Thân", desc: "Tư chất, tính cách và định hướng cốt lõi của bản thân." },
              { title: "Phúc Đức", desc: "Dòng tộc, phước báu và đời sống tâm linh của chủ sự." },
              { title: "Quan Lộc", desc: "Con đường sự nghiệp, công danh và quyền lực xã hội." },
              { title: "Tài Bạch", desc: "Khả năng tài chính, phương thức kiếm tiền và tích lũy." },
              { title: "Phu Thê", desc: "Duyên nợ, tình trạng hôn nhân và người bạn đời." },
              { title: "Thiên Di", desc: "Vận may khi ra ngoài, xuất ngoại và môi trường xã hội." },
              { title: "Tử Tức", desc: "Đường con cái, khả năng sinh dưỡng và hậu vận." },
              { title: "Phụ Mẫu", desc: "Mối quan hệ với cha mẹ và ân đức dòng họ." },
            ].map((cung, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.05}>
                <div className="bg-[#FDFBF7] h-full p-6 rounded-sm border-l-4 border-[#8A0000] shadow-md hover:shadow-xl hover:translate-y-[-4px] transition-all group border-y border-r border-[#8A0000]/10">
                  <h3 className="text-[#8A0000] font-black uppercase text-sm mb-3 tracking-widest group-hover:text-[#cc0000] flex items-center gap-2">
                    <Flame size={14} fill="#8A0000" stroke="none" /> {cung.title}
                  </h3>
                  <p className="text-sm text-[#252525]/60 leading-relaxed font-serif italic">{cung.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: GIÁ TRỊ LUẬN GIẢI --- */}
        <section id="gia-tri-luan-giai">
          <FadeIn direction="up">
            <div className="flex items-center gap-4 mb-10 justify-center md:justify-start">
              <div className="p-3 bg-[#8A0000]/5 rounded-full border border-[#8A0000]/20 shadow-inner">
                <Zap className="text-[#8A0000] w-8 h-8" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[#8A0000] uppercase tracking-tighter papyrus italic">
                3. Giá trị luận giải trọn đời
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeIn direction="right" delay={0.2}>
                <div className="flex h-full gap-6 bg-[#FDFBF7] p-8 rounded-[2rem] border-2 border-[#8A0000]/10 shadow-lg relative overflow-hidden group">
                  <Crosshair className="text-[#D4AF37] shrink-0 group-hover:rotate-45 transition-transform" size={32} />
                  <div className="relative z-10">
                    <h4 className="text-[#8A0000] font-black mb-3 text-xl uppercase papyrus tracking-tighter italic">Định vị bản thân</h4>
                    <p className="text-[#252525]/60 font-serif italic leading-relaxed">Hiểu rõ ưu khuyết điểm bẩm sinh để lựa chọn môi trường phát triển phù hợp nhất, tránh những lĩnh vực không thuộc về bản mệnh.</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={0.2}>
                <div className="flex h-full gap-6 bg-[#FDFBF7] p-8 rounded-[2rem] border-2 border-[#8A0000]/10 shadow-lg relative overflow-hidden group">
                  <Milestone className="text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" size={32} />
                  <div className="relative z-10">
                    <h4 className="text-[#8A0000] font-black mb-3 text-xl uppercase papyrus tracking-tighter italic">Dự báo đại vận</h4>
                    <p className="text-[#252525]/60 font-serif italic leading-relaxed">Biết rõ chu kỳ 10 năm (đại vận) và từng năm (tiểu vận) để biết khi nào nên tiến công mạnh mẽ, khi nào nên thu mình phòng thủ.</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn scale={0.95}>
              <div className="p-10 md:p-14 bg-gradient-to-br from-[#8A0000] to-[#5D0000] rounded-[2.5rem] text-[#FDFBF7] relative overflow-hidden group shadow-2xl border border-[#D4AF37]/30">
                <Gem className="absolute -right-4 -bottom-4 w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                <h4 className="font-black uppercase tracking-[0.3em] text-xs mb-6 text-[#D4AF37]">Triết lý Tử Vi hiện đại</h4>
                <p className="text-2xl md:text-4xl font-serif italic font-medium leading-tight mb-8">
                  "Tử Vi không phải định mệnh bất biến, mà là bản hướng dẫn để tối ưu hóa cuộc đời."
                </p>
                <div className="flex items-center gap-3">
                   <div className="h-[2px] w-12 bg-[#D4AF37]"></div>
                   <p className="text-[#D4AF37] font-black uppercase text-xs tracking-[0.3em]">
                     Biết mệnh để làm chủ vận mệnh
                   </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- SECTION 4: QUY TRÌNH --- */}
        <section id="quy-trinh" className="pb-20">
          <FadeIn direction="up">
            <div className="flex items-center gap-4 mb-10 justify-center md:justify-start">
              <div className="p-3 bg-[#8A0000]/5 rounded-full border border-[#8A0000]/20 shadow-inner">
                <FileSearch className="text-[#8A0000] w-8 h-8" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[#8A0000] uppercase tracking-tighter papyrus italic">
                4. Quy trình lập lá số chuẩn
              </h2>
            </div>
          </FadeIn>

          <FadeIn scale={0.98}>
            <div className="relative bg-[#FDFBF7] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-x-[10px] md:border-x-[14px] border-[#E6D0A8] p-8 md:p-16 rounded-sm overflow-hidden border-y border-[#8A0000]/10">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
              
              <div className="relative z-10 border-l-2 border-[#8A0000]/20 ml-4 md:ml-8 space-y-16 py-4">
                {[
                  { step: "BƯỚC 1", title: "Cung cấp dữ liệu", desc: "Nhập chính xác Ngày, Giờ sinh theo lịch Dương hoặc Âm để làm căn cứ lập cực." },
                  { step: "BƯỚC 2", title: "Thiết lập Thiên bàn", desc: "Hệ thống tự động an định vị trí của 114 vì sao vào các cung chức tương ứng." },
                  { step: "BƯỚC 3", title: "Luận giải tổng quan", desc: "Phân tích mối quan hệ Âm dương Ngũ hành, Cục và Mệnh cùng các bộ chính tinh." },
                  { step: "BƯỚC 4", title: "Chi tiết vận hạn", desc: "Đưa ra dự báo cho từng đại vận và lời khuyên để gia chủ cải thiện vận số, đón cát tránh hung." },
                ].map((item, i) => (
                  <FadeIn key={i} direction="up" delay={i * 0.15}>
                    <div className="relative pl-12 group">
                      <div className="absolute left-[-11px] top-1 w-5 h-5 bg-[#FDFBF7] border-2 border-[#8A0000] rounded-full shadow-[0_0_10px_rgba(138,0,0,0.3)] group-hover:scale-125 group-hover:bg-[#8A0000] transition-all flex items-center justify-center">
                         <div className="w-1.5 h-1.5 bg-[#8A0000] rounded-full group-hover:bg-[#FDFBF7]"></div>
                      </div>
                      <div className="inline-block">
                        <span className="text-[#8A0000] font-black text-[10px] md:text-xs tracking-[0.2em] bg-[#8A0000]/5 px-4 py-1 rounded-full border border-[#8A0000]/10 shadow-sm">
                          {item.step}
                        </span>
                      </div>
                      <h4 className="text-[#252525] font-black text-2xl mt-4 papyrus italic tracking-tighter group-hover:text-[#8A0000] transition-colors leading-none">
                        {item.title}
                      </h4>
                      <p className="text-[#252525]/60 text-lg font-serif italic mt-3 leading-relaxed max-w-2xl text-justify">
                        {item.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[95%] h-4 bg-gradient-to-t from-[#E6D0A8]/50 to-transparent opacity-40 blur-sm"></div>
            </div>
          </FadeIn>
        </section>

      </div>
    </div>
  );
}