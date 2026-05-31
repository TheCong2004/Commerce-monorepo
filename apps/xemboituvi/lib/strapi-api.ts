// Clean Strapi API helper for fetching phongthuyso articles
const API_BASE = process.env.NEXT_PUBLIC_STRAPI_API as string;

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
  'Content-Type': 'application/json',
});

/**
 * Fetch all phongthuyso articles from Strapi
 */
export async function fetchPhongThuySoArticles(): Promise<PhongThuySoArticle[]> {
  const url = `${API_BASE.replace(/\/$/, '')}api/phongthuysos?populate=*`;

  try {
    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch phongthuysos: ${res.status}`);
    }

    const data = await res.json();
    // Map data to PhongThuySoArticle[]
    return Array.isArray(data.data)
      ? data.data.map((item: any) => ({
          id: item.id,
          documentId: item.documentId,
          title: item.title,
          slug: item.slug,
          description: item.description,
          content: item.content,
          author: item.author,
          url: item.url,
          image_urls: item.image_urls,
          publishedAt: item.publishedAt,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }))
      : [];
  } catch (err) {
    console.error('🚨 fetchPhongThuySoArticles error:', err);
    return [];
  }
}

/**
 * Fetch phongthuyso article by slug
 */
export async function fetchPhongThuySoArticleBySlug(slug: string): Promise<PhongThuySoArticle | null> {
  const url = `${API_BASE.replace(/\/$/, '')}/api/phongthuysos?filters[slug][$eq]=${slug}&populate=*`;

  try {
    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch phongthuysos: ${res.status}`);
    }

    const data = await res.json();
    const articles = Array.isArray(data.data)
      ? data.data.map((item: any) => ({
          id: item.id,
          documentId: item.documentId,
          title: item.title,
          slug: item.slug,
          description: item.description,
          content: item.content,
          author: item.author,
          url: item.url,
          image_urls: item.image_urls,
          publishedAt: item.publishedAt,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }))
      : [];
    return articles.length > 0 ? articles[0] : null;
  } catch (err) {
    console.error('🚨 fetchPhongThuySoArticleBySlug error:', err);
    return null;
  }
}