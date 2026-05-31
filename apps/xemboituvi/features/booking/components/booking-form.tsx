"use client";
import {
	TcityOption,
	TcountryOption,
	TServicesColumnProps,
	TstateOption,
	TtimeslotsColumnProps,
	TuserProps,
} from "@/types";
import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Image from "next/image";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { getToken } from "@/features/auth/lib/get-token";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { paymentMethods } from "@/constants";
import PhoneInput from "react-phone-input-2";
import getService from "@/features/service/actions/get-service";
import { getUserData } from "@/features/user/actions/get-user";
import getTimeSlot from "@/features/timeslots/actions/get-timeslot";
import getTimeSlots from "@/features/timeslots/actions/get-timeslots";
import React, { useEffect, useState } from "react";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import { Country, State, City } from "country-state-city";
import dynamic from "next/dynamic";
const SquareWrapper = dynamic(() => import("@/components/ui/client/square-form"), { ssr: false });
const AnimatedText = dynamic(() => import("@/components/ui/client/animated-text"), { ssr: false });

export default function Form({ slug }: { slug: { id: string } }) {
	const serviceId = slug.id;
	const stripe = useStripe();
	const navigate = useRouter();
	const elements = useElements();
	const token = getToken("authToken");
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<TuserProps>();
	const [paymentMethod, setPaymentMethod] = useState<
		"card" | "paypal" | "venmo" | "square"
	>("card");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [cities, setCities] = useState<TcityOption[]>([]);
	const [states, setStates] = useState<TstateOption[]>([]);
	const [countries, setCountries] = useState<TcountryOption[]>([]);
	const [timeslot, setTimeSlot] = useState<TtimeslotsColumnProps>();
	const [timeslots, setTimeSlots] = useState<TtimeslotsColumnProps[]>([]);
	const [service, setService] = useState<TServicesColumnProps | null>(null);
	const [selectedState, setSelectedState] = useState<TstateOption | null>(null);
	const [selectedCountry, setSelectedCountry] = useState<TcountryOption | null>(
		null,
	);

	useEffect(() => {
		const fetchTimeSlots = async () => {
			try {
				const response = await getTimeSlots();
				setTimeSlots(response.timeslots);
			} catch (err) {
				console.error("Error fetching timeslots:", err);
			}
		};
		fetchTimeSlots();
	}, []);

	useEffect(() => {
		const fetchService = async () => {
			try {
				const response = await getService(serviceId);
				setService(response.service);
				setTotal(
					response.service?.price
						? Math.round(Number(response.service.price) * 100)
						: 0,
				);
			} catch (err) {
				console.error("Error fetching service:", err);
			}
		};
		fetchService();
	}, [serviceId]);

	useEffect(() => {
		const fetchUserData = async () => {
			const userData = await getUserData(token);
			setUser(userData);
		};
		fetchUserData();
	}, [token]);

	useEffect(() => {
		const countryList = Country.getAllCountries().map((country) => ({
			value: country.isoCode,
			label: country.name,
		}));
		setCountries(countryList);
	}, []);

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

	const [formData, setFormData] = useState({
		birth_date: "",
		birth_time: "",
		birth_place: "",
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
		country: "",
		street_address: "",
		town_city: "",
		state: "",
		zip: "",
		notes: "",
		status: "pending",
		time_slot_id: "",
		meeting_link: "",
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	});

	useEffect(() => {
		const fetchTimeSlot = async () => {
			try {
				const response = await getTimeSlot(formData.time_slot_id);
				setTimeSlot(response.timeslot);
			} catch (err) {
				console.error("Error fetching timeslots:", err);
			}
		};
		fetchTimeSlot();
	}, [formData.time_slot_id]);

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { id, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]:
				type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
		}));
	};

	const processBooking = async () => {
		const bookingData = {
			user_id: user?.id,
			service_id: service?.id,
			cart_items: [{ service_id: service?.id }],
			time_slot_id: timeslot?.id,
			...formData,
			meeting_link: null,
			status: "paid",
		};

		const bookingResponse = await axios.post(
			"https://mysticmarguerite.com/new/backend/api/placedBooking",
			bookingData,
			{ headers: { Authorization: `Bearer ${token}` } },
		);

		await axios.post("https://mysticmarguerite.com/new/backend/api/timeslot", {
			status: "booked",
		});

		return bookingResponse;
	};

	const handlePayPalPayment = async () => {
		setLoading(true);
		try {
			const response = await axios.post("/api/paypal/create-order", {
				amount: service?.price,
				description: `Booking for ${service?.title}`,
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
				amount: service?.price,
				note: `Booking for ${service?.title}`,
			});
			window.location.href = response.data.paymentUrl;
		} catch (error) {
			toast.error("Failed to initiate Venmo payment");
			setLoading(false);
		}
	};

	const handleSquarePayment = async (token: string) => {
		try {
			setLoading(true);

			const res = await fetch(
				"https://mysticmarguerite.com/new/backend/api/square/pay",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
					body: JSON.stringify({
						sourceId: token,
						amount: total,
					}),
				},
			);

			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Payment failed");

			await processBooking();
			toast.success("Booking successful!");
			navigate.push("/thank-you");
		} catch (error: any) {
			console.error("Payment Error:", error);
			toast.error(error.message || "Payment failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (paymentMethod === "card") {
			setLoading(true);
			if (!stripe || !elements) return;

			try {
				await axios.post(
					"https://mysticmarguerite.com/new/backend/api/payment-intent",
					{
						amount: total,
						currency: "usd",
					},
				);

				const { error, paymentIntent } = await stripe.confirmPayment({
					elements,
					confirmParams: {
						return_url: window.location.origin + "/thank-you",
						payment_method_data: {
							billing_details: {
								name: `${formData.first_name} ${formData.last_name}`,
								email: formData.email,
							},
						},
					},
					redirect: "if_required",
				});

				if (error) throw error;
				if (paymentIntent?.status !== "succeeded") return;

				await processBooking();
				toast.success("Booking successful!");
				navigate.push("/thank-you");
			} catch (err) {
				console.error("Payment Error:", err);
				toast.error(err.message || "Payment failed. Please try again.");
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className="w-full padding-x padding-y">
			<div className="w-full flex items-center justify-around">
				<div className="w-fit pb-2 border-b-4 border-[#2E073F]">
					<AnimatedText
						className="text-[#2E073F] font-sans heading font-medium leading-tight capitalize"
						text="Booking details"
					/>
				</div>
				<div className="w-fit pb-2 border-b-4 border-[#2E073F]">
					<AnimatedText
						className="text-[#2E073F] font-sans heading font-medium leading-tight capitalize"
						text="Card details"
					/>
				</div>
			</div>
			<div className="w-full flex gap-10 justify-between padding-y">
				<form
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-5">
					<div className="w-full flex items-center gap-5">
						<div className="w-full flex flex-col gap-3">
							<label
								className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
								htmlFor="first_name">
								First Name *
							</label>
							<input
								onChange={handleInputChange}
								value={formData.first_name}
								type="text"
								id="first_name"
								required
								className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular"
							/>
						</div>
						<div className="w-full flex flex-col gap-3">
							<label
								className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
								htmlFor="last_name">
								Last Name *
							</label>
							<input
								onChange={handleInputChange}
								value={formData.last_name}
								type="text"
								id="last_name"
								required
								className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular"
							/>
						</div>
					</div>
					<div className="w-full flex items-center gap-5">
						<div className="w-full flex flex-col gap-3">
							<label
								className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
								htmlFor="birth_date">
								Birth Date *
							</label>
							<input
								onChange={handleInputChange}
								value={formData.birth_date}
								type="date"
								id="birth_date"
								required
								className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular"
							/>
						</div>
						<div className="w-full flex flex-col gap-3">
							<label
								className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
								htmlFor="birth_time">
								Birth Time *
							</label>
							<input
								onChange={handleInputChange}
								value={formData.birth_time}
								type="time"
								id="birth_time"
								className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular"
							/>
						</div>
						<div className="w-full flex flex-col gap-3">
							<label
								className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
								htmlFor="birth_place">
								Birth Place
							</label>
							<input
								onChange={handleInputChange}
								value={formData.birth_place}
								type="text"
								id="birth_place"
								className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular"
							/>
						</div>
					</div>
					<div className="w-full flex items-center gap-5">
						<div className="w-full flex flex-col gap-3">
							<label
								className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
								htmlFor="phone">
								Phone *
							</label>
							<PhoneInput
								country={"us"}
								value={formData.phone}
								onChange={(phone) => setFormData({ ...formData, phone })}
								inputClass="!text-[20px] !font-gradient-regular !leading-tight !tracking-tight !text-black !border-2 !border-[#C6C6C6] !p-6 !w-full !pl-12 !h-[45px]"
								containerStyle={{
									width: "100%",
								}}
								buttonClass="!border-black/50 !border-2 !border-black/50"
								containerClass="!w-full"
							/>
						</div>
						<div className="w-full flex flex-col gap-3">
							<label
								className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
								htmlFor="email">
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
					<div className="w-full flex flex-col gap-3 relative">
						<label
							className="text-black paragraph leading-tight tracking-tight font-medium font-sans"
							htmlFor="time_slot_id">
							Select Time Slot *
						</label>
						<select
							onClick={() => setIsFilterOpen((prev) => !prev)}
							onChange={handleInputChange}
							value={formData.time_slot_id}
							id="time_slot_id"
							required
							className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular appearance-none">
							<option value="">Select a time slot</option>
							{timeslots.map((slot) => (
								<option
									key={slot.id}
									value={String(slot.id)}
									disabled={
										slot.status === "booked" || slot.status === "unavailable"
									}
									className={`${
										slot.status === "booked" || slot.status === "unavailable"
											? "line-through"
											: ""
									}`}>
									{new Date(slot.date).toLocaleDateString("en-US", {
										day: "numeric",
										month: "long",
										year: "numeric",
									})}{" "}
									-{" "}
									{new Date(`1970-01-01T${slot.start_time}`).toLocaleTimeString(
										"en-US",
										{
											hour: "2-digit",
											minute: "2-digit",
											hour12: true,
										},
									)}{" "}
									-{" "}
									{new Date(`1970-01-01T${slot.end_time}`).toLocaleTimeString(
										"en-US",
										{
											hour: "2-digit",
											minute: "2-digit",
											hour12: true,
										},
									)}{" "}
									{slot.status === "unavailable"
										? " (Unavailable)"
										: slot.status === "booked"
										? " (Booked)"
										: ""}
								</option>
							))}
						</select>
						<ChevronDown
							className={`absolute right-3 top-1/2 translate-y-1/2 w-5 h-5 pointer-events-none transform transition-transform text-[#C6C6C6] ${
								isFilterOpen ? "rotate-180" : ""
							}`}
						/>
						<ChevronDown
							className={`absolute right-3 top-1/2 translate-y-1/2 w-5 h-5 pointer-events-none transform transition-transform text-[#C6C6C6] ${
								isFilterOpen ? "rotate-180" : ""
							}`}
						/>
					</div>
					<div className="w-full flex flex-col gap-3">
						<label
							className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
							htmlFor="country">
							Country / Region *
						</label>
						<Select
							options={countries}
							value={selectedCountry}
							onChange={(value) => {
								setSelectedCountry(value);
								setFormData((prev) => ({
									...prev,
									country: value?.label || "",
								}));
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
						<label
							className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
							htmlFor="street_address">
							Street address *
						</label>
						<input
							onChange={handleInputChange}
							value={formData.street_address}
							type="text"
							id="street_address"
							required
							className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular"
						/>
					</div>
					<div className="w-full flex items-center gap-5">
						<div className="w-full flex flex-col gap-3">
							<label
								className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
								htmlFor="state">
								State*
							</label>
							<Select
								options={states}
								value={selectedState}
								onChange={(value) => {
									setSelectedState(value);
									setFormData({
										...formData,
										state: value?.value || "",
									});
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
							<label
								className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
								htmlFor="town_city">
								Town / City*
							</label>
							<Select
								options={cities}
								value={cities.find((c) => c.value === formData.town_city)}
								onChange={(value) =>
									setFormData({
										...formData,
										town_city: value?.value || "",
									})
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
							<label
								className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
								htmlFor="zip">
								ZIP/Postal Code
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
					<div className="w-full flex flex-col gap-3 relative">
						<label
							className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
							htmlFor="timezone">
							Timezone
						</label>
						<select
							onClick={() => setIsFilterOpen((prev) => !prev)}
							onChange={handleInputChange}
							value={formData.timezone}
							id="timezone"
							className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular bg-white/20 backdrop-blur-xl appearance-none">
							<option value="America/New_York">Eastern Time (ET)</option>
							<option value="America/Chicago">Central Time (CT)</option>
							<option value="America/Denver">Mountain Time (MT)</option>
							<option value="America/Los_Angeles">Pacific Time (PT)</option>
							<option value="UTC">UTC/GMT</option>
						</select>
						<ChevronDown
							className={`absolute right-3 top-1/2 translate-y-1/2 w-5 h-5 pointer-events-none transform transition-transform text-[#C6C6C6] ${
								isFilterOpen ? "rotate-180" : ""
							}`}
						/>
						<ChevronDown
							className={`absolute right-3 top-1/2 translate-y-1/2 w-5 h-5 pointer-events-none transform transition-transform text-[#C6C6C6] ${
								isFilterOpen ? "rotate-180" : ""
							}`}
						/>
					</div>
					<div className="w-full flex flex-col gap-3">
						<label
							className="text-black paragraph leading-tight tracking-tight font-medium montserrat"
							htmlFor="notes">
							Notes
						</label>
						<textarea
							onChange={handleInputChange}
							value={formData.notes}
							id="notes"
							rows={3}
							className="border-[#C6C6C6] border-2 px-4 py-2 w-full outline-none paragraph font-MonstrateRegular"
						/>
					</div>
					<div className="w-full py-5">
						<div className="w-full flex gap-4 mb-6">
							{paymentMethods.map((item) => (
								<button
									type="button"
									key={item.id}
									onClick={() =>
										setPaymentMethod(
											item.title as "card" | "paypal" | "venmo" | "square",
										)
									}
									className={`w-full px-4 py-2 border-2 rounded-md font-semibold capitalize flex flex-col items-center gap-2 ${
										paymentMethod === item.title
											? "bg-[#c7a743] text-white border-[#2E073F]"
											: "text-[#2E073F] border-[#2E073F] bg-transparent"
									}`}>
									<Image
										src={"https://sonketcauthep.com/wp-content/uploads/2022/07/Hinh-thuc-thanh-toan-bang-tien-mat.jpg"}
										alt={item.title}
										width={40}
										height={40}
									/>
									<span>{item.title}</span>
								</button>
							))}
						</div>

						{paymentMethod === "card" && <PaymentElement />}

						{paymentMethod === "paypal" && (
							<div className="text-black">
								<p className="mb-2 font-semibold">Pay with PayPal</p>
								<button
									type="button"
									onClick={handlePayPalPayment}
									disabled={loading}
									className="bg-[#003087] text-white px-6 py-3 rounded hover:bg-[#001f5b] w-full flex items-center justify-center gap-2">
									{loading ? (
										<>
											<Loader2 className="animate-spin" /> Processing...
										</>
									) : (
										<>
											<Image
												src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNjcU_u4q-cSP4yTOTUTJyIXORHY_HJ0pBSw&s"}
												alt="PayPal"
												width={20}
												height={20}
											/>
											Checkout with PayPal
										</>
									)}
								</button>
							</div>
						)}

						{paymentMethod === "venmo" && (
							<div className="text-black">
								<p className="mb-2 font-semibold">Pay with Venmo</p>
								<button
									type="button"
									onClick={handleVenmoPayment}
									disabled={loading}
									className="bg-[#3D95CE] text-white px-6 py-3 rounded hover:bg-[#307fb2] w-full flex items-center justify-center gap-2">
									{loading ? (
										<>
											<Loader2 className="animate-spin" /> Processing...
										</>
									) : (
										<>
											<Image
												src={"https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/5c/50/29/5c502909-eb6d-a3a4-d20a-f3c3070f6a0a/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/1200x630wa.png"}
												alt="Venmo"
												width={20}
												height={20}
											/>
											Pay with Venmo
										</>
									)}
								</button>
							</div>
						)}

						{paymentMethod === "square" && (
							<div className="text-black">
								<p className="mb-2 font-semibold">Pay with Square</p>
								<SquareWrapper
									amount={total}
									onPaymentSuccess={handleSquarePayment}
								/>
								{loading ? (
									<>
										<Loader2 className="animate-spin" />
										Processing...
									</>
								) : (
									"Book Now"
								)}
							</div>
						)}
					</div>

					<p className="text-black paragraph leading-normal tracking-tight font-MonstrateRegular">
						Your personal data will be used to process your order, support your
						experience throughout this website, and for other purposes described
						in our privacy policy.
					</p>

					{paymentMethod === "card" && (
						<button className="w-full bg-[#c7a743] mt-4 flex items-center justify-center gap-2 btn transition-all duration-300 ease-in-out text-white cursor-pointer px-4 py-4 capitalize montserrat paragraph leading-tight tracking-tight rounded-md">
							{loading ? (
								<div className="flex items-center gap-2">
									<Loader2 className="animate-spin mx-auto" /> Loading...
								</div>
							) : (
								"Book Now"
							)}
						</button>
					)}
				</form>
			</div>
		</div>
	);
}
