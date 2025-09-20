"use client"


import OverviewDataTable from "../components/overview-data-table"
import React, { useState } from "react"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate } from "date-fns"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { Calendar } from '@/components/ui/calendar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"

const OverviewScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    })
    const [calendarOpen, setCalendarOpen] = React.useState(false)

    // Mock data for documents
    const documents = [
        {
            id: "1",
            client: "Rahmat Setiawan",
            type: "ID/Passport",
            expiresAt: new Date("2022-05-25")
        },
        {
            id: "2",
            client: "Muhammad Aqil Bin Ahmad Fadzli",
            type: "ID/Passport",
            expiresAt: new Date("2025-09-23")
        },
        {
            id: "3",
            client: "Andi Lim",
            type: "Proof of Address",
            expiresAt: new Date("2025-10-03")
        },
        {
            id: "4",
            client: "Herosseh John Baptise",
            type: "Proof of Address",
            expiresAt: new Date("2025-09-22")
        },
        {
            id: "5",
            client: "Muhammad Ridhwan Aziz",
            type: "Proof of Address",
            expiresAt: new Date("2025-09-22")
        }
    ]

    const handleSearch = (term: string) => {
        console.log("Search term:", term)
    }

    const handleFilterChange = (filters: Record<string, string>) => {
        console.log("Filters:", filters)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="p-6 space-y-6 bg-background min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center items-start justify-between w-full gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Overview</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your overview here.
                    </p>
                </div>

                <div className='flex md:flex-row flex-col md:items-center items-start gap-2'>


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

            <OverviewDataTable
                documents={documents}
                totalItems={documents.length}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onPageChange={handlePageChange}
                isLoading={false}
                enableHeader={true}
            />
        </div>
    )
}

export default OverviewScreen