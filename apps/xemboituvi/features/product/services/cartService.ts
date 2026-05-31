// services/cartService.ts
import axios from "axios";

const API_BASE_URL = "https://mysticmarguerite.com/new/backend/api";

export const addItemToCart = async (userId: string, productId: string, token: string) => {
    const response = await axios.post(
        `${API_BASE_URL}/cart`,
        {
            user_id: userId,
            product_id: productId,
            quantity: 1,
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};