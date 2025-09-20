// Transactions data and column definitions

export interface Transaction {
  id: number;
  type: string;
  pspStatus: string;
  status: string;
  createdAt: string;
  processedAt: string;
  fullName: string;
  account: string;
  processedAmount: number;
  commission: number;
  processedCurrency: string;
  server: string;
  paymentSystem: string;
  gateway: string;
  mtTicket: string;
  login: string;
  // Additional fields for comprehensive data
  accountCurrency: string;
  amount: number;
  amountUsd: number;
  approvalAttempts: number;
  approveReason: string;
  brokerCommission: number;
  calculatedConversionRate: number;
  checkedAt: string;
  checkedBy: string;
  client: string;
  clientIp: string;
  declineReason: string;
  ftd: boolean;
  instantWithdrawal: boolean;
  internalComment: string;
  method: string;
  mtDeclineTicket: string;
  paymentDetails: string;
  paymentDetailsStatus: string;
  pspAmount: number;
  pspChildTransactionId: string;
  pspCommission: number;
  pspPaymentDetails: string;
  pspRule: string;
  pspTransactionId: string;
  reportType: string;
  requestedAmount: number;
  requestedAmountUsd: number;
  requestedCurrency: string;
  source: string;
  transactionImportId: string;
  transactionManager: string;
  transactionTags: string;
  transferInOutId: string;
}

// Column categories for organization
export const columnCategories = {
  "Transaction Information": [
    { key: "id", label: "ID", type: "number" },
    { key: "type", label: "Type", type: "string" },
    { key: "status", label: "Status", type: "badge" },
    { key: "createdAt", label: "Created At", type: "datetime" },
    { key: "processedAt", label: "Processed At", type: "datetime" },
    { key: "amount", label: "Amount", type: "currency" },
    { key: "amountUsd", label: "Amount, USD", type: "currency" },
    { key: "processedAmount", label: "Processed Amount", type: "currency" },
    { key: "processedCurrency", label: "Processed Currency", type: "string" },
    { key: "requestedAmount", label: "Requested Amount", type: "currency" },
    { key: "requestedAmountUsd", label: "Requested Amount, USD", type: "currency" },
    { key: "requestedCurrency", label: "Requested Currency", type: "string" },
    { key: "commission", label: "Commission", type: "currency" },
    { key: "brokerCommission", label: "Broker Commission", type: "currency" },
    { key: "calculatedConversionRate", label: "Calculated Conversion Rate", type: "number" },
  ],
  "Account": [
    { key: "account", label: "Account", type: "string" },
    { key: "accountCurrency", label: "Account Currency", type: "string" },
    { key: "login", label: "Login", type: "string" },
    { key: "server", label: "Server", type: "string" },
  ],
  "Client Information": [
    { key: "client", label: "Client", type: "string" },
    { key: "fullName", label: "Full Name", type: "string" },
    { key: "clientIp", label: "Client IP", type: "string" },
  ],
  "Payment Details": [
    { key: "paymentSystem", label: "Payment System", type: "string" },
    { key: "paymentDetails", label: "Payment Details", type: "string" },
    { key: "paymentDetailsStatus", label: "Payment Details Status", type: "badge" },
    { key: "method", label: "Method", type: "string" },
    { key: "gateway", label: "Gateway", type: "string" },
  ],
  "PSP Information": [
    { key: "pspStatus", label: "PSP Status", type: "badge" },
    { key: "pspAmount", label: "PSP Amount", type: "currency" },
    { key: "pspCommission", label: "PSP Commission", type: "currency" },
    { key: "pspTransactionId", label: "PSP Transaction ID", type: "string" },
    { key: "pspChildTransactionId", label: "PSP Child Transaction ID", type: "string" },
    { key: "pspPaymentDetails", label: "PSP Payment Details", type: "string" },
    { key: "pspRule", label: "PSP Rule", type: "string" },
  ],
  "Processing Details": [
    { key: "checkedAt", label: "Checked At", type: "datetime" },
    { key: "checkedBy", label: "Checked By", type: "string" },
    { key: "approvalAttempts", label: "Approval Attempts", type: "number" },
    { key: "approveReason", label: "Approve Reason", type: "string" },
    { key: "declineReason", label: "Decline Reason", type: "string" },
    { key: "transactionManager", label: "Transaction Manager", type: "string" },
  ],
  "Additional Information": [
    { key: "ftd", label: "FTD", type: "boolean" },
    { key: "instantWithdrawal", label: "Instant Withdrawal", type: "boolean" },
    { key: "internalComment", label: "Internal Comment", type: "string" },
    { key: "mtTicket", label: "MT Ticket", type: "string" },
    { key: "mtDeclineTicket", label: "MT Decline Ticket", type: "string" },
    { key: "reportType", label: "Report Type", type: "string" },
    { key: "source", label: "Source", type: "string" },
    { key: "transactionImportId", label: "Transaction Import ID", type: "string" },
    { key: "transactionTags", label: "Transaction Tags", type: "string" },
    { key: "transferInOutId", label: "Transfer in/out ID", type: "string" },
  ],
};

// All available columns flattened
export const allColumns = Object.values(columnCategories).flat();

// Default selected columns (matching the image)
export const defaultSelectedColumns = [
  "type",
  "pspStatus", 
  "status",
  "createdAt",
  "processedAt",
  "fullName",
  "account",
  "processedAmount",
  "commission",
  "processedCurrency",
  "server",
  "paymentSystem",
  "gateway",
  "mtTicket",
  "login"
];

// Generate dummy transaction data
const transactionTypes = ["Deposit", "withdrawal", "transfer out", "transfer in", "100% Deposit Bonus"];
const statuses = ["approved", "pending"];
const pspStatuses = ["approved", "pending", "success"];
const paymentSystems = ["MT5 Plus 5000", "MT5 Standard Account", "MT4 RAW Account", "MT5 STP Account", "MT5 100% Bonus", "Kato Wallet"];
const gateways = ["1056621", "3003899", "7467", "603120", "30900902", "7475", "7477", "29723", "7256"];
const servers = ["MT5 Plus 5000", "MT5 Standard Account", "MT4 RAW Account", "MT5 STP Account", "Kato Wallet"];
const currencies = ["USD", "EUR", "GBP", "MYR", "SGD"];

const names = [
  "Noor Hafiza Abdul Wahab",
  "Muhammad Hafni Shauqi Abu Bakar", 
  "Hasib Manap",
  "Norazman Bin Ali",
  "Noraslita Asahan",
  "Patricia Indah Mogot",
  "Taufik Hidayat",
  "Alya Syaraff",
  "Firdaus Gaffarudin",
  "Chong Ka Shin",
  "Jana Janarthan",
  "Ginny Lim Su Lane",
  "Wellwood Alfian",
  "Afiq Farhan",
  "Ahmad Suandi Bin Zainal",
  "Sri Azhana Amir",
  "Nizam Mokmin",
  "Mohammad Shamil Mohammad Khair",
  "Hsien Loong Ong"
];

export const transactionsData: Transaction[] = Array.from({ length: 100 }, (_, index) => {
  const id = 1474682 - index;
  const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const pspStatus = pspStatuses[Math.floor(Math.random() * pspStatuses.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  const paymentSystem = paymentSystems[Math.floor(Math.random() * paymentSystems.length)];
  const gateway = gateways[Math.floor(Math.random() * gateways.length)];
  const server = servers[Math.floor(Math.random() * servers.length)];
  const currency = currencies[Math.floor(Math.random() * currencies.length)];
  
  const baseDate = new Date('2025-09-19');
  const createdAt = new Date(baseDate.getTime() - Math.random() * 24 * 60 * 60 * 1000);
  const processedAt = new Date(createdAt.getTime() + Math.random() * 60 * 60 * 1000);
  
  const amount = Math.floor(Math.random() * 10000) + 100;
  const commission = Math.floor(amount * 0.02);
  
  return {
    id,
    type,
    pspStatus,
    status,
    createdAt: createdAt.toISOString().slice(0, 19).replace('T', ' '),
    processedAt: processedAt.toISOString().slice(0, 19).replace('T', ' '),
    fullName: name,
    account: `${paymentSystem} ${gateway}`,
    processedAmount: amount,
    commission,
    processedCurrency: currency,
    server,
    paymentSystem,
    gateway,
    mtTicket: Math.floor(Math.random() * 1000000).toString(),
    login: Math.floor(Math.random() * 1000000).toString(),
    // Additional fields
    accountCurrency: currency,
    amount,
    amountUsd: Math.floor(amount * (currency === 'USD' ? 1 : Math.random() * 1.5 + 0.5)),
    approvalAttempts: Math.floor(Math.random() * 3),
    approveReason: status === 'approved' ? 'Auto-approved' : '',
    brokerCommission: Math.floor(commission * 0.5),
    calculatedConversionRate: currency === 'USD' ? 1 : Math.random() * 1.5 + 0.5,
    checkedAt: processedAt,
    checkedBy: 'System',
    client: name,
    clientIp: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    declineReason: status === 'pending' ? 'Pending verification' : '',
    ftd: Math.random() > 0.7,
    instantWithdrawal: type === 'withdrawal' && Math.random() > 0.8,
    internalComment: Math.random() > 0.8 ? 'Review required' : '',
    method: type === 'Deposit' ? 'Bank Transfer' : 'Wallet',
    mtDeclineTicket: status === 'pending' ? Math.floor(Math.random() * 1000000).toString() : '',
    paymentDetails: `${type} via ${paymentSystem}`,
    paymentDetailsStatus: pspStatus,
    pspAmount: amount,
    pspChildTransactionId: Math.random().toString(36).substring(7),
    pspCommission: Math.floor(commission * 0.3),
    pspPaymentDetails: `PSP-${Math.random().toString(36).substring(7)}`,
    pspRule: 'Standard',
    pspTransactionId: Math.random().toString(36).substring(7),
    reportType: 'Standard',
    requestedAmount: amount,
    requestedAmountUsd: Math.floor(amount * (currency === 'USD' ? 1 : Math.random() * 1.5 + 0.5)),
    requestedCurrency: currency,
    source: 'Web',
    transactionImportId: Math.random().toString(36).substring(7),
    transactionManager: 'Auto',
    transactionTags: Math.random() > 0.8 ? 'VIP' : '',
    transferInOutId: type.includes('transfer') ? Math.random().toString(36).substring(7) : '',
  };
});

// Column type definitions for rendering
export type ColumnType = 'string' | 'number' | 'currency' | 'datetime' | 'boolean' | 'badge';

// Status badge colors
export const statusColors = {
  approved: 'bg-green-500',
  pending: 'bg-blue-500',
  success: 'bg-green-500',
  declined: 'bg-red-500',
};

// Transaction type colors
export const typeColors = {
  Deposit: 'bg-blue-100 text-blue-800',
  withdrawal: 'bg-red-100 text-red-800',
  'transfer out': 'bg-orange-100 text-orange-800',
  'transfer in': 'bg-green-100 text-green-800',
  '100% Deposit Bonus': 'bg-purple-100 text-purple-800',
};

export const RECORDS_PER_PAGE_OPTIONS = [10, 20, 50, 100];
