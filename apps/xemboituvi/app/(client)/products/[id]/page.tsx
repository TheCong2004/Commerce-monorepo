import { Metadata } from "next";
import { Marquee } from "@/components/ui/client";
import Hero from "@/features/product/container/product-detail-hero";
import ProductDetail from "@/features/product/container/product-detail";

export const metadata: Metadata = {
	title: "Product Detail - Mystice Marguerite",
	description: "Mystice Marguerite - Product Detail",
};

export async function generateStaticParams() {
	const res = await fetch(
		"https://mysticmarguerite.com/new/backend/api/products",
		{
			// next: { revalidate: 60 }, // ISR temporarily disabled for deploy
		},
	);
	const { products } = await res.json();

	const dynamicRoutes = products.slice(0, 10).map((product: any) => ({
		id: product.id.toString(),
	}));

	return [...dynamicRoutes, { id: "new" }];
}

export default async function ProductDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<>
			<Hero />
			<Marquee />
			<ProductDetail id={id} />
		</>
	);
}
