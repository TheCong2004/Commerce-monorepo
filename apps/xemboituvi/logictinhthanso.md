# 🔮 Logic Tính Toán Thần Số Học (Numerology Core Logic)

Tài liệu này mô tả chi tiết các thuật toán và quy tắc được sử dụng trong dự án SoulFriend (file `src/utils/numerologyUtils.ts`). Hệ thống dựa trên trường phái **Thần số học Pythagoras**.

## 1. Bảng quy đổi chữ cái (Pythagorean System)

Mọi chữ cái trong tên được quy đổi thành số từ 1 đến 9 theo bảng sau:

| Số | Chữ cái tương ứng |
| :---: | :--- |
| **1** | A, J, S |
| **2** | B, K, T |
| **3** | C, L, U |
| **4** | D, M, V |
| **5** | E, N, W |
| **6** | F, O, X |
| **7** | G, P, Y |
| **8** | H, Q, Z |
| **9** | I, R |

> **Lưu ý về chữ "Y":**
> * Trong hệ thống này, chữ **Y** là trường hợp đặc biệt (Lưỡng tính).
> * **Logic hiện tại (MVP):** Chữ **Y** luôn được tính là **Nguyên âm** (Vowel) để đơn giản hóa thuật toán.
> * *Nâng cao:* Cần thuật toán phân tích ngữ âm để xác định Y là nguyên âm (như "Ly", "Ý") hay phụ âm (như "Nguyên", "Thúy").

---

## 2. Quy tắc rút gọn số (Reduction Rule)

Mọi kết quả tính toán đều phải được rút gọn về một chữ số đơn (1-9), **ngoại trừ** 3 số Master Number (Số Vua) được giữ nguyên:
* **11**
* **22**
* **33**

**Thuật toán `reduceNumber(n)`:**
1.  Tính tổng các chữ số của n.
2.  Nếu kết quả > 9 và khác 11, 22, 33 thì lặp lại bước 1.
3.  Kết quả cuối cùng được trả về.

---

## 3. Các Chỉ Số Cốt Lõi (Core Numbers)

### 3.1. Số Chủ Đạo (Life Path Number)
* **Đầu vào:** Ngày sinh (dd/mm/yyyy)
* **Logic:** Rút gọn từng thành phần (Ngày, Tháng, Năm) riêng biệt, sau đó cộng tổng lại và rút gọn lần cuối.
* **Công thức:**
LifePath = Reduce( Reduce(Day) + Reduce(Month) + Reduce(Year) )
* **Ví dụ:** 29/11/1999
  * Ngày 29 -> 2+9=11 (Giữ nguyên)
  * Tháng 11 -> Giữ nguyên![alt text](image.png)
  * Năm 1999 -> 1+9+9+9=28 -> 2+8=10 -> 1
  * Tổng: 11 + 11 + 1 = 23 -> 2+3 = **5**

### 3.2. Số Sứ Mệnh (Expression Number)
* **Đầu vào:** Họ và tên đầy đủ.
* **Logic:** Tổng giá trị của **tất cả** các chữ cái trong tên.
* **Công thức:** `Expression = Reduce(Tổng tất cả chữ cái)`

### 3.3. Chỉ Số Linh Hồn (Soul Urge Number)
* **Đầu vào:** Họ và tên đầy đủ.
* **Logic:** Tổng giá trị của các **Nguyên Âm** (A, E, I, O, U, Y).
* **Công thức:** `SoulUrge = Reduce(Tổng Nguyên Âm)`

### 3.4. Chỉ Số Nhân Cách (Personality Number)
* **Đầu vào:** Họ và tên đầy đủ.
* **Logic:** Tổng giá trị của các **Phụ Âm** (Các chữ còn lại).
* **Công thức:** `Personality = Reduce(Tổng Phụ Âm)`

### 3.5. Chỉ Số Thái Độ (Attitude Number)
* **Đầu vào:** Ngày sinh, Tháng sinh.
* **Logic:** Tổng của ngày sinh và tháng sinh (đã rút gọn từng phần).
* **Công thức:** `Attitude = Reduce( Reduce(Day) + Reduce(Month) )`






## 4. Biểu Đồ Vận Niên (Personal Year Chart) 📈

Biểu đồ dùng để dự báo vận mệnh từng năm theo chu kỳ 9 năm (hình sóng).

### Công thức tính Năm Cá Nhân (Personal Year)
* **Đầu vào:** Ngày sinh (D), Tháng sinh (M), Năm cần xem (Y).
* **Quy tắc:**
  1.  Rút gọn Ngày sinh.
  2.  Rút gọn Tháng sinh.
  3.  Rút gọn Năm cần xem (Năm thế giới).
  4.  Cộng tổng 3 số trên và rút gọn về 1-9.

* **Công thức:**
PersonalYear = Reduce( Reduce(D) + Reduce(M) + Reduce(Y) )
### Ví dụ minh họa
* **Input:** Ngày sinh **14/11**, Năm cần xem **2024**.
* **Các bước tính:**
  1.  **Ngày:** 14 -> 1 + 4 = **5**
  2.  **Tháng:** 11 -> 1 + 1 = **2** (Lưu ý: Khi tính vận niên, tháng 11 thường rút gọn là 2).
  3.  **Năm 2024:** 2 + 0 + 2 + 4 = **8**
  4.  **Tổng hợp:** 5 + 2 + 8 = 15
  5.  **Rút gọn cuối:** 15 -> 1 + 5 = **6**
* **Kết quả:** Năm cá nhân 2024 là số **6**.

### Mã giả tạo dữ liệu biểu đồ (Pseudo-code)

```javascript
// Tạo dữ liệu cho 9 năm (từ năm ngoái đến 7 năm tới)
chartData = [];
currentYear = 2024;

for (i = -1; i <= 8; i++) {
 targetYear = currentYear + i;
 value = calculatePersonalYear(dob, targetYear);
 
 chartData.push({ 
     year: targetYear, 
     value: value 
 });
}
