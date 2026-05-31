// components/natal/NatalResultList.tsx
import React from 'react';
import { Sun, Moon, Star } from 'lucide-react';
import { PlanetPosition } from '../../utils/astrologyUtils';
import { ZODIAC_INFO } from '../../data/astrologyData';

export default function NatalResultList({ data }: { data: PlanetPosition[] }) {
  // Tách Sun/Moon và các hành tinh khác
  const sunMoon = data.filter(p => p.name.includes("Sun") || p.name.includes("Moon"));
  const others = data.filter(p => !p.name.includes("Sun") && !p.name.includes("Moon"));

  return (
    <div className="space-y-6 animate-fade-in-up mt-8">
      {/* Header Kết quả */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-white whitespace-nowrap font-sans">Kết Quả Bản Đồ Sao</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
      </div>

      {/* Grid Sun & Moon (Quan trọng nhất) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sunMoon.map((planet, idx) => {
          const isSun = planet.name.includes("Sun");
          return (
            <div key={idx} className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${isSun ? 'bg-gradient-to-br from-orange-500/10 to-red-500/5 border-orange-500/20' : 'bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border-blue-500/20'}`}>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${isSun ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {isSun ? <Sun size={20}/> : <Moon size={20}/>}
                  </div>
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400 font-sans">{isSun ? "Cốt lõi (Sun)" : "Cảm xúc (Moon)"}</div>
                    <div className="text-xl font-bold text-white font-sans">{planet.sign}</div>
                  </div>
                </div>
                <div className="text-right text-sm text-slate-500 font-sans">{planet.degree.toFixed(2)}°</div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3 mt-1 line-clamp-4 font-light font-sans">{ZODIAC_INFO[planet.sign]}</p>
            </div>
          )
        })}
      </div>

      {/* List các hành tinh khác */}
      <div className="bg-[#0F1629]/80 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 bg-white/5 border-b border-white/5 flex items-center gap-2">
          <Star size={16} className="text-purple-400"/>
          <span className="font-bold text-white text-sm font-sans">Vị trí các hành tinh khác</span>
        </div>
        {/* Dùng max-h và overflow-y-auto để list không quá dài */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-4 max-h-[400px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {others.map((planet, idx) => (
            <div key={idx} className="p-3 flex items-center justify-between hover:bg-white/5 transition-colors group rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm shadow-inner shadow-black/50">
                  {planet.icon}
                </div>
                <div className="text-sm font-medium text-slate-200 group-hover:text-indigo-300 transition-colors font-sans">{planet.name.split('(')[0]}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-purple-400 font-sans">{planet.sign}</div>
                <span className="text-[10px] text-slate-600 font-sans">{planet.degree.toFixed(1)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}