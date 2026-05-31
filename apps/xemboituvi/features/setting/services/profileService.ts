// services/profileService.ts
import axios from "axios";
import { TUserProfileProps } from "@/features/auth/schemas";

const API_BASE_URL = "https://mysticmarguerite.com/new/backend/api";

// 1. Hàm lấy thông tin Profile
export const getUserProfile = async (token: string) => {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// 2. Hàm update Profile (Xử lý FormData ở đây luôn)
export const updateUserProfile = async (
    userId: string,
    data: TUserProfileProps,
    file: File | null, // Nhận trực tiếp File, không chơi base64 rồi convert lại
    token: string
) => {
    const formData = new FormData();
    
    // Append các field text
    Object.keys(data).forEach((key) => {
        if (key !== "image") {
            formData.append(key, data[key as keyof TUserProfileProps]);
        }
    });

    // Append File ảnh (nếu có user chọn ảnh mới)
    if (file) {
        formData.append("image", file);
    }

    const response = await axios.post(
        `${API_BASE_URL}/profile/update/${userId}`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
};