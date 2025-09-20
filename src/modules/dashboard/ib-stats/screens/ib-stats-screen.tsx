"use client"

import React from 'react';
import {
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
import CommissionStatisticsChart from '@/src/modules/dashboard/ib-stats/components/commission-statistics-chart';
import IBLinksStatisticsChart from '@/src/modules/dashboard/ib-stats/components/ib-links-statistics-chart';
import TopReferringIBsChart from '@/src/modules/dashboard/ib-stats/components/top-referring-ibs-chart';
import TopEarningIBsChart from '@/src/modules/dashboard/ib-stats/components/top-earning-ibs-chart';
import { 
    ibGroupTypes, 
    IBGroupType,
    ibTypes,
    IBType
} from '../data/ib-stats-data';

const IBStatsScreen = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date('2025-08-19'),
        to: new Date('2025-09-19'),
    })
    const [calendarOpen, setCalendarOpen] = React.useState(false)
    const [selectedGroupType, setSelectedGroupType] = React.useState<IBGroupType>("all")
    const [selectedIBType, setSelectedIBType] = React.useState<IBType>("all")

    return (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-background min-h-screen overflow-x-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-bold">IB Statistics</h1>
                    <p className="text-sm text-muted-foreground">
                        Analyze IB performance, commissions, and referral metrics.
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row sm:items-center items-stretch gap-2 flex-shrink-0'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-[180px] justify-between">
                                <div className="flex items-center min-w-0">
                                    <span className="truncate">{ibGroupTypes.find(type => type.value === selectedGroupType)?.label || "All"}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            {ibGroupTypes.map((type) => (
                                <DropdownMenuItem
                                    key={type.value}
                                    onClick={() => setSelectedGroupType(type.value as IBGroupType)}
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

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-[180px] justify-between">
                                <div className="flex items-center min-w-0">
                                    <span className="truncate">{ibTypes.find(type => type.value === selectedIBType)?.label || "All IBs"}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            {ibTypes.map((type) => (
                                <DropdownMenuItem
                                    key={type.value}
                                    onClick={() => setSelectedIBType(type.value as IBType)}
                                    className="flex items-center justify-between"
                                >
                                    {type.label}
                                    {selectedIBType === type.value && (
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
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 w-full min-w-0">
                    <div className="min-w-0">
                        <CommissionStatisticsChart />
                    </div>
                    <div className="min-w-0">
                        <IBLinksStatisticsChart />
                    </div>
                    <div className="min-w-0">
                        <TopReferringIBsChart />
                    </div>
                    <div className="min-w-0">
                        <TopEarningIBsChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IBStatsScreen;
