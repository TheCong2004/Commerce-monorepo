'use client';

import React from 'react';
import { Baby, Heart, Brain, Sparkles, BookOpen, Sun, Star, ArrowRight, ShieldCheck, Smile } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function KidsNumerologyIntro() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-pink-100 selection:text-pink-900">

      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-60 translate-y-1/3 -translate-x-1/4 -z-10"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <FadeIn direction="right">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-50 border border-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-wide mb-6">
                        <Sun size={14} className="text-yellow-500" /> Thấu hiểu con yêu ngay từ khi chào đời
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] mb-6">
                        Món Quà Đầu Đời <br/>
                        <span className="text-pink-500 relative inline-block">
                            Cho Tương Lai Con
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-pink-200" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C2.00025 6.99997 40.5002 2.49997 100.002 2.49997C159.503 2.49997 198.003 6.99997 198.003 6.99997" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                        Mỗi đứa trẻ sinh ra đều mang một bộ số riêng biệt. Thần số học giúp ba mẹ giải mã tính cách bẩm sinh, điểm mạnh và cách giao tiếp phù hợp nhất với con.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group">
                            Khám phá ngay <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                        </button>
                        <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold hover:border-pink-300 hover:text-pink-500 transition-all flex items-center justify-center gap-2">
                            <BookOpen size={18} /> Xem ví dụ mẫu
                        </button>
                    </div>
                    
                    <div className="mt-10 flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex -space-x-3">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{backgroundImage: `url('https://randomuser.me/api/portraits/thumb/women/${i + 20}.jpg')`}}></div>
                            ))}
                        </div>
                        <p>Được tin dùng bởi <span className="font-bold text-slate-700">12,000+</span> ba mẹ</p>
                    </div>
                </div>
            </FadeIn>

            {/* Image/Visual Content */}
            <FadeIn direction="left" delay={0.2}>
                <div className="relative">
                    <div className="relative z-10 bg-white p-4 rounded-[2rem] shadow-2xl shadow-pink-100 border border-slate-50 rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img 
                            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop" 
                            alt="Happy Kid" 
                            className="w-full h-auto rounded-3xl object-cover aspect-[4/3]"
                        />
                    </div>
                    {/* Decorative Elements behind image */}
                    <div className="absolute -top-10 -right-10 text-yellow-400 animate-spin-slow"><Sun size={60} /></div>
                </div>
            </FadeIn>
        </div>
      </header>

      {/* --- BENEFITS SECTION --- */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-6">
            <FadeIn direction="up">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Vì sao ba mẹ cần tra cứu?</h2>
                    <p className="text-slate-600">
                        Không phải để mê tín, mà là cơ sở khoa học của các con số giúp ba mẹ có phương pháp giáo dục phù hợp nhất cho con.
                    </p>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: <Baby size={32} />, color: "bg-green-50", text: "green", title: "Hiểu tính cách bẩm sinh", desc: "Biết được con là đứa trẻ hướng nội hay hướng ngoại, nhạy cảm hay mạnh mẽ để có cách cư xử phù hợp." },
                    { icon: <Sparkles size={32} />, color: "bg-purple-50", text: "purple", title: "Phát hiện tài năng sớm", desc: "Con có năng khiếu về nghệ thuật, ngôn ngữ hay tư duy logic? Thần số học giúp ba mẹ đầu tư đúng hướng." },
                    { icon: <ShieldCheck size={32} />, color: "bg-orange-50", text: "orange", title: "Khắc phục điểm yếu", desc: "Nhận diện những bài học đường đời mà con có thể gặp khó khăn để rèn luyện sớm." }
                ].map((item, idx) => (
                    <FadeIn key={idx} direction="up" delay={idx * 0.15}>
                        <div className="bg-white h-full p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
            <FadeIn scale={0.96}>
                <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-white">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <div className="text-[200px] font-bold leading-none select-none">3</div>
                    </div>
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <FadeIn direction="right" delay={0.2}>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Báo cáo của bé bao gồm những gì?</h2>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center font-bold text-white flex-shrink-0">1</div>
                                        <div>
                                            <h4 className="text-xl font-bold text-pink-300">Số Chủ Đạo (Life Path)</h4>
                                            <p className="text-slate-400 text-sm mt-1">Con đường chính mà con sẽ đi. Ví dụ: Bé số 3 thường hoạt ngôn, bé số 7 thích quan sát.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white flex-shrink-0">2</div>
                                        <div>
                                            <h4 className="text-xl font-bold text-blue-300">Biểu đồ ngày sinh</h4>
                                            <p className="text-slate-400 text-sm mt-1">Cho biết con dư thừa hay thiếu hụt yếu tố nào (trí tuệ, thể chất, tinh thần).</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-white flex-shrink-0">3</div>
                                        <div>
                                            <h4 className="text-xl font-bold text-yellow-300">Đỉnh cao cuộc đời</h4>
                                            <p className="text-slate-400 text-sm mt-1">Dự báo các cột mốc quan trọng để ba mẹ chuẩn bị hành trang cho con.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <button className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors">
                                        Xem báo cáo mẫu
                                    </button>
                                </div>
                            </div>
                        </FadeIn>
                        
                        <FadeIn direction="left" delay={0.4}>
                            <div className="hidden lg:block relative">
                                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-3xl">
                                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                        <div>
                                            <div className="text-xs text-slate-400 uppercase tracking-wider">Họ và tên</div>
                                            <div className="font-bold text-lg">Nguyễn An Nhiên</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-slate-400 uppercase tracking-wider">Ngày sinh</div>
                                            <div className="font-bold text-lg">15/08/2020</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-pink-500/20 p-4 rounded-2xl border border-pink-500/30 text-center">
                                            <div className="text-3xl font-bold text-pink-300 mb-1">6</div>
                                            <div className="text-xs text-pink-100">Số Chủ Đạo</div>
                                        </div>
                                        <div className="bg-blue-500/20 p-4 rounded-2xl border border-blue-500/30 text-center">
                                            <div className="text-3xl font-bold text-blue-300 mb-1">5</div>
                                            <div className="text-xs text-blue-100">Số Sứ Mệnh</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </FadeIn>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 text-center px-6">
        <FadeIn direction="up">
            <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Smile size={32} />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Bắt đầu hành trình thấu hiểu con</h2>
                <p className="text-lg text-slate-500 mb-10">
                    Đừng để con lớn lên rồi mới tìm hiểu. Hãy là người bạn đồng hành thấu hiểu con nhất ngay từ hôm nay.
                </p>
                
                <div className="bg-white p-2 rounded-full shadow-2xl shadow-slate-200 border border-slate-100 max-w-lg mx-auto flex flex-col sm:flex-row gap-2">
                    <input 
                        type="text" 
                        placeholder="Nhập tên bé..." 
                        className="flex-1 px-6 py-3 rounded-full outline-none text-slate-700 placeholder-slate-400"
                    />
                    <button className="px-8 py-3 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-colors shadow-lg shadow-pink-200">
                        Tra Cứu
                    </button>
                </div>
                <p className="text-xs text-slate-400 mt-4">Cam kết bảo mật thông tin 100%</p>
            </div>
        </FadeIn>
      </section>

      <style jsx>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}