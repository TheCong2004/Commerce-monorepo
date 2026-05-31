# 🧩 Logic Trắc Nghiệm DISC (DISC Assessment Logic)

Tài liệu này mô tả chi tiết các thuật toán và quy tắc tính toán kết quả trắc nghiệm tính cách DISC trong dự án SoulFriend (file `src/utils/discUtils.ts`). Hệ thống dựa trên mô hình hành vi **William Moulton Marston**.

## 1. Định nghĩa 4 Nhóm Tính Cách (The 4 Quadrants)

Mỗi câu trả lời của người dùng sẽ được map (ánh xạ) vào một trong 4 nhóm tính cách cơ bản sau:

| Mã | Tên nhóm | Đặc trưng chính | Màu sắc đại diện |
| :---: | :--- | :--- | :--- |
| **D** | **Dominance** (Thống trị) | Quyết đoán, hướng mục tiêu, mạnh mẽ, thích cạnh tranh. | 🔴 Đỏ (#FF4D4F) |
| **I** | **Influence** (Ảnh hưởng) | Nhiệt tình, cởi mở, thích giao tiếp, lạc quan. | 🟡 Vàng (#FAAD14) |
| **S** | **Steadiness** (Kiên định) | Ôn hòa, trầm tĩnh, kiên nhẫn, tận tâm, lắng nghe. | 🟢 Xanh lá (#52C41A) |
| **C** | **Compliance** (Tuân thủ) | Chuẩn xác, cẩn trọng, logic, tuân thủ quy tắc. | 🔵 Xanh dương (#1890FF) |

---

## 2. Cấu Trúc Câu Hỏi & Dữ Liệu (Data Structure)

### 2.1. Cấu trúc câu hỏi
Một bài test tiêu chuẩn (MVP) bao gồm **24 - 28 câu hỏi**. Mỗi câu hỏi có 4 lựa chọn, mỗi lựa chọn tương ứng với một nhóm tính cách ẩn.

* **Quy tắc chọn:** Người dùng chọn **01 đáp án** mô tả giống bản thân nhất (Most like me).
* **Logic:** Mỗi lựa chọn tương ứng với một Key: `D`, `I`, `S`, hoặc `C`.

### 2.2. Bảng trọng số (Weighting)
Mỗi lựa chọn có giá trị điểm bằng **1**.

---

## 3. Thuật Toán Tính Toán (Calculation Algorithm)

### 3.1. Bước 1: Tổng hợp điểm thô (Raw Scoring)
* **Đầu vào:** Mảng các câu trả lời của người dùng (`UserAnswers`).
* **Logic:** Duyệt qua từng câu trả lời và tăng bộ đếm cho nhóm tính cách tương ứng.
* **Biến khởi tạo:** `Score = { D: 0, I: 0, S: 0, C: 0 }`

### 3.2. Bước 2: Chuẩn hóa phần trăm (Normalization)
Để hiển thị biểu đồ và so sánh công bằng dù số lượng câu hỏi thay đổi, điểm số được quy đổi ra phần trăm.

* **Công thức:**
Percentage = (Score_Type / Total_Questions) * 100

* **Ví dụ:**
    * Tổng câu hỏi: 24
    * Điểm D: 12 -> %D = (12/24) * 100 = 50%
    * Điểm I: 6  -> %I = (6/24) * 100 = 25%

---

## 4. Xác Định Kết Quả (Result Interpretation)

### 4.1. Nhóm Tính Cách Chủ Đạo (Dominant Type)
* **Logic:** Là nhóm có điểm số (hoặc phần trăm) cao nhất.
* **Trường hợp bằng điểm (Tie-breaker):**
    * Nếu có 2 hoặc nhiều nhóm bằng điểm nhau ở vị trí cao nhất (Ví dụ: D = 10, I = 10).
    * **Giải pháp MVP:** Trả về chuỗi kết hợp (Ví dụ: "DI" hoặc "SC").

### 4.2. Mã giả xử lý kết quả (Pseudo-code)

```javascript
// Input: Mảng câu trả lời
function calculateDISC(answers) {
    // 1. Khởi tạo
    let counts = { D: 0, I: 0, S: 0, C: 0 };
    let totalQuestions = answers.length;

    // 2. Cộng điểm
    answers.forEach(ans => {
        counts[ans.type]++; // ans.type là 'D', 'I', 'S' hoặc 'C'
    });

    // 3. Tìm Max
    let maxScore = Math.max(counts.D, counts.I, counts.S, counts.C);
    
    // 4. Xác định (các) nhóm chủ đạo
    let dominantTypes = [];
    if (counts.D === maxScore) dominantTypes.push('D');
    if (counts.I === maxScore) dominantTypes.push('I');
    if (counts.S === maxScore) dominantTypes.push('S');
    if (counts.C === maxScore) dominantTypes.push('C');

    return {
        scores: counts,
        percentages: {
            D: (counts.D / totalQuestions) * 100,
            I: (counts.I / totalQuestions) * 100,
            S: (counts.S / totalQuestions) * 100,
            C: (counts.C / totalQuestions) * 100,
        },
        resultCode: dominantTypes.join("") // VD: "DI", "C", "S"
    };
}
5. Dữ Liệu Biểu Đồ (Chart Data) 📊
Dữ liệu này dùng để vẽ biểu đồ cột (Bar Chart) hoặc biểu đồ Radar (Radar Chart) trên Frontend.
Format đầu ra JSON:
{
  "chartData": [
    { "label": "Dominance", "value": 50, "color": "#FF4D4F", "code": "D" },
    { "label": "Influence", "value": 25, "color": "#FAAD14", "code": "I" },
    { "label": "Steadiness", "value": 15, "color": "#52C41A", "code": "S" },
    { "label": "Compliance", "value": 10, "color": "#1890FF", "code": "C" }
  ]
}
Lưu ý:
Kết quả chính xác nhất khi người dùng trả lời trung thực và nhanh chóng (không suy nghĩ quá lâu).
Hệ thống cần hiển thị cảnh báo nếu tất cả các nhóm điểm quá thấp hoặc quá cân bằng nhau (kết quả không rõ ràng).
