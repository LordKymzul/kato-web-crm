'use client'

import { useState } from 'react'
import DocumentDataTable from '../components/document-data-table'

const CLDocumentScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [visibleColumns, setVisibleColumns] = useState<string[]>([
        'id', 'client_name', 'document_type', 'status', 'submitted_at', 'expires_at'
    ])

    // Mock data for demonstration
    const mockData = [
        {
            id: "DOC001",
            client_name: "John Doe",
            document_type: "Passport",
            status: "pending" as const,
            submitted_at: "2025-09-19 12:21:00",
            expires_at: "2026-09-19 12:21:00",
            verified_by: undefined,
            verified_at: undefined
        },
        {
            id: "DOC002",
            client_name: "Jane Smith",
            document_type: "ID Card",
            status: "approved" as const,
            submitted_at: "2025-09-18 15:30:00",
            expires_at: "2026-09-18 15:30:00",
            verified_by: "Admin User",
            verified_at: "2025-09-18 16:00:00"
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
            <DocumentDataTable
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

export default CLDocumentScreen