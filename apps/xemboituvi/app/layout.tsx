"use client";
import "@/styles/globals.css";
import { useEffect } from "react";
import { SideCart } from "@/components/ui/client";
import { CartProvider } from "@/features/cart/context/cart-context";
import ToastProvider from "@/providers/toast-provider";
import AuthModal from "@/features/auth/components/auth-model";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			new LocomotiveScroll();
		})();
	}, []);
	return (
		<CartProvider>
			<html
				lang="en"
				suppressHydrationWarning>
				<body  className="bg-black">
					<ToastProvider />
					<AuthModal />
					<SideCart />
					{/* Offset for fixed header on desktop/mobile */}
					<div className="">
						{children}
					</div>
				</body>
			</html>
		</CartProvider>
	);
}
