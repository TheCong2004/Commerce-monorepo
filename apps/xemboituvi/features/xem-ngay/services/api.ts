export async function fetchDayArticle(type: string, date: string): Promise<string> {
  const API_BASE = process.env.NEXT_PUBLIC_STRAPI_API;
  
  // Chuyển dd/mm/yyyy thành dd-mm-yyyy để khớp với Slug Strapi
  const formattedDate = date.replaceAll('/', '-');
  const slug = `${type}-${formattedDate}`; // Kết quả: tot-xau-29-12-2025

  const url = `${API_BASE}/api/phongthuysos?filters[slug][$eq]=${slug}&populate=*`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const json = await res.json();
    
    // Nếu tìm thấy bài viết, trả về trường content, ngược lại hiện thông báo
    if (json.data && json.data.length > 0) {
      return json.data[0].attributes.content; 
    }
    return "<p className='text-center italic text-gray-500'>Dữ liệu luận giải cho ngày này đang được chuyên gia cập nhật...</p>";
  } catch (err) {
    console.error("Strapi Error:", err);
    return "<p>Không thể kết nối với máy chủ nội dung.</p>";
  }
}