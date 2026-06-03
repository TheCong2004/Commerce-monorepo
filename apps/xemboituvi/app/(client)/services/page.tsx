"use client";

import {
  MysticDarkPanel,
  MysticGoldFrame,
  MysticPageShell,
} from "@/components/ui/client/mystic-page-shell";
import { CalendarDays, Clock, Phone, UserRound } from "lucide-react";
import React, { useState } from "react";

export default function ServicesBookingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  const inputClass =
    "w-full rounded-lg border border-[#D4AF37]/35 bg-black/45 px-3 py-3 text-[14px] text-[#F4EFE4] outline-none transition placeholder:text-white/35 focus:border-[#D4AF37] focus:bg-black/60";
  const labelClass = "mb-1.5 flex items-center gap-2 text-[13px] font-semibold text-[#D4AF37]";

  return (
    <MysticPageShell contentClassName="mx-auto max-w-3xl px-4 pb-20 pt-24">
      <MysticDarkPanel className="mb-5 px-5 py-4 text-center">
        <h1 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
          Đặt lịch tư vấn dịch vụ
        </h1>
        <p className="mt-2 text-[13px] leading-relaxed text-white/70">
          Điền thông tin ngắn gọn, đội ngũ sẽ liên hệ xác nhận lịch phù hợp.
        </p>
      </MysticDarkPanel>

      <MysticGoldFrame className="p-5 md:p-6">
        {success ? (
          <div className="py-8 text-center">
            <p className="text-[14px] font-semibold text-[#F3E3BC]">Đặt lịch thành công.</p>
            <p className="mt-2 text-[13px] leading-relaxed text-white/68">
              Chúng tôi sẽ liên hệ xác nhận qua số điện thoại của bạn.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className={labelClass}>
                <UserRound size={14} /> Họ và tên
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Nhập họ tên"
              />
            </label>

            <label className="block">
              <span className={labelClass}>
                <Phone size={14} /> Số điện thoại
              </span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="Nhập số điện thoại"
              />
            </label>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block">
                <span className={labelClass}>
                  <CalendarDays size={14} /> Ngày tư vấn
                </span>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>
                  <Clock size={14} /> Giờ tư vấn
                </span>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>

            <label className="block">
              <span className={labelClass}>Ghi chú</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={inputClass}
                rows={3}
                placeholder="Ghi chú thêm nếu có"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#D4AF37] px-5 py-3 text-[14px] font-semibold text-[#1B140E] transition hover:bg-[#F2D26B]"
            >
              Đặt lịch tư vấn
            </button>
          </form>
        )}
      </MysticGoldFrame>
    </MysticPageShell>
  );
}
