"use client";
import Link from "next/link";
import { AnimatedText, TextMask } from "@/components/ui/client";

export default function Terms() {
	return (
		<div className="w-full padding-x padding-y">
			<div className="w-[70%]">
				<AnimatedText
					text="📜 Acceptance of Terms."
					className="text-[#000] heading font-heptaSlab capitalize leading-tight tracking-normal mb-10"
				/>
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="1. Introduction"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>
								{[
									"By accessing or using Mysticmarguerite, you agree to be bound by these Terms and Conditions and our Privacy Policy.",
								]}
							</TextMask>
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="2. Services Offered"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>
								{[
									"We offer astrology-related content and personalized readings for entertainment, insight, and guidance purposes. These services are not a substitute for professional advice (e.g., medical, legal, financial).",
								]}
							</TextMask>
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="3. User Responsibilities"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							You agree to provide accurate personal data for readings.
						</li>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							You agree not to misuse the website, post offensive content, or
							violate laws.
						</li>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							You are responsible for maintaining the confidentiality of your
							account.
						</li>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="4. Payments and Refunds"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							All payments are processed securely.
						</li>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							Refunds are not guaranteed for digital astrology services unless
							explicitly stated.
						</li>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="5. Intellectual Property"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>
								{[
									"All content, graphics, and reports are the intellectual property of [Your Website Name] and may not be reproduced or redistributed without permission.",
								]}
							</TextMask>
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="6. Limitation of Liability"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>
								{[
									"We do not guarantee the accuracy of astrological insights and are not liable for any decisions made based on the content or readings.",
								]}
							</TextMask>
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="7. Termination"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>
								{[
									"We reserve the right to suspend or terminate user accounts for violations of these terms.",
								]}
							</TextMask>
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="8. Governing Law"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>
								{[
									"These terms are governed by the laws of [Your Country/State], without regard to conflict of law principles.",
								]}
							</TextMask>
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="9. Contact Information"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>{["For any questions or support:"]}</TextMask>
						</p>
						<div className="flex flex-col gap-2">
							<Link
								href="mailto:info@mysticmarguerite.com"
								className="text-[#277EFF] paragraph font-normal font-montserrat  leading-normal">
								info@mysticmarguerite.com
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
