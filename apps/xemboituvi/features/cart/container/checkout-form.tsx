"use client";
import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Image from "next/image";
import Select from "react-select";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { getToken } from "@/features/auth/lib/get-token";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import { paymentMethods } from "@/constants";
import { getUserData } from "@/features/user/actions/get-user";
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import SquareWrapper from "@/components/ui/client/square-form";
import AnimatedText from "@/components/ui/client/animated-text";
import { TcityOption, TcountryOption, TstateOption, TuserProps } from "@/types";
import PaypalCheckout from "@/components/ui/client/paypal-checkout";

export default function Form() {
	const navigate = useRouter();
	const token = getToken("authToken");
	const stripe = useStripe();
	const elements = useElements();

	const [user, setUser] = useState<TuserProps>();
	const [loading, setLoading] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState<
		"card" | "paypal" | "venmo" | "square"
	>("card");
	const [cartItems, setCartItems] = useState<any[]>([]);
	const [cartTotal, setCartTotal] = useState<number>(0);
	const [cities, setCities] = useState<TcityOption[]>([]);
	const [states, setStates] = useState<TstateOption[]>([]);
	const [countries, setCountries] = useState<TcountryOption[]>([]);
	const [selectedState, setSelectedState] = useState<TstateOption | null>(null);
	const [selectedCountry, setSelectedCountry] = useState<TcountryOption | null>(
		null,
	);

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		country: "",
		streetAddress: "",
		townCity: "",
		state: "",
		zip: "",
		agreedTerms: false,
	});

	// Fetch user data
	useEffect(() => {
		const fetchUserData = async () => {
			const userData = await getUserData(token);
			setUser(userData);
		};
		fetchUserData();
	}, [token]);

	// Fetch cart items
	useEffect(() => {
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
				const total = data.reduce((total: number, item: any) => {
					const quantity = item.quantity || 1;
					const price = parseFloat(item.product?.price || "0");
					return total + quantity * price;
				}, 0);
				setCartItems(data);
				setCartTotal(total);
			} catch (error: unknown) {
				console.error("Error fetching cart items:", error);
			}
		};
		fetchCartItems();
	}, [token]);

	// Initialize countries
	useEffect(() => {
		const countryList = Country.getAllCountries().map((country) => ({
			value: country.isoCode,
			label: country.name,
		}));
		setCountries(countryList);
	}, []);

	// Update states when country changes
	useEffect(() => {
		if (selectedCountry) {
			const stateList = State.getStatesOfCountry(selectedCountry.value).map(
				(state) => ({
					value: state.isoCode,
					label: state.name,
				}),
			);
			setStates(stateList);
			setSelectedState(null);
			setCities([]);
		}
	}, [selectedCountry]);

	// Update cities when state changes
	useEffect(() => {
		if (selectedCountry && selectedState) {
			const cityList = City.getCitiesOfState(
				selectedCountry.value,
				selectedState.value,
			).map((city) => ({
				value: city.name,
				label: city.name,
			}));
			setCities(cityList);
		}
	}, [selectedState, selectedCountry]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: type === "checkbox" ? checked : value,
		}));
	};

	const processOrder = async () => {
		const orderData = {
			user_id: user?.id,
			cart_items: cartItems.map((item) => ({
				product_id: item.product.id,
				quantity: item.quantity || 1,
			})),
			first_name: formData.firstName,
			last_name: formData.lastName,
			email: formData.email,
			phone: formData.phone,
			country: formData.country,
			street_address: formData.streetAddress,
			town_city: formData.townCity,
			state: formData.state,
			zip: formData.zip,
			agreed_terms: formData.agreedTerms,
		};

		try {
			const orderResponse = await axios.post(
				"https://mysticmarguerite.com/new/backend/api/placedOrder",
				orderData,
			);

			await axios.put(
				`https://mysticmarguerite.com/new/backend/api/orders/${orderResponse.data.order_id}/status`,
				{ status: "paid" },
			);

			// Clear cart after successful order
			await axios.delete("https://mysticmarguerite.com/new/backend/api/cart", {
				headers: { Authorization: `Bearer ${token}` },
			});

			setCartItems([]);
			setCartTotal(0);
			return true;
		} catch (error) {
			console.error("Error processing order:", error);
			return false;
		}
	};

	const handleStripePayment = async () => {
		if (!stripe || !elements) return;

		setLoading(true);
		try {
			const amountInCents = Math.round(cartTotal * 100);

			// Create payment intent
			await axios.post(
				"https://mysticmarguerite.com/new/backend/api/payment-intent",
				{
					amount: amountInCents,
					currency: "usd",
				},
			);

			// Confirm payment
			const { error, paymentIntent } = await stripe.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${window.location.origin}/thank-you`,
					payment_method_data: {
						billing_details: {
							name: `${formData.firstName} ${formData.lastName}`,
							email: formData.email,
						},
					},
				},
				redirect: "if_required",
			});

			if (error) throw error;
			if (paymentIntent?.status !== "succeeded") {
				throw new Error("Payment not succeeded");
			}

			// Process order after successful payment
			const orderSuccess = await processOrder();
			if (!orderSuccess) throw new Error("Order processing failed");

			toast.success("Payment successful!");
			navigate.push("/thank-you");
		} catch (err) {
			console.error("Payment Error:", err);
			toast.error(err.message || "Payment failed. Try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleSquarePayment = async (token: string) => {
		setLoading(true);
		try {
			const amountInCents = Math.round(cartTotal * 100);

			// Process Square payment
			const res = await fetch("https://mysticmarguerite.com/new/api/square", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					sourceId: token,
					amount: amountInCents,
					currency: "USD",
					buyerEmail: formData.email,
				}),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Payment failed");

			// Process order after successful payment
			const orderSuccess = await processOrder();
			if (!orderSuccess) throw new Error("Order processing failed");

			toast.success("Payment successful!");
			navigate.push("/thank-you");
		} catch (error) {
			console.log("Payment Error:", error);
			toast.error(error.message || "Payment failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handlePayPalPayment = async () => {
		setLoading(true);
		try {
			const response = await axios.post("/api/paypal/create-order", {
				amount: cartTotal,
				description: `Order for ${formData.firstName} ${formData.lastName}`,
				email: formData.email,
			});
			window.location.href = response.data.approvalUrl;
		} catch (error) {
			toast.error("Failed to initiate PayPal payment");
			setLoading(false);
		}
	};

	const handleVenmoPayment = async () => {
		setLoading(true);
		try {
			const response = await axios.post("/api/venmo/payment", {
				amount: cartTotal,
				note: `Order for ${formData.firstName} ${formData.lastName}`,
				email: formData.email,
			});
			window.location.href = response.data.paymentUrl;
		} catch (error) {
			toast.error("Failed to initiate Venmo payment");
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Validate form
		if (!formData.agreedTerms) {
			toast.error("Please agree to the terms and conditions");
			return;
		}

		// Handle payment based on selected method
		switch (paymentMethod) {
			case "card":
				await handleStripePayment();
				break;
			case "square":
				// Square handles its own submission via the SquareWrapper
				break;
			case "paypal":
				await handlePayPalPayment();
				break;
			case "venmo":
				await handleVenmoPayment();
				break;
			default:
				toast.error("Please select a payment method");
		}
	};

	return (
		<div className="w-full padding-x padding-y">
			<div className="w-full flex items-center justify-around">
				<div className="w-fit pb-2 border-b-4 border-[#2E073F]">
					<AnimatedText
						className="text-[#2E073F] papyrus heading font-semibold leading-tight capitalize"
						text="Billing details"
					/>
				</div>
				<div className="w-fit pb-2 border-b-4 border-[#2E073F]">
					<AnimatedText
						className="text-[#2E073F] papyrus heading font-semibold leading-tight capitalize"
						text="Card details"
					/>
				</div>
			</div>

			<div className="w-full flex gap-10 justify-between padding-y">
				<form
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-5">
					{/* Left Column - Billing Details */}
					<div className="w-full flex gap-5">
						<div className="w-1/2 flex flex-col gap-5">
							{/* Name Fields */}
							<div className="w-full flex items-center gap-5">
								<div className="w-full flex flex-col gap-3">
									<label className="text-black paragraph leading-tight tracking-tight font-medium montserrat">
										First Name *
									</label>
									<input
										onChange={handleInputChange}
										value={formData.firstName}
										type="text"
										id="firstName"
										required
										className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular"
									/>
								</div>
								<div className="w-full flex flex-col gap-3">
									<label className="text-black paragraph leading-tight tracking-tight font-medium montserrat">
										Last Name *
									</label>
									<input
										onChange={handleInputChange}
										value={formData.lastName}
										type="text"
										id="lastName"
										required
										className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular"
									/>
								</div>
							</div>

							{/* Contact Fields */}
							<div className="w-full flex items-center gap-5">
								<div className="w-full flex flex-col gap-3">
									<label className="text-black paragraph leading-tight tracking-tight font-medium montserrat">
										Phone *
									</label>
									<PhoneInput
										country={"us"}
										value={formData.phone}
										onChange={(phone) => setFormData({ ...formData, phone })}
										inputClass="!text-[20px] !font-gradient-regular !leading-tight !tracking-tight !text-black !border-2 !border-[#C6C6C6] !p-6 !w-full !pl-12 !h-[45px]"
										containerStyle={{ width: "100%" }}
										buttonClass="!border-black/50 !border-2 !border-black/50"
										containerClass="!w-full"
									/>
								</div>
								<div className="w-full flex flex-col gap-3">
									<label className="text-black paragraph leading-tight tracking-tight font-medium montserrat">
										Email*
									</label>
									<input
										onChange={handleInputChange}
										value={formData.email}
										type="email"
										id="email"
										required
										className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular"
									/>
								</div>
							</div>

							{/* Address Fields */}
							<div className="w-full flex flex-col gap-3">
								<label className="text-black paragraph leading-tight tracking-tight font-medium montserrat">
									Country / Region *
								</label>
								<Select
									options={countries}
									value={selectedCountry}
									onChange={(value) => {
										setSelectedCountry(value);
										setFormData({ ...formData, country: value?.label || "" });
									}}
									className="paragraph font-gradient-regular leading-tight tracking-tight text-black outline-none w-full paragraph font-MonstrateRegular"
									styles={{
										control: (base) => ({
											...base,
											border: "2px solid #C6C6C6",
											padding: "0.4rem 0",
											color: "black",
											background: "white",
											boxShadow: "none",
										}),
										option: (base, { isFocused }) => ({
											...base,
											backgroundColor: isFocused ? "#f3f4f6" : "white",
											color: "black",
											cursor: "pointer",
											padding: "0.5rem 1rem",
										}),
										singleValue: (base) => ({
											...base,
											color: "black",
										}),
										input: (base) => ({
											...base,
											color: "black",
										}),
									}}
								/>
							</div>

							<div className="w-full flex flex-col gap-3">
								<label className="text-black paragraph leading-tight tracking-tight font-medium montserrat">
									Street address *
								</label>
								<input
									onChange={handleInputChange}
									value={formData.streetAddress}
									type="text"
									id="streetAddress"
									required
									className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular"
								/>
							</div>

							<div className="w-full flex items-center gap-5">
								<div className="w-full flex flex-col gap-3">
									<label className="text-black paragraph leading-tight tracking-tight font-medium montserrat">
										State*
									</label>
									<Select
										options={states}
										value={selectedState}
										onChange={(value) => {
											setSelectedState(value);
											setFormData({ ...formData, state: value?.value || "" });
										}}
										className="paragraph font-gradient-regular leading-tight tracking-tight text-black outline-none"
										styles={{
											control: (base) => ({
												...base,
												border: "2px solid #C6C6C6",
												padding: "0.4rem 0",
												color: "black",
												background: "white",
												boxShadow: "none",
											}),
											option: (base, { isFocused }) => ({
												...base,
												backgroundColor: isFocused ? "#f3f4f6" : "white",
												color: "black",
												cursor: "pointer",
												padding: "0.5rem 1rem",
											}),
											singleValue: (base) => ({
												...base,
												color: "black",
											}),
											input: (base) => ({
												...base,
												color: "black",
											}),
										}}
									/>
								</div>
								<div className="w-full flex flex-col gap-3">
									<label className="text-black paragraph leading-tight tracking-tight font-medium montserrat">
										City*
									</label>
									<Select
										options={cities}
										value={cities.find((c) => c.value === formData.townCity)}
										onChange={(value) =>
											setFormData({ ...formData, townCity: value?.value || "" })
										}
										className="w-full paragraph font-gradient-regular leading-tight tracking-tight text-black outline-none"
										styles={{
											control: (base) => ({
												...base,
												border: "2px solid #C6C6C6",
												padding: "0.4rem 0",
												color: "black",
												background: "white",
												boxShadow: "none",
											}),
											option: (base, { isFocused }) => ({
												...base,
												backgroundColor: isFocused ? "#f3f4f6" : "white",
												color: "black",
												cursor: "pointer",
												padding: "0.5rem 1rem",
											}),
											singleValue: (base) => ({
												...base,
												color: "black",
											}),
											input: (base) => ({
												...base,
												color: "black",
											}),
										}}
									/>
								</div>
								<div className="w-full flex flex-col gap-3">
									<label className="text-black paragraph leading-tight tracking-tight font-medium montserrat">
										Zip
									</label>
									<input
										onChange={handleInputChange}
										value={formData.zip}
										type="text"
										id="zip"
										className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular"
									/>
								</div>
							</div>

							{/* Terms and Conditions */}
							<p className="text-black paragraph leading-normal tracking-tight font-MonstrateRegular">
								Your personal data will be used to process your order, support
								your experience throughout this website, and for other purposes
								described in our privacy policy.
							</p>
							<div className="flex items-center gap-2">
								<input
									onChange={handleInputChange}
									checked={formData.agreedTerms}
									id="agreedTerms"
									type="checkbox"
									required
									className="w-5 h-5 outline-none border-none"
								/>
								<label
									htmlFor="agreedTerms"
									className="paragraph text-[#000] leading-tight tracking-tight font-MonstrateRegular">
									I have read and agree to the website terms and conditions.
								</label>
							</div>
						</div>

						{/* Right Column - Payment Methods */}
						<div className="w-1/2 border-l-2 border-black/10 pl-10 py-10">
							<div className="w-full flex gap-4 mb-6">
								{paymentMethods.map((item) => (
									<button
										type="button"
										key={item.id}
										onClick={() => setPaymentMethod(item.title as any)}
										className={`w-full px-4 py-2 border-2 rounded-md font-semibold capitalize ${
											paymentMethod === item.title
												? "bg-[#c7a743] text-white border-[#2E073F]"
												: "text-[#2E073F] border-[#2E073F] bg-transparent"
										}`}>
										<div className="w-fit flex flex-col gap-2">
											<Image
												src={"https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266650/Wands14_py0tik.png"}
												alt="icon"
												width={40}
												height={40}
											/>
											<p>{item.title}</p>
										</div>
									</button>
								))}
							</div>

							{paymentMethod === "card" && <PaymentElement />}

							{paymentMethod === "paypal" && (
								<div className="text-black">
									<p className="mb-2 font-semibold">Pay with PayPal</p>
									<PaypalCheckout
										amount={cartTotal}
										onSuccess={handlePayPalPayment}
										onError={(error) => {
											console.error("PayPal Error:", error);
											toast.error("PayPal payment failed");
										}}
									/>
								</div>
							)}

							{paymentMethod === "venmo" && (
								<div className="text-black">
									<p className="mb-2 font-semibold">Pay with Venmo</p>
									<button
										type="button"
										onClick={handleVenmoPayment}
										disabled={loading}
										className="bg-[#3D95CE] text-white px-6 py-4 rounded hover:bg-[#307fb2] w-full flex items-center justify-center gap-2  capitalize montserrat paragraph leading-tight tracking-tight">
										{loading ? (
											<>
												<Loader2 className="animate-spin" /> Processing...
											</>
										) : (
											"Pay with Venmo"
										)}
									</button>
								</div>
							)}

							{paymentMethod === "square" && (
								<div className="text-black">
									<p className="mb-2 font-semibold">Pay with Square</p>
									<SquareWrapper
										amount={cartTotal}
										onPaymentSuccess={handleSquarePayment}
									/>
									{loading && (
										<div className="mt-4 flex items-center justify-center gap-2">
											<Loader2 className="animate-spin" />
											<span>Processing payment...</span>
										</div>
									)}
								</div>
							)}
							{paymentMethod === "card" && (
								<button
									type="submit"
									className="w-full text-center bg-[#c7a743] mt-4 flex items-center justify-center gap-2 btn transition-all duration-300 ease-in-out text-white px-4 py-4 capitalize cursor-pointer montserrat paragraph leading-tight tracking-tight rounded-md">
									{loading ? (
										<>
											<Loader2 className="animate-spin" />
											Processing...
										</>
									) : (
										"Place Order"
									)}
								</button>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
