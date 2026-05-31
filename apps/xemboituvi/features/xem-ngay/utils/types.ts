// Định nghĩa cấu trúc dữ liệu chi tiết cho MỘT NGÀY (dùng cho kết quả tìm kiếm)
export interface DayDetail {
  solarDate: string;      // VD: "29/12/2025"
  lunarDate: string;      // VD: "10/11"
  lunarYear: string;      // VD: "Ất Tỵ"
  dayCanChi: string;      // VD: "Nhâm Thân"
  monthCanChi: string;    // VD: "Mậu Tý"
  dayOfWeek: string;      // VD: "Thứ hai"
  
  isGoodDay: boolean;     // true = Tốt, false = Xấu/Bình thường
  message: string;        // Lời bình (VD: "Ngày ... là ngày ĐẠI CÁT...")
  
  goodHours: string[];    // Danh sách giờ hoàng đạo
  badHours: string[];     // Danh sách giờ hắc đạo (có thể để trống)
  goodDirection: string;  // Hướng xuất hành tốt
  content?: string;      // Nội dung chi tiết thêm strapi
}
export type XemNgayType = 'tot-xau' | 'dong-tho' | 'khai-truong' | 'cuoi-hoi' | 'mua-xe' | 'nhap-trach';
// Định nghĩa cấu trúc dữ liệu cho item trong DANH SÁCH THÁNG (dùng cho bảng bên dưới)
export interface MonthDayItem {
  solar: string;          // Ngày dương (VD: "1/12/2025")
  lunar: string;          // Ngày âm (VD: "12/10/2025")
  dayOfWeek: string;      // Thứ
}