"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { Order, OrderItem } from "@/types";
import { getToken } from "@/features/auth/lib/get-token";
import { useEffect, useState } from "react";
import RoundButton from "@/components/ui/client/round-button";

export default function OrderPage() {
	const token = getToken("authToken");
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await fetch(
					`https://mysticmarguerite.com/new/backend/api/user/orders`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				const data = await response.json();
				setOrders(data);
			} catch (error: unknown) {
				console.error("Error fetching orders:", error);
				toast;
			}
		};

		fetchOrders();
	}, [token]);

	return (
		<div className="w-full p-4 flex gap-2">
			<div className="w-full gap-1 flex flex-col px-6 pb-5">
				{orders.length === 0 ? (
					<div className="flex py-10 flex-col gap-3">
						<h1 className="text-xl montserrat">
							You don&apos;t have any orders yet.
						</h1>
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
					<div className="w-full overflow-x-auto">
						<table className="min-w-full bg-white border border-gray-200">
							<thead>
								<tr>
									<th className="border border-gray-200 px-4 py-2 text-left montserrat">
										IMAGE
									</th>
									<th className="border border-gray-200 px-4 py-2 text-left montserrat">
										SERVICE
									</th>
									<th className="border border-gray-200 px-4 py-2 text-left montserrat">
										NAME
									</th>
									<th className="border border-gray-200 px-4 py-2 text-left montserrat">
										EMAIL
									</th>
									<th className="border border-gray-200 px-4 py-2 text-left montserrat">
										PRICE
									</th>
									<th className="border border-gray-200 px-4 py-2 text-left montserrat">
										QUANTITY
									</th>
									<th className="border border-gray-200 px-4 py-2 text-left montserrat">
										STATUS
									</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order: Order) => (
									<tr key={order.id}>
										<td className="border border-gray-200 px-4 py-2 w-fit">
											<div>
												{order.items
													.slice(0, 1)
													.map((item: OrderItem, index) => (
														<Image
															key={index}
															src={`https://mysticmarguerite.com/new/backend/storage/${
																item?.product.image
																	? JSON.parse(item.product.image)[0]
																	: ""
															}`}
															alt="serviceImg"
															className="w-full h-20 object-fill"
															width={200}
															height={200}
														/>
													))}
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 w-fit">
											<div>
												{order.items
													.slice(0, 1)
													.map((item: OrderItem, index) => (
														<h1
															key={index}
															className="text-[15px] text-black font-medium montserrat">
															{item.product.title}
														</h1>
													))}
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 w-fit">
											<div>
												<h1 className="text-[15px] text-black font-medium montserrat">
													{order.checkout_detail.first_name}{" "}
													{order.checkout_detail.last_name}
												</h1>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 w-fit">
											<div>
												<h1 className="text-[15px] text-black font-medium montserrat">
													{order.checkout_detail.email}
												</h1>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 w-fit">
											<div>
												{order.items
													.slice(0, 1)
													.map((item: OrderItem, index) => (
														<h1
															className="text-[15px] text-black font-medium montserrat"
															key={index}>
															${item.product.price}.00
														</h1>
													))}
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 w-fit">
											<div>
												{order.items
													.slice(0, 1)
													.map((item: OrderItem, index) => (
														<h1
															className="text-[15px] text-black font-medium montserrat"
															key={index}>
															{item.quantity}
														</h1>
													))}
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2 w-fit">
											<div>
												<h1 className="text-[15px] text-black font-medium montserrat capitalize">
													{order.status}
												</h1>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
