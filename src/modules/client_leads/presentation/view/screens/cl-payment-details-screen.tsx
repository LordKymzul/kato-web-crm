'use client'

import { useState } from 'react'
import PaymentDetailDataTable from '../components/payment-detail-data-table'

const CLPaymentDetailsScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [visibleColumns, setVisibleColumns] = useState<string[]>([
        'id', 'client_name', 'payment_method', 'account_number', 'bank_name', 'status'
    ])

    // Mock data for demonstration
    const mockData = [
        {
            id: "PAY001",
            client_name: "John Doe",
            payment_method: "Bank Transfer",
            account_number: "1234567890",
            bank_name: "Example Bank",
            status: "active" as const,
            created_at: "2025-09-19 12:21:00",
            last_used: "2025-09-19 14:30:00",
            verified_by: "Admin User"
        },
        {
            id: "PAY002",
            client_name: "Jane Smith",
            payment_method: "Credit Card",
            account_number: "****-****-****-1234",
            bank_name: "International Bank",
            status: "pending" as const,
            created_at: "2025-09-18 15:30:00",
            last_used: undefined,
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
            <PaymentDetailDataTable
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

export default CLPaymentDetailsScreen
