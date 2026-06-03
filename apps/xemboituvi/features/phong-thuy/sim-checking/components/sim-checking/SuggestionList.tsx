"use client";

import React from "react";
import { filterSimByElement } from "../../logic/sim-filter";
import { parseVndPrice, redirectToPrintervalCheckout } from "@/lib/printerval-checkout";

export default function SuggestionList({ userNguHanh }: { userNguHanh: string }) {
  const filteredSims = filterSimByElement(userNguHanh).slice(0, 4);

  if (!userNguHanh) return null;

  return (
    <section className="rounded-lg border border-[#D4AF37]/35 bg-black/45 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-[#D4AF37]/75 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-[#D4AF37]">Gợi ý mua sim</p>
          <h3 className="mt-2 text-[14px] font-bold uppercase tracking-wide text-[#F3E3BC]">Sim hợp mệnh {userNguHanh}</h3>
        </div>
        <p className="max-w-md text-[13px] leading-6 text-white/65">
          Chọn số có điểm cao, ngũ hành đúng nhóm và mức giá phù hợp.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filteredSims.map((sim) => (
          <article key={sim.number} className="rounded-lg border border-[#D4AF37]/25 bg-black/35 p-4">
            <p className="text-center text-[14px] font-bold text-[#F3E3BC]">{sim.number}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <MiniMetric label="Điểm" value={`${sim.score}/10`} />
              <MiniMetric label="Ngũ hành" value={sim.nguHanh} />
            </div>
            <div className="mt-3 rounded-lg border border-[#D4AF37]/25 bg-black/30 p-3 text-center">
              <p className="text-[13px] text-white/50">Giá sim</p>
              <p className="mt-1 text-[14px] font-bold text-[#D4AF37]">{sim.price}</p>
            </div>
            <button
              className="mt-3 w-full rounded-lg bg-[#D4AF37] px-4 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[#0B1020] hover:bg-[#F3E3BC]"
              onClick={() =>
                redirectToPrintervalCheckout({
                  id: `sim-${sim.number.replace(/\D/g, "")}`,
                  title: `Sim phong thủy ${sim.number}`,
                  price: parseVndPrice(sim.price),
                  variantTitle: `Ngũ hành ${sim.nguHanh} - ${sim.score}/10 điểm`,
                  source: "phong-thuy-sim",
                  metadata: {
                    sim_number: sim.number,
                    ngu_hanh: sim.nguHanh,
                    score: sim.score,
                    original_price: sim.price,
                  },
                })
              }
            >
              Mua sim này
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function MiniMetric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-[#D4AF37]/25 bg-black/30 p-3 text-center">
      <p className="text-[13px] text-white/50">{label}</p>
      <p className="mt-1 text-[13px] font-semibold text-white">{value}</p>
    </div>
  );
}
