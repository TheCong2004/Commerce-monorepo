import { notFound } from 'next/navigation';
import { fetchPhongThuySoArticleBySlug } from '@/lib/strapi-api';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function ArticlePage({ params }: Props) {
  // ✅ Await params (Next.js 15)
  const { slug } = await params;

  const segments = Array.isArray(slug) ? slug : [slug];
  if (segments.length === 0) return notFound();

  // ✅ LẤY NGUYÊN XI PHẦN CUỐI — KHÔNG CẮT .html
  const actualSlug = segments[segments.length - 1];

  // ✅ Gọi API với slug nguyên bản (có .html nếu URL có)
  const article = await fetchPhongThuySoArticleBySlug(actualSlug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f7edd6] to-[#f3e2c2] p-4">
        <div className="bg-white rounded-xl shadow-lg border border-[#e2cfa3] p-8 max-w-md text-center">
          <h1 className="text-xl font-bold text-[#8B4513] mb-4">❗ Nội dung không tìm thấy</h1>
          <p className="text-[#5c4033] mb-6">
            Trang bạn yêu cầu hiện chưa được cập nhật hoặc không tồn tại.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#bf7e26] hover:bg-[#a66a1d] text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7edd6] to-[#f3e2c2] py-8 px-2 sm:px-6">
      <article className="w-full max-w-3xl bg-white/95 rounded-2xl shadow-2xl border border-[#e2cfa3] overflow-hidden flex flex-col gap-0">
        <div className="p-6 sm:p-10 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#8B4513] mb-2 leading-tight text-center drop-shadow-md">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-[#a67c52] text-lg sm:text-xl italic mb-4 text-center">{article.description}</p>
          )}
          {/* Hiển thị tất cả ảnh trong image_urls nếu có */}
          {Array.isArray(article.image_urls) && article.image_urls.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              {article.image_urls.map((url, idx) => (
                <img
                  key={url + idx}
                  src={url}
                  alt={article.title + ' - ảnh ' + (idx + 1)}
                  className="rounded-xl shadow-md max-h-60 w-auto object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          )}
          <div
            className="prose prose-stone max-w-none text-[#5c4033] leading-relaxed prose-h2:text-2xl prose-h2:font-bold prose-h2:text-[#8B4513] prose-p:text-base prose-p:sm:text-lg prose-li:marker:text-[#bf7e26] prose-a:text-[#bf7e26] prose-a:underline hover:prose-a:text-[#a66a1d] prose-img:rounded-lg prose-img:mx-auto"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />
        </div>
      </article>
    </div>
  );
}