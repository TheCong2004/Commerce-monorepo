"use client";

import FadeIn from "@/components/ui/FadeIn";
import {
  MysticDarkPanel,
  MysticGoldFrame,
  MysticPageShell,
} from "@/components/ui/client/mystic-page-shell";
import { ArrowRight, Calendar, Clock, Home, MapPin, Store, Users } from "lucide-react";
import Link from "next/link";

export default function XemNgayPage() {
  const items = [
    { title: "Ngày tốt xấu", href: "/xem-ngay/tot-xau", icon: <Calendar size={20} /> },
    { title: "Ngày cưới hỏi", href: "/xem-ngay/ket-hon", icon: <Users size={20} /> },
    { title: "Ngày khai trương", href: "/xem-ngay/khai-truong", icon: <Store size={20} /> },
    { title: "Ngày động thổ", href: "/xem-ngay/dong-tho", icon: <Home size={20} /> },
    { title: "Ngày nhập trạch", href: "/xem-ngay/nhap-trach", icon: <Home size={20} /> },
    { title: "Ngày xuất hành", href: "/xem-ngay/xuat-hanh", icon: <MapPin size={20} /> },
    { title: "Ngày ký hợp đồng", href: "/xem-ngay/ky-hop-dong", icon: <Clock size={20} /> },
    { title: "Ngày mua xe", href: "/xem-ngay/mua-xe", icon: <Calendar size={20} /> },
  ];

  return (
    <MysticPageShell contentClassName="mx-auto max-w-6xl px-4 py-24">
      <FadeIn direction="down">
        <MysticDarkPanel className="mb-5 p-5 text-center">
          <h1 className="text-[14px] font-semibold uppercase tracking-wide text-[#F7E8B1]">
            Tra cứu ngày cát tường
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-[13px] leading-relaxed text-white/70">
            Chọn đúng mục cần xem để nhận luận giải ngày giờ phù hợp với từng việc.
          </p>
        </MysticDarkPanel>
      </FadeIn>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <FadeIn key={item.href} direction="up" delay={index * 0.05}>
            <Link href={item.href} className="group block h-full">
              <MysticGoldFrame className="flex h-full flex-col p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-[#D4AF37]/45 bg-[#D4AF37]/12 text-[#D4AF37]">
                  {item.icon}
                </div>
                <h2 className="text-[14px] font-semibold uppercase tracking-wide text-[#F3E3BC]">
                  {item.title}
                </h2>
                <div className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-[#D4AF37]">
                  Mở tra cứu <ArrowRight size={14} />
                </div>
              </MysticGoldFrame>
            </Link>
          </FadeIn>
        ))}
      </div>
    </MysticPageShell>
  );
}
