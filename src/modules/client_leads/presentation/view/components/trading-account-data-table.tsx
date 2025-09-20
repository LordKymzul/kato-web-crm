'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { format } from "date-fns"
import { FileDown, Plus } from "lucide-react"

interface TradingAccountData {
    login: string
    created_at: string
    group: string
    leverage: string
    currency: string
    server: string
    account_type: string
    full_name: string
    balance: number
}

const TradingAccountDataTable = ({
    data,
    isLoading,
    totalItems = 0,
    currentPage = 1,
    onPageChange,
    onSearch,
    onFilterChange,
    clearFilters,
}: {
    data: TradingAccountData[]
    isLoading?: boolean
    totalItems?: number
    currentPage?: number
    onPageChange?: (page: number) => void
    onSearch?: (term: string) => void
    onFilterChange?: (filters: Record<string, string>) => void
    clearFilters?: () => void
}) => {
    const columns = [
        {
            header: "Login",
            accessorKey: "login",
        },
        {
            header: "Created At",
            accessorKey: "created_at",
            cell: (row: TradingAccountData) => format(new Date(row.created_at), "yyyy-MM-dd HH:mm:ss"),
        },
        {
            header: "Group",
            accessorKey: "group",
        },
        {
            header: "Leverage",
            accessorKey: "leverage",
        },
        {
            header: "Currency",
            accessorKey: "currency",
        },
        {
            header: "Server",
            accessorKey: "server",
        },
        {
            header: "Account Type",
            accessorKey: "account_type",
        },
        {
            header: "Full Name",
            accessorKey: "full_name",
            cell: (row: TradingAccountData) => (
                <span className="text-green-600">{row.full_name}</span>
            ),
        },
        {
            header: "Balance",
            accessorKey: "balance",
            cell: (row: TradingAccountData) => (
                <span>{row.balance.toFixed(2)}</span>
            ),
        },
    ]

    const filters = [
        {
            label: "Group",
            value: "group",
            options: [
                { label: "B\\STD-BONUS", value: "B\\STD-BONUS" },
                { label: "WALLET-USD", value: "WALLET-USD" },
                { label: "TX1\\STD", value: "TX1\\STD" },
                { label: "B\\STD", value: "B\\STD" },
            ],
        },
        {
            label: "Server",
            value: "server",
            options: [
                { label: "MT5 live", value: "MT5 live" },
                { label: "wallet", value: "wallet" },
            ],
        },
        {
            label: "Account Type",
            value: "account_type",
            options: [
                { label: "MT5 100% Bonus", value: "MT5 100% Bonus" },
                { label: "Kato Wallet", value: "Kato Wallet" },
                { label: "MT5 Standard Account", value: "MT5 Standard Account" },
            ],
        },
    ]

    return (
        <DefaultTable
            title="Trading Account List"
            description="Manage and view all trading accounts"
            data={data}
            columns={columns}
            filters={filters}
            isLoading={isLoading}
            totalItems={totalItems}
            currentPage={currentPage}
            onPageChange={onPageChange}
            onSearch={onSearch}
            onFilterChange={onFilterChange}
            clearFilters={clearFilters}
            headerActions={[
                {
                    label: <Button
                        onClick={() => console.log("Export")}
                        variant="outline"
                        size="sm">
                        <FileDown className="w-4 h-4 mr-1" />
                        Export
                    </Button>,
                    onClick: () => console.log("Export clicked")
                },
                {
                    label: <Button
                        onClick={() => console.log("Add New")}
                        variant="outline"
                        size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add New
                    </Button>,
                    onClick: () => console.log("Add New clicked")
                }
            ]}
            rowActions={[
                {
                    label: "View Details",
                    onClick: (row) => {
                        // Handle view details
                    },
                },
                {
                    label: "Edit Account",
                    onClick: (row) => {
                        // Handle edit account
                    },
                },
            ]}
        />
    )
}

export default TradingAccountDataTable
