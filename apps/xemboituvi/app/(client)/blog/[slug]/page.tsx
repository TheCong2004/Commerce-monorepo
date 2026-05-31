import { fetchPhongThuySoArticleBySlug } from '@/lib/strapi-api';

import GoldenFrame from '@/components/ui/GoldenGlowCard';
import TableOfContents from '@/features/blog/TableOfContents/TableOfContents';

// 1. DỮ LIỆU MẶC ĐỊNH NẾU TRANG KHÔNG TRẢ VỀ KẾT QUẢ
const DEFAULT_ARTICLE = {
  title: "Cẩm Nang Phong Thủy Nhà Ở Toàn Tập: Đón Cát Tường, Tránh Hung Hiểm",
  description: "Bài viết chi tiết hướng dẫn cách tự xem phong thủy nhà ở, cách bố trí vật phẩm chiêu tài và những đại kỵ cần tránh để gia đình luôn bình an, thịnh vượng.",
  image_urls: ["https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=1200"],
  content: `
    <h2>1. Hiểu đúng về phong thủy trong đời sống hiện đại</h2>
    <p>Phong thủy không phải là điều gì đó thần bí, mà là bộ môn khoa học nghiên cứu sự ảnh hưởng của gió, khí, mạch nước đến đời sống hạnh phúc của con người. Một ngôi nhà hợp phong thủy sẽ tạo ra dòng năng lượng tích cực (Sanh khí).</p>
    
    <h2>2. Cách bố trí các không gian chính trong nhà</h2>
    <p>Mỗi khu vực trong nhà đại diện cho một phương diện cuộc sống. Việc sắp xếp đúng giúp dòng khí lưu thông hài hòa.</p>
    
    <h3>2.1. Phòng khách - Nơi tụ khí của gia đình</h3>
    <p>Phòng khách nên đặt ở vị trí trung tâm, gần cửa chính. Ghế sofa nên dựa lưng vào tường vững chãi, không nên đặt dưới xà ngang để tránh cảm giác bị áp lực.</p>
    
    <h3>2.2. Nhà bếp - Biểu tượng của tài lộc và sức khỏe</h3>
    <p>Bếp nấu không được đối diện với cửa nhà vệ sinh hoặc vòi nước (Hỏa khắc Thủy). Hướng bếp tốt nhất nên là hướng hung để nhìn về hướng cát.</p>
    
    <h3>2.3. Phòng ngủ - Nơi phục hồi năng lượng</h3>
    <p>Giường ngủ không nên đối diện trực tiếp với gương soi hoặc cửa ra vào. Màu sắc trong phòng ngủ nên là những tông màu ấm, nhẹ nhàng như kem, nâu nhạt.</p>

    <h2>3. Những đại kỵ phong thủy thường gặp và cách hóa giải</h2>
    <p>Nếu chẳng may ngôi nhà rơi vào những thế xấu, bạn có thể áp dụng các biện pháp hóa giải đơn giản sau đây.</p>
    
    <h3>3.1. Thế "Xuyên tâm sát"</h3>
    <p>Đây là trường hợp cửa trước nhìn thông thẳng ra cửa sau. Cách hóa giải là đặt một tấm bình phong hoặc chậu cây cảnh lớn giữa hai cửa để ngăn dòng khí thoát ra quá nhanh.</p>
    
    <h3>3.2. Nhà đối diện cột điện hoặc vật nhọn</h3>
    <p>Bạn có thể treo gương bát quái lồi ở phía trước cửa để phản xạ các dòng năng lượng xấu (Sát khí) quay trở lại.</p>

    <h2>4. Vật phẩm phong thủy chiêu tài lộc năm 2026</h2>
    <p>Sử dụng các vật phẩm đúng cách sẽ bổ trợ rất tốt cho mệnh chủ:</p>
    <ul>
      <li><strong>Tỳ hưu:</strong> Linh vật giữ của, nên đặt hướng ra cửa chính.</li>
      <li><strong>Cây Kim Tiền:</strong> Đặt ở góc Đông Nam của phòng khách để kích hoạt tài vận.</li>
      <li><strong>Thác nước phong thủy:</strong> Hành Thủy giúp luân chuyển năng lượng tích cực.</li>
    </ul>

    <h2>5. Lời kết từ chuyên gia phong thủy</h2>
    <p>Phong thủy cốt ở tâm người. Một ngôi nhà sạch sẽ, gọn gàng và tràn đầy yêu thương chính là phong thủy tốt nhất. Hãy luôn giữ cho không gian sống thông thoáng để đón nhận những điều tốt đẹp nhất.</p>
  `
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// 2. Chuyển ArticlePage thành async function
export default async function ArticlePage({ params }: Props) {
  // Đợi giải mã slug từ params (Next.js 14+ yêu cầu await params)
  const { slug } = params;
  
  let data = null;
  try {
    // Gọi API từ Strapi
    data = await fetchPhongThuySoArticleBySlug(slug);
  } catch (error) {
    console.error("Lỗi fetch dữ liệu Strapi:", error);
  }

  // Nếu không có dữ liệu từ Strapi, dùng dữ liệu mặc định
  const article = data || DEFAULT_ARTICLE;

  return (
    <main className="min-h-screen bg-[#0a0a0a] pb-20 pt-24 font-serif">
      {/* 1. Header Section */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <GoldenFrame className="text-center py-10">
          <h1 className="text-3xl md:text-5xl font-black text-[#D4AF37] mb-6 leading-tight uppercase tracking-wider drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-white/60 text-lg md:text-xl italic max-w-3xl mx-auto leading-relaxed border-t border-[#D4AF37]/20 pt-6">
              "{article.description}"
            </p>
          )}
        </GoldenFrame>
      </div>

      {/* 2. Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 order-1">
          <div className="lg:sticky lg:top-28">
            <GoldenFrame className="p-4">
               <h3 className="text-[#D4AF37] font-bold uppercase tracking-widest text-sm mb-4 border-b border-[#D4AF37]/20 pb-2">
                 Mục lục bài viết
               </h3>
               <TableOfContents content={article.content || ''} />
            </GoldenFrame>
          </div>
        </aside>

        <article className="w-full lg:w-3/4 order-2">
          <GoldenFrame>
            {article.image_urls && article.image_urls.length > 0 && (
              <div className="mb-10 overflow-hidden rounded-xl border border-[#D4AF37]/20 shadow-2xl">
                <img 
                  src={article.image_urls[0]} 
                  className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-all duration-700" 
                  alt={article.title} 
                />
              </div>
            )}

            <div
              className="phongthuy-article-content prose prose-invert lg:prose-xl max-w-none 
                         text-white/80 leading-[1.8]
                         prose-h2:text-2xl prose-h2:font-black prose-h2:text-[#D4AF37] prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-[#D4AF37]/20
                         prose-h3:text-xl prose-h3:font-bold prose-h3:text-[#D4AF37]/80 prose-h3:mt-8
                         prose-p:mb-6 prose-strong:text-[#D4AF37]
                         prose-li:text-white/70"
              dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />
          </GoldenFrame>
        </article>
      </div>
    </main>
  );
}