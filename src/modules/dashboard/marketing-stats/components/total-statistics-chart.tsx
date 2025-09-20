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
import { totalStatisticsData, marketingChartConfig } from '../data/marketing-stats-data';

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
                            {entry.value.toFixed(1)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export function TotalStatisticsChart() {
    const [chartType, setChartType] = useState("line")

    const renderChart = () => {
        switch (chartType) {
            case "line":
                return (
                    <LineChart
                        data={totalStatisticsData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            domain={[0, 1]}
                            tickFormatter={(value) => value.toFixed(1)}
                        />
                        <Tooltip content={<CustomTooltipContent />} />
                        <Line
                            dataKey="clicks"
                            type="monotone"
                            stroke={marketingChartConfig.clicks.color}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="registrations"
                            type="monotone"
                            stroke={marketingChartConfig.registrations.color}
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="ftd"
                            type="monotone"
                            stroke={marketingChartConfig.ftd.color}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                )
            case "area":
                return (
                    <AreaChart
                        data={totalStatisticsData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            domain={[0, 1]}
                            tickFormatter={(value) => value.toFixed(1)}
                        />
                        <Tooltip content={<CustomTooltipContent />} />
                        <Area
                            dataKey="clicks"
                            type="monotone"
                            fill={marketingChartConfig.clicks.color}
                            fillOpacity={0.2}
                            stroke={marketingChartConfig.clicks.color}
                            strokeWidth={2}
                        />
                        <Area
                            dataKey="registrations"
                            type="monotone"
                            fill={marketingChartConfig.registrations.color}
                            fillOpacity={0.2}
                            stroke={marketingChartConfig.registrations.color}
                            strokeWidth={2}
                        />
                        <Area
                            dataKey="ftd"
                            type="monotone"
                            fill={marketingChartConfig.ftd.color}
                            fillOpacity={0.2}
                            stroke={marketingChartConfig.ftd.color}
                            strokeWidth={2}
                        />
                    </AreaChart>
                )
            case "bar":
                return (
                    <BarChart
                        data={totalStatisticsData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            domain={[0, 1]}
                            tickFormatter={(value) => value.toFixed(1)}
                        />
                        <Tooltip content={<CustomTooltipContent />} />
                        <Bar dataKey="clicks" fill={marketingChartConfig.clicks.color} />
                        <Bar dataKey="registrations" fill={marketingChartConfig.registrations.color} />
                        <Bar dataKey="ftd" fill={marketingChartConfig.ftd.color} />
                    </BarChart>
                )
            default:
                return null
        }
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Total Statistics</CardTitle>
                    <CardDescription>
                        Marketing performance metrics over time
                    </CardDescription>
                </div>
                <div className="flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 data-[state=open]:bg-muted">
                                {chartType === "line" && <LineChartIcon className="h-4 w-4" />}
                                {chartType === "area" && <TrendingUp className="h-4 w-4" />}
                                {chartType === "bar" && <BarChart3 className="h-4 w-4" />}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setChartType("line")}>
                                <LineChartIcon className="mr-2 h-4 w-4" />
                                Line Chart
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setChartType("area")}>
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Area Chart
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setChartType("bar")}>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Bar Chart
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={marketingChartConfig as ChartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        {renderChart()}
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default TotalStatisticsChart;
