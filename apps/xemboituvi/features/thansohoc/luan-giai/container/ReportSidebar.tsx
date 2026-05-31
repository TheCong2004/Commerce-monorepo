'use client';

import React, { useState, useEffect } from 'react';
import { List } from 'lucide-react';

export default function ReportSidebar({ sections }: { sections: any[] }) {
  const [activeId, setActiveId] = useState<string>('');

  // Phẳng hóa dữ liệu để dễ dàng quản lý danh sách mục lục
  const tocItems = sections.flatMap(section => [
    { id: `section-${section.section_id}`, text: section.section_title, level: 1 },
    ...section.items.map((item: any) => ({
      id: `item-${item.index}`,
      text: item.title,
      level: 2
    }))
  ]);

  // Theo dõi vị trí cuộn để highlight mục tương ứng trong báo cáo
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      // rootMargin giúp xác định điểm kích hoạt highlight (thường là gần đầu trang)
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Tính toán offset nếu bạn có header cố định (ví dụ: 80px)
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Tiêu đề mục lục luôn hiển thị */}
      <div className="flex items-center gap-3 mb-6 px-2 text-[#D4AF37]">
        <List size={20} />
        <span className="font-bold uppercase tracking-[0.2em] text-[12px]">
          Mục lục báo cáo
        </span>
      </div>

      {/* Danh sách mục lục hiển thị trực tiếp */}
      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToId(item.id)}
            className={`block w-full text-left py-2 px-3 rounded-lg transition-all duration-300 group ${
              activeId === item.id
                ? 'text-[#D4AF37] bg-[#D4AF37]/10 font-bold border-l-2 border-[#D4AF37]'
                : 'text-white/40 hover:text-white hover:bg-white/5'
            } ${
              item.level === 1 
                ? 'uppercase mt-6 text-[11px] tracking-wider border-b border-white/10 pb-2 mb-2' 
                : 'pl-6 text-[12px]'
            }`}
          >
            <div className="flex items-start gap-2">
              {activeId === item.id && (
                <span className="animate-pulse">◈</span>
              )}
              <span className="leading-relaxed">
                {item.text}
              </span>
            </div>
          </button>
        ))}
      </nav>

      {/* Chú thích nhỏ dưới cùng nếu cần */}
      <div className="mt-8 px-2">
        <div className="h-[1px] w-full bg-gradient-to-r from-[#D4AF37]/50 to-transparent mb-4" />
        <p className="text-[10px] text-white/20 italic italic">
          * Cuộn để theo dõi tiến trình báo cáo
        </p>
      </div>
    </div>
  );
}