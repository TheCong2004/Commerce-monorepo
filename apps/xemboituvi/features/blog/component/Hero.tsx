import Image from "next/image";

export default function BlogHero() {
  return (
    <section className="relative w-full h-[75vh] min-h-[500px] mt-4 rounded-[45px] overflow-hidden group">
      {/* Hình nền */}
      <div className="absolute inset-0">
        <Image
          src="/planetry08.png"
          alt="Banner"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          fill
        />
        {/* Overlay dải màu tối để nổi chữ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Nội dung */}
      <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-20 text-white">
        <div className="max-w-4xl">
          {/* Nhãn phân loại */}
          <div className="inline-block border-2 border-[#D4AF37]/70 rounded-full px-6 py-2 mb-6 bg-black/35 backdrop-blur-sm">
            <span className="text-sm font-bold uppercase tracking-widest">
              Phát triển Web
            </span>
          </div>

          {/* Tiêu đề */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight papyrus cursor-pointer">
            <span className="link-underline">
              Xây dựng Progressive Web Apps: Xóa nhòa <br />
              khoảng cách giữa Web và Di động
            </span>
          </h1>

          {/* Mô tả */}
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-medium mt-4">
            Tích hợp các phương pháp chánh niệm giúp lập trình viên nuôi dưỡng sự tập trung, 
            nâng cao khả năng giải quyết vấn đề và cân bằng giữa công việc và cuộc sống.
          </p>
        </div>
      </div>
    </section>
  );
}
