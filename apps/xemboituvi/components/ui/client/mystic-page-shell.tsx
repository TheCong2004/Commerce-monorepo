"use client";

import type { ReactNode } from "react";

type MysticPageShellProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function MysticPageShell({
  children,
  className = "",
  contentClassName = "mx-auto max-w-6xl px-4 py-16",
}: MysticPageShellProps) {
  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-[#050505] font-sans text-[14px] text-[#F4EFE4] selection:bg-amber-500/30 selection:text-amber-100 ${className}`}
    >
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.65)_0_1px,transparent_2px),radial-gradient(circle_at_38%_32%,rgba(255,255,255,0.5)_0_1px,transparent_2px),radial-gradient(circle_at_64%_14%,rgba(255,255,255,0.55)_0_1px,transparent_2px),radial-gradient(circle_at_82%_42%,rgba(255,255,255,0.45)_0_1px,transparent_2px),radial-gradient(circle_at_24%_76%,rgba(255,255,255,0.45)_0_1px,transparent_2px),radial-gradient(circle_at_72%_82%,rgba(255,255,255,0.55)_0_1px,transparent_2px)]" />
        <div className="absolute left-1/2 top-1/2 h-[80vw] w-[80vw] max-w-[960px] -translate-x-1/2 -translate-y-1/2 opacity-[0.18]">
          <div
            className="h-full w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dzkcqktcl/image/upload/v1767168905/batquai_vod403.png')",
              filter: "drop-shadow(0 0 24px rgba(212,175,55,0.35))",
            }}
          />
        </div>
        <div className="absolute right-8 top-10 h-24 w-24 rounded-full bg-gradient-to-br from-[#fffdeb] via-[#f1d382] to-[#d4af37] shadow-[0_0_36px_rgba(212,175,55,0.35)] md:right-20 md:top-16 md:h-28 md:w-28">
          <div className="absolute -left-4 -top-1 h-full w-full rounded-full bg-[#050505]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-6 bg-[#4A3114]" />
      </div>
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </main>
  );
}

type MysticPanelProps = {
  children: ReactNode;
  className?: string;
};

export function MysticPanel({ children, className = "" }: MysticPanelProps) {
  return (
    <div
      className={`rounded-lg border border-[#D4AF37]/35 bg-white/[0.88] text-[#3B2A22] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:border-[#D4AF37]/75 hover:shadow-[0_0_24px_rgba(212,175,55,0.22),0_20px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

export function MysticDarkPanel({ children, className = "" }: MysticPanelProps) {
  return (
    <div
      className={`mystic-readable-panel rounded-lg border border-[#D4AF37]/35 bg-black/45 text-[#F4EFE4] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:border-[#D4AF37]/75 hover:bg-black/55 hover:shadow-[0_0_24px_rgba(212,175,55,0.22),0_20px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      <ReadableTextStyle />
      {children}
    </div>
  );
}

export function MysticGoldFrame({ children, className = "" }: MysticPanelProps) {
  return (
    <div
      className={`mystic-readable-panel group relative rounded-lg border border-[#D4AF37]/35 bg-black/45 text-[#F4EFE4] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:border-[#D4AF37]/80 hover:bg-black/55 hover:shadow-[0_0_28px_rgba(212,175,55,0.24),0_20px_60px_rgba(0,0,0,0.35)] ${className}`}
    >
      <ReadableTextStyle />
      <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-[#D4AF37]/35 transition group-hover:bg-[#D4AF37]/70" />
      <div className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-[#D4AF37]/20 transition group-hover:bg-[#D4AF37]/55" />
      <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 rounded-tl-sm border-l border-t border-[#D4AF37]/35 transition group-hover:border-[#D4AF37]/75" />
      <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 rounded-tr-sm border-r border-t border-[#D4AF37]/35 transition group-hover:border-[#D4AF37]/75" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 rounded-bl-sm border-b border-l border-[#D4AF37]/25 transition group-hover:border-[#D4AF37]/65" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 rounded-br-sm border-b border-r border-[#D4AF37]/25 transition group-hover:border-[#D4AF37]/65" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ReadableTextStyle() {
  return (
    <style jsx global>{`
      .mystic-readable-panel [class*="text-white/"] {
        color: rgba(255, 255, 255, 0.9) !important;
      }

      .mystic-readable-panel [class*="text-[#D4AF37]/"] {
        color: rgba(212, 175, 55, 0.92) !important;
      }

      .mystic-readable-panel [class*="text-[#F3E3BC]/"] {
        color: rgba(243, 227, 188, 0.94) !important;
      }

      .mystic-readable-panel [class*="placeholder:text-white/"]::placeholder {
        color: rgba(255, 255, 255, 0.62) !important;
      }
    `}</style>
  );
}
