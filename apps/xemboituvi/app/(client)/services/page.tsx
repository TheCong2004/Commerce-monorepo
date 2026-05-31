"use client";


import { Navbar } from "@/components/ui/client";
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
    // TODO: Gửi dữ liệu lên server hoặc xử lý đặt lịch
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center py-10 px-4">
        <div className="pt-16">
            <Navbar/>
            </div>
      <div className="w-full max-w-lg bg-[#FFFFFF] rounded-2xl shadow-lg border border-[#D4AF37] p-8">
        <h1 className="text-3xl font-bold text-[#8B4513] mb-6 text-center font-sans">Đặt lịch tư vấn dịch vụ</h1>
        {success ? (
          <div className="text-center text-[#8B4513] font-semibold text-lg py-8">
            Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận qua số điện thoại của bạn.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#5C4033] font-medium mb-1 font-sans">Họ và tên</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full border border-[#D4AF37] rounded px-4 py-2 font-sans" placeholder="Nhập họ tên" />
            </div>
            <div>
              <label className="block text-[#5C4033] font-medium mb-1 font-sans">Số điện thoại</label>
              <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-[#D4AF37] rounded px-4 py-2 font-sans" placeholder="Nhập số điện thoại" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[#5C4033] font-medium mb-1 font-sans">Ngày tư vấn</label>
                <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full border border-[#D4AF37] rounded px-4 py-2 font-sans" />
              </div>
              <div className="flex-1">
                <label className="block text-[#5C4033] font-medium mb-1 font-sans">Giờ tư vấn</label>
                <input type="time" required value={time} onChange={e => setTime(e.target.value)} className="w-full border border-[#D4AF37] rounded px-4 py-2 font-sans" />
              </div>
            </div>
            <div>
              <label className="block text-[#5C4033] font-medium mb-1 font-sans">Ghi chú (tuỳ chọn)</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} className="w-full border border-[#D4AF37] rounded px-4 py-2 font-sans" rows={3} placeholder="Ghi chú thêm nếu có" />
            </div>
            <button type="submit" className="w-full bg-[#8B4513] text-white font-bold py-3 rounded-lg font-sans hover:bg-[#5C4033] transition">Đặt lịch tư vấn</button>
          </form>
        )}
      </div>
    </div>
  );
}
