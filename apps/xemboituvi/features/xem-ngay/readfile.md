Tên File,Chức năng
ZodiacBar.tsx,   Thanh trượt hiển thị 12 con giáp với hiệu ứng hover.
PatternHeader.tsx,   Dải tiêu đề màu nâu có họa tiết vân mây hai đầu (đặc trưng Phongthuyso).
DateSearchCard.tsx,    "Khung nhập ngày/tháng tra cứu nhanh với nút ""Xem ngay""."
CalendarWidget.tsx,     Banner mô phỏng tờ lịch giấy xé truyền thống (Dương lịch & Âm lịch).
DailyResultCard.tsx,     "Quan trọng nhất: Hiển thị kết quả chi tiết, giờ tốt, hướng tốt và bài luận giải từ Strapi."
MonthlyComparison.tsx,   Bảng so sánh danh sách các Ngày Tốt và Ngày Xấu trong tháng (chia 2 cột).
MonthlyList.tsx,    Danh sách các ngày trong tháng (dạng bảng chi tiết).
TuViBanner.tsx,     Khung nhập năm sinh tra cứu tử vi 2025 (có hình rồng trang trí).
DateSelector.tsx,     Component lựa chọn ngày (biến thể khác của SearchCard dùng trong Master Layout).

Tên File,Chức năng
types.ts,    "Khuôn mẫu dữ liệu: Định nghĩa các kiểu dữ liệu dùng chung (Interfaces), đảm bảo sự đồng nhất giữa Logic, API và Component (ví dụ: định nghĩa cấu trúc của một ngày tốt/xấu)."

logic-resolver.ts,   "Bộ não tính toán: Xử lý logic nội bộ để trả về tiêu đề trang, tính toán Can Chi, giờ hoàng đạo và lời khuyên nhanh cho 17 loại hình xem ngày khác nhau."

api.ts,      Cổng kết nối Strapi: Chịu trách nhiệm gọi dữ liệu từ Strapi CMS dựa trên loại ngày và thời gian để lấy bài luận giải chi tiết từ chuyên gia.

XemNgayMasterLayout.tsx, "Khung giao diện mẫu: Template dùng chung giúp tái sử dụng giao diện cho tất cả các trang con, điều phối việc hiển thị Loading và trộn dữ liệu từ Logic với Strapi."