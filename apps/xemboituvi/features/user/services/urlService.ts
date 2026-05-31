// services/urlService.ts
export const getProductMainImage = (imageJson: string | undefined | null) => {
    if (!imageJson) return null;
    try {
        // Parse chuỗi JSON để lấy mảng, sau đó lấy phần tử đầu tiên
        const images = JSON.parse(imageJson);
        if (Array.isArray(images) && images.length > 0) {
            // Tận dụng hàm getImageUrl cũ để nối domain
            return getImageUrl(images[0]); 
        }
    } catch (e) {
        console.error("Error parsing product image:", e);
    }
    return null; // Trả về null nếu lỗi để hiển thị placeholder
};
// Khai báo Base URL của Storage ở một chỗ duy nhất
const STORAGE_BASE_URL = "https://mysticmarguerite.com/new/backend/storage";

export const getImageUrl = (imagePath: string | null | undefined) => {
  if (!imagePath) return null;
  
  // Kiểm tra xem ảnh có phải là link tuyệt đối chưa (http...) hay là path tương đối
  if (imagePath.startsWith("http")) {
      return imagePath;
  }
  
  return `${STORAGE_BASE_URL}/${imagePath}`;
};