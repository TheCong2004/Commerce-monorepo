# 🧠 Logic Trắc Nghiệm MBTI (MBTI Core Logic)

Tài liệu này mô tả **thuật toán cốt lõi** để xác định **16 nhóm tính cách MBTI** trong dự án **SoulFriend**.

> MBTI **không tính điểm tổng**, mà tính điểm **đối kháng** giữa hai cực của **4 trục tính cách**.

---

## 1. Cấu Trúc 4 Cặp Đối Ngẫu (The 4 Dichotomies)

| Trục | Ký hiệu | Ý nghĩa | Tiếng Anh | Tiếng Việt |
|----|--------|--------|-----------|-----------|
| 1 | E vs I | Nguồn năng lượng | Extroversion | Hướng Ngoại |
|   |        |                | Introversion | Hướng Nội |
| 2 | S vs N | Cách tiếp nhận thông tin | Sensing | Giác Quan (Thực tế) |
|   |        |                          | iNtuition | Trực Giác (Tương lai) |
| 3 | T vs F | Cách ra quyết định | Thinking | Lý Trí (Logic) |
|   |        |                    | Feeling | Cảm Xúc (Tình cảm) |
| 4 | J vs P | Phong cách sống | Judging | Nguyên Tắc (Kế hoạch) |
|   |        |                 | Perceiving | Linh Hoạt (Tùy hứng) |

---

## 2. Cấu Trúc Câu Hỏi (Question Structure)

Mỗi câu hỏi là một cuộc **"kéo co"** giữa **2 cực của cùng một trục**.

### Format
- Câu hỏi trắc nghiệm **2 lựa chọn** (A hoặc B)
- **Không có đáp án trung lập**

### Quy tắc chấm điểm
- Lựa chọn **A** → cộng điểm cho **cực 1**
- Lựa chọn **B** → cộng điểm cho **cực 2**

### Ví dụ JSON

```json
{
  "id": 1,
  "dimension": "EI",
  "question": "Sau một tuần làm việc căng thẳng, bạn sẽ:",
  "options": [
    { "text": "Rủ bạn bè đi 'quẩy' xả stress", "value": "E" },
    { "text": "Ở nhà đọc sách, xem phim một mình", "value": "I" }
  ]
}
