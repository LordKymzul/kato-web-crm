"use client"

import React, { useState } from "react"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Plus, Settings, Edit, Trash2 } from "lucide-react"

interface Category {
    id: number
    name: string
    description: string
    ticketCount: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

const CategoryScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // Mock category data
    const mockCategories: Category[] = [
        {
            id: 1,
            name: "Accounts",
            description: "Account-related issues and requests",
            ticketCount: 35,
            isActive: true,
            createdAt: new Date("2025-01-15T10:00:00"),
            updatedAt: new Date("2025-09-20T10:30:00")
        },
        {
            id: 2,
            name: "Withdrawals",
            description: "Withdrawal processing and related issues",
            ticketCount: 28,
            isActive: true,
            createdAt: new Date("2025-01-15T10:05:00"),
            updatedAt: new Date("2025-09-20T11:20:00")
        },
        {
            id: 3,
            name: "Deposits",
            description: "Deposit-related inquiries and problems",
            ticketCount: 15,
            isActive: true,
            createdAt: new Date("2025-01-15T10:10:00"),
            updatedAt: new Date("2025-09-20T09:45:00")
        },
        {
            id: 4,
            name: "Other",
            description: "General inquiries and miscellaneous issues",
            ticketCount: 10,
            isActive: true,
            createdAt: new Date("2025-01-15T10:15:00"),
            updatedAt: new Date("2025-09-20T12:10:00")
        },
        {
            id: 5,
            name: "Technical Support",
            description: "Platform technical issues and bug reports",
            ticketCount: 0,
            isActive: false,
            createdAt: new Date("2025-02-01T14:00:00"),
            updatedAt: new Date("2025-09-15T16:30:00")
        }
    ]

    const totalRecords = 5

    const getActiveBadge = (isActive: boolean) => {
        return (
            <Badge 
                variant={isActive ? "default" : "secondary"}
                className={isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}
            >
                {isActive ? "Active" : "Inactive"}
            </Badge>
        )
    }

    const getCategoryBadge = (name: string) => {
        const categoryColors: Record<string, string> = {
            'Other': 'bg-gray-100 text-gray-700',
            'Accounts': 'bg-blue-100 text-blue-700',
            'Withdrawals': 'bg-red-100 text-red-700',
            'Deposits': 'bg-green-100 text-green-700',
            'Technical Support': 'bg-purple-100 text-purple-700'
        }
        
        return (
            <Badge 
                variant="outline" 
                className={categoryColors[name] || categoryColors['Other']}
            >
                {name}
            </Badge>
        )
    }

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            cell: (row: Category) => <div className="font-medium text-blue-600">{row.id}</div>,
        },
        {
            header: "Category Name",
            accessorKey: "name",
            cell: (row: Category) => getCategoryBadge(row.name),
        },
        {
            header: "Description",
            accessorKey: "description",
            cell: (row: Category) => <div className="text-sm">{row.description}</div>,
        },
        {
            header: "Ticket Count",
            accessorKey: "ticketCount",
            cell: (row: Category) => (
                <div className="font-medium text-center">
                    <span className={row.ticketCount > 20 ? 'text-red-600' : row.ticketCount > 10 ? 'text-orange-600' : 'text-green-600'}>
                        {row.ticketCount}
                    </span>
                </div>
            ),
        },
        {
            header: "Status",
            accessorKey: "isActive",
            cell: (row: Category) => getActiveBadge(row.isActive),
        },
        {
            header: "Created At",
            accessorKey: "createdAt",
            cell: (row: Category) => (
                <div className="text-sm">
                    {row.createdAt.toLocaleDateString()}
                </div>
            ),
        },
        {
            header: "Updated At",
            accessorKey: "updatedAt",
            cell: (row: Category) => (
                <div className="text-sm">
                    {row.updatedAt.toLocaleDateString()}
                </div>
            ),
        }
    ]

    const filters = [
        {
            label: "Status",
            value: "isActive",
            options: [
                { label: "Active", value: "true" },
                { label: "Inactive", value: "false" }
            ]
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
        <div className="p-6 bg-background h-full">
            <div className="w-full overflow-hidden">
                <DefaultTable
                    title="Help Desk Categories"
                    description="Manage ticket categories and their settings"
                    data={mockCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
                    columns={columns}
                    enableHeader={true}
                    enableFiltering={true}
                    filters={filters}
                    enableSearch={true}
                    enableSorting={true}
                    enablePagination={true}
                    totalItems={totalRecords}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    onPageChange={handlePageChange}
                    isLoading={false}
                    headerActions={[
                        {
                            label: (
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                            ),
                            onClick: () => console.log("Export")
                        },
                        {
                            label: (
                                <Button variant="default" size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Category
                                </Button>
                            ),
                            onClick: () => console.log("Add category")
                        }
                    ]}
                    rowActions={[
                        {
                            label: "Edit",
                            onClick: (row) => console.log("Edit", row)
                        },
                        {
                            label: "Toggle Status",
                            onClick: (row) => console.log("Toggle", row)
                        },
                        {
                            label: "Delete",
                            onClick: (row) => console.log("Delete", row)
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default CategoryScreen 