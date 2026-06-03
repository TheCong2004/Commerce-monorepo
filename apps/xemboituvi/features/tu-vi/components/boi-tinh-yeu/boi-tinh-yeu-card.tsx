"use client";

import { ReactNode, useState } from "react";
import { ArrowLeft, Heart, RotateCcw, User, Users } from "lucide-react";
import { MysticDarkPanel } from "@/components/ui/client/mystic-page-shell";
import { calculateLoveScore } from "../../services/love-logic";

type View = "menu" | "single" | "couple" | "result";

export default function BoiTinhYeuCard() {
  const [view, setView] = useState<View>("menu");
  const [singleName, setSingleName] = useState("");
  const [singleDate, setSingleDate] = useState("");
  const [name1, setName1] = useState("");
  const [date1, setDate1] = useState("");
  const [name2, setName2] = useState("");
  const [date2, setDate2] = useState("");
  const [loveResult, setLoveResult] = useState({ score: 0, message: "" });

  const calculateSingle = () => {
    setLoveResult(calculateLoveScore(singleName, singleDate));
    setView("result");
  };

  const calculateCouple = () => {
    setLoveResult(calculateLoveScore(name1, date1, name2, date2));
    setView("result");
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-4">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/15 text-[#D4AF37]">
          <Heart size={18} />
        </div>
        <h1 className="papyrus text-[20px] font-semibold uppercase tracking-[0.12em] text-[#FFD700] md:text-[24px]">Bói tình yêu</h1>
        <p className="mx-auto mt-3 max-w-xl text-[13px] leading-6 text-white/68">Chọn kiểu tra cứu và nhập thông tin cơ bản để xem gợi ý tình cảm.</p>
      </div>

      {view === "menu" && (
        <div className="grid gap-4 md:grid-cols-2">
          <ModeButton icon={<User size={18} />} title="Độc thân" desc="Xem vận đào hoa cá nhân" onClick={() => setView("single")} />
          <ModeButton icon={<Users size={18} />} title="Có đôi" desc="Xem mức độ hòa hợp" onClick={() => setView("couple")} />
        </div>
      )}

      {view === "single" && (
        <MysticDarkPanel className="bg-black/38 p-5 md:p-6">
          <BackButton onClick={() => setView("menu")} label="Độc thân" />
          <div className="mt-5 grid gap-4">
            <TextInput label="Tên của bạn" value={singleName} onChange={setSingleName} />
            <DateInput label="Ngày sinh" value={singleDate} onChange={setSingleDate} />
            <PrimaryButton onClick={calculateSingle}>Xem kết quả</PrimaryButton>
          </div>
        </MysticDarkPanel>
      )}

      {view === "couple" && (
        <MysticDarkPanel className="bg-black/38 p-5 md:p-6">
          <BackButton onClick={() => setView("menu")} label="Có đôi" />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <TextInput label="Tên của bạn" value={name1} onChange={setName1} />
              <DateInput label="Ngày sinh của bạn" value={date1} onChange={setDate1} />
            </div>
            <div className="space-y-4">
              <TextInput label="Tên người ấy" value={name2} onChange={setName2} />
              <DateInput label="Ngày sinh người ấy" value={date2} onChange={setDate2} />
            </div>
            <div className="md:col-span-2">
              <PrimaryButton onClick={calculateCouple}>Xem độ hòa hợp</PrimaryButton>
            </div>
          </div>
        </MysticDarkPanel>
      )}

      {view === "result" && (
        <MysticDarkPanel className="p-6 text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">Kết quả tham khảo</p>
          <div className="my-4 text-[14px] font-bold uppercase tracking-[0.12em] text-[#F3E3BC]">{loveResult.score}% tương hợp</div>
          <p className="mx-auto max-w-xl text-[13px] leading-6 text-white/68">{loveResult.message}</p>
          <button
            onClick={() => setView("menu")}
            className="mx-auto mt-5 flex h-10 items-center justify-center gap-2 rounded-lg border border-[#D4AF37]/35 px-4 text-[13px] font-bold uppercase tracking-[0.12em] text-[#F3E3BC] transition hover:bg-[#D4AF37] hover:text-black"
          >
            <RotateCcw size={15} /> Làm lại
          </button>
        </MysticDarkPanel>
      )}
    </section>
  );
}

function ModeButton({ icon, title, desc, onClick }: { icon: ReactNode; title: string; desc: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="block text-left">
      <MysticDarkPanel className="h-full bg-black/38 p-5 transition hover:border-[#D4AF37]/70">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/12 text-[#8B5A1B]">{icon}</div>
        <h2 className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#F3E3BC]">{title}</h2>
        <p className="mt-2 text-[13px] leading-6 text-white/65">{desc}</p>
      </MysticDarkPanel>
    </button>
  );
}

function BackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#8B5A1B]">
      <ArrowLeft size={15} /> {label}
    </button>
  );
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block space-y-2">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8B5A1B]">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full rounded-lg border border-[#D4AF37]/30 bg-black/45 px-3 text-[14px] font-semibold text-white outline-none focus:border-[#D4AF37]" />
    </label>
  );
}

function DateInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block space-y-2">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8B5A1B]">{label}</span>
      <input type="date" value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full rounded-lg border border-[#D4AF37]/30 bg-black/45 px-3 text-[14px] font-semibold text-white outline-none focus:border-[#D4AF37]" />
    </label>
  );
}

function PrimaryButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="h-11 w-full rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37] text-[13px] font-bold uppercase tracking-[0.14em] text-black transition hover:bg-[#F3E3BC]">
      {children}
    </button>
  );
}
