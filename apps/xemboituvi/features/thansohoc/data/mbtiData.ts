// src/data/mbtiData.ts

export type MbtiDimension = 'EI' | 'SN' | 'TF' | 'JP';

export const MBTI_QUESTIONS = [
  // --- Trục E - I (Năng lượng) ---
  {
    id: 1, dimension: 'EI' as MbtiDimension,
    question: "Sau một tuần làm việc căng thẳng, bạn thường:",
    options: [
      { text: "Rủ bạn bè đi ăn uống, vui chơi để xả stress", value: 'E' },
      { text: "Ở nhà đọc sách, xem phim hoặc ngủ một mình", value: 'I' }
    ]
  },
  {
    id: 2, dimension: 'EI' as MbtiDimension,
    question: "Trong các buổi tiệc xã giao, bạn thường:",
    options: [
      { text: "Chủ động bắt chuyện với nhiều người mới", value: 'E' },
      { text: "Chỉ nói chuyện với những người đã quen biết", value: 'I' }
    ]
  },
  {
    id: 3, dimension: 'EI' as MbtiDimension,
    question: "Bạn cảm thấy thế nào khi phải ở một mình quá lâu?",
    options: [
      { text: "Buồn chán, thiếu năng lượng", value: 'E' },
      { text: "Thoải mái, bình yên", value: 'I' }
    ]
  },
  {
    id: 4, dimension: 'EI' as MbtiDimension,
    question: "Khi làm việc nhóm, bạn thích:",
    options: [
      { text: "Thảo luận sôi nổi, brainstorm cùng mọi người", value: 'E' },
      { text: "Suy nghĩ độc lập rồi mới đóng góp ý kiến", value: 'I' }
    ]
  },
  {
    id: 5, dimension: 'EI' as MbtiDimension,
    question: "Bạn bè nhận xét bạn là người:",
    options: [
      { text: "Cởi mở, dễ gần, nói nhiều", value: 'E' },
      { text: "Trầm tính, kín đáo, biết lắng nghe", value: 'I' }
    ]
  },

  // --- Trục S - N (Nhận thức) ---
  {
    id: 6, dimension: 'SN' as MbtiDimension,
    question: "Khi tiếp nhận thông tin, bạn quan tâm đến:",
    options: [
      { text: "Các chi tiết cụ thể, số liệu thực tế", value: 'S' },
      { text: "Bức tranh tổng thể và ý nghĩa ẩn sau đó", value: 'N' }
    ]
  },
  {
    id: 7, dimension: 'SN' as MbtiDimension,
    question: "Bạn tin tưởng điều gì hơn?",
    options: [
      { text: "Kinh nghiệm thực tế đã được kiểm chứng", value: 'S' },
      { text: "Trực giác và linh cảm của bản thân", value: 'N' }
    ]
  },
  {
    id: 8, dimension: 'SN' as MbtiDimension,
    question: "Khi nghe kể chuyện, bạn thích:",
    options: [
      { text: "Những câu chuyện tả thực, rõ ràng đầu đuôi", value: 'S' },
      { text: "Những câu chuyện ẩn dụ, giàu trí tưởng tượng", value: 'N' }
    ]
  },
  {
    id: 9, dimension: 'SN' as MbtiDimension,
    question: "Bạn thường sống:",
    options: [
      { text: "Ở hiện tại, tận hưởng 'ngay lúc này'", value: 'S' },
      { text: "Ở tương lai, luôn lo nghĩ về những điều sắp tới", value: 'N' }
    ]
  },
  {
    id: 10, dimension: 'SN' as MbtiDimension,
    question: "Cách bạn giải quyết vấn đề mới:",
    options: [
      { text: "Tìm các giải pháp tiêu chuẩn đã có sẵn", value: 'S' },
      { text: "Tìm tòi những cách làm mới lạ, độc đáo", value: 'N' }
    ]
  },

  // --- Trục T - F (Quyết định) ---
  {
    id: 11, dimension: 'TF' as MbtiDimension,
    question: "Khi ra quyết định quan trọng, bạn dựa vào:",
    options: [
      { text: "Logic, lý trí và sự công bằng", value: 'T' },
      { text: "Cảm xúc, giá trị nhân văn và sự hòa hợp", value: 'F' }
    ]
  },
  {
    id: 12, dimension: 'TF' as MbtiDimension,
    question: "Nếu bạn của bạn làm sai, bạn sẽ:",
    options: [
      { text: "Phân tích cái sai để họ sửa đổi", value: 'T' },
      { text: "Động viên, an ủi cảm xúc của họ trước", value: 'F' }
    ]
  },
  {
    id: 13, dimension: 'TF' as MbtiDimension,
    question: "Bạn đánh giá cao đức tính nào hơn?",
    options: [
      { text: "Sự trung thực, thẳng thắn", value: 'T' },
      { text: "Sự khéo léo, tế nhị", value: 'F' }
    ]
  },
  {
    id: 14, dimension: 'TF' as MbtiDimension,
    question: "Trong tranh luận, mục tiêu của bạn là:",
    options: [
      { text: "Tìm ra chân lý đúng/sai", value: 'T' },
      { text: "Không làm mất lòng đối phương", value: 'F' }
    ]
  },
  {
    id: 15, dimension: 'TF' as MbtiDimension,
    question: "Bạn thường bị thuyết phục bởi:",
    options: [
      { text: "Lập luận chặt chẽ, bằng chứng rõ ràng", value: 'T' },
      { text: "Câu chuyện cảm động, sự nhiệt tình", value: 'F' }
    ]
  },

  // --- Trục J - P (Lối sống) ---
  {
    id: 16, dimension: 'JP' as MbtiDimension,
    question: "Phong cách làm việc của bạn là:",
    options: [
      { text: "Lên kế hoạch chi tiết và tuân thủ nó", value: 'J' },
      { text: "Linh hoạt, tùy cơ ứng biến, làm sát deadline", value: 'P' }
    ]
  },
  {
    id: 17, dimension: 'JP' as MbtiDimension,
    question: "Bàn làm việc của bạn thường:",
    options: [
      { text: "Gọn gàng, mọi thứ đều có chỗ quy định", value: 'J' },
      { text: "Hơi bừa bộn nhưng bạn vẫn biết đồ ở đâu", value: 'P' }
    ]
  },
  {
    id: 18, dimension: 'JP' as MbtiDimension,
    question: "Khi đi du lịch, bạn thích:",
    options: [
      { text: "Lên lịch trình cụ thể từng ngày", value: 'J' },
      { text: "Đi đến đâu tính đến đó", value: 'P' }
    ]
  },
  {
    id: 19, dimension: 'JP' as MbtiDimension,
    question: "Bạn ghét điều gì hơn?",
    options: [
      { text: "Sự thay đổi bất ngờ vào phút chót", value: 'J' },
      { text: "Sự rập khuôn, nhàm chán lặp đi lặp lại", value: 'P' }
    ]
  },
  {
    id: 20, dimension: 'JP' as MbtiDimension,
    question: "Trước khi bắt đầu dự án, bạn:",
    options: [
      { text: "Muốn chốt xong mọi quy trình", value: 'J' },
      { text: "Muốn để ngỏ để có thể thay đổi sau này", value: 'P' }
    ]
  }
];

export interface MbtiProfile {
  title: string;
  nickname: string;
  description: string;
  strengths: string[];
  careers: string[];
}

export const MBTI_PROFILES: Record<string, MbtiProfile> = {
  // Nhà Phân Tích (Analysts) - NT
  "INTJ": {
    title: "Nhà Kiến Tạo", nickname: "Architect",
    description: "Người có tư duy chiến lược giàu trí tưởng tượng. Luôn có kế hoạch cho mọi việc.",
    strengths: ["Thông minh", "Quyết đoán", "Độc lập"],
    careers: ["Kiến trúc sư", "Kỹ sư phần mềm", "Luật sư"]
  },
  "INTP": {
    title: "Nhà Tư Duy", nickname: "Logician",
    description: "Nhà phát minh đầy sáng tạo với khát khao mãnh liệt về tri thức.",
    strengths: ["Phân tích giỏi", "Sáng tạo", "Tư duy mở"],
    careers: ["Nhà khoa học", "Lập trình viên", "Giáo sư"]
  },
  "ENTJ": {
    title: "Nhà Điều Hành", nickname: "Commander",
    description: "Nhà lãnh đạo táo bạo, giàu trí tưởng tượng và ý chí mạnh mẽ.",
    strengths: ["Hiệu quả", "Năng lượng cao", "Tự tin"],
    careers: ["CEO", "Doanh nhân", "Quản lý dự án"]
  },
  "ENTP": {
    title: "Người Tranh Biện", nickname: "Debater",
    description: "Người tư duy nhạy bén và tò mò, không bao giờ từ chối một thử thách trí tuệ.",
    strengths: ["Thông thái", "Linh hoạt", "Lôi cuốn"],
    careers: ["Luật sư", "Doanh nhân", "Marketing"]
  },

  // Nhà Ngoại Giao (Diplomats) - NF
  "INFJ": {
    title: "Người Che Chở", nickname: "Advocate",
    description: "Người hướng nội, trầm lặng và đầy cảm hứng. Luôn muốn làm điều tốt cho đời.",
    strengths: ["Sâu sắc", "Sáng tạo", "Vị tha"],
    careers: ["Tư vấn tâm lý", "Nhà văn", "Hoạt động xã hội"]
  },
  "INFP": {
    title: "Người Hòa Giải", nickname: "Mediator",
    description: "Người tốt bụng, vị tha và luôn mong muốn giúp đỡ một lý tưởng tốt đẹp.",
    strengths: ["Đam mê", "Rộng lượng", "Lý tưởng hóa"],
    careers: ["Nhà văn", "Nghệ sĩ", "Nhà thiết kế"]
  },
  "ENFJ": {
    title: "Người Chỉ Dẫn", nickname: "Protagonist",
    description: "Nhà lãnh đạo lôi cuốn và truyền cảm hứng, có khả năng thôi miên người nghe.",
    strengths: ["Đáng tin cậy", "Vị tha", "Lãnh đạo tự nhiên"],
    careers: ["Giáo viên", "Quản lý nhân sự", "Diễn giả"]
  },
  "ENFP": {
    title: "Người Truyền Cảm Hứng", nickname: "Campaigner",
    description: "Người nhiệt tình, sáng tạo và hòa đồng. Luôn tìm thấy lý do để mỉm cười.",
    strengths: ["Tò mò", "Nhiệt huyết", "Giao tiếp giỏi"],
    careers: ["Nhà báo", "Diễn viên", "Tổ chức sự kiện"]
  },

  // Nhà Bảo Hộ (Sentinels) - SJ
  "ISTJ": {
    title: "Người Trách Nhiệm", nickname: "Logistician",
    description: "Người thực tế và luôn hành động dựa trên sự thật. Vô cùng đáng tin cậy.",
    strengths: ["Trung thực", "Có trách nhiệm", "Bình tĩnh"],
    careers: ["Kế toán", "Quân đội", "Kiểm toán"]
  },
  "ISFJ": {
    title: "Người Nuôi Dưỡng", nickname: "Defender",
    description: "Người bảo vệ tận tụy và ấm áp, luôn sẵn sàng bảo vệ những người mình yêu thương.",
    strengths: ["Hỗ trợ", "Đáng tin", "Kiên nhẫn"],
    careers: ["Y tá", "Giáo viên mầm non", "Chăm sóc khách hàng"]
  },
  "ESTJ": {
    title: "Người Giám Sát", nickname: "Executive",
    description: "Nhà quản trị xuất sắc, giỏi trong việc quản lý sự vật và con người.",
    strengths: ["Tận tâm", "Có tổ chức", "Thẳng thắn"],
    careers: ["Quản lý", "Cảnh sát", "Thẩm phán"]
  },
  "ESFJ": {
    title: "Người Quan Tâm", nickname: "Consul",
    description: "Người tận tâm, chu đáo và luôn sẵn sàng giúp đỡ mọi người.",
    strengths: ["Trung thành", "Nhạy cảm", "Giỏi kết nối"],
    careers: ["Y tế", "Công tác xã hội", "Kinh doanh"]
  },

  // Nhà Thám Hiểm (Explorers) - SP
  "ISTP": {
    title: "Nhà Kỹ Thuật", nickname: "Virtuoso",
    description: "Người thử nghiệm táo bạo và thực tế, làm chủ mọi loại công cụ.",
    strengths: ["Lạc quan", "Sáng tạo", "Thực tế"],
    careers: ["Kỹ sư", "Phi công", "Thợ cơ khí"]
  },
  "ISFP": {
    title: "Người Nghệ Sĩ", nickname: "Adventurer",
    description: "Người nghệ sĩ linh hoạt, quyến rũ, luôn sẵn sàng thử nghiệm cái mới.",
    strengths: ["Quyến rũ", "Nhạy cảm", "Đam mê"],
    careers: ["Thiết kế thời trang", "Nhiếp ảnh", "Đầu bếp"]
  },
  "ESTP": {
    title: "Người Thực Thi", nickname: "Entrepreneur",
    description: "Người thông minh, năng động và rất nhạy bén. Luôn thích mạo hiểm.",
    strengths: ["Táo bạo", "Thực tế", "Hòa đồng"],
    careers: ["Sale", "Marketing", "Vận động viên"]
  },
  "ESFP": {
    title: "Người Trình Diễn", nickname: "Entertainer",
    description: "Người ngẫu hứng, năng động và nhiệt tình. Cuộc sống không bao giờ tẻ nhạt.",
    strengths: ["Táo bạo", "Nguyên bản", "Trình diễn tốt"],
    careers: ["Diễn viên", "Hướng dẫn viên", "Tư vấn bán hàng"]
  }
};