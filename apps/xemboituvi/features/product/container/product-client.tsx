"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TproductColumnProps } from "@/types";
import getProducts from "@/features/product/actions/get-products";
import RoundButton from "@/components/ui/client/round-button";

export default function Products() {
	const [products, setProducts] = useState<TproductColumnProps[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await getProducts();
				setProducts(response.products);
			} catch (error: unknown) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div className="w-full padding-y padding-x">
			<div className="flex items-center justify-center flex-col gap-10">
				<div className="grid grid-cols-4 gap-6">
					{products &&
						products.map((item, index) => (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.8,
									delay: index * 0.1,
									ease: "linear",
								}}
								viewport={{ once: true }}
								key={index}
								className="flex flex-col items-center gap-4 bg-[#000] relative rounded-lg overflow-hidden shadow-lg hover:shadow-lg">
								<div className="w-full relative">
									<Image
										src={`https://mysticmarguerite.com/new/backend/storage/${
											JSON.parse(item?.image)[0]
										}`}
										alt={item?.title}
										className="w-full h-[350px] object-cover"
										width={400}
										height={400}
									/>
									<div className="p-4 w-full flex flex-col justify-between gap-4">
										<h3 className="text-white subHeading font-normal smythe leading-tight tracking-tight">
											{item?.title}
										</h3>
										<p className="paragraph leading-normal text-white font-normal montserrat">
											{item?.description.split(" ").slice(0, 8).join(" ")}...
										</p>

										<div className="flex items-center justify-between">
											<span className="paragraph text-white leading-tight tracking-tight montserrat font-semibold">
												${item?.price}.00
											</span>
											<div className="w-fit bg-[#936d42] flex items-center justify-between bg-secondry cursor-pointer rounded-md group">
												<RoundButton
													href={`/products/${item?.id}`}
													title="View Detail"
													className="bg-white text-black"
													bgcolor="#c7a743"
													style={{ color: "#fff" }}
												/>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						))}
				</div>
			</div>
		</div>
	);
}
