"use client";

import React from 'react';

export default function GridChart({ data, title, subTitle }: { data: any[], title?: string, subTitle?: string }) {
  // Sắp xếp data theo thứ tự chuẩn thần số học (từ dưới lên trên, trái sang phải)
  const grid = [
    [data.find(d => d.pos === 3), data.find(d => d.pos === 6), data.find(d => d.pos === 9)],
    [data.find(d => d.pos === 2), data.find(d => d.pos === 5), data.find(d => d.pos === 8)],
    [data.find(d => d.pos === 1), data.find(d => d.pos === 4), data.find(d => d.pos === 7)],
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 w-40 h-32 border-2 border-gray-400">
        {grid.map((row, rIdx) => (
          row.map((cell, cIdx) => (
            <div 
              key={`${rIdx}-${cIdx}`} 
              className="border border-gray-400 flex items-center justify-center font-bold text-sm"
              style={{ color: cell?.val?.length > 1 ? '#ef4444' : '#1e293b' }} // Màu đỏ cho số bù trừ
            >
              {cell?.val}
            </div>
          ))
        ))}
      </div>
      {title && <p className="mt-3 font-bold text-xs uppercase">{title}</p>}
      {subTitle && <p className="text-[10px] text-gray-500 italic mt-1 text-center max-w-[150px]">{subTitle}</p>}
    </div>
  );
}