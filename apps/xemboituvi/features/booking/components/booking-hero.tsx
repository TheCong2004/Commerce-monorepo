import AnimatedText from "@/components/ui/client/animated-text";

export default function Hero() {
	return (
		<div className="w-full h-[60vh] flex items-center justify-center heroBg">
			<AnimatedText
				text="Booking Form"
				className="text-[#2E073F] heading font-semibold font-sans leading-tight tracking-normal"
			/>
		</div>
	);
}
