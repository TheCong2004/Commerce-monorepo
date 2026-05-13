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

## 📄 Bản quyền (License)
Dự án được phân phối dưới giấy phép **MIT**. Sẵn sàng tinh chỉnh và mở rộng cho mọi quy mô doanh nghiệp!
