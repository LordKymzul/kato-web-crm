"use client"

import { TrendingUp, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, ChevronDown } from "lucide-react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Monthly data for the entire year of 2024
const transactionData = [
    { date: '2024-02-11', deposits: 713457, withdrawals: -469306, netWithdrawals: -11150 },
    { date: '2024-02-12', deposits: 650000, withdrawals: -420000, netWithdrawals: -10500 },
    { date: '2024-02-13', deposits: 580000, withdrawals: -380000, netWithdrawals: -9800 },
    { date: '2024-02-14', deposits: 620000, withdrawals: -400000, netWithdrawals: -10200 },
    { date: '2024-02-15', deposits: 680000, withdrawals: -440000, netWithdrawals: -11000 },
    { date: '2024-02-16', deposits: 700000, withdrawals: -460000, netWithdrawals: -11100 },
    { date: '2024-02-17', deposits: 713457, withdrawals: -469306, netWithdrawals: -11150 },
]

const chartConfig = {
    deposits: {
        label: "Deposits",
        color: "#008060", // Green
    },
    withdrawals: {
        label: "Withdrawals",
        color: "#5C6AC4", // Purple/indigo
    },
    netWithdrawals: {
        label: "Net Withdrawals",
        color: "#212B36", // Dark slate
    },
} satisfies ChartConfig

const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;

    return (
        <div className="rounded-lg border bg-background p-2 shadow-sm w-[200px]">
            <div className="grid grid-cols-[1fr_auto] gap-2">
                <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {label}
                    </span>
                </div>
                <div className="flex flex-col"></div>
            </div>
            <div className="mt-2 flex flex-col gap-1">
                {payload.map((entry: any, index: number) => (
                    <div
                        key={`item-${index}`}
                        className="flex items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-1">
                            <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-muted-foreground">
                                {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}
                            </span>
                        </div>
                        <span className="font-bold text-foreground">
                            {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export function FinancialStateTransactionDateChart() {
    const [chartType, setChartType] = useState("line")
    const [dataPeriod, setDataPeriod] = useState("Last 7 Days")

    const dataPeriods = {
        "Last 7 Days": transactionData,
        "Last 5 Days": transactionData.slice(-5),
        "Last 3 Days": transactionData.slice(-3),
    }

    const renderChart = () => {
        const data = dataPeriods[dataPeriod as keyof typeof dataPeriods]

        switch (chartType) {
            case "line":
                return (
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1, strokeDasharray: "3 3" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="deposits"
                            stroke={chartConfig.deposits.color}
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 0, fill: chartConfig.deposits.color }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="withdrawals"
                            stroke={chartConfig.withdrawals.color}
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 0, fill: chartConfig.withdrawals.color }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="netWithdrawals"
                            stroke={chartConfig.netWithdrawals.color}
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 0, fill: chartConfig.netWithdrawals.color }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                )

            case "area":
                return (
                    <AreaChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.deposits.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.deposits.color} stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorWithdrawals" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.withdrawals.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.withdrawals.color} stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorNetWithdrawals" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.netWithdrawals.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.netWithdrawals.color} stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1, strokeDasharray: "3 3" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="deposits"
                            stroke={chartConfig.deposits.color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorDeposits)"
                        />
                        <Area
                            type="monotone"
                            dataKey="withdrawals"
                            stroke={chartConfig.withdrawals.color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorWithdrawals)"
                        />
                        <Area
                            type="monotone"
                            dataKey="netWithdrawals"
                            stroke={chartConfig.netWithdrawals.color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorNetWithdrawals)"
                        />
                    </AreaChart>
                )

            case "bar":
                return (
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                        />
                        <Bar
                            dataKey="deposits"
                            fill={chartConfig.deposits.color}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                        <Bar
                            dataKey="withdrawals"
                            fill={chartConfig.withdrawals.color}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                        <Bar
                            dataKey="netWithdrawals"
                            fill={chartConfig.netWithdrawals.color}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                    </BarChart>
                )

            case "stackedArea":
                return (
                    <AreaChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1, strokeDasharray: "3 3" }}
                        />
                        <Area
                            dataKey="deposits"
                            type="monotone"
                            fill={chartConfig.deposits.color}
                            fillOpacity={0.6}
                            stroke={chartConfig.deposits.color}
                            stackId="1"
                        />
                        <Area
                            dataKey="withdrawals"
                            type="monotone"
                            fill={chartConfig.withdrawals.color}
                            fillOpacity={0.6}
                            stroke={chartConfig.withdrawals.color}
                            stackId="1"
                        />
                        <Area
                            dataKey="netWithdrawals"
                            type="monotone"
                            fill={chartConfig.netWithdrawals.color}
                            fillOpacity={0.6}
                            stroke={chartConfig.netWithdrawals.color}
                            stackId="1"
                        />
                    </AreaChart>
                )

            default:
                return (
                    <AreaChart data={data}>
                        <Area dataKey="deposits" />
                        <Area dataKey="withdrawals" />
                        <Area dataKey="netWithdrawals" />
                    </AreaChart>
                )
        }
    }

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                        <CardTitle className="text-lg font-bold">Transactions by Date</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            Overview of financial transactions over time
                        </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">


                        {/* Chart type selector */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    {chartType === 'line' && <LineChartIcon className="h-4 w-4" />}
                                    {chartType === 'area' && <TrendingUp className="h-4 w-4" />}
                                    {chartType === 'bar' && <BarChart3 className="h-4 w-4" />}
                                    {chartType === 'stackedArea' && <PieChartIcon className="h-4 w-4" />}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setChartType("line")}>
                                    <LineChartIcon className="h-4 w-4 mr-2" />
                                    Line Chart
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setChartType("area")}>
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    Area Chart
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setChartType("bar")}>
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Bar Chart
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setChartType("stackedArea")}>
                                    <PieChartIcon className="h-4 w-4 mr-2" />
                                    Stacked Area
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full">
                    <ChartContainer config={chartConfig} className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            {renderChart()}
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </CardContent>
            {/* <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Growth trend: +15% in customer acquisition <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            Data shown for {dataPeriod}
                        </div>
                    </div>
                </div>
            </CardFooter> */}
        </Card>
    )
}
