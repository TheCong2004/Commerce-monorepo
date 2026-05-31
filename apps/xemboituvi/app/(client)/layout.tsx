"use client";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Footer, Navbar } from "@/components/ui/client";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [loaderCompleted, , isStorageLoaded] = useLocalStorage(
		"loaderCompleted",
		false,
	);

	const isPageAllowedWithoutLoader = pathname !== "/";

	if (!isStorageLoaded) {
		return (
			<div className="w-full h-screen flex items-center justify-center bg-black">
				<div className="text-white">Loading...</div>
			</div>
		);
	}

	if (loaderCompleted !== true && !isPageAllowedWithoutLoader) {
		return null;
	}

	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
