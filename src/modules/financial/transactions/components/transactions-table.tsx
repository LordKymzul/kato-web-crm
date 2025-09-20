"use client"

import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Settings, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ColumnConfigurationDialog } from './column-configuration-dialog';
import {
    Transaction,
    allColumns,
    defaultSelectedColumns,
    statusColors,
    typeColors,
    ColumnType,
    RECORDS_PER_PAGE_OPTIONS
} from '../data/transactions-data';

interface TransactionsTableProps {
    data: Transaction[];
    onExportCSV: () => void;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortConfig {
    key: string;
    direction: SortDirection;
}

export function TransactionsTable({ data, onExportCSV }: TransactionsTableProps) {
    const [selectedColumns, setSelectedColumns] = useState<string[]>(defaultSelectedColumns);
    const [pageLimit, setPageLimit] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null });
    const [configDialogOpen, setConfigDialogOpen] = useState(false);

    // Get column definitions for selected columns
    const visibleColumns = allColumns.filter(col => selectedColumns.includes(col.key));

    // Sorting logic
    const sortedData = useMemo(() => {
        if (!sortConfig.key || !sortConfig.direction) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key as keyof Transaction];
            const bValue = b[sortConfig.key as keyof Transaction];

            if (aValue === bValue) return 0;

            const comparison = aValue < bValue ? -1 : 1;
            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
    }, [data, sortConfig]);

    // Pagination logic
    const totalPages = Math.ceil(sortedData.length / pageLimit);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * pageLimit,
        currentPage * pageLimit
    );

    const handleSort = (columnKey: string) => {
        setSortConfig(prev => {
            if (prev.key === columnKey) {
                if (prev.direction === 'asc') return { key: columnKey, direction: 'desc' };
                if (prev.direction === 'desc') return { key: '', direction: null };
            }
            return { key: columnKey, direction: 'asc' };
        });
    };

    const renderSortIcon = (columnKey: string) => {
        if (sortConfig.key !== columnKey) {
            return <ArrowUpDown className="h-4 w-4 opacity-50" />;
        }
        if (sortConfig.direction === 'asc') {
            return <ArrowUp className="h-4 w-4" />;
        }
        return <ArrowDown className="h-4 w-4" />;
    };

    const renderCellValue = (value: any, type: ColumnType) => {
        if (value === null || value === undefined) return '-';

        switch (type) {
            case 'currency':
                return typeof value === 'number' ? `$${value.toLocaleString()}` : value;
            case 'datetime':
                return typeof value === 'string' ? value.replace('T', ' ').slice(0, 19) : value;
            case 'boolean':
                return value ? 'Yes' : 'No';
            case 'badge':
                if (value === 'approved') return <Badge className="bg-green-500">approved</Badge>;
                if (value === 'pending') return <Badge className="bg-blue-500">pending</Badge>;
                if (value === 'success') return <Badge className="bg-green-500">success</Badge>;
                return <Badge variant="secondary">{value}</Badge>;
            case 'number':
                return typeof value === 'number' ? value.toLocaleString() : value;
            default:
                return value?.toString() || '-';
        }
    };

    const renderTypeCell = (type: string) => {
        const colorClass = typeColors[type as keyof typeof typeColors] || 'bg-gray-100 text-gray-800';
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
                {type}
            </span>
        );
    };

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    return (
        <div className="space-y-4">
            {/* Header with controls */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Records found: {data.length.toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={onExportCSV}
                        variant="outline"
                        size="sm"
                        className="bg-green-600 text-white hover:bg-green-700 border-green-600"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Export to CSV
                    </Button>
                    <Button
                        onClick={() => setConfigDialogOpen(true)}
                        variant="outline"
                        size="sm"
                        className="bg-green-600 text-white hover:bg-green-700 border-green-600"
                    >
                        <Settings className="h-4 w-4 mr-2" />
                        Saved configurations
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                {visibleColumns.map((column) => (
                                    <th
                                        key={column.key}
                                        className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70"
                                        onClick={() => handleSort(column.key)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {column.label}
                                            {renderSortIcon(column.key)}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {paginatedData.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-muted/20">
                                    {visibleColumns.map((column) => (
                                        <td key={column.key} className="px-4 py-3 text-sm">
                                            {column.key === 'type' ? 
                                                renderTypeCell(transaction[column.key as keyof Transaction] as string) :
                                                renderCellValue(transaction[column.key as keyof Transaction], column.type as ColumnType)
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Show</span>
                    <Select value={pageLimit.toString()} onValueChange={(value) => {
                        setPageLimit(parseInt(value));
                        setCurrentPage(1);
                    }}>
                        <SelectTrigger className="w-20">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {RECORDS_PER_PAGE_OPTIONS.map((option) => (
                                <SelectItem key={option} value={option.toString()}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">entries</span>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        « Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        {generatePageNumbers().map((page, index) => (
                            <React.Fragment key={index}>
                                {page === '...' ? (
                                    <span className="px-3 py-1 text-sm text-muted-foreground">...</span>
                                ) : (
                                    <Button
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(page as number)}
                                        className="w-8 h-8 p-0"
                                    >
                                        {page}
                                    </Button>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next »
                    </Button>
                </div>
            </div>

            {/* Column Configuration Dialog */}
            <ColumnConfigurationDialog
                open={configDialogOpen}
                onOpenChange={setConfigDialogOpen}
                selectedColumns={selectedColumns}
                onColumnsChange={setSelectedColumns}
                pageLimit={pageLimit}
                onPageLimitChange={setPageLimit}
            />
        </div>
    );
}
