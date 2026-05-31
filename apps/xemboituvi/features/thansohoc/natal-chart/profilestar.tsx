'use client';

import React from 'react';
import { Sun, Moon, Star, Map, Compass, ArrowRight, Info, Heart } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function IntroNatalChart() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide uppercase mb-6">
              <Star size={12} /> Khám phá vũ trụ bên trong bạn
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Bản Đồ Sao & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Lá Số Chiêm Tinh
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Không chỉ là 12 cung hoàng đạo. Bản đồ sao là bức ảnh chụp bầu trời vào đúng khoảnh khắc bạn chào đời, hé lộ tiềm năng, cảm xúc và định mệnh của riêng bạn.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-indigo-200 hover:-translate-y-1 flex items-center gap-2">
                Lập Bản Đồ Sao Ngay <ArrowRight size={18} />
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-medium hover:border-slate-400 transition-colors">
                Tìm hiểu thêm
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-100 rounded-full opacity-50"></div>
        </div>
      </header>

      {/* --- WHAT IS IT SECTION --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div className="relative">
                 <div className="aspect-square rounded-2xl bg-white shadow-2xl shadow-indigo-100 p-8 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 border-[40px] border-slate-50 rounded-full scale-110 group-hover:scale-105 transition-transform duration-700"></div>
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/2647/2647287.png" 
                      alt="Astrology Chart" 
                      className="w-1/2 h-1/2 object-contain opacity-80 z-10 drop-shadow-lg"
                    />
                 </div>
                 <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dữ liệu chính xác</span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium">Được tính toán dựa trên kinh độ, vĩ độ và múi giờ quốc tế.</p>
                 </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-6">Bản Đồ Sao Là Gì?</h2>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed text-justify">
                  Hãy tưởng tượng khi bạn cất tiếng khóc chào đời, vũ trụ đã chụp lại một bức ảnh vị trí của Mặt Trời, Mặt Trăng và các hành tinh. Bức ảnh đó chính là <strong>Bản Đồ Sao (Natal Chart)</strong> của bạn.
                </p>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed text-justify">
                  Nó giống như một bản thiết kế tâm hồn, giải mã những tính cách tiềm ẩn, điểm mạnh, điểm yếu và những bài học cuộc đời mà bạn cần trải qua.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Phân tích tính cách sâu sắc hơn Horoscope hàng ngày.",
                    "Dự báo xu hướng phát triển cá nhân.",
                    "Thấu hiểu cách bạn yêu và được yêu."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                        <ArrowRight size={14} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- THE BIG 3 SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">3 Trụ Cột Của Bản Đồ Sao</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Trong bản đồ sao có rất nhiều hành tinh, nhưng đây là "Big 3" - ba yếu tố quan định hình con người bạn.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Sun size={28} />, color: "orange", title: "Sun Sign (Mặt Trời)", sub: "Cái tôi & Bản ngã", desc: "Đại diện cho ý chí, mục tiêu sống và cách bạn tỏa sáng. Đây là cung hoàng đạo chính của bạn." },
              { icon: <Moon size={28} />, color: "blue", title: "Moon Sign (Mặt Trăng)", sub: "Cảm xúc & Nội tâm", desc: "Phần ẩn giấu bên trong cai quản cảm xúc, nhu cầu an toàn và bản năng tự nhiên." },
              { icon: <Compass size={28} />, color: "purple", title: "Ascendant (Cung Mọc)", sub: "Mặt nạ xã hội", desc: "Cách thế giới nhìn nhận bạn lần đầu gặp gỡ. Nó định hình ngoại hình và phong cách." }
            ].map((item, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1} scale={0.95}>
                <div className={`group p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-${item.color}-100 hover:-translate-y-2 transition-all duration-300 h-full`}>
                  <div className={`w-14 h-14 bg-${item.color}-50 rounded-2xl flex items-center justify-center text-${item.color}-500 mb-6 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className={`text-sm font-semibold text-${item.color}-600 uppercase tracking-wider mb-4`}>{item.sub}</p>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- GRID INFO SECTION --- */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
                  Tại sao bạn cần <br/> <span className="text-indigo-400">Giờ Sinh Chính Xác?</span>
                </h2>
                <p className="text-slate-300 text-lg mb-8 font-light text-justify">
                  Trái Đất quay một vòng mỗi 24 giờ. Điều này có nghĩa là Cung Mọc thay đổi cứ mỗi 2 giờ, và độ chính xác của Mặt Trăng thay đổi theo từng phút.
                </p>
                <div className="flex flex-col gap-4">
                   <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <Info className="text-indigo-400 mt-1" />
                      <div>
                          <h4 className="font-bold text-white">Sai giờ sinh = Sai biểu đồ</h4>
                          <p className="text-slate-400 text-sm mt-1">Chỉ cần lệch 15 phút, vị trí các nhà (Houses) sẽ thay đổi hoàn toàn.</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <Map className="text-indigo-400 mt-1" />
                      <div>
                          <h4 className="font-bold text-white">Nơi sinh cũng quan trọng</h4>
                          <p className="text-slate-400 text-sm mt-1">Kinh độ và vĩ độ địa lý ảnh hưởng trực tiếp đến cấu trúc bản đồ sao.</p>
                      </div>
                   </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={0.3} scale={0.9}>
              <div className="h-full flex items-center justify-center">
                   <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full p-1 animate-spin-slow-custom">
                      <div className="absolute inset-0 bg-slate-900 rounded-full m-[2px] flex items-center justify-center text-center">
                          <div>
                              <p className="text-6xl font-serif text-white">12</p>
                              <p className="text-indigo-300 uppercase tracking-widest text-sm mt-2">Cung Hoàng Đạo</p>
                          </div>
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_20px_white]"></div>
                   </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-24 bg-white text-center px-6">
        <FadeIn direction="up">
          <div className="max-w-3xl mx-auto">
            <Heart className="mx-auto text-red-500 mb-6 animate-bounce" size={32} />
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">Sẵn sàng thấu hiểu bản thân?</h2>
            <p className="text-lg text-slate-500 mb-10">
              Nhập ngày, giờ và nơi sinh của bạn để nhận bản phân tích chi tiết ngay lập tức. Hoàn toàn miễn phí.
            </p>
            <button className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-full shadow-2xl shadow-indigo-300 hover:scale-105 transition-transform duration-300">
              Tạo Bản Đồ Sao Của Tôi
            </button>
          </div>
        </FadeIn>
      </section>

      <footer className="bg-slate-50 py-10 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
           <p>© 2024 AstroMap. All rights reserved.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
           </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin-slow-custom {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow-custom {
            animation: spin-slow-custom 20s linear infinite;
        }
      `}</style>
    </div>
  );
}