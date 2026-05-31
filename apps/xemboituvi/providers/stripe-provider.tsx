"use client";
import { Loader2 } from "lucide-react";
import { getToken } from "@/features/auth/lib/get-token";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import getService from "@/features/service/actions/get-service";
import { Elements } from "@stripe/react-stripe-js";
import { TcartColumnProps, TServicesColumnProps } from "@/types";

const stripePromise = loadStripe(
	"pk_test_51RZJPvB1nBkxPyYeHPS3aFw1ZwHR5F7O7s4PSViU2BsoNnky1ojdhO9NDqvwFnerfRNsAWBjCIwkUndBr0V6B1cZ004m05TEkm",
);

export default function StripeProvider({
	children,
	serviceId,
}: {
	children: React.ReactNode;
	serviceId?: string;
}) {
	const token = getToken("authToken");
	const [amount, setAmount] = useState<number>(0);
	const [clientSecret, setClientSecret] = useState("");
	const [services, setService] = useState<TServicesColumnProps | null>(null);

	useEffect(() => {
		const fetchService = async () => {
			try {
				const response = await getService(serviceId);
				setService(response.service);
				if (response.service?.price) {
					setAmount(Number(response.service.price));
				} else {
					throw new Error("Invalid service data");
				}
			} catch (err) {
				console.error("Error fetching service:", err);
			}
		};
		fetchService();
	}, [serviceId]);

	useEffect(() => {
		if (serviceId) return;

		const fetchCartItems = async () => {
			try {
				const response = await fetch(
					`https://mysticmarguerite.com/new/backend/api/cart`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				const data = await response.json();

				const total = data.reduce((total: number, item: TcartColumnProps) => {
					return total + Number(item.product.price);
				}, 0);

				setAmount(total);
			} catch (error) {
				console.error("Error fetching cart:", error);
			}
		};

		fetchCartItems();
	}, [serviceId, token]);

	useEffect(() => {
		const fetchClientSecret = async () => {
			try {
				const response = await fetch(
					"https://mysticmarguerite.com/new/backend/api/payment-intent",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": `Bearer ${token}`,
						},
						body: JSON.stringify({
							amount: Math.round(amount * 100),
							currency: "usd",
						}),
					},
				);

				const data = await response.json();
				setClientSecret(data.clientSecret);
			} catch (error) {
				console.error("Error creating payment intent:", error);
			}
		};

		if (amount > 0) {
			fetchClientSecret();
		}
	}, [amount, token]);

	if (!clientSecret) {
		return (
			<div className="w-full h-screen flex justify-center items-center">
				<Loader2 className="h-10 w-10 animate-spin text-gray-500" />
			</div>
		);
	}

	return (
		<Elements
			stripe={stripePromise}
			options={{ clientSecret }}>
			{children}
		</Elements>
	);
}
