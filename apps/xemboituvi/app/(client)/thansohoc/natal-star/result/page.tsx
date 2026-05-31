'use client';

import { useSearchParams } from 'next/navigation';
export const dynamic = 'force-dynamic';
import { useEffect, useState, Suspense } from 'react';
import { ArrowLeft, Share2, Download, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Import các hàm và component cần thiết
import NatalResultList from '@/features/thansohoc/natal-chart/natal/NatalResultList';
import { calculateNatalChart, PlanetPosition } from '@/features/thansohoc/utils/astrologyUtils';

function ResultContent() {
  const searchParams = useSearchParams();
  const [chartData, setChartData] = useState<PlanetPosition[] | null>(null);

  useEffect(() => {
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const lat = parseFloat(searchParams.get('lat') || '16.0471');
    const lng = parseFloat(searchParams.get('lng') || '108.2068');

    if (date && time) {
      const fullDate = new Date(`${date}T${time}`);
      const data = calculateNatalChart(fullDate, lat, lng);
      setChartData(data);
    }
  }, [searchParams]);

  return (
    // Sử dụng màu nền đặc trưng khác biệt hoàn toàn với trang nhập liệu
    <div className="min-h-screen bg-[#05070a] text-slate-200 selection:bg-indigo-500/30">
      
      {/* Thanh điều hướng tối giản phía trên */}
      <nav className="sticky top-0 z-50 bg-[#05070a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/thansohoc/natal-star" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
            <ArrowLeft size={16} /> Nhập lại
          </Link>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><Share2 size={18} /></button>
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><Download size={18} /></button>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Phần Header trang mới */}
        <header className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6 border border-indigo-500/20">
                <Sparkles size={12} /> Báo cáo chi tiết
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Bản Đồ Sao Cá Nhân
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto italic">
                Khám phá vị trí các vì sao và hành tinh tại khoảnh khắc bạn chào đời để thấu hiểu bản thân sâu sắc hơn.
            </p>
        </header>

        {/* Nội dung kết quả - Component bạn đã gửi */}
        <div className="relative">
          {chartData ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <NatalResultList data={chartData} />
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-500 uppercase tracking-widest animate-pulse">Đang giải mã bầu trời...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function NatalResultPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#05070a]" />}>
      <ResultContent />
    </Suspense>
  );
}