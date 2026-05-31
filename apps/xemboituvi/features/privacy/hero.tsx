import AnimatedText from "@/components/ui/client/animated-text";

export default function Hero() {
	return (
		<div className="w-full h-[60vh] flex items-center justify-center heroBg">
			<AnimatedText
				text="Privacy Policy"
				className="text-[#2E073F] heading font-papyrus leading-tight tracking-normal"
			/>
		</div>
	);
}
