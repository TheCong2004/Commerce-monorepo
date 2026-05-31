import React from 'react';
import { filterSimByElement } from '../../logic/sim-filter';

export default function SuggestionList({ userNguHanh }: { userNguHanh: string }) {
  const filteredSims = filterSimByElement(userNguHanh).slice(0, 4);

  if (!userNguHanh) return null;

  return (
    <div className="mt-12 bg-[#fdfaf1] p-8 rounded-[2rem] border-2 border-[#d4af37]/20 shadow-sm">
      <h3 className="text-center font-semibold papyrus text-xl text-[#8b4513] mb-8 uppercase tracking-tight">
        Sim Đại Cát Hợp Mệnh {userNguHanh}
      </h3>
      
      {/* Grid 4 cột hàng ngang trên Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSims.map((sim) => (
          <div key={sim.number} className="bg-white border-2 border-[#eaddca] p-5 rounded-2xl hover:border-[#8b4513] transition-all group">
            <p className="text-lg font-bold text-[#3e2723] text-center mb-2">{sim.number}</p>
            <div className="flex justify-between text-[10px] font-bold text-[#d4af37] border-t border-dashed pt-3">
              <span>{sim.score}/10 ĐIỂM</span>
              <span>{sim.price}</span>
            </div>
            <button className="w-full mt-4 py-2 bg-[#8b4513] text-[#f1d382] rounded-lg text-[10px] font-bold uppercase group-hover:bg-[#cc0000] transition-colors">
              Mua Sim
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}