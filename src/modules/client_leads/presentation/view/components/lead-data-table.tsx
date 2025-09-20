'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { format } from "date-fns"
import { FileDown, Plus } from "lucide-react"

interface LeadData {
    id: string
    first_name: string
    last_name: string
    country: string
    email: string
    phone: string
    registration_date: string
    status: string
}

const LeadDataTable = ({
    data,
    isLoading,
    totalItems = 0,
    currentPage = 1,
    onPageChange,
    onSearch,
    onFilterChange,
    clearFilters,
}: {
    data: LeadData[]
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
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Phone",
            accessorKey: "phone",
        },
        {
            header: "Registration Date",
            accessorKey: "registration_date",
            cell: (row: LeadData) => format(new Date(row.registration_date), "yyyy-MM-dd HH:mm:ss"),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: LeadData) => (
                <Badge variant="outline">
                    {row.status}
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
                { label: "Brunei", value: "brunei" },
                { label: "Rwanda", value: "rwanda" },
                { label: "Nigeria", value: "nigeria" },
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
            title="Lead List"
            description="Manage and view all lead information"
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
                    label: "Edit Lead",
                    onClick: (row) => {
                        // Handle edit lead
                    },
                },
            ]}
        />
    )
}

export default LeadDataTable