"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { starGuidanceItems } from "@/constants";
import { DirectionAwareHover } from "@/components/ui";

export default function StarGuidance() {
	return (
		<div className="w-full padding-y padding-x">
			<div className="flex items-center justify-center flex-col gap-10">
				<div className="grid grid-cols-4 gap-6">
					{starGuidanceItems.map((item, index) => (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.1, ease: "linear" }}
							viewport={{ once: true }}
							key={index}
							className="flex flex-col items-center gap-4">
							<Link
								href={`/stars/star-guidance/${item.id}`}
								className="w-full relative">
								<DirectionAwareHover imageUrl={item.src}>
									{item.title}
								</DirectionAwareHover>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
