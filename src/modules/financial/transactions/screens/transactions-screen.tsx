"use client"

import React, { useState } from 'react';
import {
    CalendarIcon,
    ChevronDown,
    Filter
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
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { formatDate } from "date-fns"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { Calendar } from '@/components/ui/calendar';
import { TransactionsTable } from '../components/transactions-table';
import { exportToCSV } from '../components/csv-export';
import { transactionsData, defaultSelectedColumns } from '../data/transactions-data';

const TransactionsScreen = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date('2025-09-19'),
        to: new Date('2025-09-19'),
    })
    const [calendarOpen, setCalendarOpen] = React.useState(false)
    const [selectedColumns, setSelectedColumns] = useState<string[]>(defaultSelectedColumns);
    
    // Filter states
    const [filters, setFilters] = useState({
        id: '',
        type: '',
        pspStatus: '',
        status: '',
        fullName: '',
        account: ''
    });

    // Filter data based on current filters
    const filteredData = transactionsData.filter(transaction => {
        return Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            const transactionValue = transaction[key as keyof typeof transaction];
            return transactionValue?.toString().toLowerCase().includes(value.toLowerCase());
        });
    });

    const handleExportCSV = () => {
        exportToCSV(filteredData, selectedColumns, 'transactions');
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-background min-h-screen overflow-x-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-bold">Transactions</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage and analyze all financial transactions.
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row sm:items-center items-stretch gap-2 flex-shrink-0'>
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

            {/* Filters Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-4 bg-muted/20 rounded-lg">
                <div className="space-y-2">
                    <label htmlFor="id-filter" className="text-xs font-medium text-muted-foreground uppercase">
                        ID
                    </label>
                    <Input
                        id="id-filter"
                        placeholder="Filter by ID..."
                        value={filters.id}
                        onChange={(e) => handleFilterChange('id', e.target.value)}
                        className="h-8"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="type-filter" className="text-xs font-medium text-muted-foreground uppercase">
                        Type
                    </label>
                    <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                        <SelectTrigger className="h-8">
                            <SelectValue placeholder="None select..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Types</SelectItem>
                            <SelectItem value="Deposit">Deposit</SelectItem>
                            <SelectItem value="withdrawal">Withdrawal</SelectItem>
                            <SelectItem value="transfer out">Transfer Out</SelectItem>
                            <SelectItem value="transfer in">Transfer In</SelectItem>
                            <SelectItem value="100% Deposit Bonus">100% Deposit Bonus</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="psp-status-filter" className="text-xs font-medium text-muted-foreground uppercase">
                        PSP Status
                    </label>
                    <Select value={filters.pspStatus} onValueChange={(value) => handleFilterChange('pspStatus', value)}>
                        <SelectTrigger className="h-8">
                            <SelectValue placeholder="None select..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Status</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="success">Success</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="status-filter" className="text-xs font-medium text-muted-foreground uppercase">
                        Status
                    </label>
                    <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                        <SelectTrigger className="h-8">
                            <SelectValue placeholder="None select..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Status</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="created-at-filter" className="text-xs font-medium text-muted-foreground uppercase">
                        Created At
                    </label>
                    <div className="flex items-center">
                        <Input
                            id="created-at-filter"
                            type="date"
                            className="h-8"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="processed-at-filter" className="text-xs font-medium text-muted-foreground uppercase">
                        Processed At
                    </label>
                    <div className="flex items-center">
                        <Input
                            id="processed-at-filter"
                            type="date"
                            className="h-8"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="full-name-filter" className="text-xs font-medium text-muted-foreground uppercase">
                        Full Name
                    </label>
                    <Input
                        id="full-name-filter"
                        placeholder="Filter by name..."
                        value={filters.fullName}
                        onChange={(e) => handleFilterChange('fullName', e.target.value)}
                        className="h-8"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="account-filter" className="text-xs font-medium text-muted-foreground uppercase">
                        Account
                    </label>
                    <Input
                        id="account-filter"
                        placeholder="Filter by account..."
                        value={filters.account}
                        onChange={(e) => handleFilterChange('account', e.target.value)}
                        className="h-8"
                    />
                </div>
            </div>

            {/* Transactions Table */}
            <div className="space-y-4">
                <TransactionsTable 
                    data={filteredData}
                    onExportCSV={handleExportCSV}
                />
            </div>
        </div>
    );
};

export default TransactionsScreen;
