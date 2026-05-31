import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaypalCheckout({
	amount,
	onSuccess,
	onError,
}: {
	amount: number;
	onSuccess: (details: any) => void;
	onError: (error: any) => void;
}) {
	return (
		<PayPalScriptProvider
			options={{
				clientId:
					"AZDyzRtKVvuifQos6hvFoY5llPUe_xiuZRkSNXEx4gng6Et7P4S0d12198su2HmmVhce7dn1ZXnTpfXx",
			}}>
			<PayPalButtons
				style={{ layout: "vertical" }}
				createOrder={(data, actions) => {
					return actions.order.create({
						intent: "CAPTURE",
						purchase_units: [
							{
								amount: { currency_code: "USD", value: amount.toString() },
							},
						],
					});
				}}
				onApprove={async (data, actions) => {
					const details = await actions.order?.capture();
					onSuccess(details);
				}}
				onError={(err) => {
					onError(err);
				}}
			/>
		</PayPalScriptProvider>
	);
}
