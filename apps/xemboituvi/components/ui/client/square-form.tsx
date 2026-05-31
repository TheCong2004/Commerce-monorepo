"use client";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

export default function SquareWrapper({
	amount,
	onPaymentSuccess,
}: {
	amount: number;
	onPaymentSuccess: (result: any) => Promise<void>;
}) {
	return (
		<PaymentForm
			applicationId="sandbox-sq0idb-IVbmllY44YzqkyAX3oTG4g"
			locationId="LZ3934782G2QZ"
			cardTokenizeResponseReceived={async (tokenResult) => {
				try {
					if (tokenResult.status === "OK") {
						const token = tokenResult.token;
						await onPaymentSuccess(token);
					} else {
						let errorMessage = "Payment failed";
						if ("errors" in tokenResult && Array.isArray(tokenResult.errors)) {
							errorMessage = tokenResult.errors
								.map((err) => err.message)
								.join(", ");
							}
						throw new Error(errorMessage);
					}
				} catch (error) {
					console.error("Payment Error:", error);
					throw error;
				}
			}}>
			<CreditCard />
		</PaymentForm>
	);
}
