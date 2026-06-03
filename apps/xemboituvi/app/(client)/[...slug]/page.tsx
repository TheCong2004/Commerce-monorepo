import {
  MysticDarkPanel,
  MysticGoldFrame,
  MysticPageShell,
} from "@/components/ui/client/mystic-page-shell";
import { fetchPhongThuySoArticleBySlug, PhongThuySoArticle } from "@/lib/strapi-api";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const STATIC_ARTICLE: PhongThuySoArticle = {
  id: 0,
  documentId: "static-fallback",
  title: "Cẩm nang phong thủy ứng dụng",
  slug: "cam-nang-phong-thuy",
  description: "Nội dung tĩnh được hiển thị khi hệ thống chưa kết nối được API Strapi.",
  content: `
    <h2>Nguyên tắc chung</h2>
    <p>Không gian sống nên sáng, thoáng, sạch và có luồng di chuyển rõ ràng. Đây là nền tảng dễ áp dụng nhất trước khi xét từng hướng cụ thể.</p>
    <h2>Cách dùng thông tin tra cứu</h2>
    <p>Kết quả phong thủy nên được xem như gợi ý tham khảo. Khi có dữ liệu API, bài viết chi tiết từ hệ thống nội dung sẽ tự động thay thế phần tĩnh này.</p>
  `,
  image_urls: [],
  createdAt: "",
  updatedAt: "",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const segments = Array.isArray(slug) ? slug : [slug];
  if (segments.length === 0) return notFound();

  const actualSlug = segments[segments.length - 1];
  const article = (await fetchPhongThuySoArticleBySlug(actualSlug)) || {
    ...STATIC_ARTICLE,
    slug: actualSlug,
  };

  return (
    <MysticPageShell contentClassName="mx-auto max-w-4xl px-4 py-24">
      <MysticDarkPanel className="mb-5 p-5 text-center">
        <h1 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
          {article.title}
        </h1>
        {article.description && (
          <p className="mx-auto mt-2 max-w-2xl text-[13px] leading-relaxed text-white/70">
            {article.description}
          </p>
        )}
      </MysticDarkPanel>

      <MysticGoldFrame className="p-5">
        {Array.isArray(article.image_urls) && article.image_urls.length > 0 && (
          <div className="mb-5 flex flex-wrap justify-center gap-4">
            {article.image_urls.map((url, idx) => (
              <img
                key={url + idx}
                src={url}
                alt={`${article.title} - ảnh ${idx + 1}`}
                className="max-h-60 w-auto rounded-lg border border-[#D4AF37]/25 object-cover"
                loading="lazy"
              />
            ))}
          </div>
        )}
        <div
          className="prose prose-invert prose-sm max-w-none text-[13px] leading-relaxed text-white/68 prose-h2:text-[14px] prose-h2:font-semibold prose-h2:text-[#F3E3BC] prose-h3:text-[14px] prose-h3:text-[#F3E3BC] prose-p:text-[13px] prose-p:text-white/68 prose-li:text-[13px] prose-li:text-white/68 prose-a:text-[#D4AF37]"
          dangerouslySetInnerHTML={{ __html: article.content || "" }}
        />
        <Link
          href="/"
          className="mt-5 inline-flex rounded-lg bg-[#D4AF37] px-5 py-3 text-[14px] font-semibold text-[#1B140E]"
        >
          Quay về trang chủ
        </Link>
      </MysticGoldFrame>
    </MysticPageShell>
  );
}
