'use client'

import { useState } from 'react'
import ApplicationDataTable from '../components/application-data-table'

const CLApplicationScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)

    // Mock data for demonstration
    const mockData = [
        {
            id: "35237",
            full_name: "Ahmad Hazim Danial Bin Hishamudean",
            type: "Kato Partner Application",
            status: "approved" as const,
            created_at: "2025-09-18 09:49:17",
            processed_at: "2025-09-18 09:49:17",
            processed_by: undefined
        },
        {
            id: "35236",
            full_name: "Norazima Mohd Salleh",
            type: "Kato Partner Application",
            status: "approved" as const,
            created_at: "2025-09-18 07:00:31",
            processed_at: "2025-09-18 07:00:31",
            processed_by: undefined
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

    return (
        <div className="p-6">
            <ApplicationDataTable
                data={mockData}
                isLoading={isLoading}
                totalItems={35195} // From the image
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                clearFilters={clearFilters}
            />
        </div>
    )
}

export default CLApplicationScreen
