"use client";
import React, { useState } from 'react';
import Link from 'next/link'; // Import Link từ next/link

const RecentPosts = () => {
  // 1. Thêm trường slug cho từng bài viết để định nghĩa đường dẫn URL
  const allPosts = [
    { id: 1, slug: "mindfulness-and-meditation", title: "Chánh niệm và Thiền định...", category: "NĂNG SUẤT", date: "03 Tháng 1, 2023", image: "https://picsum.photos/600/400?1" },
    { id: 2, slug: "mastering-css-grid", title: "Làm chủ bố cục CSS Grid...", category: "CSS", date: "12 Tháng 11, 2022", image: "https://picsum.photos/600/400?2" },
    { id: 3, slug: "rise-of-pwa", title: "Sự trỗi dậy của Progressive Web Apps...", category: "PWA", date: "12 Tháng 11, 2022", image: "https://picsum.photos/600/400?3" },
    { id: 4, slug: "productivity-hacks", title: "Tự động hóa các tác vụ lặp lại...", category: "NĂNG SUẤT", date: "03 Tháng 1, 2023", image: "https://picsum.photos/600/400?4" },
    { id: 5, slug: "clean-code-practices", title: "Quy tắc viết Code sạch...", category: "CSS", date: "12 Tháng 11, 2022", image: "https://picsum.photos/600/400?5" },
    { id: 6, slug: "web-development-trends", title: "Xu hướng tương lai của Web Dev...", category: "PWA", date: "12 Tháng 11, 2022", image: "https://picsum.photos/600/400?6" },
    { id: 7, slug: "react-server-components", title: "Bài viết thứ 7 mới thêm...", category: "REACT", date: "20 Tháng 2, 2024", image: "https://picsum.photos/600/400?7" },
    { id: 8, slug: "nextjs-15-features", title: "Bài viết thứ 8 mới thêm...", category: "NEXTJS", date: "21 Tháng 2, 2024", image: "https://picsum.photos/600/400?8" },
  ];

  const [showAll, setShowAll] = useState(false);
  const visiblePosts = showAll ? allPosts : allPosts.slice(0, 6);

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      {/* Phần đầu trang */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold papyrus text-gray-900">Bài viết gần đây</h2>
        
        {!showAll && allPosts.length > 6 && (
          <button 
            onClick={() => setShowAll(true)}
            className="text-purple-600 papyrus font-semibold border-b-2 border-purple-600 hover:text-purple-800 transition-all"
          >
            xem tất cả
          </button>
        )}
      </div>

      {/* Lưới bài viết */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {visiblePosts.map((post) => (
          /* 2. Bọc toàn bộ Card trong Link để có thể click được */
          <Link key={post.id} href={`/blog/${post.slug}`} className="group cursor-pointer">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-5">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover  transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <span className="text-purple-600 font-bold  text-xs tracking-widest uppercase block mb-3">
              {post.category}
            </span>

            <h3 className="text-xl font-bold leading-tight papyrus mb-4 text-gray-900">
              <span className="link-underline">
                {post.title}
              </span>
            </h3>

            <p className="text-gray-500 text-sm font-medium">
              {post.date}
            </p>
          </Link>
        ))}
      </div>

      {showAll && (
        <div className="mt-12 text-center">
          <button 
            onClick={() => setShowAll(false)}
            className="px-8 py-3 bg-gray-100 rounded-full font-semibold hover:bg-gray-200 transition-all"
          >
            Ẩn bớt
          </button>
        </div>
      )}
    </section>
  );
};

export default RecentPosts;