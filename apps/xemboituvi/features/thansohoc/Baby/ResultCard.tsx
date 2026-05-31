'use client';

import React from 'react';
import { 
  ArrowLeft, 
  Download, 
  Star, 
  Lightbulb, 
  ShieldCheck, 
  Award
} from 'lucide-react';
import { KidProfile } from './data/babyInterpretations';
import FadeIn from '@/components/ui/FadeIn';


interface ResultCardProps {
  result: {
    lifePath: number;
    expression: number;
    parentLifePath?: number;
    isCompatible?: boolean;
    data: KidProfile;
  };
  onReset: () => void;
  backgroundImage: string;
}

export default function ResultCard({ result, onReset, backgroundImage }: ResultCardProps) {
  const { data, lifePath, expression } = result;

  return (
    <div 
      className="min-h-screen py-10 px-4 relative flex justify-center"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-0" />

      <div className="max-w-3xl w-full relative z-10 flex flex-col">
        {/* 1. Header: Rơi từ trên xuống */}
        <FadeIn direction="down" >
          <div className="bg-white shadow-2xl rounded-[3rem] overflow-hidden border border-orange-100 mb-8">
            <div className="bg-gradient-to-br from-orange-400 via-pink-500 to-rose-500 p-10 text-white text-center relative">
              <button onClick={onReset} className="absolute left-6 top-8 p-3 bg-white/20 rounded-full hover:bg-white/40 transition-all print:hidden">
                <ArrowLeft size={20} />
              </button>
              
              <div className="inline-block p-5 bg-white/20 rounded-full mb-6 backdrop-blur-xl border border-white/30">
                <Award size={48} className="text-yellow-200" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">
                {data?.title || "Hành Trình Khám Phá Bé"}
              </h2>
              <p className="text-orange-50 font-medium opacity-90 italic">
                "Mỗi đứa trẻ là một vì sao rạng rỡ"
              </p>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              {/* 2. Chỉ số chính: Phóng to nhẹ */}
              <FadeIn scale={0.9} delay={0.2}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-orange-50/50 p-6 rounded-[2rem] border border-orange-100 text-center">
                    <div className="text-5xl font-black text-orange-500">{lifePath}</div>
                    <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mt-1">Số Chủ Đạo</p>
                  </div>
                  <div className="bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100 text-center">
                    <div className="text-5xl font-black text-indigo-500">{expression}</div>
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mt-1">Số Sứ Mệnh</p>
                  </div>
                </div>
              </FadeIn>

              {/* 3. Nội dung luận giải: Trượt lên lần lượt */}
              <div className="space-y-12">
                
                {/* Tính cách */}
                <FadeIn direction="up" delay={0.4}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Lightbulb className="text-orange-500" />
                      <h3 className="text-xl font-bold text-gray-800">Tính cách & Tâm hồn</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed italic pl-6 border-l-4 border-orange-300">
                      {data?.description || "Dữ liệu mô tả đang được cập nhật..."}
                    </p>
                  </div>
                </FadeIn>

                {/* Điểm mạnh */}
                <FadeIn direction="up" delay={0.6}>
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <Star className="text-yellow-500 fill-yellow-500" />
                      <h3 className="text-xl font-bold text-gray-800">Thế mạnh bẩm sinh</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {data?.strengths?.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 bg-orange-50/30 p-4 rounded-2xl border border-orange-100/50">
                          <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                            {index + 1}
                          </span>
                          <p className="text-gray-700 font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                {/* Thách thức */}
                <FadeIn direction="up" delay={0.8}>
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="text-emerald-600" />
                      <h3 className="text-xl font-bold text-gray-800">Lời khuyên & Thách thức</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {data?.challenges?.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                          <span className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                            {index + 1}
                          </span>
                          <p className="text-gray-600 font-medium italic">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* Footer Button */}
              <FadeIn direction="up" delay={1}>
                <div className="pt-10 border-t border-gray-100 flex justify-between items-center print:hidden">
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all"
                  >
                    <Download size={18} /> TẢI BÁO CÁO
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}