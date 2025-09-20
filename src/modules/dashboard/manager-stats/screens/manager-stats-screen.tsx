"use client"

import React from 'react';
import {
    Users, TrendingUp, FileText, CheckCircle,
    CalendarIcon,
    ChevronDown
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate } from "date-fns"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { Calendar } from '@/components/ui/calendar';
import FTDRedepositsChart from '@/src/modules/dashboard/manager-stats/components/ftd-redeposits-chart';
import TotalTransactionChart from '@/src/modules/dashboard/manager-stats/components/total-transaction-chart';
import ProcessedTransactionsChart from '@/src/modules/dashboard/manager-stats/components/processed-transactions-chart';
import DocumentsChart from '@/src/modules/dashboard/manager-stats/components/documents-chart';
import PSPDetailsChart from '@/src/modules/dashboard/manager-stats/components/psp-details-chart';
import ApplicationsChart from '@/src/modules/dashboard/manager-stats/components/applications-chart';
import { managerSummaryData, managerGroupTypes, ManagerGroupType } from '../data/manager-stats-data';

const ManagerSummaryCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-card text-card-foreground p-4 sm:p-6">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-xs sm:text-sm font-medium">Total FTD</span>
                </div>
                <div className="mt-3 sm:mt-4">
                    <h2 className="text-xl sm:text-2xl font-bold">${managerSummaryData.totalFTD.toLocaleString()}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">First Time Deposits</p>
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground p-4 sm:p-6">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-xs sm:text-sm font-medium">Total Redeposits</span>
                </div>
                <div className="mt-3 sm:mt-4">
                    <h2 className="text-xl sm:text-2xl font-bold">${managerSummaryData.totalRedeposits.toLocaleString()}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">Returning deposits</p>
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground p-4 sm:p-6">
                <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-500" />
                    <span className="text-xs sm:text-sm font-medium">Total Transactions</span>
                </div>
                <div className="mt-3 sm:mt-4">
                    <h2 className="text-xl sm:text-2xl font-bold">{managerSummaryData.totalTransactions.toLocaleString()}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">All transactions processed</p>
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground p-4 sm:p-6">
                <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-xs sm:text-sm font-medium">Processed</span>
                </div>
                <div className="mt-3 sm:mt-4">
                    <h2 className="text-xl sm:text-2xl font-bold">{managerSummaryData.processedTransactions.toLocaleString()}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">Successfully processed</p>
                </div>
            </div>
        </div>
    );
};

const ManagerStatsScreen = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    })
    const [calendarOpen, setCalendarOpen] = React.useState(false)
    const [selectedGroupType, setSelectedGroupType] = React.useState<ManagerGroupType>("all")

    return (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-background min-h-screen overflow-x-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-bold">Manager Statistics</h1>
                    <p className="text-sm text-muted-foreground">
                        Analyze manager performance and transaction processing metrics.
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row sm:items-center items-stretch gap-2 flex-shrink-0'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-[180px] justify-between">
                                <div className="flex items-center min-w-0">
                                    <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <span className="truncate">{managerGroupTypes.find(type => type.value === selectedGroupType)?.label || "All"}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            {managerGroupTypes.map((type) => (
                                <DropdownMenuItem
                                    key={type.value}
                                    onClick={() => setSelectedGroupType(type.value as ManagerGroupType)}
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
                                className="w-full sm:w-[240px] justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                                <span className="truncate">
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {formatDate(date.from, "MMM dd")} - {formatDate(date.to, "MMM dd, y")}
                                        </>
                                    ) : (
                                        formatDate(date.from, "MMM dd, y")
                                    )
                                ) : (
                                    <span>Pick a date range</span>
                                )}
                                </span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1}
                                className="rounded-md border shadow"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
                <ManagerSummaryCards />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 w-full min-w-0">
                    <div className="min-w-0">
                        <FTDRedepositsChart />
                    </div>
                    <div className="min-w-0">
                        <TotalTransactionChart />
                    </div>
                    <div className="min-w-0">
                        <ProcessedTransactionsChart />
                    </div>
                    <div className="min-w-0">
                        <DocumentsChart />
                    </div>
                    <div className="min-w-0">
                        <PSPDetailsChart />
                    </div>
                    <div className="min-w-0">
                        <ApplicationsChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerStatsScreen;
