# 👶 Logic Thần Số Học Cho Bé (Kid Numerology Logic)

Tài liệu này mô tả logic xử lý riêng biệt cho đối tượng Trẻ Em (thường dưới 14 tuổi) trong dự án SoulFriend.
Mục tiêu: Giúp cha mẹ hiểu tính cách bẩm sinh, phong cách học tập và phương pháp giáo dục phù hợp.

## 1. Sự Khác Biệt So Với Người Lớn

| Đặc điểm | Người Lớn | Trẻ Em (0 - 14 tuổi) |
| :--- | :--- | :--- |
| **Trọng tâm** | Sự nghiệp, Tình duyên, Vận hạn, Tiền bạc. | **Tính cách, Học tập, Năng khiếu, Cảm xúc.** |
| **Chỉ số mạnh nhất** | Số Chủ Đạo & Đường Đời. | **Ngày Sinh (Day Number)** & Số Chủ Đạo. |
| **Chỉ số loại bỏ** | Số Trưởng Thành (Maturity), Các đỉnh cao (Pinnacles). | Không dùng các chỉ số trung niên/lão niên. |
| **Góc nhìn** | Khắc phục điểm yếu, phát triển bản thân. | **Nuôi dưỡng tiềm năng, phương pháp dạy dỗ.** |

---

## 2. Các Chỉ Số Cốt Lõi Cho Bé

### 2.1. Số Ngày Sinh (The Day Number) - Quan trọng nhất giai đoạn 0-6 tuổi
Trẻ em sống rất bản năng, nên năng lượng của **Ngày sinh** (không cộng tháng/năm) tác động mạnh nhất.

* **Đầu vào:** Ngày sinh dương lịch (DD).
* **Logic:**
    * Nếu ngày sinh <= 12: Giữ nguyên (Để phân tích chi tiết năng lượng gốc).
    * Hoặc rút gọn về 1-9 (Tùy chiến lược nội dung).
    * *SoulFriend Logic:* Nên rút gọn về 1-9 (trừ 11, 22) để đồng bộ hệ thống.
* **Ý nghĩa:** Tài năng bẩm sinh, phản xạ tự nhiên của bé.

### 2.2. Số Chủ Đạo (Life Path Number)
* **Công thức:** Giống người lớn (Rút gọn Ngày + Tháng + Năm).
* **Góc nhìn cho bé:**
    * Số 1: Bé độc lập hay bướng bỉnh?
    * Số 3: Bé hoạt ngôn hay hay nói leo?
    * Số 5: Bé năng động hay hiếu động mất tập trung?
    * Số 7: Bé thích quan sát hay lầm lì?

### 2.3. Chỉ Số Thái Độ (Attitude Number)
* **Công thức:** `reduce(Ngày + Tháng)`
* **Ý nghĩa:** Cách bé phản ứng khi bị mắng, khi gặp người lạ hoặc khi đòi đồ chơi. (Ví dụ: Số 1 sẽ gào lên đòi bằng được, Số 2 sẽ khóc thút thít, Số 5 sẽ đánh lạc hướng).

### 2.4. Biểu Đồ Tên (Expression & Soul Urge)
* **Expression (Sứ mệnh):** Dùng để định hướng môn năng khiếu (Vẽ, Nhạc, Toán, Thể thao).
* **Soul Urge (Linh hồn):** "Ngôn ngữ tình yêu" của bé. Bé thích được ôm (Số 2, 6) hay thích được khen ngợi (Số 1, 3, 5)?

---

## 3. Logic "Vùng Xung Đột" (Parent-Child Compatibility) 👨‍👩‍👧‍👦

Đây là tính năng **"Ăn Tiền"** của module Kid. Hệ thống sẽ so sánh chỉ số của Bố/Mẹ và Con để đưa ra cảnh báo.

### Thuật toán so khớp (Matching Algorithm)

**Đầu vào:** `Parent_LifePath` và `Child_LifePath`.

**Quy tắc xung khắc năng lượng (Conflict Rules):**

1.  **Nhóm Cai Trị vs Nhóm Tự Do (4 vs 5):**
    * *Bố mẹ (4 - Kỷ luật)* vs *Con (5 - Bay bổng)*.
    * **Vấn đề:** Bố mẹ thấy con lộn xộn, con thấy bố mẹ ngột ngạt.
    * **Lời khuyên:** Bố mẹ cần nới lỏng quy tắc, cho con không gian sáng tạo.

2.  **Nhóm Tốc Độ vs Nhóm Chậm Rãi (1, 3, 5 vs 2, 4, 6):**
    * *Bố mẹ (1 - Nhanh)* vs *Con (2 - Chậm/Nhạy cảm)*.
    * **Vấn đề:** Bố mẹ hay giục, con bị áp lực và trở nên nhút nhát.
    * **Lời khuyên:** Kiên nhẫn, không quát tháo thúc giục bé.

3.  **Nhóm Hướng Ngoại vs Hướng Nội (3, 5 vs 7, 9):**
    * *Bố mẹ (3 - Hoạt ngôn)* vs *Con (7 - Thích một mình)*.
    * **Vấn đề:** Bố mẹ ép con đi giao lưu, con thấy mệt mỏi.
    * **Lời khuyên:** Tôn trọng không gian riêng tư của con.

---

## 4. Cấu Trúc Dữ Liệu Đầu Ra (JSON Output)

```typescript
interface KidNumerologyResult {
  info: {
    lifePath: number;       // Số chủ đạo
    dayNumber: number;      // Số ngày sinh
    attitude: number;       // Thái độ
    soulUrge: number;       // Nhu cầu nội tâm
  };
  
  // Phân tích chi tiết
  analysis: {
    strengths: string[];    // Điểm mạnh (vd: Sáng tạo, Tình cảm)
    challenges: string[];   // Thách thức (vd: Hay khóc nhè, Mất tập trung)
    learningStyle: string;  // Phong cách học (vd: Học qua hình ảnh, Học qua vận động)
    parentingAdvice: string;// Lời khuyên nuôi dạy
  };

  // (Optional) Nếu có nhập thông tin Bố Mẹ
  compatibility?: {
    parentType: number;
    conflictScore: number;  // Điểm xung khắc (1-10)
    harmonyTips: string;    // Mẹo để hòa hợp
  };
}


1. Quy tắc cốt lõi: Rút gọn số (Reduction)
Trong Thần số học, mọi kết quả cuối cùng phải là số đơn từ 1 đến 9. Tuy nhiên, có 3 số đặc biệt (Số Master) phải giữ nguyên là: 11, 22, 33.
Thuật toán:
Cộng tổng các chữ số của số đầu vào.
Nếu kết quả là 11, 22, 33 -> Dừng lại.
Nếu kết quả _< 9 -> Dừng lại.
Nếu kết quả >_ 10 (và không phải Master) -> Lặp lại bước 1.
Ví dụ: Số 39
Bước 1: 3 + 9 = 12
Bước 2: 1 + 2 = 3 (Kết quả cuối)


2. Công thức tính Số Chủ Đạo (Life Path Number)
Chúng ta sử dụng phương pháp Cộng Dọc (Rút gọn từng thành phần trước khi cộng tổng). Đây là cách tính chuẩn của Pythagoras để không bỏ sót các con số Master.

Công thức:LifePath = RútGọn(RútGọn(Ngày)/A + RútGọn(Tháng)/B + RútGọn(Năm)/C )
Ví dụ thực tế: Bé sinh ngày 29/11/2015
Ngày 29: 2 + 9 = 11 (Số Master -> Giữ nguyên 11).
Tháng 11: (Số Master -> Giữ nguyên 11).
Năm 2015: 2 + 0 + 1 + 5 = 8 (Giữ nguyên 8).
Tổng: 11 (Ngày) + 11 (Tháng) + 8 (Năm) = 30
Rút gọn cuối: 3 + 0 =3
Số chủ đạo là 3.
(Lưu ý: Nếu bạn cộng dồn kiểu 2+9+1+1+2+0+1+5 = 21 -> 3 thì kết quả cuối vẫn đúng là 3, nhưng sẽ bị sai trong trường hợp ra số Master như 11, 22).

3. Công thức tính Số Sứ Mệnh (Expression Number)
Chỉ số này tính dựa trên Họ Tên Đầy Đủ của bé.

Bước 1: Quy đổi chữ cái sang số Sử dụng bảng chuẩn Pythagoras:
1,2,3,4,5,6,7,8,9
A,B,C,D,E,F,G,H,I
J,K,L,M,N,O,P,Q,R
S,T,U,V,W,X,Y,Z,

Bước 2: Cộng tổng và rút gọn Hàm calculateExpression sẽ:
Chuyển tên về tiếng Việt không dấu, chữ thường (ví dụ: "Nguyễn Văn A" -> "nguyen van a").
Cộng giá trị từng chữ cái.
Rút gọn tổng đó.
Ví dụ: Tên LAM
L = 3
A = 1
M = 4
Tổng = 3 + 1 + 4 = 8 -> Số sứ mệnh là 8.

4. Công thức tính Độ Hòa Hợp (Compatibility)
Đây là logic dùng trong hàm checkCompatibility (Tính năng cha mẹ & con cái). Thay vì tính toán phức tạp, chúng ta dùng Quy tắc Nhóm (Grouping).

Các con số được chia thành 3 nhóm năng lượng tự nhiên (Trục ngang biểu đồ ngày sinh):
1.Nhóm Tư Duy/Lý Trí (Mind): 1, 4, 7 (và số master 22)
Đặc điểm: Thích logic, thực tế, độc lập.

2.Nhóm Cảm Xúc/Tâm Hồn (Soul): 2, 5, 8 (và số master 11)
Đặc điểm: Tình cảm, yêu tự do, kết nối.

3.Nhóm Sáng Tạo/Năng Lượng (Body/Creative): 3, 6, 9 (và số master 33)
Đặc điểm: Sáng tạo, chăm sóc, hướng ngoại.

Logic Code:Nếu Số chủ đạo của Bố/Mẹ và Bé nằm trong cùng một nhóm -> isCompatible = true (Dễ nói chuyện, dễ hiểu nhau).
Nếu khác nhóm -> isCompatible = false (Cần nỗ lực để thấu hiểu sự khác biệt).

Tóm tắt file numerologyUtils.ts của bạn:
Hàm reduceNumber: Thực hiện logic phần 1.
Hàm calculateLifePath: Thực hiện logic phần 2.
Hàm calculateExpression: Thực hiện logic phần 3 (kết hợp bảng map A-Z).
Hàm checkCompatibility: Thực hiện logic phần 4.