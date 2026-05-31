import React from "react";

// Component con StatBox giữ nguyên style bạn đã chỉnh
const StatBox = ({ label, value, delay }: { label: string; value: number; delay: number }) => (
  <div
    className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-[#ffd700]/30 rounded-xl p-3 text-center hover:border-[#ffd700] shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all duration-300 flex flex-col items-center justify-center aspect-[4/3] group hover:-translate-y-1"
    style={{ animationDelay: `${delay}ms` }}
  >
    <span className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wider mb-1 group-hover:text-[#ffd700] transition-colors">
      {label}
    </span>
    <span className="text-2xl md:text-3xl font-bold text-white group-hover:scale-110 transition-transform">
      {value}
    </span>
  </div>
);

export default function StatGrid({ stats }: { stats: any }) {
  return (
    <div className="px-4 mb-10">
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
        <StatBox label="Linh hồn" value={stats.soul} delay={100} />
        <StatBox label="Sứ mệnh" value={stats.expression} delay={200} />
        <StatBox label="Thái độ" value={stats.attitude} delay={300} />
        <StatBox label="Nhân cách" value={stats.personality} delay={400} />
        <StatBox label="Trưởng thành" value={stats.maturity} delay={500} />
        <StatBox label="Tư duy" value={stats.rational} delay={600} />
      </div>
    </div>
  );
}