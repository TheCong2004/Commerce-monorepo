
import React from 'react';
import { Navbar } from '@/components/ui/client';
import XemNgayMasterLayout from '@/features/xem-ngay/templates/XemNgayMasterLayout';

export default function XemNgayTotXauPage() {
  return (
    <>
      {/* Thiết lập nền màu giấy ngà (#fdfbf7) và viền nâu đậm phía trên tạo cảm giác trang trọng, cổ điển. */}
      <div className="min-h-screen w-full bg-[#fdfbf7] border-t-4 border-[#8b4513]">
        {/* Gọi Template dùng chung và truyền loại hình cần xem */}
        <XemNgayMasterLayout type="tot-xau" />
      </div>
    </>
  );
}