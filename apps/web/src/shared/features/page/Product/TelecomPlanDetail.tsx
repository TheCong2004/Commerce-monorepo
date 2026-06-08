import Image from "next/image";
import Link from "next/link";
import type React from "react";
import {
  BadgeCheck,
  ChevronRight,
  CircleCheck,
  Clock3,
  CreditCard,
  Headphones,
  IdCard,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Signal,
  Smartphone,
  Truck,
  Wifi,
} from "lucide-react";
import { Button } from "@/shared/ui/button";

type TelecomPlanDetailProps = {
  product: any;
  relatedProducts?: any[];
  onAddToCart: () => void;
  isLoading?: boolean;
};

function formatPrice(cents: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(cents || 0);
}

function getPrice(product: any) {
  return product?.variants?.[0]?.calculated_price?.calculated_amount || product?.price || 0;
}

function getComparePrice(product: any) {
  return product?.variants?.[0]?.calculated_price?.original_amount || product?.originalPrice || 0;
}

function getSimNumber(product: any) {
  return product?.metadata?.sim_number || product?.metadata?.number || product?.title || "";
}

export default function TelecomPlanDetail({
  product,
  relatedProducts = [],
  onAddToCart,
  isLoading,
}: TelecomPlanDetailProps) {
  const metadata = (product?.metadata || {}) as Record<string, any>;
  const simNumber = getSimNumber(product);
  const provider = metadata.provider || "Viettel";
  const pattern = metadata.pattern || "So dep, de nho";
  const planName = metadata.plan_name || "MAX120";
  const planDescription = metadata.plan_description || "120GB/thang, mien phi goi noi mang";
  const price = getPrice(product);
  const comparePrice = getComparePrice(product);
  const hasComparePrice = comparePrice > price;
  const heroImage = product?.thumbnail || product?.images?.[0]?.url;

  return (
    <div className="bg-[#f7f9fb] text-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-700">Home</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <Link href="/collection/telecom-plan" className="hover:text-blue-700">SIM & Telecom Plans</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="font-medium text-gray-900 line-clamp-1">{simNumber}</span>
        </nav>

        <section className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-5">
            <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600 p-6 text-white shadow-sm">
              {heroImage && (
                <Image src={heroImage} alt={product.title} fill className="object-cover opacity-20" sizes="70vw" priority />
              )}
              <CreditCard className="absolute right-8 top-8 opacity-20" size={132} />
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-bold uppercase tracking-wide">
                  <BadgeCheck size={15} />
                  Premium collection
                </div>
                <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-7xl">{simNumber}</h1>
                <p className="mt-4 text-lg font-semibold text-blue-50">{provider} - {pattern}</p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <TrustBadge icon={<ShieldCheck size={20} />} title="Sang ten chinh chu" text="Ho tro dang ky theo CCCD/ho chieu" />
              <TrustBadge icon={<Truck size={20} />} title="Giao nhanh" text="eSIM trong vai phut, SIM vat ly giao tan noi" />
              <TrustBadge icon={<Headphones size={20} />} title="Ho tro 24/7" text="Tu van kich hoat va goi cuoc" />
            </div>

            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="flex border-b border-gray-100">
                <button className="border-b-2 border-blue-700 px-5 py-4 text-sm font-bold text-blue-700">Thong so</button>
                <button className="px-5 py-4 text-sm font-bold text-gray-500">Goi cuoc</button>
                <button className="px-5 py-4 text-sm font-bold text-gray-500">Quy trinh</button>
              </div>
              <div className="grid gap-0 divide-y divide-gray-100 p-5">
                <SpecRow label="Loai SIM" value={metadata.sim_type || "eSIM va SIM vat ly 3 kich co"} />
                <SpecRow label="Toc do mang" value={metadata.network_speed || "5G / 4G LTE"} />
                <SpecRow label="Khu vuc ho tro" value={metadata.coverage || "Toan quoc Viet Nam"} />
                <SpecRow label="Dang ky" value={metadata.registration || "Can CCCD/ho chieu de sang ten chinh chu"} />
                <SpecRow label="Nha mang" value={provider} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard icon={<ShieldCheck size={20} />} title="Bao dam phap ly">
                Giao dich chi hoan tat khi SIM duoc kich hoat hoac sang ten theo thong tin nguoi mua.
              </InfoCard>
              <InfoCard icon={<Clock3 size={20} />} title="Kich hoat nhanh">
                eSIM co the gui ma QR sau thanh toan. SIM vat ly duoc xu ly giao hang theo khu vuc.
              </InfoCard>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-md bg-blue-50 px-3 py-1 text-xs font-bold uppercase text-blue-700">Stock: 1 left</span>
                  <h2 className="mt-3 text-2xl font-bold">{provider} Premium SIM</h2>
                </div>
                <Signal className="text-blue-700" size={26} />
              </div>

              <div className="mt-5">
                <p className="text-3xl font-extrabold text-blue-700">{formatPrice(price)}</p>
                {hasComparePrice && <p className="mt-1 text-sm text-gray-400 line-through">{formatPrice(comparePrice)}</p>}
              </div>

              <div className="mt-5">
                <p className="mb-2 text-sm font-bold text-gray-700">Hinh thuc nhan SIM</p>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-blue-700 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
                    <QrCode size={18} />
                    eSIM
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 hover:border-blue-700">
                    <CreditCard size={18} />
                    SIM vat ly
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-lg border-2 border-blue-700 bg-blue-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold">{planName}</p>
                    <p className="mt-1 text-sm text-gray-600">{planDescription}</p>
                  </div>
                  <CircleCheck className="shrink-0 text-blue-700" size={22} />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Button className="h-12 w-full gap-2 bg-emerald-600 text-white hover:bg-emerald-700" onClick={onAddToCart} disabled={isLoading}>
                  <ShoppingBag size={18} />
                  Mua ngay
                </Button>
                <Button variant="outline" className="h-12 w-full border-blue-700 text-blue-700 hover:bg-blue-50" onClick={onAddToCart} disabled={isLoading}>
                  Kiem tra va dat mua
                </Button>
              </div>

              <p className="mt-4 text-center text-sm text-gray-500">Thanh toan qua checkout, khong hien UI tu vi/phong thuy.</p>

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5 text-sm font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <Smartphone size={17} className="text-blue-700" />
                  eSIM nhanh
                </div>
                <div className="flex items-center gap-2">
                  <IdCard size={17} className="text-blue-700" />
                  Chinh chu
                </div>
                <div className="flex items-center gap-2">
                  <Wifi size={17} className="text-blue-700" />
                  5G ready
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={17} className="text-blue-700" />
                  Giao tan noi
                </div>
              </div>
            </div>
          </aside>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold">So SIM khac</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.slice(0, 4).map((item) => (
                <Link key={item.id} href={`/product/${item.handle}`} className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                  <p className="text-2xl font-extrabold tracking-tight group-hover:text-blue-700">{getSimNumber(item)}</p>
                  <p className="mt-2 text-sm text-gray-500">{item.metadata?.provider || item.category}</p>
                  <p className="mt-4 font-bold text-blue-700">{formatPrice(getPrice(item))}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function TrustBadge({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <span className="text-blue-700">{icon}</span>
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">{text}</p>
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 py-3 sm:grid-cols-[180px_1fr]">
      <dt className="text-sm font-bold text-gray-500">{label}</dt>
      <dd className="text-sm font-semibold text-gray-900">{value}</dd>
    </div>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="flex items-center gap-2 text-lg font-bold">
        <span className="text-blue-700">{icon}</span>
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-gray-600">{children}</p>
    </div>
  );
}
