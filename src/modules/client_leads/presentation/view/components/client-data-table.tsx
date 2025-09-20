'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { format } from "date-fns"
import { FileDown, Plus } from "lucide-react"

interface ClientData {
    id: string
    first_name: string
    last_name: string
    country: string
    is_verified: boolean
    registration_date: string
    status: 'new' | 'active'
    trading_status: string
}

const ClientDataTable = ({
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
    data: ClientData[]
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
            header: "Client ID",
            accessorKey: "id",
        },
        {
            header: "First Name",
            accessorKey: "first_name",
        },
        {
            header: "Last Name",
            accessorKey: "last_name",
        },
        {
            header: "Country",
            accessorKey: "country",
        },
        {
            header: "Is Verified",
            accessorKey: "is_verified",
            cell: (row: ClientData) => (
                <Badge variant={row.is_verified ? "secondary" : "destructive"}>
                    {row.is_verified ? "Yes" : "No"}
                </Badge>
            ),
        },
        {
            header: "Registration Date",
            accessorKey: "registration_date",
            cell: (row: ClientData) => format(new Date(row.registration_date), "yyyy-MM-dd HH:mm:ss"),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: ClientData) => (
                <Badge variant={row.status === 'active' ? "secondary" : "default"}>
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Trading Status",
            accessorKey: "trading_status",
            cell: (row: ClientData) => (
                <Badge variant="outline">
                    {row.trading_status}
                </Badge>
            ),
        },
    ]

    const filters = [
        {
            label: "Country",
            value: "country",
            options: [
                { label: "Malaysia", value: "malaysia" },
                { label: "Indonesia", value: "indonesia" },
                { label: "Singapore", value: "singapore" },
                { label: "India", value: "india" },
                { label: "Spain", value: "spain" },
            ],
        },
        {
            label: "Verification Status",
            value: "is_verified",
            options: [
                { label: "Verified", value: "true" },
                { label: "Not Verified", value: "false" },
            ],
        },
        {
            label: "Status",
            value: "status",
            options: [
                { label: "New", value: "new" },
                { label: "Active", value: "active" },
            ],
        },
    ]

    return (
        <DefaultTable
            title="Client List"
            description="Manage and view all client information"
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
                    label: "Edit Client",
                    onClick: (row) => {
                        // Handle edit client
                    },
                },
            ]}
        />
    )
}

export default ClientDataTable