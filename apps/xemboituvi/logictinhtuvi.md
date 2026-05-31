# 🔮 Logic Tính Toán Tử Vi (Astrology Core Logic)

Tài liệu này mô tả chi tiết các thuật toán, quy tắc và quy trình được sử dụng để lập lá số tử vi trong dự án. Hệ thống dựa trên các nguyên lý truyền thống của Tử Vi Đẩu Số.

## 1. Bảng Can Chi (Heavenly Stems & Earthly Branches)

| Can (Thiên Can) | Giá trị |
| :---: | :--- |
| Giáp | 1 |
| Ất | 2 |
| Bính | 3 |
| Đinh | 4 |
| Mậu | 5 |
| Kỷ | 6 |
| Canh | 7 |
| Tân | 8 |
| Nhâm | 9 |
| Quý | 10 |

| Chi (Địa Chi) | Giá trị |
| :---: | :--- |
| Tý | 1 |
| Sửu | 2 |
| Dần | 3 |
| Mão | 4 |
| Thìn | 5 |
| Tỵ | 6 |
| Ngọ | 7 |
| Mùi | 8 |
| Thân | 9 |
| Dậu | 10 |
| Tuất | 11 |
| Hợi | 12 |

---

## 2. Quy tắc xác định Can Chi năm sinh

**Công thức:**
* Can = (Năm sinh - 4) % 10
* Chi = (Năm sinh - 4) % 12

**Thuật toán:**
1. Lấy năm sinh dương lịch.
2. Áp dụng công thức trên để xác định chỉ số Can và Chi.
3. Tra bảng để lấy tên Can, Chi tương ứng.

---

## 3. Các bước lập lá số tử vi cơ bản

1. Nhập thông tin: Họ tên, giới tính, ngày tháng năm sinh, giờ sinh.
2. Xác định Can Chi năm sinh.
3. Xác định các cung, an sao dựa trên giờ/ngày/tháng/năm sinh.
4. Lập bảng lá số và luận giải vận hạn.

> **Lưu ý:**
> - Một số trường hợp đặc biệt cần xử lý riêng (năm nhuận, giờ Tý, v.v.).
> - Có thể mở rộng thêm các thuật toán an sao, luận giải chi tiết theo từng trường phái.

---

## 4. Ví dụ hàm xác định Can Chi năm sinh (trích từ TuVi2025Card.tsx)

```ts
const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
function getCanChiSlug(nam: number): string {
	const canIndex = (nam - 4) % 10;
	const chiIndex = (nam - 4) % 12;
	const can = CAN[canIndex];
	const chi = CHI[chiIndex];
	return `${can}-${chi}`;
}
```

---

## 5. Tham khảo thêm
- Source code chi tiết: Xem file `container/home/TuVi2025Card.tsx`
- Có thể mở rộng tài liệu với các thuật toán an sao, luận giải cung, vận hạn, đại hạn, tiểu hạn...
