"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const FinancialPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to transactions by default
        router.replace("/financial/transactions");
    }, [router]);

    return null;
};

export default FinancialPage; 