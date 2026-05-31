"use client";

import React from 'react';
import { Lock } from "lucide-react"; // Dùng icon khóa để chuyên nghiệp hơn

export default function CareerGroup({ items }: { items: any[] }) {
  return (
    <div className="space-y-6">
      {/* 1. Phần text giới thiệu quy trình (giống ảnh mẫu) */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm leading-relaxed text-gray-700 mb-8">
        <p className="mb-3">Việc xác định nhóm ngành được tiến hành thông qua 2 bước:</p>
        <p className="mb-2"><strong>Bước 1:</strong> Xác định điểm mạnh, điểm yếu, đặc trưng trong tính cách cũng như khao khát sâu thẳm bên trong bạn thông qua 3 chỉ số chính: chỉ số đường đời, chỉ số sứ mệnh, chỉ số linh hồn.</p>
        <p><strong>Bước 2:</strong> Sau đó dựa vào nhóm tính cách bản ngã để tìm kiếm những nghề cụ thể phù hợp với những đặc điểm của bạn thông qua hàng loạt các phân tích mối tương quan của từng nghề trong "Danh mục nghề nghiệp Việt Nam" với 3 chỉ số chính...</p>
      </div>

      {/* 2. Danh sách các thanh tỉ lệ */}
      <div className="space-y-4">
        {items.map((subItem) => {
          const isLocked = subItem.is_vip;
          const percentage = parseFloat(subItem.content) || 0;

          return (
            <div key={subItem.index} className="space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-800 text-sm">
                  {subItem.title}
                </h4>
                {isLocked && <Lock className="w-3 h-3 text-red-500" />}
              </div>

              {isLocked ? (
                /* Trạng thái khóa VIP */
                <div className="flex items-center gap-1 text-red-500 font-bold text-sm">
                  <span className="text-lg">🔒</span> %
                </div>
              ) : (
                /* Thanh progress màu xanh dương */
                <div className="w-full max-w-lg bg-gray-100 rounded-sm h-7 relative overflow-hidden border border-gray-200">
                  <div 
                    className="h-full bg-[#0066cc] flex items-center justify-center text-white text-[11px] font-bold transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                  >
                    {percentage}%
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Thông báo nâng cấp phía dưới */}
      <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
        <p className="text-red-500 text-sm italic font-medium">
          Bạn cần nâng cấp Vip để xem tỉ lệ các nhóm ngành phù hợp và hướng dẫn chi tiết của mục này!
        </p>
      </div>
    </div>
  );
}