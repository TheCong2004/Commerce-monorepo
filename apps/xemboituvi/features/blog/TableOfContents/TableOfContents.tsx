'use client';

import React, { useEffect, useState, useRef } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const items: TOCItem[] = Array.from(headings).map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }));

    setTocItems(items);

    const contentElement = document.querySelector('.phongthuy-article-content');
    if (contentElement) {
      const realHeadings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
      Array.from(realHeadings).forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });
    }
  }, [content]);

  // 2. SỬA ĐỔI: Chỉ tự động cuộn mục lục trên màn hình lớn (Desktop)
  useEffect(() => {
    if (activeId) {
      // Kiểm tra nếu là Desktop (thường là width > 1024px theo breakpoint lg của Tailwind)
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) {
        const activeElement = document.querySelector(`[data-toc-id="${activeId}"]`);
        if (activeElement && navRef.current) {
          activeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
          });
        }
      }
    }
  }, [activeId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-100px 0px -66%', threshold: 0 }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav 
      ref={navRef}
      className="space-y-1 max-h-[70vh] overflow-y-auto custom-scrollbar"
    >
      {tocItems.length > 0 ? (
        tocItems.map((item) => (
          <button
            key={item.id}
            data-toc-id={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`block w-full text-left text-sm py-2.5 px-4 rounded-lg transition-all duration-300 border-l-2 ${
              activeId === item.id
                ? 'text-[#D4AF37] font-bold bg-[#D4AF37]/10 border-[#D4AF37] shadow-[inset_0_0_10px_rgba(212,175,55,0.1)]'
                : 'text-white/40 border-transparent hover:text-white/70 hover:bg-white/5'
            }`}
            style={{ 
              paddingLeft: `${(item.level - 1) * 16 + 16}px`,
              fontSize: item.level === 2 ? '0.9rem' : '0.8rem'
            }}
          >
            <span className={`mr-2 transition-opacity duration-300 ${activeId === item.id ? 'opacity-100' : 'opacity-0'}`}>◈</span>
            {item.text}
          </button>
        ))
      ) : (
        <div className="text-white/20 text-xs italic py-4 text-center">Đang cập nhật mục lục...</div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 10px;
        }
        nav {
          scroll-behavior: smooth;
        }
      `}</style>
    </nav>
  );
}