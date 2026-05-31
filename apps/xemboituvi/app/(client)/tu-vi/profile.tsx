'use client';

import React from 'react';
import { Compass, Scroll, Moon, Sun, Flower, Book, Star, Activity, Users, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function IntroTuVi() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-red-100 selection:text-red-900">
      
      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
             style={{backgroundImage: `url('https://www.transparenttextures.com/patterns/black-scales.png')`}}></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-red-900/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-amber-600/20 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-b border-t border-amber-600 text-amber-700 text-xs font-bold tracking-[0.2em] uppercase mb-6">
              <Flower size={14} className="animate-spin-slow" /> Mệnh Do Trời - Vận Do Người
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-red-900 mb-6 leading-tight">
              Giải Mã Thiên Cơ <br />
              <span className="text-amber-600 italic">Lá Số Tử Vi</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 font-light leading-relaxed font-serif">
              Hệ thống luận giải vận mệnh phương Đông dựa trên sự vận hành của hơn 100 ngôi sao, Ngũ Hành và Âm Dương tại thời điểm bạn chào đời.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-10 py-4 bg-red-900 text-[#FDFBF7] font-medium hover:bg-red-800 transition-all duration-300 shadow-lg shadow-red-900/30 flex items-center gap-2 border border-red-900">
                <Scroll size={20} /> Lấy Lá Số Ngay
              </button>
              <button className="px-10 py-4 bg-transparent text-red-900 border border-red-900 font-medium hover:bg-red-50 transition-colors">
                Tìm Hiểu Về Các Sao
              </button>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* --- INTRO SECTION --- */}
      <section className="py-20 bg-[#F5F0E6]">
        <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <FadeIn direction="right">
                  <div className="relative">
                      <div className="absolute -inset-4 border-2 border-red-900/20 translate-x-4 translate-y-4 z-0"></div>
                      <img 
                          src="https://images.unsplash.com/photo-1626278854898-d5673059286d?q=80&w=2070&auto=format&fit=crop" 
                          alt="Asian lantern and scroll" 
                          className="relative z-10 w-full h-auto shadow-2xl sepia-[.3]"
                      />
                  </div>
                </FadeIn>
                <FadeIn direction="left" delay={0.2}>
                  <div>
                      <h2 className="text-3xl font-serif text-red-900 mb-6 font-bold">Tử Vi Đẩu Số Là Gì?</h2>
                      <p className="text-slate-700 text-lg mb-6 leading-relaxed font-serif text-justify">
                          Tử Vi không phải là bói toán ngẫu nhiên. Đây là một bộ môn khoa học thống kê cổ đại, sử dụng <strong>Giờ - Ngày - Tháng - Năm sinh (Âm lịch)</strong> để lập nên một bản đồ sao gọi là "Lá Số".
                      </p>
                      <p className="text-slate-700 text-lg mb-8 leading-relaxed font-serif text-justify">
                          Trên lá số đó, các sao (Chính tinh và Phụ tinh) được an định vào 12 Cung, phản ánh bức tranh toàn cảnh về cuộc đời, từ tính cách, sự nghiệp, tiền tài cho đến gia đạo và sức khỏe.
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                          <div className="flex items-center gap-3">
                              <Sun className="text-amber-600" size={24}/>
                              <span className="font-bold text-red-900">Dương Lịch</span>
                          </div>
                          <div className="flex items-center gap-3">
                              <Moon className="text-amber-600" size={24}/>
                              <span className="font-bold text-red-900">Âm Lịch</span>
                          </div>
                          <div className="flex items-center gap-3">
                              <Compass className="text-amber-600" size={24}/>
                              <span className="font-bold text-red-900">Ngũ Hành</span>
                          </div>
                          <div className="flex items-center gap-3">
                              <Star className="text-amber-600" size={24}/>
                              <span className="font-bold text-red-900">108 Vì Sao</span>
                          </div>
                      </div>
                  </div>
                </FadeIn>
            </div>
        </div>
      </section>

      {/* --- 12 CUNG --- */}
      <section className="py-24 px-6 relative">
         <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]"></div>
         
         <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn direction="up">
              <div className="text-center mb-16">
                  <span className="text-amber-600 font-bold uppercase tracking-widest text-sm">Cấu trúc lá số</span>
                  <h2 className="text-3xl md:text-5xl font-serif text-red-900 mt-2 mb-4 font-bold">12 Cung Số Mệnh</h2>
                  <div className="w-24 h-1 bg-red-900 mx-auto"></div>
                  <p className="text-slate-600 mt-6 max-w-2xl mx-auto font-serif">
                      Lá số Tử Vi chia cuộc đời thành 12 phương diện khác nhau. Mỗi cung chứa đựng những bí mật riêng về từng khía cạnh trong cuộc sống của bạn.
                  </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Cung Mệnh", desc: "Tổng quan tính cách, ngoại hình và định hướng cuộc đời.", icon: <Activity /> },
                    { title: "Cung Quan Lộc", desc: "Sự nghiệp, công danh, chức vụ và con đường thăng tiến.", icon: <Book /> },
                    { title: "Cung Tài Bạch", desc: "Tiền tài, khả năng kiếm tiền và cách quản lý tài chính.", icon: <Scroll /> },
                    { title: "Cung Phu Thê", desc: "Hôn nhân, người phối ngẫu và hạnh phúc gia đình.", icon: <Users /> },
                ].map((item, index) => (
                  <FadeIn key={index} direction="up" delay={index * 0.1}>
                    <div className="group h-full p-8 border border-amber-900/10 bg-white hover:bg-red-900 hover:text-white transition-all duration-500 cursor-pointer shadow-lg hover:shadow-red-900/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Flower size={60} />
                        </div>
                        <div className="text-amber-600 group-hover:text-amber-300 mb-4 transition-colors">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3 uppercase tracking-wide">{item.title}</h3>
                        <p className="text-sm text-slate-500 group-hover:text-red-100 leading-relaxed transition-colors">
                            {item.desc}
                        </p>
                        <div className="w-8 h-[1px] bg-amber-600 mt-6 group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </FadeIn>
                ))}
            </div>
            
            <FadeIn direction="up" delay={0.5}>
              <div className="text-center mt-12">
                  <button className="text-red-900 font-bold border-b-2 border-red-900 pb-1 hover:text-amber-700 hover:border-amber-700 transition-colors">
                      Xem toàn bộ 12 Cung &rarr;
                  </button>
              </div>
            </FadeIn>
         </div>
      </section>

      {/* --- DAI HAN / TIEU HAN --- */}
      <section className="py-20 bg-red-900 text-[#FDFBF7] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')]"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Luận Giải Vận Hạn <br/> <span className="text-amber-400">Đại Hạn & Tiểu Hạn</span></h2>
                  <p className="text-red-100 text-lg mb-6 font-serif leading-relaxed">
                      Tử Vi không chỉ nói về tính cách, mà còn là công cụ dự báo thời vận mạnh mẽ nhất.
                  </p>
                  <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                          <div className="mt-1 w-2 h-2 rotate-45 bg-amber-400"></div>
                          <div>
                              <strong className="text-amber-200 block text-lg">Đại Hạn (10 năm)</strong>
                              <span className="text-red-200 text-sm">Xu hướng thịnh suy trong mỗi thập kỷ của cuộc đời.</span>
                          </div>
                      </li>
                      <li className="flex items-start gap-4">
                          <div className="mt-1 w-2 h-2 rotate-45 bg-amber-400"></div>
                          <div>
                              <strong className="text-amber-200 block text-lg">Tiểu Hạn (1 năm)</strong>
                              <span className="text-red-200 text-sm">Chi tiết cát hung trong năm nay: tiền bạc, ốm đau, thị phi...</span>
                          </div>
                      </li>
                  </ul>
                  <button className="mt-8 px-8 py-3 bg-amber-600 text-white font-bold rounded hover:bg-amber-500 transition-colors shadow-lg shadow-black/30">
                      Xem Vận Hạn Năm Nay
                  </button>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.2} scale={0.9}>
              <div className="flex justify-center">
                  <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] border-4 border-amber-600/30 rounded-full flex items-center justify-center p-4">
                      <div className="absolute inset-0 border border-white/10 rounded-full animate-spin-slow"></div>
                      <div className="w-full h-full border border-dashed border-amber-600/50 rounded-full flex items-center justify-center relative">
                          {[...Array(12)].map((_, i) => (
                              <div key={i} className="absolute w-2 h-2 bg-amber-500 rounded-full" 
                                   style={{
                                     top: '50%', left: '50%',
                                     transform: `rotate(${i * 30}deg) translate(140px) md:translate(190px)`
                                   }}>
                              </div>
                          ))}
                          <div className="text-center">
                              <div className="text-4xl md:text-6xl font-serif font-bold text-white">2026</div>
                              <div className="text-amber-400 font-serif uppercase tracking-widest mt-2">Bính Ngọ</div>
                          </div>
                      </div>
                  </div>
              </div>
            </FadeIn>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 bg-[#FDFBF7] text-center px-6">
        <FadeIn scale={0.95}>
          <div className="max-w-2xl mx-auto border-4 border-double border-red-900 p-10 md:p-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FDFBF7] px-4">
                <Flower className="text-red-900" size={32} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif text-red-900 mb-6 font-bold">An Sao Lập Số Ngay</h2>
            <p className="text-lg text-slate-600 mb-10 font-serif">
              Mọi sự thành bại đều có nguyên do. Hãy khám phá bản đồ định mệnh của bạn để nắm bắt cơ hội và hóa giải rủi ro.
            </p>
            
            <div className="flex flex-col gap-4 max-w-md mx-auto">
                <input type="text" placeholder="Họ và Tên" className="p-3 border border-amber-900/30 bg-transparent outline-none focus:border-red-900 placeholder:text-slate-400 font-serif" />
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Ngày sinh (DL)" className="p-3 border border-amber-900/30 bg-transparent outline-none focus:border-red-900 placeholder:text-slate-400 font-serif" />
                    <input type="text" placeholder="Giờ sinh" className="p-3 border border-amber-900/30 bg-transparent outline-none focus:border-red-900 placeholder:text-slate-400 font-serif" />
                </div>
                <button className="w-full py-4 bg-red-900 text-white font-bold uppercase tracking-widest hover:bg-red-800 transition-all shadow-xl">
                  Bình Giải Miễn Phí <ArrowRight className="inline ml-2" size={16}/>
                </button>
            </div>
          </div>
        </FadeIn>
      </section>

      <style jsx>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
}