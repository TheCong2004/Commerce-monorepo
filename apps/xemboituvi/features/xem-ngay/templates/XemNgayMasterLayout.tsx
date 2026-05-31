"use client";

import React, { useState, useEffect } from 'react';
import ZodiacBar from '../components/ZodiacBar';
import CalendarWidget from '../components/CalendarWidget';
import PatternHeader from '../components/PatternHeader';
import MonthlyComparison from '../components/MonthlyComparison';
import DateSearchCard from '../components/DateSearchCard';
import { XemNgayType, resolveDayLogic, getPageTitle, getSearchCardInfo } from '../utils/logic-resolver';
import { DayDetail } from '../utils/types';
import { fetchDayArticle } from '../services/api';
import FortuneHub from '@/features/home/container/fortune-hub';
import MysticStars from '../components/MysticStars'; // Đảm bảo đúng đường dẫn
import FadeIn from '@/components/ui/FadeIn';

interface Props {
  type: XemNgayType;
  initialDate?: { d: string, m: string, y: string };
}

export default function XemNgayMasterLayout({ type, initialDate }: Props) {
  const [result, setResult] = useState<DayDetail | null>(null);
  const [loading, setLoading] = useState(false);
  
  const pageTitle = getPageTitle(type);
  const searchInfo = getSearchCardInfo(type);

  const handleSearch = async (d: string, m: string, y: string) => {
    setLoading(true);
    try {
      const localData = resolveDayLogic(type, d, m, y);
      const strapiContent = await fetchDayArticle(type, `${d}/${m}/${y}`);
      setResult({ ...localData, content: strapiContent });
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialDate) {
      handleSearch(initialDate.d, initialDate.m, initialDate.y);
    } else {
      const today = new Date();
      handleSearch(today.getDate().toString(), (today.getMonth() + 1).toString(), today.getFullYear().toString());
    }
  }, [type, initialDate]);

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] font-sans text-[#e5e5e5] selection:bg-amber-500/30 selection:text-amber-200 ">
      
      <MysticStars /> 
      
      {/* ZodiacBar hiện ngay lập tức hoặc trượt nhẹ từ trên xuống */}
      <div className="relative z-10 max-full mx-auto pt-14">
        <ZodiacBar />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* 1. Header hiện ra đầu tiên */}
        <FadeIn direction="down">
          <PatternHeader title={`${pageTitle.toUpperCase()} 2025 - CHỌN GIỜ ĐẠI CÁT`} />
        </FadeIn>

        {/* 2. Khu vực tìm kiếm hiện sau Header một chút */}
        <div className="relative mt-12">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
           <FadeIn direction="up" delay={0.2}>
             <DateSearchCard 
                type={type} 
                title={searchInfo.title} 
                subTitle={searchInfo.subTitle} 
             />
           </FadeIn>
        </div>

        {/* 3. Lịch vạn niên hiện lên khi cuộn tới */}
        <div className="mt-16">
            <FadeIn direction="up">
              <CalendarWidget />
            </FadeIn>
        </div>

        {/* 4. Bảng so sánh tháng */}
        <div className="mt-24">
            <FadeIn direction="up">
              <PatternHeader title={`DANH SÁCH NGÀY TỐT - XẤU TRONG THÁNG`} />
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <MonthlyComparison type={type} />
            </FadeIn>
        </div>

        {/* 5. Các thẻ bổ trợ phía dưới cùng */}
        <div className="mt-20 opacity-90 grayscale-[0.3] hover:grayscale-0 transition-all duration-500">
          <FadeIn direction="up" delay={0.2}>
            <FortuneHub onlyTitle="Xem Ngày Tốt" />
          </FadeIn>
        </div>

      </div>
    </main>
  );
}