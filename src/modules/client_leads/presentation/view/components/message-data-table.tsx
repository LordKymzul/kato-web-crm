'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DefaultTable from "@/src/core/shared/presentation/components/default-table"
import { format } from "date-fns"
import { FileDown, Plus } from "lucide-react"

interface MessageData {
    id: string
    client_name: string
    subject: string
    message_type: string
    status: 'unread' | 'read' | 'replied'
    priority: 'high' | 'medium' | 'low'
    created_at: string
    last_reply?: string
    assigned_to?: string
}

const MessageDataTable = ({
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
    data: MessageData[]
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
            header: "Message ID",
            accessorKey: "id",
        },
        {
            header: "Client Name",
            accessorKey: "client_name",
            cell: (row: MessageData) => (
                <span>{row.client_name}</span>
            ),
        },
        {
            header: "Subject",
            accessorKey: "subject",
        },
        {
            header: "Message Type",
            accessorKey: "message_type",
            cell: (row: MessageData) => (
                <Badge variant="outline">
                    {row.message_type}
                </Badge>
            ),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (row: MessageData) => (
                <Badge variant={
                    row.status === 'read' ? "secondary" :
                        row.status === 'unread' ? "destructive" : "default"
                }>
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Priority",
            accessorKey: "priority",
            cell: (row: MessageData) => (
                <Badge variant={
                    row.priority === 'high' ? "destructive" :
                        row.priority === 'medium' ? "secondary" : "default"
                }>
                    {row.priority}
                </Badge>
            ),
        },
        {
            header: "Created At",
            accessorKey: "created_at",
            cell: (row: MessageData) => format(new Date(row.created_at), "yyyy-MM-dd HH:mm:ss"),
        },
        {
            header: "Last Reply",
            accessorKey: "last_reply",
            cell: (row: MessageData) => row.last_reply ? format(new Date(row.last_reply), "yyyy-MM-dd HH:mm:ss") : "-",
        },
        {
            header: "Assigned To",
            accessorKey: "assigned_to",
        },
    ]

    const filters = [
        {
            label: "Message Type",
            value: "message_type",
            options: [
                { label: "Support", value: "support" },
                { label: "Inquiry", value: "inquiry" },
                { label: "Complaint", value: "complaint" },
            ],
        },
        {
            label: "Status",
            value: "status",
            options: [
                { label: "Unread", value: "unread" },
                { label: "Read", value: "read" },
                { label: "Replied", value: "replied" },
            ],
        },
        {
            label: "Priority",
            value: "priority",
            options: [
                { label: "High", value: "high" },
                { label: "Medium", value: "medium" },
                { label: "Low", value: "low" },
            ],
        },
    ]

    return (
        <DefaultTable
            title="Messages"
            description="Manage and view all client messages"
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
                    label: "View Message",
                    onClick: (row) => {
                        // Handle view message
                    },
                },
                {
                    label: "Reply",
                    onClick: (row) => {
                        // Handle reply
                    },
                },
                {
                    label: "Assign",
                    onClick: (row) => {
                        // Handle assign
                    },
                },
            ]}
        />
    )
}

export default MessageDataTable
