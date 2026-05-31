"use client";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import axios from "axios";
import { getToken } from "@/features/auth/lib/get-token";
import { TcartColumnProps, TcartContextType } from "@/types";
const CartContext = createContext<TcartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState<TcartColumnProps[]>([]);
	const [token, setToken] = useState<string | null>(null);

	const closeCart = useCallback(() => setIsCartOpen(false), []);
	const toggleCart = () => setIsCartOpen(!isCartOpen);

	useEffect(() => {
		const storedToken = getToken("authToken");
		if (storedToken) setToken(storedToken);
	}, []);

	const fetchCartItems = useCallback(async () => {
		if (!token) return;

		try {
			const response = await axios.get(
				"https://mysticmarguerite.com/new/backend/api/cart",
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			setCartItems(response.data);
		} catch (error) {
			console.error("Error fetching cart items:", error);
			setCartItems([]);
		}
	}, [token]);

	useEffect(() => {
		if (isCartOpen && token) {
			fetchCartItems();
		}
	}, [isCartOpen, token, fetchCartItems]);

	const cartCount = cartItems.length;

	return (
		<CartContext.Provider
			value={{
				isCartOpen,
				toggleCart,
				closeCart,
				cartCount,
				refreshCart: fetchCartItems,
			}}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
