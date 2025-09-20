"use client"

import React, { useState } from "react"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Plus, Settings, Calculator, MoreVertical } from "lucide-react"
import { formatDate } from "@/src/core/util/helper"

interface Ticket {
    id: number
    title: string
    status: string
    manager: string
    category: string
    fullName: string
    createdAt: Date
    updatedAt: Date
}

const TicketsScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [activeTab, setActiveTab] = useState("open")
    const itemsPerPage = 5

    // Mock ticket data based on the image
    const mockTickets: Ticket[] = [
        {
            id: 79201,
            title: "CHANGE IB",
            status: "pending client",
            manager: "Not Assigned",
            category: "Other",
            fullName: "Sofea Nur Ain Tan Binti Abdullah",
            createdAt: new Date("2025-09-20T11:48:38"),
            updatedAt: new Date("2025-09-20T11:55:08")
        },
        {
            id: 79200,
            title: "Change IB",
            status: "pending client",
            manager: "Not Assigned",
            category: "Accounts",
            fullName: "Yosua Sandy Suerdia",
            createdAt: new Date("2025-09-20T10:42:11"),
            updatedAt: new Date("2025-09-20T10:46:15")
        },
        {
            id: 79199,
            title: "change ib",
            status: "pending client",
            manager: "Not Assigned",
            category: "Other",
            fullName: "Julian Marcos",
            createdAt: new Date("2025-09-20T10:39:46"),
            updatedAt: new Date("2025-09-20T10:42:33")
        },
        {
            id: 79198,
            title: "Leverage",
            status: "pending client",
            manager: "Not Assigned",
            category: "Accounts",
            fullName: "Muhammad Afiq Bin Rosli",
            createdAt: new Date("2025-09-20T10:14:02"),
            updatedAt: new Date("2025-09-20T10:52:29")
        },
        {
            id: 79197,
            title: "Change ib",
            status: "pending client",
            manager: "Not Assigned",
            category: "Accounts",
            fullName: "Hazli Bin Tajudin",
            createdAt: new Date("2025-09-20T10:06:14"),
            updatedAt: new Date("2025-09-20T10:13:33")
        }
    ]

    const totalRecords = 88

    const getStatusBadge = (status: string) => {
        return (
            <Badge 
                variant="secondary"
                className="bg-yellow-100 text-yellow-800 border-yellow-200"
            >
                {status}
            </Badge>
        )
    }

    const getCategoryBadge = (category: string) => {
        const categoryColors: Record<string, string> = {
            'Other': 'bg-gray-100 text-gray-700',
            'Accounts': 'bg-blue-100 text-blue-700',
            'Withdrawals': 'bg-red-100 text-red-700',
            'Deposits': 'bg-green-100 text-green-700'
        }
        
        return (
            <Badge 
                variant="outline" 
                className={categoryColors[category] || categoryColors['Other']}
            >
                {category}
            </Badge>
        )
    }

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            cell: (row: Ticket) => <div className="font-medium text-blue-600">{row.id}</div>,
        },
        {
            header: "Title",
            accessorKey: "title",
            cell: (row: Ticket) => <div className="font-medium text-blue-600">{row.title}</div>,
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: Ticket) => getStatusBadge(row.status),
        },
        {
            header: "Manager",
            accessorKey: "manager",
            cell: (row: Ticket) => <div className="text-muted-foreground">{row.manager}</div>,
        },
        {
            header: "Category",
            accessorKey: "category",
            cell: (row: Ticket) => getCategoryBadge(row.category),
        },
        {
            header: "Full Name",
            accessorKey: "fullName",
            cell: (row: Ticket) => <div className="font-medium">{row.fullName}</div>,
        },
        {
            header: "Created At",
            accessorKey: "createdAt",
            cell: (row: Ticket) => (
                <div className="text-sm">
                    {formatDate(row.createdAt)} {row.createdAt.toLocaleTimeString('en-US', { 
                        hour12: false, 
                        hour: '2-digit', 
                        minute: '2-digit',
                        second: '2-digit'
                    })}
                </div>
            ),
        },
        {
            header: "Updated At",
            accessorKey: "updatedAt",
            cell: (row: Ticket) => (
                <div className="text-sm">
                    {formatDate(row.updatedAt)} {row.updatedAt.toLocaleTimeString('en-US', { 
                        hour12: false, 
                        hour: '2-digit', 
                        minute: '2-digit',
                        second: '2-digit'
                    })}
                </div>
            ),
        }
    ]

    const filters = [
        {
            label: "Status",
            value: "status",
            options: [
                { label: "Pending Client", value: "pending client" },
                { label: "Open", value: "open" },
                { label: "Closed", value: "closed" }
            ]
        },
        {
            label: "Category",
            value: "category",
            options: [
                { label: "Other", value: "Other" },
                { label: "Accounts", value: "Accounts" },
                { label: "Withdrawals", value: "Withdrawals" },
                { label: "Deposits", value: "Deposits" }
            ]
        }
    ]

    const statusTabs = [
        { key: "open", label: "Open", active: true },
        { key: "opened-today", label: "Opened Today", active: false },
        { key: "waiting", label: "Waiting For Response", active: false },
        { key: "closed", label: "Closed", active: false },
        { key: "all", label: "All", active: false }
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
                {/* Tab Navigation */}
                <div className="flex items-center gap-6 mb-6 border-b">
                    <div className="text-lg font-medium text-foreground pb-2 border-b-2 border-primary">
                        Help Desk
                    </div>
                    <div className="text-lg font-medium text-muted-foreground pb-2">
                        Tickets
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="flex items-center gap-2 mb-6">
                    {statusTabs.map((tab) => (
                        <Button
                            key={tab.key}
                            variant={activeTab === tab.key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveTab(tab.key)}
                            className={tab.key === "open" ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                        >
                            {tab.label}
                        </Button>
                    ))}
                    
                    <div className="ml-auto flex items-center gap-4">
                        <Input 
                            placeholder="Search..."
                            className="w-64"
                        />
                        <Button 
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Ticket
                        </Button>
                    </div>
                </div>

                {/* Records and Actions */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-muted-foreground">
                        Records found: {totalRecords}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                            <Download className="h-4 w-4 mr-2" /> Export to CSV
                        </Button>
                        <Button variant="outline" size="sm" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                            <MoreVertical className="h-4 w-4 mr-2" /> Mass Operations
                        </Button>
                        <Button variant="outline" size="sm" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                            <Settings className="h-4 w-4 mr-2" /> Saved configurations
                        </Button>
                    </div>
                </div>
                
                <DefaultTable
                    title=""
                    description=""
                    data={mockTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
                    columns={columns}
                    enableHeader={false}
                    enableFiltering={true}
                    filters={filters}
                    enableSearch={false}
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
                                <Button variant="outline" size="sm" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                                    <Calculator className="h-4 w-4 mr-2" />
                                    Calculate totals
                                </Button>
                            ),
                            onClick: () => console.log("Calculate totals")
                        }
                    ]}
                    rowActions={[]}
                />
            </div>
        </div>
    )
}

export default TicketsScreen 