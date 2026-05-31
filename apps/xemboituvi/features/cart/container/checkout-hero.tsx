import { AnimatedText } from "@/components/ui/client";

export default function Hero() {
	return (
		<div className="w-full h-[60vh] flex items-center justify-center heroBg">
			<AnimatedText
				text="Checkout"
				className="text-[#2E073F] heading font-papyrus leading-tight tracking-normal"
			/>
		</div>
	);
}
