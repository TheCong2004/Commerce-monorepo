"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useMemo, useState } from "react";
import StarBackground from "@/components/ui/animated-background";

import {
  calcLifePath, calcExpression, calcSoulUrge, calcPersonality, 
  calcAttitude, calcBirthdayNumber, reduceNumber
} from "@/features/thansohoc/utils/numerologyresult";

import HeaderInfo from "@/features/thansohoc/thansohocpage/result/HeaderInfo";
import LifePathCircle from "@/features/thansohoc/thansohocpage/result/LifePathCircle";
import StatGrid from "@/features/thansohoc/thansohocpage/result/StatGrid";
import PersonalYearChart from "@/features/thansohoc/thansohocpage/result/PersonalYearChart";
import MeaningContent from "@/features/thansohoc/thansohocpage/result/MeaningContent";
import { usePersonalYearCycle } from "@/features/thansohoc/utils/bieudo";

// Import Sidebar và Data mục lục
import ReportSidebar from "@/features/thansohoc/luan-giai/container/ReportSidebar";
import { REPORT_DATA } from "@/features/thansohoc/luan-giai/report/data";

function ResultContent({ onUnlockChange }: { onUnlockChange: (val: boolean) => void }) {
  const searchParams = useSearchParams();
  const fullName = searchParams.get("fullName") || searchParams.get("name");
  const nickname = searchParams.get("nickname");
  const gender = searchParams.get("gender");
  const dob = searchParams.get("dob");

  const chartData = usePersonalYearCycle(dob);

  const stats = useMemo(() => {
    if (!fullName || !dob) return null;

    const lifePath = calcLifePath(dob);
    const expression = calcExpression(fullName);

    return {
      lifePath,
      expression,
      soul: calcSoulUrge(fullName),
      personality: calcPersonality(fullName),
      attitude: calcAttitude(dob),
      maturity: reduceNumber(lifePath + expression),
      rational: reduceNumber(calcBirthdayNumber(dob) + calcExpression(fullName.split(" ")[0])),
    };
  }, [fullName, dob]);

  if (!stats || !fullName || !dob) {
    return <div className="text-white text-center pt-20 relative z-10">Thiếu thông tin tra cứu</div>;
  }

  return (
    <div className="pt-16 md:pt-20 pb-24 animate-in fade-in zoom-in duration-700 max-w-5xl mx-auto relative z-10">
      <HeaderInfo fullName={fullName} nickname={nickname} dob={dob} gender={gender} />
      
      <LifePathCircle>
        {stats.lifePath}
      </LifePathCircle>
      
      <StatGrid stats={stats} />
      <div className="mt-12 px-4">
        <PersonalYearChart data={chartData} />

        <MeaningContent 
          lifePath={stats.lifePath} 
          dob={dob} 
          fullName={fullName} 
          onUnlock={() => onUnlockChange(true)} // Gọi hàm mở Sidebar từ cha
        />
      </div>
    </div>
  );
}

export default function NumerologyResultPage() {
  const [isUnlocked, setIsUnlocked] = useState(false); // Trạng thái mở khóa báo cáo
  const [showSidebar, setShowSidebar] = useState(false); // Trạng thái đóng/mở sidebar mục lục

  return (
    <div className="min-h-screen w-full bg-[#0f0c29] text-white font-sans relative overflow-x-hidden flex">
      {/* Background lớp nền */}
      <div className="fixed inset-0 z-0">
        <StarBackground />
      </div>
      <div className="fixed inset-0 pt-20 z-0 bg-gradient-to-t from-[#0f0c29] via-[#1e1b4b]/20 to-[#0f0c29]/80 pointer-events-none" />

      {/* --- SIDEBAR MỤC LỤC (Bên phải) --- */}
      {isUnlocked && (
        <>
          {/* Nút Mục Lục (Floating Button) */}
<button 
  onClick={() => setShowSidebar(!showSidebar)}
  className="
    fixed bottom-6 right-6 z-[110]
    px-4 py-3
    bg-gradient-to-br from-indigo-500 to-indigo-700
    text-white text-sm font-semibold uppercase tracking-wider
    rounded-full
    shadow-[0_10px_30px_rgba(79,70,229,0.45)]
    transition-all duration-300 ease-out
    hover:scale-110 hover:shadow-[0_15px_40px_rgba(99,102,241,0.6)]
    hover:from-indigo-400 hover:to-indigo-600
    active:scale-95
    group
  "
>
  <span className="relative z-10">Mục lục</span>

  {/* Glow khi hover */}
  <span className="
    absolute inset-0 rounded-full
    bg-indigo-400/30 blur-xl
    opacity-0 group-hover:opacity-100
    transition-opacity duration-300
  " />
</button>

          {/* Sidebar Panel */}
          <aside 
            className={`fixed right-0 top-0 bottom-0 z-[100] w-72 md:w-80 bg-[#0f0c29]/90 backdrop-blur-xl border-l border-white/10 transition-transform duration-500 ease-in-out shadow-2xl ${
              showSidebar ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full pt-20 px-4 overflow-y-auto custom-scrollbar">
              <ReportSidebar sections={REPORT_DATA} />
            </div>
          </aside>
        </>
      )}

      {/* --- NỘI DUNG CHÍNH --- */}
      <main className={`flex-1 relative z-10 transition-all duration-500 ${isUnlocked && showSidebar ? "lg:mr-80" : ""}`}>
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center relative z-10"><div className="h-6 w-6 animate-spin rounded-full border-2 border-[#ffd700]/30 border-t-[#ffd700]" /></div>}>
          <ResultContent onUnlockChange={(val) => {
            setIsUnlocked(val);
            setShowSidebar(val); // Tự động hiện sidebar khi vừa mở khóa
          }} />
        </Suspense>
      </main>
    </div>
  );
}