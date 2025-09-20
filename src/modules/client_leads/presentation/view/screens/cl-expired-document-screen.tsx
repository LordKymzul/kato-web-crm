'use client'

import { useState } from 'react'
import CLExpiredDocumentDataTable from '../components/cl-expired-document-data-table'

const CLExpiredDocumentScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [visibleColumns, setVisibleColumns] = useState<string[]>([
        'client', 'registration_date', 'id_passport_status', 'selfie_status', 'proof_of_address_status'
    ])

    // Mock data for demonstration
    const mockData = [
        {
            client: "Ginanjar Purnama",
            registration_date: "2021-09-17 05:39:11",
            id_passport_status: "EXPIRED" as const,
            selfie_status: "APPROVED" as const,
            proof_of_address_status: "APPROVED" as const
        },
        {
            client: "Derlin Lamusu",
            registration_date: "2021-09-17 10:18:20",
            id_passport_status: "EXPIRED" as const,
            selfie_status: "EXPIRED" as const,
            proof_of_address_status: "EXPIRED" as const
        },
        {
            client: "Tony Achmad Syarif",
            registration_date: "2021-09-17 12:56:33",
            id_passport_status: "EXPIRED" as const,
            selfie_status: "DECLINED" as const,
            proof_of_address_status: "DECLINED" as const
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
            <CLExpiredDocumentDataTable
                data={mockData}
                isLoading={isLoading}
                totalItems={72} // From the image pagination
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

export default CLExpiredDocumentScreen