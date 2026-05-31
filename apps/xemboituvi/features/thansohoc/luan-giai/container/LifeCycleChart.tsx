"use client";

import React from 'react';

export default function LifeCycleChart({ cycles }: { cycles: any[] }) {
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center gap-8 my-10">
      {cycles.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center text-center space-y-3">
          {/* Vòng tròn số */}
          <div className={`relative w-32 h-32 rounded-full border-4 flex items-center justify-center ${item.border} border-t-transparent -rotate-45`}>
            <span className={`text-5xl font-bold rotate-45 ${item.color}`}>{item.number}</span>
          </div>
          
          {/* Chú thích */}
          <div className="space-y-1">
            <p className={`font-bold ${item.color} uppercase text-sm`}>{item.label}</p>
            <p className="font-black text-gray-800 uppercase text-md">{item.status}</p>
            <p className="text-gray-500 text-[11px] italic">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}