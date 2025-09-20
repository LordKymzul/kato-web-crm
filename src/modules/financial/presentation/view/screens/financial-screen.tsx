"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, MoreHorizontal } from "lucide-react"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/src/core/util/helper"

interface Transaction {
    id: string
    type: string
    pspStatus: string | null
    status: string
    createdAt: Date
    processedAt: Date
    fullName: string
    account: string
    processedAmount: number
    commission: number
    processedCurrency: string
    server: string
    paymentSystem: string
    gateway: string
    mtTicket: string
    login: string
}

const FinancialScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5 // Only 5 records per page

    // Mock data with all columns - exact format from your example
    const mockTransactions: Transaction[] = [
        {
            id: "1474741",
            type: "Deposit",
            pspStatus: null,
            status: "pending",
            createdAt: new Date("2025-09-19T13:18:09"),
            processedAt: new Date("2025-09-19T13:18:12"),
            fullName: "Dian Nopita Rosli",
            account: "MT5 STP Account (Zero-Spread) 3002935",
            processedAmount: 200.00,
            commission: 0,
            processedCurrency: "MYR",
            server: "MT5 live",
            paymentSystem: "Online Banking 1 (SEA)",
            gateway: "awepays2s",
            mtTicket: "",
            login: "3002935"
        },
        {
            id: "1474740",
            type: "Deposit",
            pspStatus: null,
            status: "pending",
            createdAt: new Date("2025-09-19T13:16:52"),
            processedAt: new Date("2025-09-19T13:16:55"),
            fullName: "Sheikh Shafizal Sheikh Ilman",
            account: "MT5 100% Bonus 3005717",
            processedAmount: 450.00,
            commission: 0,
            processedCurrency: "MYR",
            server: "MT5 live",
            paymentSystem: "Online Banking 1 (SEA)",
            gateway: "awepays2s",
            mtTicket: "",
            login: "3005717"
        },
        {
            id: "1474739",
            type: "withdrawal",
            pspStatus: "success",
            status: "approved",
            createdAt: new Date("2025-09-19T13:15:08"),
            processedAt: new Date("2025-09-19T13:15:11"),
            fullName: "Ahmad Rahman",
            account: "Kato Wallet 21697",
            processedAmount: 222.22,
            commission: 0,
            processedCurrency: "USD",
            server: "wallet",
            paymentSystem: "",
            gateway: "",
            mtTicket: "31175565",
            login: "21697"
        },
        {
            id: "1474738",
            type: "Deposit",
            pspStatus: "pending",
            status: "pending",
            createdAt: new Date("2025-09-19T13:14:30"),
            processedAt: new Date("2025-09-19T13:14:32"),
            fullName: "Siti Nurhaliza",
            account: "MT5 Plus 5000 1056022",
            processedAmount: 100.00,
            commission: 0,
            processedCurrency: "USD",
            server: "MT5 live",
            paymentSystem: "Online Banking 1 (SEA)",
            gateway: "awepays2s",
            mtTicket: "31176020",
            login: "1056022"
        },
        {
            id: "1474737",
            type: "transfer out",
            pspStatus: "approved",
            status: "approved",
            createdAt: new Date("2025-09-19T13:13:22"),
            processedAt: new Date("2025-09-19T13:13:22"),
            fullName: "Lim Wei Ming",
            account: "MT5 Standard Account 744655",
            processedAmount: 75.50,
            commission: 2.5,
            processedCurrency: "USD",
            server: "MT5 live",
            paymentSystem: "",
            gateway: "",
            mtTicket: "36650",
            login: "744655"
        }
    ]

    const totalRecords = 1363676

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, string> = {
            'pending': 'bg-blue-500 text-white border-blue-500',
            'approved': 'bg-green-500 text-white border-green-500', 
            'pending check': 'bg-gray-800 text-white border-gray-800',
            'success': 'bg-green-500 text-white border-green-500'
        }
        
        return (
            <Badge className={statusConfig[status] || statusConfig['pending']}>
                {status}
            </Badge>
        )
    }

    const getTypeBadge = (type: string) => {
        const typeConfig: Record<string, string> = {
            'Deposit': 'bg-blue-100 text-blue-700 border-blue-200',
            'withdrawal': 'bg-gray-100 text-gray-700 border-gray-200',
            'transfer out': 'bg-gray-100 text-gray-700 border-gray-200',
            'transfer in': 'bg-gray-100 text-gray-700 border-gray-200'
        }
        
        return (
            <Badge variant="outline" className={typeConfig[type] || typeConfig['Deposit']}>
                {type}
            </Badge>
        )
    }

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            cell: (row: Transaction) => <div className="font-medium">{row.id}</div>,
        },
        {
            header: "Type",
            accessorKey: "type",
            cell: (row: Transaction) => getTypeBadge(row.type),
        },
        {
            header: "PSP Status",
            accessorKey: "pspStatus",
            cell: (row: Transaction) => (
                row.pspStatus ? getStatusBadge(row.pspStatus) : <span className="text-muted-foreground text-sm">-</span>
            ),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: Transaction) => getStatusBadge(row.status),
        },
        {
            header: "Created At",
            accessorKey: "createdAt",
            cell: (row: Transaction) => (
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
            cell: (row: Transaction) => (
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
            header: "Full Name",
            accessorKey: "fullName",
            cell: (row: Transaction) => <div className="font-medium">{row.fullName}</div>,
        },
        {
            header: "Account",
            accessorKey: "account",
            cell: (row: Transaction) => (
                <div className="text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer">
                    {row.account}
                </div>
            ),
        },
        {
            header: "Processed Amount",
            accessorKey: "processedAmount",
            cell: (row: Transaction) => (
                <div className="font-medium text-right">
                    {row.processedAmount.toFixed(2)}
                </div>
            ),
        },
        {
            header: "Commission",
            accessorKey: "commission",
            cell: (row: Transaction) => (
                <div className="text-right">
                    {row.commission}
                </div>
            ),
        },
        {
            header: "Processed Currency",
            accessorKey: "processedCurrency",
            cell: (row: Transaction) => (
                <div className="font-medium">
                    {row.processedCurrency}
                </div>
            ),
        },
        {
            header: "Server",
            accessorKey: "server",
            cell: (row: Transaction) => (
                <div className="text-sm">
                    {row.server}
                </div>
            ),
        },
        {
            header: "Payment System",
            accessorKey: "paymentSystem",
            cell: (row: Transaction) => (
                <div className="text-sm">
                    {row.paymentSystem ? (
                        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                            {row.paymentSystem}
                        </Badge>
                    ) : (
                        <span className="text-muted-foreground">-</span>
                    )}
                </div>
            ),
        },
        {
            header: "Gateway",
            accessorKey: "gateway",
            cell: (row: Transaction) => (
                <div className="text-sm">
                    {row.gateway ? (
                        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                            {row.gateway}
                        </Badge>
                    ) : (
                        <span className="text-muted-foreground">-</span>
                    )}
                </div>
            ),
        },
        {
            header: "MT Ticket",
            accessorKey: "mtTicket",
            cell: (row: Transaction) => (
                <div className="font-medium">
                    {row.mtTicket || <span className="text-muted-foreground">-</span>}
                </div>
            ),
        },
        {
            header: "Login",
            accessorKey: "login",
            cell: (row: Transaction) => (
                <div className="font-medium text-emerald-700">
                    {row.login}
                </div>
            ),
        }
    ]

    const filters = [
        {
            label: "Type",
            value: "type",
            options: [
                { label: "Deposit", value: "deposit" },
                { label: "Withdrawal", value: "withdrawal" },
                { label: "Transfer Out", value: "transfer_out" },
                { label: "Transfer In", value: "transfer_in" }
            ]
        },
        {
            label: "Status",
            value: "status",
            options: [
                { label: "Pending", value: "pending" },
                { label: "Approved", value: "approved" },
                { label: "Pending Check", value: "pending_check" },
                { label: "Success", value: "success" }
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
            {/* Clean table with proper border wrapper - table itself scrolls horizontally */}
            <div className="w-full overflow-hidden">
                <DefaultTable
                title="Financial Transactions"
                description="Manage and view all financial transaction information"
                data={mockTransactions}
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
                                + Add New
                            </Button>
                        ),
                        onClick: () => console.log("Add new")
                    }
                ]}
                rowActions={[
                    {
                        label: "Edit",
                        onClick: (row) => console.log("Edit", row)
                    },
                    {
                        label: "View", 
                        onClick: (row) => console.log("View", row)
                    }
                ]}
                />
            </div>
        </div>
    )
}

export default FinancialScreen 