import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Database,
  Download,
  FileText,
  Heart,
  LockKeyhole,
  Mail,
  Megaphone,
  PlayCircle,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Workflow,
} from "lucide-react";
import { Button } from "@/shared/ui/button";

type DigitalMarketingDetailProps = {
  product: any;
  relatedProducts?: any[];
  onAddToCart: () => void;
  isLoading?: boolean;
};

const fallbackHero =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1400";

function formatPrice(cents: number) {
  return `$${((cents || 0) / 100).toFixed(2)}`;
}

function getPrice(product: any) {
  return product?.variants?.[0]?.calculated_price?.calculated_amount || product?.price || 0;
}

function getComparePrice(product: any) {
  return product?.variants?.[0]?.calculated_price?.original_amount || product?.originalPrice || 0;
}

function asList(value: unknown, fallback: string[]) {
  return Array.isArray(value) ? value.map(String).filter(Boolean).slice(0, 8) : fallback;
}

export default function DigitalMarketingDetail({
  product,
  relatedProducts = [],
  onAddToCart,
  isLoading,
}: DigitalMarketingDetailProps) {
  const metadata = (product?.metadata || {}) as Record<string, any>;
  const price = getPrice(product);
  const comparePrice = getComparePrice(product);
  const hasComparePrice = comparePrice > price;
  const hero = product?.thumbnail || product?.images?.[0]?.url || fallbackHero;
  const rating = Number(metadata.rating || product?.rating || 4.8);
  const reviewCount = Number(metadata.review_count || metadata.reviewCount || 148);
  const accessLabel = metadata.access_label || "Lifetime access";
  const tools = asList(metadata.tools, [
    "SEO audit checklist",
    "Ad creative templates",
    "Email automation flows",
    "Campaign dashboard",
  ]);
  const features = asList(metadata.features, [
    "Ready-to-use marketing templates",
    "Step-by-step setup guide",
    "Secure digital delivery after checkout",
    "Works for agencies, shops, and solo marketers",
  ]);

  return (
    <div className="bg-[#f7f9fb] text-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-700">Home</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <Link href="/collection/digital-product" className="hover:text-blue-700">Digital Products</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <Link href="/collection/digital-marketing" className="hover:text-blue-700">Digital Marketing</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="font-medium text-gray-900 line-clamp-1">{product.title}</span>
        </nav>

        <section className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm">
              <Image
                src={hero}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 720px, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
              <button className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
                <PlayCircle size={18} />
                View demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(product?.images || []).slice(0, 3).map((image: any, index: number) => (
                <div key={`${image.url}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 bg-white">
                  <Image src={image.url || hero} alt={`${product.title} ${index + 1}`} fill className="object-cover" sizes="30vw" />
                </div>
              ))}
              {(!product?.images || product.images.length < 2) && (
                <>
                  <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <BarChart3 className="text-blue-600" size={34} />
                  </div>
                  <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <Workflow className="text-emerald-600" size={34} />
                  </div>
                </>
              )}
            </div>
          </div>

          <aside className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                <Sparkles size={14} />
                Digital marketing
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{product.title}</h1>
              <p className="mt-3 text-base leading-7 text-gray-600">{product.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star size={18} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold">{rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <ShieldCheck size={17} />
                  Secure download
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-4xl font-bold text-blue-700">{formatPrice(price)}</span>
                {hasComparePrice && <span className="pb-1 text-gray-400 line-through">{formatPrice(comparePrice)}</span>}
                <span className="mb-1 rounded bg-emerald-50 px-2 py-1 text-xs font-bold uppercase text-emerald-700">
                  {accessLabel}
                </span>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button className="h-12 flex-1 gap-2 bg-emerald-600 text-white hover:bg-emerald-700" onClick={onAddToCart} disabled={isLoading}>
                  <Rocket size={18} />
                  Buy now
                </Button>
                <Button variant="outline" className="h-12 flex-1 border-blue-700 text-blue-700 hover:bg-blue-50" onClick={onAddToCart} disabled={isLoading}>
                  Add to cart
                </Button>
                <Button variant="outline" className="h-12 w-12 border-gray-300 px-0">
                  <Heart size={18} />
                </Button>
              </div>
              <ul className="mt-5 space-y-2 text-sm font-medium text-gray-700">
                {features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <LockKeyhole className="text-blue-700" size={22} />
                <p className="mt-2 text-sm font-bold">Protected delivery</p>
                <p className="mt-1 text-xs text-gray-500">Token download after payment</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <Download className="text-emerald-700" size={22} />
                <p className="mt-2 text-sm font-bold">Instant access</p>
                <p className="mt-1 text-xs text-gray-500">Files, templates, guides</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Included tools</h2>
            <div className="mt-4 space-y-3">
              {tools.map((tool, index) => {
                const icons = [Search, Megaphone, Mail, Database, BarChart3, FileText];
                const Icon = icons[index % icons.length];
                return (
                  <div key={tool} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                        <Icon size={19} />
                      </span>
                      <span className="font-semibold">{tool}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-400">v{index + 1}.0</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Product overview</h2>
            <p className="mt-3 leading-7 text-gray-600">
              This product is designed for selling real digital marketing assets through merchant data: templates,
              dashboards, checklists, campaign kits, and downloadable implementation guides. The storefront presents the
              product clearly, while merchant handles payment, order creation, and protected file delivery.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Campaign setup", "Launch with structured steps, creative assets, and channel checklists."],
                ["Analytics ready", "Use reporting templates to track ROI, CPC, leads, and conversion quality."],
                ["Client friendly", "Good for agencies selling repeatable systems or done-for-you files."],
                ["Secure commerce", "Download link is generated only after a paid order is created."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-lg bg-gray-50 p-4">
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold">Related digital marketing products</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.slice(0, 4).map((item) => (
                <Link key={item.id} href={`/product/${item.handle}`} className="group rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-gray-100">
                    <Image src={item.thumbnail || fallbackHero} alt={item.title} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="25vw" />
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase text-blue-700">Digital marketing</p>
                  <h3 className="mt-1 line-clamp-2 font-semibold">{item.title}</h3>
                  <p className="mt-2 font-bold text-blue-700">{formatPrice(getPrice(item))}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
