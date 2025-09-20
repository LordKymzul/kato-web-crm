'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { format } from "date-fns"
import { FileDown, Plus } from "lucide-react"

interface PaymentDetailData {
    id: string
    client_name: string
    payment_method: string
    account_number: string
    bank_name: string
    status: 'active' | 'inactive' | 'pending'
    created_at: string
    last_used?: string
    verified_by?: string
}

const PaymentDetailDataTable = ({
    data,
    isLoading,
    totalItems = 0,
    currentPage = 1,
    onPageChange,
    onSearch,
    onFilterChange,
    clearFilters,
    defaultVisibleColumns,
    onColumnVisibilityChange,
}: {
    data: PaymentDetailData[]
    isLoading?: boolean
    totalItems?: number
    currentPage?: number
    onPageChange?: (page: number) => void
    onSearch?: (term: string) => void
    onFilterChange?: (filters: Record<string, string>) => void
    clearFilters?: () => void
    defaultVisibleColumns?: string[]
    onColumnVisibilityChange?: (columns: string[]) => void
}) => {
    const columns = [
        {
            header: "Payment ID",
            accessorKey: "id",
        },
        {
            header: "Client Name",
            accessorKey: "client_name",
            cell: (row: PaymentDetailData) => (
                <span >{row.client_name}</span>
            ),
        },
        {
            header: "Payment Method",
            accessorKey: "payment_method",
            cell: (row: PaymentDetailData) => (
                <Badge variant="outline">
                    {row.payment_method}
                </Badge>
            ),
        },
        {
            header: "Account Number",
            accessorKey: "account_number",
        },
        {
            header: "Bank Name",
            accessorKey: "bank_name",
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: PaymentDetailData) => (
                <Badge variant={
                    row.status === 'active' ? "secondary" :
                        row.status === 'inactive' ? "destructive" : "default"
                }>
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Created At",
            accessorKey: "created_at",
            cell: (row: PaymentDetailData) => format(new Date(row.created_at), "yyyy-MM-dd HH:mm:ss"),
        },
        {
            header: "Last Used",
            accessorKey: "last_used",
            cell: (row: PaymentDetailData) => row.last_used ? format(new Date(row.last_used), "yyyy-MM-dd HH:mm:ss") : "-",
        },
        {
            header: "Verified By",
            accessorKey: "verified_by",
        },
    ]

    const filters = [
        {
            label: "Payment Method",
            value: "payment_method",
            options: [
                { label: "Bank Transfer", value: "bank_transfer" },
                { label: "Credit Card", value: "credit_card" },
                { label: "E-Wallet", value: "e_wallet" },
            ],
        },
        {
            label: "Status",
            value: "status",
            options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "Pending", value: "pending" },
            ],
        },
    ]

    return (
        <DefaultTable
            title="Payment Details"
            description="Manage and view all client payment details"
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
            defaultVisibleColumns={defaultVisibleColumns}
            onColumnVisibilityChange={onColumnVisibilityChange}
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
                    label: "Edit Payment",
                    onClick: (row) => {
                        // Handle edit payment
                    },
                },
                {
                    label: "Verify Payment",
                    onClick: (row) => {
                        // Handle verify payment
                    },
                },
            ]}
        />
    )
}

export default PaymentDetailDataTable
