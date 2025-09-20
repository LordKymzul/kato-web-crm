'use client'

import { useState } from 'react'
import TradingAccountDataTable from '../components/trading-account-data-table'

const CLTradingAccountScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)

    // Mock data for demonstration
    const mockData = [
        {
            login: "3005722",
            created_at: "2025-09-19 12:44:34",
            group: "B\\STD-BONUS",
            leverage: "500",
            currency: "USD",
            server: "MT5 live",
            account_type: "MT5 100% Bonus",
            full_name: "Sri Azhana Amir",
            balance: 50.00
        },
        {
            login: "32460",
            created_at: "2025-09-19 12:28:43",
            group: "WALLET-USD",
            leverage: "",
            currency: "USD",
            server: "wallet",
            account_type: "Kato Wallet",
            full_name: "Azmirun Hussin",
            balance: 0.00
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
            <TradingAccountDataTable
                data={mockData}
                isLoading={isLoading}
                totalItems={233105} // From the image
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                clearFilters={clearFilters}
            />
        </div>
    )
}

export default CLTradingAccountScreen
