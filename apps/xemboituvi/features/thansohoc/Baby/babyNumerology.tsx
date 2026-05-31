'use client';

import React, { useState, useEffect } from 'react';
import { Baby, Calculator, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { calculateExpression, calculateLifePath, checkCompatibility } from '../utils/numerologyUtils';
import ResultCard from './ResultCard';
import { KID_NUMBERS, KidProfile } from './data/babyInterpretations';
import FadeIn from '@/components/ui/FadeIn';

const BACKGROUND_IMG = 'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482975mti/anh-mo-ta.png';

export default function BabyNumerology() {
  const [formData, setFormData] = useState({
    childName: '',
    day: '',
    month: '',
    year: '',
    parentDay: '',
    parentMonth: '',
    parentYear: ''
  });

  const [result, setResult] = useState<{
    lifePath: number;
    expression: number;
    parentLifePath?: number;
    isCompatible?: boolean;
    data: KidProfile;
  } | null>(null);

  useEffect(() => {
    if (result) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [result]);

  const simplifyNumber = (n: number): number => {
    if (n === 11 || n === 22 || n === 33) return n;
    return (n - 1) % 9 + 1;
  };

  const handleCalculate = () => {
    if (!formData.childName.trim()) return toast.error("Vui lòng nhập tên bé!");
    if (!formData.day || !formData.month || !formData.year) return toast.error("Vui lòng nhập đầy đủ ngày sinh của bé!");

    try {
      const rawLp = calculateLifePath(Number(formData.day), Number(formData.month), Number(formData.year));
      const simplifiedLp = simplifyNumber(rawLp);
      const exp = calculateExpression(formData.childName);

      let parentLp = undefined;
      let isMatch = undefined;
      if (formData.parentDay && formData.parentMonth && formData.parentYear) {
        const rawParentLp = calculateLifePath(Number(formData.parentDay), Number(formData.parentMonth), Number(formData.parentYear));
        parentLp = simplifyNumber(rawParentLp);
        isMatch = checkCompatibility(parentLp, simplifiedLp);
      }

      let profile = KID_NUMBERS[simplifiedLp];
      
      if (!profile) {
        const fallbackKey = simplifiedLp > 9 && simplifiedLp !== 11 && simplifiedLp !== 22 
                            ? simplifyNumber(simplifiedLp) 
                            : 1;
        profile = KID_NUMBERS[fallbackKey] || KID_NUMBERS[1];
      }

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#ec4899', '#8b5cf6']
      });

      setResult({
        lifePath: simplifiedLp,
        expression: exp,
        parentLifePath: parentLp,
        isCompatible: isMatch,
        data: profile
      });

      toast.success("Vũ trụ đã gửi lời hồi đáp!");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi giải mã năng lượng.");
    }
  };

  if (result) {
    return (
      <FadeIn direction="up">
        <ResultCard 
          result={result} 
          onReset={() => setResult(null)} 
          backgroundImage={BACKGROUND_IMG} 
        />
      </FadeIn>
    );
  }

  return (
    <main 
      className="min-h-screen flex items-center justify-center p-4 relative font-sans"
      onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
      style={{
        backgroundImage: `url('${BACKGROUND_IMG}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[3px] z-0" />

      <div className="max-w-xl w-full relative z-10">
        <FadeIn scale={0.9} direction="up">
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-orange-100">
            <div className="text-center mb-8">
              <FadeIn direction="down" delay={0.2}>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-pink-100 text-orange-500 rounded-full mb-4 shadow-inner">
                  <Baby size={40} className="animate-bounce" />
                </div>
              </FadeIn>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 mb-2">
                Thần Số Học Bé Yêu
              </h1>
              <p className="text-gray-500 text-sm font-medium italic">Khám phá bản đồ định mệnh của thiên thần nhỏ</p>
            </div>

            <div className="space-y-6">
              <FadeIn direction="up" delay={0.3}>
                <div className="group">
                  <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-2 ml-1">Tên đầy đủ của bé</label>
                  <input 
                    type="text" 
                    placeholder="Ví dụ: Nguyễn Minh An"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all bg-white/50 text-gray-800 font-semibold"
                    value={formData.childName}
                    onChange={(e) => setFormData({...formData, childName: e.target.value})}
                  />
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.4}>
                <div>
                  <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-2 ml-1">Ngày sinh (Dương lịch)</label>
                  <div className="grid grid-cols-3 gap-3">
                    <input type="number" placeholder="Ngày" className="px-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-400 outline-none transition-all bg-white/50 font-semibold text-center" 
                      value={formData.day} onChange={(e) => setFormData({...formData, day: e.target.value})} />
                    <input type="number" placeholder="Tháng" className="px-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-400 outline-none transition-all bg-white/50 font-semibold text-center" 
                      value={formData.month} onChange={(e) => setFormData({...formData, month: e.target.value})} />
                    <input type="number" placeholder="Năm" className="px-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-400 outline-none transition-all bg-white/50 font-semibold text-center" 
                      value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} />
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.5}>
                <div className="pt-6 border-t border-dashed border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-purple-500" />
                    <label className="text-xs font-bold text-purple-500 uppercase tracking-widest">Năng lượng tương hợp (Tùy chọn)</label>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <input type="number" placeholder="Ngày" className="px-3 py-3 rounded-xl border-2 border-gray-50 text-sm outline-none focus:border-purple-300 transition-all bg-gray-50/50"
                      value={formData.parentDay} onChange={(e) => setFormData({...formData, parentDay: e.target.value})} />
                    <input type="number" placeholder="Tháng" className="px-3 py-3 rounded-xl border-2 border-gray-50 text-sm outline-none focus:border-purple-300 transition-all bg-gray-50/50"
                      value={formData.parentMonth} onChange={(e) => setFormData({...formData, parentMonth: e.target.value})} />
                    <input type="number" placeholder="Năm" className="px-3 py-3 rounded-xl border-2 border-gray-50 text-sm outline-none focus:border-purple-300 transition-all bg-gray-50/50"
                      value={formData.parentYear} onChange={(e) => setFormData({...formData, parentYear: e.target.value})} />
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.6}>
                <button 
                  onClick={handleCalculate}
                  className="w-full py-5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-orange-200 hover:shadow-orange-400 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-3 mt-4"
                >
                  <Calculator size={24} /> KHÁM PHÁ NGAY
                </button>
              </FadeIn>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}