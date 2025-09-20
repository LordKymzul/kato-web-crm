"use client"

import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import {
    Globe, ArrowUpRight, ArrowDownRight, DollarSign, Wallet,
    TrendingUp, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, ChevronDown,
    CalendarIcon,
    DollarSignIcon
} from 'lucide-react';
import DataCard from '@/src/core/shared/presentation/components/data-card';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { FinancialStateTransactionDateChart } from '../components/financial-state-transaction-date-chart';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate } from "date-fns"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { Calendar } from '@/components/ui/calendar';
import { FinancialStateTransactionCountryChart } from '../components/financial-state-transaction-country-chart';
import { FinancialStateTransactionPSPChart } from '../components/financial-state-transaction-psp-chart';
import { FinancialStateDepositPSPChart } from '../components/financial-state-deposit-psp-chart';

//test 

// Chart configuration
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
}

// Custom tooltip component
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
                            ${Math.abs(entry.value).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
const transactionsByDateData = [
    { date: '2024-02-11', deposits: 713457, withdrawals: -469306, netWithdrawals: -11150 },
    { date: '2024-02-12', deposits: 650000, withdrawals: -420000, netWithdrawals: -10500 },
    { date: '2024-02-13', deposits: 580000, withdrawals: -380000, netWithdrawals: -9800 },
    { date: '2024-02-14', deposits: 620000, withdrawals: -400000, netWithdrawals: -10200 },
    { date: '2024-02-15', deposits: 680000, withdrawals: -440000, netWithdrawals: -11000 },
    { date: '2024-02-16', deposits: 700000, withdrawals: -460000, netWithdrawals: -11100 },
    { date: '2024-02-17', deposits: 713457, withdrawals: -469306, netWithdrawals: -11150 },
];

const transactionsByCountryData = [
    { country: 'Malaysia', value: 350000 },
    { country: 'Indonesia', value: 180000 },
    { country: 'Singapore', value: 120000 },
    { country: 'India', value: 80000 },
    { country: 'Korea', value: 60000 },
    { country: 'Taiwan', value: 40000 },
    { country: 'Philippines', value: 30000 },
    { country: 'Others', value: 20000 },
];

const transactionsByPSPData = [
    { name: 'Instant Transfer', deposits: 300000, withdrawals: 200000 },
    { name: 'Online Banking (GFX)', deposits: 250000, withdrawals: 150000 },
    { name: 'E-Wallet', deposits: 163457, withdrawals: 119306 },
];

const depositsByPSPData = [
    { name: 'Instant Transfer', value: 300000 },
    { name: 'Online Banking', value: 250000 },
    { name: 'E-Wallet (GFX)', value: 100000 },
    { name: 'USDT', value: 63457 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const FinancialSummaryCards1 = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-card text-card-foreground p-6">
                <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Total Deposits</span>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">$713,457.17</h2>
                    <p className="text-sm text-muted-foreground">Total deposits received</p>
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground p-6">
                <div className="flex items-center gap-2">
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Total Withdrawals</span>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">$469,306.28</h2>
                    <p className="text-sm text-muted-foreground">Total withdrawals processed</p>
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground p-6">
                <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Net Deposits</span>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">$254,150.89</h2>
                    <p className="text-sm text-muted-foreground">Net deposit amount</p>
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground p-6">
                <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Available Balance</span>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">$659,184.71</h2>
                    <p className="text-sm text-muted-foreground">Available for withdrawal</p>
                </div>
            </div>
        </div>
    );
};


const FinancialSummaryCards2 = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-card text-card-foreground p-6">
                <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Average Deposit</span>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">$1,457.17</h2>
                    <p className="text-sm text-muted-foreground">Average deposit amount</p>
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground p-6">
                <div className="flex items-center gap-2">
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Average Withdrawal</span>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">$2,306.28</h2>
                    <p className="text-sm text-muted-foreground">Average withdrawal amount</p>
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground p-6">
                <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Total Closed PNL</span>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">$54,150.89</h2>
                    <p className="text-sm text-muted-foreground">Total closed profit/loss</p>
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground p-6">
                <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Available For Withdrawal</span>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">$159,184.71</h2>
                    <p className="text-sm text-muted-foreground">Current available balance</p>
                </div>
            </div>
        </div>
    );
};




const financialGroupType = [
    {
        label: "Deposits",
        value: "deposits",
    },
    {
        label: "Withdrawals",
        value: "withdrawals",
    },
]



type FinancialGroupType = "deposits" | "withdrawals";



const FinancialStatsScreen = () => {

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    })
    const [calendarOpen, setCalendarOpen] = React.useState(false)
    const [selectedGroupType, setSelectedGroupType] = React.useState<FinancialGroupType>("deposits")

    return (
        <div className="p-6 space-y-6 bg-background min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center items-start justify-between w-full gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Financial Statistics</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your financial statistics here.
                    </p>
                </div>

                <div className='flex md:flex-row flex-col md:items-center items-start gap-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="min-w-[180px]">
                                <DollarSignIcon className="h-4 w-4 mr-2" />
                                {financialGroupType.find(type => type.value === selectedGroupType)?.label || "All"}
                                <ChevronDown className="h-4 w-4 ml-auto" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px]">
                            {financialGroupType.map((type) => (
                                <DropdownMenuItem
                                    key={type.value}
                                    onClick={() => setSelectedGroupType(type.value as FinancialGroupType)}
                                    className="flex items-center justify-between"
                                >
                                    {type.label}
                                    {selectedGroupType === type.value && (
                                        <span className="h-2 w-2 rounded-full bg-primary" />
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                onClick={() => setCalendarOpen(true)}
                                variant="outline"
                                className="w-[280px] justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {formatDate(date.from, "LLL dd, y")} -{" "}
                                            {formatDate(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        formatDate(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date range</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                className="rounded-md border shadow"
                            />
                        </PopoverContent>
                    </Popover>
                </div>


            </div>



            <div className="space-y-6">
                {selectedGroupType === "deposits" && <FinancialSummaryCards2 />}
                {selectedGroupType === "withdrawals" && <FinancialSummaryCards1 />}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FinancialStateTransactionDateChart />
                    <FinancialStateTransactionCountryChart />
                    <FinancialStateTransactionPSPChart />
                    <FinancialStateDepositPSPChart />
                </div>
            </div>
        </div>
    );
};

export default FinancialStatsScreen;