// services/authService.ts
import Cookies from "js-cookie";

export const logoutAdmin = () => {
    // Sau này cần gọi API logout lên server thì viết thêm vào đây
    Cookies.remove("adminAuthToken");
};