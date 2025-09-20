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
import { registrationsByDateData, chartConfig } from '../data/client-behavior-data';

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
                            {entry.value.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export function ClientRegistrationsByDateChart() {
    const [chartType, setChartType] = useState("line")

    const renderChart = () => {
        switch (chartType) {
            case "line":
                return (
                    <LineChart
                        data={registrationsByDateData}
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
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1, strokeDasharray: "3 3" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="registrations"
                            stroke={chartConfig.registrations.color}
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 0, fill: chartConfig.registrations.color }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="firstDeposits"
                            stroke={chartConfig.firstDeposits.color}
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 0, fill: chartConfig.firstDeposits.color }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="liveAccounts"
                            stroke={chartConfig.liveAccounts.color}
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 0, fill: chartConfig.liveAccounts.color }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="demoAccounts"
                            stroke={chartConfig.demoAccounts.color}
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 0, fill: chartConfig.demoAccounts.color }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                )

            case "area":
                return (
                    <AreaChart
                        data={registrationsByDateData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.registrations.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.registrations.color} stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorFirstDeposits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.firstDeposits.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.firstDeposits.color} stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorLiveAccounts" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.liveAccounts.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.liveAccounts.color} stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorDemoAccounts" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.demoAccounts.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.demoAccounts.color} stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
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
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1, strokeDasharray: "3 3" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="registrations"
                            stroke={chartConfig.registrations.color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRegistrations)"
                        />
                        <Area
                            type="monotone"
                            dataKey="firstDeposits"
                            stroke={chartConfig.firstDeposits.color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorFirstDeposits)"
                        />
                        <Area
                            type="monotone"
                            dataKey="liveAccounts"
                            stroke={chartConfig.liveAccounts.color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorLiveAccounts)"
                        />
                        <Area
                            type="monotone"
                            dataKey="demoAccounts"
                            stroke={chartConfig.demoAccounts.color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorDemoAccounts)"
                        />
                    </AreaChart>
                )

            case "bar":
                return (
                    <BarChart
                        data={registrationsByDateData}
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
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                        />
                        <Bar
                            dataKey="registrations"
                            fill={chartConfig.registrations.color}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                        <Bar
                            dataKey="firstDeposits"
                            fill={chartConfig.firstDeposits.color}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                        <Bar
                            dataKey="liveAccounts"
                            fill={chartConfig.liveAccounts.color}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                        <Bar
                            dataKey="demoAccounts"
                            fill={chartConfig.demoAccounts.color}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                    </BarChart>
                )

            default:
                return (
                    <LineChart data={registrationsByDateData}>
                        <Line dataKey="registrations" />
                        <Line dataKey="firstDeposits" />
                        <Line dataKey="liveAccounts" />
                        <Line dataKey="demoAccounts" />
                    </LineChart>
                )
        }
    }

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <CardTitle className="text-base sm:text-lg font-bold">Registrations, first deposits, opened accounts by Date</CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                            Overview of client registrations and account activity over time
                        </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2 flex-shrink-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    {chartType === 'line' && <LineChartIcon className="h-4 w-4" />}
                                    {chartType === 'area' && <TrendingUp className="h-4 w-4" />}
                                    {chartType === 'bar' && <BarChart3 className="h-4 w-4" />}
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
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-2 sm:p-6">
                <div className="h-[250px] sm:h-[350px] w-full">
                    <ChartContainer config={chartConfig} className="h-[250px] sm:h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            {renderChart()}
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default ClientRegistrationsByDateChart;
