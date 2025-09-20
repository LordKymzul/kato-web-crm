"use client"

import { BarChart3 } from "lucide-react"
import {
    Bar,
    BarChart,
    CartesianGrid,
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
import { registrationsByCountryData, chartConfig } from '../data/client-behavior-data';

// Use imported data
const countryData = registrationsByCountryData;

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

export function ClientRegistrationsByCountryChart() {
    const [chartType, setChartType] = useState("bar")

    const renderChart = () => {
        // Show only top 12 countries for better readability
        const topCountries = countryData.slice(0, 12);
        
        return (
            <BarChart
                data={topCountries}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 60,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                    dataKey="country"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
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
    }

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <CardTitle className="text-base sm:text-lg font-bold">Registrations, first deposits, opened accounts by Country</CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                            Distribution of client registrations and activity across countries
                        </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    <BarChart3 className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
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
                <div className="h-[400px] sm:h-[500px] w-full">
                    <ChartContainer config={chartConfig} className="h-[400px] sm:h-[500px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            {renderChart()}
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default ClientRegistrationsByCountryChart;
