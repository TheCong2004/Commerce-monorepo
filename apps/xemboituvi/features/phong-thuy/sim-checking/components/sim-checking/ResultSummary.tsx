export default function ResultSummary({ result }: { result: any }) {
  const status =
    result.totalScore >= 8
      ? { label: "Rất hợp", className: "text-emerald-300 bg-emerald-400/10 border-emerald-300/20" }
      : result.totalScore >= 5
      ? { label: "Có thể dùng", className: "text-[#F4C76B] bg-[#F4C76B]/10 border-[#F4C76B]/20" }
      : { label: "Nên cân nhắc", className: "text-red-300 bg-red-400/10 border-red-300/20" };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-5 text-center">
          <p className="text-[13px] font-semibold text-white/55">Điểm tổng</p>
          <div className="mt-2 text-[56px] font-bold leading-none text-[#F4C76B]">{result.totalScore}</div>
          <p className="mt-1 text-[14px] font-semibold text-white">/ 10 điểm</p>
          <div className={`mt-4 inline-flex rounded-full border px-3 py-1 text-[13px] font-semibold ${status.className}`}>
            {status.label}
          </div>
        </div>

        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-[#F4C76B]">Tổng quan</p>
          <h2 className="mt-2 text-[20px] font-bold text-white">Số sim {result.sim || "đã nhập"} có hợp không?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Metric label="Ngũ hành" value={result.nguHanh || "-"} />
            <Metric label="Tổng nút" value={`${result.tongNut || "-"}/10`} />
            <Metric label="Âm / Dương" value={`${result.even ?? "-"} / ${result.odd ?? "-"}`} />
          </div>
          <div className="mt-4 space-y-2">
            {result.analysis.map((line: string, index: number) => (
              <div key={index} className="rounded-xl border border-white/10 bg-[#0B1020] p-3 text-[14px] leading-6 text-white/70">
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
    <div className="rounded-xl border border-white/10 bg-[#0B1020] p-3">
      <p className="text-[13px] text-white/50">{label}</p>
      <p className="mt-1 text-[15px] font-semibold text-white">{value}</p>
    </div>
  );
}
