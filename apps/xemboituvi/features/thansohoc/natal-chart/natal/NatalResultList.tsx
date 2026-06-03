import { Moon, Star, Sun } from "lucide-react";
import { MysticDarkPanel } from "@/components/ui/client/mystic-page-shell";
import { ZODIAC_INFO } from "../../data/astrologyData";
import { PlanetPosition } from "../../utils/astrologyUtils";

export default function NatalResultList({ data }: { data: PlanetPosition[] }) {
  const sunMoon = data.filter((planet) => planet.name.includes("Sun") || planet.name.includes("Moon"));
  const others = data.filter((planet) => !planet.name.includes("Sun") && !planet.name.includes("Moon"));

  return (
    <div className="mt-6 space-y-5">
      <div className="flex items-center gap-3">
        <h2 className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#F3E3BC]">Kết quả bản đồ sao</h2>
        <div className="h-px flex-1 bg-[#D4AF37]/25" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sunMoon.map((planet) => {
          const isSun = planet.name.includes("Sun");
          return (
            <MysticDarkPanel key={planet.name} className="p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/12 text-[#D4AF37]">
                    {isSun ? <Sun size={18} /> : <Moon size={18} />}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/45">{isSun ? "Cốt lõi (Sun)" : "Cảm xúc (Moon)"}</p>
                    <p className="mt-1 text-[14px] font-bold text-[#F3E3BC]">{planet.sign}</p>
                  </div>
                </div>
                <div className="text-[13px] font-semibold text-white/55">{planet.degree.toFixed(2)} deg</div>
              </div>
              <p className="border-t border-white/10 pt-3 text-[13px] leading-6 text-white/62">{ZODIAC_INFO[planet.sign]}</p>
            </MysticDarkPanel>
          );
        })}
      </div>

      <MysticDarkPanel className="overflow-hidden p-0">
        <div className="flex items-center gap-2 border-b border-[#D4AF37]/20 px-4 py-3">
          <Star size={16} className="text-[#D4AF37]" />
          <span className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#F3E3BC]">Vị trí các hành tinh khác</span>
        </div>

        <div className="grid max-h-[400px] grid-cols-1 gap-1 overflow-y-auto p-2 md:grid-cols-2">
          {others.map((planet) => (
            <div key={planet.name} className="flex items-center justify-between rounded-lg px-3 py-2 text-[13px] transition hover:bg-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/35 text-[13px] text-[#F3E3BC]">
                  {planet.icon}
                </div>
                <div className="font-semibold text-white/75">{planet.name.split("(")[0]}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#D4AF37]">{planet.sign}</div>
                <span className="text-[11px] text-white/40">{planet.degree.toFixed(1)} deg</span>
              </div>
            </div>
          ))}
        </div>
      </MysticDarkPanel>
    </div>
  );
}
