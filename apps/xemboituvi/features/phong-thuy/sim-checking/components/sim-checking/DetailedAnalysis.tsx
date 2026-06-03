"use client";

import React from "react";

export default function DetailedAnalysis({ result }: { result: any }) {
  if (!result || !result.detail) return null;

  const { totalScore, nguHanh, detail } = result;

  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-lg border border-[#D4AF37]/35 bg-black/45 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-[#D4AF37]/75 md:p-6">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-[#D4AF37]">Ngũ hành & âm dương</p>
        <h3 className="mt-2 text-[14px] font-bold uppercase tracking-wide text-[#F3E3BC]">Kết luận dễ hiểu</h3>
        <div className="mt-4 space-y-3">
          <ReadableBlock
            title="Bản mệnh"
            text={`Bạn đang được tính theo mệnh ${nguHanh || "chưa xác định"}. Sim có điểm ${totalScore}/10, ${totalScore >= 7 ? "khá phù hợp để dùng lâu dài" : "nên cân nhắc thêm trước khi chọn"}.`}
          />
          <ReadableBlock
            title="Âm dương"
            text={`Tỷ lệ âm/dương là ${result.even ?? "-"} / ${result.odd ?? "-"}, trạng thái ${result.amDuongStatus || "chưa rõ"}. Cân bằng hơn thì dễ tạo cảm giác ổn định hơn.`}
          />
          <ReadableBlock
            title="Tổng nút"
            text={`Tổng nút đạt ${result.tongNut || "-"}/10. Từ 7 điểm trở lên thường dễ nhớ và được xem là đẹp hơn.`}
          />
        </div>
      </div>

      <div className="rounded-lg border border-[#D4AF37]/35 bg-black/45 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-[#D4AF37]/75 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-wide text-[#D4AF37]">Quẻ Kinh Dịch</p>
            <h3 className="mt-2 text-[14px] font-bold uppercase tracking-wide text-[#F3E3BC]">{detail.tenQue}</h3>
            <p className="mt-1 text-[13px] text-white/50">{detail.hanTu}</p>
          </div>
          <span className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-1 text-[13px] font-semibold text-[#D4AF37]">
            {detail.loaiQue}
          </span>
        </div>

        <div className="mt-4 rounded-lg border border-[#D4AF37]/25 bg-black/35 p-4">
          <p className="text-[13px] font-semibold text-[#F3E3BC]">Ý nghĩa</p>
          <p className="mt-2 text-[13px] leading-6 text-white/70">{detail.yNghia}</p>
        </div>

        <div className="mt-3 rounded-lg border border-[#D4AF37]/25 bg-black/35 p-4">
          <p className="text-[13px] font-semibold text-[#F3E3BC]">Lời khuyên</p>
          <p className="mt-2 text-[13px] leading-6 text-white/70">{detail.loiKhuyen}</p>
        </div>
      </div>
    </section>
  );
}

function ReadableBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-[#D4AF37]/25 bg-black/35 p-4">
      <p className="text-[13px] font-semibold text-[#F3E3BC]">{title}</p>
      <p className="mt-1 text-[13px] leading-6 text-white/65">{text}</p>
    </div>
  );
}
