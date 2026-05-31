"use client";

import React from 'react';

export default function PyramidChart({ data }: { data: any }) {
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[1/1] my-4 bg-white p-2 select-none">
      
      {/* SVG: Hệ toạ độ 100x125 */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 125" fill="none">
        {/* Nhóm đường kẻ chính */}
        <g stroke="#1e3a8a" strokeWidth="0.7" strokeLinecap="round">
          {/* Từ đỉnh xuống tầng 2 */}
          <path d="M 50 15 L 35 35" /> 
          <path d="M 50 15 L 65 35" />

          {/* Từ tầng 2 xuống tầng 3 */}
          <path d="M 35 35 L 25 55" />
          <path d="M 35 35 L 50 55" />
          <path d="M 65 35 L 50 55" />
          <path d="M 65 35 L 75 55" />

          {/* Từ tầng 3 xuống đáy */}
          <path d="M 25 55 L 25 75" />
          <path d="M 50 55 L 25 75" />
          <path d="M 50 55 L 75 75" />
          <path d="M 75 55 L 75 75" />

          {/* Từ đáy xuống node trung gian & gốc */}
          <path d="M 25 75 L 35 85" />
          <path d="M 75 75 L 65 85" />
          <path d="M 35 85 L 50 95" />
          <path d="M 65 85 L 50 95" />
        </g>
      </svg>

      {/* Render Nodes */}
      {[...data.base, ...data.peaks, ...data.challenges].map((node) => (
        <div 
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {/* Vòng tròn số */}
          <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-[1.5px] flex items-center justify-center font-bold text-[9px] md:text-[10px] shadow-sm bg-white transition-all
            ${node.id.startsWith('P') ? 'border-purple-600 text-purple-900' : 
              node.id.startsWith('B') ? 'border-blue-500 text-blue-900' : 
              'border-purple-400 text-purple-800 italic'}`}
          >
            {node.value}
          </div>

          {/* Label Thông tin */}
          <div className="absolute top-full mt-0.5 flex flex-col items-center pointer-events-none">
            {node.age && (
              <div className="text-[7px] md:text-[8px] font-bold text-gray-800 whitespace-nowrap leading-tight text-center bg-white/90 px-0.5 rounded">
                {node.age} <br/> <span className="text-blue-600 font-medium">({node.year})</span>
              </div>
            )}
            {node.label && (
              <div className="text-[7px] md:text-[8px] font-black text-gray-900 uppercase italic whitespace-nowrap mt-0.5">
                {node.label}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}