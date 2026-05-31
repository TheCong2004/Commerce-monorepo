import axios from "axios";

// Đặt Base URL ở ngoài (hoặc lấy từ file config chung sau này)
const API_URL = "https://mysticmarguerite.com/new/backend/api"; 

export const deleteTimeslot = async (id: string) => {
    // Gọi API xóa Timeslot
    const response = await axios.delete(`${API_URL}/timeslot/${id}`);
    return response.data;
};