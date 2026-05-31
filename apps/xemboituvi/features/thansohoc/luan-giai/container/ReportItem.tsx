"use client";

import React from 'react';
import CycleChart from './CycleChart'; 
import { ReportItemData } from '../report/data'; 
import FadeIn from '@/components/ui/FadeIn';

interface ReportItemProps {
  data: ReportItemData;
  externalData?: any;
}

const ReportItem: React.FC<ReportItemProps> = ({ data, externalData }) => {
  if (!data) return null;

  // Render Visual (Biểu đồ)
  const renderVisualContent = () => {
    switch (data.type) {
      case 'cycle_chart':
        // Lấy con số năm cá nhân hiện tại từ externalData để hiển thị đúng số
        const currentYear = new Date().getFullYear().toString();
        const currentNum = externalData?.find((d: any) => d.year === currentYear)?.value;

        return externalData ? (
          /* KHUNG VIỀN VÀNG CHO BIỂU ĐỒ */
          <div className="my-12 relative group/chart max-w-2xl mx-auto ">
            {/* Khung chứa chính */}
            <div className="relative bg-[#050505] border-2 border-[#D4AF37]/30 rounded-2xl p-4 md:p-8 shadow-2xl overflow-hidden">
              {/* Label tiêu đề nhỏ phía trên biểu đồ */}
              <div className="text-center mb-4">
                <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold">
                  Biểu đồ chu kỳ 9 năm {currentNum ? `- Năm cá nhân số ${currentNum}` : ''}
                </span>
              </div>

              <div className="w-full max-w-xl mx-auto h-55 md:h-64">
                <CycleChart chartData={externalData} />
              </div>
            </div>
          </div>
        ) : null; 
      default: return null;
    }
  };

  return (
    <div className="group relative mb-10"> {/* Tăng khoảng cách giữa các Item cha */}
      <FadeIn direction="up">
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 md:p-10 transition-all duration-300">
          
          {/* HEADER CHA - Tăng khoảng cách dưới (mb-8) */}
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-8 border-b border-gray-100 pb-5 flex items-center gap-4">
            <span className="flex items-center justify-center bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-lg min-w-[36px]">
              {data.index}
            </span>
            {data.title}
          </h3>

          {/* VÙNG BIỂU ĐỒ */}
          {renderVisualContent()}

          {/* NỘI DUNG CHA - Tăng line-height và spacing */}
          <div 
            className="prose prose-slate max-w-none text-gray-700 mb-10 text-justify leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.content }} 
          />

          {/* KHU VỰC MỤC CON */}
          {data.subItems && data.subItems.length > 0 && (
            <div className="mt-12 space-y-8 border-t border-gray-50 pt-10">
              {data.subItems.map((subItem, idx) => (
                <FadeIn 
                  key={subItem.index} 
                  direction="up" 
                  delay={0.1 * (idx + 1)} 
                >
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                    {/* Header Con - Gọn gàng hơn */}
                    <h4 className="font-bold text-indigo-900 text-lg mb-4 flex items-center gap-3">
                        <span className="bg-white text-indigo-600 text-xs font-bold px-2 py-1 rounded border border-indigo-100 shadow-sm min-w-[35px] text-center">
                          {subItem.index}
                        </span>
                        {subItem.title}
                    </h4>

                    {/* Nội dung Con */}
                    <div 
                      className="prose prose-slate max-w-none text-gray-600 text-sm md:text-base leading-loose text-justify"
                      dangerouslySetInnerHTML={{ __html: subItem.content }}
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
};

export default ReportItem;