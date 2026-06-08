import Image from "next/image";
import Link from "next/link";
import type React from "react";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FlaskConical,
  Heart,
  Leaf,
  LineChart,
  PackageCheck,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Truck,
} from "lucide-react";
import { Button } from "@/shared/ui/button";

type AgricultureDetailProps = {
  product: any;
  relatedProducts?: any[];
  onAddToCart: () => void;
  isLoading?: boolean;
};

const fallbackHero =
  "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80&w=1400";

function formatPrice(cents: number) {
  return `$${((cents || 0) / 100).toFixed(2)}`;
}

function getPrice(product: any) {
  return product?.variants?.[0]?.calculated_price?.calculated_amount || product?.price || 0;
}

function getComparePrice(product: any) {
  return product?.variants?.[0]?.calculated_price?.original_amount || product?.originalPrice || 0;
}

function asRecord(value: unknown, fallback: Record<string, string>) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, string>)
    : fallback;
}

function asList(value: unknown, fallback: string[]) {
  return Array.isArray(value) ? value.map(String).filter(Boolean).slice(0, 8) : fallback;
}

export default function AgricultureDetail({
  product,
  relatedProducts = [],
  onAddToCart,
  isLoading,
}: AgricultureDetailProps) {
  const metadata = (product?.metadata || {}) as Record<string, any>;
  const price = getPrice(product);
  const comparePrice = getComparePrice(product);
  const hasComparePrice = comparePrice > price;
  const hero = product?.thumbnail || product?.images?.[0]?.url || fallbackHero;
  const unit = metadata.unit || "unit";
  const origin = metadata.origin || "Verified supplier";
  const delivery = metadata.delivery || "7-14 day delivery";
  const season = metadata.season || "In-season";
  const composition = asRecord(metadata.composition, {
    Nitrogen: "4.2%",
    Phosphorus: "2.8%",
    Potassium: "3.5%",
    "Organic Matter": "65%",
  });
  const metrics = asRecord(metadata.metrics, {
    Density: "750 kg/m3",
    Moisture: "<15%",
    "Package Size": "25 kg",
    "pH Level": "6.8 - 7.2",
  });
  const compatibility = asList(metadata.compatibility, [
    "Vegetable farms",
    "Fruit orchards",
    "Greenhouse crops",
    "Soil improvement",
  ]);

  return (
    <div className="bg-[#f7f9fb] text-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <Link href="/collection/agriculture" className="hover:text-emerald-700">Nong san va vat tu</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="font-medium text-gray-900 line-clamp-1">{product.title}</span>
        </nav>

        <section className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="relative h-[360px] bg-gray-100 sm:h-[430px]">
                <Image
                  src={hero}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 720px, 100vw"
                  priority
                />
              </div>
              <div className="flex gap-3 overflow-x-auto p-4">
                {(product?.images || [{ url: hero }]).slice(0, 4).map((image: any, index: number) => (
                  <div
                    key={`${image.url}-${index}`}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-gray-100 ${index === 0 ? "border-emerald-700" : "border-gray-200"}`}
                  >
                    <Image src={image.url || hero} alt={`${product.title} ${index + 1}`} fill className="object-cover" sizes="80px" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SpecCard title="Composition" icon={<FlaskConical size={19} />} data={composition} />
              <SpecCard title="Physical Metrics" icon={<Scale size={19} />} data={metrics} />
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white">
                <BadgeCheck size={25} />
              </div>
              <div>
                <h2 className="text-lg font-bold">Verified origin</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">{origin}</p>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
                <Leaf size={14} />
                Agriculture supply
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{product.title}</h1>
              <p className="mt-3 text-base leading-7 text-gray-600">{product.description}</p>

              <div className="mt-5 flex flex-wrap items-end gap-3">
                <span className="text-4xl font-bold text-emerald-700">{formatPrice(price)}</span>
                <span className="pb-1 text-sm font-semibold text-gray-500">/ {unit}</span>
                {hasComparePrice && <span className="pb-1 text-gray-400 line-through">{formatPrice(comparePrice)}</span>}
              </div>

              <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                  <CalendarDays size={17} />
                  Seasonal window
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs font-bold">
                  {["Spring", "Summer", "Fall", "Winter"].map((label) => (
                    <div
                      key={label}
                      className={`rounded border px-2 py-2 ${label === season ? "border-emerald-700 bg-emerald-700 text-white" : "border-gray-200 bg-white text-gray-600"}`}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-bold text-gray-800">Select package</p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {["Small", "Bulk", "Wholesale"].map((label, index) => (
                    <button
                      key={label}
                      className={`rounded-lg border px-3 py-3 text-sm font-bold transition ${index === 0 ? "border-emerald-700 bg-emerald-50 text-emerald-700" : "border-gray-200 hover:border-emerald-700"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Button className="h-12 w-full gap-2 bg-emerald-700 text-white hover:bg-emerald-800" onClick={onAddToCart} disabled={isLoading}>
                  <ShoppingCart size={18} />
                  Add to cart
                </Button>
                <Button className="h-12 w-full gap-2 bg-blue-700 text-white hover:bg-blue-800" onClick={onAddToCart} disabled={isLoading}>
                  <PackageCheck size={18} />
                  Buy now
                </Button>
                <Button variant="outline" className="h-12 w-full gap-2 border-gray-300">
                  <Heart size={18} />
                  Save product
                </Button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5 text-sm font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-emerald-700" />
                  {delivery}
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-700" />
                  Quality checked
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <LineChart size={21} />
              Field compatibility
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {compatibility.map((item, index) => (
                <div key={item} className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{item}</span>
                    <span className="text-sm font-bold text-emerald-700">{95 - index * 8}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-emerald-600" style={{ width: `${95 - index * 8}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-emerald-700 p-5 text-white shadow-sm">
            <Sprout size={28} />
            <h2 className="mt-3 text-xl font-bold">Need bulk procurement?</h2>
            <p className="mt-2 text-sm leading-6 text-emerald-50">
              Use merchant product metadata to show supplier terms, MOQ, delivery regions, or crop compatibility for real agricultural inventory.
            </p>
            <Button className="mt-5 bg-white text-emerald-700 hover:bg-emerald-50">
              <ClipboardList size={17} />
              Request quote
            </Button>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold">Related agriculture products</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.slice(0, 4).map((item) => (
                <Link key={item.id} href={`/product/${item.handle}`} className="group rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-gray-100">
                    <Image src={item.thumbnail || fallbackHero} alt={item.title} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="25vw" />
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase text-emerald-700">Agriculture</p>
                  <h3 className="mt-1 line-clamp-2 font-semibold">{item.title}</h3>
                  <p className="mt-2 font-bold text-emerald-700">{formatPrice(getPrice(item))}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SpecCard({ title, icon, data }: { title: string; icon: React.ReactNode; data: Record<string, string> }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-950">
        <span className="text-emerald-700">{icon}</span>
        {title}
      </h2>
      <dl className="mt-4 space-y-3 text-sm">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between gap-4 border-b border-gray-100 pb-2 last:border-0">
            <dt className="text-gray-500">{key}</dt>
            <dd className="font-bold text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
