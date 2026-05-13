# 🌐 Commerce Monorepo Infrastructure

Một nền tảng thương mại điện tử đa kênh (Omnichannel E-commerce Platform) cấp độ doanh nghiệp, được kiến trúc hóa tối ưu trên nền tảng **Turborepo** và **pnpm workspace**. Hệ thống hội tụ sức mạnh của giao diện người dùng cao cấp, logic nghiệp vụ phân tán và cơ sở hạ tầng Edge siêu tốc của Cloudflare.

---

## 🏗 Kiến trúc Hệ thống (System Architecture)

Dự án áp dụng mô hình phân tách rõ ràng giữa các Ứng dụng (Apps), Gói chia sẻ (Packages) và Đối tượng Phân tán (Durable Objects), bảo đảm tính nhất quán dữ liệu với duy nhất một nguồn chân lý (Single Source of Truth).

```
Commerce-monorepo/
├── apps/
│   ├── merchant/              # Headless Hono API + Stripe + Cloudflare D1 Backend
│   ├── web/                   # Next.js 16 Client Website (kế thừa UI Printerval)
│   ├── zalo-miniapp/          # Kênh bán hàng vệ tinh Zalo MiniApp
│   ├── telegram-miniapp/      # Kênh bán hàng vệ tinh Telegram MiniApp
│   └── flutter-billing-app/   # Ứng dụng POS thanh toán di động (Flutter)
├── packages/
│   ├── shared-types/          # Zod Schemas chung cho toàn bộ Frontend & Backend
│   ├── shared-utils/          # Các hàm tiện ích dùng chung (Format tiền tệ, Thuế)
│   ├── api-client/            # Type-safe Hono API Client cho các ứng dụng vệ tinh
│   ├── db/                    # Drizzle ORM Schema & Kết nối CSDL D1
│   ├── alchemy-utils/         # Tiện ích tự động hóa cấu hình Edge
│   ├── chat-contract/         # Định nghĩa giao thức Chat trực tuyến
│   ├── scripts/               # Các kịch bản vòng đời CI/CD & Khởi tạo
│   └── state-hub/             # Quản lý trạng thái chia sẻ
└── durable-objects/           # Các cụm trạm phân tán (Chatroom, Ping, Workers)
```

---

## 🚀 Hướng dẫn Khởi chạy Cục bộ (Local Development)

### 1. Yêu cầu Môi trường
- **Node.js**: Phiên bản `20.x` trở lên.
- **pnpm**: Phiên bản `9.x` trở lên (bật tính năng Workspace).

### 2. Cài đặt Phụ thuộc
Hệ thống sử dụng cơ chế **`pnpm catalogs`** để quản lý đồng bộ toàn bộ các thư viện dùng chung xuyên suốt 16 project con:
```bash
pnpm install
```

### 3. Kích hoạt Trạm Phát triển
Chạy duy nhất một lệnh dưới đây từ thư mục gốc để kích hoạt đồng thời cả Website người dùng và Core Backend API:
```bash
pnpm run dev
```

- **Giao diện Website (`apps/web`)**: Trực quan hóa tại **`http://localhost:3000`**
- **Bảng điều khiển Backend API (`apps/merchant`)**: Trực quan hóa tại **`http://localhost:8787/docs`** (Swagger UI tương tác).

---

## 🛠 Quản trị Cơ sở Dữ liệu (D1 Database)

Cơ sở dữ liệu ngầm được quản lý tự động thông qua **Wrangler** và **Drizzle ORM**. Bạn có thể nạp các bảng và dữ liệu mẫu (seeding) vào hệ thống bằng lệnh:

```bash
pnpm --filter merchant run db:init
pnpm --filter merchant run db:seed
```

---

## 🤖 Hỗ trợ AI Assistants (Cursor / Claude)

Dự án tích hợp bộ quy tắc tự động hóa lập trình. Để đồng bộ hóa các tệp luật (Agent Rules) giúp trợ lý AI luôn viết mã tuân thủ chuẩn kiến trúc:
```bash
pnpm run agents:link
```

---



Để tận mắt nhìn thấy, tương tác và điều khiển toàn bộ "tảng băng chìm" Backend ngay trên máy tính của bạn, hãy thực hiện các bước cực kỳ thú vị sau:

🌐 1. Mở Bảng Điều Khiển Swagger UI (Giao diện Tương tác API)
Khi lệnh pnpm run dev đang chạy, hãy mở trình duyệt và truy cập vào đường dẫn: 👉 http://localhost:8787/docs
nơi chứa các api cho web và các ứng dụng vệ tinh


http://127.0.0.1:8787/
{
  "name": "merchant",
  "version": "0.1.0",
  "ok": true
}

TIP

Tại đây, hệ thống Hono + Zod OpenAPI tự động dựng lên một bảng điều khiển tuyệt đẹp. Bạn có thể xem toàn bộ các luồng dữ liệu ngầm (Products, Carts, Webhooks, Orders), nhấn nút "Try it out" và gửi dữ liệu thử nghiệm trực tiếp đến Worker nội bộ mà không cần cài đặt ứng dụng Postman!

💾 2. Khởi tạo và Bơm Dữ liệu mẫu vào CSDL Ngầm (Cloudflare D1)
Mặc định CSDL D1 cục bộ của bạn ban đầu là một tệp SQLite trống. Để xây dựng dữ liệu cho tảng băng, hãy mở một tab Terminal mới (giữ nguyên tab dev đang chạy) và gõ hai lệnh sau:

Tạo các bảng CSDL chuẩn mực:
bash
pnpm --filter merchant run db:init
Bơm dữ liệu sản phẩm, danh mục mẫu vào hệ thống:
bash
pnpm --filter merchant run db:seed
Lập tức, dữ liệu lõi sẽ được nạp đầy vào bộ đệm của Cloudflare D1.

⏰ 3. Tự tay Kích hoạt Luồng Lập trình Tự động (Cron Triggers)
Hệ thống ngầm được thiết kế để tự động quét và dọn dẹp các giỏ hàng rác/hết hạn sau mỗi 15 phút. Trong môi trường dev cục bộ, bạn có thể ép luồng ngầm này chạy ngay lập tức bằng lệnh:

bash
curl "http://127.0.0.1:8787/cdn-cgi/handler/scheduled"
Quay lại tab Terminal chạy lệnh dev, bạn sẽ thấy dòng log ngầm xuất hiện: Cron: cleaned ... expired carts

🔍 4. Xem Luồng Bắt Lỗi Xuyên Nền Tảng (Cross-package Types)
Hãy thử mở tệp nguồn chân lý chung: 📁 packages/shared-types/src/index.ts Thử đổi tên một trường dữ liệu (ví dụ: đổi price thành unitPrice trong ProductSchema). Ngay lập tức, bạn sẽ thấy các file code bên trong cả Backend merchant lẫn Giao diện web hiện gạch chân đỏ báo lỗi. Đó chính là sự kết nối ngầm mạnh mẽ nhất của kiến trúc Monorepo!