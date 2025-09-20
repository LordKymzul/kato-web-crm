"use client"

import { PieChart as PieChartIcon } from "lucide-react"
import {
    Cell,
    Pie,
    PieChart,
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

const depositData = [
    { name: 'Instant Transfer', value: 300000 },
    { name: 'Online Banking', value: 250000 },
    { name: 'E-Wallet (GFX)', value: 100000 },
    { name: 'USDT', value: 63457 },
]

const COLORS = ["#008060", "#5C6AC4", "#212B36", "#637381"] // Green, Purple, Dark slate, Gray

const chartConfig = {
    value: {
        label: "Deposit Value",
        color: COLORS[0]
    }
} satisfies ChartConfig

const CustomTooltipContent = ({ active, payload }: any) => {
    if (!active || !payload?.[0]) return null;

    const data = payload[0].payload;

    return (
        <div className="rounded-lg border bg-background p-2 shadow-sm w-[200px]">
            <div className="grid grid-cols-[1fr_auto] gap-2">
                <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {data.name}
                    </span>
                </div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                    <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: payload[0].color }}
                    />
                    <span className="text-muted-foreground">
                        Deposits
                    </span>
                </div>
                <span className="font-bold text-foreground">
                    ${data.value.toLocaleString()}
                </span>
            </div>
        </div>
    );
};

export function FinancialStateDepositPSPChart() {
    const [chartType, setChartType] = useState("pie")

    const renderChart = () => {
        return (
            <PieChart margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <Pie
                    data={depositData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill={COLORS[0]}
                    dataKey="value"
                >
                    {depositData.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltipContent />} />
            </PieChart>
        )
    }

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                        <CardTitle className="text-lg font-bold">Deposits by PSP</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            Distribution of deposits across payment providers
                        </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    <PieChartIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setChartType("pie")}>
                                    <PieChartIcon className="h-4 w-4 mr-2" />
                                    Pie Chart
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
        </Card>
    )
}
