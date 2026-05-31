import { Metadata } from "next";
import { Marquee } from "@/components/ui/client";
import Hero from "@/features/booking/components/booking-hero";
import Form from "@/features/booking/components/booking-form";
import StripeProvider from "@/providers/stripe-provider";

export const metadata: Metadata = {
	title: "Booking - Mystice Marguerite",
	description: "Mystice Marguerite - Booking",
};

export async function generateStaticParams() {
	const res = await fetch(
		"https://mysticmarguerite.com/new/backend/api/services",
		{
			// next: { revalidate: 60 }, // ISR temporarily disabled for deploy
		},
	);
	const { services } = await res.json();

	const dynamicRoutes = services.slice(0, 10).map((service: any) => ({
		id: service.id.toString(),
	}));

	return [...dynamicRoutes, { id: "new" }];
}

export default async function BookingForm({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return (
		<>
			<Hero />
			<Marquee />
			<StripeProvider serviceId={id}>
				<Form slug={{ id }} />
			</StripeProvider>
		</>
	);
}
