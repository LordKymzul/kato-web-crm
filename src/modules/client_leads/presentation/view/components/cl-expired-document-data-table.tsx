'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { format } from "date-fns"
import { FileDown, Plus } from "lucide-react"

interface ExpiredDocumentData {
    client: string
    registration_date: string
    id_passport_status: 'EXPIRED' | 'APPROVED' | 'DECLINED'
    selfie_status: 'EXPIRED' | 'APPROVED' | 'DECLINED'
    proof_of_address_status: 'EXPIRED' | 'APPROVED' | 'DECLINED'
}

const CLExpiredDocumentDataTable = ({
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
    data: ExpiredDocumentData[]
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
            header: "Client",
            accessorKey: "client",
        },
        {
            header: "Registration Date",
            accessorKey: "registration_date",
            cell: (row: ExpiredDocumentData) => format(new Date(row.registration_date), "yyyy-MM-dd HH:mm:ss"),
        },
        {
            header: "ID/Passport",
            accessorKey: "id_passport_status",
            cell: (row: ExpiredDocumentData) => (
                <Badge variant={
                    row.id_passport_status === 'APPROVED' ? "secondary" :
                        row.id_passport_status === 'DECLINED' ? "destructive" : "default"
                }>
                    {row.id_passport_status}
                </Badge>
            ),
        },
        {
            header: "Selfie with ID Card",
            accessorKey: "selfie_status",
            cell: (row: ExpiredDocumentData) => (
                <Badge variant={
                    row.selfie_status === 'APPROVED' ? "secondary" :
                        row.selfie_status === 'DECLINED' ? "destructive" : "default"
                }>
                    {row.selfie_status}
                </Badge>
            ),
        },
        {
            header: "Proof of Address",
            accessorKey: "proof_of_address_status",
            cell: (row: ExpiredDocumentData) => (
                <Badge variant={
                    row.proof_of_address_status === 'APPROVED' ? "secondary" :
                        row.proof_of_address_status === 'DECLINED' ? "destructive" : "default"
                }>
                    {row.proof_of_address_status}
                </Badge>
            ),
        },
    ]

    const filters = [
        {
            label: "Document Status",
            value: "status",
            options: [
                { label: "EXPIRED", value: "EXPIRED" },
                { label: "APPROVED", value: "APPROVED" },
                { label: "DECLINED", value: "DECLINED" },
            ],
        },
    ]

    return (
        <DefaultTable
            title="Verified Clients With Expired Documents"
            description="Manage and view all expired client documents"
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
                    label: "Request Update",
                    onClick: (row) => {
                        // Handle request update
                    },
                },
            ]}
        />
    )
}

export default CLExpiredDocumentDataTable