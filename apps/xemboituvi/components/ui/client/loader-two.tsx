"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function LoaderTwo() {
	const [showText, setShowText] = useState(false);
	const [currentLine, setCurrentLine] = useState(0);
	const [showButton, setShowButton] = useState(false);

	// Use your custom hook
	const [loaderCompleted, setLoaderCompleted, isStorageLoaded] =
		useLocalStorage("loaderCompleted", false);

	const textLines = [
		"All is the creation of Divine Love",
		"life and cosmos",
		"beings manifest or etheric",
		"dwellers in light and darkness",
		"We dance together",
		"weaving an infinite web of Becoming.",
	];

	const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
		const currentTime = (event.target as HTMLVideoElement).currentTime;
		if (currentTime >= 0.5 && !showText) {
			setShowText(true);
		}
	};

	const handleContactClick = () => {
		setLoaderCompleted(true);
	};

	useEffect(() => {
		if (showText) {
			const interval = setInterval(() => {
				setCurrentLine((prev) => {
					if (prev < textLines.length - 1) return prev + 1;
					clearInterval(interval);
					setShowButton(true);
					return prev;
				});
			}, 4000);

			return () => clearInterval(interval);
		}
	}, [showText, textLines.length]);

	// Optional: Show loading state until localStorage is loaded
	if (!isStorageLoaded) {
		return (
			<div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
				<div className="text-white">Loading...</div>
			</div>
		);
	}

	return (
		<div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
			<video
				className="absolute w-full h-full object-cover top-0 left-0 z-0"
				muted
				autoPlay
				loop
				onTimeUpdate={handleTimeUpdate}>
				<source
					src="https://mysticmarguerite.com/new/intro2.mp4"
					type="video/mp4"
				/>
			</video>
			<div className="relative z-10 flex flex-col items-center justify-center h-fit overflow-hidden">
				<AnimatePresence mode="wait">
					{textLines.map(
						(text, index) =>
							index === currentLine && (
								<motion.div
									key={index}
									initial={{ y: 50, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: -50, opacity: 0 }}
									transition={{ duration: 2, ease: "easeInOut" }}
									className="text-[#fff] heading font-normal font-sans capitalize leading-tight tracking-tight">
									{text}
								</motion.div>
							),
					)}
				</AnimatePresence>
				{showButton && (
					<Link
						href="/life-healing"
						onClick={handleContactClick}
						className="w-fit flex items-center gap-2 px-6 py-3 bg-[#c7a743]">
						<button className="text-center text-white text-lg font-normal leading-tight tracking-tight font-sans">
							Life & Balances
						</button>
						<Image
							src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK50w3reAumklsmDNWfY-oQlKehJ2KL8E8Kg&s'}
							alt="arrowGoImg"
							width={20}
							height={20}
						/>
					</Link>
				)}
			</div>
		</div>
	);
}
