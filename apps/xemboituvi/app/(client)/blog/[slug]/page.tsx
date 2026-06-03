import {
  MysticDarkPanel,
  MysticGoldFrame,
  MysticPageShell,
} from "@/components/ui/client/mystic-page-shell";
import TableOfContents from "@/features/blog/TableOfContents/TableOfContents";
import { fetchPhongThuySoArticleBySlug } from "@/lib/strapi-api";

const DEFAULT_ARTICLE = {
  title: "Cẩm nang phong thủy nhà ở",
  description: "Hướng dẫn ngắn gọn cách bố trí không gian sống hài hòa và dễ áp dụng.",
  image_urls: ["https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=1200"],
  content: `
    <h2>Hiểu đúng về phong thủy</h2>
    <p>Phong thủy là cách quan sát không gian, ánh sáng, hướng gió và cách sắp đặt để đời sống thuận tiện hơn.</p>
    <h2>Bố trí không gian chính</h2>
    <p>Nhà nên sáng, gọn, thông thoáng. Những khu vực sinh hoạt chung cần dễ di chuyển và có điểm tựa ổn định.</p>
    <h2>Lời kết</h2>
    <p>Một không gian sạch sẽ, cân bằng và có sự chăm sóc thường xuyên luôn là nền tảng tốt nhất.</p>
  `,
};

type Props = {
  params: { slug: string };
};

export default async function ArticlePage({ params }: Props) {
  const data = await fetchPhongThuySoArticleBySlug(params.slug);
  const article = data || DEFAULT_ARTICLE;

  return (
    <MysticPageShell contentClassName="mx-auto max-w-6xl px-4 py-24">
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

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <MysticGoldFrame className="p-5">
            <h2 className="mb-3 text-[14px] font-semibold uppercase tracking-wide text-[#F3E3BC]">
              Mục lục
            </h2>
            <TableOfContents content={article.content || ""} />
          </MysticGoldFrame>
        </aside>

        <MysticGoldFrame className="p-5">
          {article.image_urls && article.image_urls.length > 0 && (
            <img
              src={article.image_urls[0]}
              className="mb-5 max-h-[360px] w-full rounded-lg border border-[#D4AF37]/25 object-cover"
              alt={article.title}
            />
          )}
          <div
            className="prose prose-invert prose-sm max-w-none text-[13px] leading-relaxed text-white/68 prose-h2:text-[14px] prose-h2:font-semibold prose-h2:text-[#F3E3BC] prose-h3:text-[14px] prose-h3:text-[#F3E3BC] prose-p:text-[13px] prose-p:text-white/68 prose-li:text-[13px] prose-li:text-white/68 prose-strong:text-[#F3E3BC] prose-a:text-[#D4AF37]"
            dangerouslySetInnerHTML={{ __html: article.content || "" }}
          />
        </MysticGoldFrame>
      </div>
    </MysticPageShell>
  );
}
