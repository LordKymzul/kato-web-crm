"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MarketingPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to CRM editor by default
        router.replace("/marketing/crm-editor");
    }, [router]);

    return null;
};

export default MarketingPage; 