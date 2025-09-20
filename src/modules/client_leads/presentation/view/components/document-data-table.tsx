'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { format } from "date-fns"
import { FileDown, Plus } from "lucide-react"

interface DocumentData {
    id: string
    client_name: string
    document_type: string
    status: 'pending' | 'approved' | 'rejected'
    submitted_at: string
    expires_at: string
    verified_by?: string
    verified_at?: string
}

const DocumentDataTable = ({
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
    data: DocumentData[]
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
            header: "Document ID",
            accessorKey: "id",
        },
        {
            header: "Client Name",
            accessorKey: "client_name",
            cell: (row: DocumentData) => (
                <span >{row.client_name}</span>
            ),
        },
        {
            header: "Document Type",
            accessorKey: "document_type",
            cell: (row: DocumentData) => (
                <Badge variant="outline">
                    {row.document_type}
                </Badge>
            ),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: DocumentData) => (
                <Badge variant={
                    row.status === 'approved' ? "secondary" :
                        row.status === 'rejected' ? "destructive" : "default"
                }>
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Submitted At",
            accessorKey: "submitted_at",
            cell: (row: DocumentData) => format(new Date(row.submitted_at), "yyyy-MM-dd HH:mm:ss"),
        },
        {
            header: "Expires At",
            accessorKey: "expires_at",
            cell: (row: DocumentData) => format(new Date(row.expires_at), "yyyy-MM-dd HH:mm:ss"),
        },
        {
            header: "Verified By",
            accessorKey: "verified_by",
        },
        {
            header: "Verified At",
            accessorKey: "verified_at",
            cell: (row: DocumentData) => row.verified_at ? format(new Date(row.verified_at), "yyyy-MM-dd HH:mm:ss") : "-",
        },
    ]

    const filters = [
        {
            label: "Document Type",
            value: "document_type",
            options: [
                { label: "Passport", value: "passport" },
                { label: "ID Card", value: "id_card" },
                { label: "Proof of Address", value: "proof_of_address" },
                { label: "Bank Statement", value: "bank_statement" },
            ],
        },
        {
            label: "Status",
            value: "status",
            options: [
                { label: "Pending", value: "pending" },
                { label: "Approved", value: "approved" },
                { label: "Rejected", value: "rejected" },
            ],
        },
    ]

    return (
        <DefaultTable
            title="Document List"
            description="Manage and view all client documents"
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
                    label: "View Document",
                    onClick: (row) => {
                        // Handle view document
                    },
                },
                {
                    label: "Verify Document",
                    onClick: (row) => {
                        // Handle verify document
                    },
                },
            ]}
        />
    )
}

export default DocumentDataTable
