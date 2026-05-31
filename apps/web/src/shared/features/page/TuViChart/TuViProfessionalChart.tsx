import { useMemo, useState } from "react";
import { Button } from "@/shared/ui/button";
import {
  TuViChart,
  TuViPalace,
  getOppositeBranch,
  getTamHopBranches,
} from "@/lib/astrologyRecommendations";

type Props = {
  chart: TuViChart;
  onSelectPalace?: (palace: TuViPalace) => void;
};

const GRID_BRANCHES = [
  "Ti",
  "Ngo",
  "Mui",
  "Than",
  "Thin",
  "center-a",
  "center-b",
  "Dau",
  "Mao",
  "center-c",
  "center-d",
  "Tuat",
  "Dan",
  "Suu",
  "Ty",
  "Hoi",
];

const BRANCH_POINTS: Record<string, { x: number; y: number }> = {
  Ti: { x: 12.5, y: 12.5 },
  Ngo: { x: 37.5, y: 12.5 },
  Mui: { x: 62.5, y: 12.5 },
  Than: { x: 87.5, y: 12.5 },
  Thin: { x: 12.5, y: 37.5 },
  Dau: { x: 87.5, y: 37.5 },
  Mao: { x: 12.5, y: 62.5 },
  Tuat: { x: 87.5, y: 62.5 },
  Dan: { x: 12.5, y: 87.5 },
  Suu: { x: 37.5, y: 87.5 },
  Ty: { x: 62.5, y: 87.5 },
  Hoi: { x: 87.5, y: 87.5 },
};

const elementTone: Record<string, string> = {
  Kim: "bg-slate-100 text-slate-700",
  Moc: "bg-emerald-100 text-emerald-700",
  Thuy: "bg-blue-100 text-blue-700",
  Hoa: "bg-rose-100 text-rose-700",
  Tho: "bg-amber-100 text-amber-800",
};

export default function TuViProfessionalChart({ chart, onSelectPalace }: Props) {
  const defaultPalace = useMemo(
    () => chart.palaces.find((palace) => palace.name === "Menh") || chart.palaces[0],
    [chart.palaces],
  );
  const [selectedBranch, setSelectedBranch] = useState(defaultPalace.branch);
  const [showTamHop, setShowTamHop] = useState(true);
  const [showOpposite, setShowOpposite] = useState(true);
  const [zoom, setZoom] = useState(100);

  const palaceByBranch = useMemo(() => {
    return chart.palaces.reduce<Record<string, TuViPalace>>((acc, palace) => {
      acc[palace.branch] = palace;
      return acc;
    }, {});
  }, [chart.palaces]);

  const selectedPalace = palaceByBranch[selectedBranch] || defaultPalace;
  const tamHopBranches = getTamHopBranches(selectedBranch);
  const oppositeBranch = getOppositeBranch(selectedBranch);

  const handleSelect = (palace: TuViPalace) => {
    setSelectedBranch(palace.branch);
    onSelectPalace?.(palace);
  };

  const shareChart = async () => {
    const text = `La so tu vi ${chart.fullName}: Menh ${chart.menhBranch}, cuc ${chart.cuc}, chu menh ${chart.chuMenh}.`;
    if (typeof navigator === "undefined") return;

    const browserNavigator = navigator as Navigator & {
      share?: (data: { title: string; text: string }) => Promise<void>;
      clipboard?: { writeText: (value: string) => Promise<void> };
    };

    if (browserNavigator.share) {
      await browserNavigator.share({ title: "La so tu vi", text });
      return;
    }

    if (browserNavigator.clipboard) {
      await browserNavigator.clipboard.writeText(text);
    }
  };

  const downloadChart = () => {
    if (typeof window === "undefined") return;
    const payload = JSON.stringify(chart, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `la-so-tu-vi-${chart.birthYear}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-lg border border-[#ead9b8] bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-[#ead9b8] px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#a16207]">Thien ban va dia ban</p>
          <h2 className="text-xl font-bold text-gray-950">La so tu vi professional</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={downloadChart} className="bg-[#d97706] text-white hover:bg-[#b45309]">
            Tai du lieu
          </Button>
          <Button type="button" variant="outline" onClick={shareChart}>
            Chia se
          </Button>
          <Button
            type="button"
            onClick={() => setShowTamHop((value) => !value)}
            className={showTamHop ? "bg-emerald-600 text-white hover:bg-emerald-700" : ""}
            variant={showTamHop ? "default" : "outline"}
          >
            Tam Hop
          </Button>
          <Button
            type="button"
            onClick={() => setShowOpposite((value) => !value)}
            className={showOpposite ? "bg-red-600 text-white hover:bg-red-700" : ""}
            variant={showOpposite ? "default" : "outline"}
          >
            Doi Xung
          </Button>
          <div className="ml-0 flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 lg:ml-4">
            <button type="button" className="px-2 text-lg" onClick={() => setZoom((value) => Math.max(80, value - 10))}>
              -
            </button>
            <span className="w-12 text-center text-sm font-semibold">{zoom}%</span>
            <button type="button" className="px-2 text-lg" onClick={() => setZoom((value) => Math.min(130, value + 10))}>
              +
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-4 xl:grid-cols-[minmax(760px,1fr)_340px]">
        <div className="overflow-auto">
          <div
            className="relative mx-auto grid min-w-[760px] max-w-[980px] grid-cols-4 border-2 border-[#b45309] bg-[#fff7d6]"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            <ConnectionOverlay
              selectedBranch={selectedBranch}
              tamHopBranches={tamHopBranches}
              oppositeBranch={oppositeBranch}
              showTamHop={showTamHop}
              showOpposite={showOpposite}
            />

            {GRID_BRANCHES.map((branchKey) => {
              if (branchKey.startsWith("center")) {
                if (branchKey !== "center-a") return null;
                return <CenterPanel key={branchKey} chart={chart} />;
              }

              const palace = palaceByBranch[branchKey];
              if (!palace) {
                return <div key={branchKey} className="min-h-[210px] border border-[#e4b66b]" />;
              }

              return (
                <PalaceCell
                  key={palace.branch}
                  palace={palace}
                  isSelected={palace.branch === selectedBranch}
                  isTamHop={tamHopBranches.includes(palace.branch)}
                  isOpposite={palace.branch === oppositeBranch}
                  onSelect={() => handleSelect(palace)}
                />
              );
            })}
          </div>
        </div>

        <aside className="rounded-lg border border-gray-200 bg-[#fffaf0] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#92400e]">Cung dang xem</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-950">
            {selectedPalace.name} - {selectedPalace.branch}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${elementTone[selectedPalace.branchElement]}`}>
              {selectedPalace.branchElement}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
              Dai van {selectedPalace.daiVan}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
              {selectedPalace.trangSinh}
            </span>
          </div>
          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-700">
            <div>
              <p className="font-semibold text-gray-950">Chinh tinh</p>
              <p>{selectedPalace.mainStars.map((star) => `${star.name}${star.brightness ? ` (${star.brightness})` : ""}`).join(", ")}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-950">Phu tinh</p>
              <p>{selectedPalace.secondaryStars.map((star) => star.name).join(", ")}</p>
            </div>
            <div className="rounded-md bg-white p-3">
              <p className="font-semibold text-gray-950">Goi y ban hang</p>
              <p>
                Dung cung {selectedPalace.name} va hanh {selectedPalace.branchElement} de tao mau in,
                headline san pham, sim hop menh hoac goi cuoc theo nhu cau ca nhan.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PalaceCell({
  palace,
  isSelected,
  isTamHop,
  isOpposite,
  onSelect,
}: {
  palace: TuViPalace;
  isSelected: boolean;
  isTamHop: boolean;
  isOpposite: boolean;
  onSelect: () => void;
}) {
  const mainTone = palace.mainStars[0]?.nature === "bad" ? "text-red-600" : palace.mainStars[0]?.nature === "good" ? "text-emerald-700" : "text-blue-700";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "relative min-h-[210px] border border-[#d69a3a] bg-[#fff7d6] p-2 text-left transition",
        isSelected ? "z-10 ring-4 ring-[#f59e0b]" : "",
        isTamHop ? "bg-[#fff0b8]" : "",
        isOpposite ? "bg-[#ffe4e6]" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between text-xs font-semibold text-slate-600">
        <span>{palace.branch}</span>
        <span className="text-red-600">{palace.daiVan}</span>
      </div>
      <h4 className="mt-1 text-center text-base font-bold uppercase text-[#92400e]">{palace.name}</h4>
      <div className="mt-3 text-center">
        {palace.mainStars.map((star) => (
          <p key={`${palace.branch}-${star.name}`} className={`text-sm font-bold uppercase ${mainTone}`}>
            {star.name}
            {star.brightness ? ` (${star.brightness})` : ""}
          </p>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs leading-5">
        <div className="text-red-600">
          {palace.secondaryStars.filter((star) => star.nature === "bad").map((star) => (
            <p key={`${palace.branch}-${star.name}`}>{star.name}</p>
          ))}
        </div>
        <div className="text-blue-700">
          {palace.secondaryStars.filter((star) => star.nature !== "bad").map((star) => (
            <p key={`${palace.branch}-${star.name}`}>{star.name}</p>
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>{palace.trangSinh}</span>
        <span>+{palace.branchElement}</span>
      </div>
    </button>
  );
}

function CenterPanel({ chart }: { chart: TuViChart }) {
  return (
    <div className="col-span-2 row-span-2 flex min-h-[420px] flex-col justify-center border border-[#d69a3a] bg-[#f6d9a6] p-6 text-center">
      <p className="text-2xl font-bold uppercase tracking-wide text-[#92400e]">Tu vi dau so</p>
      <p className="mt-1 text-xs text-[#a16207]">Commerce astrology engine</p>
      <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-left">
        <div className="space-y-3 text-sm text-gray-800">
          <p><span className="font-semibold">Ho ten:</span> {chart.fullName}</p>
          <p><span className="font-semibold">Nam sinh:</span> {chart.birthYear}</p>
          <p><span className="font-semibold">Duong lich:</span> {chart.birthDate || "Chua nhap"}</p>
          <p><span className="font-semibold">Gio:</span> {chart.birthHour}</p>
          <p><span className="font-semibold">Gioi tinh:</span> {chart.gender}</p>
        </div>
        <div className="h-44 w-44 rounded-full border-[10px] border-[#e5bd7a] bg-[#f8e4bd]" />
        <div className="space-y-3 text-sm text-gray-800">
          <p><span className="font-semibold">Ban menh:</span> {chart.element}</p>
          <p><span className="font-semibold">Cuc:</span> {chart.cuc}</p>
          <p><span className="font-semibold">Menh:</span> {chart.menhBranch}</p>
          <p><span className="font-semibold">Than:</span> {chart.thanBranch}</p>
          <p><span className="font-semibold">Chu menh:</span> {chart.chuMenh}</p>
          <p><span className="font-semibold">Chu than:</span> {chart.chuThan}</p>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {["Kim", "Moc", "Thuy", "Hoa", "Tho"].map((element) => (
          <span key={element} className={`rounded-md px-3 py-1 text-xs font-semibold ${elementTone[element]}`}>
            {element}
          </span>
        ))}
      </div>
    </div>
  );
}

function ConnectionOverlay({
  selectedBranch,
  tamHopBranches,
  oppositeBranch,
  showTamHop,
  showOpposite,
}: {
  selectedBranch: string;
  tamHopBranches: string[];
  oppositeBranch: string;
  showTamHop: boolean;
  showOpposite: boolean;
}) {
  const selectedPoint = BRANCH_POINTS[selectedBranch];
  const oppositePoint = BRANCH_POINTS[oppositeBranch];
  const tamHopPoints = tamHopBranches.map((branch) => BRANCH_POINTS[branch]).filter(Boolean);

  return (
    <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {showTamHop && tamHopPoints.length === 3 ? (
        <polygon
          points={tamHopPoints.map((point) => `${point.x},${point.y}`).join(" ")}
          fill="rgba(245, 158, 11, 0.08)"
          stroke="#f59e0b"
          strokeDasharray="1.4 1.2"
          strokeWidth="0.35"
        />
      ) : null}
      {showOpposite && selectedPoint && oppositePoint ? (
        <line
          x1={selectedPoint.x}
          y1={selectedPoint.y}
          x2={oppositePoint.x}
          y2={oppositePoint.y}
          stroke="#ef4444"
          strokeDasharray="1.2 1"
          strokeWidth="0.35"
        />
      ) : null}
    </svg>
  );
}
