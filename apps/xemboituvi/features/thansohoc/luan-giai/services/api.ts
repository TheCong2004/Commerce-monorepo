// services/api.ts

const API_BASE = process.env.NEXT_PUBLIC_STRAPI_API as string;

// Định nghĩa headers chung
const getHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
});

/**
 * Hàm lấy nội dung luận giải Năm Cá Nhân từ Strapi
 * @param number Số năm cá nhân (1-9)
 * @returns HTML string nội dung bài viết
 */
export async function fetchPersonalYearContent(number: number): Promise<string> {
  // 1. Endpoint của bảng Năm cá nhân trong Strapi
  // Giả sử tên collection trong Strapi là 'personal-years'
  // Filter theo trường 'year_number' (hoặc tên trường bạn đặt trong Strapi)
  const url = `${API_BASE.replace(/\/$/, '')}/api/personal-years?filters[year_number][$eq]=${number}`;

  try {
    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 3600 }, // Cache 1 tiếng
    });

    if (!res.ok) {
      console.error(`Lỗi fetch Strapi: ${res.status}`);
      return fallbackContent(number); // Trả về nội dung mặc định nếu lỗi
    }

    const data = await res.json();
    
    // 2. Lấy nội dung HTML từ response
    // Giả sử Strapi trả về mảng data, lấy phần tử đầu tiên
    const item = data.data && data.data[0];
    
    if (item && item.content) { // Strapi v5 có thể là item.attributes.content hoặc item.content tùy config
      return item.content; // Hoặc item.attributes.content
    }

    // Nếu không tìm thấy bài viết nào cho số này
    return fallbackContent(number);

  } catch (err) {
    console.error('🚨 fetchPersonalYearContent error:', err);
    return fallbackContent(number);
  }
}

// Hàm trả về nội dung dự phòng (trong lúc chưa nhập liệu hoặc lỗi mạng)
function fallbackContent(number: number) {
  return `
    <div class="p-4 border border-indigo-100 rounded bg-white/50">
      <h4 class="font-bold text-indigo-700">Năm Cá Nhân Số ${number}</h4>
      <p class="text-gray-600 mt-2">
        (Nội dung chi tiết cho năm số ${number} đang được cập nhật từ hệ thống quản trị. 
        Vui lòng quay lại sau.)
      </p>
    </div>
  `;
}