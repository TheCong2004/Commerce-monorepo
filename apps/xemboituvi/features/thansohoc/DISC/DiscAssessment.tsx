'use client';
import React, { useState, useMemo } from 'react';
import { ChevronRight, RefreshCcw, CheckCircle } from 'lucide-react';
import { DISC_QUESTIONS } from '../data/discQuestions';
import FadeIn from '@/components/ui/FadeIn';


// --- 1. CONFIG & TYPES ---
type PersonalityType = 'D' | 'I' | 'S' | 'C';

// --- 2. SUB-COMPONENT: BIỂU ĐỒ RADAR (SVG) ---
const DiscRadarChart = ({ scores }: { scores: Record<PersonalityType, number> }) => {
  const size = 200;
  const center = size / 2;
  const radius = 80;
  const maxVal = Math.max(...Object.values(scores));
  
  const chartData = [
    { label: 'D', value: scores.D, angle: -90, color: '#FF4D4F' },
    { label: 'I', value: scores.I, angle: 0, color: '#FAAD14' },
    { label: 'S', value: scores.S, angle: 90, color: '#52C41A' },
    { label: 'C', value: scores.C, angle: 180, color: '#1890FF' },
  ];

  const getPoint = (angle: number, value: number) => {
    const scale = maxVal > 0 ? (value / Math.max(maxVal, 10)) : 0;
    const r = radius * scale;
    const rad = (angle * Math.PI) / 180;
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  const points = chartData.map(d => getPoint(d.angle, d.value));
  const polyPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm">
      <svg width={size} height={size} className="overflow-visible">
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => {
          const r = radius * scale;
          const webPoints = chartData.map(d => {
            const rad = (d.angle * Math.PI) / 180;
            return `${center + r * Math.cos(rad)},${center + r * Math.sin(rad)}`;
          }).join(' ');
          return <polygon key={i} points={webPoints} fill="none" stroke="#e5e7eb" strokeWidth="1" />;
        })}
        <polygon points={polyPoints} fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
        {chartData.map((d, i) => {
          const p = getPoint(d.angle, d.value);
          const labelPos = getPoint(d.angle, Math.max(maxVal, 10) * 1.3);
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="4" fill={d.color} />
              <text x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="middle" className="text-xs font-bold fill-gray-600">
                {d.label} ({d.value})
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-xs text-gray-400 mt-2">Biểu đồ năng lượng DISC</p>
    </div>
  );
};

// --- 3. MAIN COMPONENT ---
export default function DiscAssessment() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, PersonalityType>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const result = useMemo(() => {
    const scores = { D: 0, I: 0, S: 0, C: 0 };
    Object.values(answers).forEach(type => { scores[type]++; });
    const maxScore = Math.max(...Object.values(scores));
    const dominantTypes = (Object.keys(scores) as PersonalityType[]).filter(t => scores[t] === maxScore);
    return { scores, dominantTypes, maxScore };
  }, [answers]);

  const handleSelect = (type: PersonalityType) => {
    setAnswers(prev => ({ ...prev, [DISC_QUESTIONS[currentQIndex].id]: type }));
    setTimeout(() => {
      if (currentQIndex < DISC_QUESTIONS.length - 1) {
        setCurrentQIndex(prev => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 250);
  };

  const handleSendEmail = async () => {
    if (!userEmail) return alert("Vui lòng nhập email!");
    setIsSending(true);
    // Logic gửi email...
    setIsSending(false);
    alert("Tính năng gửi email đang được xử lý.");
  };

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto p-4 my-10">
        <FadeIn direction="up">
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 text-green-600">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Kết quả DISC của bạn</h2>
              <p className="text-gray-500 mt-2">Hồ sơ tính cách dựa trên câu trả lời của bạn.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <FadeIn direction="right" delay={0.2}>
                <div className="bg-gray-50 rounded-xl p-4">
                  <DiscRadarChart scores={result.scores} />
                </div>
              </FadeIn>
              
              <FadeIn direction="left" delay={0.4}>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Nhóm chủ đạo:</h3>
                  <div className="flex gap-2 mb-4">
                    {result.dominantTypes.map(type => (
                      <span key={type} className={`px-4 py-2 rounded-lg font-bold text-white shadow-sm ${
                        type === 'D' ? 'bg-red-500' : type === 'I' ? 'bg-yellow-400' : type === 'S' ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                        Type {type}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {['D - Thống trị', 'I - Ảnh hưởng', 'S - Kiên định', 'C - Tuân thủ'].map((label, idx) => {
                      const type = label[0] as PersonalityType;
                      return (
                        <div key={type} className="flex justify-between border-b pb-1">
                          <span>{label}:</span>
                          <span className="font-medium">{result.scores[type]} câu</span>
                        </div>
                      );
                    })}
                  </div>
                  <button onClick={() => window.location.reload()} className="mt-6 flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                    <RefreshCcw size={16} /> Làm lại bài test
                  </button>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="up" delay={0.6}>
              <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
                <h4 className="text-indigo-900 font-bold mb-2">Nhận phân tích chi tiết</h4>
                <div className="flex max-w-md mx-auto gap-2">
                  <input type="email" placeholder="email@gmail.com" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                  <button onClick={handleSendEmail} disabled={isSending} className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg disabled:bg-gray-400">
                    {isSending ? "..." : "Gửi"}
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </div>
    );
  }

  const currentQuestion = DISC_QUESTIONS[currentQIndex];
  const progress = ((currentQIndex + 1) / DISC_QUESTIONS.length) * 100;

  return (
    <div className="max-w-xl mx-auto p-6 my-10">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Câu hỏi {currentQIndex + 1} / {DISC_QUESTIONS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <FadeIn key={currentQIndex} direction="up">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 min-h-[400px] flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
            {currentQuestion.question}
          </h3>
          <div className="grid gap-3">
            {currentQuestion.options.map((opt, idx) => (
              <button key={idx} onClick={() => handleSelect(opt.type as PersonalityType)} className="group relative flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 text-left">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full font-bold text-sm mr-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-gray-700 font-medium group-hover:text-indigo-900 flex-1">{opt.text}</span>
                <ChevronRight className="opacity-0 group-hover:opacity-100 text-indigo-500 transition-opacity" size={20}/>
              </button>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}