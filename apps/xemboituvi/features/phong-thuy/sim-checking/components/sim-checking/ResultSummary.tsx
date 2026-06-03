export default function ResultSummary({ result }: { result: any }) {
  const status =
    result.totalScore >= 8
      ? { label: "Rất hợp", className: "text-emerald-300 bg-emerald-400/10 border-emerald-300/20" }
      : result.totalScore >= 5
      ? { label: "Có thể dùng", className: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/25" }
      : { label: "Nên cân nhắc", className: "text-red-300 bg-red-400/10 border-red-300/20" };

  return (
    <section className="rounded-lg border border-[#D4AF37]/35 bg-black/45 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-[#D4AF37]/75 md:p-6">
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <div className="rounded-lg border border-[#D4AF37]/25 bg-black/35 p-5 text-center">
          <p className="text-[13px] font-semibold text-white/55">Điểm tổng</p>
          <div className="mt-2 text-[36px] font-bold leading-none text-[#D4AF37]">{result.totalScore}</div>
          <p className="mt-1 text-[13px] font-semibold text-white">/ 10 điểm</p>
          <div className={`mt-4 inline-flex rounded-full border px-3 py-1 text-[13px] font-semibold ${status.className}`}>
            {status.label}
          </div>
        </div>

        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-[#D4AF37]">Tổng quan</p>
          <h2 className="mt-2 text-[14px] font-bold uppercase tracking-wide text-[#F3E3BC]">
            Số sim {result.sim || "đã nhập"} có hợp không?
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Metric label="Ngũ hành" value={result.nguHanh || "-"} />
            <Metric label="Tổng nút" value={`${result.tongNut || "-"}/10`} />
            <Metric label="Âm / Dương" value={`${result.even ?? "-"} / ${result.odd ?? "-"}`} />
          </div>
          <div className="mt-4 space-y-2">
            {result.analysis.map((line: string, index: number) => (
              <div key={index} className="rounded-lg border border-[#D4AF37]/25 bg-black/35 p-3 text-[13px] leading-6 text-white/70">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#D4AF37]/25 bg-black/35 p-3">
      <p className="text-[13px] text-white/50">{label}</p>
      <p className="mt-1 text-[13px] font-semibold text-white">{value}</p>
    </div>
  );
}
