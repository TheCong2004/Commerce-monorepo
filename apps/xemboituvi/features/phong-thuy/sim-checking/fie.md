src/
├── components/
│   ├── sim-checking/
│   │   ├── SimInputForm.tsx       (Form nhập số điện thoại, ngày giờ sinh)
│   │   ├── ResultSummary.tsx      (Hiển thị tổng điểm 5/10, 8/10...)
│   │   ├── DetailedAnalysis.tsx   (Luận giải Ngũ hành, Kinh dịch, Cửu tinh...)
│   │   └── SuggestionList.tsx     (Gợi ý Sim hợp tuổi nếu điểm thấp)
│   └── shared/
│       ├── WoodFrame.tsx          (Component bọc khung gỗ trang trí)
│       └── CustomPill.tsx         (Hiển thị Ngũ hành như "Kiếm phong kim")
├── logic/
│   ├── fengshui-engine.ts         (Hàm tính toán điểm tổng quát)
│   ├── ngũ-hành.ts                (Logic sinh khắc ngũ hành)
│   └── kinh-dịch.ts               (Logic lập quẻ dịch cho số điện thoại)
├── api/
│   └── sim-api.ts                 (Gọi API lấy dữ liệu luận giải)
