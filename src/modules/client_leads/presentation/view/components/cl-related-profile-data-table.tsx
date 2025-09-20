'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { format } from "date-fns"
import { FileDown, Plus } from "lucide-react"

interface RelatedProfileData {
    id: string
    client_name: string
    relationship: string
    profile_type: string
    status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
    created_at: string
    verified_at?: string
    verified_by?: string
}

const CLRelatedProfileDataTable = ({
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
    data: RelatedProfileData[]
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
            header: "Profile ID",
            accessorKey: "id",
        },
        {
            header: "Client Name",
            accessorKey: "client_name",
        },
        {
            header: "Relationship",
            accessorKey: "relationship",
            cell: (row: RelatedProfileData) => (
                <Badge variant="outline">
                    {row.relationship}
                </Badge>
            ),
        },
        {
            header: "Profile Type",
            accessorKey: "profile_type",
            cell: (row: RelatedProfileData) => (
                <Badge variant="outline">
                    {row.profile_type}
                </Badge>
            ),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: RelatedProfileData) => (
                <Badge variant={
                    row.status === 'ACTIVE' ? "secondary" :
                        row.status === 'INACTIVE' ? "destructive" : "default"
                }>
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Created At",
            accessorKey: "created_at",
            cell: (row: RelatedProfileData) => format(new Date(row.created_at), "yyyy-MM-dd HH:mm:ss"),
        },
        {
            header: "Verified At",
            accessorKey: "verified_at",
            cell: (row: RelatedProfileData) => row.verified_at ? format(new Date(row.verified_at), "yyyy-MM-dd HH:mm:ss") : "-",
        },
        {
            header: "Verified By",
            accessorKey: "verified_by",
        },
    ]

    const filters = [
        {
            label: "Profile Type",
            value: "profile_type",
            options: [
                { label: "PERSONAL", value: "PERSONAL" },
                { label: "BUSINESS", value: "BUSINESS" },
                { label: "JOINT", value: "JOINT" },
            ],
        },
        {
            label: "Status",
            value: "status",
            options: [
                { label: "ACTIVE", value: "ACTIVE" },
                { label: "INACTIVE", value: "INACTIVE" },
                { label: "PENDING", value: "PENDING" },
            ],
        },
        {
            label: "Relationship",
            value: "relationship",
            options: [
                { label: "SPOUSE", value: "SPOUSE" },
                { label: "SIBLING", value: "SIBLING" },
                { label: "PARENT", value: "PARENT" },
                { label: "CHILD", value: "CHILD" },
                { label: "BUSINESS_PARTNER", value: "BUSINESS_PARTNER" },
            ],
        },
    ]

    return (
        <DefaultTable
            title="Related Profiles"
            description="Manage and view all related client profiles"
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
                    label: "View Profile",
                    onClick: (row) => {
                        // Handle view profile
                    },
                },
                {
                    label: "Edit Relationship",
                    onClick: (row) => {
                        // Handle edit relationship
                    },
                },
                {
                    label: "Verify Profile",
                    onClick: (row) => {
                        // Handle verify profile
                    },
                },
            ]}
        />
    )
}

export default CLRelatedProfileDataTable