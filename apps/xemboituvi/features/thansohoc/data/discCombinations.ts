import { PersonalityType } from './discQuestions';

export interface MixedProfile {
  code: string;
  title: string;
  description: string;
}

export const DISC_COMBINATIONS: Record<string, MixedProfile> = {
  // --- Nhóm D chủ đạo ---
  "DI": {
    code: "DI",
    title: "Người Truyền Lửa (The Motivator)",
    description: "Sự kết hợp giữa sự quyết đoán của D và sự nhiệt huyết của I. Bạn là người lãnh đạo có khả năng truyền cảm hứng mạnh mẽ, vừa biết ra lệnh vừa biết cách làm người khác yêu mến mình."
  },
  "DS": {
    code: "DS",
    title: "Người Đạt Được (The Achiever)",
    description: "Bạn có sự mạnh mẽ của D nhưng ẩn dưới vẻ ngoài trầm tĩnh của S. Bạn làm việc cực kỳ bền bỉ, lì lợm theo đuổi mục tiêu và rất khó bị lay chuyển."
  },
  "DC": {
    code: "DC",
    title: "Kiến Trúc Sư (The Architect)",
    description: "Sự kết hợp đáng sợ giữa tầm nhìn (D) và sự chi tiết (C). Bạn là người cầu toàn, đòi hỏi tiêu chuẩn cực cao và luôn muốn mọi thứ phải hoàn hảo ngay từ đầu."
  },
  // --- Nhóm I chủ đạo ---
  "ID": {
    code: "ID",
    title: "Người Thuyết Phục (The Persuader)",
    description: "Bạn có năng lượng bùng nổ. Bạn bán hàng, đàm phán cực giỏi nhờ sự tự tin (D) và sự khéo léo (I). Bạn ghét sự nhàm chán và chi tiết vụn vặt."
  },
  "IS": {
    code: "IS",
    title: "Người Hòa Giải (The Peacemaker)",
    description: "Bạn thân thiện, dễ mến và luôn biết cách lắng nghe. Bạn là 'chất keo' gắn kết mọi người trong tập thể, ghét xung đột và luôn muốn mọi người vui vẻ."
  },
  "IC": {
    code: "IC",
    title: "Người Đánh Giá (The Assessor)",
    description: "Một sự kết hợp thú vị và hiếm gặp. Bạn vừa bay bổng sáng tạo (I) nhưng lại rất kỹ tính (C). Bạn thường mâu thuẫn nội tâm giữa việc 'làm nhanh' và 'làm đúng'."
  },
  // --- Nhóm S chủ đạo ---
  "SI": {
    code: "SI",
    title: "Cố Vấn (The Counselor)",
    description: "Bạn ấm áp, chân thành và rất sâu sắc. Mọi người thường tìm đến bạn để tâm sự vì bạn biết lắng nghe (S) và biết đưa ra lời khuyên tích cực (I)."
  },
  "SC": {
    code: "SC",
    title: "Kỹ Thuật Viên (The Technician)",
    description: "Bạn là người làm việc cực kỳ ổn định và chính xác. Bạn không thích ồn ào, chỉ muốn tập trung làm tốt chuyên môn của mình một cách hoàn hảo nhất."
  },
  "SD": {
    code: "SD",
    title: "Người Giám Sát (The Monitor)",
    description: "Bề ngoài bạn hiền lành (S) nhưng bên trong rất cứng rắn (D). Bạn bảo vệ quy trình và đội nhóm của mình rất quyết liệt nếu có ai đó xâm phạm."
  },
  // --- Nhóm C chủ đạo ---
  "CD": {
    code: "CD",
    title: "Người Thực Thi (The Implementer)",
    description: "Bạn lạnh lùng, logic và sắc bén. Bạn giải quyết vấn đề dựa trên dữ liệu thực tế chứ không dựa trên cảm xúc. Bạn là người đưa ra các chiến lược tối ưu."
  },
  "CI": {
    code: "CI",
    title: "Nhà Phê Bình (The Critic)",
    description: "Bạn có cái nhìn sắc sảo (C) và khả năng ngôn ngữ tốt (I). Bạn giỏi trong việc phân tích, đánh giá và trình bày các vấn đề phức tạp một cách dễ hiểu."
  },
  "CS": {
    code: "CS",
    title: "Người Thận Trọng (The Perfectionist)",
    description: "Bạn là người cẩn thận nhất trong các nhóm. Bạn làm gì cũng có kế hoạch, quy trình rõ ràng (C) và kiên nhẫn thực hiện nó đến cùng (S)."
  }
};
