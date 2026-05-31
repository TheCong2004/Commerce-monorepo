// lib/analyticsUtils.ts

export const calculateGrowthData = (rawSubscribers: any[]) => {
    // 1. Lọc user đã verify
    const verifiedSubscribers = rawSubscribers.filter(
        (sub) => sub.is_verified === 1
    );

    const currentDate = new Date();
    
    // 2. Tạo mảng 6 tháng
    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(currentDate.getMonth() - i);
        return {
            month: date.toLocaleString("default", { month: "short" }),
            monthIndex: date.getMonth(),
            year: date.getFullYear(),
        };
    }).reverse();

    // 3. Map dữ liệu vào biểu đồ
    const chartData = lastSixMonths.map(({ month, monthIndex, year }) => {
        const count = verifiedSubscribers.filter((sub) => {
            const subscribeDate = new Date(sub.created_at);
            return (
                subscribeDate.getMonth() === monthIndex &&
                subscribeDate.getFullYear() === year
            );
        }).length;
        return { month, count };
    });

    // 4. Tính phần trăm tăng trưởng
    let percentageChange = 0;
    if (chartData.length >= 2) {
        const currentMonth = chartData[chartData.length - 1].count;
        const previousMonth = chartData[chartData.length - 2].count;

        if (currentMonth !== 0 || previousMonth !== 0) {
            if (previousMonth === 0) percentageChange = 100;
            else if (currentMonth === 0) percentageChange = -100;
            else percentageChange = parseFloat((((currentMonth - previousMonth) / previousMonth) * 100).toFixed(1));
        }
    }

    return {
        totalVerified: verifiedSubscribers.length,
        chartData,
        percentageChange
    };
};