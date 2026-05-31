import TextReveal from "@/components/ui/client/text-reveal";

export default function Hero() {
	return (
		<div className="w-full h-[60vh] flex items-center justify-center heroBg">
			<TextReveal>
				<h1 className="text-[#2E073F] heading font-papyrus leading-tight tracking-normal">
					Product Detail
				</h1>
			</TextReveal>
		</div>
	);
}
