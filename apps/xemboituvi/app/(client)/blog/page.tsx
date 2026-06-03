"use client";

import FadeIn from "@/components/ui/FadeIn";
import {
  MysticDarkPanel,
  MysticGoldFrame,
  MysticPageShell,
} from "@/components/ui/client/mystic-page-shell";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    title: "Cẩm nang phong thủy nhà ở",
    desc: "Các nguyên tắc nền tảng giúp không gian sống gọn, sáng và thuận khí hơn.",
    href: "/blog/phong-thuy-nha-o",
  },
  {
    title: "Chọn ngày tốt cho việc lớn",
    desc: "Cách đọc ngày lành theo mục đích: khai trương, cưới hỏi, nhập trạch.",
    href: "/xem-ngay/tot-xau",
  },
  {
    title: "Luận giải bản mệnh cá nhân",
    desc: "Những điểm cần chuẩn bị trước khi xem tử vi hoặc phong thủy.",
    href: "/tu-vi",
  },
];

export default function BlogPage() {
  return (
    <MysticPageShell contentClassName="mx-auto max-w-6xl px-4 py-24">
      <FadeIn direction="down">
        <MysticDarkPanel className="mb-5 p-5 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#D4AF37] text-[#1B140E]">
            <BookOpen size={22} />
          </div>
          <h1 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
            Bài viết
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-[13px] leading-relaxed text-white/70">
            Các bài hướng dẫn ngắn gọn về phong thủy, tử vi, xem ngày và định hướng cá nhân.
          </p>
        </MysticDarkPanel>
      </FadeIn>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {posts.map((post, index) => (
          <FadeIn key={post.href} direction="up" delay={index * 0.08}>
            <Link href={post.href} className="group block h-full">
              <MysticGoldFrame className="flex h-full flex-col p-5">
                <h2 className="text-[14px] font-semibold uppercase tracking-wide text-[#F3E3BC]">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-white/68">
                  {post.desc}
                </p>
                <div className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-[#D4AF37]">
                  Xem tiếp <ArrowRight size={14} />
                </div>
              </MysticGoldFrame>
            </Link>
          </FadeIn>
        ))}
      </div>
    </MysticPageShell>
  );
}
