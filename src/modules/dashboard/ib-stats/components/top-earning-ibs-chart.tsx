"use client"

import { TrendingUp, BarChart3, LineChart as LineChartIcon } from "lucide-react"
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
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { topEarningIBsData, ibChartConfig } from '../data/ib-stats-data';

const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;

    return (
        <div className="rounded-lg border bg-background p-2 shadow-sm w-[250px]">
            <div className="grid grid-cols-[1fr_auto] gap-2">
                <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {label?.length > 25 ? `${label.substring(0, 25)}...` : label}
                    </span>
                </div>
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
                                {entry.dataKey === 'tradesCommission' ? 'Trades Commission, USD' : 'CPA/CPL, USD'}
                            </span>
                        </div>
                        <span className="font-bold text-foreground">
                            ${entry.value.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export function TopEarningIBsChart() {
    const [chartType, setChartType] = useState("bar")

    const renderChart = () => {
        switch (chartType) {
            case "bar":
                return (
                    <BarChart
                        data={topEarningIBsData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 80,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="ibName"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            interval={0}
                            tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            domain={[0, 100000]}
                        />
                        <Tooltip content={<CustomTooltipContent />} />
                        <Bar dataKey="tradesCommission" fill={ibChartConfig.tradesCommission.color} />
                        <Bar dataKey="cpaCplCommission" fill={ibChartConfig.cpaCplCommission.color} />
                    </BarChart>
                )
            case "line":
                return (
                    <LineChart
                        data={topEarningIBsData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 80,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="ibName"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            interval={0}
                            tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            domain={[0, 100000]}
                        />
                        <Tooltip content={<CustomTooltipContent />} />
                        <Line
                            dataKey="tradesCommission"
                            type="monotone"
                            stroke={ibChartConfig.tradesCommission.color}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                        />
                        <Line
                            dataKey="cpaCplCommission"
                            type="monotone"
                            stroke={ibChartConfig.cpaCplCommission.color}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                        />
                    </LineChart>
                )
            case "area":
                return (
                    <AreaChart
                        data={topEarningIBsData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 80,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="ibName"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            interval={0}
                            tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            domain={[0, 100000]}
                        />
                        <Tooltip content={<CustomTooltipContent />} />
                        <Area
                            dataKey="tradesCommission"
                            type="monotone"
                            fill={ibChartConfig.tradesCommission.color}
                            fillOpacity={0.2}
                            stroke={ibChartConfig.tradesCommission.color}
                            strokeWidth={2}
                        />
                        <Area
                            dataKey="cpaCplCommission"
                            type="monotone"
                            fill={ibChartConfig.cpaCplCommission.color}
                            fillOpacity={0.2}
                            stroke={ibChartConfig.cpaCplCommission.color}
                            strokeWidth={2}
                        />
                    </AreaChart>
                )
            default:
                // Return an empty fragment to satisfy ReactElement type
                return <></>
        }
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Top 20 Earning IBs</CardTitle>
                    <CardDescription>
                        IBs with highest commission earnings
                    </CardDescription>
                </div>
                <div className="flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 data-[state=open]:bg-muted">
                                {chartType === "bar" && <BarChart3 className="h-4 w-4" />}
                                {chartType === "line" && <LineChartIcon className="h-4 w-4" />}
                                {chartType === "area" && <TrendingUp className="h-4 w-4" />}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setChartType("bar")}>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Bar Chart
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setChartType("line")}>
                                <LineChartIcon className="mr-2 h-4 w-4" />
                                Line Chart
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setChartType("area")}>
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Area Chart
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={ibChartConfig as ChartConfig}
                    className="aspect-auto h-[350px] w-full"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        {renderChart()}
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default TopEarningIBsChart;
