"use client";

import { useEffect, useState } from "react";
import FadeIn from "../../../components/ui/FadeIn";
import { parseVndPrice, redirectToPrintervalCheckout } from "@/lib/printerval-checkout";
import {
  MysticDarkPanel,
  MysticGoldFrame,
  MysticPageShell,
} from "@/components/ui/client/mystic-page-shell";
import {
  BadgeCheck,
  Check,
  Compass,
  Crown,
  Headphones,
  LockKeyhole,
  MessageCircle,
  Moon,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
} from "lucide-react";

const VIP_SERVICES = [
  {
    id: "numerology",
    title: "Thần số học",
    icon: Sparkles,
    price: "199.000",
    features: ["Báo cáo chuyên sâu", "Chỉ số nền tảng", "Dự báo 12 tháng", "Gợi ý cải vận"],
  },
  {
    id: "tu-vi",
    title: "Tử vi chuẩn",
    icon: Star,
    price: "299.000",
    features: ["Lá số trọn đời", "Giải đoán 12 cung", "Hạn năm và đại vận", "Hỏi đáp chuyên gia"],
  },
  {
    id: "phong-thuy",
    title: "Phong thủy",
    icon: Compass,
    price: "250.000",
    features: ["Bố trí nhà cửa", "Màu sắc hợp mệnh", "Vật phẩm trợ vận", "Sim phong thủy"],
  },
  {
    id: "xem-ngay",
    title: "Xem ngày tốt",
    icon: Sun,
    price: "99.000",
    features: ["Giờ hoàng đạo", "Cưới hỏi, khai trương", "Xuất hành, động thổ", "Tránh ngày xấu"],
  },
  {
    id: "tarot",
    title: "Tarot VIP",
    icon: Moon,
    price: "150.000",
    features: ["Trải bài mở rộng", "Giải mã thông điệp", "Dự báo tuần mới", "Lưu lịch sử trải bài"],
  },
];

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Thanh toán an toàn",
    text: "Đơn hàng xử lý qua cổng thanh toán, website không lưu thông tin thẻ.",
  },
  {
    icon: ReceiptText,
    title: "Quyền lợi rõ ràng",
    text: "Mỗi gói ghi rõ nội dung nhận được và giá trước khi chuyển sang thanh toán.",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ sau mua",
    text: "Có thể đối soát theo mã giao dịch nếu bạn cần kiểm tra quyền lợi.",
  },
  {
    icon: LockKeyhole,
    title: "Bảo mật thông tin",
    text: "Ngày sinh, giờ sinh và liên hệ chỉ dùng để lập luận giải và chăm sóc đơn.",
  },
];

const PURCHASE_STEPS = [
  "Chọn gói VIP phù hợp với nhu cầu.",
  "Kiểm tra giá và quyền lợi trước khi thanh toán.",
  "Hoàn tất thanh toán và lưu mã giao dịch.",
  "Nhận quyền truy cập hoặc được hỗ trợ kích hoạt nếu hệ thống cần đối soát.",
];

const FAQ_ITEMS = [
  {
    question: "Mua xong chưa nhận được quyền lợi thì sao?",
    answer: "Bạn gửi mã giao dịch hoặc email đặt hàng để đội ngũ hỗ trợ kiểm tra và kích hoạt lại quyền lợi.",
  },
  {
    question: "Thông tin cá nhân có được bảo mật không?",
    answer: "Có. Dữ liệu lá số và thông tin liên hệ chỉ phục vụ cho việc tạo báo cáo, tư vấn và chăm sóc đơn hàng.",
  },
  {
    question: "Nội dung VIP có thay thế tư vấn chuyên môn không?",
    answer: "Không. Các luận giải mang tính tham khảo, định hướng và chiêm nghiệm.",
  },
];

export default function MuaVipPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab");
    if (tab) setActiveId(tab);
  }, []);

  return (
    <MysticPageShell>
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn direction="down">
          <header className="mb-7 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/12 px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
              <Crown size={15} /> Dịch vụ cao cấp
            </div>
            <h1 className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#F3E3BC]">
              Nâng cấp quyền lợi VIP
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-6 text-white/68">
              Mở khóa luận giải chuyên sâu, quyền lợi rõ trước khi mua và có hỗ trợ đối soát sau thanh toán.
            </p>
          </header>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-4">
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <MysticGoldFrame key={item.title} className="p-4">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/12 text-[#D4AF37]">
                    <Icon size={17} />
                  </div>
                  <h2 className="mb-1 text-[14px] font-bold text-[#F3E3BC]">{item.title}</h2>
                  <p className="text-[13px] leading-6 text-white/68">{item.text}</p>
                </MysticGoldFrame>
              );
            })}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {VIP_SERVICES.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.id} direction="up" delay={index * 0.08}>
                <MysticGoldFrame className={`flex h-full flex-col p-5 ${activeId === item.id ? "border-[#D4AF37]/90" : ""}`}>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/12 text-[#D4AF37]">
                    <Icon size={18} />
                  </div>
                  <h3 className="mb-2 text-[14px] font-bold uppercase tracking-[0.12em] text-[#F3E3BC]">{item.title}</h3>
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className="text-[14px] font-bold text-[#F3E3BC]">{item.price}đ</span>
                    <span className="text-[13px] text-white/50">/gói</span>
                  </div>

                  <div className="mb-5 flex-grow space-y-2.5">
                    {item.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5">
                        <Check size={13} className="mt-1 shrink-0 text-[#D4AF37]" />
                        <span className="text-[13px] leading-6 text-white/68">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="h-11 w-full rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37] text-[13px] font-bold uppercase tracking-[0.14em] text-black transition hover:bg-[#F3E3BC] active:scale-[0.98]"
                    onClick={() =>
                      redirectToPrintervalCheckout({
                        id: `vip-${item.id}`,
                        title: `Gói VIP ${item.title}`,
                        price: parseVndPrice(item.price),
                        variantTitle: "Gói VIP",
                        source: "mua-vip",
                        metadata: {
                          service_id: item.id,
                          features: item.features,
                          original_price: item.price,
                        },
                      })
                    }
                  >
                    Đăng ký ngay
                  </button>
                  <p className="mt-3 text-center text-[13px] leading-6 text-white/50">
                    Có mã giao dịch để hỗ trợ đối soát khi cần.
                  </p>
                </MysticGoldFrame>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn direction="up" delay={0.45}>
          <MysticDarkPanel className="mt-8 flex flex-col items-start justify-between gap-4 p-5 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/15 text-[#D4AF37]">
                <Crown size={20} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#F3E3BC]">Gói VIP combo</h4>
                <p className="mt-1 text-[13px] leading-6 text-white/62">
                  Phù hợp khi bạn cần trọn bộ dịch vụ cao cấp.
                </p>
              </div>
            </div>
            <button className="h-10 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37] px-5 text-[13px] font-bold uppercase tracking-[0.12em] text-black transition hover:bg-[#F3E3BC]">
              Tư vấn combo
            </button>
          </MysticDarkPanel>
        </FadeIn>

        <FadeIn direction="up" delay={0.55}>
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <MysticDarkPanel className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 text-[#D4AF37]" />
                <h2 className="text-[14px] font-bold text-[#F3E3BC]">Quy trình mua rõ ràng</h2>
              </div>
              <div className="space-y-3">
                {PURCHASE_STEPS.map((step, index) => (
                  <div key={step} className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/25 bg-[#D4AF37]/12 text-[13px] font-bold text-[#D4AF37]">
                      {index + 1}
                    </div>
                    <p className="text-[13px] leading-6 text-white/68">{step}</p>
                  </div>
                ))}
              </div>
            </MysticDarkPanel>

            <MysticDarkPanel className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-[#D4AF37]" />
                <h2 className="text-[14px] font-bold text-[#F3E3BC]">Câu hỏi trước khi mua</h2>
              </div>
              <div className="space-y-3">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.question} className="border-b border-[#D4AF37]/15 pb-3 last:border-0 last:pb-0">
                    <h3 className="mb-1 text-[14px] font-bold text-white/85">{item.question}</h3>
                    <p className="text-[13px] leading-6 text-white/58">{item.answer}</p>
                  </div>
                ))}
              </div>
            </MysticDarkPanel>
          </div>
        </FadeIn>
      </div>
    </MysticPageShell>
  );
}
