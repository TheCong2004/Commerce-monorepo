import React from 'react';
import Link from 'next/link';

const FeaturedPosts = () => {
  // Dữ liệu mẫu có thêm slug để định hướng URL
  const featuredData = {
    bigPost: {
      slug: "suc-manh-cua-javascript-frameworks",
      category: "Javascript",
      title: "Sức Mạnh Của Các Framework JavaScript: So Sánh Angular, React Và Vue.js",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000"
    },
    smallPosts: [
      {
        slug: "tu-dong-hoa-cac-tac-vu-lap-lai",
        category: "Năng Suất",
        title: "Tự Động Hóa Các Tác Vụ Lặp Lại: Thủ Thuật Tăng Năng Suất Cho Lập Trình Viên",
        date: "08 Tháng 5, 2024",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600"
      },
      {
        slug: "quy-tac-viet-code-sach",
        category: "Chất Lượng Code",
        title: "Những Quy Tắc Vàng Để Viết Mã Nguồn Sạch Và Dễ Bảo Trì",
        date: "08 Tháng 5, 2024",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=600"
      }
    ]
  };

  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold papyrus mb-10 text-gray-900">Bài Viết Nổi Bật</h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- BÊN TRÁI: Bài viết lớn (Big Post) --- */}
        <Link href={`/blog/${featuredData.bigPost.slug}`} className="relative h-[430px] rounded-[32px] overflow-hidden group cursor-pointer shadow-xl">
          <img 
            src={featuredData.bigPost.image} 
            alt={featuredData.bigPost.category}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
             {/* Thẻ phân loại */}
            <div className="mb-4">
              <span className="border border-white/50 bg-black/40 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold">
                {featuredData.bigPost.category}
              </span>
            </div>
            {/* Tiêu đề */}
            <h3 className="text-3xl font-bold papyrus">
              <span className="link-underline">
                {featuredData.bigPost.title}
              </span>
            </h3>
          </div>
        </Link>

        {/* --- BÊN PHẢI: Danh sách 2 bài nhỏ --- */}
        <div className="flex flex-col gap-8 justify-start">
          
          {featuredData.smallPosts.map((post, index) => (
            <Link 
              key={index} 
              href={`/blog/${post.slug}`} 
              className="flex flex-col lg:flex-row gap-6 group cursor-pointer"
            >
              <div className="w-full lg:w-1/3 h-48 rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="w-full lg:w-2/3 flex flex-col">
                <span className="text-purple-600 font-bold uppercase text-xs tracking-widest mb-2">
                  {post.category}
                </span>
                <h4>
                  <span className="text-xl font-bold link-underline papyrus">
                    {post.title}
                  </span>
                </h4>
                <span className="text-gray-500 text-sm mt-2">{post.date}</span>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;