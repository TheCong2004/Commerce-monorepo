import Image from "next/image";
import { LogoMarquee } from "@/components/ui/client";

const STAR_IMAGE =
	"https://www.cortpartyrental.com/media/catalog/product/cache/1eb81a50734023717807fd73a80832d3/_/w/_web_size.jpg";

const marqueeItems = [
	{ id: 1, title: "Item One" },
	{ id: 2, title: "Item Two" },
	{ id: 3, title: "Item Three" },
	{ id: 4, title: "Item Four" },
];

export default function Marquee() {
	return (
		<div className="w-full bg-[#c7a743] py-5">
			<LogoMarquee baseVelocity={1}>
				<div className="flex items-center">
					{marqueeItems.map((item) => (
						<div
							key={item.id}
							className="flex items-center mx-10 gap-3"
						>
							<Image
								src={STAR_IMAGE}
								alt="star"
								width={32}
								height={32}
								unoptimized
								className="object-cover"
							/>

							<p className="subHeading text-white leading-tight papyrus capitalize font-semibold">
								{item.title}
							</p>
						</div>
					))}
				</div>
			</LogoMarquee>
		</div>
	);
}
