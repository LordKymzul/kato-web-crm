"use client"

import React, { useState } from "react"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileBarChart, Settings } from "lucide-react"
import { formatDate } from "@/src/core/util/helper"

interface Transfer {
    id: string
    type: string
    status: string
    createdAt: Date
    processedAt: Date
    client: string
    account: string
}

const TransferScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5 // Only 5 records per page

    // Mock data matching the image
    const mockTransfers: Transfer[] = [
        {
            id: "147297",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:53:43"),
            processedAt: new Date("2025-09-19T13:53:43"),
            client: "Ahmad Shafiq Bin Paiman",
            account: "MT5 Plus 5000 1062254 => Kato Wallet 27701"
        },
        {
            id: "147296",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:51:10"),
            processedAt: new Date("2025-09-19T13:51:10"),
            client: "Nuraishah Ahmad Moksin",
            account: "Kato Wallet 19563 => MT5 Plus 5000 1061405"
        },
        {
            id: "147295",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:50:15"),
            processedAt: new Date("2025-09-19T13:50:16"),
            client: "Mohd Azhari A Aziz",
            account: "MT4 Standard Account 571384 => MT4 Standard Account 40227"
        },
        {
            id: "147294",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:50:05"),
            processedAt: new Date("2025-09-19T13:50:06"),
            client: "Bradley Billy",
            account: "MT4 Standard Account 569214 => MT5 Plus 5000 1040693"
        },
        {
            id: "147293",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:46:44"),
            processedAt: new Date("2025-09-19T13:46:45"),
            client: "Muhasman Md Zain",
            account: "Kato Wallet 27717 => MT5 Plus 5000 1060399"
        },
        {
            id: "147292",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:43:48"),
            processedAt: new Date("2025-09-19T13:43:49"),
            client: "Tuasah Kasah",
            account: "MT5 Standard Account 724115 => MT5 Standard Account 743124"
        },
        {
            id: "147291",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:40:02"),
            processedAt: new Date("2025-09-19T13:40:02"),
            client: "Yap Yu Teng",
            account: "Kato Wallet 18934 => MT5 Plus 5000 1043425"
        },
        {
            id: "147290",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:29:41"),
            processedAt: new Date("2025-09-19T13:29:42"),
            client: "Abdul Rahman Ali",
            account: "Kato Wallet 18965 => MT5 STP Account (Zero-Spread) 1043660"
        },
        {
            id: "147289",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:28:56"),
            processedAt: new Date("2025-09-19T13:28:56"),
            client: "Mohd Irwan Mansang",
            account: "Kato Wallet 19251 => MT5 Plus 5000 1044188"
        },
        {
            id: "147288",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:25:37"),
            processedAt: new Date("2025-09-19T13:25:37"),
            client: "Ginny Lim Su Lane",
            account: "Kato Wallet 19693 => MT5 STP Account (Zero-Spread) 1058031"
        },
        {
            id: "147287",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:23:40"),
            processedAt: new Date("2025-09-19T13:23:41"),
            client: "Eu Zi Chong",
            account: "MT5 Plus 5000 1042125 => MT5 Standard Account 741186"
        },
        {
            id: "147286",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:23:28"),
            processedAt: new Date("2025-09-19T13:23:28"),
            client: "Eu Zi Chong",
            account: "MT5 Plus 5000 1042129 => MT5 Plus 5000 1042125"
        },
        {
            id: "147285",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:21:56"),
            processedAt: new Date("2025-09-19T13:21:57"),
            client: "Ginny Lim Su Lane",
            account: "Kato Wallet 19693 => MT5 STP Account (Zero-Spread) 1058031"
        },
        {
            id: "147284",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:20:33"),
            processedAt: new Date("2025-09-19T13:20:34"),
            client: "Ginny Lim Su Lane",
            account: "Kato Wallet 19693 => MT5 STP Account (Zero-Spread) 1058031"
        },
        {
            id: "147283",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:11:18"),
            processedAt: new Date("2025-09-19T13:11:18"),
            client: "Mohamad Radhi Bin Seman",
            account: "Kato Wallet 21697 => MT5 Plus 5000 1052800"
        },
        {
            id: "147282",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:11:17"),
            processedAt: new Date("2025-09-19T13:11:17"),
            client: "Khairunnisa Junaidi",
            account: "Kato Wallet 22772 => MT5 Plus 5000 3003368"
        },
        {
            id: "147281",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:00:38"),
            processedAt: new Date("2025-09-19T13:00:38"),
            client: "Yap Yu Teng",
            account: "Kato Wallet 18934 => MT5 Plus 5000 1043425"
        },
        {
            id: "147280",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T13:00:10"),
            processedAt: new Date("2025-09-19T13:00:11"),
            client: "Joko Boham",
            account: "MT5 RAW Account 808563 => MT5 STP Account (Zero-Spread) 30"
        },
        {
            id: "147279",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T12:58:28"),
            processedAt: new Date("2025-09-19T12:58:29"),
            client: "Afiq Farhan",
            account: "MT5 Standard Account 725885 => MT5 Standard Account 748958"
        },
        {
            id: "147278",
            type: "Internal Transfer",
            status: "approved",
            createdAt: new Date("2025-09-19T12:57:57"),
            processedAt: new Date("2025-09-19T12:57:57"),
            client: "Hafiz Roslin",
            account: "Kato Wallet 21775 => MT5 Plus 5000 1057257"
        }
    ]

    const totalRecords = 850000

    const getStatusBadge = (status: string) => {
        return (
            <Badge className="bg-green-500 text-white border-green-500">
                {status}
            </Badge>
        )
    }

    const getTypeBadge = (type: string) => {
        return (
            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                {type}
            </Badge>
        )
    }

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            cell: (row: Transfer) => <div className="font-medium">{row.id}</div>,
        },
        {
            header: "Type",
            accessorKey: "type",
            cell: (row: Transfer) => getTypeBadge(row.type),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: Transfer) => getStatusBadge(row.status),
        },
        {
            header: "Created At",
            accessorKey: "createdAt",
            cell: (row: Transfer) => (
                <div className="text-sm">
                    {formatDate(row.createdAt)} {row.createdAt.toLocaleTimeString('en-US', { 
                        hour12: false, 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}
                </div>
            ),
        },
        {
            header: "Processed At",
            accessorKey: "processedAt",
            cell: (row: Transfer) => (
                <div className="text-sm">
                    {formatDate(row.processedAt)} {row.processedAt.toLocaleTimeString('en-US', { 
                        hour12: false, 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}
                </div>
            ),
        },
        {
            header: "Client",
            accessorKey: "client",
            cell: (row: Transfer) => <div className="font-medium">{row.client}</div>,
        },
        {
            header: "Account",
            accessorKey: "account",
            cell: (row: Transfer) => (
                <div className="text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer">
                    {row.account}
                </div>
            ),
        }
    ]

    const filters = [
        {
            label: "Type",
            value: "type",
            options: [
                { label: "Internal Transfer", value: "internal_transfer" },
                { label: "External Transfer", value: "external_transfer" }
            ]
        },
        {
            label: "Status",
            value: "status",
            options: [
                { label: "Approved", value: "approved" },
                { label: "Pending", value: "pending" },
                { label: "Rejected", value: "rejected" }
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
                {/* Custom header for Export buttons */}
                <div className="flex justify-end items-center mb-4 gap-2">
                    <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Export to CSV
                    </Button>
                    <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    >
                        <FileBarChart className="h-4 w-4 mr-2" />
                        Saved configurations
                    </Button>
                    <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
                
                <DefaultTable
                    title=""
                    description=""
                    data={mockTransfers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
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
                    headerActions={[]}
                    rowActions={[]}
                />
            </div>
        </div>
    )
}

export default TransferScreen 