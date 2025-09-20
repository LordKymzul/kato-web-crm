'use client'

import { useState } from 'react'
import LeadDataTable from '../components/lead-data-table'

const CLLeadScreen = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [filters, setFilters] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)

    // Mock data for demonstration
    const mockData = [
        {
            id: "210247",
            first_name: "Zoe",
            last_name: "Kanjiayee",
            country: "Malaysia",
            email: "kanjiayeezoe@gmail.com",
            phone: "+6597111505",
            registration_date: "2025-09-19 09:03:03",
            status: "new"
        },
        {
            id: "210229",
            first_name: "Nur Anisa Nabihah",
            last_name: "Naslie Bujang",
            country: "Malaysia",
            email: "nuranisa_166@icloud.com",
            phone: "+601114029925",
            registration_date: "2025-09-18 19:07:06",
            status: "new"
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
            <LeadDataTable
                data={mockData}
                isLoading={isLoading}
                totalItems={10770} // From the image
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                clearFilters={clearFilters}
            />
        </div>
    )
}

export default CLLeadScreen