// services/userService.ts
import axios from "axios";

// Nên đưa cái domain gốc vào biến môi trường (env), nhưng tạm thời để biến const ở ngoài cũng được
const API_URL = "https://mysticmarguerite.com/new/backend/api"; 

export const deleteUser = async (id: string) => {
    // Logic gọi API nằm gọn ở đây
    const response = await axios.delete(`${API_URL}/deleteUser/${id}`);
    return response.data;
};