import { Transaction, allColumns } from '../data/transactions-data';

export function exportToCSV(data: Transaction[], selectedColumns: string[], filename: string = 'transactions') {
    // Get column definitions for selected columns
    const visibleColumns = allColumns.filter(col => selectedColumns.includes(col.key));
    
    // Create CSV header
    const headers = visibleColumns.map(col => col.label);
    
    // Create CSV rows
    const rows = data.map(transaction => {
        return visibleColumns.map(col => {
            const value = transaction[col.key as keyof Transaction];
            
            // Handle different data types for CSV
            if (value === null || value === undefined) return '';
            if (typeof value === 'boolean') return value ? 'Yes' : 'No';
            if (typeof value === 'number') return value.toString();
            if (typeof value === 'string') {
                // Escape quotes and wrap in quotes if contains comma
                const escaped = value.replace(/"/g, '""');
                return escaped.includes(',') ? `"${escaped}"` : escaped;
            }
            return value.toString();
        });
    });
    
    // Combine headers and rows
    const csvContent = [headers, ...rows]
        .map(row => row.join(','))
        .join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
