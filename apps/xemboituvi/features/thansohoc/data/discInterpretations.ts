import { PersonalityType } from './discQuestions';

interface DiscProfile {
  title: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
}

export const DISC_RESULTS: Record<PersonalityType, DiscProfile> = {
  D: {
    title: "Người Thống Trị (Dominance)",
    description: "Bạn là người hướng ngoại và hướng tới công việc. Bạn quyết đoán, mạnh mẽ, thích cạnh tranh và luôn tập trung vào kết quả. Bạn không ngại rủi ro để đạt được mục tiêu.",
    strengths: [
      "Giải quyết vấn đề nhanh chóng",
      "Có tư duy lãnh đạo bẩm sinh",
      "Thẳng thắn, đi vào trọng tâm",
      "Chịu được áp lực cao"
    ],
    weaknesses: [
      "Có thể thiếu kiên nhẫn",
      "Dễ bỏ qua cảm xúc của người khác",
      "Đôi khi quá áp đặt",
      "Không thích đi vào chi tiết nhỏ"
    ],
    careers: ["CEO/Giám đốc", "Luật sư", "Kinh doanh/Sales", "Cảnh sát/Quân đội"]
  },
  I: {
    title: "Người Ảnh Hưởng (Influence)",
    description: "Bạn là người hướng ngoại và hướng tới con người. Bạn nhiệt tình, lạc quan, thích giao tiếp và là tâm điểm của sự chú ý. Bạn giỏi thuyết phục và truyền cảm hứng.",
    strengths: [
      "Giao tiếp xuất sắc, gây thiện cảm",
      "Sáng tạo và nhiều ý tưởng mới",
      "Lạc quan, truyền năng lượng tích cực",
      "Giỏi kết nối mọi người"
    ],
    weaknesses: [
      "Làm việc đôi khi cảm tính",
      "Dễ mất tập trung, hay quên",
      "Sợ bị từ chối hoặc mất lòng",
      "Khó khăn trong việc quản lý thời gian"
    ],
    careers: ["Marketing/PR", "Diễn giả/MC", "Hướng dẫn viên", "Nghệ thuật"]
  },
  S: {
    title: "Người Kiên Định (Steadiness)",
    description: "Bạn là người hướng nội và hướng tới con người. Bạn ôn hòa, trầm tĩnh, kiên nhẫn và rất đáng tin cậy. Bạn thích sự ổn định và ghét xung đột.",
    strengths: [
      "Lắng nghe tuyệt vời",
      "Trung thành và tận tâm",
      "Làm việc nhóm tốt, hay giúp đỡ",
      "Bình tĩnh trước áp lực"
    ],
    weaknesses: [
      "Ngại thay đổi, thích an toàn",
      "Khó nói từ chối (Say No)",
      "Đôi khi quá nhạy cảm",
      "Thiếu chủ động thể hiện bản thân"
    ],
    careers: ["Nhân sự (HR)", "Y tá/Bác sĩ", "Giáo viên", "Chăm sóc khách hàng"]
  },
  C: {
    title: "Người Tuân Thủ (Compliance)",
    description: "Bạn là người hướng nội và hướng tới công việc. Bạn cẩn trọng, tỉ mỉ, logic và luôn tuân thủ quy tắc. Bạn đề cao sự chính xác và chất lượng.",
    strengths: [
      "Tư duy phân tích, logic tốt",
      "Làm việc có quy trình, kỷ luật",
      "Chú ý đến từng chi tiết nhỏ",
      "Khách quan và công bằng"
    ],
    weaknesses: [
      "Cầu toàn thái quá",
      "Dễ bị kẹt trong việc phân tích (Analysis Paralysis)",
      "Khó tính, hay soi xét lỗi",
      "Ngại rủi ro"
    ],
    careers: ["Kế toán/Tài chính", "Lập trình viên (IT)", "Kỹ sư", "Nhà nghiên cứu"]
  }
};
