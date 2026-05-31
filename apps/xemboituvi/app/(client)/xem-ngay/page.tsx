'use client';

import React from 'react';
import { 
  Calendar, 
  Clock, 
  Sun, 
  Moon, 
  Compass, 
  Info, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Wind 
} from 'lucide-react';
export default function XemNgayPage() {
  return (

    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-red-100 selection:text-red-900">
     {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        
        {/* KHỐI BÁT QUÁI NỔI 3D */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[800px] md:h-[800px] pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Hào quang tỏa sáng */}
            <div className="absolute inset-0 bg-amber-600/20 blur-[120px] rounded-full scale-75 animate-pulse" />
            
            <img 
              src="https://res.cloudinary.com/dzkcqktcl/image/upload/v1767125826/image-Photoroom_n6gtyr.png" 
              alt="Bat Quai" 
              className="w-[85%] h-[85%] object-contain opacity-[0.15] animate-[spin_60s_linear_infinite]"
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(180, 83, 9, 0.4))' 
              }}
            />
          </div>
        </div>

        {/* Lớp phủ mờ trung tâm */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/20 via-[#FDFBF7]/60 to-[#FDFBF7]/20 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border-b border-t border-amber-600 text-amber-700 text-xs font-bold tracking-[0.3em] uppercase mb-8">
            <Wind size={14} className="animate-pulse" /> Thiên Thời - Địa Lợi - Nhân Hòa
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-red-900 mb-8 leading-tight">
            Tra Cứu <span className="text-amber-600 italic">Ngày Cát Tường</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-serif font-light leading-relaxed italic">
            Lựa chọn thời điểm hoàn hảo để vạn sự khởi đầu nan, thuận buồm xuôi gió.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="bg-white/90 backdrop-blur-sm p-2 shadow-2xl border border-amber-900/10 rounded-2xl flex items-center group transition-all hover:border-amber-600">
                <input type="date" className="px-6 py-3 outline-none font-serif text-lg bg-transparent" defaultValue="2024-05-20" />
                <button className="px-8 py-3 bg-red-900 text-white font-bold hover:bg-red-800 transition-all rounded-xl shadow-lg shadow-red-900/20 active:scale-95">
                    Xem Ngày
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- INFO CARDS --- */}
      <section className="py-12 bg-white border-y border-amber-900/5 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { label: "Âm Lịch", val: "13/04 Giáp Thìn", icon: <Moon size={20}/> },
                { label: "Ngày", val: "Giáp Tuất", icon: <Calendar size={20}/> },
                { label: "Tiết Khí", val: "Lập Hạ", icon: <Sun size={20}/> },
                { label: "Trực", val: "Trực Khai", icon: <Compass size={20}/> },
            ].map((item, i) => (
                <div key={i} className="text-center group cursor-default">
                    <div className="flex justify-center text-amber-600 mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{item.label}</p>
                    <p className="text-red-900 font-serif font-bold text-lg">{item.val}</p>
                </div>
            ))}
        </div>
      </section>

      {/* --- MAIN ANALYSIS --- */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="bg-white p-8 border border-amber-900/10 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-900 transition-all group-hover:w-2" />
                <h3 className="text-2xl font-serif font-bold text-red-900 mb-6 flex items-center gap-3">
                    <Clock className="text-amber-600" /> Giờ Hoàng Đạo
                </h3>
                <div className="space-y-4">
                    {["Dần (03h-05h)", "Thìn (07h-09h)", "Tỵ (09h-11h)", "Thân (15h-17h)", "Dậu (17h-19h)", "Hợi (21h-23h)"].map((gio, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-700 font-serif border-b border-dashed border-amber-900/10 pb-2 hover:text-red-900 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            {gio}
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
                <div className="bg-[#F5F0E6] p-10 relative">
                    <div className="absolute top-4 right-4 text-amber-900/10"><CheckCircle2 size={120} /></div>
                    <h3 className="text-2xl font-serif font-bold text-red-900 mb-8 flex items-center gap-3">Luận Giải Cát Hung</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                        <div>
                            <h4 className="flex items-center gap-2 text-green-700 font-bold uppercase tracking-tighter mb-4 border-b border-green-700/20 pb-2">Việc Nên Làm</h4>
                            <ul className="space-y-3 text-slate-700 font-serif leading-relaxed">
                                <li>• Cúng tế, cầu phúc, cầu tự.</li>
                                <li>• Giải oan, đào đất, an táng.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="flex items-center gap-2 text-red-700 font-bold uppercase tracking-tighter mb-4 border-b border-red-700/20 pb-2">Việc Kiêng Kỵ</h4>
                            <ul className="space-y-3 text-slate-700 font-serif leading-relaxed">
                                <li>• Tránh kiện tụng, tranh chấp.</li>
                                <li>• Không nên cưới hỏi.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}