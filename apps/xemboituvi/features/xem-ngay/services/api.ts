const STATIC_DAY_ARTICLE =
  "<p class='text-center italic text-gray-500'>Dữ liệu luận giải cho ngày này đang được chuyên gia cập nhật. Bạn vẫn có thể dùng phần tra cứu cơ bản trên trang.</p>";

export async function fetchDayArticle(type: string, date: string): Promise<string> {
  const apiBase = process.env.NEXT_PUBLIC_STRAPI_API?.replace(/\/$/, "");
  if (!apiBase) return STATIC_DAY_ARTICLE;

  const formattedDate = date.replaceAll("/", "-");
  const slug = `${type}-${formattedDate}`;
  const url = `${apiBase}/api/phongthuysos?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return STATIC_DAY_ARTICLE;

    const json = await res.json();
    const first = Array.isArray(json.data) ? json.data[0] : null;
    const content = first?.attributes?.content ?? first?.content;

    return content || STATIC_DAY_ARTICLE;
  } catch (err) {
    console.error("Strapi fetchDayArticle error:", err);
    return STATIC_DAY_ARTICLE;
  }
}
