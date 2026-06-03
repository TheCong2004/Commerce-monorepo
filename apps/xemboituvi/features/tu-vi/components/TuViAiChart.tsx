"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { generateTuViAiChart, TuViAiChartInput, TuViPalace, TuViStar } from "../services/tuvi-ai-chart";

const GRID_POSITIONS = [
  [0, 1, 2, 3],
  [4, -1, -1, 5],
  [6, -1, -1, 7],
  [8, 9, 10, 11],
];

const BRANCH_POINTS: Record<string, { x: number; y: number }> = {
  "Tỵ": { x: 12.5, y: 12.5 },
  "Ngọ": { x: 37.5, y: 12.5 },
  "Mùi": { x: 62.5, y: 12.5 },
  "Thân": { x: 87.5, y: 12.5 },
  "Thìn": { x: 12.5, y: 37.5 },
  "Dậu": { x: 87.5, y: 37.5 },
  "Mão": { x: 12.5, y: 62.5 },
  "Tuất": { x: 87.5, y: 62.5 },
  "Dần": { x: 12.5, y: 87.5 },
  "Sửu": { x: 37.5, y: 87.5 },
  "Tý": { x: 62.5, y: 87.5 },
  "Hợi": { x: 87.5, y: 87.5 },
};

const TAM_HOP = [
  ["Dần", "Ngọ", "Tuất"],
  ["Thân", "Tý", "Thìn"],
  ["Tỵ", "Dậu", "Sửu"],
  ["Hợi", "Mão", "Mùi"],
];

const DOI_XUNG: Record<string, string> = {
  "Tý": "Ngọ",
  "Ngọ": "Tý",
  "Sửu": "Mùi",
  "Mùi": "Sửu",
  "Dần": "Thân",
  "Thân": "Dần",
  "Mão": "Dậu",
  "Dậu": "Mão",
  "Thìn": "Tuất",
  "Tuất": "Thìn",
  "Tỵ": "Hợi",
  "Hợi": "Tỵ",
};

const PALACE_DETAILS: Record<string, { chinese: string; meaning: string; influence: string }> = {
  "MỆNH": {
    chinese: "命",
    meaning: "Cung Mệnh là trục căn bản của lá số, thể hiện khí chất, tư duy, vóc dáng và cách một người bước vào đời.",
    influence: "Ảnh hưởng mạnh đến bản lĩnh cá nhân, xu hướng quyết định, khả năng tự chủ và cách ứng xử trước biến động.",
  },
  "PHỤ MẪU": {
    chinese: "父母",
    meaning: "Cung Phụ Mẫu luận về cha mẹ, gia đạo gốc, sự nâng đỡ từ trưởng bối và nền tảng giáo dưỡng.",
    influence: "Ảnh hưởng đến quan hệ với gia đình, phúc phần nhận từ cha mẹ và mức độ được hậu thuẫn khi còn trẻ.",
  },
  "PHÚC ĐỨC": {
    chinese: "福德",
    meaning: "Cung Phúc Đức chỉ phúc khí dòng họ, đời sống tinh thần, gốc rễ âm đức và khả năng gặp may khi nguy cấp.",
    influence: "Ảnh hưởng đến độ bền vận mệnh, nội tâm, niềm tin và sức nâng đỡ vô hình trong những giai đoạn khó.",
  },
  "ĐIỀN TRẠCH": {
    chinese: "田宅",
    meaning: "Cung Điền Trạch đại diện nhà cửa, đất đai, tài sản cố định và môi trường cư trú.",
    influence: "Ảnh hưởng đến khả năng tích lũy bất động sản, đổi nhà, an cư và sự ổn định hậu vận.",
  },
  "QUAN LỘC": {
    chinese: "官祿",
    meaning: "Cung Quan Lộc luận công danh, nghề nghiệp, trách nhiệm xã hội và con đường tạo vị thế.",
    influence: "Ảnh hưởng đến sự nghiệp, danh vọng, khả năng thăng tiến và cách một người gánh vác vai trò lớn.",
  },
  "NÔ BỘC": {
    chinese: "奴僕",
    meaning: "Cung Nô Bộc đại diện bạn bè, cộng sự, cấp dưới, quan hệ xã hội và mạng lưới hỗ trợ.",
    influence: "Ảnh hưởng đến khả năng hợp tác, được người giúp, dùng người và tránh thị phi trong quan hệ.",
  },
  "THIÊN DI": {
    chinese: "遷移",
    meaning: "Cung Thiên Di đại diện cho thay đổi, di chuyển, du lịch, xuất ngoại và những cuộc hành trình.",
    influence: "Ảnh hưởng đến phát triển bên ngoài, cơ hội xa quê, danh tiếng xã hội và biến động khi ra ngoài.",
  },
  "TẬT ÁCH": {
    chinese: "疾厄",
    meaning: "Cung Tật Ách luận sức khỏe, bệnh căn, áp lực tinh thần và các điểm yếu cần phòng ngừa.",
    influence: "Ảnh hưởng đến thể trạng, rủi ro bệnh tật, khả năng hồi phục và thói quen chăm sóc bản thân.",
  },
  "TÀI BẠCH": {
    chinese: "財帛",
    meaning: "Cung Tài Bạch thể hiện tiền bạc, nguồn thu, cách kiếm tiền và cách giữ tiền.",
    influence: "Ảnh hưởng đến tài vận, dòng tiền, đầu tư, chi tiêu và cơ hội tích lũy tài sản.",
  },
  "TỬ TỨC": {
    chinese: "子息",
    meaning: "Cung Tử Tức luận con cái, hậu duệ, khả năng nuôi dưỡng và duyên phận với thế hệ sau.",
    influence: "Ảnh hưởng đến đường con cái, cách dạy dỗ, niềm vui gia đình và phúc khí truyền đời.",
  },
  "PHU THÊ": {
    chinese: "夫妻",
    meaning: "Cung Phu Thê đại diện hôn nhân, bạn đời, mô thức yêu đương và chất lượng quan hệ thân mật.",
    influence: "Ảnh hưởng đến duyên vợ chồng, sự hòa hợp, thử thách tình cảm và cách giữ bền cam kết.",
  },
  "HUYNH ĐỆ": {
    chinese: "兄弟",
    meaning: "Cung Huynh Đệ luận anh chị em, bạn ngang hàng, sự tương trợ và cạnh tranh trong cùng thế hệ.",
    influence: "Ảnh hưởng đến tình nghĩa anh em, liên kết đồng đội, chia sẻ nguồn lực và các xung đột gần gũi.",
  },
};

function starClass(star: TuViStar) {
  const classes: Record<TuViStar["tone"], string> = {
    red: "text-red-600",
    blue: "text-blue-700",
    green: "text-emerald-700",
    purple: "text-violet-700",
    black: "text-slate-900",
    orange: "text-orange-600",
  };
  return classes[star.tone];
}

function PalaceCell({ palace, selected, related, onSelect }: {
  palace: TuViPalace;
  selected: boolean;
  related: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative min-h-[188px] border border-[#cf9b50] bg-[#fff7dc] px-2 py-1 text-left transition ${
        selected ? "z-10 ring-2 ring-red-500 bg-[#fff0c5]" : related ? "ring-1 ring-emerald-500" : "hover:bg-[#fff2cd]"
      }`}
    >
      <div className="flex items-start justify-between border-b border-[#dbb76c] pb-1 text-[10px] font-semibold text-slate-600">
        <span>{palace.branch}</span>
        <span className="text-[13px] font-bold text-[#9b4b00]">{palace.name}</span>
        <span className="text-red-600">{palace.age}</span>
      </div>

      <div className="mt-1 min-h-9 text-center">
        {palace.mainStars.map((star) => (
          <div key={`${palace.name}-${star.name}`} className={`text-[14px] font-bold leading-5 ${starClass(star)}`}>
            {star.name}{star.status ? <span className="ml-1 text-[10px]">({star.status})</span> : null}
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-semibold leading-4">
        <div>
          {palace.leftStars.map((star) => (
            <div key={`${palace.name}-l-${star.name}`} className={starClass(star)}>{star.name}</div>
          ))}
        </div>
        <div className="text-right">
          {palace.rightStars.map((star) => (
            <div key={`${palace.name}-r-${star.name}`} className={starClass(star)}>{star.name}</div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-1 left-2 right-2 flex justify-between border-t border-dashed border-[#e2c27b] pt-1 text-[10px] font-semibold text-[#a75a08]">
        <span>{palace.bottomLeft}</span>
        <span>{palace.bottomCenter}</span>
        <span>{palace.bottomRight}</span>
      </div>
    </button>
  );
}

function RelationOverlay({ branch, showTamHop, showDoiXung }: {
  branch: string;
  showTamHop: boolean;
  showDoiXung: boolean;
}) {
  const tamHopGroup = TAM_HOP.find((group) => group.includes(branch));
  const opposite = DOI_XUNG[branch];

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {showTamHop && tamHopGroup ? (
        <polygon
          points={tamHopGroup.map((item) => `${BRANCH_POINTS[item].x},${BRANCH_POINTS[item].y}`).join(" ")}
          fill="rgba(34,197,94,0.06)"
          stroke="rgba(34,197,94,0.72)"
          strokeWidth="0.35"
          strokeDasharray="1.2 1.2"
        />
      ) : null}
      {showDoiXung && opposite ? (
        <line
          x1={BRANCH_POINTS[branch].x}
          y1={BRANCH_POINTS[branch].y}
          x2={BRANCH_POINTS[opposite].x}
          y2={BRANCH_POINTS[opposite].y}
          stroke="rgba(239,68,68,0.8)"
          strokeWidth="0.35"
          strokeDasharray="1.2 1.2"
        />
      ) : null}
    </svg>
  );
}

function AnalysisText({ content }: { content: string }) {
  return (
    <div className="space-y-3 text-left text-sm leading-7 text-slate-700">
      {content.split("\n").map((line, index) => {
        if (!line.trim()) return <div key={index} className="h-1" />;
        if (line.startsWith("### ")) {
          return <h4 key={index} className="pt-2 text-[14px] font-bold text-violet-800">{line.replace("### ", "")}</h4>;
        }
        if (line.startsWith("- ")) {
          return <p key={index} className="rounded-lg border border-[#D4AF37]/25 bg-black/35 px-3 py-2 text-white/70 shadow-sm">{line.replace("- ", "")}</p>;
        }
        return <p key={index}>{line}</p>;
      })}
    </div>
  );
}

function drawWrappedText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && line) {
      context.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
      return;
    }
    line = testLine;
  });

  if (line) context.fillText(line, x, currentY);
  return currentY + lineHeight;
}

export default function TuViAiChart({ input }: { input: TuViAiChartInput }) {
  const router = useRouter();
  const chart = useMemo(() => generateTuViAiChart(input), [input]);
  const chartRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [showTamHop, setShowTamHop] = useState(true);
  const [showDoiXung, setShowDoiXung] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState("Sửu");
  const [detailPalace, setDetailPalace] = useState<TuViPalace | null>(null);
  const [palaceAnalyses, setPalaceAnalyses] = useState<Record<string, string>>({});
  const [analyzingPalace, setAnalyzingPalace] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const relatedBranches = new Set([
    ...(TAM_HOP.find((group) => group.includes(selectedBranch)) || []),
    DOI_XUNG[selectedBranch],
  ].filter(Boolean));

  const handleShare = async () => {
    const text = `Lá số Tử Vi của ${input.fullName} - ${chart.canChiYear}`;
    if (navigator.share) {
      await navigator.share({ title: "Lá số Tử Vi", text, url: window.location.href });
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    alert("Đã sao chép liên kết lá số.");
  };

  const handleDownloadImage = () => {
    const canvas = document.createElement("canvas");
    const scale = 2;
    const cell = 260;
    const width = cell * 4;
    const height = cell * 4 + 42;
    canvas.width = width * scale;
    canvas.height = height * scale;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.scale(scale, scale);
    context.fillStyle = "#fff7dc";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#8b4513";
    context.lineWidth = 4;
    context.strokeRect(0, 0, width, cell * 4);

    GRID_POSITIONS.forEach((row, rowIndex) => {
      row.forEach((palaceIndex, colIndex) => {
        if (palaceIndex === -1) return;

        const palace = chart.palaces[palaceIndex];
        const x = colIndex * cell;
        const y = rowIndex * cell;

        context.fillStyle = "#fff7dc";
        context.fillRect(x, y, cell, cell);
        context.strokeStyle = "#cf9b50";
        context.lineWidth = 1;
        context.strokeRect(x, y, cell, cell);

        context.fillStyle = "#475569";
        context.font = "700 14px Arial";
        context.fillText(palace.branch, x + 12, y + 24);
        context.fillStyle = "#9b4b00";
        context.font = "900 18px Arial";
        context.textAlign = "center";
        context.fillText(palace.name, x + cell / 2, y + 26);
        context.textAlign = "left";
        context.fillStyle = "#dc2626";
        context.font = "700 13px Arial";
        context.fillText(String(palace.age), x + cell - 34, y + 24);

        let textY = y + 60;
        context.textAlign = "center";
        palace.mainStars.forEach((star) => {
          context.fillStyle = star.tone === "blue" ? "#1d4ed8" : star.tone === "green" ? "#047857" : star.tone === "orange" ? "#ea580c" : "#dc2626";
          context.font = "900 20px Arial";
          context.fillText(`${star.name}${star.status ? ` (${star.status})` : ""}`, x + cell / 2, textY);
          textY += 24;
        });

        context.textAlign = "left";
        context.font = "700 14px Arial";
        palace.leftStars.forEach((star, index) => {
          context.fillStyle = star.tone === "blue" ? "#1d4ed8" : "#dc2626";
          context.fillText(star.name, x + 12, y + 120 + index * 20);
        });
        palace.rightStars.forEach((star, index) => {
          context.fillStyle = star.tone === "blue" ? "#1d4ed8" : "#dc2626";
          context.textAlign = "right";
          context.fillText(star.name, x + cell - 12, y + 120 + index * 20);
          context.textAlign = "left";
        });

        context.fillStyle = "#a75a08";
        context.font = "700 12px Arial";
        context.fillText(palace.bottomLeft, x + 12, y + cell - 14);
        context.textAlign = "center";
        context.fillText(palace.bottomCenter, x + cell / 2, y + cell - 14);
        context.textAlign = "right";
        context.fillText(palace.bottomRight, x + cell - 12, y + cell - 14);
        context.textAlign = "left";
      });
    });

    const centerX = cell;
    const centerY = cell;
    context.fillStyle = "#f9dfaa";
    context.fillRect(centerX, centerY, cell * 2, cell * 2);
    context.strokeStyle = "#cf9b50";
    context.strokeRect(centerX, centerY, cell * 2, cell * 2);
    context.textAlign = "center";
    context.fillStyle = "#9b4b00";
    context.font = "900 28px Arial";
    context.fillText("TỬ VI ĐẨU SỐ", centerX + cell, centerY + 60);
    context.font = "700 13px Arial";
    context.fillStyle = "#a16207";
    context.fillText("https://xemboituvi.local", centerX + cell, centerY + 84);

    context.textAlign = "left";
    context.fillStyle = "#1f2937";
    context.font = "700 17px Arial";
    let infoY = centerY + 130;
    [
      `Họ tên: ${input.fullName}`,
      `Năm sinh: ${chart.canChiYear} (${input.year})`,
      `Dương lịch: ${input.day}/${input.month}/${input.year}`,
      `Âm lịch: ${chart.lunarDate}`,
      `Giờ: ${input.hour}h${String(input.minute).padStart(2, "0")}`,
      `Giới tính: ${input.gender}`,
    ].forEach((line) => {
      context.fillText(line, centerX + 44, infoY);
      infoY += 28;
    });

    context.textAlign = "right";
    infoY = centerY + 130;
    [`Bản Mệnh: ${chart.menh}`, `Cục: ${chart.cuc}`, `Chủ Mệnh: ${chart.chuMenh}`, `Chủ Thân: ${chart.chuThan}`].forEach((line) => {
      context.fillText(line, centerX + cell * 2 - 44, infoY);
      infoY += 28;
    });

    context.textAlign = "center";
    context.fillStyle = "#7a4d16";
    context.font = "14px Arial";
    drawWrappedText(context, "Lá số dùng để tham khảo định hướng, không xem như định mệnh cố định.", centerX + 70, centerY + cell * 2 - 64, cell * 2 - 140, 18);

    context.fillStyle = "#f5deb3";
    context.fillRect(0, cell * 4, width, 42);
    context.fillStyle = "#475569";
    context.font = "700 13px Arial";
    context.textAlign = "center";
    context.fillText(`Lá số Tử Vi của ${input.fullName} - ${chart.canChiYear}`, width / 2, cell * 4 + 26);

    const link = document.createElement("a");
    link.download = `la-so-tu-vi-${input.fullName.trim().replace(/\s+/g, "-") || "chart"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleAnalyzePalace = async (palace: TuViPalace) => {
    setAnalyzingPalace(palace.name);
    setAnalysisError(null);

    try {
      const response = await fetch("/api/tuvi/analyze-palace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, palace }),
      });
      const data = await response.json();

      if (!response.ok || !data.analysis) {
        throw new Error(data.error || "Không thể luận giải cung này.");
      }

      setPalaceAnalyses((current) => ({ ...current, [palace.name]: data.analysis }));
    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : "Không thể luận giải cung này.");
    } finally {
      setAnalyzingPalace(null);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-[#faf5ff] to-white pb-8 pt-28 text-slate-900">
      <div className="mx-auto max-w-[1470px] px-4">
        <div className="overflow-hidden rounded-xl border border-[#D4AF37]/35 bg-black/45 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <header className="flex items-center gap-3 border-b border-violet-100 bg-gradient-to-r from-violet-50 to-white px-5 py-4">
            <span className="text-[14px] text-orange-500">★</span>
            <h1 className="text-[14px] font-bold">Thiên Bàn & Địa Bàn</h1>
          </header>

          <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => router.push("/tu-vi/tron-doi")} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
                ← Quay lại
              </button>
              <button onClick={handleDownloadImage} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-orange-600">
                Tải Ảnh Lá Số
              </button>
              <button onClick={handleShare} className="rounded-lg border border-orange-300 px-4 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50">
                Chia Sẻ
              </button>
              <button onClick={() => setShowTamHop((value) => !value)} className={`rounded-lg px-4 py-2 text-sm font-bold text-white ${showTamHop ? "bg-emerald-600" : "bg-slate-400"}`}>
                △ Tam Hợp
              </button>
              <button onClick={() => setShowDoiXung((value) => !value)} className={`rounded-lg px-4 py-2 text-sm font-bold text-white ${showDoiXung ? "bg-red-600" : "bg-slate-400"}`}>
                ⊙ Đối Xứng
              </button>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-700">
              <button onClick={() => setZoom((value) => Math.max(0.75, value - 0.1))} className="rounded-full border px-2 py-1">−</button>
              <span>{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom((value) => Math.min(1.25, value + 0.1))} className="rounded-full border px-2 py-1">＋</button>
            </div>
          </div>

          <div className="overflow-auto px-5 pb-8">
            <div
              ref={chartRef}
              className="relative mx-auto w-[800px] origin-top transition-transform"
              style={{ transform: `scale(${zoom})`, marginBottom: `${(zoom - 1) * 820}px` }}
            >
              <div className="relative grid grid-cols-4 border-[4px] border-[#9b4b00] bg-[#fff7dc]">
                <RelationOverlay branch={selectedBranch} showTamHop={showTamHop} showDoiXung={showDoiXung} />
                {GRID_POSITIONS.flatMap((row, rowIndex) =>
                  row.map((palaceIndex, colIndex) => {
                    if (palaceIndex === -1) {
                      if (rowIndex === 1 && colIndex === 1) {
                        return (
                          <div key="center" className="col-span-2 row-span-2 flex min-h-[376px] flex-col items-center justify-center border border-[#cf9b50] bg-[#f9dfaa] p-5 text-center">
                            <div className="mb-2 text-[14px] font-bold uppercase tracking-[0.14em] text-[#9b4b00]">Tử Vi Đẩu Số</div>
                            <div className="mb-5 h-px w-44 bg-[#c48735]" />
                            <div className="grid w-full grid-cols-2 gap-2 text-left text-sm">
                              <div className="space-y-2">
                                <p><b>Họ tên:</b> {input.fullName}</p>
                                <p><b>Năm sinh:</b> {chart.canChiYear} ({input.year})</p>
                                <p><b>Dương lịch:</b> {input.day}/{input.month}/{input.year}</p>
                                <p><b>Âm lịch:</b> {chart.lunarDate}</p>
                                <p><b>Giờ:</b> {input.hour}h{String(input.minute).padStart(2, "0")}</p>
                                <p><b>Giới tính:</b> {input.gender}</p>
                              </div>
                              <div className="space-y-2 text-right">
                                <p><b>Bản Mệnh:</b> <span className="font-bold text-red-600">{chart.menh}</span></p>
                                <p><b>Cục:</b> <span className="font-bold text-blue-700">{chart.cuc}</span></p>
                                <p><b>Sinh Mệnh:</b> {chart.menh}</p>
                                <p><b>Chủ Mệnh:</b> {chart.chuMenh}</p>
                                <p><b>Chủ Thân:</b> {chart.chuThan}</p>
                              </div>
                            </div>
                            <div className="mt-5 text-[12px] leading-5 text-[#7a4d16]">
                              Chủ về sự thông minh, sáng suốt, thay đổi linh hoạt. Nên lấy lá số như bản đồ định hướng, không xem như định mệnh cố định.
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }

                    const palace = chart.palaces[palaceIndex];
                    return (
                      <PalaceCell
                        key={palace.name}
                        palace={palace}
                        selected={palace.branch === selectedBranch}
                        related={relatedBranches.has(palace.branch)}
                        onSelect={() => {
                          setSelectedBranch(palace.branch);
                          setDetailPalace(palace);
                        }}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {detailPalace ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm" onClick={() => setDetailPalace(null)}>
          <div
            className="w-full max-w-[520px] rounded-xl border border-[#D4AF37]/35 bg-black p-6 text-white/75 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <h2 className="text-[14px] font-bold text-[#8b4513]">
                {detailPalace.name.replace(/\s+/g, " ")} <span className="text-orange-500">({PALACE_DETAILS[detailPalace.name]?.chinese || detailPalace.branch})</span>
              </h2>
              <button
                type="button"
                onClick={() => setDetailPalace(null)}
                className="rounded-full px-2 text-[14px] leading-none text-slate-500 hover:bg-slate-100"
                aria-label="Đóng"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-[14px] font-bold text-[#8b4513]">Ý Nghĩa Cung</h3>
                <p className="leading-7">{PALACE_DETAILS[detailPalace.name]?.meaning}</p>
              </div>

              <div>
                <h3 className="mb-2 text-[14px] font-bold text-[#8b4513]">Ảnh Hưởng</h3>
                <p className="leading-7">{PALACE_DETAILS[detailPalace.name]?.influence}</p>
              </div>

              <div>
                <h3 className="mb-3 text-[14px] font-bold text-[#8b4513]">Sao Phụ (Phụ Tinh)</h3>
                <div className="flex flex-wrap gap-2">
                  {[...detailPalace.leftStars, ...detailPalace.rightStars].map((star) => (
                    <span key={`${detailPalace.name}-modal-${star.name}`} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
                      {star.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-violet-100 pt-6 text-center">
                <h3 className="mb-5 text-[14px] font-bold text-violet-700">✦ Luận Giải Chi Tiết (AI)</h3>
                {palaceAnalyses[detailPalace.name] ? (
                  <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-4">
                    <AnalysisText content={palaceAnalyses[detailPalace.name]} />
                  </div>
                ) : (
                  <>
                    <p className="mb-5 text-sm text-slate-500">Nhận phân tích chuyên sâu về cung {detailPalace.name.toLowerCase()} từ AI Master</p>
                    {analysisError ? <p className="mb-3 text-sm font-semibold text-red-600">{analysisError}</p> : null}
                    <button
                      type="button"
                      disabled={analyzingPalace === detailPalace.name}
                      className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-[13px] font-bold text-white shadow-lg hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
                      onClick={() => handleAnalyzePalace(detailPalace)}
                    >
                      {analyzingPalace === detailPalace.name ? "Đang phân tích..." : "✦ Luận giải ngay"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
