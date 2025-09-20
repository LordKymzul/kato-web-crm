'use client'

import { Badge } from "@/components/ui/badge"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { format } from "date-fns"

interface ApplicationData {
    id: string
    full_name: string
    type: string
    status: 'approved' | 'declined'
    created_at: string
    processed_at: string
    processed_by?: string
}

const ApplicationDataTable = ({
    data,
    isLoading,
    totalItems = 0,
    currentPage = 1,
    onPageChange,
    onSearch,
    onFilterChange,
    clearFilters,
}: {
    data: ApplicationData[]
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
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Full Name",
            accessorKey: "full_name",
            cell: (row: ApplicationData) => (
                <span>{row.full_name}</span>
            ),
        },
        {
            header: "Type",
            accessorKey: "type",
            cell: (row: ApplicationData) => (
                <Badge variant="secondary">
                    {row.type}
                </Badge>
            ),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: ApplicationData) => (
                <Badge variant={row.status === 'approved' ? 'secondary' : 'destructive'}>
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Created At",
            accessorKey: "created_at",
            cell: (row: ApplicationData) => format(new Date(row.created_at), "yyyy-MM-dd HH:mm:ss"),
        },
        {
            header: "Processed At",
            accessorKey: "processed_at",
            cell: (row: ApplicationData) => format(new Date(row.processed_at), "yyyy-MM-dd HH:mm:ss"),
        },
        {
            header: "Processed By",
            accessorKey: "processed_by",
        },
    ]

    const filters = [
        {
            label: "Type",
            value: "type",
            options: [
                { label: "Kato Partner Application", value: "Kato Partner Application" },
                { label: "Change Phone Application", value: "Change Phone Application" },
                { label: "Swap-Free Application", value: "Swap-Free Application" },
                { label: "Change Leverage Application", value: "Change Leverage Application" },
                { label: "Change Email Application", value: "Change Email Application" },
            ],
        },
        {
            label: "Status",
            value: "status",
            options: [
                { label: "Approved", value: "approved" },
                { label: "Declined", value: "declined" },
            ],
        },
    ]

    return (
        <DefaultTable
            title="Application List"
            description="Manage and view all applications"
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
            rowActions={[
                {
                    label: "View Details",
                    onClick: (row) => {
                        // Handle view details
                    },
                },
                {
                    label: "Process Application",
                    onClick: (row) => {
                        // Handle process application
                    },
                },
            ]}
        />
    )
}

export default ApplicationDataTable
