// src/data/discQuestions.ts

export type PersonalityType = 'D' | 'I' | 'S' | 'C';

export const DISC_QUESTIONS = [
  {
    id: 1,
    question: "Khi đối mặt với thử thách, bạn thường:",
    options: [
      { text: "Hành động ngay, quyết liệt giải quyết", type: 'D' },
      { text: "Thảo luận và tìm kiếm sự ủng hộ từ người khác", type: 'I' },
      { text: "Bình tĩnh quan sát, chờ thời cơ thích hợp", type: 'S' },
      { text: "Phân tích kỹ lưỡng dữ liệu trước khi làm", type: 'C' },
    ],
  },
  {
    id: 2,
    question: "Phong cách giao tiếp của bạn là:",
    options: [
      { text: "Thẳng thắn, đi vào trọng tâm vấn đề", type: 'D' },
      { text: "Hào hứng, kể chuyện lôi cuốn, cởi mở", type: 'I' },
      { text: "Lắng nghe nhiều hơn nói, nhẹ nhàng", type: 'S' },
      { text: "Chi tiết, logic, rõ ràng, dựa trên thực tế", type: 'C' },
    ],
  },
  {
    id: 3,
    question: "Trong công việc, điều gì quan trọng nhất với bạn?",
    options: [
      { text: "Kết quả và mục tiêu đạt được", type: 'D' },
      { text: "Sự ghi nhận và mối quan hệ với đồng nghiệp", type: 'I' },
      { text: "Sự ổn định và hòa hợp trong nhóm", type: 'S' },
      { text: "Sự chính xác và chất lượng công việc", type: 'C' },
    ],
  },
  {
    id: 4,
    question: "Bạn sợ điều gì nhất?",
    options: [
      { text: "Sự thất bại, mất quyền kiểm soát", type: 'D' },
      { text: "Bị từ chối, mất thiện cảm từ người khác", type: 'I' },
      { text: "Sự thay đổi đột ngột, mất an toàn", type: 'S' },
      { text: "Sai sót, bị chỉ trích về chuyên môn", type: 'C' },
    ],
  },
  {
    id: 5,
    question: "Khi làm việc nhóm, vai trò của bạn thường là:",
    options: [
      { text: "Người lãnh đạo, đưa ra quyết định", type: 'D' },
      { text: "Người truyền cảm hứng, kết nối mọi người", type: 'I' },
      { text: "Người hỗ trợ, giữ hòa khí cho nhóm", type: 'S' },
      { text: "Người lập kế hoạch, kiểm soát chi tiết", type: 'C' },
    ],
  },
  {
    id: 6,
    question: "Khi gặp áp lực cao, bạn có xu hướng:",
    options: [
      { text: "Trở nên nóng nảy, áp đặt hơn", type: 'D' },
      { text: "Muốn nói chuyện, chia sẻ để giải tỏa", type: 'I' },
      { text: "Im lặng, thu mình lại hoặc cam chịu", type: 'S' },
      { text: "Căng thẳng, soi xét kỹ từng lỗi nhỏ", type: 'C' },
    ],
  },
  {
    id: 7,
    question: "Bạn thích môi trường làm việc như thế nào?",
    options: [
      { text: "Có tính cạnh tranh, cơ hội thăng tiến nhanh", type: 'D' },
      { text: "Vui vẻ, thoải mái, được tự do sáng tạo", type: 'I' },
      { text: "Thân thiện, ổn định, ít biến động", type: 'S' },
      { text: "Có quy trình rõ ràng, ngăn nắp, trật tự", type: 'C' },
    ],
  },
  {
    id: 8,
    question: "Cách bạn ra quyết định:",
    options: [
      { text: "Nhanh chóng, dựa trên trực giác và mục tiêu", type: 'D' },
      { text: "Dựa trên cảm xúc và ý kiến của người khác", type: 'I' },
      { text: "Cân nhắc kỹ lưỡng, tránh rủi ro tối đa", type: 'S' },
      { text: "Dựa trên số liệu, logic và phân tích", type: 'C' },
    ],
  },
  {
    id: 9,
    question: "Mọi người thường nhận xét bạn là người:",
    options: [
      { text: "Mạnh mẽ, quyết đoán, đôi khi hơi cứng nhắc", type: 'D' },
      { text: "Hoạt bát, vui vẻ, nhưng đôi khi hay quên", type: 'I' },
      { text: "Hiền lành, tốt bụng, đôi khi thiếu chính kiến", type: 'S' },
      { text: "Thông minh, cẩn thận, đôi khi quá cầu toàn", type: 'C' },
    ],
  },
  {
    id: 10,
    question: "Khi tranh luận, bạn sẽ:",
    options: [
      { text: "Cố gắng chiến thắng và bảo vệ quan điểm", type: 'D' },
      { text: "Cố gắng thuyết phục bằng sự khéo léo", type: 'I' },
      { text: "Nhường nhịn để tránh xung đột leo thang", type: 'S' },
      { text: "Dùng lý lẽ và bằng chứng để chứng minh", type: 'C' },
    ],
  },
  {
    id: 11,
    question: "Mục tiêu sống của bạn thiên về:",
    options: [
      { text: "Quyền lực, danh vọng và thành tựu", type: 'D' },
      { text: "Sự nổi tiếng, được yêu mến và vui vẻ", type: 'I' },
      { text: "Sự bình yên, hạnh phúc gia đình", type: 'S' },
      { text: "Sự hiểu biết, trí tuệ và sự hoàn hảo", type: 'C' },
    ],
  },
  {
    id: 12,
    question: "Bạn ghét nhất kiểu người:",
    options: [
      { text: "Lề mề, thiếu quyết đoán, không hiệu quả", type: 'D' },
      { text: "Khô khan, nhàm chán, quá nghiêm túc", type: 'I' },
      { text: "Hay gây gổ, to tiếng, hung hăng", type: 'S' },
      { text: "Cẩu thả, làm việc thiếu suy nghĩ", type: 'C' },
    ],
  },
  {
    id: 13,
    question: "Khi đi mua sắm, bạn thường:",
    options: [
      { text: "Mua nhanh món mình cần rồi về", type: 'D' },
      { text: "Mua những món bắt mắt, độc đáo", type: 'I' },
      { text: "Mua những món quen thuộc, bền, giá tốt", type: 'S' },
      { text: "So sánh giá cả, đọc kỹ thành phần trước khi mua", type: 'C' },
    ],
  },
  {
    id: 14,
    question: "Phản ứng của bạn với sự thay đổi:",
    options: [
      { text: "Thích thú nếu nó mang lại cơ hội mới", type: 'D' },
      { text: "Hào hứng, dễ dàng thích nghi", type: 'I' },
      { text: "Lo lắng, cần thời gian để làm quen", type: 'S' },
      { text: "Nghi ngờ, cần biết rõ lý do và kế hoạch", type: 'C' },
    ],
  },
  {
    id: 15,
    question: "Khi rảnh rỗi, bạn thích:",
    options: [
      { text: "Tham gia các hoạt động thể thao, cạnh tranh", type: 'D' },
      { text: "Tụ tập bạn bè, tiệc tùng, giao lưu", type: 'I' },
      { text: "Nghỉ ngơi tại nhà, đọc sách, xem phim", type: 'S' },
      { text: "Nghiên cứu, học hỏi thêm kiến thức mới", type: 'C' },
    ],
  },
  {
    id: 16,
    question: "Trong một dự án, bạn muốn:",
    options: [
      { text: "Được toàn quyền quyết định hướng đi", type: 'D' },
      { text: "Được làm việc cùng mọi người vui vẻ", type: 'I' },
      { text: "Được hướng dẫn cụ thể cách làm", type: 'S' },
      { text: "Được cung cấp đầy đủ thông tin chi tiết", type: 'C' },
    ],
  },
  {
    id: 17,
    question: "Điểm mạnh lớn nhất của bạn:",
    options: [
      { text: "Khả năng giải quyết vấn đề", type: 'D' },
      { text: "Khả năng giao tiếp, thuyết phục", type: 'I' },
      { text: "Sự kiên nhẫn và thấu hiểu", type: 'S' },
      { text: "Sự tỉ mỉ và chính xác", type: 'C' },
    ],
  },
  {
    id: 18,
    question: "Khi ai đó làm sai, bạn sẽ:",
    options: [
      { text: "Chỉ trích thẳng thắn để họ sửa ngay", type: 'D' },
      { text: "Góp ý nhẹ nhàng, động viên họ", type: 'I' },
      { text: "Bỏ qua hoặc tìm cách sửa giúp họ", type: 'S' },
      { text: "Phân tích lỗi sai để họ hiểu nguyên nhân", type: 'C' },
    ],
  },
  {
    id: 19,
    question: "Bạn cảm thấy tự tin nhất khi:",
    options: [
      { text: "Đang nắm quyền kiểm soát tình huống", type: 'D' },
      { text: "Đang được mọi người chú ý, khen ngợi", type: 'I' },
      { text: "Đang ở trong môi trường quen thuộc", type: 'S' },
      { text: "Đang nắm rõ mọi thông tin chính xác", type: 'C' },
    ],
  },
  {
    id: 20,
    question: "Khuyết điểm của bạn có thể là:",
    options: [
      { text: "Thiếu kiên nhẫn, dễ nổi nóng", type: 'D' },
      { text: "Thiếu tập trung, hay làm việc cảm tính", type: 'I' },
      { text: "Thiếu quyết đoán, hay do dự", type: 'S' },
      { text: "Quá kỹ tính, hay soi xét chi tiết", type: 'C' },
    ],
  },
  {
    id: 21,
    question: "Bạn thích được khen ngợi về:",
    options: [
      { text: "Thành tích và năng lực làm việc", type: 'D' },
      { text: "Ngoại hình và tính cách thú vị", type: 'I' },
      { text: "Sự tốt bụng và sự hỗ trợ nhiệt tình", type: 'S' },
      { text: "Sự thông minh và kiến thức sâu rộng", type: 'C' },
    ],
  },
  {
    id: 22,
    question: "Khi bắt đầu một công việc mới, bạn sẽ:",
    options: [
      { text: "Hỏi ngay về mục tiêu và quyền hạn", type: 'D' },
      { text: "Làm quen với các đồng nghiệp mới", type: 'I' },
      { text: "Tìm hiểu văn hóa và quy định công ty", type: 'S' },
      { text: "Đọc kỹ tài liệu hướng dẫn công việc", type: 'C' },
    ],
  },
  {
    id: 23,
    question: "Bạn thường giải quyết xung đột bằng cách:",
    options: [
      { text: "Áp đảo đối phương để kết thúc nhanh", type: 'D' },
      { text: "Dùng sự hài hước để giảm căng thẳng", type: 'I' },
      { text: "Tìm tiếng nói chung, nhượng bộ", type: 'S' },
      { text: "Dựa vào quy tắc để phân xử đúng sai", type: 'C' },
    ],
  },
  {
    id: 24,
    question: "Phương châm làm việc của bạn:",
    options: [
      { text: "Hiệu quả là trên hết", type: 'D' },
      { text: "Vui vẻ là trên hết", type: 'I' },
      { text: "Đoàn kết là trên hết", type: 'S' },
      { text: "Chính xác là trên hết", type: 'C' },
    ],
  },
];