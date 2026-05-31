"use client";

import React from 'react';
import { ReportItemData } from '../report/data';

interface PersonalityGroupProps {
  items: ReportItemData[];
}

export default function PersonalityGroup({ items }: PersonalityGroupProps) {
  // Hàm lấy màu sắc theo index (giống ảnh mẫu)
  const getProgressColor = (index: string) => {
    if (index === "2.1") return "bg-[#b90000]"; // Đỏ đậm
    if (index === "2.2") return "bg-[#ff8c00]"; // Cam
    if (index === "2.3") return "bg-[#d4d400]"; // Vàng chanh
    return "bg-gray-300";
  };

  return (
    <div className="space-y-5 mt-4">
      {items.map((subItem) => {
        const percentage = parseInt(subItem.content) || 0;
        const isVip = subItem.is_vip;

        return (
          <div key={subItem.index} className="space-y-1.5">
            {/* Tiêu đề mục con */}
            <h4 className="font-bold text-gray-900 text-[15px]">
              {subItem.index}. {subItem.title}
            </h4>

            {/* Thanh Progress hoặc Thông báo VIP */}
            {isVip ? (
              <div className="text-[#f87171] text-[13px] italic font-medium">
                Chỉ tài khoản Vip mới xem được mục này!
              </div>
            ) : (
              <div className="w-full max-w-[500px] bg-gray-100 rounded-sm h-[26px] relative overflow-hidden shadow-sm">
                <div 
                  className={`h-full transition-all duration-1000 flex items-center justify-center text-white text-[12px] font-bold ${getProgressColor(subItem.index)}`}
                  style={{ width: `${percentage}%` }}
                >
                  {percentage}%
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}