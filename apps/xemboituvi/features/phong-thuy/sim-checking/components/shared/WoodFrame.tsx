interface WoodFrameProps {
  title: React.ReactNode; 
  children: React.ReactNode;
}

export default function WoodFrame({ children, title }: WoodFrameProps) {
  return (
    <div className="relative  p-1 bg-gradient-to-b from-[#8b0000] to-[#5d0000] rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.2)] border-b-4 border-[#3d0000]">
      {/* Lớp nền giấy ngà bên trong */}
      <div className="bg-[#fdfbf7] rounded-xl p-6 border-2 border-[#d4af37]/30 relative overflow-hidden">
        
        {/* Họa tiết góc chìm tạo cảm giác cổ điển */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/20 rounded-tl-lg pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/20 rounded-br-lg pointer-events-none"></div>

        {title && (
          <div className="mb-6  flex items-center justify-center gap-4 border-b border-[#d4af37]/20 pb-4">
            {/* Biểu tượng hoa văn 2 bên tiêu đề */}
            <span className="text-[#d4af37] opacity-60">❧</span>
            <h4 className="font-semibold papyrus text-[#8b0000] uppercase tracking-[0.2em] text-center text-base md:text-lg drop-shadow-sm">
              {title}
            </h4>
            <span className="text-[#d4af37] opacity-60 rotate-180">❧</span>
          </div>
        )}

        {/* Nội dung bên trong bọc font-sans để dễ đọc */}
        <div className="relative z-10 font-sans leading-relaxed text-base">
          {children}
        </div>
      </div>
    </div>
  );
}