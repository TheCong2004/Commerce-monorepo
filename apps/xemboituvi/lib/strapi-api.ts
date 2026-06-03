const API_BASE = process.env.NEXT_PUBLIC_STRAPI_API;

export interface PhongThuySoArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  author?: string;
  url?: string;
  image_urls?: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const getHeaders = (): HeadersInit => ({
  "Content-Type": "application/json",
});

const getApiBase = () => {
  const base = API_BASE?.trim();
  return base ? base.replace(/\/$/, "") : null;
};

const normalizeArticle = (item: any): PhongThuySoArticle => {
  const source = item?.attributes ? { id: item.id, ...item.attributes } : item;

  return {
    id: source.id ?? item?.id ?? 0,
    documentId: source.documentId ?? "",
    title: source.title ?? "",
    slug: source.slug ?? "",
    description: source.description ?? "",
    content: source.content,
    author: source.author,
    url: source.url,
    image_urls: Array.isArray(source.image_urls) ? source.image_urls : [],
    publishedAt: source.publishedAt,
    createdAt: source.createdAt ?? "",
    updatedAt: source.updatedAt ?? "",
  };
};

export async function fetchPhongThuySoArticles(): Promise<PhongThuySoArticle[]> {
  const base = getApiBase();
  if (!base) return [];

  const url = `${base}/api/phongthuysos?populate=*`;

  try {
    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch phongthuysos: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data.data) ? data.data.map(normalizeArticle) : [];
  } catch (err) {
    console.error("fetchPhongThuySoArticles error:", err);
    return [];
  }
}

export async function fetchPhongThuySoArticleBySlug(slug: string): Promise<PhongThuySoArticle | null> {
  const base = getApiBase();
  if (!base) return null;

  const url = `${base}/api/phongthuysos?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;

  try {
    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch phongthuysos: ${res.status}`);
    }

    const data = await res.json();
    const articles = Array.isArray(data.data) ? data.data.map(normalizeArticle) : [];
    return articles[0] ?? null;
  } catch (err) {
    console.error("fetchPhongThuySoArticleBySlug error:", err);
    return null;
  }
}
