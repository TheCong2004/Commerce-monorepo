// services/businessService.ts
import axios from "axios";

// Base URL nên để ở biến môi trường hoặc file config chung
const API_URL = "https://mysticmarguerite.com/new/backend/api"; 

export const deleteService = async (id: string) => {
    // Gọi API xóa dịch vụ (Product/Service)
    const response = await axios.delete(`${API_URL}/service/${id}`);
    return response.data;
};