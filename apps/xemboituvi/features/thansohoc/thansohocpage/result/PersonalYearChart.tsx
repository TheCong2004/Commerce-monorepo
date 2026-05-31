"use client";
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';

interface ChartData {
  year: string;
  value: number;
  label?: string;
}

export default function PersonalYearChart({ data }: { data: ChartData[] }) {
  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-200 mt-6">
      <h3 className="text-gray-800 font-bold text-lg flex items-center gap-2 mb-6 ml-2">
        Biểu đồ vận niên
      </h3>
      <div className="h-[300px] w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="year" axisLine={false} tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} dy={10}
            />
            <YAxis domain={[1, 9]} hide />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff', color: '#374151' }}
              itemStyle={{ color: "#22c55e", fontWeight: "bold" }}
              cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
            />
            <Line
              type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3}
              dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            >
              <LabelList dataKey="value" position="top" offset={10} fill="#374151" fontSize={12} fontWeight="bold" />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center text-gray-500 font-medium mt-4 text-xs uppercase tracking-wider">
        Chu kỳ vận số 9 năm của bạn
      </p>
    </div>
  );
}