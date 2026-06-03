"use client";

import FadeIn from "@/components/ui/FadeIn";
import {
  MysticDarkPanel,
  MysticGoldFrame,
  MysticPageShell,
} from "@/components/ui/client/mystic-page-shell";
import {
  ArrowUpRight,
  Compass,
  Home,
  Layout,
  Sparkles,
  UtensilsCrossed,
  Waves,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function PhongThuyHubPage() {
  const services = [
    {
      title: "Phong thủy nhà ở",
      desc: "Xác định hướng nhà đại cát, bố trí huyền quan nạp khí.",
      icon: <Home size={20} />,
      slug: "/phong-thuy/huong-nha-theo-tuoi",
    },
    {
      title: "Hướng bàn thờ",
      desc: "An vị nơi thờ tự, tọa cát hướng cát, gia đạo bình an.",
      icon: <Zap size={20} />,
      slug: "/phong-thuy/huong-ban-tho",
    },
    {
      title: "Bàn làm việc",
      desc: "Kích hoạt cung tài lộc, công danh hanh thông.",
      icon: <Layout size={20} />,
      slug: "/phong-thuy/huong-ban-lam-viec",
    },
    {
      title: "Phong thủy nhà bếp",
      desc: "Tọa hung hướng cát, giữ lửa hạnh phúc và sức khỏe.",
      icon: <UtensilsCrossed size={20} />,
      slug: "/phong-thuy/huong-bep-theo-tuoi",
    },
    {
      title: "Nhà tắm - vệ sinh",
      desc: "Trấn áp uế khí, khơi thông mạch thủy.",
      icon: <Waves size={20} />,
      slug: "/phong-thuy/huong-nha-tam-theo-tuoi",
    },
    {
      title: "Chấm điểm sim",
      desc: "Cải biến vận mệnh qua những con số, kích hoạt tài lộc.",
      icon: <Sparkles size={20} />,
      slug: "/phong-thuy/phong-thuy-sim",
    },
  ];

  return (
    <MysticPageShell contentClassName="mx-auto max-w-6xl px-4 pb-20 pt-24">
      <header className="mb-10 text-center">
        <FadeIn direction="down">
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[#D4AF37]/40 bg-black/45 px-3 py-1.5 text-[13px] font-semibold text-[#D4AF37] backdrop-blur">
            <Compass size={16} /> Vạn sự hanh thông
          </div>
          <MysticDarkPanel className="mx-auto max-w-3xl px-5 py-4">
            <h1 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
              Phong thủy cải vận
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-white/70">
              Chọn hướng, bố trí không gian và vật phẩm theo mệnh để mọi việc thuận hơn.
            </p>
          </MysticDarkPanel>
        </FadeIn>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((item, index) => (
          <FadeIn key={item.slug} direction="up" delay={index * 0.08} scale={0.98}>
            <Link href={item.slug} className="group block h-full">
              <MysticGoldFrame className="flex h-full flex-col p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-[#D4AF37]/45 bg-[#D4AF37]/12 text-[#D4AF37]">
                  {item.icon}
                </div>
                <h2 className="text-[14px] font-semibold uppercase tracking-wide text-[#F3E3BC]">
                  {item.title}
                </h2>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-white/68">
                  {item.desc}
                </p>
                <div className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-[#D4AF37]">
                  Bắt đầu tra cứu <ArrowUpRight size={14} />
                </div>
              </MysticGoldFrame>
            </Link>
          </FadeIn>
        ))}
      </div>

      <FadeIn direction="up" delay={0.4}>
        <MysticDarkPanel className="mt-10 px-5 py-4 text-center">
          <p className="text-[13px] leading-relaxed text-white/70">
            Mệnh tốt không bằng vận tốt, vận tốt không bằng cách chọn đúng thời điểm và không gian.
          </p>
        </MysticDarkPanel>
      </FadeIn>
    </MysticPageShell>
  );
}
