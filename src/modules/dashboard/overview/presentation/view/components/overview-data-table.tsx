'use client'

import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { formatDate } from "@/src/core/util/helper"

interface Document {
    id: string
    client: string
    type: string
    expiresAt: Date
}

interface DocumentTableProps {
    documents: Document[]
    totalItems: number
    currentPage: number
    itemsPerPage: number
    onSearch: (term: string) => void
    onFilterChange: (filters: Record<string, string>) => void
    onPageChange: (page: number) => void
    isLoading: boolean
    enableHeader: boolean
}

const OverviewDataTable = ({
    documents,
    totalItems,
    currentPage,
    itemsPerPage,
    onSearch,
    onFilterChange,
    onPageChange,
    isLoading,
    enableHeader = true
}: DocumentTableProps) => {

    const columns = [
        {
            header: "Client",
            accessorKey: "client",
            cell: (row: Document) => (
                <div className="text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer">{row.client}</div>
            ),
        },
        {
            header: "Type",
            accessorKey: "type",
            cell: (row: Document) => (
                <div className="text-sm text-muted-foreground">
                    {row.type}
                </div>
            ),
        },
        {
            header: "Expires At",
            accessorKey: "expiresAt",
            cell: (row: Document) => (
                <div className="text-sm">
                    {formatDate(row.expiresAt)}
                </div>
            ),
        },
        {
            header: "",
            accessorKey: "actions",
            cell: (row: Document) => (
                <Button
                    variant="ghost"
                    className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
                    onClick={() => console.log("View document:", row.id)}
                >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                </Button>
            ),
        }
    ]

    return (
        <div className="w-full">
            <DefaultTable
                title="Documents Expired / Will Expire In 2 Weeks"
                description=""
                data={documents}
                columns={columns}
                enableFiltering={false}
                enableSearch={false}
                enableSorting={false}
                onSearch={onSearch}
                onFilterChange={onFilterChange}
                enablePagination={true}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
                isLoading={isLoading}
                headerActions={[]}
                rowActions={[]}

            />
        </div>
    )
}

export default OverviewDataTable
