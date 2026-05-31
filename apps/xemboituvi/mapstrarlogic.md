# 🌌 Logic Tra Cứu Bản Đồ Sao (Natal Chart Logic)
Tài liệu này mô tả **cấu trúc dữ liệu** và **logic xử lý** cho tính năng **Bản Đồ Sao (Natal Chart)** trong dự án **SoulFriend**.

> ⚠️ **Lưu ý quan trọng**  
> Module này **bắt buộc** phải sử dụng thư viện Thiên văn học (ví dụ: `astronomy-engine`, `swiss-ephemeris`) để tính toán vị trí hành tinh.  
> **Không thể code thủ công** bằng các công thức toán học đơn giản vì sai số rất lớn.

---

## 1. Dữ Liệu Đầu Vào (Input Requirements)

Để vẽ được một bản đồ sao **chính xác**, **BẮT BUỘC** phải có **đủ 3 yếu tố** sau:

1. **Ngày / Tháng / Năm sinh**  
   → Dùng để xác định vị trí các hành tinh.

2. **Giờ / Phút sinh**  
   → **Cực kỳ quan trọng** để tính **Cung Mọc (Ascendant)** và **Hệ thống Nhà (Houses)**.  
   → Sai **4 phút ≈ sai 1 độ**.

3. **Nơi sinh (Kinh độ / Vĩ độ)**  
   → Dùng để tính góc nhìn từ Trái Đất (tọa độ địa lý).

---

## 2. Các Thành Phần Cốt Lõi (Core Components)

Một bản đồ sao gồm **3 lớp dữ liệu** chồng lên nhau trên **vòng tròn 360°**.

---

### 2.1. 12 Cung Hoàng Đạo (Zodiac Signs) – Lớp Nền

Vòng tròn hoàng đạo được chia thành **12 phần**, mỗi phần **30°**.

| TT | Ký hiệu | Tên (EN / VI) | Nguyên tố |
|----|--------|---------------|-----------|
| 1 | ♈ | Aries / Bạch Dương | Lửa |
| 2 | ♉ | Taurus / Kim Ngưu | Đất |
| 3 | ♊ | Gemini / Song Tử | Khí |
| 4 | ♋ | Cancer / Cự Giải | Nước |
| 5 | ♌ | Leo / Sư Tử | Lửa |
| 6 | ♍ | Virgo / Xử Nữ | Đất |
| 7 | ♎ | Libra / Thiên Bình | Khí |
| 8 | ♏ | Scorpio / Bọ Cạp | Nước |
| 9 | ♐ | Sagittarius / Nhân Mã | Lửa |
|10 | ♑ | Capricorn / Ma Kết | Đất |
|11 | ♒ | Aquarius / Bảo Bình | Khí |
|12 | ♓ | Pisces / Song Ngư | Nước |

---

### 2.2. 10 Hành Tinh (Planets) – Các Diễn Viên

Các hành tinh di chuyển trên nền 12 cung hoàng đạo.

| Hành tinh | Ý nghĩa tâm lý | Từ khóa |
|----------|---------------|--------|
| ☉ Sun | Cái tôi, bản ngã, ý thức | "Tôi là..." |
| ☽ Moon | Cảm xúc, nhu cầu, vô thức | "Tôi cảm thấy..." |
| ☿ Mercury | Tư duy, giao tiếp | "Tôi nghĩ..." |
| ♀ Venus | Tình yêu, thẩm mỹ, tài chính | "Tôi yêu..." |
| ♂ Mars | Hành động, dục vọng, xung đột | "Tôi hành động..." |
| ♃ Jupiter | Mở rộng, may mắn, niềm tin | "Tôi phát triển..." |
| ♄ Saturn | Kỷ luật, trách nhiệm, giới hạn | "Tôi chịu trách nhiệm..." |
| ♅ Uranus | Đột phá, thay đổi | Biến động |
| ♆ Neptune | Mơ mộng, tâm linh | Ảo ảnh |
| ♇ Pluto | Quyền lực, tái sinh | Chuyển hóa |

---

### 2.3. 12 Nhà (Houses) – Bối Cảnh Cuộc Sống

Hệ thống nhà được xác định bởi trục:

- **Ascendant (AC)** – Cung Mọc
- **Midheaven (MC)** – Thiên Đỉnh

> Hệ thống chia nhà phổ biến nhất: **Placidus**

| Nhà | Ý nghĩa |
|----|--------|
| Nhà 1 (AC) | Ngoại hình, bản thân, ấn tượng đầu |
| Nhà 4 (IC) | Gia đình, gốc rễ, nhà cửa |
| Nhà 7 (DC) | Hôn nhân, đối tác |
| Nhà 10 (MC) | Sự nghiệp, danh tiếng |

---

## 3. Thuật Toán Xử Lý (Processing Logic)

---

### 3.1. Tính "Big 3" – Bộ 3 Quyền Lực (MVP)

#### ☉ Sun Sign – Cung Mặt Trời
- Tính **Ecliptic Longitude** của Mặt Trời tại thời điểm sinh.
- Ví dụ:
  - 45° → 30° (Bạch Dương) + 15° → **Kim Ngưu**

#### ☽ Moon Sign – Cung Mặt Trăng
- Tính kinh độ Mặt Trăng.
- Thay đổi rất nhanh: **~2.5 ngày đổi 1 cung**.

#### ↑ Ascendant – Cung Mọc
- Giao điểm giữa:
  - Hoàng đạo
  - Đường chân trời **phía Đông**
- Phụ thuộc **Giờ sinh + Nơi sinh**

> ⚠️ Không có giờ sinh chính xác → **KHÔNG thể tính Ascendant & Houses**

---

### 3.2. Góc Hợp (Aspects) – Nâng Cao

Khoảng cách góc giữa **2 hành tinh bất kỳ**.

| Góc hợp | Độ | Orb | Ý nghĩa |
|-------|----|-----|--------|
| Conjunction | 0° | ±8° | Hòa hợp, mạnh |
| Opposition | 180° | ±8° | Căng thẳng |
| Trine | 120° | ±8° | Thuận lợi |
| Square | 90° | ±8° | Thử thách |
| Sextile | 60° | ±6° | Cơ hội |

---

## 4. Cấu Trúc Dữ Liệu Đầu Ra (JSON Output)

```ts
interface NatalChartResult {
  big3: {
    sun: { sign: "Leo", degree: 14.5, house: 5 },
    moon: { sign: "Pisces", degree: 2.1, house: 12 },
    ascendant: { sign: "Virgo", degree: 10.2 }
  };

  planets: {
    name: string;
    sign: string;
    house: number;
    isRetrograde: boolean;
  }[];

  houses: {
    [houseNumber: number]: string;
  };

  aspects: {
    planet1: string;
    planet2: string;
    type: "Conjunction" | "Opposition" | "Trine" | "Square" | "Sextile";
    angle: number;
  }[];
}
