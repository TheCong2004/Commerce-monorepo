'use client';

import React from 'react';
import { 
  Sparkles, Map, Heart, User, TrendingUp, 
  ArrowRight, Star, Compass, BookOpen, Crown 
} from 'lucide-react';
import Link from 'next/link'; // Dùng để chuyển hướng sang trang tính

export default function NumerologyIntroPage() {
  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* --- HERO SECTION: GÂY ẤN TƯỢNG --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px]"></div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight animate-fade-in-up">
            Bạn Là Ai Trong <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              Vũ Trụ Này?
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Ngày sinh và cái tên của bạn không phải là ngẫu nhiên. Đó là tấm bản đồ kho báu ẩn chứa năng lực, sứ mệnh và định hướng cuộc đời mà bạn đang tìm kiếm.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-200">
            {/* Nút này sẽ dẫn sang trang tính toán */}
            <Link href="/numerology/calculator" className="group relative px-8 py-4 bg-white text-indigo-950 rounded-full font-bold text-lg hover:bg-purple-50 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center gap-3">
              Giải Mã Ngay
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all text-slate-300 font-medium">
              Tìm Hiểu Thêm
            </button>
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY SECTION: GIẢI THÍCH --- */}
      <section className="py-20 bg-slate-900 border-t border-white/5">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur-lg opacity-30 transform rotate-3"></div>
            <div className="relative bg-slate-800 p-8 rounded-2xl border border-white/10">
              <BookOpen className="text-purple-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold text-white mb-4">"Vạn vật đều là các con số"</h3>
              <p className="text-slate-400 italic mb-4">
                - Pythagoras (Nhà toán học, Triết học)
              </p>
              <p className="text-slate-300 leading-relaxed">
                Thần số học không phải bói toán. Nó là bộ môn thống kê và phân tích năng lượng dựa trên sóng rung của các con số. Giống như GPS, nó không lái xe thay bạn, nhưng nó chỉ cho bạn biết đâu là đường cao tốc, đâu là đường gập ghềnh.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tại sao bạn nên có Bản đồ số?</h2>
            <ul className="space-y-6">
              {[
                { title: "Thấu hiểu chính mình", desc: "Gọi tên được những mâu thuẫn nội tâm và tài năng tiềm ẩn." },
                { title: "Định hướng sự nghiệp", desc: "Chọn nghề nghiệp phù hợp với năng lực bẩm sinh." },
                { title: "Cải thiện mối quan hệ", desc: "Hiểu được ngôn ngữ tình yêu và cách giao tiếp của người khác." },
                { title: "Nắm bắt thời vận", desc: "Biết năm nay nên 'tấn công' hay 'phòng thủ'." }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 text-indigo-400 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- KEY METRICS: 5 CHỈ SỐ --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
              5 Chìa Khóa Vàng
            </h2>
            <p className="text-slate-400">Hệ thống SoulFriend sẽ phân tích chi tiết 5 chỉ số cốt lõi này</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Số Chủ Đạo */}
            <div className="group bg-slate-800/50 p-8 rounded-3xl border border-white/5 hover:border-purple-500/50 transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Crown size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Số Chủ Đạo</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Được ví như "Vị Thuyền Trưởng". Chỉ số quan trọng nhất tiết lộ con đường đời, bài học lớn nhất và mục đích sống của bạn.
              </p>
              <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Tính từ Ngày sinh</span>
            </div>

            {/* Card 2: Sứ Mệnh */}
            <div className="group bg-slate-800/50 p-8 rounded-3xl border border-white/5 hover:border-blue-500/50 transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Sparkles size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Số Sứ Mệnh</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Được ví như "Túi Hành Trang". Tiết lộ tài năng, sở trường bẩm sinh và công cụ mạnh nhất để bạn đạt được thành công.
              </p>
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Tính từ Họ Tên</span>
            </div>

            {/* Card 3: Linh Hồn */}
            <div className="group bg-slate-800/50 p-8 rounded-3xl border border-white/5 hover:border-pink-500/50 transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Chỉ Số Linh Hồn</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Được ví như "Trái Tim". Là khát khao thầm kín, động lực sâu sắc nhất khiến bạn cảm thấy hạnh phúc và thỏa mãn.
              </p>
              <span className="text-pink-400 text-xs font-bold uppercase tracking-wider">Tính từ Nguyên âm</span>
            </div>

            {/* Card 4: Nhân Cách */}
            <div className="group bg-slate-800/50 p-8 rounded-3xl border border-white/5 hover:border-teal-500/50 transition-all hover:-translate-y-2 duration-300 md:col-span-1.5 lg:col-span-1">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                <User size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Chỉ Số Nhân Cách</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Được ví như "Chiếc Mặt Nạ". Là cách bạn thể hiện ra bên ngoài và ấn tượng đầu tiên của người khác về bạn.
              </p>
            </div>

            {/* Card 5: Vận Niên */}
            <div className="group bg-slate-800/50 p-8 rounded-3xl border border-white/5 hover:border-orange-500/50 transition-all hover:-translate-y-2 duration-300 md:col-span-1.5 lg:col-span-2">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform flex-shrink-0">
                    <TrendingUp size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Vận Niên Cá Nhân (Personal Year)</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-2">
                        Dự báo thời tiết cho cuộc đời bạn trong năm nay. Năm số 1 để bắt đầu, năm số 4 để củng cố, năm số 9 để buông bỏ. Biết người biết ta, trăm trận trăm thắng.
                    </p>
                    <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Dự báo tương lai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
            <div className="relative bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-10 md:p-16 text-center overflow-hidden border border-white/10">
                {/* Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -ml-16 -mb-16"></div>

                <div className="relative z-10">
                    <Compass size={48} className="mx-auto text-purple-300 mb-6 animate-spin-slow" />
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Đã đến lúc tìm ra con số của bạn</h2>
                    <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto">
                        Đừng để cuộc đời trôi qua một cách mơ hồ. Hãy cầm lấy tấm bản đồ và tự tin bước đi trên con đường của riêng mình.
                    </p>
                    <Link href="/numerology/calculator" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-900 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl">
                        Bắt Đầu Tra Cứu
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
}