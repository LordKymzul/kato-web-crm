'use client'

import { useState } from 'react'
import MessageDataTable from '../components/message-data-table'

const CLMessagesScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [visibleColumns, setVisibleColumns] = useState<string[]>([
        'id', 'client_name', 'subject', 'message_type', 'status', 'priority', 'created_at'
    ])

    // Mock data for demonstration
    const mockData = [
        {
            id: "MSG001",
            client_name: "John Doe",
            subject: "Account Access Issue",
            message_type: "Support",
            status: "unread" as const,
            priority: "high" as const,
            created_at: "2025-09-19 12:21:00",
            last_reply: undefined,
            assigned_to: undefined
        },
        {
            id: "MSG002",
            client_name: "Jane Smith",
            subject: "Trading Platform Question",
            message_type: "Inquiry",
            status: "replied" as const,
            priority: "medium" as const,
            created_at: "2025-09-18 15:30:00",
            last_reply: "2025-09-18 16:45:00",
            assigned_to: "Support Team"
        },
    ]

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        // Implement search logic here
    }

    const handleFilterChange = (newFilters: Record<string, string>) => {
        setFilters(newFilters)
        // Implement filter logic here
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Implement pagination logic here
    }

    const clearFilters = () => {
        setFilters({})
        // Additional clear filter logic here
    }

    const handleColumnVisibilityChange = (columns: string[]) => {
        setVisibleColumns(columns)
        // Optionally save to localStorage or backend
    }

    return (
        <div className="p-6">
            <MessageDataTable
                data={mockData}
                isLoading={isLoading}
                totalItems={100} // Replace with actual total
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                clearFilters={clearFilters}
                defaultVisibleColumns={visibleColumns}
                onColumnVisibilityChange={handleColumnVisibilityChange}
            />
        </div>
    )
}

export default CLMessagesScreen