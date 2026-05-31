import { useState, useEffect } from "react";
import getSubscriber from "@/features/subscriber/actions/get-subscriber";
import { ArrowDownIcon, ArrowUpIcon, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateGrowthData } from "../utils/chartUtils";


export default function TotalSubscribers() {
    // Gom state lại cho gọn (hoặc để rời cũng được)
    const [stats, setStats] = useState({
        totalVerified: 0,
        percentageChange: 0,
        isPositive: true
    });

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await getSubscriber();
                
                // Component chỉ gọi hàm, không cần biết tính toán thế nào
                const { totalVerified, percentageChange } = calculateGrowthData(response.data);
                
                setStats({
                    totalVerified,
                    percentageChange,
                    isPositive: percentageChange >= 0
                });

            } catch (err) {
                console.error("Error fetching subscribers:", err);
            }
        };

        fetchSubscribers();
    }, []);

    // Phần Render giữ nguyên, nhưng dùng data từ state mới
    return (
        <Card className="w-full bg-card text-card-foreground border border-border">
            <CardHeader className="pb-2">
                <div className="w-full flex items-center justify-between">
                    <CardTitle>Total Subscribers</CardTitle>
                    <Users size={24} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-1">
                    <div className="text-2xl font-bold">+{stats.totalVerified}</div>
                    <div className="flex items-center text-xs">
                        <span
                            className={`flex items-center ${
                                stats.isPositive
                                    ? "text-green-500 dark:text-green-400"
                                    : "text-red-500 dark:text-red-400"
                            }`}>
                            {stats.isPositive ? (
                                <ArrowUpIcon className="h-3 w-3 mr-1" />
                            ) : (
                                <ArrowDownIcon className="h-3 w-3 mr-1" />
                            )}
                            {stats.isPositive ? "+" : ""}
                            {stats.percentageChange}%
                        </span>
                        <span className="text-muted-foreground ml-1">from last month</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}