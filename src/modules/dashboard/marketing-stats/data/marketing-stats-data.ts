// Marketing stats dummy data

// Summary card data
export const marketingSummaryData = {
    clicks: 40,
    registrations: 0,
    ftd: 0,
};

// Total Statistics data for line chart
export const totalStatisticsData = [
    { date: '2025-08-19', clicks: 0.8, registrations: 0.0, ftd: 0.0 },
    { date: '2025-08-20', clicks: 0.9, registrations: 0.0, ftd: 0.0 },
    { date: '2025-08-21', clicks: 0.7, registrations: 0.0, ftd: 0.0 },
    { date: '2025-08-22', clicks: 0.6, registrations: 0.0, ftd: 0.0 },
    { date: '2025-08-23', clicks: 1.0, registrations: 0.0, ftd: 0.0 },
    { date: '2025-08-24', clicks: 0.8, registrations: 0.0, ftd: 0.0 },
    { date: '2025-08-25', clicks: 0.9, registrations: 0.0, ftd: 0.0 },
    { date: '2025-08-26', clicks: 0.7, registrations: 0.0, ftd: 0.0 },
    { date: '2025-08-27', clicks: 0.5, registrations: 0.0, ftd: 0.0 },
    { date: '2025-08-28', clicks: 0.6, registrations: 0.0, ftd: 0.0 },
    { date: '2025-08-29', clicks: 0.4, registrations: 0.0, ftd: 0.0 },
    { date: '2025-08-30', clicks: 0.3, registrations: 0.0, ftd: 0.0 },
    { date: '2025-08-31', clicks: 0.2, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-01', clicks: 0.1, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-02', clicks: 0.2, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-03', clicks: 0.3, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-04', clicks: 0.4, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-05', clicks: 0.5, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-06', clicks: 0.6, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-07', clicks: 0.7, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-08', clicks: 0.8, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-09', clicks: 0.9, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-10', clicks: 1.0, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-11', clicks: 0.8, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-12', clicks: 0.7, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-13', clicks: 0.6, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-14', clicks: 0.5, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-15', clicks: 0.4, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-16', clicks: 0.3, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-17', clicks: 0.2, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-18', clicks: 0.1, registrations: 0.0, ftd: 0.0 },
    { date: '2025-09-19', clicks: 0.0, registrations: 0.0, ftd: 0.0 },
];

// Statistics by campaigns data for bar chart (empty data as shown in UI)
export const campaignStatisticsData = [
    { campaign: '0.1', clicks: 0, registrations: 0, ftd: 0 },
    { campaign: '0.2', clicks: 0, registrations: 0, ftd: 0 },
    { campaign: '0.3', clicks: 0, registrations: 0, ftd: 0 },
    { campaign: '0.4', clicks: 0, registrations: 0, ftd: 0 },
    { campaign: '0.5', clicks: 0, registrations: 0, ftd: 0 },
    { campaign: '0.6', clicks: 0, registrations: 0, ftd: 0 },
    { campaign: '0.7', clicks: 0, registrations: 0, ftd: 0 },
    { campaign: '0.8', clicks: 0, registrations: 0, ftd: 0 },
    { campaign: '0.9', clicks: 0, registrations: 0, ftd: 0 },
    { campaign: '1.0', clicks: 0, registrations: 0, ftd: 0 },
];

// Chart configuration
export const marketingChartConfig = {
    clicks: {
        label: "Clicks",
        color: "#ef4444", // Red
    },
    registrations: {
        label: "Registrations", 
        color: "#22c55e", // Green
    },
    ftd: {
        label: "FTD",
        color: "#3b82f6", // Blue
    },
};

// Marketing group types for filtering
export const marketingGroupTypes = [
    {
        label: "All Metrics",
        value: "all",
    },
    {
        label: "Clicks",
        value: "clicks",
    },
    {
        label: "Registrations",
        value: "registrations",
    },
    {
        label: "FTD",
        value: "ftd",
    },
];

export type MarketingGroupType = "all" | "clicks" | "registrations" | "ftd";

// Campaign types for filtering
export const campaignTypes = [
    {
        label: "All Campaigns",
        value: "all",
    },
    {
        label: "Campaign A",
        value: "campaign_a",
    },
    {
        label: "Campaign B",
        value: "campaign_b",
    },
    {
        label: "Campaign C",
        value: "campaign_c",
    },
];

export type CampaignType = "all" | "campaign_a" | "campaign_b" | "campaign_c";
