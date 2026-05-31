"use client";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface PlayVideoProps {
	videosrc: string;
	playsInline?: boolean;
}

export default function PlayVideo({ videosrc, playsInline }: PlayVideoProps) {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [isPlaying, setIsPlaying] = useState(true);
	const [isHovered, setIsHovered] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const togglePlay = useCallback(() => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying((prev) => !prev);
		}
	}, [isPlaying]);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play();
		}
	}, []);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				setCursorPosition({
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				});
			}
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener("mousemove", handleMouseMove);
		}

		return () => {
			if (container) {
				container.removeEventListener("mousemove", handleMouseMove);
			}
		};
	}, []);

	return (
		<div
			className="w-full relative cursor-none"
			ref={containerRef}
			onClick={togglePlay}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div
				className="w-full h-full"
				data-scroll
				data-scroll-speed="-0.7"
				data-scroll-section>
								<video
									className="w-full h-full object-cover"
									loop
									muted
									ref={videoRef}
									src={videosrc}
									playsInline={playsInline}
								/>
				{isHovered && (
					<motion.div
						initial={{ scale: 0, opacity: 0 }}
						animate={{
							x: cursorPosition.x - 50,
							y: cursorPosition.y - 50,
							scale: 1,
							opacity: 1,
						}}
						exit={{ scale: 0, opacity: 0 }}
						className="absolute pointer-events-none"
						style={{ top: 0, left: 0 }}
						transition={{
							type: "spring",
							stiffness: 150,
							damping: 15,
							mass: 0.1,
						}}>
						<div className="w-[100px] h-[100px] bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform hover:scale-110">
							{isPlaying ? (
								// Pause Icon
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-12 w-12 text-white"
									viewBox="0 0 24 24"
									fill="currentColor">
									<path
										fillRule="evenodd"
										d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"
										clipRule="evenodd"
									/>
								</svg>
							) : (
								// Play Icon
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-12 w-12 text-white"
									viewBox="0 0 24 24"
									fill="currentColor">
									<path
										fillRule="evenodd"
										d="M8 5v14l11-7L8 5z"
										clipRule="evenodd"
									/>
								</svg>
							)}
						</div>
					</motion.div>
				)}
			</div>
		</div>
	);
}
