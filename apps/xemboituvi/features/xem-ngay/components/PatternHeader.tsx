"use client";

export default function PatternHeader({ title }: { title: string }) {
  return (
    <div className="mx-auto my-5 w-full max-w-6xl px-4">
      <div className="relative overflow-hidden rounded-lg border border-[#D4AF37]/35 bg-black/65 px-4 py-3 text-center shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[#D4AF37]/40" />
        <h2 className="text-[13px] font-bold uppercase leading-6 tracking-[0.14em] text-[#F3E3BC] md:text-[14px]">
          {title}
        </h2>
      </div>
    </div>
  );
}
