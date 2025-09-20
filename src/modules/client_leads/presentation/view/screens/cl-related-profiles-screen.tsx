'use client'

import { useState } from 'react'
import CLRelatedProfileDataTable from '../components/cl-related-profile-data-table'

const CLRelatedProfilesScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [visibleColumns, setVisibleColumns] = useState<string[]>([
        'id', 'client_name', 'relationship', 'profile_type', 'status', 'created_at'
    ])

    // Mock data for demonstration
    const mockData = [
        {
            id: "RP001",
            client_name: "John Doe",
            relationship: "SPOUSE",
            profile_type: "PERSONAL",
            status: "ACTIVE" as const,
            created_at: "2025-09-19 12:21:00",
            verified_at: "2025-09-19 14:30:00",
            verified_by: "Admin User"
        },
        {
            id: "RP002",
            client_name: "Jane Smith",
            relationship: "BUSINESS_PARTNER",
            profile_type: "BUSINESS",
            status: "PENDING" as const,
            created_at: "2025-09-18 15:30:00",
            verified_at: undefined,
            verified_by: undefined
        },
        // Add more mock data as needed
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
            <CLRelatedProfileDataTable
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

export default CLRelatedProfilesScreen