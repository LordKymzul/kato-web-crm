"use client"

import React from 'react';
import {
    MousePointer, UserCheck, DollarSign,
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
import TotalStatisticsChart from '@/src/modules/dashboard/marketing-stats/components/total-statistics-chart';
import CampaignStatisticsChart from '@/src/modules/dashboard/marketing-stats/components/campaign-statistics-chart';
import { 
    marketingSummaryData, 
    marketingGroupTypes, 
    MarketingGroupType,
    campaignTypes,
    CampaignType
} from '../data/marketing-stats-data';

const MarketingSummaryCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card text-card-foreground p-4 sm:p-6">
                <div className="flex items-center gap-2">
                    <MousePointer className="h-4 w-4 text-red-500" />
                    <span className="text-xs sm:text-sm font-medium">CLICKS</span>
                </div>
                <div className="mt-3 sm:mt-4">
                    <h2 className="text-xl sm:text-2xl font-bold">{marketingSummaryData.clicks.toLocaleString()}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total clicks generated</p>
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground p-4 sm:p-6">
                <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    <span className="text-xs sm:text-sm font-medium">REGISTRATIONS</span>
                </div>
                <div className="mt-3 sm:mt-4">
                    <h2 className="text-xl sm:text-2xl font-bold">{marketingSummaryData.registrations.toLocaleString()}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">User registrations</p>
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground p-4 sm:p-6">
                <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    <span className="text-xs sm:text-sm font-medium">FTD</span>
                </div>
                <div className="mt-3 sm:mt-4">
                    <h2 className="text-xl sm:text-2xl font-bold">{marketingSummaryData.ftd.toLocaleString()}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">First time deposits</p>
                </div>
            </div>
        </div>
    );
};

const MarketingStatsScreen = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date('2025-08-19'),
        to: new Date('2025-09-19'),
    })
    const [calendarOpen, setCalendarOpen] = React.useState(false)
    const [selectedGroupType, setSelectedGroupType] = React.useState<MarketingGroupType>("all")
    const [selectedCampaignType, setSelectedCampaignType] = React.useState<CampaignType>("all")

    return (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-background min-h-screen overflow-x-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-bold">Marketing Statistics</h1>
                    <p className="text-sm text-muted-foreground">
                        Analyze marketing campaign performance and conversion metrics.
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row sm:items-center items-stretch gap-2 flex-shrink-0'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-[180px] justify-between">
                                <div className="flex items-center min-w-0">
                                    <MousePointer className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <span className="truncate">{marketingGroupTypes.find(type => type.value === selectedGroupType)?.label || "All"}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            {marketingGroupTypes.map((type) => (
                                <DropdownMenuItem
                                    key={type.value}
                                    onClick={() => setSelectedGroupType(type.value as MarketingGroupType)}
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
                                    <span className="truncate">{campaignTypes.find(type => type.value === selectedCampaignType)?.label || "All Campaigns"}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            {campaignTypes.map((type) => (
                                <DropdownMenuItem
                                    key={type.value}
                                    onClick={() => setSelectedCampaignType(type.value as CampaignType)}
                                    className="flex items-center justify-between"
                                >
                                    {type.label}
                                    {selectedCampaignType === type.value && (
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
                <MarketingSummaryCards />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 w-full min-w-0">
                    <div className="min-w-0">
                        <TotalStatisticsChart />
                    </div>
                    <div className="min-w-0">
                        <CampaignStatisticsChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketingStatsScreen;
