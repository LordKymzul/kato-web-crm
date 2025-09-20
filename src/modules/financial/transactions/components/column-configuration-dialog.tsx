"use client"

import React, { useState, useEffect } from 'react';
import { X, Search, RotateCcw, Save } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { columnCategories, defaultSelectedColumns, allColumns, RECORDS_PER_PAGE_OPTIONS } from '../data/transactions-data';

interface ColumnConfigurationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedColumns: string[];
    onColumnsChange: (columns: string[]) => void;
    pageLimit: number;
    onPageLimitChange: (limit: number) => void;
}

export function ColumnConfigurationDialog({
    open,
    onOpenChange,
    selectedColumns,
    onColumnsChange,
    pageLimit,
    onPageLimitChange
}: ColumnConfigurationDialogProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [localSelectedColumns, setLocalSelectedColumns] = useState<string[]>(selectedColumns);
    const [localPageLimit, setLocalPageLimit] = useState(pageLimit);

    useEffect(() => {
        setLocalSelectedColumns(selectedColumns);
        setLocalPageLimit(pageLimit);
    }, [selectedColumns, pageLimit, open]);

    const filteredCategories = Object.entries(columnCategories).reduce((acc, [categoryName, columns]) => {
        const filteredColumns = columns.filter(column =>
            column.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            column.key.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredColumns.length > 0) {
            acc[categoryName] = filteredColumns;
        }
        return acc;
    }, {} as Record<string, typeof allColumns>);

    const handleColumnToggle = (columnKey: string) => {
        setLocalSelectedColumns(prev => 
            prev.includes(columnKey) 
                ? prev.filter(key => key !== columnKey)
                : [...prev, columnKey]
        );
    };

    const handleResetToDefault = () => {
        setLocalSelectedColumns(defaultSelectedColumns);
        setLocalPageLimit(20);
    };

    const handleSaveChanges = () => {
        onColumnsChange(localSelectedColumns);
        onPageLimitChange(localPageLimit);
        onOpenChange(false);
    };

    const removeColumn = (columnKey: string) => {
        setLocalSelectedColumns(prev => prev.filter(key => key !== columnKey));
    };

    const selectedColumnObjects = allColumns.filter(col => localSelectedColumns.includes(col.key));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <DialogTitle className="text-xl font-semibold">Columns Configuration</DialogTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenChange(false)}
                        className="h-6 w-6 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                <div className="flex flex-col gap-4 flex-1 overflow-hidden">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Column Categories */}
                    <div className="flex-1 overflow-y-auto space-y-6">
                        {Object.entries(filteredCategories).map(([categoryName, columns]) => (
                            <div key={categoryName}>
                                <h3 className="text-lg font-medium mb-3">{categoryName}</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {columns.map((column) => (
                                        <div key={column.key} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50">
                                            <Checkbox
                                                id={column.key}
                                                checked={localSelectedColumns.includes(column.key)}
                                                onCheckedChange={() => handleColumnToggle(column.key)}
                                            />
                                            <label
                                                htmlFor={column.key}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                                            >
                                                {column.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Selected Columns Summary */}
                    <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-medium">
                                Selected columns {localSelectedColumns.length}/{allColumns.length}
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleResetToDefault}
                                className="flex items-center gap-2"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Reset to default
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                            Order columns by drag-n-drop. Remove columns by clicking on the cross icon.
                        </p>
                        
                        {/* Selected Column Tags */}
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                            {selectedColumnObjects.map((column) => (
                                <Badge
                                    key={column.key}
                                    variant="secondary"
                                    className="flex items-center gap-1 px-2 py-1"
                                >
                                    {column.label}
                                    <button
                                        onClick={() => removeColumn(column.key)}
                                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>

                        {/* Page Limit */}
                        <div className="flex items-center gap-2 mt-4">
                            <label htmlFor="page-limit" className="text-sm font-medium">
                                Page limit
                            </label>
                            <Select value={localPageLimit.toString()} onValueChange={(value) => setLocalPageLimit(parseInt(value))}>
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
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                            variant="outline"
                            onClick={handleResetToDefault}
                            className="flex items-center gap-2"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Reset to default
                        </Button>
                        <Button
                            onClick={handleSaveChanges}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                        >
                            <Save className="h-4 w-4" />
                            Save changes
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
