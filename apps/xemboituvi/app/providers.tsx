"use client";

import SideCart from "@/components/ui/client/slide-cart";
import AuthModal from "@/features/auth/components/auth-model";
import { CartProvider } from "@/features/cart/context/cart-context";
import ToastProvider from "@/providers/toast-provider";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<CartProvider>
			<ToastProvider />
			{mounted ? (
				<>
					<AuthModal />
					<SideCart />
				</>
			) : null}
			{children}
		</CartProvider>
	);
}
