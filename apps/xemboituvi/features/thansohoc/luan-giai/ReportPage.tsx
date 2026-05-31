import React, { Suspense } from 'react';
import { Loader2 } from "lucide-react";
import ReportList from '@/features/thansohoc/luan-giai/ReportList';
import FadeIn from '@/components/ui/FadeIn';
import { REPORT_DATA } from './report/data';
import ReportSidebar from './container/ReportSidebar';

export default function ReportPage() {
  // Tìm dữ liệu phần A để trích xuất các mục con
  const sectionA = REPORT_DATA.find(s => s.section_id === "A");

  return (
    <div className="min-h-screen w-full relative">
      <div className="relative z-10">
        <Suspense fallback={
          <div className="flex h-screen items-center justify-center text-white">
            <Loader2 className="animate-spin mr-2 h-8 w-8 text-indigo-400" />
            <span className="text-indigo-200">Đang khởi tạo dữ liệu...</span>
          </div>
        }>

          <FadeIn direction="up">
            <ReportList />
          </FadeIn>
        </Suspense>
        
      </div>
    </div>
  );
}