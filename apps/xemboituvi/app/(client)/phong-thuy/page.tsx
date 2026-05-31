'use client';

import React from 'react';
import Link from 'next/link'; // Import Link để điều hướng
import { 
  Compass, Home, Layout, UtensilsCrossed, Zap, Waves, 
  ArrowUpRight, Sparkles, ShieldCheck 
} from 'lucide-react';

import StarBackground from "@/components/ui/animated-background";
import FadeIn from '@/components/ui/FadeIn';

export default function PhongThuyHubPage() {
  const services = [
    {
      title: "Phong Thủy Nhà Ở",
      desc: "Xác định hướng nhà đại cát, bố trí huyền quan nạp khí.",
      icon: <Home size={32} />,
      color: "from-amber-500 to-orange-700",
      slug: "/phong-thuy/huong-nha-theo-tuoi" // Đường dẫn thực tế của bạn
    },
    {
      title: "Hướng Bàn Thờ",
      desc: "An vị nơi thờ tự, tọa cát hướng cát, gia đạo bình an.",
      icon: <Zap size={32} />,
      color: "from-red-600 to-red-900",
      slug: "/phong-thuy/huong-ban-tho"
    }, 
    {
      title: "Bàn Làm Việc",
      desc: "Kích hoạt cung tài lộc, công danh hanh thông, sự nghiệp vững chãi.",
      icon: <Layout size={32} />,
      color: "from-blue-600 to-indigo-900",
      slug: "/phong-thuy/huong-ban-lam-viec"
    },
    {
      title: "Phong Thủy Nhà Bếp",
      desc: "Tọa hung hướng cát, giữ lửa hạnh phúc và sức khỏe gia đình.",
      icon: <UtensilsCrossed size={32} />,
      color: "from-emerald-600 to-teal-900",
      slug: "/phong-thuy/huong-bep-theo-tuoi"
    },
    {
      title: "Nhà Tắm - Vệ Sinh",
      desc: "Trấn áp uế khí, khơi thông mạch thủy, tẩy trần xú uế.",
      icon: <Waves size={32} />,
      color: "from-cyan-600 to-blue-800",
      slug: "/phong-thuy/huong-nha-tam-theo-tuoi"
    },
    {
      title: "Chấm Điểm Sim",
      desc: "Cải biến vận mệnh qua những con số, kích hoạt tài lộc.",
      icon: <Sparkles size={32} />,
      color: "from-purple-600 to-fuchsia-900",
      slug: "/phong-thuy/phong-thuy-sim"
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#FDFBF7] overflow-hidden">
      <div className="fixed inset-0 z-0"><StarBackground /></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20">
        
        {/* HERO SECTION */}
        <header className="text-center mb-24">
          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-[0.3em] mb-6">
              <Compass className="animate-[spin_10s_linear_infinite]" size={16} /> Vạn Sự Hanh Thông
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase mb-8 bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent italic">
              Phong Thủy <span className="text-amber-500">Cải Vận</span>
            </h1>
          </FadeIn>
        </header>

        {/* SERVICES GRID - ĐÃ THÊM LINK */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.1} scale={0.95}>
              <Link href={item.slug} className="block group h-full">
                <div className="relative bg-[#121212]/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-amber-500/50 transition-all duration-500 overflow-hidden h-full flex flex-col shadow-2xl">
                  
                  {/* Glow effect */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 blur-[60px] transition-opacity duration-500`} />
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4 group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/40 font-serif italic leading-relaxed mb-8 flex-grow">
                    {item.desc}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-500 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                    Bắt đầu tra cứu <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* TRIẾT LÝ SECTION */}
        <div className="mt-32">
          <FadeIn direction="up">
            <div className="relative p-10 md:p-20 rounded-[3rem] bg-gradient-to-br from-amber-600/20 to-red-900/20 border border-white/5 text-center">
              <ShieldCheck className="mx-auto text-amber-500 mb-8" size={48} />
              <h2 className="text-3xl md:text-5xl font-serif italic mb-8">
                "Mệnh tốt không bằng vận tốt, <br /> vận tốt không bằng phong thủy tốt."
              </h2>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}