"use client";
import Link from "next/link";
import Image from "next/image";
import { TbookingsProps } from "@/types";
import { getToken } from "@/features/auth/lib/get-token";
import { useEffect, useState } from "react";
import RoundButton from "@/components/ui/client/round-button";

export default function BookingPage() {
	const token = getToken("authToken");
	const [bookings, setBookings] = useState<TbookingsProps[]>([]);

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await fetch(
					`https://mysticmarguerite.com/new/backend/api/user/bookings`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				const data = await response.json();
				setBookings(data);
			} catch (error: unknown) {
				console.error("Error fetching orders:", error);
			}
		};

		fetchBookings();
	}, [token]);

	return (
		<div className="w-full p-4 flex gap-2">
			<div className="w-full gap-1 flex flex-col px-6 pb-5">
				{bookings.length === 0 ? (
					<div className="flex py-10 flex-col gap-3">
						<h1 className="text-xl montserrat">
							You don&apos;t have any booking yet.
						</h1>
						<div className="w-fit bg-[#c7a743] flex items-center justify-between bg-secondry cursor-pointer rounded-md group">
							<RoundButton
								href="/services"
								title="Brows Services"
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
										MEETING LINK
									</th>
									<th className="border border-gray-200 px-4 py-2 text-left montserrat">
										EMAIL
									</th>
									<th className="border border-gray-200 px-4 py-2 text-left montserrat">
										PRICE
									</th>
									<th className="border border-gray-200 px-4 py-2 text-left montserrat">
										STATUS
									</th>
								</tr>
							</thead>
							<tbody>
								{bookings.length > 0 &&
									bookings.map((order) => (
										<tr key={order.id}>
											<td className="border border-gray-200 px-4 py-2 w-fit">
												<div>
													{order.items.map((item, index) => (
														<Image
															key={index}
															src={`https://mysticmarguerite.com/new/backend/storage/${item.service.image}`}
															alt="serviceImg"
															className="w-auto h-20 object-fill"
															width={200}
															height={200}
														/>
													))}
												</div>
											</td>
											<td className="border border-gray-200 px-4 py-2 w-fit">
												<div>
													{order.items.slice(0, 1).map((item, index) => (
														<h1
															key={index}
															className="text-[15px] text-black font-medium montserrat">
															{item.service.title}
														</h1>
													))}
												</div>
											</td>
											<td className="border border-gray-200 px-4 py-2 w-fit">
												<div>
													<h1 className="text-[15px] text-black font-medium montserrat">
														{order.booking_detail.first_name}{" "}
														{order.booking_detail.last_name}
													</h1>
												</div>
											</td>
											<td className="border border-gray-200 px-4 py-2 w-fit">
												<div>
													<Link
														href={order.booking_detail.meeting_start_url}
														className="text-[15px] font-medium montserrat bg-black text-white p-4 rounded-md">
														Join Meeting
													</Link>
												</div>
											</td>
											<td className="border border-gray-200 px-4 py-2 w-fit">
												<div>
													<h1 className="text-[15px] text-black font-medium montserrat">
														{order.booking_detail.email}
													</h1>
												</div>
											</td>
											<td className="border border-gray-200 px-4 py-2 w-fit">
												<div>
													{order.items.slice(0, 1).map((item, index) => (
														<h1
															className="text-[15px] text-black font-medium montserrat"
															key={index}>
															${item.service.price}.00
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
