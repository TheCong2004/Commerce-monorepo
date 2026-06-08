"use client";

import { ReactNode, useState } from "react";
import { FiChevronDown, FiX, FiPackage, FiTruck, FiStar, FiEdit3, FiLayout, FiBookOpen, FiAlignJustify } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { blog, categories } from "./data";

const SIDEBAR_MENU: Array<{
  id: string;
  name: string;
  href: string;
  icon: ReactNode;
  color: string;
  children?: Array<{ name: string; href: string }>;
}> = [
  { id: "custom", name: 'Create Your Own', href: '/create-your-own', icon: <FiEdit3 />, color: "text-purple-600" },
  {
    id: "categories",
    name: 'Categories',
    href: '/collection',
    icon: <FiAlignJustify />,
    color: "text-slate-700",
    children: categories.map((category) => ({
      name: category.name,
      href: `/collection/${category.handle}`,
    })),
  },
  { id: "tracking", name: 'Order Tracking', href: '/order-tracking', icon: <FiTruck />, color: "text-blue-600" },
  { id: "new-year", name: "Happy New Year", href: '/happy-new-year', icon: <FiStar />, color: "text-red-600" },
  { id: "products", name: 'Products', href: '/collection', icon: <FiPackage />, color: "text-emerald-600" },
  { id: "designs", name: 'Explore Designs', href: '/designs', icon: <FiLayout />, color: "text-indigo-600" },
  { id: "ecart", name: "Free E-Cart", href: '/free-ecart', icon: <FiBookOpen />, color: "text-orange-600" },
  {
    id: "blog",
    name: 'Blog',
    href: '/blog/all-blog',
    icon: <FiBookOpen />,
    color: "text-amber-600",
    children: blog.map((post) => ({
      name: post.Title,
      href: `/blog/${post.documentId}`,
    })),
  },
];

const FOOTER_LINKS = [
  { name: 'Delivery', href: '/delivery' },
  { name: 'Returns', href: '/returns' },
  { name: 'Help Center', href: '/help' },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="absolute left-0 top-0 flex h-dvh w-[88%] max-w-[360px] flex-col bg-white shadow-2xl">

        {/* Header */}
        <div className="flex h-20 w-full flex-shrink-0 items-center justify-between border-b border-gray-100 bg-[#f6f7e6] px-5">
          <Image
            priority
            src="/FPT_Telecom_logo.svg"
            alt="FPT Telecom"
            width={170}
            height={52}
            className="h-12 w-auto object-contain"
          />
          <button
            onClick={onClose}
            className="rounded-full border border-gray-200 bg-white p-2 text-black shadow-sm transition-colors hover:bg-gray-100"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="flex flex-col gap-1">
            {SIDEBAR_MENU.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isExpanded = expandedMenu === item.id;
              const content = (
                <>
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl ${item.color} transition-transform group-hover:scale-110`}>
                      {item.icon}
                    </div>
                    <span className={`font-Inter text-[16px] font-semibold ${item.color}`}>
                      {item.name}
                    </span>
                  </div>
                  {hasChildren && (
                    <FiChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform group-hover:text-black ${isExpanded ? "rotate-180" : ""}`}
                    />
                  )}
                </>
              );

              return (
                <li key={item.id} className="border-b border-gray-50 last:border-0">
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() => setExpandedMenu(isExpanded ? null : item.id)}
                      className="group flex min-h-14 w-full items-center justify-between rounded-lg p-3 text-left transition-all hover:bg-gray-50"
                      aria-expanded={isExpanded}
                    >
                      {content}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex min-h-14 items-center justify-between rounded-lg p-3 transition-all hover:bg-gray-50"
                    >
                      {content}
                    </Link>
                  )}

                  {hasChildren && isExpanded && (
                    <div className="pb-3 pl-[64px] pr-2">
                      <div className="flex flex-col gap-1 border-l border-gray-100 pl-3">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className="rounded-md px-3 py-2 font-Inter text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-950"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Footer Links */}
          <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 px-3 pt-6">
            {FOOTER_LINKS.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onClick={onClose}
                className="text-[14px] font-Inter font-semibold text-gray-500 hover:text-black transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Slogan */}
          <div className="mt-8 rounded-md bg-gray-50 p-4">
            <p className="text-center font-Inter text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              Minimalist & Premium
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
