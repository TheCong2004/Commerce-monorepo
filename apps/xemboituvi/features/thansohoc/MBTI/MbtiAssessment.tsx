'use client';

import React, { useState, useMemo } from 'react';
import { MBTI_QUESTIONS } from '../data/mbtiData';
import { calculateMbtiResult } from '../utils/mbtiUtils';
import { RefreshCcw, Brain, Star, Briefcase } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';


export default function MbtiAssessment() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const result = useMemo(() => {
    if (!isFinished) return null;
    return calculateMbtiResult(answers);
  }, [isFinished, answers]);

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [MBTI_QUESTIONS[currentQIndex].id]: value }));
    
    setTimeout(() => {
      if (currentQIndex < MBTI_QUESTIONS.length - 1) {
        setCurrentQIndex(prev => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 200);
  };

  const progress = ((currentQIndex + 1) / MBTI_QUESTIONS.length) * 100;

  // --- MÀN HÌNH KẾT QUẢ ---
  if (isFinished && result) {
    const { code, profile, stats } = result;
    
    return (
      <div className="max-w-3xl mx-auto p-4 my-10">
        <FadeIn direction="up">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-12">
            <div className="text-center mb-10">
              <FadeIn direction="down" delay={0.2}>
                <div className="inline-block p-4 bg-purple-100 text-purple-600 rounded-2xl mb-4">
                  <Brain size={48} />
                </div>
              </FadeIn>
              <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest">Nhóm tính cách của bạn</h2>
              <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mt-2 mb-4">
                {code}
              </h1>
              <h3 className="text-2xl font-bold text-gray-800">{profile.title}</h3>
              <p className="text-gray-500 max-w-xl mx-auto mt-6 italic text-lg leading-relaxed">
                "{profile.description}"
              </p>
            </div>

            {/* Biểu đồ chi tiết các trục */}
            <FadeIn direction="up" delay={0.4}>
              <div className="space-y-6 mb-12 bg-gray-50 p-6 md:p-8 rounded-3xl">
                <h4 className="font-black text-gray-700 uppercase text-sm tracking-widest border-b border-gray-200 pb-3 mb-6">
                  Phân tích 4 chiều hướng
                </h4>
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-black text-gray-500 uppercase tracking-tighter">
                      <span>{stat.labelL}</span>
                      <span>{stat.labelR}</span>
                    </div>
                    <div className="flex h-3 rounded-full overflow-hidden bg-gray-200">
                      <div 
                        className="bg-purple-500 h-full transition-all duration-1000 ease-out" 
                        style={{ width: `${stat.leftPercent}%` }}
                      ></div>
                      <div 
                        className="bg-blue-500 h-full transition-all duration-1000 ease-out" 
                        style={{ width: `${stat.rightPercent}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-gray-400">
                      <span>{stat.leftPercent}%</span>
                      <span>{stat.rightPercent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Điểm mạnh & Nghề nghiệp */}
            <div className="grid md:grid-cols-2 gap-8">
              <FadeIn direction="right" delay={0.6}>
                <div className="h-full bg-green-50/50 p-6 rounded-3xl border border-green-100">
                  <h4 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                    <Star size={18} fill="currentColor" /> Điểm mạnh
                  </h4>
                  <ul className="space-y-2">
                    {profile.strengths.map(s => (
                      <li key={s} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-500 mt-1">●</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={0.6}>
                <div className="h-full bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                  <h4 className="font-bold text-blue-700 mb-4 flex items-center gap-2">
                    <Briefcase size={18} fill="currentColor" /> Nghề nghiệp
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.careers.map(c => (
                      <span key={c} className="bg-white px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 shadow-sm border border-blue-100">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="up" delay={0.8}>
              <button 
                onClick={() => window.location.reload()}
                className="w-full mt-10 py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl flex justify-center items-center gap-3"
              >
                <RefreshCcw size={20}/> Làm lại bài trắc nghiệm
              </button>
            </FadeIn>
          </div>
        </FadeIn>
      </div>
    );
  }

  // --- MÀN HÌNH CÂU HỎI ---
  const currentQ = MBTI_QUESTIONS[currentQIndex];

  return (
    <div className="max-w-2xl mx-auto p-6 my-10">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
            <span>Tiến độ tra cứu</span>
            <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 shadow-inner">
            <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
            ></div>
        </div>
      </div>

      {/* Card câu hỏi sử dụng FadeIn với key để reset animation mỗi khi đổi câu */}
      <FadeIn key={currentQIndex} direction="up" >
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-12 min-h-[450px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Brain size={200} />
          </div>

          <span className="text-center text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] mb-6">
              {currentQ.dimension === 'EI' ? 'Xu hướng Năng Lượng' : 
               currentQ.dimension === 'SN' ? 'Cách tiếp nhận Thông Tin' : 
               currentQ.dimension === 'TF' ? 'Cách đưa ra Quyết Định' : 'Lối sống & Hành động'}
          </span>
          
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center leading-snug">
              {currentQ.question}
          </h3>

          <div className="grid gap-4 relative z-10">
              {currentQ.options.map((opt, idx) => (
                  <button
                      key={idx}
                      onClick={() => handleSelect(opt.value)}
                      className="group p-5 border-2 border-gray-50 rounded-2xl hover:border-purple-500 hover:bg-purple-50/50 transition-all text-left flex items-center gap-4 active:scale-[0.98]"
                  >
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-black text-gray-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                        {idx === 0 ? 'A' : 'B'}
                      </div>
                      <span className="text-gray-700 font-bold group-hover:text-purple-900 transition-colors">
                        {opt.text}
                      </span>
                  </button>
              ))}
          </div>
        </div>
      </FadeIn>
      
      <p className="mt-8 text-center text-gray-400 text-xs italic tracking-wide">
        * Hãy chọn đáp án bản năng nhất để có kết quả chính xác.
      </p>
    </div>
  );
}