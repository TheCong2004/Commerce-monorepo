import "@/styles/globals.css";
import Providers from "./providers";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<body className="bg-black">
				<Providers>
					<div className="">
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
