"use client";
import axios from "axios";
import Image from "next/image";
import { getToken } from "@/features/auth/lib/get-token";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoundButton from "@/components/ui/client/round-button";

export default function Cart() {
	const router = useRouter();
	const token = getToken("authToken");
	const [cartItems, setCartItems] = useState<any[]>([]);
	const [cartTotal, setCartTotal] = useState<number>(0);

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
				setCartItems(data);
				const total = data
					.reduce(
						(total: number, item: { product?: { price?: string } }) =>
							total + parseFloat(item.product?.price || "0"),
						0,
					)
					.toFixed(2);
				setCartTotal(parseFloat(total));
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.log(error.message);
				} else {
					console.log("An unknown error occurred");
				}
			}
		};
		fetchCartItems();
	}, [token]);

	const deleteCartItem = async (id: string) => {
		try {
			await axios.delete(
				`https://mysticmarguerite.com/new/backend/api/cart/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			setCartItems(cartItems.filter((item) => item.id !== id));
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error.message);
			} else {
				console.log("An unknown error occurred");
			}
		}
	};

	return (
		<div className="w-full flex gap-5 justify-between padding-x padding-y shadow-md">
			<div className="w-full h-fit">
				<div className="flex justify-between border-b pb-4 items-center">
					<h1 className="font-bold forum heading leading-tight text-[#2E073F]">
						Shopping Cart
					</h1>
				</div>
				<div className="w-full flex justify-between gap-5 pt-10 mb-14 xm:flex-col sm:flex-col">
					<div className="w-full flex flex-col gap-5">
						{cartItems.length === 0 ? (
							<div className="flex flex-col">
								<p className="montserrat paragraph leading-tight text-black font-medium pb-2">
									Your cart is empty!
								</p>
								<div className="w-fit bg-[#c7a743] flex items-center justify-between bg-secondry cursor-pointer rounded-md group">
									<RoundButton
										href="/products"
										title="Brows Products"
										className="bg-white text-black"
										bgcolor="#000"
										style={{ color: "#fff" }}
									/>
								</div>
							</div>
						) : (
							<>
								{cartItems.map((item) => {
									let imageSrc = "default-image.png";
									try {
										if (item.product?.image) {
											const imageData = JSON.parse(item.product.image);
											if (Array.isArray(imageData) && imageData.length > 0) {
												imageSrc = `https://mysticmarguerite.com/new/backend/storage/${imageData[0]}`;
											}
										}
									} catch (error) {
										console.error("Error parsing image:", error);
									}
									return (
										<div
											className="w-full flex flex-col gap-10 border-b border-gray-200 pb-5"
											key={item.id}>
											<div className="w-full flex justify-between gap-10">
												<div className="w-[400px]">
													<Image
														src={imageSrc}
														alt="Product"
														className="w-full object-center object-cover rounded-lg"
														width={400}
														height={400}
													/>
												</div>
												<div className="w-full flex flex-col justify-between gap-10">
													<div className="flex flex-col gap-1">
														<p className="montserrat paragraph leading-tight text-black font-medium pb-2">
															{item.product?.title}
														</p>
														<p className="paragraph leading-tight text-gray-600 montserrat">
															Price:{" "}
															<span className="paragraph leading-tight text-black font-bold">
																$ {item.product?.price}
															</span>
														</p>
													</div>
													<div onClick={() => deleteCartItem(item.id)}>
														<p className="text-xl montserrat leading-tight underline text-red-500 cursor-pointer">
															Remove
														</p>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</>
						)}
					</div>
					<div className="w-[800px] h-fit px-5 rounded-lg py-10 bg-gray-200 xm:w-full sm:w-full">
						<h1 className="font-semibold montserrat paragraph leading-tight text-black pb-4 border-b border-black/10">
							Order Summary
						</h1>
						<div className="w-full flex flex-col gap-3 justify-between pt-2">
							<div className="w-full flex justify-between py-2 border-b">
								<span className="font-medium montserrat text-[18px] leading-tight text-black">
									Order total
								</span>
								<span className="font-bold montserrat text-[18px] leading-tight text-black">
									$ {cartTotal.toFixed(2)}
								</span>
							</div>
							<button
								disabled={cartItems.length === 0}
								onClick={() => {
									router.push("/checkout");
								}}
								className={`text-center transition-all duration-300 ease-in-out px-6 py-3 paragraph rounded-full montserrat leading-tight tracking-tight cursor-pointer ${
									cartItems.length === 0
										? "cursor-not-allowed bg-gray-600 text-white"
										: " bg-[#c7a743] text-white"
								}`}>
								Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
