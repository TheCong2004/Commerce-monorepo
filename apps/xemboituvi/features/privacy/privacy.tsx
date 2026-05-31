"use client";
import Link from "next/link";
import { AnimatedText, TextMask } from "@/components/ui/client";

export default function Privacy() {
	return (
		<div className="w-full padding-x padding-y">
			<div className="w-[70%]">
				<AnimatedText
					text="🔐 Privacy Policy:"
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
									"Welcome to Mysticmarguerite (“we”, “our”, or “us”). Your privacy is critically important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our astrology services, website, and related applications.",
								]}
							</TextMask>
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="2. Information We Collect"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>
								{["We may collect the following types of information:"]}
							</TextMask>
						</p>
						<li className="flex gap-3">
							<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
								<b>Personal Information: </b>
								Name, email address, birth details (date, time, and place), and
								other information you provide during sign-up or while using our
								services.
							</p>
						</li>
						<li className="flex gap-3">
							<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
								<b>Usage Data: </b>
								IP address, browser type, device information, pages visited, and
								other usage data.
							</p>
						</li>
						<li className="flex gap-3">
							<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
								<b>Payment Information: </b>
								If you purchase a service, we may collect payment details via
								secure third-party processors (e.g., Stripe, PayPal).
							</p>
						</li>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="3. How We Use Your Information"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>{["We use the collected information to:"]}</TextMask>
						</p>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							Provide personalized astrology reports and readings.
						</li>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							Improve our website and user experience.
						</li>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							Communicate with you about updates, offers, or support.
						</li>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							Process transactions and deliver paid services.
						</li>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="4. Sharing of Information"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>
								{[
									"We do not sell or share your personal data with third parties except:",
								]}
							</TextMask>
						</p>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							With service providers necessary to operate the website (e.g.,
							payment processors).
						</li>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							When legally required (e.g., in response to a court order).
						</li>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="5. Data Security"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>
								{[
									"We use reasonable security measures to protect your data. However, no online system is completely secure, so we cannot guarantee 100% security.",
								]}
							</TextMask>
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="6. Your Rights"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>{["You have the right to:"]}</TextMask>
						</p>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							Access the personal data we hold about you.
						</li>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							Request correction or deletion of your data.
						</li>
						<li className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							Opt-out of promotional communications at any time.
						</li>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="7. Children’s Privacy"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>
								{[
									"Our services are not intended for individuals under the age of 13. We do not knowingly collect data from children.",
								]}
							</TextMask>
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="8. Changes to This Policy"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>
								{[
									"We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.",
								]}
							</TextMask>
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<AnimatedText
							text="9. Contact Us"
							className="text-[#000] subHeading font-heptaSlab capitalize leading-tight tracking-normal"
						/>
						<p className="text-[#000] paragraph font-normal font-montserrat  leading-normal">
							<TextMask>
								{["If you have any questions or concerns, contact us at:"]}
							</TextMask>
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
