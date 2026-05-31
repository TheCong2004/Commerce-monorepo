export interface KidProfile {
  title: string;        // Tiêu đề (VD: Nhà Lãnh Đạo Nhí)
  description: string;  // Mô tả tính cách (Bạn đã dùng personality, tôi đổi tên cho khớp Page)
  strengths: string[];  // Danh sách thế mạnh
  challenges: string[]; // Danh sách lời khuyên/thách thức
}

export const KID_NUMBERS: Record<number, KidProfile> = {
  1: {
    title: "Nhà Lãnh Đạo Nhí",
    description: "Bé là một 'nhà lãnh đạo nhí' mạnh mẽ, độc lập và đầy quyết tâm. Bé thích tự mình khám phá thế giới và thường có xu hướng muốn làm chủ mọi tình huống.",
    strengths: ["Tính độc lập cao", "Quyết đoán", "Khả năng tiên phong"],
    challenges: [
      "Cho bé quyền lựa chọn các việc nhỏ (như chọn quần áo, món ăn) để tôn trọng tính độc lập.",
      "Khen ngợi nỗ lực cá nhân thay vì chỉ khen kết quả.",
      "Dạy bé cách lắng nghe và chia sẻ với bạn bè để giảm cái tôi quá lớn."
    ]
  },
  2: {
    title: "Sứ Giả Hòa Bình",
    description: "Bé rất nhạy cảm, giàu lòng trắc ẩn và cực kỳ yêu hòa bình. Bé có khả năng thấu hiểu cảm xúc của người khác từ rất sớm và thích làm việc cùng mọi người.",
    strengths: ["Lòng trắc ẩn", "Khả năng thấu cảm", "Làm việc nhóm tốt"],
    challenges: [
      "Tạo môi trường yên bình, tránh những tranh cãi gay gắt trước mặt bé.",
      "Khuyến khích bé nói ra suy nghĩ của mình, tránh để bé kìm nén cảm xúc.",
      "Dạy bé cách tự tin vào bản thân thay vì quá phụ thuộc vào ý kiến người khác."
    ]
  },
  3: {
    title: "Ngôi Sao Sáng Tạo",
    description: "Một em bé tràn đầy năng lượng, vui vẻ và có khiếu hài hước. Bé có khả năng ngôn ngữ tốt và rất thích được chú ý, biểu diễn.",
    strengths: ["Khả năng ngôn ngữ", "Sáng tạo", "Vui vẻ lạc quan"],
    challenges: [
      "Tạo không gian cho bé được thể hiện tài năng nghệ thuật (hát, vẽ, kể chuyện).",
      "Giúp bé học cách tập trung vào một việc thay vì làm quá nhiều thứ cùng lúc.",
      "Lắng nghe những câu chuyện của bé để kích thích tư duy."
    ]
  },
  4: {
    title: "Chuyên Gia Kỷ Luật",
    description: "Bé rất thực tế, kỷ luật và thích sự ngăn nắp. Đây là những em bé 'ông cụ non', làm gì cũng cẩn thận và có quy trình rõ ràng.",
    strengths: ["Tính kỷ luật", "Thực tế", "Tỉ mỉ cẩn thận"],
    challenges: [
      "Thiết lập thời gian biểu cố định để bé cảm thấy an tâm và ổn định.",
      "Giải thích lý do rõ ràng trước khi yêu cầu bé làm việc gì đó.",
      "Khuyến khích bé tham gia các trò chơi vận động để bớt tính cứng nhắc."
    ]
  },
  5: {
    title: "Nhà Thám Hiểm Nhí",
    description: "Bé là 'nhà thám hiểm' không ngừng nghỉ, thích tự do và những điều mới lạ. Bé thông minh, nhanh nhạy nhưng cũng rất dễ chán.",
    strengths: ["Thích nghi nhanh", "Thông minh", "Giàu năng lượng"],
    challenges: [
      "Cho bé đi du lịch, dã ngoại thường xuyên để thỏa mãn tính tò mò.",
      "Dạy bé về các giới hạn an toàn vì bé rất liều lĩnh.",
      "Rèn luyện cho bé tính kiên trì để hoàn thành mục tiêu đến cùng."
    ]
  },
  6: {
    title: "Thiên Thần Yêu Thương",
    description: "Bé có bản năng chăm sóc và yêu thương vô bờ bến. Bé thường quan tâm đến bố mẹ, anh chị em và có thiên hướng nghệ thuật thẩm mỹ cao.",
    strengths: ["Giàu tình cảm", "Trách nhiệm", "Gu thẩm mỹ tốt"],
    challenges: [
      "Cho bé tham gia chăm sóc cây cối hoặc thú cưng để phát huy lòng nhân ái.",
      "Tránh áp đặt quá nhiều trách nhiệm khiến bé dễ bị áp lực cảm xúc.",
      "Tạo điều kiện cho bé tiếp xúc với âm nhạc, hội họa sớm."
    ]
  },
  7: {
    title: "Nhà Thông Thái Nhỏ",
    description: "Bé là một 'nhà thông thái' thầm lặng, thích quan sát và đặt những câu hỏi sâu sắc. Bé có xu hướng sống nội tâm và cần không gian riêng.",
    strengths: ["Khả năng phân tích", "Ham học hỏi", "Tập trung sâu"],
    challenges: [
      "Tôn trọng không gian riêng tư và những lúc bé muốn ở một mình.",
      "Cùng bé đọc sách và thảo luận về các chủ đề khoa học, thiên nhiên.",
      "Dạy bé cách kết nối và diễn đạt cảm xúc bằng lời nói nhiều hơn."
    ]
  },
  8: {
    title: "Nhà Điều Hành Tương Lai",
    description: "Bé có tham vọng và bản lĩnh thép từ nhỏ. Bé thích sự công bằng, có khả năng tổ chức và bị thu hút bởi các giá trị vật chất thực tế.",
    strengths: ["Khả năng quản lý", "Mạnh mẽ", "Thực tế"],
    challenges: [
      "Dạy bé về giá trị của tiền bạc thông qua việc làm việc nhà hoặc tiết kiệm.",
      "Hướng dẫn bé cách sử dụng quyền lực một cách nhân văn và công bằng.",
      "Khen ngợi sự nỗ lực và khả năng tổ chức của bé."
    ]
  },
  9: {
    title: "Nhà Nhân Ái Nhí",
    description: "Bé mang tâm hồn của một 'nhà nhân đạo' nhí, giàu lòng trắc ẩn và có tầm nhìn rộng mở. Bé thích giúp đỡ người khác và rất tình cảm.",
    strengths: ["Lòng nhân ái", "Tầm nhìn rộng", "Truyền cảm hứng"],
    challenges: [
      "Khuyến khích bé tham gia các hoạt động cộng đồng, giúp đỡ bạn bè.",
      "Dạy bé cách bảo vệ bản thân để không bị người khác lợi dụng lòng tốt.",
      "Hỗ trợ bé hiện thực hóa các ý tưởng giúp ích cho mọi người."
    ]
  },
  11: {
    title: "Người Truyền Cảm Hứng",
    description: "Đây là em bé có trực giác cực kỳ nhạy bén và tâm hồn nghệ sĩ. Bé có khả năng nhận nhận thức tâm linh và cảm xúc vượt xa độ tuổi.",
    strengths: ["Trực giác cực nhạy", "Sáng tạo độc đáo", "Nhạy cảm"],
    challenges: [
      "Kiên nhẫn với sự nhạy cảm của bé, tránh quát mắng nặng lời.",
      "Khuyến khích bé tin vào bản năng và những ý tưởng khác biệt.",
      "Giúp bé cân bằng giữa thế giới nội tâm mơ mộng và thực tế."
    ]
  },
  22: {
    title: "Người Kiến Tạo Bậc Thầy",
    description: "Được mệnh danh là 'Người kiến tạo bậc thầy'. Bé kết hợp được sự trực giác của số 11 và tính thực tế của số 4, có khả năng biến những giấc mơ lớn thành hiện thực.",
    strengths: ["Tầm nhìn xa", "Khả năng thực thi", "Kiên trì"],
    challenges: [
      "Hỗ trợ bé thực hiện những kế hoạch lớn, dạy bé cách lập kế hoạch chi tiết.",
      "Rèn luyện cho bé tính kỷ luật và đạo đức làm việc từ sớm.",
      "Tránh tạo áp lực quá lớn về thành công, hãy để bé phát triển tự nhiên."
    ]
  }
};