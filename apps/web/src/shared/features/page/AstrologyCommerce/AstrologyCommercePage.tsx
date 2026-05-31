import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/shared/ui/button";
import {
  CommerceRecommendation,
  Gender,
  getFengShuiProfile,
  getPersonalizedCommerceRecommendations,
} from "@/lib/astrologyRecommendations";

type PageKind = "tu-vi" | "phong-thuy" | "tu-van";

type Props = {
  kind: PageKind;
};

const PAGE_COPY: Record<PageKind, { title: string; eyebrow: string; description: string }> = {
  "tu-vi": {
    eyebrow: "Quiz tử vi cá nhân hóa",
    title: "Tử vi chọn sản phẩm hợp mệnh",
    description: "Nhập thông tin cơ bản để hệ thống luận mệnh, sao chiếu và gợi ý sản phẩm print on demand, sim số đẹp, gói cước phù hợp.",
  },
  "phong-thuy": {
    eyebrow: "Phong thủy ứng dụng",
    title: "Xem phong thủy để bán đúng sản phẩm",
    description: "Tính cung mệnh, màu hợp và hướng tốt, sau đó đề xuất áo, mug, poster, sim và gói mạng theo ngũ hành.",
  },
  "tu-van": {
    eyebrow: "Tư vấn cá nhân",
    title: "Gợi ý sản phẩm theo hồ sơ riêng",
    description: "Kết hợp mệnh, mục tiêu mua hàng và sở thích để tạo shortlist POD, sim, gói cước có thể mua hoặc để lại lead ngay.",
  },
};

const GOALS = [
  "Quà sinh nhật",
  "Thu hút tài lộc",
  "Bình an trong năm",
  "Trang trí góc làm việc",
  "Đồ đôi cá nhân hóa",
  "Mua sim phong thủy",
  "Đăng ký gói mạng",
];

export default function AstrologyCommercePage({ kind }: Props) {
  const router = useRouter();
  const copy = PAGE_COPY[kind];
  const [birthDate, setBirthDate] = useState("1995-08-15");
  const [gender, setGender] = useState<Gender>("Nam");
  const [goal, setGoal] = useState(GOALS[0]);
  const [submitted, setSubmitted] = useState(false);

  const birthYear = Number(birthDate.slice(0, 4)) || 1995;
  const profile = useMemo(() => getFengShuiProfile(birthYear, gender), [birthYear, gender]);
  const recommendations = useMemo(
    () => getPersonalizedCommerceRecommendations(profile, goal, 12),
    [profile, goal],
  );

  const addToCart = (product: CommerceRecommendation, redirect = false) => {
    const currentCart = JSON.parse(window.localStorage.getItem("cart_items") || "[]");
    const existingItem = currentCart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.personalization = product.personalizationPrompt;
    } else {
      currentCart.push(product.cartPayload);
    }

    window.localStorage.setItem("cart_items", JSON.stringify(currentCart));
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: { success: true, cart: currentCart } }));

    if (redirect) {
      router.push("/cart");
    }
  };

  return (
    <div className="bg-white">
      <section className="border-b border-gray-100 bg-[#fbfaf7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8 lg:py-14">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#9a3412]">{copy.eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-gray-950 sm:text-5xl">{copy.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">{copy.description}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm text-gray-700">
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1">Quiz nhanh</span>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1">Gợi ý theo mệnh</span>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1">POD + sim + gói cước</span>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1">Mua ngay trong cart</span>
            </div>
          </div>

          <form
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-800" htmlFor="birthDate">Ngày sinh</label>
                <input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  min="1900-01-01"
                  max="2026-12-31"
                  onChange={(event) => setBirthDate(event.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#c2410c]"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-800" htmlFor="gender">Giới tính</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value as Gender)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#c2410c]"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nu">Nữ</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-800" htmlFor="goal">Mục tiêu</label>
                <select
                  id="goal"
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#c2410c]"
                >
                  {GOALS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="w-full bg-[#c2410c] text-white hover:bg-[#9a3412]">
                Xem gợi ý sản phẩm
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Insight label="Mệnh" value={profile.element} detail={profile.summary} />
          <Insight label="Cung" value={profile.palace} detail={profile.group === "Dong tu menh" ? "Đông tứ mệnh" : "Tây tứ mệnh"} />
          <Insight label="Màu hợp" value={profile.luckyColors.slice(0, 3).join(", ")} detail="Dùng làm màu áo, mug, poster hoặc chữ in." />
          <Insight label="Sao năm nay" value={profile.star.name} detail={profile.star.advice} />
        </div>

        <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#9a3412]">Recommendation engine</p>
            <h2 className="text-2xl font-bold text-gray-950">Đề xuất thương mại theo hồ sơ của bạn</h2>
          </div>
          <p className="max-w-xl text-sm text-gray-600">
            {submitted ? "Kết quả đã được cá nhân hóa theo form vừa nhập." : "Bạn có thể đổi thông tin trong quiz để cập nhật danh sách này."}
          </p>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              {product.thumbnail ? (
                <Link href={product.href || "#"} className="block">
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                </Link>
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-[#111827] px-6 text-center text-white">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fed7aa]">{product.badge}</p>
                    <p className="mt-3 text-2xl font-bold">{product.kind === "sim" ? product.title.replace("Sim phong thủy ", "") : "FPT Telecom"}</p>
                    <p className="mt-2 text-sm text-gray-300">{product.kind === "sim" ? "Số đẹp hợp mệnh" : "Gói cước cá nhân hóa"}</p>
                  </div>
                </div>
              )}
              <div className="space-y-3 p-4">
                <div>
                  {product.href ? (
                    <Link href={product.href} className="line-clamp-1 font-semibold text-gray-950 hover:text-[#c2410c]">
                      {product.title}
                    </Link>
                  ) : (
                    <h3 className="line-clamp-1 font-semibold text-gray-950">{product.title}</h3>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">{product.badge}</span>
                    <span className="text-sm font-bold text-[#c2410c]">{formatRecommendationPrice(product)}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{product.astrologyReason}</p>
                </div>
                <div className="rounded-md bg-[#fff7ed] p-3 text-xs leading-5 text-[#7c2d12]">
                  <span className="font-semibold">Ý tưởng in: </span>{product.personalizationPrompt}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Điểm phù hợp</p>
                    <p className="font-bold text-[#c2410c]">{product.score}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => addToCart(product)} className="h-9">
                      Thêm
                    </Button>
                    <Button onClick={() => addToCart(product, true)} className="h-9 bg-[#c2410c] text-white hover:bg-[#9a3412]">
                      Mua ngay
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Insight({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 text-xl font-bold text-gray-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-gray-600">{detail}</p>
    </div>
  );
}

function formatRecommendationPrice(product: CommerceRecommendation) {
  if (product.kind === "pod") {
    return `$${(product.price / 100).toFixed(2)}`;
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(product.price);
}
