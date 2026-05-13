# Gói Bảo Mật DRM

Giải pháp bảo mật media toàn diện để bảo vệ hình ảnh và video.

## 📦 Cấu Trúc File

```
src/packages/drm-security/
├── types.ts              # Định nghĩa kiểu dữ liệu
├── validators.ts         # Xác thực tệp media
├── tokens.ts             # Quản lý token truy cập
├── watermark.ts          # Tạo & áp dụng watermark
├── encryption.ts         # Mã hóa URL & bảo mật token
├── anti-copy.ts          # Chống sao chép/chụp màn hình/F12
├── media-security.ts     # Trình quản lý chính
├── index.ts              # Xuất package
└── README.md             # Tệp này
```

## 📋 Chức Năng Từng File

### 1. **types.ts** - Định Nghĩa Kiểu Dữ Liệu
Định nghĩa các interface và kiểu TypeScript:
- `MediaSecurityConfig` - Cấu hình bảo mật
- `MediaAccessToken` - Cấu trúc token với hết hạn
- `ValidationResult` - Kết quả xác thực tệp
- `SecureMediaResult` - Phản hồi media được bảo vệ

---

### 2. **validators.ts** - Xác Thực Tệp Media
Xác thực tệp media trước khi xử lý:
- `validateMedia(file, type)` - Xác thực hình ảnh hoặc video
- `validateImage(file)` - Xác thực hình ảnh
- `validateVideo(file)` - Xác thực video
- `isImage(file)` - Kiểm tra có phải hình ảnh
- `isVideo(file)` - Kiểm tra có phải video

**Quy tắc:**
- Hình ảnh: JPEG, PNG, WebP (max 50MB)
- Video: MP4, WebM (max 500MB)

---

### 3. **tokens.ts** - Quản Lý Token Truy Cập
Quản lý token với hết hạn và giới hạn lượt xem:
- `generateAccessToken(userId, mediaId, maxViews)` - Tạo token mới
- `verifyAccessToken(token)` - Kiểm tra tính hợp lệ token
- `incrementViewCount(token)` - Tăng lượt xem
- `revokeAccessToken(token)` - Thu hồi token
- `getTokenInfo(token)` - Lấy chi tiết token
- `getUserTokens(userId)` - Lấy token của người dùng
- `revokeUserTokens(userId)` - Thu hồi tất cả token người dùng
- `cleanupExpiredTokens()` - Dọn dẹp token hết hạn

---

### 4. **watermark.ts** - Bảo Vệ Bằng Watermark
Tạo và áp dụng watermark vào hình ảnh:
- `generateWatermark(width, height, text, opacity)` - Tạo canvas watermark
- `applyWatermarkToImage(src, text, opacity)` - Thêm watermark vào hình ảnh
- `generatePatternWatermark(...)` - Tạo watermark lặp lại
- `applyPatternWatermark(...)` - Áp dụng watermark mô hình

**Tính năng:**
- Watermark chéo
- Độ mờ tùy chỉnh
- Mô hình lặp lại
- Hỗ trợ CORS

---

### 5. **encryption.ts** - Mã Hóa & Bảo Mật
Mã hóa URL và quản lý token bảo mật:
- `encryptMediaUrl(url, key)` - Mã hóa URL
- `decryptMediaUrl(encrypted)` - Giải mã URL
- `generateEncryptionKey(length)` - Tạo khóa ngẫu nhiên
- `hashString(str)` - Hash SHA-256
- `verifyHash(str, hash)` - Xác minh hash
- `createSignedToken(data, secret, expiration)` - Tạo token ký
- `verifySignedToken(token, secret)` - Xác minh token ký
- `obfuscateUrl(url)` - Làm mơ hồ URL
- `deobfuscateUrl(obfuscated)` - Giải mơ hồ URL

---

### 6. **anti-copy.ts** - Chống Sao Chép & Kiểm Tra
Ngăn chặn sao chép, chụp màn hình, F12 và lợi dụng khác:
- `applyProtection(element)` - Áp dụng tất cả bảo vệ
- `setupAutoProtection(selector, retryDelay)` - Tự động áp dụng
- `disableInteractions(element)` - Vô hiệu hóa tương tác
- `enableInteractions(element)` - Kích hoạt tương tác

**Bảo vệ:**
- ✅ Chặn Ctrl+C, Ctrl+A, Ctrl+X, Ctrl+V
- ✅ Chặn F12 (Dev Tools)
- ✅ Chặn Ctrl+Shift+I (Dev Tools)
- ✅ Chặn Ctrl+Shift+C (Inspector)
- ✅ Chặn menu chuột phải
- ✅ Chặn chọn văn bản
- ✅ Chặn copy/cut/paste
- ✅ Chặn kéo thả
- ✅ CSS user-select
- ✅ Bảo vệ PDF layers
- ✅ Giám sát DOM

---

### 7. **media-security.ts** - Trình Quản Lý Chính
Điều phối tất cả tính năng bảo mật:
- `constructor(config)` - Khởi tạo với cấu hình
- `validateMedia(file, type)` - Xác thực media
- `generateAccessToken(userId, mediaId, maxViews)` - Tạo token
- `applyWatermark(src)` - Thêm watermark
- `getSecurityCSS()` - Lấy CSS bảo vệ
- `getSecureMedia(url, type, token)` - Lấy media được bảo vệ
- `applyAntiCopyProtection(element)` - Áp dụng chống sao chép
- `setupAutoAntiCopyProtection(selector, delay)` - Tự động chống sao chép
- `encryptMediaUrl(url, key)` - Mã hóa URL
- `decryptMediaUrl(encrypted)` - Giải mã URL
- `getConfig()` / `updateConfig(config)` - Quản lý cấu hình

---

### 8. **index.ts** - Xuất Package
Xuất tất cả API công khai:
- `MediaSecurityManager` class
- `mediaSecurityManager` singleton
- Tất cả types
- Utility classes: `MediaValidator`, `TokenManager`, `WatermarkManager`, `EncryptionManager`, `AntiCopyProtection`
