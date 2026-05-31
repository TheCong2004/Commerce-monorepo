export default function ResultSummary({ result }: { result: any }) {
  const getLevelColor = (s: number) => s >= 8 ? 'text-green-600' : s >= 5 ? 'text-orange-500' : 'text-red-600';

  return (
    <div className="mt-10 text-center animate-in fade-in zoom-in duration-700">
      <div className="inline-block relative">
        {/* Vòng tròn điểm số */}
        <div className="w-40 h-40 rounded-full border-8 border-[#d4af37] flex flex-col items-center justify-center bg-white shadow-2xl">
          <span className={`text-4xl font-black font-sans ${getLevelColor(result.totalScore)}`}>
            {result.totalScore}
          </span>
          <span className="text-[#8b4513] font-bold">/ 10 Điểm</span>
        </div>
        
        {/* Hiệu ứng tia sáng */}
        <div className="absolute -inset-4 border-2 border-dashed border-[#d4af37]/30 rounded-full animate-spin-slow"></div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-sans text-[#8b4513]">Kết quả luận giải Sim</h3>
        <div className="max-w-md mx-auto grid grid-cols-1 gap-3">
          {result.analysis.map((line: string, i: number) => (
            <div key={i} className="bg-[#f4f1e6] p-3 rounded-lg border border-[#d4c5a3] text-[#5c3a21] font-medium italic">
              ✦ {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}