import getSales from "@/features/sales/actions/get-sales";
import { useState, useEffect, useMemo } from "react";
import { ArrowDownIcon, ArrowUpIcon, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalSales() {
	const [sales, setSales] = useState([]);
	const [chartData, setChartData] = useState<
		{ month: string; count: number }[]
	>([]);

	useEffect(() => {
		const fetchSales = async () => {
			try {
				const response = await getSales();
				const paidSales = response.filter(
					(sale: { status: string }) => sale.status === "paid",
				);
				setSales(paidSales);

				const currentDate = new Date();
				const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
					const date = new Date();
					date.setMonth(currentDate.getMonth() - i);
					return {
						month: date.toLocaleString("default", { month: "short" }),
						monthIndex: date.getMonth(),
						year: date.getFullYear(),
					};
				}).reverse();

				const updatedChartData = lastSixMonths.map(
					({ month, monthIndex, year }) => {
						const count = paidSales.filter(
							(sale: { status: string; created_at: string }) => {
								const saleDate = new Date(sale.created_at);
								return (
									saleDate.getMonth() === monthIndex &&
									saleDate.getFullYear() === year
								);
							},
						).length;
						return { month, count };
					},
				);

				setChartData(updatedChartData);
			} catch (err) {
				console.error("Error fetching sales:", err);
			}
		};

		fetchSales();
	}, []);

	const totalSalesCount = useMemo(() => {
		return sales.length;
	}, [sales]);

	const percentageChange = useMemo(() => {
		if (chartData.length < 2) return 0;

		const currentMonth = chartData[chartData.length - 1].count;
		const previousMonth = chartData[chartData.length - 2].count;

		if (currentMonth === 0 && previousMonth === 0) return 0;

		if (previousMonth === 0 && currentMonth > 0) return 100;

		if (previousMonth > 0 && currentMonth === 0) return -100;

		return parseFloat(
			(((currentMonth - previousMonth) / previousMonth) * 100).toFixed(1),
		);
	}, [chartData]);

	const isPositive = percentageChange >= 0;

	return (
		<Card className="w-full bg-card text-card-foreground border border-border">
			<CardHeader className="pb-2">
				<div className="w-full flex items-center justify-between">
					<CardTitle>Total Sales</CardTitle>
					<CreditCard size={24} />
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col space-y-1">
					<div className="text-2xl font-bold">+{totalSalesCount}</div>
					<div className="flex items-center text-xs">
						<span
							className={`flex items-center ${
								isPositive
									? "text-green-500 dark:text-green-400"
									: "text-red-500 dark:text-red-400"
							}`}>
							{isPositive ? (
								<ArrowUpIcon className="h-3 w-3 mr-1" />
							) : (
								<ArrowDownIcon className="h-3 w-3 mr-1" />
							)}
							{isPositive ? "+" : ""}
							{percentageChange}%
						</span>
						<span className="text-muted-foreground ml-1">from last month</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
