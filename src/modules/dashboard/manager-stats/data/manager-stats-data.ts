// Manager stats dummy data

// Summary card data
export const managerSummaryData = {
    totalFTD: 2847563.45,
    totalRedeposits: 1247891.23,
    totalTransactions: 45672,
    processedTransactions: 43891,
    approvedDocuments: 8924,
    declinedDocuments: 1876,
};

// FTD/Redeposits data by manager
export const ftdRedepositsData = [
    { manager: 'AM-department #4', ftd: 2500, redeposits: 1800 },
    { manager: 'Support NAIROBI - Marketing #8', ftd: 800, redeposits: 400 },
    { manager: 'Support STOCKHOLM #11', ftd: 150, redeposits: 50 },
];

// Total Transaction data by manager
export const totalTransactionData = [
    { manager: 'Support NAIROBI - Marketing #8', totalDeposits: 800, totalWithdrawals: 1200 },
    { manager: 'AM-department #4', totalDeposits: 2500, totalWithdrawals: 1800 },
    { manager: 'Support STOCKHOLM #11', totalDeposits: 400, totalWithdrawals: 200 },
];

// Processed Transactions data by manager
export const processedTransactionsData = [
    { manager: 'Support MikeWebber', deposits: 150, withdrawals: 8500 },
    { manager: 'Support Yvet', deposits: 0, withdrawals: 0 },
    { manager: 'Support Tati', deposits: 0, withdrawals: 0 },
];

// Documents data by manager
export const documentsData = [
    { manager: 'Support MikeWebber', approved: 1200, declined: 800 },
    { manager: 'Support Tati', approved: 1100, declined: 600 },
    { manager: 'Support Yvet', approved: 1400, declined: 1200 },
];

// PSP Details data by manager
export const pspDetailsData = [
    { manager: 'Support MikeWebber', approved: 50, declined: 900 },
    { manager: 'Support Yvet', approved: 0, declined: 150 },
    { manager: 'Support Tati', approved: 0, declined: 20 },
];

// Applications data by manager
export const applicationsData = [
    { manager: 'Support MikeWebber', approved: 2500, declined: 500 },
];

// Chart configuration
export const chartConfig = {
    ftd: {
        label: "FTD",
        color: "#22c55e", // Green
    },
    redeposits: {
        label: "Redeposits", 
        color: "#3b82f6", // Blue
    },
    totalDeposits: {
        label: "Total Deposits",
        color: "#3b82f6", // Blue
    },
    totalWithdrawals: {
        label: "Total Withdrawals",
        color: "#ef4444", // Red
    },
    deposits: {
        label: "Deposits",
        color: "#ef4444", // Red
    },
    withdrawals: {
        label: "Withdrawals",
        color: "#3b82f6", // Blue
    },
    approved: {
        label: "Approved",
        color: "#3b82f6", // Blue
    },
    declined: {
        label: "Declined",
        color: "#f97316", // Orange
    },
};

// Manager group types for filtering
export const managerGroupTypes = [
    {
        label: "All Managers",
        value: "all",
    },
    {
        label: "AM Department",
        value: "am_department",
    },
    {
        label: "Support Team",
        value: "support_team",
    },
    {
        label: "Marketing Team",
        value: "marketing_team",
    },
];

export type ManagerGroupType = "all" | "am_department" | "support_team" | "marketing_team";
