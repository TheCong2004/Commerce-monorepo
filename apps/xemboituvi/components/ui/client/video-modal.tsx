"use client";
import Image from "next/image";
import { useState } from "react";

export default function VideoModal({
	thumbnail,
	videoSrc,
}: {
	thumbnail: string;
	videoSrc: string;
}) {
	const [isOpen, setIsOpen] = useState(false);

	const openVideoModal = () => setIsOpen(true);
	const closeVideoModal = () => setIsOpen(false);

	return (
		<section
			id="video-sec"
			className="w-full flex flex-col items-center justify-center">
			<div
				className="w-full relative cursor-pointer h-[500px]"
				onClick={openVideoModal}>
				<Image
					src={thumbnail}
					alt="Video Thumbnail"
					className="w-full h-full object-cover"
					width={1280}
					height={720}
				/>
				<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-[#C3BEB6] flex items-center justify-center w-[140px] h-[140px] rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="33"
							viewBox="0 0 28 33"
							fill="none"
							className="w-12 h-12">
							<path
								d="M26.9 14.8004C27.9 15.3004 28.2 16.6004 27.7 17.5004C27.5 17.8004 27.3 18.1004 26.9 18.3004L3 31.8004C2 32.3004 0.799999 32.0004 0.299999 31.0004C0.0999992 30.7004 0 30.4004 0 30.0004V2.90039C0 1.80039 0.9 0.900391 2 0.900391C2.3 0.900391 2.7 1.00039 3 1.20039L26.9 14.8004Z"
								fill="#936D42"
							/>
						</svg>
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="relative w-full max-w-4xl bg-white overflow-hidden">
						<button
							className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-50 text-3xl"
							onClick={closeVideoModal}>
							×
						</button>
						<video
							className="w-full"
							controls
							muted
							autoPlay>
							<source
								src={videoSrc}
								type="video/mp4"
							/>
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
			)}
		</section>
	);
}
