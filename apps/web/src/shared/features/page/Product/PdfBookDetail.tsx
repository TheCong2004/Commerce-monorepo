import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Heart,
  LockKeyhole,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";
import { Button } from "@/shared/ui/button";

type PdfBookDetailProps = {
  product: any;
  relatedProducts?: any[];
  onAddToCart: () => void;
  isLoading?: boolean;
};

const fallbackCover =
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=900";

function formatPrice(cents: number) {
  return `$${((cents || 0) / 100).toFixed(2)}`;
}

function getMetadata(product: any) {
  return (product?.metadata || {}) as Record<string, any>;
}

function getMainPrice(product: any) {
  return product?.variants?.[0]?.calculated_price?.calculated_amount || product?.price || 0;
}

function getComparePrice(product: any) {
  return product?.variants?.[0]?.calculated_price?.original_amount || product?.originalPrice || 0;
}

function normalizeToc(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return { title: item, page: "" };
        if (item && typeof item === "object") return item as { title?: string; page?: string | number };
        return null;
      })
      .filter(Boolean)
      .slice(0, 8);
  }

  return [
    { title: "Giới thiệu và phạm vi tài liệu", page: 1 },
    { title: "Khung kiến thức cốt lõi", page: 12 },
    { title: "Ví dụ thực hành và tình huống ứng dụng", page: 38 },
    { title: "Checklist triển khai sau khi đọc", page: 86 },
  ];
}

export default function PdfBookDetail({ product, relatedProducts = [], onAddToCart, isLoading }: PdfBookDetailProps) {
  const metadata = getMetadata(product);
  const price = getMainPrice(product);
  const comparePrice = getComparePrice(product);
  const hasComparePrice = comparePrice > price;
  const cover = product?.thumbnail || product?.images?.[0]?.url || fallbackCover;
  const author = metadata.author || metadata.publisher || "Digital Library";
  const pages = metadata.pages || metadata.page_count || "120+";
  const fileSize = metadata.file_size || metadata.fileSize || "PDF";
  const language = metadata.language || "VI";
  const rating = Number(metadata.rating || product?.rating || 4.8);
  const reviewCount = Number(metadata.review_count || metadata.reviewCount || 124);
  const toc = normalizeToc(metadata.table_of_contents || metadata.toc);
  const license = metadata.license || "Bản quyền cá nhân, tải xuống sau thanh toán.";

  return (
    <div className="bg-[#f7f9fb]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-700">Home</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <Link href="/collection/digital-product" className="hover:text-blue-700">Sản phẩm số</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <Link href="/collection/pdf-book" className="hover:text-blue-700">Sách PDF</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="font-medium text-gray-900 line-clamp-1">{product.title}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[440px_1fr] xl:grid-cols-[500px_1fr]">
          <section className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="relative mx-auto aspect-[3/4] max-w-[420px] overflow-hidden rounded-lg bg-gray-100 shadow-[18px_18px_45px_rgba(15,23,42,0.16)]">
                <Image
                  src={cover}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 420px, 90vw"
                  priority
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <div className="border-r border-gray-100">
                <p className="text-xs font-semibold uppercase text-gray-500">Dung lượng</p>
                <p className="mt-1 font-bold text-gray-950">{fileSize}</p>
              </div>
              <div className="border-r border-gray-100">
                <p className="text-xs font-semibold uppercase text-gray-500">Số trang</p>
                <p className="mt-1 font-bold text-gray-950">{pages}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-gray-500">Ngôn ngữ</p>
                <p className="mt-1 font-bold text-gray-950">{language}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Button variant="outline" className="h-11 flex-1 gap-2 border-gray-300 bg-white">
                <BookOpen size={17} />
                Đọc thử
              </Button>
              <Button variant="outline" className="h-11 w-12 border-gray-300 bg-white px-0">
                <Heart size={17} />
              </Button>
            </div>
          </section>

          <main className="space-y-5">
            <section>
              <div className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                Sách PDF
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">{product.title}</h1>
              <p className="mt-3 text-lg leading-7 text-gray-600">{product.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star size={18} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-950">{rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500">({reviewCount} đánh giá)</span>
                </div>
                <div className="h-4 w-px bg-gray-200" />
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <ShieldCheck size={17} />
                  Tải xuống an toàn
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Nhận file ngay sau thanh toán</p>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-blue-700">{formatPrice(price)}</span>
                  {hasComparePrice && (
                    <span className="text-sm text-gray-400 line-through">{formatPrice(comparePrice)}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="h-11 gap-2 bg-emerald-600 px-6 text-white hover:bg-emerald-700" onClick={onAddToCart} disabled={isLoading}>
                  <Download size={17} />
                  Mua ngay
                </Button>
                <Button variant="outline" className="h-11 border-blue-700 px-6 text-blue-700 hover:bg-blue-50" onClick={onAddToCart} disabled={isLoading}>
                  Thêm vào giỏ
                </Button>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-950">
                  <UserRound size={19} />
                  Tác giả / Nhà xuất bản
                </h2>
                <p className="mt-3 font-semibold text-gray-900">{author}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Tài liệu được trình bày theo dạng PDF dễ đọc, phù hợp để học tập, tham khảo và triển khai thực tế.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-950">
                  <LockKeyhole size={19} />
                  Giấy phép
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">{license}</p>
                <ul className="mt-3 space-y-2 text-sm font-semibold text-gray-800">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> Văn bản có thể tìm kiếm</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> Link tải bảo mật sau thanh toán</li>
                </ul>
              </div>
            </section>

            <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-5">
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-950">
                  <FileText size={19} />
                  Mục lục
                </h2>
              </div>
              <div className="divide-y divide-gray-100 px-5">
                {toc.map((item: any, index) => (
                  <div key={`${item.title}-${index}`} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="font-medium text-gray-800">{item.title || `Chương ${index + 1}`}</span>
                    <span className="text-sm text-gray-500">{item.page ? `tr. ${item.page}` : ""}</span>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-gray-950">Sách PDF liên quan</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.slice(0, 4).map((item) => {
                const itemPrice = item?.variants?.[0]?.calculated_price?.calculated_amount || 0;
                return (
                  <Link key={item.id} href={`/product/${item.handle}`} className="group rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-gray-100">
                      <Image src={item.thumbnail || fallbackCover} alt={item.title} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="25vw" />
                    </div>
                    <p className="mt-3 text-xs font-bold uppercase text-blue-700">Sách PDF</p>
                    <h3 className="mt-1 line-clamp-2 font-semibold text-gray-950">{item.title}</h3>
                    <p className="mt-2 font-bold text-blue-700">{formatPrice(itemPrice)}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
