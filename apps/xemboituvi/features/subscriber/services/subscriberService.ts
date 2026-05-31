import axios from "axios";

const API_URL = "https://mysticmarguerite.com/new/backend/api";

export const deleteSubscriber = async (id: string) => {
    // ⚠️ LƯU Ý: Em check lại với Backend xem endpoint chính xác là 'deleteUser' hay 'deleteSubscriber' nhé.
    const response = await axios.delete(`${API_URL}/deleteUser/${id}`);
    return response.data;
};