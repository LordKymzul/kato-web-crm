"use client"

import React, { useState } from "react"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Settings, Calculator } from "lucide-react"

interface Campaign {
    id: number
    links: number
    clicks: number
    uniqueClicks: number
    registrations: number
    ftd: number
    companies: string
    createdAt: Date
    title: string
    description: string
    isActive: boolean
}

const CampaignsScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // Mock campaign data
    const mockCampaigns: Campaign[] = [
        {
            id: 1,
            links: 4,
            clicks: 2,
            uniqueClicks: 0,
            registrations: 0,
            ftd: 0,
            companies: "Kato Prime",
            createdAt: new Date("2021-12-09T13:06:00"),
            title: "TEST LINK FOR BONUS",
            description: "TEST LINK",
            isActive: true
        },
        {
            id: 2,
            links: 7,
            clicks: 386,
            uniqueClicks: 291,
            registrations: 4,
            ftd: 1,
            companies: "Kato Prime",
            createdAt: new Date("2022-07-01T14:40:00"),
            title: "Kato Prime",
            description: "50% Deposit",
            isActive: true
        },
        {
            id: 3,
            links: 12,
            clicks: 529,
            uniqueClicks: 449,
            registrations: 4,
            ftd: 2,
            companies: "Kato Prime",
            createdAt: new Date("2022-07-31T19:11:00"),
            title: "Kato Prime",
            description: "50% Deposit",
            isActive: false
        },
        {
            id: 4,
            links: 5,
            clicks: 205,
            uniqueClicks: 174,
            registrations: 1,
            ftd: 0,
            companies: "Kato Prime",
            createdAt: new Date("2022-11-14T10:07:00"),
            title: "50% Deposit Bonus (Nov - Dec)",
            description: "Campaign Bonus",
            isActive: true
        },
        {
            id: 5,
            links: 4,
            clicks: 1413,
            uniqueClicks: 1044,
            registrations: 3,
            ftd: 1,
            companies: "Kato Prime",
            createdAt: new Date("2022-12-20T06:18:00"),
            title: "50% Deposit Bonus (Dec 2022 - Jan 2023)",
            description: "Promotions",
            isActive: true
        }
    ]

    const totalRecords = 36

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

    const columns = [
        {
            header: "Links",
            accessorKey: "links",
            cell: (row: Campaign) => <div className="font-medium text-center">{row.links}</div>,
        },
        {
            header: "Clicks",
            accessorKey: "clicks",
            cell: (row: Campaign) => <div className="font-medium text-center">{row.clicks}</div>,
        },
        {
            header: "Unique Clicks",
            accessorKey: "uniqueClicks",
            cell: (row: Campaign) => <div className="font-medium text-center">{row.uniqueClicks}</div>,
        },
        {
            header: "Registrations",
            accessorKey: "registrations",
            cell: (row: Campaign) => <div className="font-medium text-center">{row.registrations}</div>,
        },
        {
            header: "FTD",
            accessorKey: "ftd",
            cell: (row: Campaign) => <div className="font-medium text-center">{row.ftd}</div>,
        },
        {
            header: "Companies",
            accessorKey: "companies",
            cell: (row: Campaign) => <div className="font-medium">{row.companies}</div>,
        },
        {
            header: "ID",
            accessorKey: "id",
            cell: (row: Campaign) => <div className="font-medium text-blue-600">{row.id}</div>,
        },
        {
            header: "Created At",
            accessorKey: "createdAt",
            cell: (row: Campaign) => (
                <div className="text-sm">
                    {row.createdAt.toLocaleDateString()} {row.createdAt.toLocaleTimeString('en-US', { 
                        hour12: false, 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}
                </div>
            ),
        },
        {
            header: "Title",
            accessorKey: "title",
            cell: (row: Campaign) => <div className="font-medium">{row.title}</div>,
        },
        {
            header: "Description",
            accessorKey: "description",
            cell: (row: Campaign) => <div className="text-sm text-muted-foreground">{row.description}</div>,
        },
        {
            header: "Is Active",
            accessorKey: "isActive",
            cell: (row: Campaign) => getActiveBadge(row.isActive),
        }
    ]

    const filters = [
        {
            label: "Is Active",
            value: "isActive",
            options: [
                { label: "Active", value: "true" },
                { label: "Inactive", value: "false" }
            ]
        },
        {
            label: "Companies",
            value: "companies",
            options: [
                { label: "Kato Prime", value: "Kato Prime" }
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
            <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-muted-foreground">
                    Records found: {totalRecords}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                        <Download className="h-4 w-4 mr-2" /> Export to CSV
                    </Button>
                    <Button variant="outline" size="sm" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                        <Settings className="h-4 w-4 mr-2" /> Saved configurations
                    </Button>
                </div>
            </div>
            
            <DefaultTable
                title=""
                description=""
                data={mockCampaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
                columns={columns}
                enableHeader={false}
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

export default CampaignsScreen 