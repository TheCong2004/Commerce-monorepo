"use client";

import FadeIn from '@/components/ui/FadeIn';
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';

interface ChartData {
  year: string;
  value: number;
  label?: string;
}

export default function CycleChart({ chartData }: { chartData: ChartData[] }) {
  return (
    <FadeIn direction="up" delay={0.2}>
      {/* 1. Thêm flex và justify-center để căn giữa khối container */}
      <div className="w-full h-[150px] mt-2 select-none flex justify-center items-center">
        
        {/* 2. ResponsiveContainer: 
               - Nếu để width="50%" thì nó chỉ chiếm nửa màn hình, 
               - Mình giữ nguyên 50% theo ý bạn nhưng nhờ flex ở trên nó sẽ nằm giữa.
        */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            // 3. Căn chỉnh margin để biểu đồ cân đối hơn
            margin={{ top: 30, right: 40, left: 40, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
            
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
              dy={10}
            />
            
            <YAxis domain={[1, 9]} hide />
            
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid rgba(255,255,255,0.1)', 
                backgroundColor: '#1e1b4b', 
                color: '#fff' 
              }}
              itemStyle={{ color: "#4ade80", fontWeight: "bold" }} 
              cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
            />
            
            <Line
              type="monotone" 
              dataKey="value" 
              stroke="#4ade80" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#4ade80', strokeWidth: 2, stroke: '#1e1b4b' }} 
              activeDot={{ r: 6, fill: '#fff' }}
              animationDuration={2000}
              animationEasing="ease-in-out"
            >
              <LabelList 
                  dataKey="value" 
                  position="top" 
                  offset={10} 
                  fill="#ffffff" 
                  fontSize={14} 
                  fontWeight="bold" 
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </FadeIn>
  );
}