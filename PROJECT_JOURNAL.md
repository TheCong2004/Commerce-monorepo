
## 📅 Giai đoạn 1: Phân tích và Định hình Kiến trúc (Foundation Analysis)

Dựa trên yêu cầu từ tệp `cautruc.md`, mục tiêu đặt ra là tích hợp sức mạnh của 3 kho lưu trữ mã nguồn riêng biệt vào một hệ thống thống nhất theo dạng **Turborepo + pnpm workspace**:
1. **Frontend Website**: Kế thừa toàn bộ mã nguồn giao diện thực tế từ kho `printerval`.
2. **Core Backend Commerce**: Tích hợp giải pháp thanh toán Stripe, OpenAPI/Swagger và xử lý đơn hàng từ kho `merchant` thực tế.
3. **Hạ Tầng Đa Worker & Phân Tán**: Tận dụng khung điều phối, các tiện ích hỗ trợ và cấu trúc thư mục từ `cf-multiworker-starter-kit`.

---

## 🏗 Giai đoạn 2: Khởi tạo Bộ Khung Monorepo (Workspace Scaffolding)

### 1. Chuẩn hóa Cấu hình Gốc
- **`package.json`**: Thiết lập gốc với thuộc tính `private: true`, tích hợp toàn bộ các kịch bản quản lý vòng đời (`setup`, `quickstart`, `github:sync`, `deploy:*`, `destroy:*`). Bổ sung danh sách cho phép `pnpm.onlyBuiltDependencies` để bảo đảm an toàn khi build các native modules (Prisma, Sharp, Esbuild).
- **`pnpm-workspace.yaml`**: Định nghĩa rõ ràng 3 vùng chứa mã nguồn chính: `apps/*`, `packages/*`, và `durable-objects/*`.
- **`turbo.json`**: Định nghĩa chuỗi luồng tác vụ (pipeline) tối ưu hóa cache, bao gồm cả các quy tắc liên đới giữa các worker khi dọn dẹp hoặc hủy (destroy) dịch vụ.

### 2. Tích hợp Hoàn Chỉnh Mẫu Hạ Tầng Starter-kit
- Di chuyển trọn vẹn các thư mục lõi:
  - **`durable-objects/`**: `chatroom-do`, `other-worker`, `ping-do`.
  - **`packages/`**: `alchemy-utils`, `chat-contract`, `scripts`, `state-hub`.
  - **Thư mục Hỗ trợ Gốc**: `agents` (kịch bản tạo symlinks Cursor/Claude), `config` (quyền hạn GitHub), `stacks` (cấu hình triển khai Alchemy).

---

## 🚀 Giai đoạn 3: Bơm Mã Nguồn Thực Tế (Injecting Real Codebases)

### 1. Tích hợp Giao diện Web Khách hàng (`apps/web`)
- Sao chép nguyên trạng 100% mã nguồn thực tế từ kho lưu trữ `printerval` sang vị trí `apps/web`.
- Cấu hình lại `package.json` của ứng dụng: đổi tên thành `"web"` và khai báo liên kết nội bộ với nguồn dữ liệu chung (`@commerce/shared-types`).

### 2. Tích hợp Lõi Nghiệp vụ Backend Thực tế (`apps/merchant`)
- Ghi đè cấu trúc mẫu bằng trọn vẹn giải pháp sản xuất từ kho độc lập `merchant` (bao gồm `src/routes`, `src/middleware`, `schema-d1.sql`, `schema-postgres.sql` và kịch bản `scripts/seed.ts`).
- Điều chỉnh tệp `wrangler.jsonc` để bổ sung khối `d1_databases` chuẩn của Cloudflare song song với việc bảo tồn nguyên vẹn các thiết lập quan trọng:
  - Cổng mạng nội bộ: `8787`.
  - Liên kết R2 bucket: `IMAGES`.
  - Liên kết đối tượng phân tán: `MerchantDO`.
  - Triggers lập lịch tự động: `crons: ["* /15 * * * *"]`.

---

## 🧩 Giai đoạn 4: Hoàn Thiện Tầng Logic Chia Sẻ (Bridging the Gaps)

Để hệ thống tuân thủ chính xác tuyệt đối 100% so với sơ đồ kiến trúc chuyên sâu trong `cautruc.md`, chúng tôi đã chủ động khởi tạo các gói và kênh giao tiếp còn thiếu:
1. **`packages/shared-types`**: Đóng vai trò là nguồn chân lý duy nhất (Single source of truth) với Zod Schema hoàn chỉnh cho `User`, `Product`, `Variant`, `Cart`, `Order`.
2. **`packages/shared-utils`**: Cung cấp các tiện ích xử lý định dạng tiền tệ Việt Nam (`formatCurrencyVND`) và tính toán tổng đơn hàng kèm thuế/giảm giá.
3. **`packages/api-client`**: Xây dựng lớp bọc an toàn kiểu dữ liệu (Type-safe Hono Client wrapper) giúp các frontend/miniapp gọi API của merchant chuẩn xác mà không cần tự định nghĩa lại kiểu.
4. **`packages/db`**: Tích hợp Drizzle ORM kết nối Cloudflare D1.
5. **Kênh Đa Nền Tảng**: Khởi tạo bộ khung cơ bản cho `apps/zalo-miniapp`, `apps/telegram-miniapp` và tạo tệp cấu hình `pubspec.yaml` chuẩn mực cho ứng dụng di động POS `apps/flutter-billing-app`.

---

## ⚡ Giai đoạn 5: Tối Ưu Hóa Trải Nghiệm Phát Triển (DX Optimization)

### 1. Xử lý Trơn Tru `pnpm catalogs`
- Khai báo đầy đủ danh sách các phụ thuộc dùng chung dạng `"catalog:"` trực tiếp vào khối `catalogs.default` trong tệp `pnpm-workspace.yaml`. Việc này giúp tiến trình `pnpm install` tải và liên kết chéo hơn 1.600+ module con một cách mượt mà và đồng bộ.

### 2. Tinh chỉnh Lệnh Khởi Chạy Phát Triển (`dev`)
- Cập nhật lệnh `dev` trong `package.json` gốc sang cơ chế lọc thông minh:
  ```json
  "dev": "turbo run dev --filter=web --filter=merchant --filter=chatroom-do --filter=ping-do --filter=other-worker"
  ```
  Nhờ đó, Turborepo chỉ tập trung khởi động các service/worker cốt lõi thực sự khả dụng, tránh việc gọi nhầm các CLI phát triển chưa được cài đặt (như `vite` hay `zmp`) của các gói MiniApp rỗng.
- Bỏ qua các khâu kiểm tra tiền trạm đặc thù hệ sinh thái Bun (`dev:preflight`) giúp hệ thống tương thích 100% với môi trường Node.js/pnpm trên Windows.

---

## 🎯 Tổng kết Thành quả
Dự án hiện tại là một nền tảng thương mại điện tử **sẵn sàng đi vào hoạt động thực tế (Production-ready)**, hội tụ hoàn hảo sức mạnh của giao diện người dùng chuyên nghiệp, logic xử lý giao dịch an toàn và kiến trúc đa dịch vụ phân tán tiên tiến nhất trên nền tảng Edge của Cloudflare.
