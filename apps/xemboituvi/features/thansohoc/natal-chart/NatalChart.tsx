'use client';

import React, { useState } from 'react';
import { MapPin, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ZodiacVisual from './natal/ZodiacVisual';
import FadeIn from '@/components/ui/FadeIn';

const BG_IMAGE = "https://cdn2.fptshop.com.vn/unsafe/background_den_19_18d928856c.jpg";

export default function NatalChart() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '12:00',
    lat: 16.0471,
    lng: 108.2068
  });

  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    if (!formData.birthDate) return toast.error("Vui lòng chọn ngày sinh!");
    setLoading(true);

    const params = new URLSearchParams({
      date: formData.birthDate,
      time: formData.birthTime,
      lat: formData.lat.toString(),
      lng: formData.lng.toString()
    });

    setTimeout(() => {
      router.push(`/thansohoc/natal-star/result?${params.toString()}`);
    }, 800);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen text-white overflow-hidden relative" 
         style={{ backgroundImage: `url('${BG_IMAGE}')`, backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-[#090E1A]/85 z-0" />
      
      <div className="w-full lg:w-[60%] h-full z-10 relative flex flex-col items-center justify-center">
        <div className="w-full max-w-lg px-8">
          
          {/* Tiêu đề: Trượt từ trên xuống với icon lấp lánh */}
          <FadeIn direction="down">
            <div className="flex flex-col items-center lg:items-start">
              <h1 className="text-[#e8cd79] font-papyrus papyrus text-5xl md:text-6xl mb-10 text-center lg:text-left drop-shadow-2xl">
                Bản Đồ Sao
              </h1>
            </div>
          </FadeIn>

          {/* Form nhập liệu: Phóng to nhẹ từ tâm */}
          <FadeIn scale={0.95} delay={0.2}>
            <div className="backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white/5">
              <div className="grid grid-cols-2 gap-6 text-left">
                <div className="col-span-2 md:col-span-1">
                  <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block mb-3 ml-1">Ngày sinh</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18}/>
                    <input 
                      type="date" 
                      className="w-full bg-[#0F1629]/80 border border-slate-700/50 rounded-2xl pl-12 py-3.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all" 
                      onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="col-span-2 md:col-span-1">
                  <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block mb-3 ml-1">Giờ sinh</label>
                  <div className="relative group">
                    <Clock className="absolute left-4 top-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18}/>
                    <input 
                      type="time" 
                      className="w-full bg-[#0F1629]/80 border border-slate-700/50 rounded-2xl pl-12 py-3.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-white" 
                      value={formData.birthTime} 
                      onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleCalculate} 
                disabled={loading} 
                className="w-full mt-10 py-4.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Đang kết nối vũ trụ...
                  </span>
                ) : (
                  <>Giải Mã Ngay <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></>
                )}
              </button>
              
              <p className="mt-6 text-center text-[10px] text-slate-500 italic">
                * Dữ liệu được tính toán dựa trên tọa độ thiên văn thực tế
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Visual bên phải: Thường là vòng tròn hoàng đạo động */}
      <ZodiacVisual />
    </div>
  );
}